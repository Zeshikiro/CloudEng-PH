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
    question: 'What is the simplest explanation of Cloud Computing?',
    options: [
      'A literal cloud in the sky with computers',
      'Renting computing resources over the internet instead of buying your own server',
      'A programming language for websites',
      'A WiFi connection without cables',
    ],
    correctIndex: 1,
    explanation:
      'Cloud computing = renting computing power (servers, storage, databases) over the internet. You don\'t need to buy and maintain your own hardware anymore.',
  },
  {
    id: 2,
    question: 'Which of the following is NOT part of the "Big 3" cloud providers?',
    options: [
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'IBM Cloud',
    ],
    correctIndex: 3,
    explanation:
      'The Big 3 are AWS, Azure, and GCP. They are the biggest in the market. There are others like IBM Cloud, Oracle Cloud, etc., but they are not part of the Big 3.',
  },
  {
    id: 3,
    question: 'Why do we say the cloud is "not magic"?',
    options: [
      'Because it has actual physical servers and data centers all over the world',
      'Because cloud services are not reliable',
      'Because all cloud services are completely free',
      'Because it doesn\'t need an internet connection',
    ],
    correctIndex: 0,
    explanation:
      'Cloud = real physical data centers spread across the world. It\'s not magic — there are buildings, servers, undersea cables, and engineers running everything.',
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
              <span className="text-gradient-primary">What is the Cloud?</span>
              <br />
              <span className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-medium">
                Why not use a home PC?
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              In this lesson, we will learn what <strong className="text-blue-400">Cloud Computing</strong> really is, 
              why the world shifted to it, and who the big players are. 
              We don&apos;t need complicated jargon — just simple English. ☁️
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
            <LessonCard id="analogy" icon="🍕" title="The Netflix Analogy" gradient="from-blue-500/20 to-indigo-500/20">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Think of how we used to watch movies in the 2000s:
              </p>
              <ul className="list-none space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span><strong>The Old Way (On-Premises):</strong> You buy a DVD player. You buy DVDs. You have to clean them, store them in a rack, and if the DVD gets scratched, you lose the movie. If you want a new movie, you have to buy another physical disc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  <span><strong>The Cloud Way (Netflix):</strong> You just subscribe. You don&apos;t buy DVDs or players. You just stream it over the internet. Netflix handles all the storage and maintenance.</span>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 mt-6">
                💡 <strong>Simply put:</strong> Cloud Computing is just renting computers, storage, and databases over the internet instead of buying and maintaining your own hardware!
              </div>
            </div>
          </LessonCard>

            {/* SECTION 2: Problems Solved */}
            <LessonCard id="problems" icon="😰" title="Why do companies move to the Cloud?" gradient="from-purple-500/20 to-pink-500/20">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Before the cloud existed, companies had to buy massive physical servers (On-Premises). This created huge problems:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">💰</span> Too Expensive
                  </h4>
                  <p className="text-sm text-slate-400">
                    You have to buy the servers upfront. Even if you don&apos;t use them 24/7, you still paid full price. With the cloud, you only pay for what you use (Pay-as-you-go).
                  </p>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">📈</span> Scaling Issues
                  </h4>
                  <p className="text-sm text-slate-400">
                    Imagine you have an online store and it goes viral on TikTok. Your 1 server will crash from too much traffic! In the cloud, you can automatically add 100 servers in just 1 minute.
                  </p>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">🛠️</span> High Maintenance
                  </h4>
                  <p className="text-sm text-slate-400">
                    In the old days, you needed to hire people just to clean, cool, and fix broken hardware. In the cloud, the provider does all the heavy lifting.
                  </p>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">🌍</span> Global Reach
                  </h4>
                  <p className="text-sm text-slate-400">
                    If your server is in the Philippines, a user in the US will experience lag. With the cloud, you can deploy your app to US servers with just one click.
                  </p>
                </div>
              </div>
            </div>
          </LessonCard>

            {/* SECTION 3: Big 3 Providers */}
            <div id="big3">
              <LessonCard
                icon="🏢"
                title="The Big 3: AWS, Azure, GCP"
                gradient="from-amber-500/20 to-orange-500/20"
                delay={200}
              >
                <p>
                  There are three major cloud providers in the world — they are known as the <strong className="text-amber-300">&quot;Big 3&quot;</strong>. 
                  Think of them as the AT&T, Verizon, and T-Mobile of the cloud world. But of course, the competition is much bigger. 😂
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
                        The biggest one — ~31% market share. They have the most services (200+). 
                        This is where the cloud revolution started. Best for: overall versatility and enterprise.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-2xl">🔵</span>
                    <div>
                      <div className="font-bold text-blue-300 text-sm">Microsoft Azure</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ~24% market share. Best if you are already using Microsoft tools (Office 365, Active Directory). 
                        Very popular among corporate and enterprise companies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-2xl">🟢</span>
                    <div>
                      <div className="font-bold text-emerald-300 text-sm">Google Cloud Platform (GCP)</div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ~11% market share. Best for data analytics, AI/ML, and Kubernetes.
                        Fun fact: GCP is what YouTube and Google Search use internally.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-300/80 text-sm">
                  💡 <strong>In this course,</strong> we will focus on <strong>AWS</strong> because it has the largest market share and the most job postings.
                  But once you learn the concepts, it will be easy to switch to Azure or GCP.
                </div>
              </LessonCard>
            </div>

            {/* SECTION 4: Hindi Magic */}
            <div id="not-magic">
              <LessonCard
                icon="🪄"
                title="The Cloud is Not Magic"
                gradient="from-rose-500/20 to-red-500/20"
                delay={300}
              >
                <p>
                  A common misconception: <em className="text-rose-300">&quot;Because it&apos;s in the cloud&quot;</em> — it&apos;s like your data is floating in the air. 
                  <strong className="text-rose-300">It&apos;s not. 😅</strong>
                </p>
                <p>
                  The cloud is made of <strong className="text-white">real physical computers</strong> — stacked in massive buildings 
                  called <strong className="text-rose-300">data centers</strong>. They have air conditioning, generators, and even 24/7 security guards.
                </p>
                <p>
                  These data centers are spread all over the world. They are connected through 
                  <strong className="text-rose-300"> undersea fiber optic cables</strong> — yes, under the ocean! 🌊
                </p>

                <div className="mt-3 p-4 rounded-xl bg-slate-800/50 border border-white/[0.06]">
                  <div className="font-semibold text-white text-sm mb-2">🏗️ What is inside a Data Center?</div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Servers</strong> — thousands of them, stacked in racks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Cooling Systems</strong> — because servers get really hot running 24/7</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-slate-300">Backup Power</strong> — generators and battery systems so there&apos;s no downtime</span>
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
                  💡 <strong>Remember:</strong> &quot;The cloud is just someone else&apos;s computer.&quot; — But with enterprise-grade security, 
                  redundancy, and global reach that you couldn&apos;t easily build on your own.
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
                  In Lesson 2, we will learn about <strong className="text-blue-400">Cloud Service Models</strong> — 
                  IaaS, PaaS, and SaaS. What&apos;s the difference and when should you use them?
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

        {/* Discussion */}
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <DiscussionSection lessonSlug="lesson-1" />
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
