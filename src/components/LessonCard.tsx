'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LessonCardProps {
  icon: string;
  title: string;
  children: ReactNode;
  gradient?: string;
  delay?: number;
}

export default function LessonCard({ icon, title, children, gradient = 'from-blue-500/20 to-purple-500/20', delay = 0 }: LessonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Spotlight follow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 149, 255, 0.06), transparent 60%)`,
          }}
        />
      )}

      {/* Glass background */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Gradient accent on top */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>
        <div className="text-slate-300 leading-relaxed space-y-3 text-sm sm:text-base">
          {children}
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
