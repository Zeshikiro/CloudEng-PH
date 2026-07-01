'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CertificateContent() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [completionDate, setCompletionDate] = useState('');
  const [checking, setChecking] = useState(true);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const checkEligibility = async () => {
      if (!user) return;
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('quiz_scores')
          .select('lesson_slug, completed_at')
          .eq('user_id', user.id);

        if (data) {
          const slugs = data.map(d => d.lesson_slug);
          const hasLesson1 = slugs.some(s => s.includes('lesson-1'));
          const hasLesson2 = slugs.some(s => s.includes('lesson-2'));

          if (hasLesson1 && hasLesson2) {
            setEligible(true);
            const latest = data.reduce((acc, curr) =>
              new Date(curr.completed_at) > new Date(acc.completed_at) ? curr : acc
            );
            setCompletionDate(new Date(latest.completed_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }));
          }
        }
      } catch {
        // Supabase error
      } finally {
        setChecking(false);
      }
    };
    if (user) checkEligibility();
  }, [user]);

  if (!mounted || authLoading || checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Cloud Learner';

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {!eligible ? (
          /* Not Eligible */
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
              Certificate Locked
            </h1>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Complete all Module 1 lessons (Lesson 1 and Lesson 2 quizzes) to earn your Certificate of Completion!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lesson-1" className="px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors">
                📖 Go to Lesson 1
              </Link>
              <Link href="/lesson-2" className="px-6 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium hover:bg-purple-500/20 transition-colors">
                📖 Go to Lesson 2
              </Link>
            </div>
          </div>
        ) : (
          /* Certificate */
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-2">
                🎓 Your Certificate
              </h1>
              <p className="text-slate-400">Congratulations on completing Module 1!</p>
            </div>

            {/* Certificate Card */}
            <div id="certificate-card" className="relative mx-auto max-w-2xl bg-gradient-to-br from-slate-50 to-amber-50 rounded-3xl p-12 shadow-2xl border-4 border-amber-400/60 print:border-amber-500 print:shadow-none">
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

              <div className="text-center space-y-6">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-lg">☁️</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CloudEng PH
                  </span>
                </div>

                <div className="pt-4">
                  <p className="text-amber-700 text-sm font-semibold uppercase tracking-[0.3em]">Certificate of Completion</p>
                </div>

                <div className="py-4 border-y border-amber-300/40">
                  <p className="text-slate-500 text-sm mb-2">This certifies that</p>
                  <h2 className="text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-slate-800">
                    {displayName}
                  </h2>
                </div>

                <div>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                    Has successfully completed <strong>Module 1: Introduction to Cloud Computing</strong> on the CloudEng PH learning platform.
                  </p>
                </div>

                <div className="pt-4">
                  <p className="text-slate-400 text-xs">{completionDate}</p>
                  <p className="text-slate-400 text-xs mt-1">CloudEng PH — Learn Cloud Engineering in Taglish</p>
                </div>

                <div className="pt-2">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800 text-xs font-bold tracking-wider">
                    ✦ VERIFIED ✦
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
              >
                📄 Download as PDF
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://cloud-eng-ph.vercel.app/certificate')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 font-medium hover:bg-blue-600/20 transition-colors text-center"
              >
                💼 Share on LinkedIn
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden !important; }
          #certificate-card, #certificate-card * { visibility: visible !important; }
          #certificate-card { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 700px; }
        }
      `}</style>
    </div>
  );
}
