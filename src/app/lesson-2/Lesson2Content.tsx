'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';
import type { QuizQuestion } from '@/components/Quiz';
import Link from 'next/link';
import DiscussionSection from '@/components/DiscussionSection';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the correct analogy for IaaS?',
    options: [
      'Eating at a restaurant — everything is ready',
      'Buying a pizza kit — just a little effort',
      'Making a pizza from scratch — you do everything',
      'Ordering delivery — zero effort',
    ],
    correctIndex: 2,
    explanation:
      'IaaS = from scratch. You handle everything — OS, runtime, app, data. The provider just gives you the raw infrastructure (servers, storage, network).',
  },
  {
    id: 2,
    question: 'Which of the following is an example of PaaS?',
    options: [
      'Gmail',
      'AWS EC2',
      'Heroku',
      'Microsoft Word desktop app',
    ],
    correctIndex: 2,
    explanation:
      'Heroku is PaaS — you just push your code, and they handle the server, scaling, and infrastructure. EC2 is IaaS, Gmail is SaaS.',
  },
  {
    id: 3,
    question: 'In SaaS, what do you need to manage?',
    options: [
      'Servers and networking',
      'Operating system and runtime',
      'Application code and deployment',
      'Nothing — you just use the software',
    ],
    correctIndex: 3,
    explanation:
      'In SaaS, you manage nothing. The application is ready-to-use. You just use it through the browser or an app. Zero maintenance on your part.',
  },
];

const sectionIds = ['pizza', 'iaas', 'paas-saas', 'comparison', 'quiz'];

export default function Lesson2Content() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <ProgressBar sections={sectionIds} />

      <main className="relative z-10">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Lesson badge */}
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Module 1 — Introduction
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Beginner
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight mb-6">
              <span className="text-white">Lesson 2: </span>
              <span className="text-gradient-primary">IaaS, PaaS, SaaS</span>
              <br />
              <span className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-medium">
                What&apos;s the Difference?
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              In this lesson, we will discuss the three <strong className="text-blue-400">Cloud Service Models</strong> —
              IaaS, PaaS, and SaaS. Using a pizza analogy, you&apos;ll understand how they 
              differ and when you should use each one. 🍕☁️
            </p>

            {/* Meta info */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~12 min read
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
                4 sections + quiz
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                English
              </span>
            </div>

            {/* Hero Image */}
            <div className="animate-fade-in-up delay-400 mt-10 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-blue-500/5">
              <Image
                src="/service-models.png"
                alt="IaaS, PaaS, SaaS — Cloud Service Models comparison"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* ================================================================
            CONTENT SECTIONS
            ================================================================ */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* SECTION 1: Pizza Analogy */}
            <div id="pizza">
              <LessonCard
                icon="🍕"
                title="The Pizza Analogy"
                gradient="from-amber-500/20 to-orange-500/20"
                delay={0}
              >
                <p>
                  To make the three service models easier to explain, let&apos;s use the <strong className="text-amber-300">pizza analogy</strong>.
                  Imagine there are three ways to eat a pizza:
                </p>

                <div className="space-y-3 mt-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-2xl">🧱</span>
                    <div>
                      <div className="font-bold text-blue-300 text-sm">IaaS = Making a Pizza from Scratch</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        You buy the ingredients, you mix the dough, you add the toppings, and you put it in the oven.
                        <strong className="text-slate-300"> You have full control, but it takes a lot of work.</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <span className="text-2xl">🛠️</span>
                    <div>
                      <div className="font-bold text-purple-300 text-sm">PaaS = Buying a Pizza Kit</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pre-made dough and sauce are included. You just add your toppings and pop it in the oven.
                        <strong className="text-slate-300"> Less hassle, so you can focus on the toppings (a.k.a. your app).</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="font-bold text-emerald-300 text-sm">SaaS = Ordering Pizza Delivery</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        You just eat. Zero effort. You don&apos;t need to cook, wash dishes, or maintain a kitchen.
                        <strong className="text-slate-300"> It&apos;s ready to eat immediately. 🍕</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pizza Analogy Image */}
                <div className="my-4 rounded-xl overflow-hidden border border-white/[0.06]">
                  <Image
                    src="/pizza-analogy.png"
                    alt="Pizza analogy for IaaS, PaaS, SaaS — from scratch to delivery"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-300/80 text-sm">
                  💡 <strong>TL;DR:</strong> The higher you go (IaaS → PaaS → SaaS), the less you manage but the less control you have.
                  It&apos;s a trade-off: <strong>convenience vs. control</strong>.
                </div>
              </LessonCard>
            </div>

            {/* SECTION 2: IaaS */}
            <div id="iaas">
              <LessonCard
                icon="🧱"
                title="IaaS: Infrastructure as a Service"
                gradient="from-blue-500/20 to-indigo-500/20"
                delay={100}
              >
                <p>
                  With IaaS, the cloud provider gives you <strong className="text-blue-300">raw computing resources</strong> —
                  virtual machines, storage, and networking. It&apos;s like renting land and a building —
                  <strong className="text-indigo-300">you decide what to build inside.</strong>
                </p>
                <p>
                  You install the operating system, set up the environment, and deploy your app.
                  You get full control, but you also have full responsibility.
                </p>

                {/* Examples */}
                <div className="mt-3 p-3 rounded-xl bg-slate-800/50 border border-white/[0.06]">
                  <div className="font-semibold text-white text-sm mb-2">🌐 Popular IaaS Examples:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium">AWS EC2</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">Azure Virtual Machines</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">Google Compute Engine</span>
                  </div>
                </div>

                {/* What YOU vs PROVIDER manages */}
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <div className="font-semibold text-blue-300 text-sm mb-2">👤 YOU manage:</div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-slate-300">Operating System</strong> — Windows, Linux, etc.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-slate-300">Runtime</strong> — Node.js, Python, Java</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-slate-300">Application</strong> — your actual app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-slate-300">Data</strong> — databases, files, configs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <div className="font-semibold text-indigo-300 text-sm mb-2">☁️ PROVIDER manages:</div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span><strong className="text-slate-300">Physical Servers</strong> — hardware in the data center</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span><strong className="text-slate-300">Storage</strong> — hard drives, SSDs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span><strong className="text-slate-300">Networking</strong> — routers, switches, firewalls</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-3">
                  <strong className="text-white">Best for:</strong> System administrators, DevOps engineers, and companies that want <strong className="text-blue-300">full control</strong> over their infrastructure.
                </p>

                <div className="mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-300/80 text-sm">
                  💡 <strong>Fun fact:</strong> AWS EC2 (Elastic Compute Cloud) is the most popular IaaS service in the world.
                  This is where most cloud engineers start their AWS journey!
                </div>
              </LessonCard>
            </div>

            {/* SECTION 3: PaaS at SaaS */}
            <div id="paas-saas">
              <LessonCard
                icon="🛠️"
                title="PaaS and SaaS: Less Hassle, More Focus"
                gradient="from-purple-500/20 to-pink-500/20"
                delay={200}
              >
                {/* PaaS */}
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 mb-4">
                  <h4 className="font-bold text-purple-300 text-base mb-2">🛠️ PaaS — Platform as a Service</h4>
                  <p>
                    With PaaS, you <strong className="text-purple-300">just deploy your code</strong> — they handle the infrastructure.
                    You don&apos;t need to set up servers, install an OS, or configure networking.
                    You can just focus on building your app.
                  </p>
                  <div className="mt-3">
                    <div className="font-semibold text-white text-xs mb-1.5">Popular PaaS Examples:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium">AWS Elastic Beanstalk</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">Heroku</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">Google App Engine</span>
                      <span className="px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-300 text-xs font-medium">Vercel</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-300/80 text-sm mb-4">
                  🤯 <strong>Fun fact:</strong> This Next.js website you&apos;re using right now? By deploying it on Vercel, <strong>that&apos;s PaaS!</strong> You just push
                  to GitHub, and it auto-deploys. No server setup, no headaches. ✨
                </div>

                {/* SaaS */}
                <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 mb-4">
                  <h4 className="font-bold text-pink-300 text-base mb-2">📦 SaaS — Software as a Service</h4>
                  <p>
                    SaaS is the simplest. It is a <strong className="text-pink-300">ready-to-use application</strong>{' '}
                    that is accessible through a browser or an app. You don&apos;t need to code or maintain it — you just use it.
                  </p>
                  <div className="mt-3">
                    <div className="font-semibold text-white text-xs mb-1.5">SaaS You Use Every Day:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">Gmail</span>
                      <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">Netflix</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">Zoom</span>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">Canva</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">Spotify</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10 text-pink-300/80 text-sm">
                  💡 <strong>Did you know?</strong> Most people use SaaS every day without knowing it! Whenever you use Gmail, Netflix, or Spotify
                  — <strong>you&apos;re already using the cloud.</strong> You don&apos;t need to install any heavy software on your computer. 🎵
                </div>
              </LessonCard>
            </div>

            {/* SECTION 4: Side-by-Side Comparison */}
            <div id="comparison">
              <LessonCard
                icon="📊"
                title="Side-by-Side Comparison"
                gradient="from-emerald-500/20 to-teal-500/20"
                delay={300}
              >
                <p>
                  To make things clearer, let&apos;s take a look at a <strong className="text-emerald-300">side-by-side comparison</strong> of
                  the three service models:
                </p>

                {/* Comparison Grid */}
                <div className="mt-4 space-y-3">
                  {/* Header Row */}
                  <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                    <div className="p-2 rounded-lg bg-slate-800/80 text-slate-400 text-center">Aspect</div>
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-center">IaaS</div>
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-center">PaaS</div>
                    <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-center">SaaS</div>
                  </div>

                  {/* Control */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">🎮 Control</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">Highest</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Medium</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">Lowest</div>
                  </div>

                  {/* Complexity */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">🧩 Complexity</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">Hardest</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Medium</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">Easiest</div>
                  </div>

                  {/* Flexibility */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">🔄 Flexibility</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">Maximum</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Moderate</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">Limited</div>
                  </div>

                  {/* Target Users */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">👥 Target Users</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">IT Admins</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Developers</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">End Users</div>
                  </div>

                  {/* Example */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">📌 Example</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center font-semibold">AWS EC2</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center font-semibold">Heroku</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center font-semibold">Gmail</div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-300/80 text-sm">
                  💡 <strong>Remember:</strong>{' '}In the real world, companies use a <strong>MIX</strong>{' '}of all three. It&apos;s not an either/or situation.
                  They might use IaaS for backend servers, PaaS for quick deployments, and SaaS for email and collaboration tools.
                  What&apos;s important is knowing <strong>when to use each one</strong>.{' '}🎯
                </div>
              </LessonCard>
            </div>

            {/* ================================================================
                QUIZ SECTION
                ================================================================ */}
            <div id="quiz">
              <Quiz lessonId="lesson-2" questions={quizQuestions} />
            </div>

            {/* ================================================================
                NEXT LESSON CTA
                ================================================================ */}
            <div className="mt-12 text-center pb-8">
              <div className="inline-block p-8 rounded-2xl glass border border-white/[0.06]">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Ready for the next lesson?
                </h3>
                <p className="text-sm text-slate-400 mb-5 max-w-sm">
                  In Lesson 3, we will learn about <strong className="text-blue-400">Compute, Storage, and Networking</strong> —
                  the Big 3 of cloud services. This is where your hands-on journey really begins. 💪
                </p>
                <Link
                  href="/lesson-3"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Lesson 3: Compute, Storage, Networking
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Discussion */}
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <DiscussionSection lessonSlug="lesson-2" />
          </div>
        </section>

        {/* ================================================================
            FOOTER
            ================================================================ */}
        <footer className="border-t border-white/[0.04] py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-gradient-primary font-bold">CloudEng</span>
              <span>•</span>
              <span>Made with ☁️ for aspiring cloud engineers</span>
            </div>
            <div className="flex items-center gap-4">
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
