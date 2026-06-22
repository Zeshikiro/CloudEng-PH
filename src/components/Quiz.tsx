'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  lessonId: string;
  questions: QuizQuestion[];
}

export default function Quiz({ lessonId, questions }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'local'>('idle');

  const { user } = useAuth();
  const storageKey = `${lessonId}-quiz`;

  useEffect(() => {
    loadPreviousScore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadPreviousScore = async () => {
    // Try Supabase first if logged in
    if (user) {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('quiz_scores')
          .select('score, total, answers')
          .eq('user_id', user.id)
          .eq('lesson_slug', lessonId)
          .single();

        if (data) {
          setSavedScore(data.score);
          setSelectedAnswers(data.answers || {});
          setIsSubmitted(true);
          setScore(data.score);
          setShowResults(true);
          setSyncStatus('synced');
          return;
        }
      } catch {
        // Fall through to localStorage
      }
    }

    // Fallback to localStorage
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setSavedScore(data.score);
        setSelectedAnswers(data.answers || {});
        setIsSubmitted(true);
        setScore(data.score);
        setShowResults(true);
        setSyncStatus(user ? 'local' : 'idle');
      }
    } catch {
      // Ignore parse errors
    }
  };

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) return;

    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });

    setScore(correct);
    setIsSubmitted(true);

    // Animate score reveal
    setTimeout(() => setShowResults(true), 300);

    const quizData = {
      score: correct,
      total: questions.length,
      answers: selectedAnswers,
      completedAt: new Date().toISOString(),
    };

    // Save to localStorage first (always available)
    try {
      localStorage.setItem(storageKey, JSON.stringify(quizData));
    } catch {
      // Ignore storage errors
    }

    // Sync to Supabase if logged in
    if (user) {
      setSyncStatus('syncing');
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('quiz_scores')
          .upsert({
            user_id: user.id,
            lesson_slug: lessonId,
            score: correct,
            total: questions.length,
            answers: selectedAnswers,
            completed_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,lesson_slug',
          });

        if (!error) {
          setSyncStatus('synced');
        } else {
          setSyncStatus('local');
        }
      } catch {
        setSyncStatus('local');
      }
    } else {
      setSyncStatus('local');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setSavedScore(null);
    setSyncStatus('idle');
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  const getScoreEmoji = () => {
    const pct = score / questions.length;
    if (pct === 1) return { emoji: '🎉', label: 'Perfect Score!', sublabel: 'Astig ka pre! Cloud expert ka na!' };
    if (pct >= 0.66) return { emoji: '👍', label: 'Magaling!', sublabel: 'Halos lahat tama mo, konting review na lang!' };
    return { emoji: '💪', label: 'Try Ulit!', sublabel: 'Okay lang yan, balik ka sa lessons tapos try ulit!' };
  };

  return (
    <div className="mt-16 mb-8">
      {/* Quiz Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          Quiz Time
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Test Your Knowledge
        </h2>
        <p className="text-slate-400 text-sm">
          {savedScore !== null && !isSubmitted
            ? `Previous score: ${savedScore}/${questions.length}`
            : 'Sagutin mo yung mga tanong na \'to para ma-check kung naintindihan mo.'}
        </p>
      </div>

      {/* Score Results */}
      {showResults && (
        <div className={`mb-10 text-center transition-all duration-500 ${showResults ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block p-8 rounded-2xl bg-slate-800/50 border border-white/10 backdrop-blur-sm">
            <div className="text-6xl mb-3 animate-bounce">{getScoreEmoji().emoji}</div>
            <div className="text-3xl font-bold text-white mb-1">{score}/{questions.length}</div>
            <div className="text-lg font-semibold text-blue-400 mb-1">{getScoreEmoji().label}</div>
            <div className="text-sm text-slate-400 mb-2">{getScoreEmoji().sublabel}</div>

            {/* Sync status badge */}
            <div className="flex items-center justify-center gap-1.5 text-xs mt-3">
              {syncStatus === 'synced' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Saved to cloud
                </span>
              )}
              {syncStatus === 'syncing' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Syncing...
                </span>
              )}
              {syncStatus === 'local' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  💾 Saved locally
                  {!user && ' — Log in to sync'}
                </span>
              )}
            </div>

            <button
              onClick={handleRetake}
              className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              🔄 Retake Quiz
            </button>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
              isSubmitted && selectedAnswers[q.id] === q.correctIndex
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : isSubmitted && selectedAnswers[q.id] !== q.correctIndex
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-white/[0.08] bg-slate-900/40'
            }`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm font-bold text-blue-400 border border-blue-500/20">
                  {qIndex + 1}
                </span>
                <h4 className="text-base sm:text-lg font-semibold text-white leading-snug pt-1">
                  {q.question}
                </h4>
              </div>

              <div className="grid gap-2 sm:gap-3 ml-11">
                {q.options.map((option, optIndex) => {
                  const isSelected = selectedAnswers[q.id] === optIndex;
                  const isCorrect = q.correctIndex === optIndex;
                  const showCorrect = isSubmitted && isCorrect;
                  const showWrong = isSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      disabled={isSubmitted}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        showCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : showWrong
                          ? 'bg-red-500/15 border-red-500/40 text-red-300'
                          : isSelected
                          ? 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-800/40 border-white/[0.06] text-slate-300 hover:bg-slate-700/40 hover:border-white/10 hover:text-white'
                      } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
                          showCorrect
                            ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300'
                            : showWrong
                            ? 'border-red-400 bg-red-500/30 text-red-300'
                            : isSelected
                            ? 'border-blue-400 bg-blue-500/30 text-blue-300'
                            : 'border-slate-600'
                        }`}>
                          {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + optIndex)}
                        </span>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isSubmitted && (
                <div className={`mt-3 ml-11 p-3 rounded-lg text-sm transition-all duration-500 ${
                  selectedAnswers[q.id] === q.correctIndex
                    ? 'bg-emerald-500/10 text-emerald-300/80'
                    : 'bg-amber-500/10 text-amber-300/80'
                }`}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 ${
              allAnswered
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-white/[0.06] cursor-not-allowed'
            }`}
          >
            {allAnswered ? '🚀 Submit Answers' : `Pumili ka muna ng sagot (${Object.keys(selectedAnswers).length}/${questions.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
