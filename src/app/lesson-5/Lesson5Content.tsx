'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';
import type { QuizQuestion } from '@/components/Quiz';

/* ================================================================== */
/*  Quiz Data                                                          */
/* ================================================================== */

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main goal of DevOps?',
    options: [
      'To replace developers with operations engineers',
      'To bridge the gap between development and operations for faster, reliable delivery',
      'To eliminate the need for cloud services',
      'To make software testing optional',
    ],
    correctIndex: 1,
    explanation: 'DevOps bridges Dev and Ops teams so software can be built, tested, and shipped faster and more reliably.',
  },
  {
    id: 2,
    question: 'Which of these is NOT a typical DevOps responsibility?',
    options: [
      'Setting up CI/CD pipelines',
      'Managing cloud infrastructure',
      'Designing the company logo',
      'Writing automation scripts',
    ],
    correctIndex: 2,
    explanation: 'DevOps engineers focus on infrastructure, automation, and delivery pipelines — not graphic design!',
  },
  {
    id: 3,
    question: 'What does CI/CD stand for?',
    options: [
      'Computer Intelligence / Cloud Deployment',
      'Continuous Integration / Continuous Delivery',
      'Code Inspection / Code Distribution',
      'Container Integration / Container Deployment',
    ],
    correctIndex: 1,
    explanation: 'CI/CD = Continuous Integration (auto-build and test) + Continuous Delivery (auto-deploy). It is the backbone of DevOps.',
  },
  {
    id: 4,
    question: 'Which tool is commonly used for containerization?',
    options: ['Terraform', 'Docker', 'Grafana', 'Jenkins'],
    correctIndex: 1,
    explanation: 'Docker is the industry standard for building and running containers. It packages your app and all its dependencies together.',
  },
  {
    id: 5,
    question: 'What is the purpose of monitoring tools like Prometheus and Grafana?',
    options: [
      'To write application code faster',
      'To observe system health, detect issues, and visualize metrics',
      'To manage user passwords',
      'To design cloud architecture diagrams',
    ],
    correctIndex: 1,
    explanation: 'Monitoring tools help you see what is happening inside your systems in real-time — CPU, memory, errors, response times, and more.',
  },
];

const sectionIds = ['what-engineers-do', 'devops-toolkit', 'devops-culture', 'quiz'];

/* ================================================================== */
/*  Responsibility Data                                                */
/* ================================================================== */

const responsibilities = [
  {
    icon: '🔄',
    title: 'CI/CD Pipeline Setup',
    description: 'Automate the process of building, testing, and deploying code. Every time a developer pushes code, it automatically goes through a pipeline.',
  },
  {
    icon: '☁️',
    title: 'Cloud Infrastructure Management',
    description: 'Manage servers, databases, and networking on AWS, Azure, or GCP. Keep everything running smoothly and cost-effective.',
  },
  {
    icon: '🐳',
    title: 'Containerization',
    description: 'Package applications into containers using Docker so they run the same way everywhere — your laptop, staging, and production.',
  },
  {
    icon: '🏗️',
    title: 'Infrastructure as Code',
    description: 'Write code (Terraform, CloudFormation) to create and manage infrastructure instead of clicking through the AWS console manually.',
  },
  {
    icon: '📊',
    title: 'Monitoring & Logging',
    description: 'Set up dashboards and alerts so you know when something breaks BEFORE your users complain. Tools: Prometheus, Grafana, CloudWatch.',
  },
  {
    icon: '⚙️',
    title: 'Automation Scripting',
    description: 'Write Bash, Python, or PowerShell scripts to automate repetitive tasks. If you do something more than twice, automate it!',
  },
  {
    icon: '🔒',
    title: 'Security & Backup',
    description: 'Implement security best practices — IAM roles, encryption, backups, and disaster recovery plans. Protect the company data.',
  },
  {
    icon: '🚀',
    title: 'Performance Optimization',
    description: 'Make sure applications are fast and efficient. Optimize server resources, reduce costs, and scale when traffic spikes.',
  },
  {
    icon: '📦',
    title: 'Release Management',
    description: 'Coordinate software releases — blue/green deployments, canary releases, and rollbacks when something goes wrong.',
  },
  {
    icon: '🔧',
    title: 'Troubleshooting',
    description: 'When things break at 2 AM, you are the one who gets paged. Diagnose issues, find root causes, and fix them fast.',
  },
];

/* ================================================================== */
/*  Toolkit Data                                                       */
/* ================================================================== */

interface Tool {
  name: string;
  color: string;
}

interface ToolCategory {
  category: string;
  icon: string;
  gradient: string;
  tools: Tool[];
}

const toolkitCategories: ToolCategory[] = [
  {
    category: 'Cloud Platforms',
    icon: '☁️',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    tools: [
      { name: 'AWS', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
      { name: 'Azure', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'GCP', color: 'bg-red-500/15 text-red-300 border-red-500/25' },
      { name: 'DigitalOcean', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
    ],
  },
  {
    category: 'CI/CD',
    icon: '🔄',
    gradient: 'from-purple-500/20 to-pink-500/20',
    tools: [
      { name: 'GitHub Actions', color: 'bg-slate-500/15 text-slate-300 border-slate-500/25' },
      { name: 'Jenkins', color: 'bg-red-500/15 text-red-300 border-red-500/25' },
      { name: 'GitLab CI', color: 'bg-orange-500/15 text-orange-300 border-orange-500/25' },
      { name: 'CircleCI', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
      { name: 'ArgoCD', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' },
    ],
  },
  {
    category: 'Containers',
    icon: '🐳',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    tools: [
      { name: 'Docker', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'Kubernetes', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'Helm', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' },
      { name: 'Podman', color: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
    ],
  },
  {
    category: 'Infrastructure as Code',
    icon: '🏗️',
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    tools: [
      { name: 'Terraform', color: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
      { name: 'Ansible', color: 'bg-red-500/15 text-red-300 border-red-500/25' },
      { name: 'CloudFormation', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
      { name: 'Pulumi', color: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25' },
    ],
  },
  {
    category: 'Monitoring',
    icon: '📊',
    gradient: 'from-amber-500/20 to-orange-500/20',
    tools: [
      { name: 'Prometheus', color: 'bg-orange-500/15 text-orange-300 border-orange-500/25' },
      { name: 'Grafana', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
      { name: 'Datadog', color: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
      { name: 'CloudWatch', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'ELK Stack', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
    ],
  },
  {
    category: 'Scripting',
    icon: '⚙️',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    tools: [
      { name: 'Bash', color: 'bg-slate-500/15 text-slate-300 border-slate-500/25' },
      { name: 'Python', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25' },
      { name: 'PowerShell', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'Go', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' },
    ],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    gradient: 'from-rose-500/20 to-pink-500/20',
    tools: [
      { name: 'PostgreSQL', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
      { name: 'MySQL', color: 'bg-orange-500/15 text-orange-300 border-orange-500/25' },
      { name: 'MongoDB', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
      { name: 'Redis', color: 'bg-red-500/15 text-red-300 border-red-500/25' },
      { name: 'DynamoDB', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
    ],
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function Lesson5Content() {
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-inter)] text-slate-200">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <section className="mb-16 animate-fade-in">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              Track 2 — DevOps Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Beginner
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-tight mb-4">
            What is DevOps?
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl leading-relaxed mb-6">
            DevOps is the bridge between <strong className="text-blue-400">building software</strong>{' '}
            and <strong className="text-emerald-400">running it in production</strong>.
            In this lesson, you will learn what DevOps engineers actually do every day,
            and the tools they use to get the job done.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>📖 ~12 min read</span>
            <span>•</span>
            <span>3 sections + quiz</span>
            <span>•</span>
            <span>Simple English</span>
          </div>
        </section>

        <ProgressBar sections={sectionIds} />

        {/* ================================================================
            SECTION 1: WHAT DEVOPS ENGINEERS DO
            ================================================================ */}
        <div id="what-engineers-do" className="mt-12">
          <LessonCard
            icon="👷"
            title="What DevOps Engineers Do"
            gradient="from-blue-500/20 to-purple-500/20"
            delay={0}
          >
            <p className="mb-6">
              A DevOps Engineer is like the <strong className="text-blue-300">backstage crew</strong>{' '}
              of a concert. The audience (users) never sees them, but without them, the show would not happen.
              They make sure the code that developers write actually runs smoothly for millions of users.
            </p>

            <p className="mb-6 text-slate-400">
              Think of it this way: Developers <strong className="text-blue-300">build the car</strong>,
              but DevOps Engineers <strong className="text-emerald-300">build the road, the gas station, the GPS,
              and the repair shop</strong>. Here are the 10 key things a DevOps Engineer does every day:
            </p>

            {/* 2-Column Responsibility Cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      {resp.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-blue-300 transition-colors">
                        {resp.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {resp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-blue-200 text-sm">
              💡 <strong>Pro Tip:</strong> You do not need to master all 10 on day one.
              Most junior DevOps engineers start with <strong>CI/CD pipelines</strong> and{' '}
              <strong>cloud infrastructure management</strong>, then expand from there.
              The most important skill is the willingness to automate everything!
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            SECTION 2: TOOLS IN A DEVOPS TOOLKIT
            ================================================================ */}
        <div id="devops-toolkit" className="mt-8">
          <LessonCard
            icon="🧰"
            title="Tools in a DevOps Toolkit"
            gradient="from-emerald-500/20 to-teal-500/20"
            delay={100}
          >
            <p className="mb-2">
              DevOps has <strong className="text-emerald-300">a LOT of tools</strong>. It can feel overwhelming,
              but here is the thing — you do not need to learn them all. Most companies only use a few from each category.
            </p>
            <p className="mb-6 text-slate-400">
              Below is a map of the most common tools, grouped by what they do. The ones in{' '}
              <strong className="text-white">bold</strong> are the most popular in the industry today:
            </p>

            {/* Tool Categories */}
            <div className="space-y-5">
              {toolkitCategories.map((cat, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl bg-gradient-to-br ${cat.gradient} border border-white/[0.06]`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{cat.icon}</span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">{cat.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool, j) => (
                      <span
                        key={j}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 cursor-default ${tool.color}`}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-200 text-sm">
              🎯 <strong>Where to Start?</strong> If you are just beginning, focus on this starter stack:{' '}
              <strong>AWS</strong> (cloud) + <strong>GitHub Actions</strong> (CI/CD) + <strong>Docker</strong> (containers)
              + <strong>Terraform</strong> (IaC) + <strong>Bash/Python</strong> (scripting).
              This covers 80% of job postings for junior DevOps roles in the Philippines!
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            SECTION 3: THE DEVOPS CULTURE
            ================================================================ */}
        <div id="devops-culture" className="mt-8">
          <LessonCard
            icon="🤝"
            title="DevOps is a Culture, Not Just Tools"
            gradient="from-amber-500/20 to-orange-500/20"
            delay={200}
          >
            <p className="mb-4">
              Here is the most important thing to understand:{' '}
              <strong className="text-amber-300">DevOps is not just about tools — it is a culture and mindset.</strong>{' '}
              Before DevOps, the Development team and the Operations team worked in silos.
              Developers would write code and throw it over the wall to Ops, saying &quot;here, deploy this.&quot;
              And Ops would say &quot;this does not work in production.&quot;
            </p>

            <p className="mb-6 text-slate-400">
              DevOps breaks down that wall. Both teams work together from start to finish.
              The industry uses the <strong className="text-white">CALMS framework</strong> to describe DevOps culture:
            </p>

            {/* CALMS Framework */}
            <div className="space-y-3 mb-6">
              {[
                { letter: 'C', word: 'Culture', desc: 'Break the silos. Dev and Ops work as ONE team, not two separate departments.', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                { letter: 'A', word: 'Automation', desc: 'Automate everything — builds, tests, deployments, infrastructure. If a human has to do it manually, it is a risk.', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                { letter: 'L', word: 'Lean', desc: 'Work in small batches. Ship small changes frequently instead of one massive release every 6 months.', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { letter: 'M', word: 'Measurement', desc: 'Measure everything — deployment frequency, lead time, error rates. You cannot improve what you do not measure.', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { letter: 'S', word: 'Sharing', desc: 'Share knowledge openly. No blame culture. When things break, do a blameless post-mortem and learn from it.', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
              ].map((item) => (
                <div key={item.letter} className={`flex items-start gap-4 p-4 rounded-xl border ${item.color}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-xl font-black font-[family-name:var(--font-space-grotesk)]`}>
                    {item.letter}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.word}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-amber-200 text-sm">
              🔥 <strong>Real Talk:</strong> Many Filipino IT companies are still transitioning to DevOps.
              If you learn these skills now, you will be ahead of the curve. DevOps engineers are some of the
              highest-paid roles in tech — even in the Philippines, salaries range from ₱40K-₱120K+ per month
              depending on experience!
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            QUIZ SECTION
            ================================================================ */}
        <div id="quiz" className="mt-8">
          <Quiz lessonId="lesson-5" questions={quizQuestions} />
        </div>

        {/* ================================================================
            CTA — START LEARNING PATH
            ================================================================ */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-white/[0.06] backdrop-blur-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)] mb-3">
              Ready to Start Your DevOps Journey?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
              You now know what DevOps is and what tools you need.
              The next step is to start building. Follow the learning path to master each skill one by one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <span>Start Learning Path</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/missions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
              >
                🎫 Try Real-World Missions
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href="/lesson-4"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] text-slate-400 hover:text-white transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous: Infrastructure as Code
          </Link>
          <Link
            href="/lesson-6"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] text-slate-400 hover:text-white transition-all text-sm ml-auto"
          >
            Next: Version Control &amp; Git
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
