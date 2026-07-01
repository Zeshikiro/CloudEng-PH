'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { useEffect, useState } from 'react';

const lessons = [
  {
    id: 1,
    slug: 'lesson-1',
    title: 'What is the Cloud? Why not a home PC?',
    description: "Introduction to Cloud Computing — analogies, problems solved, Big 3 providers, and why it isn't magic.",
    module: 'Module 1 — Introduction',
    difficulty: 'Beginner',
    duration: '~10 min',
    sections: 4,
    icon: '☁️',
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
  },
  {
    id: 2,
    slug: 'lesson-2',
    title: 'IaaS, PaaS, SaaS — What is the Difference?',
    description: 'Learn the three cloud service models and when to use each one.',
    module: 'Module 1 — Introduction',
    difficulty: 'Beginner',
    duration: '~12 min',
    sections: 4,
    icon: '🧱',
    gradient: 'from-purple-500 to-pink-500',
    available: true,
  },
  {
    id: 3,
    slug: 'labs/aws-setup',
    title: 'AWS Account Setup — Hands-on Lab!',
    description: 'Step-by-step hands-on lab on creating an AWS Free Tier account and navigating the console.',
    module: 'Module 2 — Getting Started',
    difficulty: 'Beginner',
    duration: '~15 min',
    sections: 6,
    icon: '🔑',
    gradient: 'from-amber-500 to-orange-500',
    available: true,
  },
  {
    id: 4,
    slug: 'lesson-3',
    title: 'Lesson 3: Compute, Storage, Networking',
    description: 'The Big 3 of Cloud Services — EC2, S3, and VPC. Learn how they work together.',
    module: 'Module 2 — Getting Started',
    difficulty: 'Beginner',
    duration: '~15 min',
    sections: 4,
    icon: '☁️',
    gradient: 'from-blue-500 to-indigo-500',
    available: true,
  },
  {
    id: 5,
    slug: 'labs/ec2-launch',
    title: 'EC2 — How to Launch a Virtual Machine',
    description: 'Hands-on lab: launch an EC2 instance, use SSH, and deploy a simple web app.',
    module: 'Module 2 — Getting Started',
    difficulty: 'Intermediate',
    duration: '~20 min',
    sections: 7,
    icon: '🖥️',
    gradient: 'from-emerald-500 to-teal-500',
    available: true,
  },
  {
    id: 6,
    slug: 'labs/s3-hosting',
    title: 'S3 — Host a Static Website',
    description: 'Hands-on lab: Host a static website using AWS S3 — no servers needed!',
    module: 'Module 2 — Getting Started',
    difficulty: 'Beginner',
    duration: '~20 min',
    sections: 6,
    icon: '🌐',
    gradient: 'from-cyan-500 to-blue-500',
    available: true,
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10">
        {/* ================================================================
            HERO
            ================================================================ */}
        <section className="pt-32 pb-20 sm:pt-44 sm:pb-28 px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free &amp; Open — For Everyone
              </span>
            </div>

            {/* Title */}
            <h1 className={`mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-white">Learn </span>
              <span className="text-gradient-primary">Cloud Engineering</span>
              <br />
              <span className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-medium">
                in simple English. For free. 🇵🇭
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Interactive lessons, quizzes, and hands-on labs to help you learn{' '}
              <strong className="text-blue-400">AWS</strong>,{' '}
              <strong className="text-purple-400">Azure</strong>, and{' '}
              <strong className="text-emerald-400">GCP</strong> — 
              even with zero experience. Designed for Filipino learners. 🚀
            </p>

            {/* CTA Buttons */}
            <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                href="/lesson-1"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <span>Start Learning</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </Link>
              <span className="text-sm text-slate-500">
                6 lessons & labs available • More coming soon
              </span>
            </div>

            {/* Stats */}
            <div className={`mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">6</div>
                <div className="text-xs text-slate-500 mt-1">Lessons & Labs</div>
              </div>
              <div className="text-center border-x border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">15+</div>
                <div className="text-xs text-slate-500 mt-1">Quiz Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">∞</div>
                <div className="text-xs text-slate-500 mt-1">Hands-on Labs</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FEATURES
            ================================================================ */}
        <section className="py-16 px-4 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              <FeatureCard
                icon="📖"
                title="Interactive Lessons"
                desc="Card-based lessons that are easy to digest. Short paragraphs, analogies, and real-world examples. Not a boring textbook style."
                color="blue"
              />
              <FeatureCard
                icon="🧠"
                title="Quizzes per Lesson"
                desc="Test your knowledge right after each lesson. Your progress is saved in your browser — pick up exactly where you left off."
                color="purple"
              />
              <FeatureCard
                icon="⚡"
                title="Hands-on Labs"
                desc="Not just theory — includes actual lab exercises using real AWS services. We only use the free tier."
                color="emerald"
              />
            </div>
          </div>
        </section>

        {/* ================================================================
            LESSONS LIST
            ================================================================ */}
        <section className="py-16 px-4 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                Course Roadmap
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Just follow the lessons in order — from zero to cloud engineer.
              </p>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <LessonListItem key={lesson.id} lesson={lesson} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            HERO IMAGE SECTION
            ================================================================ */}
        <section className="py-16 px-4 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-blue-500/5">
              <Image
                src="/cloud-hero.png"
                alt="Cloud Computing — interconnected servers visualization"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* ================================================================
            FOOTER
            ================================================================ */}
        <footer className="border-t border-white/[0.04] py-8 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-gradient-primary font-bold">CloudEng PH</span>
              <span>•</span>
              <span>Made with ☁️ for aspiring Filipino cloud engineers</span>
            </div>
            <div>© 2026</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/10',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/10',
    emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/10',
  };

  return (
    <div className="group p-6 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border`}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function LessonListItem({ lesson, index }: { lesson: typeof lessons[0]; index: number }) {
  return (
    <div className={`group relative ${!lesson.available ? 'opacity-50' : ''}`}>
      {/* Timeline connector */}
      {index < lessons.length - 1 && (
        <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-white/10 to-transparent -z-10" />
      )}
      
      {lesson.available ? (
        <Link href={`/${lesson.slug}`} className="block">
          <LessonCardInner lesson={lesson} />
        </Link>
      ) : (
        <div className="cursor-not-allowed">
          <LessonCardInner lesson={lesson} />
        </div>
      )}
    </div>
  );
}

function LessonCardInner({ lesson }: { lesson: typeof lessons[0] }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-slate-900/30 border border-white/[0.06] group-hover:border-white/[0.12] group-hover:bg-slate-900/50 transition-all duration-300">
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${lesson.gradient} flex items-center justify-center text-2xl shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
        {lesson.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{lesson.module}</span>
          {!lesson.available && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-500 font-medium">Coming Soon</span>
          )}
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
          Lesson {lesson.id}: {lesson.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block truncate">{lesson.description}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 flex-shrink-0">
        <span>{lesson.duration}</span>
        <span>•</span>
        <span>{lesson.sections} sections</span>
      </div>

      {/* Arrow */}
      {lesson.available && (
        <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </div>
  );
}
