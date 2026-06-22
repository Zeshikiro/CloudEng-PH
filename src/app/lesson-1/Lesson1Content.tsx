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
    question: 'Ano ang pinaka-simple na explanation ng Cloud Computing?',
    options: [
      'Literal na cloud sa sky na may computers',
      'Pag-rent ng computing resources sa internet instead na bumili ng sarili mong server',
      'Isang programming language para sa websites',
      'WiFi connection na walang cable',
    ],
    correctIndex: 1,
    explanation:
      'Cloud computing = pag-rent ng computing power (servers, storage, databases) through the internet. Hindi mo na kailangang bumili at mag-maintain ng sarili mong hardware.',
  },
  {
    id: 2,
    question: 'Alin sa mga ito ang HINDI kasama sa "Big 3" cloud providers?',
    options: [
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'IBM Cloud',
    ],
    correctIndex: 3,
    explanation:
      'Ang Big 3 ay AWS, Azure, at GCP. Sila ang pinakamalaki sa market. May iba pa like IBM Cloud, Oracle Cloud, etc., pero hindi sila parte ng Big 3.',
  },
  {
    id: 3,
    question: 'Bakit sinasabing "hindi magic" ang cloud?',
    options: [
      'Kasi may actual na physical servers at data centers siya sa buong mundo',
      'Kasi hindi reliable ang cloud services',
      'Kasi libre lahat ng cloud services',
      'Kasi walang internet connection needed',
    ],
    correctIndex: 0,
    explanation:
      'Cloud = real na physical data centers na naka-spread sa buong mundo. Hindi siya magic — may buildings, servers, undersea cables, at engineers na nagpa-patakbo ng lahat.',
  },
];

const sectionIds = ['analogy', 'problems', 'big3', 'not-magic', 'quiz'];

export default function Lesson1Content() {
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
              <span className="text-white">Lesson 1: </span>
              <span className="text-gradient-primary">Ano ba Cloud?</span>
              <br />
              <span className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-medium">
                Bakit di na PC sa bahay?
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Sa lesson na &apos;to, aalamin natin kung ano talaga ang <strong className="text-blue-400">Cloud Computing</strong>, 
              bakit nag-shift ang mundo dito, at sino ang mga big players. 
              Hindi natin kailangan ng complicated na jargon — Taglish lang tayo. ☁️
            </p>

            {/* Meta info */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~10 min read
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
                src="/cloud-hero.png"
                alt="Cloud Computing illustration — interconnected servers and data centers"
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

            {/* SECTION 1: Analogy */}
            <div id="analogy">
              <LessonCard
                icon="☁️"
                title="Analogy: Cloud = Jollibee Kitchen"
                gradient="from-blue-500/20 to-cyan-500/20"
                delay={0}
              >
                <p>
                  Isipin mo &apos;to: gusto mo kumain ng Chickenjoy. Kailangan mo ba mag-build ng sarili mong kitchen,
                  bumili ng deep fryer, mag-hire ng cook, at mag-maintain ng equipment? <strong className="text-blue-300">Hindi naman, diba?</strong>
                </p>
                <p>
                  Pupunta ka lang sa Jollibee, mag-order, at kumain. Yung Jollibee ang may-ari ng kitchen, 
                  sila ang nag-maintain, sila ang nag-hire ng staff. <strong className="text-cyan-300">Ikaw, kumakain ka lang.</strong>
                </p>
                <p>
                  Ganyan din ang <strong className="text-blue-300">Cloud Computing</strong>. Instead na bumili ka ng sarili mong server 
                  (yung computer na laging bukas 24/7), mag-rent ka na lang ng computing power sa internet. 
                  Yung cloud provider (like AWS) ang may-ari ng servers, sila ang nag-maintain, 
                  ikaw — <strong className="text-cyan-300">gagamit ka lang.</strong> 🍗
                </p>
                <div className="mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-300/80 text-sm">
                  💡 <strong>TL;DR:</strong> Cloud = &quot;rent, don&apos;t buy&quot; approach sa computing resources. Parang Grab vs. bumili ng sariling kotse.
                </div>
              </LessonCard>
            </div>

            {/* SECTION 2: Problems Solved */}
            <div id="problems">
              <LessonCard
                icon="🔧"
                title="Anong Problema ang Na-solve ng Cloud?"
                gradient="from-purple-500/20 to-pink-500/20"
                delay={100}
              >
                <p>
                  Noon, pag may startup ka o company, kailangan mo bumili ng <strong className="text-purple-300">physical servers</strong>. 
                  Ang mahal! At kapag biglang dumami users mo? GG — di kaya ng server mo. 💀
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg mb-1">📈</div>
                    <div className="font-semibold text-white text-sm mb-1">Scalability</div>
                    <p className="text-xs text-slate-400">
                      Dumami users? Dagdagan lang ang servers sa ilang clicks. Bumaba? Bawasan. Pay for what you use lang.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg mb-1">💰</div>
                    <div className="font-semibold text-white text-sm mb-1">Cost Savings</div>
                    <p className="text-xs text-slate-400">
                      Wala nang malaking upfront cost para sa hardware. Parang electric bill — bayad ka lang sa nagamit mo.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg mb-1">🌍</div>
                    <div className="font-semibold text-white text-sm mb-1">Global Reach</div>
                    <p className="text-xs text-slate-400">
                      Deploy sa US, Europe, Asia — in minutes. Hindi mo na kailangan mag-ship ng server physically.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg mb-1">🛡️</div>
                    <div className="font-semibold text-white text-sm mb-1">Disaster Recovery</div>
                    <p className="text-xs text-slate-400">
                      Na-flood yung office? Okay lang, nasa cloud ang data mo. May backup sa ibang region pa.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-300/80 text-sm">
                  💡 <strong>Fun fact:</strong> Netflix dati may sariling data center. Nag-migrate sila completely sa AWS kasi mas mura at mas reliable. 
                  Imagine — yung Netflix na pinapanood mo, naka-AWS lahat yan!
                </div>
              </LessonCard>
            </div>

            {/* SECTION 3: Big 3 Providers */}
            <div id="big3">
              <LessonCard
                icon="🏢"
                title="The Big 3: AWS, Azure, GCP"
                gradient="from-amber-500/20 to-orange-500/20"
                delay={200}
              >
                <p>
                  May tatlong pinakamalaking cloud provider sa mundo — sila yung <strong className="text-amber-300">&quot;Big 3&quot;</strong>. 
                  Parang Smart, Globe, at DITO ng cloud world. Pero syempre, mas malaki ang laban nila. 😂
                </p>

                {/* Provider image */}
                <div className="my-4 rounded-xl overflow-hidden border border-white/[0.06]">
                  <Image
                    src="/big3-providers.png"
                    alt="AWS, Azure, and GCP — the Big 3 cloud providers"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <span className="text-2xl">🟠</span>
                    <div>
                      <div className="font-bold text-orange-300 text-sm">Amazon Web Services (AWS)</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pinakamalaki — ~31% market share. Pinakamaraming services (200+). 
                        Dito nag-start ang cloud revolution. Best for: overall versatility at enterprise.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-2xl">🔵</span>
                    <div>
                      <div className="font-bold text-blue-300 text-sm">Microsoft Azure</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ~24% market share. Best pag gumagamit ka na ng Microsoft tools (Office 365, Active Directory). 
                        Sikat sa mga corporate/enterprise companies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-2xl">🟢</span>
                    <div>
                      <div className="font-bold text-emerald-300 text-sm">Google Cloud Platform (GCP)</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ~11% market share. Best sa data analytics, AI/ML, at Kubernetes.
                        Fun fact: GCP ang gamit ng YouTube at Google Search internally.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-300/80 text-sm">
                  💡 <strong>Sa course na &apos;to,</strong> mag-focus tayo sa <strong>AWS</strong> kasi pinakamalaki ang market at pinakamaraming job postings.
                  Pero once matutunan mo yung concepts, madali na mag-switch sa Azure o GCP.
                </div>
              </LessonCard>
            </div>

            {/* SECTION 4: Hindi Magic */}
            <div id="not-magic">
              <LessonCard
                icon="🪄"
                title="Hindi Magic ang Cloud"
                gradient="from-rose-500/20 to-red-500/20"
                delay={300}
              >
                <p>
                  Common misconception: <em className="text-rose-300">&quot;Nasa cloud na kasi&quot;</em> — parang floating sa hangin ang data mo. 
                  <strong className="text-rose-300"> Hindi po. 😅</strong>
                </p>
                <p>
                  Ang cloud ay <strong className="text-white">totoong physical computers</strong> — naka-rack sa mga malaking buildings 
                  na tinatawag na <strong className="text-rose-300">data centers</strong>. May aircon, may generators, may 24/7 security guards pa.
                </p>
                <p>
                  Yung mga data centers na &apos;to, naka-spread sa buong mundo. Connected sila through 
                  <strong className="text-rose-300"> undersea fiber optic cables</strong> — oo, sa ilalim ng dagat! 🌊
                </p>

                <div className="mt-3 p-4 rounded-xl bg-slate-800/50 border border-white/[0.06]">
                  <div className="font-semibold text-white text-sm mb-2">🏗️ Ano ang nasa loob ng Data Center?</div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Servers</strong> — thousands of them, naka-stack sa racks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Cooling Systems</strong> — kasi sobrang init ng servers pag 24/7 bukas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Backup Power</strong> — generators at battery systems para walang downtime</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Security</strong> — biometric access, CCTV, 24/7 guards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Network Equipment</strong> — routers, switches, load balancers</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-300/80 text-sm">
                  💡 <strong>Remember:</strong> &quot;The cloud is just someone else&apos;s computer.&quot; — Pero with enterprise-grade security, 
                  redundancy, at global reach na hindi mo kaya mag-isa.
                </div>
              </LessonCard>
            </div>

            {/* ================================================================
                QUIZ SECTION
                ================================================================ */}
            <div id="quiz">
              <Quiz lessonId="lesson-1" questions={quizQuestions} />
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
                  Sa Lesson 2, matututo tayo tungkol sa <strong className="text-blue-400">Cloud Service Models</strong> — 
                  IaaS, PaaS, at SaaS. Ano ang pinagkaiba at kailan gagamitin?
                </p>
                <Link
                  href="/lesson-2"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Lesson 2: IaaS, PaaS, SaaS
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
