'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Link from 'next/link';

interface LessonData {
  title: string;
  slug: string;
  module: string;
  difficulty: string;
  description: string;
  sections: Array<{ title: string; icon: string; content: string }>;
  quiz: Array<{ question: string; options: string[]; correctIndex: number; explanation: string }>;
}

export default function DynamicLessonContent({ slug }: { slug: string }) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('cms_lessons')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setLesson(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [slug]);

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*<\/li>)/g, '<ul class="list-disc pl-5 space-y-1 text-slate-400">$1</ul>')
      .replace(/\n\n/g, '</p><p>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !lesson) {
    return (
      <div className="relative min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 max-w-3xl mx-auto px-4 pt-32 pb-24 text-center">
          <div className="text-6xl mb-6">📭</div>
          <h1 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
            Lesson Not Found
          </h1>
          <p className="text-slate-400 mb-8">
            The lesson &quot;{slug}&quot; doesn&apos;t exist yet. It may not have been published from the Admin CMS.
          </p>
          <Link href="/" className="px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors">
            ← Back to Home
          </Link>
        </main>
      </div>
    );
  }

  const quizScore = lesson.quiz.length > 0 && quizSubmitted
    ? lesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length
    : 0;

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Hero */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              {lesson.module}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              {lesson.difficulty}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
            {lesson.title}
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">{lesson.description}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {lesson.sections.map((section, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-xl animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <div
                className="text-slate-300 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Quiz */}
        {lesson.quiz.length > 0 && (
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-xl animate-fade-in">
            <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6">
              📝 Quiz
            </h2>

            <div className="space-y-8">
              {lesson.quiz.map((q, qi) => (
                <div key={qi} className="space-y-3">
                  <p className="text-white font-medium">{qi + 1}. {q.question}</p>
                  <div className="grid gap-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = q.correctIndex === oi;
                      const showResult = quizSubmitted;

                      return (
                        <button
                          key={oi}
                          onClick={() => {
                            if (!quizSubmitted) {
                              setQuizAnswers(prev => ({ ...prev, [qi]: oi }));
                            }
                          }}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
                            showResult && isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : showResult && isSelected && !isCorrect
                                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                : isSelected
                                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                  : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:bg-white/[0.06]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-xs text-slate-400 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <p className="text-2xl font-bold text-white mb-1">
                  {quizScore}/{lesson.quiz.length}
                </p>
                <p className="text-sm text-slate-400">
                  {quizScore === lesson.quiz.length ? 'Perfect score! 🎉' : 'Keep learning and try again!'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="px-6 py-3 rounded-xl bg-white/5 border border-white/[0.08] text-slate-400 font-medium hover:bg-white/10 transition-colors">
            ← Back to All Lessons
          </Link>
        </div>
      </main>
    </div>
  );
}
