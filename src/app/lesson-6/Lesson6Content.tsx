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
    question: 'What is the main purpose of Git?',
    options: [
      'To host websites for free',
      'To track changes in source code and enable collaboration',
      'To automatically test code',
      'To deploy containers to Kubernetes',
    ],
    correctIndex: 1,
    explanation: 'Git is a version control system. It tracks changes to your code over time so you can collaborate and revert if something breaks.',
  },
  {
    id: 2,
    question: 'What is the difference between Git and GitHub?',
    options: [
      'They are the exact same thing',
      'GitHub is the software on your computer, Git is the website',
      'Git is the version control software, GitHub is a cloud hosting service for Git repositories',
      'Git is for developers, GitHub is for DevOps engineers',
    ],
    correctIndex: 2,
    explanation: 'Git is the tool you install locally. GitHub is the cloud platform where you push your Git repositories to share with others.',
  },
  {
    id: 3,
    question: 'Why do we use branches in Git?',
    options: [
      'To make the codebase run faster',
      'To isolate new features or bug fixes from the main code until they are ready',
      'To delete old code permanently',
      'To bypass security checks',
    ],
    correctIndex: 1,
    explanation: 'Branches let you work on an isolated copy of the code. Once your feature is working perfectly, you merge it into the main branch.',
  },
  {
    id: 4,
    question: 'What is a Pull Request (PR)?',
    options: [
      'A command to pull code from the internet',
      'A request to your team to review your code before it gets merged into the main branch',
      'A script that pulls data from a database',
      'An error message in GitHub',
    ],
    correctIndex: 1,
    explanation: 'A Pull Request is how you ask your team: "Here is my code on a branch. Please review it so we can merge it into main."',
  },
  {
    id: 5,
    question: 'What is GitOps?',
    options: [
      'Using Git to manage and automate infrastructure and deployments',
      'A special version of Git just for operations teams',
      'The process of deleting a repository',
      'A competitor to GitHub',
    ],
    correctIndex: 0,
    explanation: 'GitOps means using Git as the single source of truth. If you want to change infrastructure, you do not click buttons in a console — you make a commit in Git.',
  },
];

const sectionIds = ['what-is-version-control', 'git-basics', 'branching', 'gitops', 'quiz'];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function Lesson6Content() {
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
            HEADER
            ================================================================ */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>DevOps Fundamentals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>Beginner</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-space-grotesk)]">
            Lesson 6: Version Control & Git
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Paano nagta-trabaho ang 100+ developers sa iisang project nang hindi nasisira ang code? Alamin natin ang kapangyarihan ng Git at GitOps.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">⏱️ ~15 min read</span>
            <span className="flex items-center gap-1.5">📚 4 sections + Quiz</span>
            <span className="flex items-center gap-1.5">🇵🇭 Taglish</span>
          </div>
        </div>

        <ProgressBar sections={sectionIds} />

        {/* ================================================================
            SECTION 1: WHAT IS VERSION CONTROL?
            ================================================================ */}
        <div id="what-is-version-control" className="mt-8">
          <LessonCard
            icon="💾"
            title="Ano ba ang Version Control?"
            gradient="from-slate-500/20 to-blue-500/20"
            delay={0}
          >
            <p className="mb-4">
              Isipin mo nung nag-aaral ka pa at gumagawa ng thesis. Malamang ganito ang nangyari sa mga files mo:
            </p>
            <ul className="list-none space-y-2 mb-6 font-mono text-sm text-rose-300 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
              <li>📄 thesis.doc</li>
              <li>📄 thesis_final.doc</li>
              <li>📄 thesis_final_v2.doc</li>
              <li>📄 thesis_final_v3_VERIFIED.doc</li>
              <li>📄 thesis_final_v3_VERIFIED_ETO_NA_TALAGA.doc</li>
            </ul>
            <p className="mb-4">
              Ang tawag dyan ay manual version control. Nakakalito, prone sa error, at mahirap kung marami kayong gumagawa.
            </p>
            <p className="mb-6">
              <strong className="text-blue-400">Version Control System (VCS)</strong> is software that tracks changes to files over time. It answers the questions: 
              <em> "Who changed this line of code? When did they change it? And why?"</em>
            </p>
          </LessonCard>
        </div>

        {/* ================================================================
            SECTION 2: GIT VS GITHUB
            ================================================================ */}
        <div id="git-basics" className="mt-8">
          <LessonCard
            icon="🐙"
            title="Git vs GitHub: Hindi Sila Pareho"
            gradient="from-orange-500/20 to-red-500/20"
            delay={100}
          >
            <p className="mb-6">
              Isa sa pinakamalaking misconception ng mga beginners ay pareho daw ang Git at GitHub. Here is the difference:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-3xl mb-3">💻</div>
                <h4 className="font-bold text-white mb-2">Git (The Software)</h4>
                <p className="text-sm text-slate-400">
                  Ito yung tool na i-iinstall mo sa laptop mo. Gumagana ito offline. Ito ang gumagawa ng actual na pag-track ng versions ng code mo.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-3xl mb-3">☁️</div>
                <h4 className="font-bold text-white mb-2">GitHub (The Cloud)</h4>
                <p className="text-sm text-slate-400">
                  Ito ay isang website/cloud service kung saan mo ina-upload (push) ang Git repository mo para ma-access ng ibang tao (tulad ng team mates mo). 
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15 text-orange-200 text-sm">
              💡 <strong>Analogy:</strong> Ang <strong>Git</strong> ay parang camera (ikaw ang kumukuha ng pictures). Ang <strong>GitHub</strong> ay parang Instagram (kung saan mo ina-upload yung pictures para makita ng iba). Other examples of "Instagram" for code include GitLab and Bitbucket.
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            SECTION 3: BRANCHING & PULL REQUESTS
            ================================================================ */}
        <div id="branching" className="mt-8">
          <LessonCard
            icon="🌿"
            title="Branches & Pull Requests"
            gradient="from-emerald-500/20 to-teal-500/20"
            delay={150}
          >
            <p className="mb-4">
              Bakit kailangan natin ng Git sa DevOps? Kasi ayaw nating may masira sa production!
            </p>
            <p className="mb-6">
              Ang <strong className="text-emerald-400">Main Branch</strong> ang naglalaman ng live, working code. 
              Kapag may gagawin kang bago (e.g., adding a login feature), hindi mo iibahin agad yung main code. 
              Gagawa ka ng sarili mong <strong className="text-white">Branch</strong> (kopya ng code).
            </p>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm mb-6 overflow-x-auto">
              <div className="text-slate-400 mb-2"># 1. Create your own branch</div>
              <div className="text-emerald-400 mb-4">$ git checkout -b feature/login-page</div>
              
              <div className="text-slate-400 mb-2"># 2. Add your new code</div>
              <div className="text-emerald-400 mb-4">$ git add .<br />$ git commit -m "Added login form"</div>
              
              <div className="text-slate-400 mb-2"># 3. Upload to GitHub</div>
              <div className="text-emerald-400">$ git push origin feature/login-page</div>
            </div>

            <h4 className="font-bold text-white mb-2">The Pull Request (PR)</h4>
            <p className="mb-4 text-slate-300">
              Kapag tapos na ang code mo sa branch mo, hihingi ka ng permission sa team mo na i-merge (isama) ang code mo sa main branch.
              Ang tawag dito ay <strong>Pull Request</strong>. 
            </p>
            <p className="text-slate-400">
              Dito papasok ang ibang engineers para i-review ang code mo. Titingnan nila kung may bugs o security issues bago ito i-approve.
            </p>
          </LessonCard>
        </div>

        {/* ================================================================
            SECTION 4: GITOPS
            ================================================================ */}
        <div id="gitops" className="mt-8">
          <LessonCard
            icon="⚙️"
            title="GitOps: The DevOps Superpower"
            gradient="from-purple-500/20 to-indigo-500/20"
            delay={200}
          >
            <p className="mb-4">
              Bilang isang Cloud/DevOps Engineer, gagamitin mo ang Git para sa isang advanced concept na tinatawag na <strong className="text-purple-400">GitOps</strong>.
            </p>
            <p className="mb-6">
              Sa traditional na mundo, kapag kailangan mo ng bagong server, magla-login ka sa AWS Console at i-click mo yung "Create Server".
              Sa GitOps, hindi ka magla-login sa AWS.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4 items-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-2xl">1️⃣</div>
                <div className="text-sm">Isusulat mo yung infrastructure mo as code (using Terraform).</div>
              </div>
              <div className="flex gap-4 items-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-2xl">2️⃣</div>
                <div className="text-sm">I-commit at i-push mo ito sa Git. Gagawin kang <strong>Pull Request</strong>.</div>
              </div>
              <div className="flex gap-4 items-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-2xl">3️⃣</div>
                <div className="text-sm">Pag na-approve, isang automated pipeline ang magbabasa ng Git at gagawa ng server para sayo sa AWS!</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-indigo-200 text-sm">
              🌟 <strong>Why is this powerful?</strong> Because your entire infrastructure is documented in Git. If someone deletes a server by accident, you just re-run the Git code to bring it back in seconds. Git becomes the <strong>Single Source of Truth</strong>.
            </div>
          </LessonCard>
        </div>

        {/* ================================================================
            QUIZ SECTION
            ================================================================ */}
        <div id="quiz" className="mt-8">
          <Quiz lessonId="lesson-6" questions={quizQuestions} />
        </div>

        {/* ================================================================
            NEXT LESSON
            ================================================================ */}
        <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Link
            href="/lesson-7"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-800/80 border border-white/10 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300"
          >
            <div className="text-left">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Up Next</div>
              <div className="text-white font-bold group-hover:text-purple-400 transition-colors">
                Lesson 7: CI/CD Pipelines
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
              →
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
