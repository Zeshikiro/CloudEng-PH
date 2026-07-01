'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
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

interface CodingExercise {
  id: string;
  category: 'Terraform' | 'AWS CLI' | 'CloudFormation' | 'Linux' | 'Networking';
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
  expectedAnswer: string;
  explanation: string;
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

const codingExercises: CodingExercise[] = [
  // Terraform
  {
    id: 'tf-ec2',
    category: 'Terraform',
    title: 'Create an EC2 Instance',
    difficulty: 'Beginner',
    description: 'Fill in the blanks to provision an AWS EC2 instance using Terraform.',
    starterCode: `provider "___" {
  region = "ap-southeast-1"
}

resource "___" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "___"
}`,
    expectedAnswer: `provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_instance" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}`,
    explanation: 'The provider is "aws", the resource type for an EC2 instance is "aws_instance", and the free tier instance type is "t2.micro".',
  },
  {
    id: 'tf-s3',
    category: 'Terraform',
    title: 'Create an S3 Bucket',
    difficulty: 'Beginner',
    description: 'Write the Terraform code to create an S3 bucket named "my-unique-bucket-2026" with a "private" acl.',
    starterCode: `resource "___" "my_bucket" {
  bucket = "my-unique-bucket-2026"
  acl    = "___"
}`,
    expectedAnswer: `resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-2026"
  acl    = "private"
}`,
    explanation: 'The resource type for an S3 bucket is "aws_s3_bucket" and the acl should be "private".',
  },
  {
    id: 'tf-vpc',
    category: 'Terraform',
    title: 'Create a VPC',
    difficulty: 'Intermediate',
    description: 'Create a VPC with a CIDR block of "10.0.0.0/16" and enable DNS support.',
    starterCode: `resource "___" "main" {
  cidr_block           = "___"
  enable_dns_support   = ___
}`,
    expectedAnswer: `resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
}`,
    explanation: 'The resource type is "aws_vpc", the CIDR block is "10.0.0.0/16", and enable_dns_support is a boolean "true".',
  },
  {
    id: 'tf-sg',
    category: 'Terraform',
    title: 'Create a Security Group',
    difficulty: 'Intermediate',
    description: 'Create a Security Group allowing SSH (port 22) and HTTP (port 80).',
    starterCode: `resource "aws_security_group" "web_sg" {
  name        = "web-sg"
  description = "Allow SSH and HTTP"

  ingress {
    from_port   = ___
    to_port     = ___
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = ___
    to_port     = ___
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    expectedAnswer: `resource "aws_security_group" "web_sg" {
  name        = "web-sg"
  description = "Allow SSH and HTTP"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    explanation: 'SSH uses port 22, and HTTP uses port 80. Both from_port and to_port should be set to the target port.',
  },
  {
    id: 'tf-rds',
    category: 'Terraform',
    title: 'Create an RDS Database',
    difficulty: 'Advanced',
    description: 'Create a MySQL database on a db.t3.micro instance with 20GB of storage, and disable Multi-AZ.',
    starterCode: `resource "aws_db_instance" "my_db" {
  engine         = "___"
  instance_class = "___"
  allocated_storage = ___
  multi_az       = ___
  username       = "admin"
  password       = "password123"
}`,
    expectedAnswer: `resource "aws_db_instance" "my_db" {
  engine         = "mysql"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  multi_az       = false
  username       = "admin"
  password       = "password123"
}`,
    explanation: 'The engine is "mysql", the instance_class is "db.t3.micro", allocated_storage is 20, and multi_az is false.',
  },
  {
    id: 'tf-full',
    category: 'Terraform',
    title: 'Full Stack: EC2 + S3',
    difficulty: 'Advanced',
    description: 'Deploy both an EC2 instance and an S3 bucket in one file.',
    starterCode: `resource "___" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "___"
}

resource "___" "storage" {
  bucket = "my-company-assets-2026"
}`,
    expectedAnswer: `resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}

resource "aws_s3_bucket" "storage" {
  bucket = "my-company-assets-2026"
}`,
    explanation: 'Combine the resources: aws_instance for EC2 (using t2.micro) and aws_s3_bucket for S3.',
  },
  // AWS CLI
  {
    id: 'cli-s3-ls',
    category: 'AWS CLI',
    title: 'List All S3 Buckets',
    difficulty: 'Beginner',
    description: 'Use the AWS CLI to list all your S3 buckets.',
    starterCode: `aws ___ ls`,
    expectedAnswer: `aws s3 ls`,
    explanation: 'The "aws s3 ls" command lists all your buckets.',
  },
  {
    id: 'cli-s3-mb',
    category: 'AWS CLI',
    title: 'Create an S3 Bucket',
    difficulty: 'Beginner',
    description: 'Use the AWS CLI to make a new bucket (mb = make bucket).',
    starterCode: `aws s3 ___ s3://my-bucket-name`,
    expectedAnswer: `aws s3 mb s3://my-bucket-name`,
    explanation: 'The "mb" command creates a new S3 bucket.',
  },
  {
    id: 'cli-s3-cp',
    category: 'AWS CLI',
    title: 'Upload a File to S3',
    difficulty: 'Beginner',
    description: 'Use the AWS CLI to copy (upload) index.html to your bucket.',
    starterCode: `aws s3 ___ index.html s3://my-bucket/`,
    expectedAnswer: `aws s3 cp index.html s3://my-bucket/`,
    explanation: 'The "cp" command copies files to/from S3.',
  },
  {
    id: 'cli-ec2-run',
    category: 'AWS CLI',
    title: 'Launch an EC2 Instance',
    difficulty: 'Intermediate',
    description: 'Launch a t2.micro instance using the AWS CLI.',
    starterCode: `aws ec2 ___ --image-id ami-0c55b159 --instance-type ___ --key-name mykey`,
    expectedAnswer: `aws ec2 run-instances --image-id ami-0c55b159 --instance-type t2.micro --key-name mykey`,
    explanation: 'The "run-instances" command launches an EC2 instance. The free tier type is "t2.micro".',
  },
  {
    id: 'cli-ec2-desc',
    category: 'AWS CLI',
    title: 'Describe Running Instances',
    difficulty: 'Intermediate',
    description: 'Describe all currently running EC2 instances.',
    starterCode: `aws ec2 ___ --filters "Name=instance-state-name,Values=___"`,
    expectedAnswer: `aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"`,
    explanation: 'The "describe-instances" command lists instances, and the filter value for running instances is "running".',
  },
  // CloudFormation
  {
    id: 'cf-ec2',
    category: 'CloudFormation',
    title: 'Basic EC2 Template',
    difficulty: 'Intermediate',
    description: 'Fill in the YAML blanks for a CloudFormation EC2 instance.',
    starterCode: `Resources:
  MyEC2Instance:
    Type: "AWS::___::Instance"
    Properties:
      InstanceType: "___"
      ImageId: "ami-0c55b159cbfafe1f0"`,
    expectedAnswer: `Resources:
  MyEC2Instance:
    Type: "AWS::EC2::Instance"
    Properties:
      InstanceType: "t2.micro"
      ImageId: "ami-0c55b159cbfafe1f0"`,
    explanation: 'The Type is AWS::EC2::Instance, and the InstanceType is t2.micro.',
  },
  {
    id: 'cf-s3',
    category: 'CloudFormation',
    title: 'S3 Bucket Template',
    difficulty: 'Intermediate',
    description: 'Create an S3 bucket using CloudFormation.',
    starterCode: `Resources:
  MyS3Bucket:
    Type: "AWS::___::Bucket"
    Properties:
      BucketName: "my-cf-bucket-2026"`,
    expectedAnswer: `Resources:
  MyS3Bucket:
    Type: "AWS::S3::Bucket"
    Properties:
      BucketName: "my-cf-bucket-2026"`,
    explanation: 'The Type is AWS::S3::Bucket.',
  },
  {
    id: 'cf-vpc',
    category: 'CloudFormation',
    title: 'VPC Template',
    difficulty: 'Advanced',
    description: 'Create a VPC with CidrBlock 10.0.0.0/16 using CloudFormation.',
    starterCode: `Resources:
  MyVPC:
    Type: "AWS::EC2::___"
    Properties:
      ___: "10.0.0.0/16"`,
    expectedAnswer: `Resources:
  MyVPC:
    Type: "AWS::EC2::VPC"
    Properties:
      CidrBlock: "10.0.0.0/16"`,
    explanation: 'The Type is AWS::EC2::VPC, and the property name is CidrBlock.',
  },
  // Linux
  {
    id: 'lnx-df',
    category: 'Linux',
    title: 'Check Disk Space',
    difficulty: 'Beginner',
    description: 'Check available disk space in human-readable format.',
    starterCode: `___ -h`,
    expectedAnswer: `df -h`,
    explanation: 'The "df" (disk free) command with "-h" shows space in MB/GB.',
  },
  {
    id: 'lnx-ps',
    category: 'Linux',
    title: 'Find a Process',
    difficulty: 'Beginner',
    description: 'List all running processes and filter for "nginx".',
    starterCode: `ps ___ | ___ nginx`,
    expectedAnswer: `ps aux | grep nginx`,
    explanation: '"ps aux" lists all processes, and "grep" filters the output.',
  },
  {
    id: 'lnx-chmod',
    category: 'Linux',
    title: 'Change File Permissions',
    difficulty: 'Intermediate',
    description: 'Make a script executable by giving it 755 permissions.',
    starterCode: `___ 755 script.sh`,
    expectedAnswer: `chmod 755 script.sh`,
    explanation: 'The "chmod" command changes file permissions.',
  },
  {
    id: 'lnx-apache',
    category: 'Linux',
    title: 'Install and Start Apache',
    difficulty: 'Intermediate',
    description: 'Install httpd using yum, then start the service.',
    starterCode: `sudo ___ install httpd -y && sudo ___ start httpd`,
    expectedAnswer: `sudo yum install httpd -y && sudo systemctl start httpd`,
    explanation: 'Use "yum" to install packages on Amazon Linux, and "systemctl" to manage services.',
  },
  // Networking
  {
    id: 'net-ssh',
    category: 'Networking',
    title: 'SSH Into a Server',
    difficulty: 'Beginner',
    description: 'SSH into an EC2 instance using a key pair named mykey.pem.',
    starterCode: `___ -i mykey.pem ec2-user@54.123.45.67`,
    expectedAnswer: `ssh -i mykey.pem ec2-user@54.123.45.67`,
    explanation: 'The "ssh" command is used to connect to remote servers.',
  },
  {
    id: 'net-ports',
    category: 'Networking',
    title: 'Check Open Ports',
    difficulty: 'Intermediate',
    description: 'Check listening TCP ports using netstat.',
    starterCode: `sudo ___ -tlnp`,
    expectedAnswer: `sudo netstat -tlnp`,
    explanation: 'The "netstat" command shows network connections and listening ports.',
  },
  {
    id: 'net-iam',
    category: 'Networking',
    title: 'Create an IAM User',
    difficulty: 'Advanced',
    description: 'Create an IAM user named "john" using the AWS CLI.',
    starterCode: `aws ___ create-user --___ john`,
    expectedAnswer: `aws iam create-user --user-name john`,
    explanation: 'The service is "iam", and the flag for the username is "--user-name".',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PlaygroundContent() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'coding'>('coding');

  // Architecture State
  const [placedServices, setPlacedServices] = useState<PlacedService[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const [draggedService, setDraggedService] = useState<string | null>(null);
  const uidCounterRef = useRef(0);

  // Coding State
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [userCode, setUserCode] = useState('');
  const [codeResult, setCodeResult] = useState<'success' | 'fail' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cloudeng-exercises-completed');
    if (saved) {
      try {
        setCompletedExercises(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveCompleted = useCallback((id: string) => {
    setCompletedExercises(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('cloudeng-exercises-completed', JSON.stringify(next));
      return next;
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Architecture Handlers                                             */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  Coding Handlers                                                   */
  /* ------------------------------------------------------------------ */
  const categories = ['All', 'Terraform', 'AWS CLI', 'CloudFormation', 'Linux', 'Networking'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredExercises = useMemo(() => {
    return codingExercises.filter(ex => {
      if (activeCategory !== 'All' && ex.category !== activeCategory) return false;
      if (activeDifficulty !== 'All' && ex.difficulty !== activeDifficulty) return false;
      return true;
    });
  }, [activeCategory, activeDifficulty]);

  const selectedExercise = useMemo(() => {
    return codingExercises.find(ex => ex.id === selectedExerciseId) || null;
  }, [selectedExerciseId]);

  const handleExerciseClick = useCallback((ex: CodingExercise) => {
    setSelectedExerciseId(ex.id);
    setUserCode(ex.starterCode);
    setCodeResult(null);
    setShowExplanation(false);
  }, []);

  const normalizeCode = (code: string) => {
    return code.toLowerCase().replace(/\s+/g, ' ').trim();
  };

  const checkCode = useCallback(() => {
    if (!selectedExercise) return;
    const isCorrect = normalizeCode(userCode) === normalizeCode(selectedExercise.expectedAnswer);
    if (isCorrect) {
      setCodeResult('success');
      setShowExplanation(true);
      saveCompleted(selectedExercise.id);
    } else {
      setCodeResult('fail');
    }
  }, [userCode, selectedExercise, saveCompleted]);

  const showSolution = useCallback(() => {
    if (!selectedExercise) return;
    setUserCode(selectedExercise.expectedAnswer);
    setCodeResult(null);
    setShowExplanation(true);
  }, [selectedExercise]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Practice &amp; Mastery
          </div>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-3">
            Cloud Engineering Playground
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Hone your skills with interactive coding exercises and architecture building.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex p-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl">
              <button
                onClick={() => setActiveTab('coding')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'coding'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                💻 Coding Exercises
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                🧩 Architecture Builder
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ARCHITECTURE BUILDER TAB                                           */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'architecture' && (
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
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CODING EXERCISES TAB                                               */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'coding' && (
          <div className="space-y-6 animate-fade-in">
            {!selectedExercise ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === cat
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Difficulty:</span>
                    <select
                      value={activeDifficulty}
                      onChange={(e) => setActiveDifficulty(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    >
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Total Progress</span>
                    <span className="text-blue-400 font-bold">{completedExercises.length} / {codingExercises.length} Completed</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                      style={{ width: `${(completedExercises.length / codingExercises.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map(ex => {
                    const isCompleted = completedExercises.includes(ex.id);
                    return (
                      <div
                        key={ex.id}
                        onClick={() => handleExerciseClick(ex)}
                        className={`relative p-6 rounded-2xl bg-slate-900/40 border transition-all duration-300 cursor-pointer group ${
                          isCompleted 
                            ? 'border-emerald-500/30 hover:border-emerald-500/50' 
                            : 'border-white/[0.08] hover:border-blue-500/50 hover:bg-slate-900/60 hover:-translate-y-1'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                            ex.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                            ex.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-rose-500/20 text-rose-400'
                          }`}>
                            {ex.difficulty}
                          </span>
                          {isCompleted && (
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">
                              ✓
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{ex.title}</h3>
                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{ex.description}</p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 group-hover:text-blue-400 transition-colors">
                          <span className="px-2 py-1 bg-white/5 rounded-md">{ex.category}</span>
                          <span className="ml-auto flex items-center">Start →</span>
                        </div>
                      </div>
                    );
                  })}
                  {filteredExercises.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      No exercises found for these filters.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                <button
                  onClick={() => setSelectedExerciseId(null)}
                  className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-2"
                >
                  ← Back to Exercises
                </button>

                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-500/20">
                      {selectedExercise.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                      selectedExercise.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                      selectedExercise.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/20 text-rose-400 border-rose-500/20'
                    }`}>
                      {selectedExercise.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{selectedExercise.title}</h2>
                  <p className="text-slate-300 mb-8">{selectedExercise.description}</p>

                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-inner mb-6 group">
                    <div className="absolute top-0 w-full flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-slate-700/50">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                      <span className="ml-2 text-xs text-slate-500 font-mono">terminal</span>
                    </div>
                    
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-48 sm:h-64 pt-12 p-4 bg-transparent text-[#58a6ff] font-mono text-sm sm:text-base resize-y focus:outline-none focus:bg-[#0d1117]/80 transition-colors"
                      spellCheck="false"
                      placeholder="Type your code here..."
                    />
                  </div>

                  {codeResult && (
                    <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${
                      codeResult === 'success' 
                        ? 'bg-emerald-500/10 border border-emerald-500/30' 
                        : 'bg-rose-500/10 border border-rose-500/30'
                    }`}>
                      <span className="text-2xl mt-0.5">{codeResult === 'success' ? '✅' : '❌'}</span>
                      <div>
                        <h4 className={`font-bold ${codeResult === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {codeResult === 'success' ? 'Correct!' : 'Not quite right.'}
                        </h4>
                        <p className={`text-sm mt-1 ${codeResult === 'success' ? 'text-emerald-200' : 'text-rose-200'}`}>
                          {codeResult === 'success' ? 'Great job! You wrote the correct code.' : 'Check for typos or missing parameters. Remember to replace the blanks (___).'}
                        </p>
                      </div>
                    </div>
                  )}

                  {showExplanation && (
                    <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                      <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                        <span>💡</span> Explanation
                      </h4>
                      <p className="text-sm text-blue-200">{selectedExercise.explanation}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={checkCode}
                      className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/25"
                    >
                      Check Answer
                    </button>
                    {!showExplanation && (
                      <button
                        onClick={showSolution}
                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
                      >
                        Show Solution
                      </button>
                    )}
                    {codeResult === 'success' && (
                      <button
                        onClick={() => setSelectedExerciseId(null)}
                        className="px-6 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold transition-all ml-auto"
                      >
                        Next Exercise →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
