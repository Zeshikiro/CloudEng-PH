'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Context-aware knowledge base for each lesson/page
const knowledgeBase: Record<string, { context: string; qa: Array<{ keywords: string[]; answer: string }> }> = {
  'default': {
    context: 'CloudEng PH - Filipino Cloud Engineering Learning Platform',
    qa: [
      { keywords: ['hello', 'hi', 'kumusta', 'hey', 'start'], answer: 'Kumusta! 👋 Ako si CloudBot, ang AI tutor mo para sa cloud engineering! Tanungin mo lang ako about anything cloud-related. Taglish ang sagot ko para mas madali maintindihan!' },
      { keywords: ['cloud', 'ano', 'what is'], answer: 'Cloud computing ay pag-rent ng computing resources (servers, storage, databases) through the internet. Instead na bumili ka ng sarili mong hardware, nag-rerent ka lang sa providers like AWS, Azure, or GCP. Parang Netflix — hindi mo kailangang bumili ng DVD, nag-subscribe ka lang!' },
      { keywords: ['aws', 'amazon'], answer: 'AWS (Amazon Web Services) ang pinakamalaking cloud provider sa mundo with ~33% market share! May 200+ services sila, pero ang pinaka-importante para sa beginners ay: EC2 (compute), S3 (storage), at VPC (networking). Start ka sa free tier — 12 months ng libre!' },
      { keywords: ['free', 'libre', 'cost', 'bayad'], answer: 'Yes! Ang AWS ay may Free Tier na 12 months. Kasama dito: 750 hours ng t2.micro EC2, 5GB ng S3 storage, 25GB ng DynamoDB, at marami pa. Hindi ka macha-charge kung hindi mo lalampasan ang limits!' },
      { keywords: ['career', 'trabaho', 'job', 'salary', 'sweldo'], answer: 'Cloud Engineering is one of the highest-paying tech careers! Sa Pilipinas, ang entry-level Cloud Engineer ay around ₱40k-80k/month. Sa US companies na remote-friendly, it can go up to $80k-$150k/year! Key certifications: AWS Solutions Architect, AWS Cloud Practitioner.' },
    ],
  },
  'lesson-1': {
    context: 'Lesson 1: Ano ba ang Cloud?',
    qa: [
      { keywords: ['analogy', 'parang', 'example'], answer: 'Isipin mo ganito: Dati, para makapanood ng movies, bumibili ka ng DVD player at DVDs. Ngayon, nag-subscribe ka lang sa Netflix. Same concept ang cloud — instead na bumili ka ng servers, nag-rerent ka lang online! 📀➡️☁️' },
      { keywords: ['big 3', 'provider', 'aws', 'azure', 'gcp'], answer: 'Ang Big 3 cloud providers: 1) AWS (Amazon) — pinakamalaki, ~33% market share. 2) Azure (Microsoft) — #2, popular sa enterprises. 3) GCP (Google) — #3, strong sa AI/ML. Lahat sila may free tier para makapag-practice ka!' },
      { keywords: ['data center', 'server', 'physical'], answer: 'Hindi magic ang cloud! May actual na HUGE buildings (data centers) sa buong mundo na puno ng servers. Ang AWS alone ay may 100+ data centers globally. Yung mga building na to ay may sariling power supply, cooling system, at 24/7 security!' },
    ],
  },
  'lesson-2': {
    context: 'Lesson 2: IaaS, PaaS, SaaS',
    qa: [
      { keywords: ['iaas', 'infrastructure'], answer: 'IaaS (Infrastructure as a Service) = nag-rerent ka ng raw computing resources. Ikaw bahala sa lahat — OS, middleware, apps. Example: AWS EC2. Parang nag-rent ka ng bahay — ikaw bahala sa interior! 🏠' },
      { keywords: ['paas', 'platform'], answer: 'PaaS (Platform as a Service) = may platform na, ikaw ang code lang. Hindi mo na kailangang i-manage ang servers. Examples: Heroku, AWS Elastic Beanstalk, Vercel! Parang condo — may furniture na, you just move in! 🏢' },
      { keywords: ['saas', 'software'], answer: 'SaaS (Software as a Service) = ready-to-use software, wala kang ino-manage. Examples: Gmail, Zoom, Canva. Parang hotel — lahat provided na, enjoy ka lang! 🏨' },
      { keywords: ['difference', 'compare', 'pinagkaiba'], answer: 'Simple comparison:\n• IaaS = raw building blocks (EC2) — IKAW bahala sa lahat\n• PaaS = platform ready (Heroku) — IKAW ang code lang\n• SaaS = finished product (Gmail) — GAMIT ka lang\n\nPag pumunta ka sa restaurant:\n• IaaS = grocery store (ikaw magluluto)\n• PaaS = meal kit delivery (ingredients + recipe provided)\n• SaaS = restaurant (order ka lang)' },
    ],
  },
  'lesson-3': {
    context: 'Lesson 3: Compute, Storage, Networking',
    qa: [
      { keywords: ['ec2', 'compute', 'virtual machine', 'vm'], answer: 'EC2 (Elastic Compute Cloud) = virtual machine sa AWS. Parang nag-rent ka ng computer sa cloud! Pwede mong piliin ang OS (Linux/Windows), RAM, CPU, at storage. Ang free tier ay t2.micro — 1 vCPU, 1GB RAM, 750 hours/month for 12 months!' },
      { keywords: ['s3', 'storage', 'bucket', 'file'], answer: 'S3 (Simple Storage Service) = object storage sa AWS. Pwede kang mag-store ng ANY file — images, videos, backups, data. Ang mga \"buckets\" ay parang folders na globally unique ang pangalan. Free tier: 5GB for 12 months!' },
      { keywords: ['vpc', 'network', 'subnet', 'security group'], answer: 'VPC (Virtual Private Cloud) = your own private network sa AWS. Parang gumawa ka ng invisible building:\n• Subnets = rooms (public = may window, private = walang internet)\n• Security Groups = bouncer (controls who gets in)\n• Internet Gateway = main door to the internet\n\nNetworking is intimidating pero super important for security!' },
      { keywords: ['terminate', 'delete', 'charge', 'bill'], answer: '⚠️ ALWAYS terminate/delete resources after practicing! Para hindi ka ma-charge:\n1. Go to EC2 Dashboard\n2. Select your instance\n3. Instance State → Terminate\n4. Confirm!\n\nTip: Set up AWS Billing Alerts para ma-notify ka kung may unexpected charges!' },
    ],
  },
};

function findAnswer(input: string, pageContext: string): string {
  const lowerInput = input.toLowerCase();
  
  // Check page-specific knowledge first
  const pageKB = knowledgeBase[pageContext];
  if (pageKB) {
    for (const item of pageKB.qa) {
      if (item.keywords.some(kw => lowerInput.includes(kw))) {
        return item.answer;
      }
    }
  }
  
  // Then check default knowledge
  const defaultKB = knowledgeBase['default'];
  for (const item of defaultKB.qa) {
    if (item.keywords.some(kw => lowerInput.includes(kw))) {
      return item.answer;
    }
  }
  
  // Fallback
  return 'Great question! 🤔 Hindi ko pa masyadong alam yan, pero nandito ako para tulungan ka sa cloud engineering basics. Try mo itanong about: AWS, EC2, S3, VPC, IaaS/PaaS/SaaS, free tier, o kung paano mag-start ng cloud career! 💪';
}

interface CloudBotProps {
  pageContext?: string;
}

export default function CloudBot({ pageContext = 'default' }: CloudBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages([{
        id: 1,
        role: 'bot',
        content: 'Kumusta! 👋 Ako si CloudBot, ang personal AI tutor mo! Ask me anything about cloud engineering — Taglish ang sagot ko para mas easy maintindihan! ☁️',
        timestamp: new Date(),
      }]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

    const botResponse: Message = {
      id: Date.now() + 1,
      role: 'bot',
      content: findAnswer(input.trim(), pageContext),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen
            ? 'bg-slate-800 rotate-0 shadow-slate-900/50'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-[520px] rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.06] bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-blue-500/25">
                🤖
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">CloudBot AI</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Online — Taglish mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                    : 'bg-white/[0.06] text-slate-200 border border-white/[0.06] rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06]">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about cloud..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold hover:from-blue-400 hover:to-purple-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
