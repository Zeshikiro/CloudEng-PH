'use client';

import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import LabViewer from '@/components/LabViewer';
import Image from 'next/image';

const ec2LabSteps = [
  {
    id: 1,
    title: 'What is EC2?',
    content: (
      <div className="space-y-4">
        <p><strong>EC2 (Elastic Compute Cloud)</strong> is a Virtual Machine in the cloud. It&apos;s like renting a computer that is connected to the internet 24/7.</p>
        <p>In EC2, you get to choose the:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Operating System (Linux, Windows)</li>
          <li>Processing Power (CPU) and Memory (RAM)</li>
          <li>Storage Space (EBS)</li>
        </ul>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
          💡 <strong>Free Tier:</strong> You have 750 hours/month free for a <code>t2.micro</code> instance for your first 12 months!
        </div>
        <div className="mt-6 border border-white/10 rounded-xl overflow-hidden">
          <Image src="/ec2-launch.png" alt="EC2 Launch Illustration" width={800} height={400} className="w-full h-auto object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Choose an AMI',
    content: (
      <div className="space-y-4">
        <p>An <strong>AMI (Amazon Machine Image)</strong> is like a template or an installer for your Operating System.</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Go to the AWS Console and search for <strong>EC2</strong>.</li>
          <li>Click <strong>Launch Instance</strong> (the orange button).</li>
          <li>Name your instance: <code>MyFirstWebserver</code></li>
          <li>In the <strong>Application and OS Images (AMI)</strong> section, select <strong>Amazon Linux</strong>.</li>
          <li>Make sure to select the <strong>Amazon Linux 2023 AMI</strong> that has the <span className="text-emerald-400 font-bold">Free tier eligible</span> label.</li>
        </ol>
        <p className="text-sm text-slate-400 italic">Why Amazon Linux? Because it is optimized for AWS and comes pre-installed with most AWS tools.</p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Choose the Instance Type',
    content: (
      <div className="space-y-4">
        <p>The Instance Type determines how fast your virtual machine will be and how much RAM it gets.</p>
        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
          <p className="mb-2 font-bold text-white">In the Instance Type dropdown, select:</p>
          <p className="text-2xl font-mono text-emerald-400">t2.micro</p>
          <p className="text-sm text-emerald-500 mt-1">Free tier eligible (1 vCPU, 1 GiB Memory)</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          ⚠️ <strong>WARNING:</strong> If you choose another type (like t3.medium or m5.large), your credit card will be charged! Stay with t2.micro for this lab.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Configure the Security Group',
    content: (
      <div className="space-y-4">
        <p>The <strong>Security Group</strong> is the virtual firewall of your EC2. It controls who is allowed to connect to your server.</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Scroll down to the <strong>Network settings</strong> section.</li>
          <li>Select <strong>Create security group</strong>.</li>
          <li>Check the box: <strong>Allow SSH traffic from</strong> → select <strong>Anywhere</strong> (0.0.0.0/0).</li>
          <li>Check the box: <strong>Allow HTTP traffic from the internet</strong>.</li>
        </ol>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          ⚠️ <strong>BEST PRACTICE WARNING:</strong> In real life, NEVER set SSH to &quot;Anywhere (0.0.0.0/0)&quot;. This should only be set to your own IP address so no one else can hack into your server. This is okay for now since we will delete it right away.
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Launch and Connect!',
    content: (
      <div className="space-y-4">
        <ol className="list-decimal pl-5 space-y-3">
          <li>In the <strong>Key pair (login)</strong> section, select <strong>Proceed without a key pair (Not recommended)</strong> from the dropdown. We will use EC2 Instance Connect in the browser so we don&apos;t need this.</li>
          <li>Click the orange <strong>Launch instance</strong> button!</li>
          <li>Wait for the success message and click the Instance ID (it starts with <code>i-0abcdef...</code>).</li>
          <li>Once the <em>Instance state</em> changes to <span className="text-emerald-400 font-bold">Running</span>, click <strong>Connect</strong> (top right).</li>
          <li>Go to the <strong>EC2 Instance Connect</strong> tab and click <strong>Connect</strong>.</li>
        </ol>
        <p>A new black terminal window will open in your browser. Congratulations! You are now inside your own Linux server in the cloud!</p>
        <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-emerald-400">
          [ec2-user@ip-172-31-45-67 ~]$ _
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Install a Web Server',
    content: (
      <div className="space-y-4">
        <p>Now, we will turn your EC2 into a web server. Type (or copy-paste) these commands into your terminal:</p>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400">1. Switch to the root user:</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">sudo su</pre>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400">2. Update the system and install Apache (httpd):</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">yum update -y
yum install httpd -y</pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-400">3. Start the server and create a simple website:</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">systemctl start httpd
systemctl enable httpd
echo &apos;&lt;h1&gt;Hello from CloudEng! ☁️&lt;/h1&gt;&apos; &gt; /var/www/html/index.html</pre>
        </div>

        <p>Go to the EC2 Dashboard, find the <strong>Public IPv4 address</strong> of your instance, copy it, and paste it into a new browser tab.</p>
        <p>You should now see your website! 🎉</p>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Clean Up and Congrats!',
    content: (
      <div className="space-y-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">Awesome, you&apos;ve deployed to the Cloud!</h3>
        <p className="text-slate-300 mb-6">
          You created a server, installed software, and hosted a website that is accessible to the whole world!
        </p>
        
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-left">
          <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <span>⚠️</span> MOST IMPORTANT STEP: TERMINATE INSTANCE
          </h4>
          <p className="text-red-200 text-sm mb-4">
            To avoid getting charged after the Free Tier, we need to completely shut down and delete the instance.
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-red-200 font-medium">
            <li>Go back to the EC2 Instances page.</li>
            <li>Select your instance.</li>
            <li>Click <strong>Instance state</strong> → <strong>Terminate instance</strong>.</li>
            <li>Click Terminate to confirm.</li>
          </ol>
        </div>
      </div>
    ),
  },
];

export default function EC2LaunchLab() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <LabViewer 
          labId="ec2-launch-lab"
          title="Lab: Launch an EC2 Instance"
          description="Launch a virtual machine, connect via SSH, and deploy an Apache web server."
          estimatedTime="~20 min"
          difficulty="Intermediate"
          steps={ec2LabSteps}
        />
      </main>
    </div>
  );
}
