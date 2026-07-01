'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';
import DiscussionSection from '@/components/DiscussionSection';
import type { QuizQuestion } from '@/components/Quiz';
import Link from 'next/link';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of EC2 in AWS?',
    options: [
      'To store files and images',
      'To run virtual machines and applications',
      'To manage domain names',
      'To send emails'
    ],
    correctIndex: 1,
    explanation: 'EC2 = Elastic Compute Cloud. This is the compute service of AWS — it gives you virtual machines to run applications, process data, and more.'
  },
  {
    id: 2,
    question: 'What is an S3 bucket?',
    options: [
      'A virtual machine deployed in the cloud',
      'A container for storing objects (files) in AWS',
      'A networking tool for your VPC',
      'A monitoring dashboard'
    ],
    correctIndex: 1,
    explanation: 'S3 bucket = a container for objects (files). Its name is globally unique, and you can store an unlimited amount of data in it.'
  },
  {
    id: 3,
    question: 'Why is a VPC (Virtual Private Cloud) important?',
    options: [
      'To make your internet connection faster',
      'To make all AWS services free',
      'To isolate and secure your cloud resources in your own private network',
      'To automatically back up files'
    ],
    correctIndex: 2,
    explanation: 'VPC = your own private, isolated network in AWS. Here you control who has access to your resources and how they communicate with each other.'
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
            The Big 3 of Cloud Services
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-12">
            <div className="flex items-center gap-2">
              <span>⏱️</span> ~15 min read
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span> 4 sections + quiz
            </div>
            <div className="flex items-center gap-2">
              <span>🌍</span> English
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
            In this lesson, we will learn about the three most fundamental services in the cloud. All other services are built on top of these three. If you master these, you&apos;re halfway there.
          </p>

          <LessonCard 
            id="compute"
            icon="🖥️"
            title="Compute — The Brain of the Cloud"
            gradient="from-blue-500/20 to-indigo-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Compute = processing power.</strong> This is what runs your code, processes data, and executes applications. Think of Compute as the BRAIN of your cloud operations.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> When you order food delivery, the Compute is the kitchen cooking the food.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">AWS EC2 (Elastic Compute Cloud)</h3>
                <p>This is the most popular compute service. It is a Virtual Machine that you can configure: choose the OS, RAM, CPU, and storage.</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Instance types:</strong> There&apos;s t2.micro (free tier!), t3.medium, m5.large, etc.</li>
                  <li>It&apos;s like renting a computer in the cloud — you decide what to install.</li>
                  <li><strong className="text-blue-400">Fun fact:</strong> Netflix uses thousands of EC2 instances to stream to 200M+ users worldwide!</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">Other Compute Services</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>AWS Lambda:</strong> Serverless! No server to manage. Run code on demand. Pay per execution.</li>
                  <li><strong>ECS/EKS:</strong> For containers (Docker/Kubernetes).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-200"><strong>Tip:</strong> Start with EC2 so you understand the basics. Move to Lambda once you are comfortable with server concepts.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="storage"
            icon="📦"
            title="Storage — The Filing Cabinet of the Cloud"
            gradient="from-emerald-500/20 to-teal-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Storage = where you keep your data.</strong> Files, images, videos, databases, backups — everything goes here.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> If Compute is the kitchen, Storage is the refrigerator and pantry — where all the ingredients are stored.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">AWS S3 (Simple Storage Service)</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Object storage:</strong> just drop your file, and you get a URL to access it.</li>
                  <li><strong>Buckets:</strong> like folders but with globally unique names.</li>
                  <li><strong>Use cases:</strong> Website hosting, backups, media files, data lakes.</li>
                  <li>Free tier: 5GB for 12 months!</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">EBS (Elastic Block Store)</h3>
                <p>This is the hard drive for your EC2 instance. It&apos;s attached directly to the virtual machine. Like an external hard drive, but in the cloud.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-200"><strong>Tip:</strong> S3 is one of the most important services to master. Almost all AWS services use S3 in the background.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="networking"
            icon="🌐"
            title="Networking — The Roads of the Cloud"
            gradient="from-purple-500/20 to-pink-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong>Networking = communication.</strong> This determines how your cloud resources communicate with each other and the internet.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Real-world analogy:</strong> If Compute is a building and Storage is a warehouse, Networking is the roads, highways, and toll gates connecting them.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">VPC (Virtual Private Cloud)</h3>
                <p>This is your own private network in the cloud. It&apos;s like building your own invisible facility inside AWS.</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Subnets:</strong> rooms inside your building. (Public subnet = has a window to the outside, Private subnet = no internet access).</li>
                  <li><strong>Security Groups:</strong> like a bouncer or security guard — controlling who can enter and who cannot.</li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white">Other Networking Services</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Route 53:</strong> AWS DNS service. Converts domain names (like cloudeng.ph) to IP addresses. (Named after Route 66 + DNS port 53).</li>
                  <li><strong>CloudFront:</strong> CDN (Content Delivery Network). Makes copies of your website all over the world for faster access.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-200"><strong>Tip:</strong> Networking is often the most intimidating but also the most important concept for security. Take your time here.</p>
              </div>
            </div>
          </LessonCard>

          <LessonCard 
            id="together"
            icon="🔗"
            title="How They Work Together"
            gradient="from-amber-500/20 to-orange-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>Real-world example: <strong>When you open Netflix...</strong></p>
              
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
                You don&apos;t need to master everything right away. What&apos;s important is you understand HOW they connect. We will tackle them one by one in the next lessons and labs.
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
                    In Lab 2, we will launch an actual EC2 instance! We will create your own virtual machine in the cloud that&apos;s live on the internet.
                  </p>
                  <div className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:scale-105 transition-transform duration-200">
                    Start Lab 2: Launch EC2 →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Discussion */}
          <div className="mt-16">
            <DiscussionSection lessonSlug="lesson-3" />
          </div>

          {/* Footer */}
          <footer className="mt-24 text-center pb-8 border-t border-white/[0.05] pt-8">
            <p className="text-slate-500 text-sm">
              © 2026 CloudEng. Built for Cloud Engineers.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
