'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Link from 'next/link';

interface LeaderboardEntry {
  user_id: string;
  total_score: number;
  total_quizzes: number;
  display_name: string | null;
  avatar_url: string | null;
}

export default function LeaderboardContent() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const supabase = createClient();
        
        // Note: For a production app with millions of users, this should be a DB view or Edge Function.
        // For our learning platform, this client-side aggregation is fine.
        const { data: scores, error: scoresError } = await supabase
          .from('quiz_scores')
          .select('user_id, score');

        if (scoresError || !scores) throw new Error('Could not fetch scores');

        const { data: profiles, error: profilesError } = await supabase
          .from('user_profiles')
          .select('id, display_name, avatar_url');

        if (profilesError || !profiles) throw new Error('Could not fetch profiles');

        // Aggregate scores by user
        const aggregated = scores.reduce((acc: Record<string, { score: number, count: number }>, curr) => {
          if (!acc[curr.user_id]) acc[curr.user_id] = { score: 0, count: 0 };
          acc[curr.user_id].score += curr.score;
          acc[curr.user_id].count += 1;
          return acc;
        }, {});

        // Map to profiles and sort
        const entries = Object.keys(aggregated).map(userId => {
          const profile = profiles.find(p => p.id === userId);
          return {
            user_id: userId,
            total_score: aggregated[userId].score,
            total_quizzes: aggregated[userId].count,
            display_name: profile?.display_name || 'Anonymous Cloud Learner',
            avatar_url: profile?.avatar_url || null
          };
        }).sort((a, b) => b.total_score - a.total_score);

        setLeaderboard(entries);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            Community
          </div>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Who are the top Cloud Engineers?
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center p-12 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
            <div className="text-6xl mb-6">🏃‍♂️</div>
            <h2 className="text-2xl font-bold text-white mb-4">No entries in the leaderboard yet.</h2>
            <p className="text-slate-400 mb-8">Be the first! Take a quiz to get on the board.</p>
            <Link 
              href="/lesson-1"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Start Learning →
            </Link>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            {leaderboard.map((entry, index) => {
              const isCurrentUser = user?.id === entry.user_id;
              let medal = '';
              if (index === 0) medal = '🥇';
              if (index === 1) medal = '🥈';
              if (index === 2) medal = '🥉';

              return (
                <div 
                  key={entry.user_id}
                  className={`flex items-center p-4 sm:p-6 rounded-2xl backdrop-blur-xl transition-all ${
                    isCurrentUser 
                      ? 'bg-blue-500/10 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 scale-[1.02]' 
                      : 'bg-slate-900/60 border border-white/[0.08] hover:bg-slate-800/60'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 sm:w-16 flex-shrink-0 text-center font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-400">
                    {medal || `#${index + 1}`}
                  </div>
                  
                  <div className="flex-grow flex items-center gap-4">
                    {entry.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={entry.avatar_url} alt="Avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm sm:text-base border border-white/10">
                        {entry.display_name?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    
                    <div>
                      <div className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                        {entry.display_name}
                        {isCurrentUser && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white ml-2">You</span>}
                      </div>
                      <div className="text-sm text-slate-400">
                        {entry.total_quizzes} quizzes completed
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                      {entry.total_score}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">
                      Points
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
