'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { useRouter } from 'next/navigation';

// Admin emails that can access this page
const ADMIN_EMAILS = ['zeshikiro@gmail.com'];

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonDraft {
  title: string;
  slug: string;
  module: string;
  difficulty: string;
  description: string;
  sections: Array<{ title: string; icon: string; content: string }>;
  quiz: QuizItem[];
}

const emptyLesson: LessonDraft = {
  title: '',
  slug: '',
  module: 'Module 1 — Introduction',
  difficulty: 'Beginner',
  description: '',
  sections: [{ title: '', icon: '📝', content: '' }],
  quiz: [{ question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }],
};

export default function AdminContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'stats'>('lessons');
  const [lesson, setLesson] = useState<LessonDraft>({ ...emptyLesson });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalQuizzes: 0, totalScores: 0 });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!authLoading && (!user || !ADMIN_EMAILS.includes(user.email || ''))) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const supabase = createClient();
        const [profilesRes, scoresRes] = await Promise.all([
          supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
          supabase.from('quiz_scores').select('id, score', { count: 'exact' }),
        ]);
        
        const totalScoreSum = scoresRes.data?.reduce((acc, curr) => acc + (curr.score || 0), 0) || 0;
        
        setStats({
          totalUsers: profilesRes.count || 0,
          totalQuizzes: scoresRes.count || 0,
          totalScores: totalScoreSum,
        });
      } catch {
        // Stats fetch failed
      }
    };
    fetchStats();
  }, [user]);

  const handleSaveLesson = async () => {
    if (!lesson.title || !lesson.slug) return;
    setSaving(true);
    
    try {
      const supabase = createClient();
      
      // Save to a 'cms_lessons' table (will create via schema if needed)
      const { error } = await supabase
        .from('cms_lessons')
        .upsert({
          slug: lesson.slug,
          title: lesson.title,
          module: lesson.module,
          difficulty: lesson.difficulty,
          description: lesson.description,
          sections: lesson.sections,
          quiz: lesson.quiz,
          updated_at: new Date().toISOString(),
          author_id: user?.id,
        }, { onConflict: 'slug' });

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed. Make sure the cms_lessons table exists in Supabase.');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setLesson(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', icon: '📝', content: '' }],
    }));
  };

  const removeSection = (idx: number) => {
    setLesson(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  };

  const updateSection = (idx: number, field: string, value: string) => {
    setLesson(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) => i === idx ? { ...s, [field]: value } : s),
    }));
  };

  const addQuiz = () => {
    setLesson(prev => ({
      ...prev,
      quiz: [...prev.quiz, { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }],
    }));
  };

  const removeQuiz = (idx: number) => {
    setLesson(prev => ({
      ...prev,
      quiz: prev.quiz.filter((_, i) => i !== idx),
    }));
  };

  const updateQuiz = (idx: number, field: string, value: string | number | string[]) => {
    setLesson(prev => ({
      ...prev,
      quiz: prev.quiz.map((q, i) => i === idx ? { ...q, [field]: value } : q),
    }));
  };

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            🔐 Admin Only
          </div>
          <h1 className="text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-2">
            Content Management System
          </h1>
          <p className="text-slate-400">Create and manage lessons, quizzes, and view platform stats.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          {(['lessons', 'quiz', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                  : 'bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-white/[0.06]'
              }`}
            >
              {tab === 'lessons' && '📝 Lesson Editor'}
              {tab === 'quiz' && '❓ Quiz Builder'}
              {tab === 'stats' && '📊 Platform Stats'}
            </button>
          ))}
        </div>

        {/* Lesson Editor Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] space-y-5">
              <h2 className="text-xl font-bold text-white">Lesson Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <InputField label="Title" value={lesson.title} onChange={v => setLesson(p => ({ ...p, title: v }))} placeholder="e.g. Lesson 4: Docker Basics" />
                <InputField label="URL Slug" value={lesson.slug} onChange={v => setLesson(p => ({ ...p, slug: v }))} placeholder="e.g. lesson-4" />
                <SelectField label="Module" value={lesson.module} onChange={v => setLesson(p => ({ ...p, module: v }))} options={['Module 1 — Introduction', 'Module 2 — Getting Started', 'Module 3 — Advanced']} />
                <SelectField label="Difficulty" value={lesson.difficulty} onChange={v => setLesson(p => ({ ...p, difficulty: v }))} options={['Beginner', 'Intermediate', 'Advanced']} />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                <textarea
                  value={lesson.description}
                  onChange={e => setLesson(p => ({ ...p, description: e.target.value }))}
                  placeholder="Short description ng lesson..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all resize-none"
                />
              </div>
            </div>

            {/* Sections */}
            <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Sections ({lesson.sections.length})</h2>
                <button onClick={addSection} className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors">
                  + Add Section
                </button>
              </div>

              {lesson.sections.map((section, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Section {idx + 1}</span>
                    {lesson.sections.length > 1 && (
                      <button onClick={() => removeSection(idx)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div className="md:col-span-1">
                      <InputField label="Icon" value={section.icon} onChange={v => updateSection(idx, 'icon', v)} placeholder="📝" />
                    </div>
                    <div className="md:col-span-3">
                      <InputField label="Title" value={section.title} onChange={v => updateSection(idx, 'title', v)} placeholder="Section title..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Content (Markdown supported)</label>
                    <textarea
                      value={section.content}
                      onChange={e => updateSection(idx, 'content', e.target.value)}
                      placeholder="Write your lesson content here... You can use **bold**, *italic*, and - bullet points."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all resize-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quiz Section in Lesson Editor */}
            <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Quiz Questions ({lesson.quiz.length})</h2>
                <button onClick={addQuiz} className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/20 transition-colors">
                  + Add Question
                </button>
              </div>

              {lesson.quiz.map((q, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Question {idx + 1}</span>
                    {lesson.quiz.length > 1 && (
                      <button onClick={() => removeQuiz(idx)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
                    )}
                  </div>
                  <InputField label="Question" value={q.question} onChange={v => updateQuiz(idx, 'question', v)} placeholder="Ano ang...?" />
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="relative">
                        <InputField
                          label={`Option ${oi + 1} ${oi === q.correctIndex ? '✅' : ''}`}
                          value={opt}
                          onChange={v => {
                            const newOpts = [...q.options];
                            newOpts[oi] = v;
                            updateQuiz(idx, 'options', newOpts);
                          }}
                          placeholder={`Option ${oi + 1}...`}
                        />
                        <button
                          onClick={() => updateQuiz(idx, 'correctIndex', oi)}
                          className={`absolute top-0 right-0 text-xs px-2 py-0.5 rounded-full ${
                            oi === q.correctIndex ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {oi === q.correctIndex ? 'Correct ✓' : 'Set correct'}
                        </button>
                      </div>
                    ))}
                  </div>
                  <InputField label="Explanation" value={q.explanation} onChange={v => updateQuiz(idx, 'explanation', v)} placeholder="Explanation when answered..." />
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveLesson}
                disabled={saving || !lesson.title || !lesson.slug}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : '💾 Save Lesson to Database'}
              </button>
              {saved && (
                <span className="text-emerald-400 text-sm font-medium animate-fade-in">
                  ✅ Saved successfully!
                </span>
              )}
            </div>
          </div>
        )}

        {/* Quiz Builder Tab (standalone) */}
        {activeTab === 'quiz' && (
          <div className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] text-center animate-fade-in">
            <div className="text-5xl mb-4">🏗️</div>
            <h2 className="text-2xl font-bold text-white mb-3">Standalone Quiz Builder</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              For now, quizzes are created inside the Lesson Editor. Switch to the &quot;Lesson Editor&quot; tab to add quizzes along with lesson content!
            </p>
            <button
              onClick={() => setActiveTab('lessons')}
              className="px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors"
            >
              Go to Lesson Editor →
            </button>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard title="Total Users" value={stats.totalUsers} icon="👥" gradient="from-blue-500" />
              <StatCard title="Quizzes Completed" value={stats.totalQuizzes} icon="📝" gradient="from-purple-500" />
              <StatCard title="Total Points Earned" value={stats.totalScores} icon="⭐" gradient="from-amber-500" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable Form Components                                           */
/* ------------------------------------------------------------------ */

function InputField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-slate-900">{opt}</option>)}
      </select>
    </div>
  );
}

function StatCard({ title, value, icon, gradient }: { title: string; value: number; icon: string; gradient: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
      <div className={`absolute -right-4 -top-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${gradient} to-transparent text-transparent bg-clip-text blur-sm`}>
        {icon}
      </div>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{title}</div>
    </div>
  );
}
