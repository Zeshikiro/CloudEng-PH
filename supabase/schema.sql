-- CloudEng PH Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ============================================================
-- USER PROFILES
-- Extends the default auth.users table with display info
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- QUIZ SCORES
-- Stores quiz results per user per lesson
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_slug TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  answers JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One score per user per lesson (latest attempt)
  UNIQUE(user_id, lesson_slug)
);

-- Enable RLS
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;

-- Users can read their own scores
CREATE POLICY "Users can view own scores" ON public.quiz_scores
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own scores
CREATE POLICY "Users can insert own scores" ON public.quiz_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own scores (retake)
CREATE POLICY "Users can update own scores" ON public.quiz_scores
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- LESSON PROGRESS
-- Tracks which lessons a user has completed
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_slug TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  
  UNIQUE(user_id, lesson_slug)
);

-- Enable RLS
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can read their own progress
CREATE POLICY "Users can view own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- LAB PROGRESS
-- Tracks hands-on lab step completion
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lab_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_slug TEXT NOT NULL,
  completed_steps JSONB DEFAULT '[]'::jsonb,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, lab_slug)
);

-- Enable RLS
ALTER TABLE public.lab_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lab progress" ON public.lab_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lab progress" ON public.lab_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lab progress" ON public.lab_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTION: Auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
