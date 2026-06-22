'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';
import type { QuizQuestion } from '@/components/Quiz';
import Link from 'next/link';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Ano ang tamang analogy para sa IaaS?',
    options: [
      'Kumain sa restaurant — ready na lahat',
      'Bumili ng pizza kit — konting effort lang',
      'Gumawa ng pizza from scratch — ikaw lahat',
      'Nag-order ng delivery — zero effort',
    ],
    correctIndex: 2,
    explanation:
      'IaaS = from scratch. Ikaw ang bahala sa lahat — OS, runtime, app, data. Provider ang nagbibigay lang ng raw infrastructure (servers, storage, network).',
  },
  {
    id: 2,
    question: 'Alin sa mga ito ang example ng PaaS?',
    options: [
      'Gmail',
      'AWS EC2',
      'Heroku',
      'Microsoft Word desktop app',
    ],
    correctIndex: 2,
    explanation:
      'Heroku is PaaS — push mo lang ang code mo, sila na bahala sa server, scaling, at infrastructure. EC2 is IaaS, Gmail is SaaS.',
  },
  {
    id: 3,
    question: 'Sa SaaS, ano ang kailangan mong i-manage?',
    options: [
      'Servers at networking',
      'Operating system at runtime',
      'Application code at deployment',
      'Wala — gagamitin mo na lang ang software',
    ],
    correctIndex: 3,
    explanation:
      'Sa SaaS, wala kang ini-manage. Ready-to-use na ang application. Gagamitin mo na lang siya through the browser or app. Zero maintenance sa part mo.',
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
                Ano Ang Pinagkaiba?
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Sa lesson na &apos;to, tatalakayin natin ang tatlong <strong className="text-blue-400">Cloud Service Models</strong> —
              IaaS, PaaS, at SaaS. Gamit ang pizza analogy, mauunawaan mo kung paano sila
              nagkakaiba at kailan mo gagamitin ang bawat isa. 🍕☁️
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
                4 na sections + quiz
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                Taglish
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
                  Para mas madaling i-explain ang tatlong service models, gamitin natin ang <strong className="text-amber-300">pizza analogy</strong>.
                  Isipin mo, may tatlong paraan para makakain ng pizza:
                </p>

                <div className="space-y-3 mt-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-2xl">🧱</span>
                    <div>
                      <div className="font-bold text-blue-300 text-sm">IaaS = Gumawa ng Pizza from Scratch</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Ikaw bibili ng ingredients, ikaw hahaluhaluin, ikaw maghahalo ng dough, ikaw maglalagay sa oven.
                        <strong className="text-slate-300"> Full control ka pero ang daming kailangan gawin.</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <span className="text-2xl">🛠️</span>
                    <div>
                      <div className="font-bold text-purple-300 text-sm">PaaS = Bumili ng Pizza Kit</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pre-made dough + sauce na ang kasama. Lagyan mo lang ng toppings at ilagay sa oven.
                        <strong className="text-slate-300"> Less hassle, mas focused ka sa toppings (a.k.a. your app).</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="font-bold text-emerald-300 text-sm">SaaS = Nag-order sa Jollibee/Pizza Hut Delivery</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Kumain ka na lang. Zero effort. Hindi mo na kailangan magluto, maghugas, or mag-maintain ng kitchen.
                        <strong className="text-slate-300"> Ready-to-eat na agad. 🍗</strong>
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
                  Parang trade-off: <strong>convenience vs. control</strong>.
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
                  Sa IaaS, binibigyan ka ng cloud provider ng <strong className="text-blue-300">raw computing resources</strong> —
                  virtual machines, storage, at networking. Parang nag-rent ka ng lupa at building —
                  <strong className="text-indigo-300"> ikaw ang bahala kung anong itatayo mo.</strong>
                </p>
                <p>
                  Ikaw ang mag-i-install ng operating system, mag-setup ng environment, mag-deploy ng app.
                  Full control ka, pero full responsibility din.
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
                    <div className="font-semibold text-blue-300 text-sm mb-2">👤 IKAW ang nag-manage:</div>
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
                        <span><strong className="text-slate-300">Application</strong> — yung actual na app mo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-slate-300">Data</strong> — databases, files, configs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <div className="font-semibold text-indigo-300 text-sm mb-2">☁️ PROVIDER ang nag-manage:</div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span><strong className="text-slate-300">Physical Servers</strong> — hardware sa data center</span>
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
                  <strong className="text-white">Best for:</strong> System administrators, DevOps engineers, at companies na gusto ng <strong className="text-blue-300">full control</strong> sa kanilang infrastructure.
                </p>

                <div className="mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-300/80 text-sm">
                  💡 <strong>Fun fact:</strong> AWS EC2 (Elastic Compute Cloud) ang pinakapopular na IaaS service sa buong mundo.
                  Dito nag-start ang AWS journey ng karamihang cloud engineers!
                </div>
              </LessonCard>
            </div>

            {/* SECTION 3: PaaS at SaaS */}
            <div id="paas-saas">
              <LessonCard
                icon="🛠️"
                title="PaaS at SaaS: Less Hassle, More Focus"
                gradient="from-purple-500/20 to-pink-500/20"
                delay={200}
              >
                {/* PaaS */}
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 mb-4">
                  <h4 className="font-bold text-purple-300 text-base mb-2">🛠️ PaaS — Platform as a Service</h4>
                  <p>
                    Sa PaaS, <strong className="text-purple-300">deploy mo lang ang code mo</strong> — sila na bahala sa infrastructure.
                    Hindi mo na kailangang mag-setup ng server, mag-install ng OS, or mag-configure ng networking.
                    Focus ka lang sa pagbuo ng app mo.
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
                  🤯 <strong>Fun fact:</strong> Yung Next.js website na pinag-aaralan mo ngayon? Pag-deploy mo sa Vercel, <strong>PaaS na yun!</strong> Push
                  mo lang sa GitHub, auto-deploy na. Walang server setup, walang sakit ng ulo. ✨
                </div>

                {/* SaaS */}
                <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 mb-4">
                  <h4 className="font-bold text-pink-300 text-base mb-2">📦 SaaS — Software as a Service</h4>
                  <p>
                    SaaS ang pinaka-simple. <strong className="text-pink-300">Ready-to-use na application</strong> siya na
                    accessible through the browser or app. Hindi mo na kailangang mag-code or mag-maintain — gagamitin mo na lang.
                  </p>
                  <div className="mt-3">
                    <div className="font-semibold text-white text-xs mb-1.5">SaaS na Ginagamit Mo Every Day:</div>
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
                  💡 <strong>Alam mo ba?</strong> Most people use SaaS every day without knowing it! Pag nag-Gmail ka, nag-Netflix, or nag-Spotify
                  — <strong>gumagamit ka na ng cloud.</strong> Hindi mo na kailangang mag-install ng software sa computer mo. 🎵
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
                  Para mas malinaw, tignan natin ang <strong className="text-emerald-300">side-by-side comparison</strong> ng
                  tatlong service models:
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
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">Pinakamataas</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Medium</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">Pinakamababa</div>
                  </div>

                  {/* Complexity */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/50 text-slate-300 font-medium flex items-center">🧩 Complexity</div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-200 text-center">Pinakamahirap</div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-200 text-center">Medium</div>
                    <div className="p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-200 text-center">Pinakamadali</div>
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
                  💡 <strong>Remember:</strong> Sa real world, companies use a <strong>MIX</strong> of all three. Hindi either/or.
                  Pwedeng IaaS para sa backend servers, PaaS para sa quick deployments, at SaaS para sa email at collaboration tools.
                  Ang mahalaga, alam mo kung <strong>kailan gagamitin ang bawat isa</strong>. 🎯
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
                  Sa Lesson 3, mag-setup tayo ng actual <strong className="text-blue-400">AWS account</strong>.
                  Hands-on na! Dito na talaga magsisimula ang cloud journey mo. 💪
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Lesson 3: Coming Soon
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================================
            FOOTER
            ================================================================ */}
        <footer className="border-t border-white/[0.04] py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-gradient-primary font-bold">CloudEng PH</span>
              <span>•</span>
              <span>Made with ☁️ for aspiring Pinoy cloud engineers</span>
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
