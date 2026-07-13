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
    question: 'What does CI stand for in CI/CD?',
    options: [
      'Code Inspection',
      'Continuous Integration',
      'Cloud Infrastructure',
      'Container Installation',
    ],
    correctIndex: 1,
    explanation: 'CI stands for Continuous Integration, which means frequently merging code and running automated tests.',
  },
  {
    id: 2,
    question: 'What is the main goal of Continuous Delivery (CD)?',
    options: [
      'To automatically deploy code to staging or production when tests pass',
      'To deliver hardware continuously to users',
      'To download code continuously',
      'To automatically write code for the developer',
    ],
    correctIndex: 0,
    explanation: 'Continuous Delivery ensures that software can be reliably released at any time by automatically deploying passed code.',
  },
  {
    id: 3,
    question: 'What is a GitHub Actions Workflow typically written in?',
    options: [
      'JavaScript',
      'XML',
      'YAML',
      'JSON',
    ],
    correctIndex: 2,
    explanation: 'GitHub Actions Workflows are defined using YAML files.',
  },
  {
    id: 4,
    question: 'In a CI/CD pipeline, why does the Lint stage usually come before Build and Test?',
    options: [
      'Because linting takes the longest time',
      'To catch simple syntax errors and enforce code style early',
      'Because tests cannot run without a linter',
      'Linting is actually the last stage',
    ],
    correctIndex: 1,
    explanation: 'Linting is very fast and catches syntax or style errors immediately, saving time by failing early before heavier processes like testing and building.',
  },
  {
    id: 5,
    question: 'Which of the following is a common trigger for a GitHub Action?',
    options: [
      'When you power on your computer',
      'When someone pushes code to a repository',
      'When a user clicks a button on your website',
      'When your internet connection drops',
    ],
    correctIndex: 1,
    explanation: 'A push to a branch is the most common trigger for a GitHub Action to start running the CI pipeline.',
  },
];

const sectionIds = ['what-is-cicd', 'github-actions', 'pipeline-stages', 'quiz'];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function Lesson7Content() {
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-inter)] text-slate-200">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
            <span className="text-xs sm:text-sm font-medium text-slate-300">DevOps Fundamentals</span>
            <span className="text-slate-600">|</span>
            <span className="text-xs sm:text-sm text-slate-400">Intermediate</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tight mb-6">
            Lesson 7: CI/CD Pipelines
          </h1>
          
          <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
            Automate Everything
          </div>
          
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
            Bakit pa tayo magde-deploy manually kung pwede namang i-automate? Alamin kung paano gumagana ang Continuous Integration at Continuous Delivery.
          </p>
        </div>

        <ProgressBar sections={sectionIds} />

        {/* ================================================================
            CONTENT SECTIONS
            ================================================================ */}
        <div className="space-y-8 mt-12">
          {/* Section 1: What is CI/CD? */}
          <LessonCard
            id="what-is-cicd"
            icon="🔄"
            title="What is CI/CD?"
            gradient="from-blue-500/20 to-cyan-500/20"
          >
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong>Continuous Integration (CI)</strong> is the practice of merging code changes back to the main branch as often as possible. When code is pushed, automated tests are run to ensure that the new code doesn&apos;t break the existing application.
              </p>
              <p>
                <strong>Continuous Delivery (CD)</strong> goes one step further. It ensures that the software can be released to production reliably at any time. Once the CI pipeline passes, CD automatically deploys the application to a staging or production environment.
              </p>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-white/[0.05] mt-4">
                <h4 className="text-white font-semibold mb-2">🏭 The Assembly Line Analogy</h4>
                <p className="text-sm">
                  Think of CI/CD like a factory assembly line. The developer builds a part (code). CI is the quality assurance robot that checks the part for defects (tests). CD is the conveyor belt that delivers the finished, checked product straight to the store shelves (deployment).
                </p>
              </div>
            </div>
          </LessonCard>

          {/* Section 2: GitHub Actions */}
          <LessonCard
            id="github-actions"
            icon="🐙"
            title="GitHub Actions"
            gradient="from-slate-500/20 to-purple-500/20"
          >
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong>GitHub Actions</strong> is currently one of the most popular CI/CD tools because it is built right into GitHub. You don&apos;t need an external server to run your pipelines.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Workflows:</strong> Defined in YAML files inside the <code>.github/workflows</code> directory.</li>
                <li><strong>Triggers:</strong> Events that start the workflow (e.g., <code>on: push</code> to the main branch).</li>
                <li><strong>Jobs:</strong> A set of steps that execute on the same runner (server).</li>
                <li><strong>Steps:</strong> Individual tasks within a job, such as running a shell command or using an action.</li>
              </ul>
              
              <div className="mt-4">
                <p className="mb-2 text-sm text-slate-400">Example of a simple GitHub Actions Workflow:</p>
                <div className="relative group">
                  <pre className="p-4 rounded-xl bg-[#0d1117] border border-white/[0.05] overflow-x-auto text-sm text-slate-300 font-mono">
                    <code className="language-yaml">{`name: Simple CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Run a greeting
        run: echo \'Hello, CI/CD!\'`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </LessonCard>

          {/* Section 3: Standard Pipeline Stages */}
          <LessonCard
            id="pipeline-stages"
            icon="🚦"
            title="Standard Pipeline Stages"
            gradient="from-emerald-500/20 to-teal-500/20"
          >
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                A standard pipeline typically goes through several stages sequentially. If any stage fails, the pipeline stops immediately. This is known as &quot;failing early&quot;.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-2">1</div>
                  <h4 className="font-semibold text-white mb-1">Lint</h4>
                  <p className="text-xs text-slate-400">Checks code for syntax errors and style violations.</p>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">2</div>
                  <h4 className="font-semibold text-white mb-1">Test</h4>
                  <p className="text-xs text-slate-400">Runs unit and integration tests to ensure logic works.</p>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">3</div>
                  <h4 className="font-semibold text-white mb-1">Build</h4>
                  <p className="text-xs text-slate-400">Compiles code and builds Docker images or artifacts.</p>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">4</div>
                  <h4 className="font-semibold text-white mb-1">Push</h4>
                  <p className="text-xs text-slate-400">Uploads artifacts/images to a registry like Docker Hub.</p>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-2">5</div>
                  <h4 className="font-semibold text-white mb-1">Deploy</h4>
                  <p className="text-xs text-slate-400">Deploys the application to staging or production servers.</p>
                </div>
              </div>
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            QUIZ SECTION
            ================================================================ */}
        <div id="quiz" className="mt-8">
          <Quiz lessonId="lesson-7" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href="/lesson-6"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] text-slate-400 hover:text-white transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous: Version Control &amp; Git
          </Link>
          <Link
            href="/lesson-8"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] text-slate-400 hover:text-white transition-all text-sm ml-auto"
          >
            Next: Containerization
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
