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
    question: 'Ano ang primary purpose ng EC2 sa AWS?',
    options: [
      'Mag-store ng files at images',
      'Mag-run ng virtual machines at applications',
      'Mag-manage ng domain names',
      'Mag-send ng emails'
    ],
    correctIndex: 1,
    explanation: 'EC2 = Elastic Compute Cloud. Ito ang compute service ng AWS — nagbi-bigay sayo ng virtual machines para mag-run ng applications, process data, at iba pa.'
  },
  {
    id: 2,
    question: 'Ano ang S3 bucket?',
    options: [
      'Isang virtual machine na naka-deploy sa cloud',
      'Isang container para sa storing objects (files) sa AWS',
      'Isang networking tool para sa VPC',
      'Isang monitoring dashboard'
    ],
    correctIndex: 1,
    explanation: 'S3 bucket = container para sa objects (files). Globally unique ang pangalan niya, at pwede kang mag-store ng unlimited na data dito.'
  },
  {
    id: 3,
    question: 'Bakit importante ang VPC (Virtual Private Cloud)?',
    options: [
      'Para mas mabilis ang internet connection',
      'Para libre ang lahat ng AWS services',
      'Para ma-isolate at ma-secure ang cloud resources mo sa sarili mong private network',
      'Para automatic ang backup ng files'
    ],
    correctIndex: 2,
    explanation: 'VPC = your own private, isolated network sa AWS. Dito mo kino-control kung sino ang may access sa resources mo at paano sila nag-cocommunicate.'
  }
];

const sectionIds = ['compute', 'storage', 'networking', 'together', 'quiz'];

export default function Lesson3Content() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <ProgressBar sections={sectionIds} />

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Module 2 — Getting Started
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Beginner
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6 leading-tight">
            Lesson 3: Compute, Storage, Networking
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Ang Big 3 ng Cloud Services
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-12">
            <div className="flex items-center gap-2">
              <span>⏱️</span> ~15 min read
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span> 4 sections + quiz
            </div>
            <div className="flex items-center gap-2">
              <span>🇵🇭</span> Taglish
            </div>
          </div>

          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20">
            <Image
              src="/compute-storage-network.png"
              alt="Compute, Storage, Networking Pillars"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          <p className="text-lg text-slate-300 leading-relaxed text-center mb-16">
            Sa lesson na ito, aalamin natin ang tatlong pinaka-fundamental na services sa cloud. Lahat ng iba pang services ay built on top ng tatlong ito. Kung master mo ito, you are halfway there.
          </p>

          <LessonCard 
            id="compute"
            icon="🖥️"
            title="Compute — Ang Utak ng Cloud"
            gradient="from-blue-500/20 to-indigo-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Compute = processing power.</strong> Ito yung nagru-run ng code mo, nag-process ng data, at nag-eexecute ng applications. Parang ang Compute ay ang BRAIN ng operation mo sa cloud.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> Pag nag-order ka ng food delivery, ang Compute ay yung kitchen na nagluluto ng pagkain.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">AWS EC2 (Elastic Compute Cloud)</h3>
                <p>Ito ang pinakasikat na compute service. Virtual Machine siya na pwede mong i-configure: piliin ang OS, RAM, CPU, at storage.</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Instance types:</strong> May t2.micro (free tier!), t3.medium, m5.large, etc.</li>
                  <li>Parang nag-rent ka ng computer sa cloud — ikaw bahala kung anong i-install.</li>
                  <li><strong className="text-blue-400">Fun fact:</strong> Netflix uses thousands of EC2 instances to stream to 200M+ users worldwide!</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">Other Compute Services</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>AWS Lambda:</strong> Serverless! Walang server na ini-manage. Run code on demand. Pay per execution.</li>
                  <li><strong>ECS/EKS:</strong> Para sa containers (Docker/Kubernetes).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-200"><strong>Tip:</strong> Start with EC2 para maintindihan mo ang basics. Move to Lambda pag comfortable ka na sa server concepts.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="storage"
            icon="📦"
            title="Storage — Ang Filing Cabinet ng Cloud"
            gradient="from-emerald-500/20 to-teal-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Storage = where you keep your data.</strong> Files, images, videos, databases, backups — lahat nandito.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> Kung Compute ang kitchen, Storage ang refrigerator at pantry — doon naka-store lahat ng ingredients.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">AWS S3 (Simple Storage Service)</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Object storage:</strong> lagay mo lang ang file, bibigyan ka ng URL para ma-access.</li>
                  <li><strong>Buckets:</strong> parang folders pero globally unique ang pangalan.</li>
                  <li><strong>Use cases:</strong> Website hosting, backup, media files, data lake.</li>
                  <li>Free tier: 5GB for 12 months!</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">EBS (Elastic Block Store)</h3>
                <p>Ito naman ang hard drive ng EC2 instance mo. Attached directly sa virtual machine. Parang external hard drive pero sa cloud.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-200"><strong>Tip:</strong> S3 is one of the most important services to master. Halos lahat ng AWS services ay gumagamit ng S3 in the background.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="networking"
            icon="🌐"
            title="Networking — Ang Kalsada ng Cloud"
            gradient="from-purple-500/20 to-pink-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Networking = communication.</strong> Ito ang nagdedetermine kung paano mag-cocommunicate ang cloud resources mo sa isa&apos;t isa at sa internet.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> Kung Compute ang building at Storage ang warehouse, Networking ang mga kalsada, highway, at toll gates na nag-coconnect sa kanila.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">VPC (Virtual Private Cloud)</h3>
                <p>Ito ang your own private network sa cloud. Parang gumawa ka ng sarili mong invisible na building sa loob ng AWS.</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Subnets:</strong> rooms inside your building. (Public subnet = may window sa labas, Private subnet = walang access sa internet).</li>
                  <li><strong>Security Groups:</strong> parang bouncer o security guard — sino pwede pumasok, sino hindi.</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">Other Networking Services</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Route 53:</strong> AWS DNS service. Converts domain names (like cloudeng.ph) to IP addresses. (Named after Route 66 + DNS port 53).</li>
                  <li><strong>CloudFront:</strong> CDN (Content Delivery Network). Gagawa ng copies ng website mo sa buong mundo para mabilis ma-access. (Para sa Pinas, madalas nasa Singapore ang edge location!).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-200"><strong>Tip:</strong> Networking is often ang pinaka-intimidating pero pinaka-important na concept for security. Take your time dito.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="together"
            icon="🔗"
            title="Paano Sila Nag-wowork Together"
            gradient="from-amber-500/20 to-orange-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>Real-world example: <strong>Pag nag-open ka ng Netflix...</strong></p>
              
              <div className="relative p-6 rounded-2xl bg-black/40 border border-white/10 font-mono text-sm space-y-4 my-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">1</div>
                  <div><span className="text-purple-400">Route 53</span> (Networking) finds the IP address of netflix.com</div>
                </div>
                <div className="w-0.5 h-4 bg-white/10 ml-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
                  <div><span className="text-purple-400">CloudFront</span> (Networking) serves the closest cached web page</div>
                </div>
                <div className="w-0.5 h-4 bg-white/10 ml-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">3</div>
                  <div><span className="text-blue-400">EC2 Instances</span> (Compute) processes your login and search requests</div>
                </div>
                <div className="w-0.5 h-4 bg-white/10 ml-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</div>
                  <div>The actual movie video file is streamed from <span className="text-emerald-400">S3</span> (Storage)</div>
                </div>
              </div>

              <p className="text-lg text-white font-medium text-center mt-8">
                Hindi mo kailangang ma-master lahat agad. Ang importante ay naintindihan mo kung PAANO sila connected. Sa mga susunod na lessons at labs, isa-isa nating tatackle.
              </p>
            </div>
          </LessonCard>

          {/* Quiz Section */}
          <div id="quiz" className="pt-12 scroll-mt-24">
            <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white text-center mb-8">
              Knowledge Check 🧠
            </h2>
            <Quiz lessonId="lesson-3" questions={quizQuestions} />
          </div>

          {/* Next CTA */}
          <div className="mt-16 animate-fade-in">
            <Link href="/labs/ec2-launch">
              <div className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative p-8 md:p-12 rounded-3xl bg-slate-950/90 backdrop-blur-xl flex flex-col items-center text-center">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                    🚀
                  </div>
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
                    Ready for hands-on?
                  </h3>
                  <p className="text-slate-400 max-w-lg mb-8">
                    Sa Lab 2, mag-launch tayo ng actual na EC2 instance! Gagawa tayo ng sarili mong virtual machine sa cloud na live sa internet.
                  </p>
                  <div className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:scale-105 transition-transform duration-200">
                    Start Lab 2: Launch EC2 →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <footer className="mt-24 text-center pb-8 border-t border-white/[0.05] pt-8">
            <p className="text-slate-500 text-sm">
              © 2026 CloudEng PH. Built for Filipino Cloud Engineers.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
