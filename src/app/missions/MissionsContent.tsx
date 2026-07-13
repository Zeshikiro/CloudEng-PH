'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

type MissionMode = 'hub' | 'jira' | 'warroom' | 'architecture' | 'cost';
type TicketStatus = 'todo' | 'inprogress' | 'done';
type WarRoomStep = 'intro' | 'investigate' | 'result';

interface JiraTicket {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee: string;
  description: string;
  context: string;
  starterCode: string;
  expectedAnswer: string;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface WarRoomScenario {
  id: string;
  title: string;
  severity: 'SEV-1' | 'SEV-2' | 'SEV-3';
  alertMessage: string;
  description: string;
  steps: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  correctPath: string[];
  rootCause: string;
  resolution: string;
}

interface CostItem {
  id: string;
  service: string;
  icon: string;
  description: string;
  monthlyCost: number;
  isWaste: boolean;
  explanation: string;
}

interface CostScenario {
  id: string;
  title: string;
  company: string;
  totalBill: number;
  targetSavings: number;
  items: CostItem[];
}

/* ================================================================== */
/*  Data — Jira Tickets                                                */
/* ================================================================== */

const jiraTickets: JiraTicket[] = [
  {
    id: 'CLOUD-101',
    title: 'Deploy a Static Website to S3',
    priority: 'Medium',
    assignee: 'Team Lead',
    difficulty: 'Beginner',
    description: 'The marketing team needs their new landing page hosted on AWS. Create an S3 bucket configured for static website hosting.',
    context: 'From: Sarah (Marketing Lead)\n"Hey! We just finished our new product landing page. Can you deploy it to the cloud? We need it live by end of day. Just set up the hosting bucket for now — we will upload the files after."',
    starterCode: `resource "___" "website" {
  bucket = "marketing-landing-page-2026"
  acl    = "___"
}`,
    expectedAnswer: `resource "aws_s3_bucket" "website" {
  bucket = "marketing-landing-page-2026"
  acl    = "public-read"
}`,
    explanation: 'For static website hosting, you need an "aws_s3_bucket" resource with "public-read" ACL so visitors can access the files.',
  },
  {
    id: 'CLOUD-102',
    title: 'Fix SSH Access to Staging Server',
    priority: 'High',
    assignee: 'Security Team',
    difficulty: 'Beginner',
    description: 'Developers cannot SSH into the staging server. Create a Security Group that allows SSH access on port 22.',
    context: 'From: DevOps Slack Channel\n"🚨 @cloud-team Nobody can SSH into staging! Deployment is blocked. Can someone check the Security Group? We need port 22 open ASAP."',
    starterCode: `resource "aws_security_group" "staging_ssh" {
  name        = "staging-ssh-access"
  description = "Allow SSH to staging"

  ingress {
    from_port   = ___
    to_port     = ___
    protocol    = "___"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    expectedAnswer: `resource "aws_security_group" "staging_ssh" {
  name        = "staging-ssh-access"
  description = "Allow SSH to staging"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    explanation: 'SSH uses TCP port 22. Both from_port and to_port should be 22, and the protocol is "tcp".',
  },
  {
    id: 'CLOUD-103',
    title: 'Provision Production Database',
    priority: 'High',
    assignee: 'CTO',
    difficulty: 'Intermediate',
    description: 'Migrate from a self-hosted MySQL to AWS RDS. Create a managed MySQL database instance.',
    context: 'From: James (CTO)\n"We keep having database crashes on our self-hosted MySQL. I want us to move to a managed service. Provision an RDS MySQL instance — use db.t3.micro for now since it is just a pilot. 20GB storage should be fine."',
    starterCode: `resource "___" "production_db" {
  engine            = "___"
  instance_class    = "___"
  allocated_storage = ___
  username          = "admin"
  password          = "securepass123"
}`,
    expectedAnswer: `resource "aws_db_instance" "production_db" {
  engine            = "mysql"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  username          = "admin"
  password          = "securepass123"
}`,
    explanation: 'The resource type is "aws_db_instance", engine is "mysql", instance_class is "db.t3.micro", and allocated_storage is 20 (GB).',
  },
  {
    id: 'CLOUD-104',
    title: 'Set Up Load Balancer for Black Friday',
    priority: 'Critical',
    assignee: 'VP Engineering',
    difficulty: 'Intermediate',
    description: 'Black Friday is next week! Create an Application Load Balancer to distribute traffic across our web servers.',
    context: 'From: Maria (VP Engineering)\n"URGENT: Last Black Friday our site went down for 3 hours and we lost $200K in revenue. We CANNOT let this happen again. Set up an ALB immediately. Use our existing VPC subnets."',
    starterCode: `resource "___" "web_alb" {
  name               = "black-friday-alb"
  internal           = ___
  load_balancer_type = "___"
  subnets            = ["subnet-abc123", "subnet-def456"]
}`,
    expectedAnswer: `resource "aws_lb" "web_alb" {
  name               = "black-friday-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = ["subnet-abc123", "subnet-def456"]
}`,
    explanation: 'The resource type is "aws_lb", internal is "false" (public-facing), and load_balancer_type is "application" for an ALB.',
  },
  {
    id: 'CLOUD-105',
    title: 'Lock Down Public S3 Bucket',
    priority: 'Critical',
    assignee: 'Compliance Team',
    difficulty: 'Advanced',
    description: 'The compliance audit found that a customer data bucket is publicly accessible. Apply a bucket policy to block all public access immediately.',
    context: 'From: Legal Department\n"⚠️ COMPLIANCE VIOLATION: Bucket "customer-data-prod" is publicly accessible. This is a GDPR violation. Block ALL public access NOW or we face a $500K fine. This is not a drill."',
    starterCode: `resource "aws_s3_bucket_public_access_block" "lockdown" {
  bucket = "customer-data-prod"

  block_public_acls       = ___
  block_public_policy     = ___
  ignore_public_acls      = ___
  restrict_public_buckets = ___
}`,
    expectedAnswer: `resource "aws_s3_bucket_public_access_block" "lockdown" {
  bucket = "customer-data-prod"

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
    explanation: 'To completely block public access, ALL four settings must be set to "true". This is a critical security best practice.',
  },
  {
    id: 'CLOUD-106',
    title: 'Create Isolated Network for Microservice',
    priority: 'Medium',
    assignee: 'Architecture Team',
    difficulty: 'Advanced',
    description: 'The new payments microservice needs its own isolated VPC. Create a VPC with a CIDR block of 10.1.0.0/16 and enable DNS.',
    context: 'From: Alex (Solutions Architect)\n"The payments service handles sensitive financial data. It needs to be in its own VPC, completely isolated from the main application network. Use 10.1.0.0/16 as the CIDR. Make sure DNS resolution works."',
    starterCode: `resource "___" "payments_vpc" {
  cidr_block           = "___"
  enable_dns_support   = ___
  enable_dns_hostnames = ___

  tags = {
    Name = "payments-microservice-vpc"
  }
}`,
    expectedAnswer: `resource "aws_vpc" "payments_vpc" {
  cidr_block           = "10.1.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "payments-microservice-vpc"
  }
}`,
    explanation: 'The resource type is "aws_vpc", CIDR is "10.1.0.0/16", and both DNS settings should be "true" for name resolution.',
  },
  {
    id: 'MISSION-1',
    title: 'The Broken Pipeline',
    priority: 'Critical',
    assignee: 'DevOps Team',
    difficulty: 'Intermediate',
    description: 'The CI/CD pipeline is broken. Fix the syntax and logic errors in the GitHub Actions YAML file so the build can pass.',
    context: 'From: Release Manager\n"Hey, our pipeline is failing on the Build stage. I think someone messed up the YAML indentation and the action names. Can you fix it ASAP?"',
    starterCode: `name: CI Pipeline
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run Tests
      run: npm test
    - name: Build
    run: npm run build`,
    expectedAnswer: `name: CI Pipeline
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run Tests
      run: npm test
    - name: Build
      run: npm run build`,
    explanation: 'YAML is very strict about indentation. The "run: npm run build" line must be indented exactly below "name: Build".',
  },
  {
    id: 'MISSION-2',
    title: 'The Leaky Bucket',
    priority: 'Critical',
    assignee: 'Security Team',
    difficulty: 'Advanced',
    description: 'Write the correct AWS CLI command to block all public access to the "customer-data" S3 bucket.',
    context: 'From: Security Officer\n"URGENT: Our customer-data bucket is public! Write the exact AWS CLI command to block all public access. Use the put-public-access-block command."',
    starterCode: `aws s3api ___ \\
    --bucket customer-data \\
    --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=___,RestrictPublicBuckets=___`,
    expectedAnswer: `aws s3api put-public-access-block \\
    --bucket customer-data \\
    --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`,
    explanation: 'The command is "put-public-access-block", and all four security flags must be set to "true" to completely lock down the bucket.',
  }
];

/* ================================================================== */
/*  Data — War Room Scenarios                                          */
/* ================================================================== */

const warRoomScenarios: WarRoomScenario[] = [
  {
    id: 'incident-1',
    title: '502 Bad Gateway on Production',
    severity: 'SEV-1',
    alertMessage: 'ALERT: Multiple users reporting 502 Bad Gateway errors on https://app.example.com. Revenue impact: ~$5,000/hour.',
    description: 'The on-call engineer (you) just got paged at 2:47 AM. The production website is returning 502 errors. Thousands of users are affected. You need to find the root cause FAST.',
    steps: [
      { id: 'check-alb', label: 'Check the Load Balancer health checks', isCorrect: true, feedback: '✅ Good call! The ALB health checks show 0 healthy targets. All EC2 instances are failing health checks.' },
      { id: 'check-dns', label: 'Check Route 53 DNS records', isCorrect: false, feedback: '❌ DNS is resolving correctly to the ALB. The issue is downstream.' },
      { id: 'check-ec2', label: 'Check EC2 instance status', isCorrect: true, feedback: '✅ Found it! All 3 EC2 instances show status: "running" but the application process (nginx) has crashed on all of them.' },
      { id: 'check-s3', label: 'Check S3 bucket permissions', isCorrect: false, feedback: '❌ S3 is not involved in serving the application. Focus on the compute layer.' },
      { id: 'restart-nginx', label: 'SSH in and restart nginx on all instances', isCorrect: true, feedback: '✅ Nginx restarted successfully! Health checks are now passing. The site is back online!' },
      { id: 'check-rds', label: 'Check the RDS database CPU', isCorrect: false, feedback: '❌ The database is healthy at 12% CPU. The issue is with the web servers, not the database.' },
    ],
    correctPath: ['check-alb', 'check-ec2', 'restart-nginx'],
    rootCause: 'A bad deployment at 2:30 AM caused nginx to crash on all instances. The deployment script had a syntax error in the nginx config file.',
    resolution: 'Restarted nginx on all instances, then rolled back the bad deployment. Added a config validation step to the CI/CD pipeline to prevent this in the future.',
  },
  {
    id: 'incident-2',
    title: 'Database Connection Timeout',
    severity: 'SEV-2',
    alertMessage: 'ALERT: Application throwing "Connection timed out" errors when connecting to the database. API response times over 30 seconds.',
    description: 'Users are reporting extreme slowness. The application logs show database connection timeouts. You need to investigate the database layer.',
    steps: [
      { id: 'check-rds-cpu', label: 'Check RDS CPU utilization', isCorrect: true, feedback: '✅ CPU is at 98%! Something is hammering the database.' },
      { id: 'check-sg', label: 'Check Security Group rules', isCorrect: false, feedback: '❌ Security Groups are configured correctly. Port 3306 is open between the app and DB.' },
      { id: 'check-slow-queries', label: 'Check slow query log', isCorrect: true, feedback: '✅ Found a query scanning 10 million rows without an index! SELECT * FROM orders WHERE status = "pending" — no index on the status column.' },
      { id: 'check-storage', label: 'Check RDS storage space', isCorrect: false, feedback: '❌ Storage is at 45% — plenty of room. The issue is CPU, not storage.' },
      { id: 'add-index', label: 'Add an index on the problematic column', isCorrect: true, feedback: '✅ Index created! CPU dropped from 98% to 8%. Response times are back to normal.' },
      { id: 'reboot-rds', label: 'Reboot the RDS instance', isCorrect: false, feedback: '⚠️ This would cause downtime and only temporarily fix the symptom, not the root cause.' },
    ],
    correctPath: ['check-rds-cpu', 'check-slow-queries', 'add-index'],
    rootCause: 'A developer deployed a new feature that queries the "orders" table by status without an index. With 10M rows, each query caused a full table scan.',
    resolution: 'Added an index on orders.status column. Query time dropped from 30s to 5ms. Added a database review step to the PR process.',
  },
  {
    id: 'incident-3',
    title: 'S3 Bucket Data Leak',
    severity: 'SEV-1',
    alertMessage: 'ALERT: Security scanner detected that bucket "customer-uploads-prod" is publicly accessible. Potential data exposure of 50,000 customer files.',
    description: 'A security researcher just reported that customer files are accessible without authentication. This is a critical security incident. You need to contain it immediately.',
    steps: [
      { id: 'check-bucket-policy', label: 'Check the S3 bucket policy', isCorrect: true, feedback: '✅ Found it! The bucket policy has "Principal": "*" which grants access to everyone on the internet.' },
      { id: 'check-cloudfront', label: 'Check CloudFront distribution', isCorrect: false, feedback: '❌ CloudFront is not configured for this bucket. The bucket is being accessed directly.' },
      { id: 'block-public', label: 'Enable S3 Block Public Access', isCorrect: true, feedback: '✅ Public access blocked! All four Block Public Access settings are now enabled.' },
      { id: 'check-iam', label: 'Check IAM user permissions', isCorrect: false, feedback: '❌ IAM users are not the issue here — the bucket itself has a public policy.' },
      { id: 'audit-logs', label: 'Check CloudTrail for who made the bucket public', isCorrect: true, feedback: '✅ CloudTrail shows the bucket policy was changed 3 days ago by "deploy-bot". The IaC template had a misconfiguration.' },
      { id: 'rotate-keys', label: 'Rotate all IAM access keys', isCorrect: false, feedback: '⚠️ Key rotation is good practice but not relevant here. The exposure was through the bucket policy, not compromised credentials.' },
    ],
    correctPath: ['check-bucket-policy', 'block-public', 'audit-logs'],
    rootCause: 'A Terraform change 3 days ago accidentally set the bucket policy to allow public access. The change was not caught in code review.',
    resolution: 'Blocked public access immediately. Fixed the Terraform template. Added an AWS Config rule to alert on any public S3 buckets. Notified affected customers per GDPR requirements.',
  },
];

/* ================================================================== */
/*  Data — Cost Optimization Scenarios                                 */
/* ================================================================== */

const costScenarios: CostScenario[] = [
  {
    id: 'cost-1',
    title: 'The Bloated Startup',
    company: 'TechBro Inc.',
    totalBill: 8750,
    targetSavings: 5200,
    items: [
      { id: 'c1', service: 'EC2', icon: '🖥️', description: '5x m5.2xlarge instances running 24/7 for a blog with 100 visitors/day', monthlyCost: 3500, isWaste: true, explanation: 'A blog with 100 visitors needs 1x t3.micro at most. This is massive over-provisioning. Savings: ~$3,400/month.' },
      { id: 'c2', service: 'RDS', icon: '🗄️', description: 'Multi-AZ db.r5.large PostgreSQL for dev environment', monthlyCost: 1400, isWaste: true, explanation: 'Dev environments do not need Multi-AZ or large instances. Use db.t3.micro single-AZ. Savings: ~$1,350/month.' },
      { id: 'c3', service: 'S3', icon: '📦', description: '500GB of production assets in S3 Standard', monthlyCost: 12, isWaste: false, explanation: 'This is a reasonable cost for production assets that are frequently accessed.' },
      { id: 'c4', service: 'CloudFront', icon: '🌐', description: 'CDN distribution for the production website', monthlyCost: 85, isWaste: false, explanation: 'CloudFront is good practice for performance and is reasonably priced.' },
      { id: 'c5', service: 'NAT Gateway', icon: '🔒', description: '3 NAT Gateways running in dev account (no traffic)', monthlyCost: 300, isWaste: true, explanation: 'NAT Gateways cost ~$100/month each even with zero traffic. Dev does not need 3. Savings: ~$300/month.' },
      { id: 'c6', service: 'EBS', icon: '💾', description: '20 unattached EBS volumes (from terminated instances)', monthlyCost: 200, isWaste: true, explanation: 'These orphaned volumes are not attached to any instance. Delete them. Savings: ~$200/month.' },
      { id: 'c7', service: 'Lambda', icon: '⚡', description: 'Serverless functions processing webhook events', monthlyCost: 3, isWaste: false, explanation: 'Lambda is very cost-effective for event-driven workloads. $3/month is great.' },
      { id: 'c8', service: 'Elastic IP', icon: '📍', description: '8 unassociated Elastic IPs', monthlyCost: 30, isWaste: true, explanation: 'AWS charges for Elastic IPs that are not attached to running instances. Release them. Savings: ~$30/month.' },
      { id: 'c9', service: 'Route 53', icon: '🧭', description: 'DNS hosting for 5 domains', monthlyCost: 3, isWaste: false, explanation: 'Route 53 is very affordable for DNS hosting. This is fine.' },
      { id: 'c10', service: 'EC2', icon: '🖥️', description: '2x c5.4xlarge instances running idle in staging', monthlyCost: 3200, isWaste: true, explanation: 'Staging instances should be stopped when not in use, or use smaller instance types. Savings: ~$3,100/month.' },
    ],
  },
];

/* ================================================================== */
/*  Helper: Normalize code for comparison                              */
/* ================================================================== */

const normalizeCode = (code: string) => code.toLowerCase().replace(/\s+/g, ' ').trim();

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function MissionsContent() {
  const [mode, setMode] = useState<MissionMode>('hub');
  const [mounted, setMounted] = useState(false);

  /* Jira state */
  const [ticketStatuses, setTicketStatuses] = useState<Record<string, TicketStatus>>({});
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [ticketCode, setTicketCode] = useState('');
  const [ticketResult, setTicketResult] = useState<'success' | 'fail' | null>(null);
  const [ticketExplanation, setTicketExplanation] = useState(false);

  /* War Room state */
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [warStep, setWarStep] = useState<WarRoomStep>('intro');
  const [chosenSteps, setChosenSteps] = useState<string[]>([]);
  const [stepFeedback, setStepFeedback] = useState<string | null>(null);

  /* Cost state */
  const [activeCostId, setActiveCostId] = useState<string | null>(null);
  const [flaggedItems, setFlaggedItems] = useState<Set<string>>(new Set());
  const [costResult, setCostResult] = useState<'success' | 'fail' | null>(null);
  const [revealedItems, setRevealedItems] = useState<Set<string>>(new Set());

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cloudeng-ticket-statuses');
    if (saved) {
      try { setTicketStatuses(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const saveTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTicketStatuses(prev => {
      const next = { ...prev, [id]: status };
      localStorage.setItem('cloudeng-ticket-statuses', JSON.stringify(next));
      return next;
    });
  }, []);

  /* Jira handlers */
  const openTicket = useCallback((ticket: JiraTicket) => {
    setActiveTicketId(ticket.id);
    setTicketCode(ticket.starterCode);
    setTicketResult(null);
    setTicketExplanation(false);
    if (!ticketStatuses[ticket.id] || ticketStatuses[ticket.id] === 'todo') {
      saveTicketStatus(ticket.id, 'inprogress');
    }
  }, [ticketStatuses, saveTicketStatus]);

  const checkTicket = useCallback(() => {
    const ticket = jiraTickets.find(t => t.id === activeTicketId);
    if (!ticket) return;
    const isCorrect = normalizeCode(ticketCode) === normalizeCode(ticket.expectedAnswer);
    if (isCorrect) {
      setTicketResult('success');
      setTicketExplanation(true);
      saveTicketStatus(ticket.id, 'done');
    } else {
      setTicketResult('fail');
    }
  }, [activeTicketId, ticketCode, saveTicketStatus]);

  const showTicketSolution = useCallback(() => {
    const ticket = jiraTickets.find(t => t.id === activeTicketId);
    if (!ticket) return;
    setTicketCode(ticket.expectedAnswer);
    setTicketExplanation(true);
    setTicketResult(null);
  }, [activeTicketId]);

  /* War Room handlers */
  const activeScenario = useMemo(() => warRoomScenarios.find(s => s.id === activeScenarioId) || null, [activeScenarioId]);

  const startWarRoom = useCallback((id: string) => {
    setActiveScenarioId(id);
    setWarStep('intro');
    setChosenSteps([]);
    setStepFeedback(null);
  }, []);

  const handleWarChoice = useCallback((stepId: string) => {
    if (!activeScenario) return;
    const step = activeScenario.steps.find(s => s.id === stepId);
    if (!step || chosenSteps.includes(stepId)) return;
    setChosenSteps(prev => [...prev, stepId]);
    setStepFeedback(step.feedback);
    const newChosen = [...chosenSteps, stepId];
    const correctOnes = newChosen.filter(id => activeScenario.steps.find(s => s.id === id)?.isCorrect);
    if (correctOnes.length >= activeScenario.correctPath.length) {
      setTimeout(() => setWarStep('result'), 1500);
    }
  }, [activeScenario, chosenSteps]);

  /* Cost handlers */
  const activeCostScenario = useMemo(() => costScenarios.find(s => s.id === activeCostId) || null, [activeCostId]);

  const toggleFlagItem = useCallback((itemId: string) => {
    setFlaggedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
    setCostResult(null);
  }, []);

  const checkCostAnswer = useCallback(() => {
    if (!activeCostScenario) return;
    const wasteIds = new Set(activeCostScenario.items.filter(i => i.isWaste).map(i => i.id));
    const correct = wasteIds.size === flaggedItems.size && [...wasteIds].every(id => flaggedItems.has(id));
    setCostResult(correct ? 'success' : 'fail');
    if (!correct) {
      // Reveal which ones are wrong
      const allItemIds = new Set(activeCostScenario.items.map(i => i.id));
      setRevealedItems(allItemIds);
    } else {
      setRevealedItems(new Set(activeCostScenario.items.map(i => i.id)));
    }
  }, [activeCostScenario, flaggedItems]);

  const activeTicket = useMemo(() => jiraTickets.find(t => t.id === activeTicketId) || null, [activeTicketId]);

  const ticketsByStatus = useMemo(() => {
    const todo = jiraTickets.filter(t => !ticketStatuses[t.id] || ticketStatuses[t.id] === 'todo');
    const inprogress = jiraTickets.filter(t => ticketStatuses[t.id] === 'inprogress');
    const done = jiraTickets.filter(t => ticketStatuses[t.id] === 'done');
    return { todo, inprogress, done };
  }, [ticketStatuses]);

  const priorityColor = (p: string) => {
    if (p === 'Critical') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (p === 'High') return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (p === 'Medium') return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  if (!mounted) return null;

  /* ================================================================ */
  /*  RENDER: Hub                                                      */
  /* ================================================================ */
  if (mode === 'hub') {
    const missions = [
      { id: 'jira' as MissionMode, icon: '🎫', title: 'Jira Ticket Simulator', subtitle: 'Fix real issues from your team', description: 'Work through a Kanban board of tickets from fictional bosses and clients. Write Terraform code to resolve each one.', gradient: 'from-blue-500 to-indigo-600', count: `${jiraTickets.length} tickets`, ready: true },
      { id: 'warroom' as MissionMode, icon: '🚨', title: 'War Room', subtitle: 'Respond to live incidents', description: 'Get paged for a production outage and troubleshoot step-by-step. Make the right calls to save the company.', gradient: 'from-red-500 to-rose-600', count: `${warRoomScenarios.length} incidents`, ready: true },
      { id: 'cost' as MissionMode, icon: '💰', title: 'Cost Optimization', subtitle: 'Find the waste in the AWS bill', description: 'Analyze a bloated cloud bill and identify which resources are wasting money. A critical real-world skill.', gradient: 'from-emerald-500 to-teal-600', count: `${costScenarios.length} challenge`, ready: true },
      { id: 'architecture' as MissionMode, icon: '🏗️', title: 'Architecture Proposals', subtitle: 'Design systems for clients', description: 'Given a set of business requirements and constraints, design the right cloud architecture.', gradient: 'from-purple-500 to-violet-600', count: 'Coming Soon', ready: false },
    ];

    return (
      <div className="relative min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <div className="text-center mb-14 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              Real-World Practice
            </div>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-3">
              Cloud Missions
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Solve problems that real cloud engineers face every day. From Jira tickets to production outages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {missions.map((m, i) => (
              <button
                key={m.id}
                onClick={() => m.ready && setMode(m.id)}
                disabled={!m.ready}
                className={`group relative text-left p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border transition-all duration-500 animate-fade-in ${
                  m.ready
                    ? 'border-white/[0.08] hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl cursor-pointer'
                    : 'border-white/[0.04] opacity-60 cursor-not-allowed'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{m.icon}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${m.ready ? 'bg-white/5 text-slate-400' : 'bg-purple-500/20 text-purple-400'}`}>
                      {m.count}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{m.title}</h2>
                  <p className="text-sm text-slate-500 mb-3">{m.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                  {m.ready && (
                    <div className="mt-5 flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      Start Mission <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER: Jira Simulator                                           */
  /* ================================================================ */
  if (mode === 'jira') {
    return (
      <div className="relative min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <button onClick={() => { setMode('hub'); setActiveTicketId(null); }} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-6 animate-fade-in">
            ← Back to Missions
          </button>

          {!activeTicket ? (
            /* Kanban Board */
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl">🎫</span>
                <div>
                  <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">Sprint Board — Cloud Team</h1>
                  <p className="text-sm text-slate-400">Click a ticket to start working on it.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'To Do', items: ticketsByStatus.todo, color: 'text-slate-400', dot: 'bg-slate-500' },
                  { label: 'In Progress', items: ticketsByStatus.inprogress, color: 'text-blue-400', dot: 'bg-blue-500' },
                  { label: 'Done', items: ticketsByStatus.done, color: 'text-emerald-400', dot: 'bg-emerald-500' },
                ].map(col => (
                  <div key={col.label}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                      <h2 className={`text-sm font-bold uppercase tracking-wider ${col.color}`}>{col.label}</h2>
                      <span className="text-xs text-slate-600 ml-auto">{col.items.length}</span>
                    </div>
                    <div className="space-y-3">
                      {col.items.map(ticket => (
                        <button
                          key={ticket.id}
                          onClick={() => openTicket(ticket)}
                          className="w-full text-left p-4 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 hover:bg-slate-900/80 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${priorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{ticket.title}</h3>
                          <p className="text-xs text-slate-500 line-clamp-2">{ticket.description}</p>
                          <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
                            <span>📋 {ticket.assignee}</span>
                            <span className={`ml-auto px-2 py-0.5 rounded-md ${
                              ticket.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500' :
                              ticket.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-rose-500/10 text-rose-500'
                            }`}>{ticket.difficulty}</span>
                          </div>
                        </button>
                      ))}
                      {col.items.length === 0 && (
                        <div className="p-6 rounded-xl border border-dashed border-white/[0.06] text-center text-xs text-slate-600">
                          {col.label === 'Done' ? '🎉 Complete tickets to see them here!' : 'No tickets'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Ticket Detail View */
            <div className="max-w-4xl mx-auto animate-fade-in">
              <button onClick={() => setActiveTicketId(null)} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-4">
                ← Back to Board
              </button>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                {/* Ticket Header */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-slate-500 text-sm">{activeTicket.id}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${priorityColor(activeTicket.priority)}`}>
                    {activeTicket.priority}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                    activeTicket.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                    activeTicket.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>{activeTicket.difficulty}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{activeTicket.title}</h2>
                <p className="text-slate-300 mb-6">{activeTicket.description}</p>

                {/* Message from the boss */}
                <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-8">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">💬 Context</h4>
                  <pre className="text-sm text-blue-200 whitespace-pre-wrap font-sans leading-relaxed">{activeTicket.context}</pre>
                </div>

                {/* Code Editor */}
                <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-inner mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-slate-700/50">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs text-slate-500 font-mono">main.tf</span>
                  </div>
                  <textarea
                    value={ticketCode}
                    onChange={(e) => { setTicketCode(e.target.value); setTicketResult(null); }}
                    className="w-full h-48 sm:h-56 p-4 bg-transparent text-[#58a6ff] font-mono text-sm resize-y focus:outline-none"
                    spellCheck="false"
                  />
                </div>

                {/* Result */}
                {ticketResult && (
                  <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${
                    ticketResult === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'bg-rose-500/10 border border-rose-500/30'
                  }`}>
                    <span className="text-2xl">{ticketResult === 'success' ? '✅' : '❌'}</span>
                    <div>
                      <h4 className={`font-bold ${ticketResult === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {ticketResult === 'success' ? 'Ticket Resolved!' : 'Not quite right.'}
                      </h4>
                      <p className={`text-sm mt-1 ${ticketResult === 'success' ? 'text-emerald-200' : 'text-rose-200'}`}>
                        {ticketResult === 'success' ? 'Great work! This ticket has been moved to Done.' : 'Check for typos or missing values. Replace all the blanks (___).' }
                      </p>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {ticketExplanation && (
                  <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                    <h4 className="font-bold text-blue-400 mb-2">💡 Explanation</h4>
                    <p className="text-sm text-blue-200">{activeTicket.explanation}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button onClick={checkTicket} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/25">
                    Submit Fix
                  </button>
                  {!ticketExplanation && (
                    <button onClick={showTicketSolution} className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all">
                      Show Solution
                    </button>
                  )}
                  {ticketResult === 'success' && (
                    <button onClick={() => setActiveTicketId(null)} className="px-6 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold transition-all ml-auto">
                      Back to Board →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER: War Room                                                 */
  /* ================================================================ */
  if (mode === 'warroom') {
    return (
      <div className="relative min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <button onClick={() => { setMode('hub'); setActiveScenarioId(null); }} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-6 animate-fade-in">
            ← Back to Missions
          </button>

          {!activeScenario ? (
            /* Scenario List */
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl">🚨</span>
                <div>
                  <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">War Room — Incident Response</h1>
                  <p className="text-sm text-slate-400">You just got paged. Can you find the root cause?</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {warRoomScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => startWarRoom(scenario.id)}
                    className="text-left p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] hover:border-red-500/30 hover:bg-slate-900/80 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${
                        scenario.severity === 'SEV-1' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>{scenario.severity}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors">{scenario.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-3">{scenario.description}</p>
                    <div className="mt-4 text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors">
                      Respond to Incident →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : warStep === 'intro' ? (
            /* Alert Screen */
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="p-8 rounded-3xl bg-red-500/5 border-2 border-red-500/30 shadow-2xl shadow-red-500/10 text-center">
                <div className="text-6xl mb-4 animate-pulse">🚨</div>
                <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${
                  activeScenario.severity === 'SEV-1' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}>{activeScenario.severity} — Page Received</span>
                <h2 className="text-2xl font-bold text-white mt-4 mb-3">{activeScenario.title}</h2>
                <p className="text-red-200 mb-6 text-sm leading-relaxed">{activeScenario.alertMessage}</p>
                <p className="text-slate-400 mb-8 text-sm">{activeScenario.description}</p>
                <button
                  onClick={() => setWarStep('investigate')}
                  className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/25"
                >
                  Start Investigation
                </button>
              </div>
            </div>
          ) : warStep === 'investigate' ? (
            /* Investigation */
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-2">{activeScenario.title}</h2>
                <p className="text-sm text-slate-400 mb-6">Choose your next step. Find the root cause by making the right calls.</p>

                {/* Feedback */}
                {stepFeedback && (
                  <div className={`p-4 rounded-xl mb-6 text-sm ${
                    stepFeedback.startsWith('✅') ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                    : stepFeedback.startsWith('⚠️') ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-200'
                  }`}>
                    {stepFeedback}
                  </div>
                )}

                {/* Timeline of chosen steps */}
                {chosenSteps.length > 0 && (
                  <div className="mb-6 pl-4 border-l-2 border-slate-700 space-y-2">
                    {chosenSteps.map((id, i) => {
                      const s = activeScenario.steps.find(st => st.id === id);
                      return (
                        <div key={id} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${s?.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className={s?.isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{s?.label}</span>
                          <span className="text-xs text-slate-600 ml-auto">Step {i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Options */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeScenario.steps.map(step => {
                    const isChosen = chosenSteps.includes(step.id);
                    return (
                      <button
                        key={step.id}
                        onClick={() => handleWarChoice(step.id)}
                        disabled={isChosen}
                        className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                          isChosen
                            ? step.isCorrect
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 cursor-default'
                              : 'border-rose-500/30 bg-rose-500/10 text-rose-300 cursor-default opacity-60'
                            : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:border-white/20 cursor-pointer'
                        }`}
                      >
                        {isChosen && (step.isCorrect ? '✅ ' : '❌ ')}{step.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Resolution */
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 shadow-2xl text-center mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-2">Incident Resolved!</h2>
                <p className="text-emerald-200 text-sm">You successfully identified and fixed the issue.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">🔍 Root Cause</h3>
                  <p className="text-slate-300 text-sm">{activeScenario.rootCause}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">✅ Resolution</h3>
                  <p className="text-slate-300 text-sm">{activeScenario.resolution}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveScenarioId(null)} className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all">
                    ← All Incidents
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER: Cost Optimization                                        */
  /* ================================================================ */
  if (mode === 'cost') {
    return (
      <div className="relative min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <button onClick={() => { setMode('hub'); setActiveCostId(null); }} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-6 animate-fade-in">
            ← Back to Missions
          </button>

          {!activeCostScenario ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl">💰</span>
                <div>
                  <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">Cost Optimization Challenges</h1>
                  <p className="text-sm text-slate-400">Find the waste in the cloud bill. Flag every wasteful resource.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {costScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => { setActiveCostId(scenario.id); setFlaggedItems(new Set()); setCostResult(null); setRevealedItems(new Set()); }}
                    className="text-left p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all group"
                  >
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{scenario.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{scenario.company} — ${scenario.totalBill.toLocaleString()}/month</p>
                    <p className="text-sm text-emerald-400">Can you save ${scenario.targetSavings.toLocaleString()}/month?</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <button onClick={() => setActiveCostId(null)} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-4">
                ← All Challenges
              </button>

              <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{activeCostScenario.title}</h2>
                <p className="text-sm text-slate-400 mb-4">{activeCostScenario.company} — Monthly AWS Bill: <span className="text-red-400 font-bold">${activeCostScenario.totalBill.toLocaleString()}</span></p>
                <p className="text-sm text-emerald-400">🎯 Target: Find <strong>${activeCostScenario.targetSavings.toLocaleString()}/month</strong> in savings. Click on wasteful items to flag them.</p>
              </div>

              <div className="space-y-3 mb-6">
                {activeCostScenario.items.map(item => {
                  const isFlagged = flaggedItems.has(item.id);
                  const isRevealed = revealedItems.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleFlagItem(item.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        isFlagged
                          ? 'border-red-500/40 bg-red-500/10'
                          : 'border-white/[0.08] bg-slate-900/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-sm">{item.service}</span>
                            {isFlagged && <span className="text-xs text-red-400 font-bold">🚩 FLAGGED</span>}
                          </div>
                          <p className="text-sm text-slate-400">{item.description}</p>
                          {isRevealed && (
                            <p className={`text-xs mt-2 ${item.isWaste ? 'text-red-300' : 'text-emerald-300'}`}>
                              {item.isWaste ? '💸 ' : '✅ '}{item.explanation}
                            </p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-white whitespace-nowrap">${item.monthlyCost.toLocaleString()}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {costResult && (
                <div className={`p-4 rounded-xl mb-6 ${
                  costResult === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-200'
                }`}>
                  {costResult === 'success'
                    ? '🎉 Perfect! You identified all the wasteful resources!'
                    : '❌ Not quite! Check the explanations below each item. Some items are flagged incorrectly or you missed some waste.'}
                </div>
              )}

              <button
                onClick={checkCostAnswer}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/25"
              >
                Submit Audit
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER: Architecture (Coming Soon)                               */
  /* ================================================================ */
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <button onClick={() => setMode('hub')} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-6 animate-fade-in">
          ← Back to Missions
        </button>
        <div className="text-center animate-fade-in p-12 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/[0.08]">
          <div className="text-6xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold text-white mb-3">Architecture Proposals</h2>
          <p className="text-slate-400 mb-2">Design systems based on real client requirements and constraints.</p>
          <p className="text-purple-400 text-sm font-medium">Coming Soon — Phase 2</p>
        </div>
      </main>
    </div>
  );
}
