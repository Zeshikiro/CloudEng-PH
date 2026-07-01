'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';
import DiscussionSection from '@/components/DiscussionSection';
import type { QuizQuestion } from '@/components/Quiz';

/* ─── Quiz Data ─────────────────────────────────────────── */
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main benefit of Infrastructure as Code over manual setup?',
    options: [
      'It is faster to learn',
      'It ensures consistency and can be version controlled',
      'It only works with AWS',
      'It requires no coding knowledge',
    ],
    correctIndex: 1,
    explanation:
      'IaC ensures that your infrastructure is consistent every time and can be tracked with Git, just like application code.',
  },
  {
    id: 2,
    question:
      'Which IaC tool is the most commonly used in the industry and works with multiple cloud providers?',
    options: ['CloudFormation', 'Terraform', 'Ansible', 'Puppet'],
    correctIndex: 1,
    explanation:
      'Terraform by HashiCorp is the industry standard. It works with AWS, Azure, GCP, and 1000+ other providers.',
  },
  {
    id: 3,
    question: 'What does the terraform plan command do?',
    options: [
      'Creates the resources immediately',
      'Shows a preview of what will be created or changed',
      'Deletes all resources',
      'Installs Terraform plugins',
    ],
    correctIndex: 1,
    explanation:
      'terraform plan shows you exactly what Terraform will do before it does it. Always run plan before apply!',
  },
];

const sectionIds = ['what-is-iac', 'why-iac', 'terraform', 'code-example', 'challenge', 'quiz'];

/* ─── Challenge Data ────────────────────────────────────── */
interface ChallengeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 0,
    question: 'The comment says Singapore, but the region is set to us-east-1. What should the region be for Singapore?',
    options: ['us-east-1', 'ap-southeast-1', 'eu-west-1'],
    correctIndex: 1,
    feedback: 'Correct! ap-southeast-1 is the Singapore region — the closest AWS region to the Philippines.',
  },
  {
    id: 1,
    question: 'The instance_type is set to m5.large (expensive!). Which instance type is free tier eligible?',
    options: ['m5.large', 't3.xlarge', 't2.micro'],
    correctIndex: 2,
    feedback: 'Correct! t2.micro is included in the AWS Free Tier for 750 hours per month.',
  },
  {
    id: 2,
    question: 'There is no cleanup command. What command removes all resources to avoid charges?',
    options: ['terraform delete', 'terraform remove', 'terraform destroy'],
    correctIndex: 2,
    feedback: 'Correct! terraform destroy removes everything that Terraform created. Always run this when you are done practicing!',
  },
];

/* ─── IaC Tool Cards Data ───────────────────────────────── */
const iacTools = [
  {
    name: 'Terraform',
    cloud: 'Multi-cloud',
    language: 'HCL',
    popularity: 'Most popular',
    license: 'Open source',
    highlight: true,
  },
  {
    name: 'CloudFormation',
    cloud: 'AWS only',
    language: 'YAML / JSON',
    popularity: 'Built into AWS',
    license: 'Free',
    highlight: false,
  },
  {
    name: 'Pulumi',
    cloud: 'Multi-cloud',
    language: 'Python, TypeScript',
    popularity: 'Growing fast',
    license: 'Open source',
    highlight: false,
  },
  {
    name: 'Ansible',
    cloud: 'Multi-cloud',
    language: 'YAML',
    popularity: 'Config management',
    license: 'Open source',
    highlight: false,
  },
];

/* ─── Component ─────────────────────────────────────────── */
export default function Lesson4Content() {
  const [challengeAnswers, setChallengeAnswers] = useState<Record<number, number>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  /* Pre-compute random-safe values in useMemo */
  const toolCardKeys = useMemo(() => iacTools.map((_, i) => `tool-${i}`), []);

  const challengeScore = useMemo(() => {
    if (!challengeSubmitted) return 0;
    return challengeQuestions.reduce(
      (acc, q) => acc + (challengeAnswers[q.id] === q.correctIndex ? 1 : 0),
      0,
    );
  }, [challengeSubmitted, challengeAnswers]);

  const allChallengeAnswered = Object.keys(challengeAnswers).length === challengeQuestions.length;

  const handleChallengeSelect = (questionId: number, optionIndex: number) => {
    if (challengeSubmitted) return;
    setChallengeAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleChallengeSubmit = () => {
    if (!allChallengeAnswered) return;
    setChallengeSubmitted(true);
  };

  const handleChallengeRetry = () => {
    setChallengeAnswers({});
    setChallengeSubmitted(false);
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <ProgressBar sections={sectionIds} />

        {/* ── Hero Section ─────────────────────────────── */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Module 3 — Automation &amp; Scaling
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Essential
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4 leading-tight">
            Infrastructure as Code (IaC)
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium mb-4">
            Stop Clicking, Start Coding
          </p>
          <p className="text-base text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            In this lesson, you will learn how to automate your cloud infrastructure using code instead of clicking buttons in the console. This is one of the most important skills for any Cloud Engineer.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-12">
            <div className="flex items-center gap-2">
              <span>⏱️</span> ~15 min read
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span> 5 sections + quiz
            </div>
            <div className="flex items-center gap-2">
              <span>🌍</span> English
            </div>
          </div>

          {/* Hero gradient accent */}
          <div className="relative w-full aspect-[2.5/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-900 to-blue-900/60 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🏗️</div>
                <p className="text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                  Write Code → Build Infrastructure
                </p>
                <p className="text-slate-400 mt-2 text-base">Terraform &bull; CloudFormation &bull; Pulumi</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>
        </div>

        {/* ── Content Sections ─────────────────────────── */}
        <div className="max-w-3xl mx-auto space-y-12">
          <p className="text-lg text-slate-300 leading-relaxed text-center mb-16">
            This lesson bridges the gap between theory and real-world cloud engineering. After this, you will understand how professionals actually build and manage cloud infrastructure.
          </p>

          {/* ─── Section 1: What is IaC? ─────────────── */}
          <LessonCard
            id="what-is-iac"
            icon="🏗️"
            title="What is Infrastructure as Code?"
            gradient="from-blue-500/20 to-indigo-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Infrastructure as Code (IaC)</strong> means you write a code file that describes what you want in the cloud. Then a tool reads that file and builds everything for you — automatically.
              </p>
              <p>
                Instead of clicking buttons in the AWS Console to create servers, databases, and networks, you write simple instructions in a file. One command, and everything is created.
              </p>

              {/* Analogy */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] italic">
                💡 <strong>Think of it like ordering food:</strong> ClickOps (manual) is like going to the kitchen and cooking yourself. IaC is like placing a written order — the kitchen reads your order and makes everything for you. Every time you send the same order, you get the exact same meal.
              </div>

              {/* Visual comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* ClickOps side */}
                <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-400 text-lg">❌</span>
                    <h4 className="font-bold text-red-300 text-base">ClickOps (Manual)</h4>
                  </div>
                  <ol className="space-y-1.5 text-sm text-slate-400">
                    <li>1. Open AWS Console</li>
                    <li>2. Navigate to EC2</li>
                    <li>3. Click Launch Instance</li>
                    <li>4. Select AMI</li>
                    <li>5. Choose instance type</li>
                    <li>6. Configure network</li>
                    <li>7. Add storage</li>
                    <li>8. Add tags</li>
                    <li>9. Configure security group</li>
                    <li>10. Review and launch</li>
                    <li className="text-red-400 font-medium">...10+ more clicks 😩</li>
                  </ol>
                </div>

                {/* IaC side */}
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-400 text-lg">✅</span>
                    <h4 className="font-bold text-emerald-300 text-base">Infrastructure as Code</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-400">
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono text-center">
                      Write 10 lines of code
                    </div>
                    <div className="text-center text-emerald-400">↓</div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono text-center">
                      Run one command
                    </div>
                    <div className="text-center text-emerald-400">↓</div>
                    <div className="p-3 rounded-lg bg-emerald-500/15 text-emerald-200 font-bold text-center">
                      Done! 🎉
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-white">Key benefits:</strong> Speed (build in seconds), Consistency (same result every time), and Version Control (track changes with Git).
              </p>
            </div>
          </LessonCard>

          {/* ─── Section 2: Why IaC? ─────────────────── */}
          <LessonCard
            id="why-iac"
            icon="💡"
            title="Why Every Cloud Engineer Needs IaC"
            gradient="from-amber-500/20 to-orange-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Manual cloud setup has <strong className="text-white">four big problems</strong> that IaC solves completely:
              </p>

              {/* Problem 1 */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm font-bold text-red-400">1</span>
                  <h4 className="font-bold text-white text-base">Human Error</h4>
                </div>
                <p className="text-sm ml-11">
                  When you click 50 buttons manually, you <strong>will</strong> make a mistake eventually. Maybe you forget a security setting or pick the wrong region. IaC eliminates this because the code is the same every time.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm font-bold text-orange-400">2</span>
                  <h4 className="font-bold text-white text-base">No Documentation</h4>
                </div>
                <p className="text-sm ml-11">
                  When someone sets up a server manually, nobody knows what settings they used. If that person leaves the company, the knowledge is gone. With IaC, the <strong>code IS the documentation</strong>.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400">3</span>
                  <h4 className="font-bold text-white text-base">Cannot Reproduce</h4>
                </div>
                <p className="text-sm ml-11">
                  If you manually create a server and it crashes, how do you recreate the exact same one? With IaC, just <strong>run the code again</strong>. Same infrastructure, every time.
                </p>
              </div>

              {/* Problem 4 */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-sm font-bold text-yellow-400">4</span>
                  <h4 className="font-bold text-white text-base">Scaling</h4>
                </div>
                <p className="text-sm ml-11">
                  What if you need 100 servers? You will not click 100 times. With IaC, you <strong>change one number</strong> in the code — from 1 to 100 — and run the command. Done.
                </p>
              </div>

              {/* Tip box */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-200 text-sm">
                  <strong>💼 Interview Tip:</strong> In job interviews, companies will ask: &quot;How do you manage infrastructure?&quot; The answer they want to hear is <strong>IaC, specifically Terraform</strong>.
                </p>
              </div>
            </div>
          </LessonCard>

          {/* ─── Section 3: Terraform ────────────────── */}
          <LessonCard
            id="terraform"
            icon="🔧"
            title="Terraform — The Industry Standard"
            gradient="from-purple-500/20 to-violet-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Terraform</strong> is made by HashiCorp. It is the most popular IaC tool in the world and the one you should learn first.
              </p>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white">Why Terraform wins:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-purple-400 mt-0.5">1</span>
                    <span>Works with <strong className="text-white">ANY cloud provider</strong> — AWS, Azure, GCP, and 1,000+ more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-purple-400 mt-0.5">2</span>
                    <span>Uses a simple, human-readable language called <strong className="text-white">HCL</strong> (HashiCorp Configuration Language)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-purple-400 mt-0.5">3</span>
                    <span>Has a <strong className="text-white">huge community</strong> and tons of free learning resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-purple-400 mt-0.5">4</span>
                    <span>Most cloud engineering <strong className="text-white">job postings list Terraform</strong> as a requirement</span>
                  </li>
                </ul>
              </div>

              {/* Comparison grid */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-white mb-4">IaC Tools Comparison</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {iacTools.map((tool, i) => (
                    <div
                      key={toolCardKeys[i]}
                      className={`p-4 rounded-xl border ${
                        tool.highlight
                          ? 'bg-purple-500/10 border-purple-500/30 ring-1 ring-purple-500/20'
                          : 'bg-white/[0.02] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className={`font-bold text-sm ${tool.highlight ? 'text-purple-300' : 'text-white'}`}>
                          {tool.name}
                        </h5>
                        {tool.highlight && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded bg-purple-500/20 text-purple-300 font-bold uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-xs text-slate-400">
                        <p>☁️ {tool.cloud}</p>
                        <p>📝 {tool.language}</p>
                        <p>📊 {tool.popularity}</p>
                        <p>🔓 {tool.license}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-200 text-sm">
                  <strong>📌 Note:</strong> We focus on Terraform because it is the #1 most requested skill in cloud engineering job postings worldwide.
                </p>
              </div>
            </div>
          </LessonCard>

          {/* ─── Section 4: Your First Terraform Code ── */}
          <LessonCard
            id="code-example"
            icon="📝"
            title="Your First Terraform Code"
            gradient="from-emerald-500/20 to-teal-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Here is a real Terraform file that creates an EC2 instance (virtual server) on AWS. Let&apos;s break it down line by line.
              </p>

              {/* Code block */}
              <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-slate-500 ml-2 font-mono">main.tf</span>
                </div>
                <div className="p-5 bg-slate-950/80 font-mono text-sm leading-relaxed overflow-x-auto">
                  <div className="text-slate-500"># This file tells Terraform to create an EC2 instance</div>
                  <div className="mt-2">
                    <span style={{ color: '#c792ea' }}>provider</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;aws&quot;</span>{' '}
                    <span className="text-slate-300">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>region</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;ap-southeast-1&quot;</span>{' '}
                    <span className="text-slate-500"> # Singapore (closest to PH)</span>
                  </div>
                  <div className="text-slate-300">{'}'}</div>

                  <div className="mt-4">
                    <span style={{ color: '#c792ea' }}>resource</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;aws_instance&quot;</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;my_server&quot;</span>{' '}
                    <span className="text-slate-300">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>ami</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;ami-0c55b159cbfafe1f0&quot;</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>instance_type</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;t2.micro&quot;</span>{' '}
                    <span className="text-slate-500"> # Free tier!</span>
                  </div>
                  <div className="mt-2 ml-4">
                    <span style={{ color: '#82aaff' }}>tags</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span className="text-slate-300">{'{'}</span>
                  </div>
                  <div className="ml-8">
                    <span style={{ color: '#82aaff' }}>Name</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;MyFirstServer&quot;</span>
                  </div>
                  <div className="ml-4 text-slate-300">{'}'}</div>
                  <div className="text-slate-300">{'}'}</div>
                </div>
              </div>

              {/* Line-by-line breakdown */}
              <div className="space-y-3 mt-6">
                <h4 className="text-lg font-bold text-white">Line-by-Line Breakdown</h4>
                <div className="space-y-2">
                  {[
                    { code: 'provider "aws"', desc: 'Tells Terraform we are using AWS' },
                    { code: 'region = "ap-southeast-1"', desc: 'The data center location (Singapore, closest to the Philippines)' },
                    { code: 'resource "aws_instance"', desc: 'We want to create an EC2 server' },
                    { code: 'ami = "..."', desc: 'The operating system template (Amazon Linux)' },
                    { code: 'instance_type = "t2.micro"', desc: 'The size of the server (free tier!)' },
                    { code: 'tags', desc: 'A label or name for the server so you can find it easily' },
                  ].map((item) => (
                    <div key={item.code} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <code className="flex-shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-xs font-mono whitespace-nowrap">
                        {item.code}
                      </code>
                      <span className="text-sm text-slate-400">→ {item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The 3 magic commands */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">The 3 Magic Commands</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">1</span>
                    <div>
                      <code className="text-blue-300 font-mono font-bold">terraform init</code>
                      <p className="text-xs text-slate-400 mt-0.5">Downloads and installs the AWS plugin</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400">2</span>
                    <div>
                      <code className="text-amber-300 font-mono font-bold">terraform plan</code>
                      <p className="text-xs text-slate-400 mt-0.5">Shows you what Terraform WILL do (preview — nothing is created yet)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400">3</span>
                    <div>
                      <code className="text-emerald-300 font-mono font-bold">terraform apply</code>
                      <p className="text-xs text-slate-400 mt-0.5">Actually creates the resources in your AWS account!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destroy warning */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mt-4">
                <p className="text-red-200 text-sm">
                  <strong>⚠️ Important:</strong>{' '}
                  <code className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-xs">terraform destroy</code>{' '}
                  deletes everything Terraform created. <strong>Always run this when you are done practicing</strong> to avoid unexpected charges on your AWS bill!
                </p>
              </div>
            </div>
          </LessonCard>

          {/* ─── Section 5: Fix the Code Challenge ───── */}
          <LessonCard
            id="challenge"
            icon="🎯"
            title="Knowledge Check: Fix the Code!"
            gradient="from-rose-500/20 to-pink-500/20"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                The Terraform code below has <strong className="text-white">3 mistakes</strong>. Can you find them? Answer the questions to prove you understand the basics.
              </p>

              {/* Buggy code */}
              <div className="rounded-xl overflow-hidden border border-red-500/20">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-red-500/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-red-400 ml-2 font-mono">buggy.tf — 3 mistakes!</span>
                </div>
                <div className="p-5 bg-slate-950/80 font-mono text-sm leading-relaxed overflow-x-auto">
                  <div>
                    <span style={{ color: '#c792ea' }}>provider</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;aws&quot;</span>{' '}
                    <span className="text-slate-300">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>region</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#ef4444' }}>&quot;us-east-1&quot;</span>{' '}
                    <span className="text-slate-500"> # Singapore ← 🐛 Bug #1</span>
                  </div>
                  <div className="text-slate-300">{'}'}</div>

                  <div className="mt-3">
                    <span style={{ color: '#c792ea' }}>resource</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;aws_instance&quot;</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;my_server&quot;</span>{' '}
                    <span className="text-slate-300">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>ami</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#c3e88d' }}>&quot;ami-0c55b159cbfafe1f0&quot;</span>
                  </div>
                  <div className="ml-4">
                    <span style={{ color: '#82aaff' }}>instance_type</span>{' '}
                    <span className="text-slate-500">=</span>{' '}
                    <span style={{ color: '#ef4444' }}>&quot;m5.large&quot;</span>{' '}
                    <span className="text-slate-500"> # ← 🐛 Bug #2</span>
                  </div>
                  <div className="text-slate-300">{'}'}</div>

                  <div className="mt-3 text-slate-500"># No cleanup command ← 🐛 Bug #3</div>
                </div>
              </div>

              {/* Challenge questions */}
              <div className="space-y-4 mt-6">
                {challengeQuestions.map((cq) => {
                  const isAnswered = challengeAnswers[cq.id] !== undefined;
                  const isCorrect = challengeSubmitted && challengeAnswers[cq.id] === cq.correctIndex;
                  const isWrong = challengeSubmitted && isAnswered && challengeAnswers[cq.id] !== cq.correctIndex;

                  return (
                    <div
                      key={cq.id}
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        isCorrect
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : isWrong
                          ? 'border-red-500/30 bg-red-500/5'
                          : 'border-white/[0.06] bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-xs font-bold text-rose-400">
                          {cq.id + 1}
                        </span>
                        <h5 className="text-sm font-semibold text-white">{cq.question}</h5>
                      </div>
                      <div className="grid gap-2 ml-8">
                        {cq.options.map((opt, oi) => {
                          const selected = challengeAnswers[cq.id] === oi;
                          const showGreen = challengeSubmitted && oi === cq.correctIndex;
                          const showRed = challengeSubmitted && selected && oi !== cq.correctIndex;
                          return (
                            <button
                              key={oi}
                              onClick={() => handleChallengeSelect(cq.id, oi)}
                              disabled={challengeSubmitted}
                              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                showGreen
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                                  : showRed
                                  ? 'bg-red-500/15 border-red-500/40 text-red-300'
                                  : selected
                                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                                  : 'bg-slate-800/40 border-white/[0.06] text-slate-300 hover:bg-slate-700/40 hover:border-white/10 hover:text-white'
                              } ${challengeSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                              <span className="flex items-center gap-2">
                                <span
                                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${
                                    showGreen
                                      ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300'
                                      : showRed
                                      ? 'border-red-400 bg-red-500/30 text-red-300'
                                      : selected
                                      ? 'border-blue-400 bg-blue-500/30 text-blue-300'
                                      : 'border-slate-600'
                                  }`}
                                >
                                  {showGreen ? '✓' : showRed ? '✗' : String.fromCharCode(97 + oi)}
                                </span>
                                <code className="font-mono text-xs">{opt}</code>
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback */}
                      {challengeSubmitted && isCorrect && (
                        <div className="mt-3 ml-8 p-3 rounded-lg bg-emerald-500/10 text-emerald-300/90 text-xs">
                          ✅ {cq.feedback}
                        </div>
                      )}
                      {challengeSubmitted && isWrong && (
                        <div className="mt-3 ml-8 p-3 rounded-lg bg-red-500/10 text-red-300/90 text-xs">
                          ❌ Not quite. The correct answer is <strong>{cq.options[cq.correctIndex]}</strong>.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Score / Retry */}
              {!challengeSubmitted ? (
                <div className="text-center mt-6">
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={!allChallengeAnswered}
                    className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      allChallengeAnswered
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-white/[0.06] cursor-not-allowed'
                    }`}
                  >
                    {allChallengeAnswered
                      ? '🔍 Check My Answers'
                      : `Answer all ${challengeQuestions.length} questions first`}
                  </button>
                </div>
              ) : (
                <div className="text-center mt-6 space-y-3">
                  <div className="inline-block p-5 rounded-xl bg-slate-800/50 border border-white/10">
                    <div className="text-3xl font-bold text-white">
                      {challengeScore}/{challengeQuestions.length}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {challengeScore === challengeQuestions.length
                        ? '🎉 Perfect! You found all the bugs!'
                        : `You found ${challengeScore} out of ${challengeQuestions.length} bugs.`}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleChallengeRetry}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium border border-white/[0.08] hover:bg-slate-700 hover:text-white transition-all duration-200"
                    >
                      🔄 Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </LessonCard>

          {/* ─── Quiz Section ────────────────────────── */}
          <div id="quiz" className="pt-12 scroll-mt-24">
            <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white text-center mb-8">
              Knowledge Check 🧠
            </h2>
            <Quiz lessonId="lesson-4" questions={quizQuestions} />
          </div>

          {/* ─── Next Lesson CTA ─────────────────────── */}
          <div className="mt-16 animate-fade-in">
            <Link href="/lessons">
              <div className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative p-8 md:p-12 rounded-3xl bg-slate-950/90 backdrop-blur-xl flex flex-col items-center text-center">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                    🚀
                  </div>
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">
                    You&apos;re building real skills!
                  </h3>
                  <p className="text-slate-400 max-w-lg mb-8">
                    You now understand Infrastructure as Code and Terraform — one of the most in-demand skills in cloud engineering. Keep going and explore more lessons!
                  </p>
                  <div className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:scale-105 transition-transform duration-200">
                    View All Lessons →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ─── Discussion ──────────────────────────── */}
          <div className="mt-16">
            <DiscussionSection lessonSlug="lesson-4" />
          </div>

          {/* ─── Footer ──────────────────────────────── */}
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
