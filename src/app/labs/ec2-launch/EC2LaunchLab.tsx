'use client';

import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import LabViewer from '@/components/LabViewer';
import Image from 'next/image';

const ec2LabSteps = [
  {
    id: 1,
    title: 'Ano ang EC2?',
    content: (
      <div className="space-y-4">
        <p><strong>EC2 (Elastic Compute Cloud)</strong> ay isang Virtual Machine sa cloud. Parang nag-rent ka ng computer na naka-connect sa internet 24/7.</p>
        <p>Sa EC2, ikaw ang pipili ng:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Operating System (Linux, Windows)</li>
          <li>Processing Power (CPU) at Memory (RAM)</li>
          <li>Storage Space (EBS)</li>
        </ul>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
          💡 <strong>Free Tier:</strong> May 750 hours/month kang libre para sa <code>t2.micro</code> instance for your first 12 months!
        </div>
        <div className="mt-6 border border-white/10 rounded-xl overflow-hidden">
          <Image src="/ec2-launch.png" alt="EC2 Launch Illustration" width={800} height={400} className="w-full h-auto object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Pumili ng AMI',
    content: (
      <div className="space-y-4">
        <p>Ang <strong>AMI (Amazon Machine Image)</strong> ay parang template o installer ng Operating System.</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Go to AWS Console at i-search ang <strong>EC2</strong>.</li>
          <li>Click <strong>Launch Instance</strong> (kulay orange na button).</li>
          <li>Pangalanan ang instance mo: <code>MyFirstWebserver</code></li>
          <li>Sa <strong>Application and OS Images (AMI)</strong> section, piliin ang <strong>Amazon Linux</strong>.</li>
          <li>Siguraduhin na ang napili ay <strong>Amazon Linux 2023 AMI</strong> na may nakasulat na <span className="text-emerald-400 font-bold">Free tier eligible</span>.</li>
        </ol>
        <p className="text-sm text-slate-400 italic">Bakit Amazon Linux? Dahil optimized ito for AWS at pre-installed na ang karamihan sa AWS tools.</p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Piliin ang Instance Type',
    content: (
      <div className="space-y-4">
        <p>Ang Instance Type ang nagdedetermine kung gaano kabilis at kalaki ang RAM ng virtual machine mo.</p>
        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
          <p className="mb-2 font-bold text-white">Sa Instance Type dropdown, piliin ang:</p>
          <p className="text-2xl font-mono text-emerald-400">t2.micro</p>
          <p className="text-sm text-emerald-500 mt-1">Free tier eligible (1 vCPU, 1 GiB Memory)</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          ⚠️ <strong>WARNING:</strong> Kung pipili ka ng ibang type (like t3.medium or m5.large), macha-charge ang credit card mo! Stay with t2.micro for this lab.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Configure Security Group',
    content: (
      <div className="space-y-4">
        <p>Ang <strong>Security Group</strong> ang virtual firewall ng EC2 mo. Ito ang nagko-control kung sino ang pwedeng pumasok.</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Scroll down sa <strong>Network settings</strong> section.</li>
          <li>Select <strong>Create security group</strong>.</li>
          <li>Check the box: <strong>Allow SSH traffic from</strong> → select <strong>Anywhere</strong> (0.0.0.0/0).</li>
          <li>Check the box: <strong>Allow HTTP traffic from the internet</strong>.</li>
        </ol>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          ⚠️ <strong>BEST PRACTICE WARNING:</strong> Sa totoong buhay, NEVER i-set ang SSH sa &quot;Anywhere (0.0.0.0/0)&quot;. Dapat naka-set lang ito sa sarili mong IP address para walang ibang maka-hack ng server mo. Okay lang ito for now dahil ide-delete din natin agad.
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Launch at Connect!',
    content: (
      <div className="space-y-4">
        <ol className="list-decimal pl-5 space-y-3">
          <li>Sa <strong>Key pair (login)</strong> section, select <strong>Proceed without a key pair (Not recommended)</strong> from the dropdown. Gagamitin natin ang EC2 Instance Connect sa browser kaya hindi na natin kailangan nito.</li>
          <li>Click the orange <strong>Launch instance</strong> button!</li>
          <li>Wait for the success message at i-click ang Instance ID (nagsisimula sa <code>i-0abcdef...</code>).</li>
          <li>Pag ang <em>Instance state</em> ay naging <span className="text-emerald-400 font-bold">Running</span>, click <strong>Connect</strong> (top right).</li>
          <li>Go to the <strong>EC2 Instance Connect</strong> tab at click <strong>Connect</strong>.</li>
        </ol>
        <p>Mag-oopen ang isang bagong black terminal window sa browser mo. Congratulations! Nakapasok ka na sa sarili mong Linux server sa cloud!</p>
        <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-emerald-400">
          [ec2-user@ip-172-31-45-67 ~]$ _
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Install Web Server',
    content: (
      <div className="space-y-4">
        <p>Ngayon, gagawin nating web server ang EC2 mo. I-type (or copy-paste) ang mga commands na ito sa terminal mo:</p>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400">1. Mag-switch sa root user:</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">sudo su</pre>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400">2. Update ang system at install ang Apache (httpd):</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">yum update -y
yum install httpd -y</pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-400">3. Start the server at gumawa ng simple website:</p>
          <pre className="p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">systemctl start httpd
systemctl enable httpd
echo &apos;&lt;h1&gt;Hello from CloudEng PH! 🇵🇭☁️&lt;/h1&gt;&apos; &gt; /var/www/html/index.html</pre>
        </div>

        <p>Pumunta sa EC2 Dashboard, hanapin ang <strong>Public IPv4 address</strong> ng instance mo, kopyahin ito, at i-paste sa bagong browser tab.</p>
        <p>Dapat makita mo na ang website mo! 🎉</p>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Clean Up at Congrats!',
    content: (
      <div className="space-y-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">Pre, nag-deploy ka na sa Cloud!</h3>
        <p className="text-slate-300 mb-6">
          Gumawa ka ng server, nag-install ng software, at nag-host ng website na accessible sa buong mundo!
        </p>
        
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-left">
          <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <span>⚠️</span> PINAKAMAHALAGANG STEP: TERMINATE INSTANCE
          </h4>
          <p className="text-red-200 text-sm mb-4">
            Para hindi ka ma-charge pagkatapos ng free tier, kailangan nating patayin nang tuluyan ang instance.
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
          description="Mag-launch ng virtual machine, mag-connect via SSH, at mag-deploy ng Apache web server."
          estimatedTime="~20 min"
          difficulty="Intermediate"
          steps={ec2LabSteps}
        />
      </main>
    </div>
  );
}
