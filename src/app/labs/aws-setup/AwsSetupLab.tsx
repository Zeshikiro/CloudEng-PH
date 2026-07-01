'use client';

import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import LabViewer from '@/components/LabViewer';
import Image from 'next/image';

export default function AwsSetupLab() {
  const steps = [
    /* ──────────── Step 1 ──────────── */
    {
      id: 1,
      title: 'What is the AWS Free Tier?',
      content: (
        <div className="space-y-4">
          <p>
            Before we create an account, let&apos;s first learn about the <strong className="text-white">AWS Free Tier</strong>.
            This is Amazon&apos;s program where you can use many AWS services for <strong className="text-emerald">free</strong> — for up to <strong className="text-white">12 months</strong> after signing up!
          </p>

          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm mb-3">🎁 Some of the services included in the Free Tier:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">750 hours</strong> of EC2 t2.micro per month</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">5 GB</strong> of S3 storage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">25 GB</strong> of DynamoDB storage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">1 million</strong> Lambda requests per month</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald/5 border border-emerald/20">
            <span className="text-emerald text-xl flex-shrink-0">✅</span>
            <p>
              <strong className="text-emerald">Good news:</strong> You won&apos;t be charged <strong className="text-white">AS LONG AS</strong> you don&apos;t exceed the Free Tier limits. So you can relax, but always monitor your usage!
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber/5 border border-amber/20">
            <span className="text-amber text-xl flex-shrink-0">⚠️</span>
            <p>
              <strong className="text-amber">Warning:</strong> Always monitor your usage on the <strong className="text-white">AWS Billing dashboard</strong> so there are no surprise charges! Later in this lab, we will set up billing alerts so you are protected.
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 2 ──────────── */
    {
      id: 2,
      title: 'Create an AWS Account',
      content: (
        <div className="space-y-4">
          <p>
            Let&apos;s go! It&apos;s time to create your own AWS account. Don&apos;t worry, this is free and you won&apos;t be charged immediately.
          </p>

          <div className="glass rounded-xl p-5 space-y-4">
            <p className="text-white font-semibold">📋 You will need:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span>A valid <strong className="text-white">email address</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">2.</span>
                <span>A <strong className="text-white">phone number</strong> (for verification)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span>A <strong className="text-white">credit/debit card</strong> — for verification only, it won&apos;t be charged immediately</span>
              </li>
            </ul>
          </div>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">🚀 Step-by-step process:</p>
            <ol className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
                <span>Go to <strong className="text-blue-400">aws.amazon.com/free</strong> and click <strong className="text-white">&quot;Create a Free Account&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">2</span>
                <span>Enter your <strong className="text-white">email address</strong> and choose an account name</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">3</span>
                <span>Create a <strong className="text-white">strong password</strong> (a mix of uppercase, lowercase, numbers, and symbols)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">4</span>
                <span>Fill in your <strong className="text-white">contact information</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">5</span>
                <span>Enter your <strong className="text-white">payment method</strong> — there is a temporary $1 charge for verification</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Complete the <strong className="text-white">phone verification</strong> via SMS or voice call</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">7</span>
                <span>Select a support plan — choose <strong className="text-emerald">&quot;Basic Support - Free&quot;</strong></span>
              </li>
            </ol>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10">
            <Image
              src="/aws-console.png"
              alt="AWS Management Console overview"
              width={800}
              height={450}
              className="w-full h-auto"
            />
            <div className="px-4 py-2 bg-slate-800/50 text-xs text-slate-400 text-center">
              This is what you will see after logging in — the AWS Management Console
            </div>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 3 ──────────── */
    {
      id: 3,
      title: 'Navigate the AWS Console',
      content: (
        <div className="space-y-4">
          <p>
            Congrats on creating your account! 🎉 After logging in, you will see the <strong className="text-white">AWS Management Console</strong> — this is your &quot;dashboard&quot; for all AWS services.
          </p>

          <div className="glass rounded-xl p-5 space-y-4">
            <p className="text-white font-semibold">🗺️ Key areas you need to know:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">🔍</span>
                <div>
                  <p className="text-white font-medium">Search Bar</p>
                  <p className="text-sm text-slate-400">This is the most important part! Just type the service you want (e.g., &quot;EC2&quot;, &quot;S3&quot;, &quot;IAM&quot;)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg">📋</span>
                <div>
                  <p className="text-white font-medium">Services Menu</p>
                  <p className="text-sm text-slate-400">All AWS services, organized by category. There are a lot — over 200 services!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center text-lg">🌍</span>
                <div>
                  <p className="text-white font-medium">Region Selector</p>
                  <p className="text-sm text-slate-400">Located at the top-right — you choose which data center location to deploy your resources to</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-blue-400 text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-white font-medium mb-1">Pro Tip: Always check your region!</p>
              <p className="text-sm">
                The default region is usually <strong className="text-white">US East (N. Virginia)</strong>. The closest region to the Philippines is <strong className="text-cyan">ap-southeast-1 (Singapore)</strong>. Latency is lower if the region is closer to you!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber/5 border border-amber/20">
            <span className="text-amber text-xl flex-shrink-0">⚠️</span>
            <p>
              <strong className="text-amber">Remember:</strong> Some AWS services are <strong className="text-white">region-specific</strong> — meaning, if you create an EC2 instance in Singapore, you won&apos;t see it if you have US East selected. Always double-check your region!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 4 ──────────── */
    {
      id: 4,
      title: 'Set Up an IAM User',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose/5 border border-rose/20">
            <span className="text-rose text-xl flex-shrink-0">🚨</span>
            <p>
              <strong className="text-rose">Rule #1:</strong> NEVER use your <strong className="text-white">root account</strong> for daily tasks! Your root account has full access to everything — if it gets compromised, you&apos;re in trouble. Always create a separate <strong className="text-white">IAM user</strong>.
            </p>
          </div>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">👤 Create an IAM User:</p>
            <ol className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
                <span>Search for <strong className="text-white">&quot;IAM&quot;</strong> in the console search bar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">2</span>
                <span>Click <strong className="text-white">&quot;Users&quot;</strong> on the left sidebar, then <strong className="text-white">&quot;Create User&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">3</span>
                <span>Give it a username (e.g., <strong className="text-cyan">admin-yourname</strong>)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">4</span>
                <span>Enable <strong className="text-white">&quot;AWS Management Console access&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">5</span>
                <span>Attach policy: <strong className="text-white">AdministratorAccess</strong> (for now — we&apos;ll learn about least privilege later!)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Review and create — <strong className="text-white">save the credentials!</strong></span>
              </li>
            </ol>
          </div>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">🔐 Enable MFA (Multi-Factor Authentication):</p>
            <p className="text-sm">
              Enable MFA on <strong className="text-white">BOTH</strong> your root account AND your new IAM user. Download the <strong className="text-white">Google Authenticator</strong> or <strong className="text-white">Authy</strong> app on your phone.
            </p>
            <ol className="space-y-2 ml-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <span>Go to IAM → Users → Select user → Security credentials tab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <span>Click &quot;Assign MFA device&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <span>Scan the QR code using your authenticator app</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <span>Enter two consecutive codes to verify</span>
              </li>
            </ol>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose/5 border border-rose/20">
            <span className="text-rose text-xl flex-shrink-0">🛡️</span>
            <p>
              <strong className="text-rose">This is the #1 security best practice in AWS!</strong> Even if you are an expert, if your account doesn&apos;t have MFA, you are still vulnerable. Don&apos;t skip this step!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 5 ──────────── */
    {
      id: 5,
      title: 'Set Up Billing Alerts',
      content: (
        <div className="space-y-4">
          <p>
            One of the biggest fears of beginners in AWS is <strong className="text-rose">surprise charges</strong>. That&apos;s why we are setting up <strong className="text-white">billing alerts</strong> so you&apos;re never surprised!
          </p>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">💰 Setup Budget Alert:</p>
            <ol className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
                <span>Search for <strong className="text-white">&quot;Billing and Cost Management&quot;</strong> in the console</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">2</span>
                <span>Click <strong className="text-white">&quot;Budgets&quot;</strong> on the left sidebar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">3</span>
                <span>Click <strong className="text-white">&quot;Create a budget&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">4</span>
                <span>Choose <strong className="text-white">&quot;Monthly cost budget&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">5</span>
                <span>Set amount to <strong className="text-emerald">$5</strong> — enough for learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Set alert thresholds at <strong className="text-amber">80%</strong> and <strong className="text-rose">100%</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">7</span>
                <span>Add your <strong className="text-white">email address</strong> for notifications</span>
              </li>
            </ol>
          </div>

          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm">📊 This is what your alert setup will look like:</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber/5 border border-amber/20">
                <span className="text-amber">⚡</span>
                <span>At <strong className="text-amber">80%</strong> ($4) — Warning email</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose/5 border border-rose/20">
                <span className="text-rose">🚨</span>
                <span>At <strong className="text-rose">100%</strong> ($5) — Alert email</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald/5 border border-emerald/20">
            <span className="text-emerald text-xl flex-shrink-0">🛡️</span>
            <p>
              <strong className="text-emerald">Peace of mind!</strong> Once this is set up, you will be alerted immediately when you are near your budget limit. No more worrying about surprise bills. Great job!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 6 ──────────── */
    {
      id: 6,
      title: 'Congrats! You are ready! 🎉',
      content: (
        <div className="space-y-4">
          <div className="text-center py-4">
            <span className="text-5xl">🏆</span>
          </div>

          <p className="text-center text-lg">
            <strong className="text-white">Awesome!</strong> You have set up everything you need to start using AWS. Let&apos;s recap what you&apos;ve accomplished:
          </p>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">✅ Checklist of your accomplishments:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">AWS Account</strong> — Free Tier account, 12 months free!</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">IAM User</strong> — Separate user so you do not use the root account</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">MFA</strong> — Multi-Factor Authentication to secure the account</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">Billing Alerts</strong> — You are now protected from surprise charges</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-blue-400 text-xl flex-shrink-0">🚀</span>
            <div>
              <p className="text-white font-medium mb-1">Next Steps:</p>
              <p className="text-sm">
                In <strong className="text-blue-400">Lesson 3</strong>, we will learn how to launch our first <strong className="text-white">EC2 instance</strong> — basically, we&apos;ll create a virtual computer in the cloud! Exciting, right?
              </p>
            </div>
          </div>

          <div className="text-center p-6 glass rounded-xl">
            <p className="text-lg font-semibold text-gradient-primary mb-2">
              Keep going, future Cloud Engineer! 💪☁️
            </p>
            <p className="text-sm text-slate-400">
              You are now building hands-on skills in cloud engineering. Keep up the good work!
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <LabViewer
        labId="aws-setup"
        title="Lab: AWS Account Setup"
        description="Create an AWS Free Tier account and navigate the AWS Console."
        estimatedTime="30-45 mins"
        difficulty="Beginner"
        steps={steps}
      />
    </div>
  );
}
