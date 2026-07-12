'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { useEffect, useState } from 'react';

/* ================================================================== */
/*  Track & Lesson Data                                                */
/* ================================================================== */

interface Lesson {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  sections: number;
  icon: string;
  gradient: string;
  available: boolean;
  type: 'lesson' | 'lab';
}

interface Track {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  borderColor: string;
  accentText: string;
  lessons: Lesson[];
}

const tracks: Track[] = [
  {
    id: 'foundations',
    title: 'Cloud Foundations',
    subtitle: 'Understand the cloud before you automate it',
    icon: '☁️',
    gradient: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    accentText: 'text-blue-400',
    lessons: [
      {
        id: 1, slug: 'lesson-1', title: 'What is the Cloud?',
        description: 'Introduction to Cloud Computing — analogies, Big 3 providers, and why it matters.',
        difficulty: 'Beginner', duration: '~10 min', sections: 4, icon: '☁️',
        gradient: 'from-blue-500 to-cyan-500', available: true, type: 'lesson',
      },
      {
        id: 2, slug: 'lesson-2', title: 'IaaS, PaaS, SaaS',
        description: 'The three cloud service models and when to use each one.',
        difficulty: 'Beginner', duration: '~12 min', sections: 4, icon: '🧱',
        gradient: 'from-purple-500 to-pink-500', available: true, type: 'lesson',
      },
      {
        id: 3, slug: 'labs/aws-setup', title: 'AWS Account Setup',
        description: 'Hands-on: Create your free AWS account and explore the console.',
        difficulty: 'Beginner', duration: '~15 min', sections: 6, icon: '🔑',
        gradient: 'from-amber-500 to-orange-500', available: true, type: 'lab',
      },
      {
        id: 4, slug: 'lesson-3', title: 'Compute, Storage, Networking',
        description: 'The Big 3 — EC2, S3, and VPC. How they work together.',
        difficulty: 'Beginner', duration: '~15 min', sections: 4, icon: '🖥️',
        gradient: 'from-blue-500 to-indigo-500', available: true, type: 'lesson',
      },
      {
        id: 5, slug: 'labs/ec2-launch', title: 'Launch a Virtual Machine',
        description: 'Hands-on: Launch an EC2 instance, SSH in, and deploy a web app.',
        difficulty: 'Intermediate', duration: '~20 min', sections: 7, icon: '🖥️',
        gradient: 'from-emerald-500 to-teal-500', available: true, type: 'lab',
      },
      {
        id: 6, slug: 'labs/s3-hosting', title: 'Host a Static Website on S3',
        description: 'Hands-on: Deploy a static site to S3 — no servers needed.',
        difficulty: 'Beginner', duration: '~20 min', sections: 6, icon: '🌐',
        gradient: 'from-cyan-500 to-blue-500', available: true, type: 'lab',
      },
    ],
  },
  {
    id: 'devops-fundamentals',
    title: 'DevOps Fundamentals',
    subtitle: 'The culture, tools, and practices',
    icon: '🔄',
    gradient: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/30',
    accentText: 'text-purple-400',
    lessons: [
      {
        id: 7, slug: 'lesson-4', title: 'Infrastructure as Code (Terraform)',
        description: 'Stop clicking, start coding! Automate cloud deployments with Terraform.',
        difficulty: 'Intermediate', duration: '~15 min', sections: 5, icon: '🏗️',
        gradient: 'from-violet-500 to-fuchsia-500', available: true, type: 'lesson',
      },
      {
        id: 8, slug: 'lesson-5', title: 'What is DevOps?',
        description: 'The DevOps culture, CALMS framework, and how it changes the way teams ship software.',
        difficulty: 'Beginner', duration: '~12 min', sections: 4, icon: '🔄',
        gradient: 'from-purple-500 to-pink-500', available: false, type: 'lesson',
      },
      {
        id: 9, slug: 'lesson-6', title: 'Version Control & Git',
        description: 'Branching strategies, pull requests, and GitOps — the backbone of DevOps.',
        difficulty: 'Beginner', duration: '~15 min', sections: 5, icon: '🌿',
        gradient: 'from-orange-500 to-red-500', available: false, type: 'lesson',
      },
      {
        id: 10, slug: 'lesson-7', title: 'CI/CD Pipelines',
        description: 'Build, test, and deploy automatically with GitHub Actions, Jenkins, and more.',
        difficulty: 'Intermediate', duration: '~18 min', sections: 5, icon: '🚀',
        gradient: 'from-emerald-500 to-cyan-500', available: false, type: 'lesson',
      },
    ],
  },
  {
    id: 'containers',
    title: 'Containers & Orchestration',
    subtitle: 'Package and scale your applications',
    icon: '🐳',
    gradient: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30',
    accentText: 'text-cyan-400',
    lessons: [
      {
        id: 11, slug: 'lesson-8', title: 'Docker & Containers',
        description: 'Images, Dockerfiles, and why containers changed everything.',
        difficulty: 'Intermediate', duration: '~18 min', sections: 5, icon: '🐳',
        gradient: 'from-cyan-500 to-blue-500', available: false, type: 'lesson',
      },
      {
        id: 12, slug: 'lesson-9', title: 'Kubernetes Basics',
        description: 'Pods, Deployments, Services — orchestrate your containers at scale.',
        difficulty: 'Intermediate', duration: '~20 min', sections: 6, icon: '⚙️',
        gradient: 'from-blue-500 to-indigo-500', available: false, type: 'lesson',
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    subtitle: 'See what is happening in production',
    icon: '📊',
    gradient: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    accentText: 'text-amber-400',
    lessons: [
      {
        id: 13, slug: 'lesson-10', title: 'Logging & Monitoring',
        description: 'CloudWatch, Prometheus, and Grafana — know when things break before your users do.',
        difficulty: 'Intermediate', duration: '~15 min', sections: 4, icon: '📊',
        gradient: 'from-amber-500 to-orange-500', available: false, type: 'lesson',
      },
      {
        id: 14, slug: 'lesson-11', title: 'Alerting & Incident Response',
        description: 'PagerDuty, on-call rotations, SLIs/SLOs — the SRE way.',
        difficulty: 'Advanced', duration: '~15 min', sections: 4, icon: '🚨',
        gradient: 'from-red-500 to-rose-500', available: false, type: 'lesson',
      },
    ],
  },
];

const totalLessons = tracks.reduce((acc, t) => acc + t.lessons.length, 0);
const availableLessons = tracks.reduce((acc, t) => acc + t.lessons.filter(l => l.available).length, 0);

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [expandedTrack, setExpandedTrack] = useState<string>('foundations');
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
              <span className="text-white">Your </span>
              <span className="text-gradient-primary">DevOps Journey</span>
              <br />
              <span className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-medium">
                from zero to hero. For free. 🚀
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Master{' '}
              <strong className="text-blue-400">Cloud</strong>,{' '}
              <strong className="text-purple-400">CI/CD</strong>,{' '}
              <strong className="text-cyan-400">Docker</strong>,{' '}
              <strong className="text-emerald-400">Kubernetes</strong>, and{' '}
              <strong className="text-amber-400">Monitoring</strong>{' '}
              — with interactive lessons, hands-on labs, and real-world missions.
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
                {availableLessons} of {totalLessons} lessons available
              </span>
            </div>

            {/* Stats */}
            <div className={`mt-16 grid grid-cols-4 gap-4 sm:gap-8 max-w-xl mx-auto transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">{tracks.length}</div>
                <div className="text-xs text-slate-500 mt-1">Tracks</div>
              </div>
              <div className="text-center border-x border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">{totalLessons}</div>
                <div className="text-xs text-slate-500 mt-1">Lessons</div>
              </div>
              <div className="text-center border-r border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">21+</div>
                <div className="text-xs text-slate-500 mt-1">Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">∞</div>
                <div className="text-xs text-slate-500 mt-1">Hands-on</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FEATURES
            ================================================================ */}
        <section className="py-16 px-4 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-5">
              <FeatureCard
                icon="📖"
                title="Interactive Lessons"
                desc="Easy-to-digest cards with analogies and real-world examples."
                color="blue"
              />
              <FeatureCard
                icon="🧠"
                title="Quizzes"
                desc="Test your knowledge right after each lesson. Progress is saved."
                color="purple"
              />
              <FeatureCard
                icon="⚡"
                title="Hands-on Labs"
                desc="Real AWS exercises using only the free tier. Not just theory."
                color="emerald"
              />
              <FeatureCard
                icon="🎫"
                title="Real-World Missions"
                desc="Jira tickets, war rooms, and cost audits from fictional companies."
                color="amber"
              />
            </div>
          </div>
        </section>

        {/* ================================================================
            LEARNING ROADMAP
            ================================================================ */}
        <section className="py-16 px-4 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                The DevOps Roadmap
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Follow the tracks in order — from cloud basics to production-grade DevOps.
              </p>
            </div>

            <div className="space-y-4">
              {tracks.map((track, trackIndex) => {
                const isExpanded = expandedTrack === track.id;
                const completedCount = track.lessons.filter(l => l.available).length;
                const totalCount = track.lessons.length;

                return (
                  <div key={track.id} className="animate-fade-in" style={{ animationDelay: `${trackIndex * 80}ms` }}>
                    {/* Track Header */}
                    <button
                      onClick={() => setExpandedTrack(isExpanded ? '' : track.id)}
                      className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        isExpanded
                          ? `bg-slate-900/60 backdrop-blur-xl ${track.borderColor} shadow-lg`
                          : 'bg-slate-900/30 border-white/[0.06] hover:border-white/[0.12] hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Track Number */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${track.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                          {track.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] uppercase tracking-wider font-bold ${track.accentText}`}>
                              Track {trackIndex + 1}
                            </span>
                            <span className="text-[10px] text-slate-600">
                              {completedCount}/{totalCount} available
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{track.title}</h3>
                          <p className="text-xs text-slate-500 hidden sm:block">{track.subtitle}</p>
                        </div>

                        {/* Progress bar */}
                        <div className="hidden sm:block w-24 flex-shrink-0">
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${track.gradient} transition-all duration-700`}
                              style={{ width: `${(completedCount / totalCount) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Chevron */}
                        <svg className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded Lessons */}
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 sm:pl-8 border-l-2 border-white/[0.06] ml-6 space-y-2 pb-2">
                        {track.lessons.map((lesson) => (
                          <div key={lesson.id} className={`${!lesson.available ? 'opacity-50' : ''}`}>
                            {lesson.available ? (
                              <Link href={`/${lesson.slug}`} className="block">
                                <LessonRow lesson={lesson} />
                              </Link>
                            ) : (
                              <div className="cursor-not-allowed">
                                <LessonRow lesson={lesson} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <span>Your DevOps journey from zero to hero 🚀</span>
            </div>
            <div>© 2026</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ================================================================== */
/*  Sub-Components                                                     */
/* ================================================================== */

function FeatureCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/10',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/10',
    emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/10',
    amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/10',
  };

  return (
    <div className="group p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-300 border`}>
        {icon}
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-900/30 border border-white/[0.04] group-hover:border-white/[0.1] hover:bg-slate-900/50 transition-all duration-200 group">
      {/* Icon */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${lesson.gradient} flex items-center justify-center text-lg shadow-md opacity-80 group-hover:opacity-100 transition-all duration-200`}>
        {lesson.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] uppercase tracking-wider font-bold ${lesson.type === 'lab' ? 'text-amber-400' : 'text-slate-500'}`}>
            {lesson.type === 'lab' ? '🔬 Lab' : `Lesson ${lesson.id}`}
          </span>
          {!lesson.available && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-500 font-medium">Coming Soon</span>
          )}
        </div>
        <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">{lesson.title}</h4>
        <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block truncate">{lesson.description}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-600 flex-shrink-0">
        <span>{lesson.duration}</span>
        <span className={`px-1.5 py-0.5 rounded ${
          lesson.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500' :
          lesson.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-500' :
          'bg-rose-500/10 text-rose-500'
        }`}>{lesson.difficulty}</span>
      </div>

      {/* Arrow */}
      {lesson.available && (
        <svg className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </div>
  );
}
