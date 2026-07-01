'use client';

import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  sections: string[];
}

export default function ProgressBar({ sections }: ProgressBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Find all section elements by their IDs
    sectionRefs.current = sections.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <div className="sticky top-16 z-40 py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Progress bar */}
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Section dots */}
        <div className="flex items-center justify-between">
          {sections.map((sectionId, index) => {
            const labelMap: Record<string, string> = {
              analogy: 'Analogy', problems: 'Problems', big3: 'Big 3', 'not-magic': 'Not Magic',
              pizza: 'Pizza Analogy', iaas: 'IaaS', 'paas-saas': 'PaaS & SaaS', comparison: 'Comparison',
              compute: 'Compute', storage: 'Storage', networking: 'Networking', together: 'Together',
              'what-is-iac': 'What is IaC', 'why-iac': 'Why IaC', terraform: 'Terraform',
              'code-example': 'Code', challenge: 'Challenge',
              quiz: 'Quiz',
            };
            const label = labelMap[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <button
                key={sectionId}
                onClick={() => scrollToSection(index)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50'
                      : isPast
                      ? 'bg-purple-400/60'
                      : 'bg-slate-700 group-hover:bg-slate-500'
                  }`}
                />
                <span
                  className={`hidden sm:block text-xs font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-blue-400'
                      : isPast
                      ? 'text-purple-400/60'
                      : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
