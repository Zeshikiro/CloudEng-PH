'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LabStep {
  id: number;
  title: string;
  content: ReactNode;
}

interface LabViewerProps {
  labId: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: string;
  steps: LabStep[];
}

/* ------------------------------------------------------------------ */
/*  Confetti Particle                                                  */
/* ------------------------------------------------------------------ */

function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  // eslint-disable-next-line react-hooks/purity
  const left = Math.random() * 100;
  // eslint-disable-next-line react-hooks/purity
  const size = Math.random() * 8 + 4;
  // eslint-disable-next-line react-hooks/purity
  const duration = Math.random() * 2 + 2;

  return (
    <div
      className="absolute top-0 rounded-sm opacity-0 pointer-events-none"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size * 1.5}px`,
        backgroundColor: color,
        animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Celebration Screen                                                 */
/* ------------------------------------------------------------------ */

function CelebrationScreen({ title }: { title: string }) {
  const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#60a5fa', '#a78bfa'];
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    // eslint-disable-next-line react-hooks/purity
    delay: Math.random() * 1.5,
    color: colors[i % colors.length],
  }));

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 overflow-hidden">
      {/* Confetti */}
      {particles.map((p) => (
        <ConfettiParticle key={p.id} delay={p.delay} color={p.color} />
      ))}

      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 animate-fade-in-up">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4">
          Lab Complete!
        </h2>
        <p className="text-lg text-slate-300 max-w-md mx-auto mb-2">
          Congratulations! You have finished
        </p>
        <p className="text-xl font-semibold text-gradient-primary mb-8">
          {title}
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-emerald font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All steps completed
          </span>
        </div>
      </div>

      {/* Confetti keyframe */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(70vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main LabViewer Component                                           */
/* ------------------------------------------------------------------ */

export default function LabViewer({ labId, title, description, estimatedTime, difficulty, steps }: LabViewerProps) {
  const storageKey = `lab-${labId}-progress`;

  /* --- state --- */
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const allDone = completedSteps.size === steps.length;

  /* --- load progress from localStorage --- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (data.completed) setCompletedSteps(new Set(data.completed));
        if (typeof data.currentStep === 'number') setCurrentStep(data.currentStep);
      }
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  /* --- persist progress --- */
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          completed: Array.from(completedSteps),
          currentStep,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [completedSteps, currentStep, storageKey]);

  /* --- navigation helpers --- */
  const goToStep = useCallback(
    (index: number) => {
      if (index === currentStep || index < 0 || index >= steps.length) return;
      setDirection(index > currentStep ? 'next' : 'prev');
      setTransitioning(true);
      setTimeout(() => {
        setCurrentStep(index);
        setTransitioning(false);
        setSidebarOpen(false);
      }, 200);
    },
    [currentStep, steps.length],
  );

  const toggleCompleted = useCallback(
    (stepId: number) => {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        if (next.has(stepId)) next.delete(stepId);
        else next.add(stepId);
        return next;
      });
    },
    [],
  );

  /* --- derived --- */
  const progressPercent = Math.round((completedSteps.size / steps.length) * 100);
  const step = steps[currentStep];

  /* --- difficulty badge colour --- */
  const difficultyColor: Record<string, string> = {
    Beginner: 'text-emerald bg-emerald/10 border-emerald/20',
    Intermediate: 'text-amber bg-amber/10 border-amber/20',
    Advanced: 'text-rose bg-rose/10 border-rose/20',
  };
  const diffBadge = difficultyColor[difficulty] ?? difficultyColor.Beginner;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen pt-20 pb-24 relative z-10">
      {/* ========== HEADER BAR ========== */}
      <div className="glass-strong sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Left: title + badges */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex-shrink-0 p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle steps sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-white truncate font-[family-name:var(--font-space-grotesk)]">
                {title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {estimatedTime}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${diffBadge}`}>
                  {difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Right: progress bar */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-slate-400 whitespace-nowrap">{progressPercent}% done</span>
            <div className="w-32 sm:w-40 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex gap-6 relative">
        {/* ========== SIDEBAR — Desktop ========== */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="glass rounded-2xl p-4 sticky top-36">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 px-2">Lab Steps</p>
            <nav className="space-y-1">
              {steps.map((s, i) => {
                const isActive = i === currentStep;
                const isDone = completedSteps.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => goToStep(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-500/10 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Circle */}
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 ${
                        isDone
                          ? 'bg-emerald/20 border-emerald text-emerald'
                          : isActive
                          ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                          : 'border-slate-600 text-slate-500 group-hover:border-slate-400'
                      }`}
                    >
                      {isDone ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ========== MOBILE SIDEBAR OVERLAY ========== */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            {/* Drawer */}
            <div
              className="absolute left-0 top-0 bottom-0 w-72 glass-strong animate-slide-in-left overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Lab Steps</p>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-1">
                  {steps.map((s, i) => {
                    const isActive = i === currentStep;
                    const isDone = completedSteps.has(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => goToStep(i)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-500/10 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                            isDone
                              ? 'bg-emerald/20 border-emerald text-emerald'
                              : isActive
                              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                              : 'border-slate-600 text-slate-500'
                          }`}
                        >
                          {isDone ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span className="truncate">{s.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 min-w-0">
          {allDone ? (
            <CelebrationScreen title={title} />
          ) : (
            <>
              {/* Step card */}
              <div
                className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${
                  transitioning
                    ? direction === 'next'
                      ? 'opacity-0 translate-x-4'
                      : 'opacity-0 -translate-x-4'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                {/* Step header */}
                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                    {step.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{description}</p>
                </div>

                {/* Step content */}
                <div className="px-6 sm:px-8 py-6 sm:py-8 text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
                  {step.content}
                </div>

                {/* Mark as done */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <label className="inline-flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={completedSteps.has(step.id)}
                        onChange={() => toggleCompleted(step.id)}
                        className="sr-only peer"
                      />
                      <div className="w-6 h-6 rounded-lg border-2 border-slate-600 peer-checked:border-emerald peer-checked:bg-emerald/20 transition-all duration-200 flex items-center justify-center group-hover:border-slate-400 peer-checked:group-hover:border-emerald">
                        <svg
                          className="w-3.5 h-3.5 text-emerald opacity-0 peer-checked:opacity-100 transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {/* The checkmark is rendered inside the div above but needs peer context */}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${completedSteps.has(step.id) ? 'text-emerald' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {completedSteps.has(step.id) ? 'Step completed! ✓' : 'Mark step as done'}
                    </span>
                  </label>
                </div>
              </div>

              {/* ========== BOTTOM NAV ========== */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => goToStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'glass text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="text-xs text-slate-500 hidden sm:block">
                  Step {currentStep + 1} of {steps.length}
                </span>

                <button
                  onClick={() => goToStep(currentStep + 1)}
                  disabled={currentStep === steps.length - 1}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentStep === steps.length - 1
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-400 hover:to-purple-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
