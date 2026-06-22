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
      title: 'Ano ang AWS Free Tier?',
      content: (
        <div className="space-y-4">
          <p>
            Bago tayo gumawa ng account, alamin muna natin kung ano ang <strong className="text-white">AWS Free Tier</strong>.
            Ito yung programa ng Amazon kung saan pwede kang gumamit ng maraming AWS services nang <strong className="text-emerald">libre</strong> — for up to <strong className="text-white">12 months</strong> pagkatapos mag-sign up!
          </p>

          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm mb-3">🎁 Ilan sa mga kasama sa Free Tier:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">750 hours</strong> ng EC2 t2.micro per month</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">5 GB</strong> ng S3 storage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong className="text-white">25 GB</strong> ng DynamoDB storage</span>
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
              <strong className="text-emerald">Good news:</strong> Hindi ka macha-charge <strong className="text-white">BASTA</strong> hindi ka lumagpas sa Free Tier limits. Kaya chill ka lang, pero always monitor!
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber/5 border border-amber/20">
            <span className="text-amber text-xl flex-shrink-0">⚠️</span>
            <p>
              <strong className="text-amber">Warning:</strong> Always monitor your usage sa <strong className="text-white">AWS Billing dashboard</strong> para walang surprise charges! Later sa lab na &apos;to, mag-se-setup tayo ng billing alerts para protected ka.
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 2 ──────────── */
    {
      id: 2,
      title: 'Gumawa ng AWS Account',
      content: (
        <div className="space-y-4">
          <p>
            Let&apos;s go! Oras na para gumawa ng sarili mong AWS account. Don&apos;t worry, libre lang &apos;to at hindi ka agad sisingilin.
          </p>

          <div className="glass rounded-xl p-5 space-y-4">
            <p className="text-white font-semibold">📋 Kailangan mo:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span>Valid <strong className="text-white">email address</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">2.</span>
                <span><strong className="text-white">Phone number</strong> (para sa verification)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span><strong className="text-white">Credit/debit card</strong> — for verification lang, hindi agad charged</span>
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
                <span>Enter your <strong className="text-white">email address</strong> at pumili ng account name</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">3</span>
                <span>Create a <strong className="text-white">strong password</strong> (mix ng uppercase, lowercase, numbers, symbols)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">4</span>
                <span>Fill in your <strong className="text-white">contact information</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">5</span>
                <span>Enter <strong className="text-white">payment method</strong> — may temporary ₱1 or $1 charge for verification</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Complete <strong className="text-white">phone verification</strong> via SMS or voice call</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">7</span>
                <span>Select support plan — choose <strong className="text-emerald">&quot;Basic Support - Free&quot;</strong></span>
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
              Ganito ang makikita mo pagka-login — ang AWS Management Console
            </div>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 3 ──────────── */
    {
      id: 3,
      title: 'Navigate ang AWS Console',
      content: (
        <div className="space-y-4">
          <p>
            Congrats sa pag-gawa ng account! 🎉 After login, makikita mo ang <strong className="text-white">AWS Management Console</strong> — ito yung &quot;dashboard&quot; mo para sa lahat ng AWS services.
          </p>

          <div className="glass rounded-xl p-5 space-y-4">
            <p className="text-white font-semibold">🗺️ Key areas na kailangan mong alamin:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">🔍</span>
                <div>
                  <p className="text-white font-medium">Search Bar</p>
                  <p className="text-sm text-slate-400">Ito ang pinaka-important! Type mo lang yung service na gusto mo (e.g., &quot;EC2&quot;, &quot;S3&quot;, &quot;IAM&quot;)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg">📋</span>
                <div>
                  <p className="text-white font-medium">Services Menu</p>
                  <p className="text-sm text-slate-400">Lahat ng AWS services, organized by category. Marami &apos;to — 200+ services!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center text-lg">🌍</span>
                <div>
                  <p className="text-white font-medium">Region Selector</p>
                  <p className="text-sm text-slate-400">Nasa top-right — pinipili mo kung saang data center location i-deploy ang resources mo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-blue-400 text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-white font-medium mb-1">Pro Tip: Always check your region!</p>
              <p className="text-sm">
                Default region is usually <strong className="text-white">US East (N. Virginia)</strong>. Para sa Pilipinas, ang pinakamalapit na region ay <strong className="text-cyan">ap-southeast-1 (Singapore)</strong>. Mas mababa ang latency kung malapit sa&apos;yo ang region!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber/5 border border-amber/20">
            <span className="text-amber text-xl flex-shrink-0">⚠️</span>
            <p>
              <strong className="text-amber">Tandaan:</strong> Ang ibang AWS services ay <strong className="text-white">region-specific</strong> — ibig sabihin, kung gumawa ka ng EC2 instance sa Singapore, hindi mo siya makikita kung naka-select ka sa US East. Always double-check ang region mo!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 4 ──────────── */
    {
      id: 4,
      title: 'Setup ng IAM User',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose/5 border border-rose/20">
            <span className="text-rose text-xl flex-shrink-0">🚨</span>
            <p>
              <strong className="text-rose">Rule #1:</strong> NEVER use your <strong className="text-white">root account</strong> for daily tasks! Ang root account mo ay may full access sa lahat — pag na-compromise &apos;to, GG ka. Always gumawa ng separate <strong className="text-white">IAM user</strong>.
            </p>
          </div>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">👤 Gumawa ng IAM User:</p>
            <ol className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
                <span>Search for <strong className="text-white">&quot;IAM&quot;</strong> sa console search bar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">2</span>
                <span>Click <strong className="text-white">&quot;Users&quot;</strong> sa left sidebar, then <strong className="text-white">&quot;Create User&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">3</span>
                <span>Bigyan mo ng username (e.g., <strong className="text-cyan">admin-yourname</strong>)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">4</span>
                <span>Enable <strong className="text-white">&quot;AWS Management Console access&quot;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">5</span>
                <span>Attach policy: <strong className="text-white">AdministratorAccess</strong> (for now — matututo tayo about least privilege later!)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Review at create — <strong className="text-white">save the credentials!</strong></span>
              </li>
            </ol>
          </div>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">🔐 Enable MFA (Multi-Factor Authentication):</p>
            <p className="text-sm">
              Enable MFA on <strong className="text-white">BOTH</strong> your root account AND your new IAM user. I-download mo ang <strong className="text-white">Google Authenticator</strong> or <strong className="text-white">Authy</strong> app sa phone mo.
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
                <span>Scan QR code gamit ang authenticator app mo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <span>Enter two consecutive codes para ma-verify</span>
              </li>
            </ol>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose/5 border border-rose/20">
            <span className="text-rose text-xl flex-shrink-0">🛡️</span>
            <p>
              <strong className="text-rose">This is the #1 security best practice in AWS!</strong> Kahit expert ka na, kung walang MFA ang account mo, vulnerable ka pa rin. &apos;Wag mong i-skip &apos;to!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 5 ──────────── */
    {
      id: 5,
      title: 'Setup ng Billing Alerts',
      content: (
        <div className="space-y-4">
          <p>
            Isa sa biggest fears ng beginners sa AWS ay yung <strong className="text-rose">surprise charges</strong>. Kaya tayo mag-se-setup ng <strong className="text-white">billing alerts</strong> para never ka ma-surprise!
          </p>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">💰 Setup Budget Alert:</p>
            <ol className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
                <span>Search for <strong className="text-white">&quot;Billing and Cost Management&quot;</strong> sa console</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">2</span>
                <span>Click <strong className="text-white">&quot;Budgets&quot;</strong> sa left sidebar</span>
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
                <span>Set amount to <strong className="text-emerald">$5</strong> (around <strong className="text-emerald">₱280</strong>) — sapat na para sa learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">6</span>
                <span>Set alert thresholds at <strong className="text-amber">80%</strong> at <strong className="text-rose">100%</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">7</span>
                <span>Add your <strong className="text-white">email address</strong> for notifications</span>
              </li>
            </ol>
          </div>

          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm">📊 Ganito ang alert setup mo:</p>
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
              <strong className="text-emerald">Peace of mind!</strong> Pagka-setup nito, maa-alert ka agad pag malapit ka na sa budget mo. Hindi ka na mag-wo-worry about surprise bills. Ang galing mo!
            </p>
          </div>
        </div>
      ),
    },

    /* ──────────── Step 6 ──────────── */
    {
      id: 6,
      title: 'Congrats! Ready ka na! 🎉',
      content: (
        <div className="space-y-4">
          <div className="text-center py-4">
            <span className="text-5xl">🏆</span>
          </div>

          <p className="text-center text-lg">
            <strong className="text-white">Ayos!</strong> Na-setup mo na ang lahat ng kailangan para mag-start sa AWS. Let&apos;s recap kung ano ang nagawa mo:
          </p>

          <div className="glass rounded-xl p-5 space-y-3">
            <p className="text-white font-semibold">✅ Checklist ng na-accomplish mo:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">AWS Account</strong> — Free Tier na account, 12 months free!</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">IAM User</strong> — Separate user para hindi root account ang ginagamit</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">MFA</strong> — Multi-Factor Authentication para secure ang account</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
                <span className="text-emerald">✓</span>
                <span><strong className="text-white">Billing Alerts</strong> — Protected ka na from surprise charges</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-blue-400 text-xl flex-shrink-0">🚀</span>
            <div>
              <p className="text-white font-medium mb-1">Next Steps:</p>
              <p className="text-sm">
                Sa <strong className="text-blue-400">Lesson 3</strong>, matututo tayo mag-launch ng ating unang <strong className="text-white">EC2 instance</strong> — basically, gagawa tayo ng virtual computer sa cloud! Exciting, &apos;di ba?
              </p>
            </div>
          </div>

          <div className="text-center p-6 glass rounded-xl">
            <p className="text-lg font-semibold text-gradient-primary mb-2">
              Laban lang, future Cloud Engineer! 💪☁️
            </p>
            <p className="text-sm text-slate-400">
              Isa ka na sa mga Pinoy na hands-on natututo ng cloud engineering. Keep going!
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
        description="Gumawa ng AWS Free Tier account at i-navigate ang AWS Console."
        estimatedTime="30-45 mins"
        difficulty="Beginner"
        steps={steps}
      />
    </div>
  );
}
