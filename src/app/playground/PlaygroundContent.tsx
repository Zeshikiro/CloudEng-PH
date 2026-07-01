'use client';

import { useState, useCallback, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceDef {
  id: string;
  name: string;
  icon: string;
  category: 'compute' | 'storage' | 'network' | 'database' | 'security';
  color: string;
}

interface PlacedService {
  uid: string;
  serviceId: string;
  x: number;
  y: number;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiredServices: string[];
  hint: string;
  successMessage: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services: ServiceDef[] = [
  { id: 'ec2', name: 'EC2', icon: '🖥️', category: 'compute', color: 'from-blue-500 to-blue-600' },
  { id: 's3', name: 'S3', icon: '📦', category: 'storage', color: 'from-emerald-500 to-emerald-600' },
  { id: 'vpc', name: 'VPC', icon: '🔒', category: 'network', color: 'from-purple-500 to-purple-600' },
  { id: 'rds', name: 'RDS', icon: '🗄️', category: 'database', color: 'from-amber-500 to-amber-600' },
  { id: 'elb', name: 'Load Balancer', icon: '⚖️', category: 'network', color: 'from-cyan-500 to-cyan-600' },
  { id: 'cloudfront', name: 'CloudFront', icon: '🌐', category: 'network', color: 'from-indigo-500 to-indigo-600' },
  { id: 'route53', name: 'Route 53', icon: '🧭', category: 'network', color: 'from-violet-500 to-violet-600' },
  { id: 'iam', name: 'IAM', icon: '👤', category: 'security', color: 'from-red-500 to-red-600' },
  { id: 'lambda', name: 'Lambda', icon: '⚡', category: 'compute', color: 'from-orange-500 to-orange-600' },
  { id: 'dynamodb', name: 'DynamoDB', icon: '📊', category: 'database', color: 'from-pink-500 to-pink-600' },
];

const scenarios: Scenario[] = [
  {
    id: 'basic-web',
    title: '🌐 Basic Website',
    description: 'Build a simple website hosted on the cloud.',
    difficulty: 'Easy',
    requiredServices: ['ec2', 'vpc'],
    hint: 'You need a server (EC2) and a network (VPC) to host a website!',
    successMessage: 'Correct! 🎉 A basic website needs an EC2 (server) and a VPC (network)!',
  },
  {
    id: 'scalable-app',
    title: '📈 Scalable Web App',
    description: 'Build a web app that can handle millions of users.',
    difficulty: 'Medium',
    requiredServices: ['ec2', 'vpc', 'elb', 's3', 'rds'],
    hint: 'Think about: servers, load balancing, storage for static files, and a database!',
    successMessage: 'Nailed it! 🔥 A Load Balancer distributes traffic, S3 serves static files, and RDS stores data!',
  },
  {
    id: 'serverless-api',
    title: '⚡ Serverless API',
    description: 'Build a serverless API that scales automatically.',
    difficulty: 'Hard',
    requiredServices: ['lambda', 'dynamodb', 'route53', 'cloudfront', 'iam'],
    hint: 'No EC2 needed! Think: Lambda for code, DynamoDB for data, CDN for speed, DNS for routing, IAM for security.',
    successMessage: 'You are a Cloud Architect! 🏆 Serverless = Lambda + DynamoDB + CloudFront + Route53 + IAM!',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PlaygroundContent() {
  const [placedServices, setPlacedServices] = useState<PlacedService[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const [draggedService, setDraggedService] = useState<string | null>(null);

  const uidCounterRef = useRef(0);

  const handleDragStart = useCallback((serviceId: string) => {
    setDraggedService(serviceId);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedService) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    uidCounterRef.current += 1;
    setPlacedServices(prev => [
      ...prev,
      { uid: `${draggedService}-${uidCounterRef.current}`, serviceId: draggedService, x, y },
    ]);
    setDraggedService(null);
    setResult(null);
  }, [draggedService]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const removeService = useCallback((uid: string) => {
    setPlacedServices(prev => prev.filter(s => s.uid !== uid));
    setResult(null);
  }, []);

  const resetCanvas = useCallback(() => {
    setPlacedServices([]);
    setResult(null);
    setShowHint(false);
  }, []);

  const checkArchitecture = useCallback(() => {
    const placedIds = new Set(placedServices.map(s => s.serviceId));
    const allRequired = selectedScenario.requiredServices.every(id => placedIds.has(id));
    setResult(allRequired ? 'success' : 'fail');
  }, [placedServices, selectedScenario]);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Interactive
          </div>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-3">
            🧩 Cloud Architecture Playground
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Drag and drop AWS services to build cloud architectures!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar — Services + Scenarios */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            {/* Scenario Picker */}
            <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
              <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Scenario</h2>
              <div className="space-y-2">
                {scenarios.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedScenario(s); resetCanvas(); }}
                    className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
                      selectedScenario.id === s.id
                        ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300'
                        : 'bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs mt-1 opacity-70">{s.difficulty}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Services Palette */}
            <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
              <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">AWS Services</h2>
              <div className="grid grid-cols-2 gap-2">
                {services.map(service => (
                  <div
                    key={service.id}
                    draggable
                    onDragStart={() => handleDragStart(service.id)}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-grab active:cursor-grabbing hover:bg-white/[0.08] hover:border-white/[0.12] transition-all text-center group"
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div className="text-xs text-slate-400 font-medium truncate">{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-3 space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {/* Scenario Info */}
            <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedScenario.title}</h2>
                <p className="text-sm text-slate-400">{selectedScenario.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors"
                >
                  💡 Hint
                </button>
                <button
                  onClick={resetCanvas}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/[0.08] text-slate-400 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={checkArchitecture}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  ✅ Check
                </button>
              </div>
            </div>

            {/* Hint */}
            {showHint && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm animate-fade-in">
                💡 <strong>Hint:</strong> {selectedScenario.hint}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className={`p-4 rounded-xl border text-sm animate-fade-in ${
                result === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/20 text-red-300'
              }`}>
                {result === 'success'
                  ? selectedScenario.successMessage
                  : '❌ Your architecture is not quite right yet. Check if any services are missing! Try clicking the Hint button.'}
              </div>
            )}

            {/* Drop Zone Canvas */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`relative w-full aspect-[16/9] rounded-2xl border-2 border-dashed transition-all ${
                draggedService
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'border-white/10 bg-slate-900/40'
              } backdrop-blur-xl overflow-hidden`}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Empty state */}
              {placedServices.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4 opacity-30">☁️</div>
                    <p className="text-slate-500 text-sm">Drag AWS services here to build your architecture</p>
                  </div>
                </div>
              )}

              {/* Placed Services */}
              {placedServices.map(placed => {
                const service = services.find(s => s.id === placed.serviceId);
                if (!service) return null;
                return (
                  <div
                    key={placed.uid}
                    className="absolute group animate-fade-in"
                    style={{
                      left: `${Math.min(Math.max(placed.x, 5), 90)}%`,
                      top: `${Math.min(Math.max(placed.y, 5), 90)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg cursor-default hover:scale-110 transition-transform min-w-[70px] text-center`}>
                      <button
                        onClick={() => removeService(placed.uid)}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        ✕
                      </button>
                      <div className="text-2xl mb-1">{service.icon}</div>
                      <div className="text-[10px] font-bold text-white/90 leading-tight">{service.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Required services hint */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-500">
              <strong className="text-slate-400">Required services:</strong>{' '}
              {selectedScenario.requiredServices.map(id => {
                const s = services.find(svc => svc.id === id);
                const isPlaced = placedServices.some(p => p.serviceId === id);
                return (
                  <span key={id} className={`inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full border ${
                    isPlaced
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-white/[0.03] border-white/[0.08] text-slate-500'
                  }`}>
                    {s?.icon} {s?.name} {isPlaced && '✓'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
