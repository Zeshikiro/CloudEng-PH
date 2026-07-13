'use client';

import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ProgressBar from '@/components/ProgressBar';
import LessonCard from '@/components/LessonCard';
import Quiz from '@/components/Quiz';

export default function Lesson8Content() {
  const sections = ['what-are-containers', 'dockerfile-basics', 'docker-compose', 'quiz'];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <ParticleBackground />
      <Navbar />
      <ProgressBar sections={sections} />
      
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm mb-4">
            <span className="mr-2">Intermediate</span> • <span className="ml-2">Containers & Orchestration</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lesson 8: Docker &amp; Containers
          </h1>
          <p className="text-xl text-slate-300 italic mb-4">
            &quot;But it works on my machine!&quot;
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tapos na ang &quot;it works on my machine&quot; problem. Alamin kung paano i-package ang applications gamit ang Docker containers para gumana kahit saan.
          </p>
        </section>

        {/* Section 1 */}
        <section id="what-are-containers" className="scroll-mt-24">
          <LessonCard
            icon="📦"
            title="VMs vs Containers"
            gradient="from-blue-500/20 to-cyan-500/20"
          >
            <div className="space-y-4">
              <p>
                Dati, kapag gusto nating i-deploy ang application, gumagamit tayo ng <strong>Virtual Machines (VMs)</strong>. Ang problema sa VMs, masyadong heavy ito. Kailangan ng buong Operating System (OS) para sa bawat VM, kahit na maliit na app lang ang tatakbo.
              </p>
              <p>
                Dito pumasok ang <strong>Containers</strong>. Lightweight ang containers dahil hindi nila kailangan ng sariling OS. Nakiki-share lang sila sa kernel ng host machine. Dahil dito, mabilis mag-start at maliit ang size ng containers kumpara sa VMs.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-blue-400 mb-2">Bakit naging game-changer ang Containers?</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  <li><strong>Portability:</strong> Kung gumagana siya sa laptop mo, gagana rin siya sa production server.</li>
                  <li><strong>Efficiency:</strong> Mas maraming containers ang kayang tumakbo sa isang server kumpara sa VMs.</li>
                  <li><strong>Isolation:</strong> Nakahiwalay ang dependencies ng bawat app, kaya walang conflict kahit iba&apos;t ibang versions pa yan.</li>
                </ul>
              </div>
            </div>
          </LessonCard>
        </section>

        {/* Section 2 */}
        <section id="dockerfile-basics" className="scroll-mt-24">
          <LessonCard
            icon="🐳"
            title="Writing a Dockerfile"
            gradient="from-blue-500/20 to-indigo-500/20"
          >
            <div className="space-y-4">
              <p>
                Ang <strong>Dockerfile</strong> ay parang recipe. Dito natin sinusulat yung instructions kung paano bubuuin ang Docker Image ng ating application.
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-800">
                <p className="text-green-400"># Start with a base image</p>
                <p><span className="text-blue-400">FROM</span> node:18-alpine</p>
                <br/>
                <p className="text-green-400"># Set working directory</p>
                <p><span className="text-blue-400">WORKDIR</span> /app</p>
                <br/>
                <p className="text-green-400"># Copy package files</p>
                <p><span className="text-blue-400">COPY</span> package*.json ./</p>
                <br/>
                <p className="text-green-400"># Install dependencies</p>
                <p><span className="text-blue-400">RUN</span> npm install</p>
                <br/>
                <p className="text-green-400"># Copy app source code</p>
                <p><span className="text-blue-400">COPY</span> . .</p>
                <br/>
                <p className="text-green-400"># Expose port</p>
                <p><span className="text-blue-400">EXPOSE</span> 3000</p>
                <br/>
                <p className="text-green-400"># Start the app</p>
                <p><span className="text-blue-400">CMD</span> [&quot;npm&quot;, &quot;start&quot;]</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4 text-slate-300">
                <li><code className="text-pink-400">FROM</code> - Ano ang base image na gagamitin natin? (ex. node, python, ubuntu)</li>
                <li><code className="text-pink-400">WORKDIR</code> - Saan folder sa loob ng container natin ilalagay ang files?</li>
                <li><code className="text-pink-400">COPY</code> - Pang-kopya ng files mula sa local machine papunta sa container.</li>
                <li><code className="text-pink-400">RUN</code> - Mag-execute ng command habang binubuo ang image (ex. npm install).</li>
                <li><code className="text-pink-400">EXPOSE</code> - Documentation lang ito na nagsasabing makikinig ang app sa port na ito.</li>
                <li><code className="text-pink-400">CMD</code> - Ang default command na tatakbo pag nag-start na ang container.</li>
              </ul>
            </div>
          </LessonCard>
        </section>

        {/* Section 3 */}
        <section id="docker-compose" className="scroll-mt-24">
          <LessonCard
            icon="🐙"
            title="Docker Compose"
            gradient="from-purple-500/20 to-pink-500/20"
          >
            <div className="space-y-4">
              <p>
                Paano kung kailangan ng app mo ng Database? Imbes na isa-isang i-run ang mga containers (Frontend, Backend, Database), pwede natin gamitin ang <strong>Docker Compose</strong>.
              </p>
              <p>
                Ang <code className="bg-slate-800 px-1 py-0.5 rounded text-pink-400">docker-compose.yml</code> ay isang YAML file kung saan natin idede-define ang lahat ng services na kailangan ng application natin.
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-800">
                <p className="text-blue-400">version: <span className="text-green-400">&apos;3.8&apos;</span></p>
                <p className="text-blue-400">services:</p>
                <p className="text-blue-400 ml-4">web:</p>
                <p className="text-blue-400 ml-8">build: <span className="text-slate-300">.</span></p>
                <p className="text-blue-400 ml-8">ports:</p>
                <p className="text-slate-300 ml-12">- <span className="text-green-400">&quot;3000:3000&quot;</span></p>
                <p className="text-blue-400 ml-8">depends_on:</p>
                <p className="text-slate-300 ml-12">- <span className="text-green-400">db</span></p>
                <br/>
                <p className="text-blue-400 ml-4">db:</p>
                <p className="text-blue-400 ml-8">image: <span className="text-green-400">postgres:13</span></p>
                <p className="text-blue-400 ml-8">environment:</p>
                <p className="text-slate-300 ml-12">POSTGRES_USER: <span className="text-green-400">admin</span></p>
                <p className="text-slate-300 ml-12">POSTGRES_PASSWORD: <span className="text-green-400">password</span></p>
              </div>
              <p>
                Sa pamamagitan lang ng pag-type ng <code className="bg-slate-800 px-1 py-0.5 rounded text-pink-400">docker compose up</code>, sabay-sabay na mag-istart ang web app at ang database mo!
              </p>
            </div>
          </LessonCard>
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="scroll-mt-24">
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>✍️</span> Knowledge Check
            </h2>
            <Quiz lessonId="lesson-8"
              questions={[
                {
                  id: 1,
                  question: 'Ano ang pangunahing kaibahan ng Container sa Virtual Machine (VM)?',
                  options: [
                    'Ang VM ay walang OS, ang Container meron',
                    'Ang Container ay nagshi-share ng OS kernel ng host, habang ang VM ay may sariling kumpletong OS',
                    'Ang Container ay para sa frontend lang, ang VM ay para sa backend',
                    'Mas mabigat ang Container kaysa sa VM'
                  ],
                  correctIndex: 1,
                  explanation: 'Ang containers ay lightweight dahil ginagamit nila ang OS kernel ng host machine, samantalang ang bawat VM ay nangangailangan ng sarili nitong kumpletong OS.'
                },
                {
                  id: 2,
                  question: 'Anong Dockerfile command ang ginagamit para i-set kung anong base image ang gagamitin?',
                  options: [
                    'START',
                    'BASE',
                    'FROM',
                    'IMAGE'
                  ],
                  correctIndex: 2,
                  explanation: 'Ang FROM command ang palaging unang instruction sa isang valid na Dockerfile, na nagtatakda ng base image (e.g., FROM node:18).'
                },
                {
                  id: 3,
                  question: 'Para saan ang WORKDIR command sa Dockerfile?',
                  options: [
                    'Para i-set ang folder o directory kung saan tatakbo ang mga sumusunod na commands sa loob ng container',
                    'Para gumawa ng bagong user na magtatrabaho sa container',
                    'Para i-download ang source code mula sa GitHub',
                    'Para mag-set ng environment variables'
                  ],
                  correctIndex: 0,
                  explanation: 'Ang WORKDIR ay nagse-set ng working directory para sa lahat ng RUN, CMD, ENTRYPOINT, COPY at ADD instructions na susunod dito sa Dockerfile.'
                },
                {
                  id: 4,
                  question: 'Anong file ang ginagamit kapag kailangan mong mag-run ng multiple containers (tulad ng Node app + Postgres DB) nang sabay-sabay?',
                  options: [
                    'Dockerfile.multi',
                    'docker-compose.yml',
                    'containers.json',
                    'docker-run.sh'
                  ],
                  correctIndex: 1,
                  explanation: 'Ang docker-compose.yml ay ginagamit ng Docker Compose tool para i-define at i-run ang multi-container Docker applications.'
                },
                {
                  id: 5,
                  question: 'Anong command ang ginagamit para kopyahin ang mga files mula sa iyong computer papunta sa Docker image?',
                  options: [
                    'MOVE',
                    'TRANSFER',
                    'UPLOAD',
                    'COPY'
                  ],
                  correctIndex: 3,
                  explanation: 'Ang COPY command ay kumukuha ng mga files at folders mula sa host machine (ang computer mo) at idinadagdag ang mga ito sa filesystem ng container.'
                }
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
