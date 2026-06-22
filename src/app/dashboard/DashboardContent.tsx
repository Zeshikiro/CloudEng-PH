'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface QuizScore {
  lesson_slug: string;
  score: number;
  total: number;
  completed_at: string;
}

export default function DashboardContent() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [labsCount, setLabsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('quiz_scores')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });
          
        if (data) setScores(data);
        
        // Count labs from localStorage (simplified lab tracking)
        let lCount = 0;
        if (localStorage.getItem('labs/aws-setup-lab')) lCount++;
        if (localStorage.getItem('labs/ec2-launch-lab')) lCount++;
        setLabsCount(lCount);
        
      } catch {
        // Fallback for anonymous mode
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchData();
  }, [user]);

  if (authLoading || !mounted || (!user && !loading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalQuizzes = scores.length;
  const avgScore = totalQuizzes > 0 
    ? Math.round((scores.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / totalQuizzes) * 100)
    : 0;
    
  const hasPerfectScore = scores.some(s => s.score === s.total);

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-inter)] text-slate-200">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
            Welcome back, {profile?.display_name || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Here&apos;s your cloud engineering journey so far.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <StatCard title="Lessons Completed" value={totalQuizzes} icon="📚" gradient="from-blue-500" />
          <StatCard title="Quiz Avg Score" value={`${avgScore}%`} icon="🎯" gradient="from-purple-500" />
          <StatCard title="Labs Completed" value={labsCount} icon="⚡" gradient="from-amber-500" />
          <StatCard title="Current Streak" value="1 🔥" icon="📅" gradient="from-emerald-500" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            
            {/* Progress Section */}
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6">Module Progress</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ProgressRing 
                  title="Module 1: Intro" 
                  progress={Math.min(100, (scores.filter(s => s.lesson_slug.startsWith('lesson-1') || s.lesson_slug.startsWith('lesson-2')).length / 2) * 100)} 
                  color="stroke-blue-500" 
                />
                <ProgressRing 
                  title="Module 2: Basics" 
                  progress={Math.min(100, ((scores.filter(s => s.lesson_slug.startsWith('lesson-3')).length + labsCount) / 3) * 100)} 
                  color="stroke-purple-500" 
                />
              </div>
            </div>

            {/* Achievements Section */}
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6">Achievements</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Badge title="Cloud Curious" desc="Started first lesson" icon="🌤️" unlocked={totalQuizzes > 0} />
                <Badge title="Perfect Score" desc="100% on any quiz" icon="💯" unlocked={hasPerfectScore} />
                <Badge title="Lab Explorer" desc="Completed first lab" icon="🧪" unlocked={labsCount > 0} />
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            
            {/* Quick Actions */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-white/[0.08] shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/lesson-3" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.05] transition-colors">
                  <div className="font-medium text-blue-400">Next Lesson →</div>
                  <div className="text-sm text-slate-400">Lesson 3: The Big 3</div>
                </Link>
                <Link href="/labs/aws-setup" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.05] transition-colors">
                  <div className="font-medium text-amber-400">Try a Lab ⚡</div>
                  <div className="text-sm text-slate-400">AWS Account Setup</div>
                </Link>
                <Link href="/leaderboard" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.05] transition-colors">
                  <div className="font-medium text-purple-400">View Leaderboard 🏆</div>
                  <div className="text-sm text-slate-400">See global rankings</div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
              {scores.length === 0 ? (
                <p className="text-sm text-slate-500">No activity yet. Start your first lesson!</p>
              ) : (
                <div className="space-y-4">
                  {scores.slice(0, 5).map((score, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="text-xl">✅</div>
                      <div>
                        <div className="text-slate-300">Completed <span className="font-medium text-white">{score.lesson_slug}</span> quiz</div>
                        <div className="text-slate-500 text-xs">Score: {score.score}/{score.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, gradient }: { title: string, value: string | number, icon: string, gradient: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] border-l-4 border-l-${gradient.replace('from-', '')} shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
      <div className={`absolute -right-4 -top-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${gradient} to-transparent text-transparent bg-clip-text blur-sm`}>
        {icon}
      </div>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{title}</div>
    </div>
  );
}

function ProgressRing({ title, progress, color }: { title: string, progress: number, color: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
          <circle 
            cx="40" cy="40" r="35" 
            stroke="currentColor" strokeWidth="6" fill="transparent" 
            strokeDasharray={circumference} strokeDashoffset={offset}
            className={`${color} transition-all duration-1000 ease-out`} 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {Math.round(progress)}%
        </div>
      </div>
      <div>
        <div className="font-medium text-white mb-1">{title}</div>
        <div className="text-sm text-slate-400">Keep it up!</div>
      </div>
    </div>
  );
}

function Badge({ title, desc, icon, unlocked }: { title: string, desc: string, icon: string, unlocked: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${unlocked ? 'bg-gradient-to-br from-white/10 to-transparent border-white/[0.15] shadow-lg shadow-white/5' : 'bg-white/[0.02] border-white/[0.05] opacity-50 grayscale'}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-bold text-white text-sm mb-1">{title}</div>
      <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
    </div>
  );
}
