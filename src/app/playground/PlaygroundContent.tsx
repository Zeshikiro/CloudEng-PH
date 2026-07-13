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
  track: 'cloud' | 'devops';
  category: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
  expectedAnswer: string;
  explanation: string;
}

interface SimulationScenario {
  id: string;
  title: string;
  alertMessage: string;
  expectedCommand: string;
  successMessage: string;
  failureMessage: string;
  hint: string;
}

/* ------------------------------------------------------------------ */
/*  Architecture Data                                                  */
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
/*  Cloud Coding Exercises                                             */
/* ------------------------------------------------------------------ */

const cloudExercises: CodingExercise[] = [
  // Terraform
  { id: 'tf-ec2', track: 'cloud', category: 'Terraform', title: 'Create an EC2 Instance', difficulty: 'Beginner',
    description: 'Fill in the blanks to provision an AWS EC2 instance using Terraform.',
    starterCode: `provider "___" {\n  region = "ap-southeast-1"\n}\n\nresource "___" "my_server" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "___"\n}`,
    expectedAnswer: `provider "aws" {\n  region = "ap-southeast-1"\n}\n\nresource "aws_instance" "my_server" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t2.micro"\n}`,
    explanation: 'The provider is "aws", the resource type for an EC2 instance is "aws_instance", and the free tier instance type is "t2.micro".' },
  { id: 'tf-s3', track: 'cloud', category: 'Terraform', title: 'Create an S3 Bucket', difficulty: 'Beginner',
    description: 'Write the Terraform code to create an S3 bucket with a "private" acl.',
    starterCode: `resource "___" "my_bucket" {\n  bucket = "my-unique-bucket-2026"\n  acl    = "___"\n}`,
    expectedAnswer: `resource "aws_s3_bucket" "my_bucket" {\n  bucket = "my-unique-bucket-2026"\n  acl    = "private"\n}`,
    explanation: 'The resource type for an S3 bucket is "aws_s3_bucket" and the acl should be "private".' },
  { id: 'tf-vpc', track: 'cloud', category: 'Terraform', title: 'Create a VPC', difficulty: 'Intermediate',
    description: 'Create a VPC with a CIDR block of "10.0.0.0/16" and enable DNS support.',
    starterCode: `resource "___" "main" {\n  cidr_block           = "___"\n  enable_dns_support   = ___\n}`,
    expectedAnswer: `resource "aws_vpc" "main" {\n  cidr_block           = "10.0.0.0/16"\n  enable_dns_support   = true\n}`,
    explanation: 'The resource type is "aws_vpc", the CIDR block is "10.0.0.0/16", and enable_dns_support is "true".' },
  { id: 'tf-sg', track: 'cloud', category: 'Terraform', title: 'Create a Security Group', difficulty: 'Intermediate',
    description: 'Create a Security Group allowing SSH (port 22) and HTTP (port 80).',
    starterCode: `resource "aws_security_group" "web_sg" {\n  name = "web-sg"\n\n  ingress {\n    from_port   = ___\n    to_port     = ___\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  ingress {\n    from_port   = ___\n    to_port     = ___\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n}`,
    expectedAnswer: `resource "aws_security_group" "web_sg" {\n  name = "web-sg"\n\n  ingress {\n    from_port   = 22\n    to_port     = 22\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  ingress {\n    from_port   = 80\n    to_port     = 80\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n}`,
    explanation: 'SSH uses port 22, and HTTP uses port 80.' },
  { id: 'tf-rds', track: 'cloud', category: 'Terraform', title: 'Create an RDS Database', difficulty: 'Advanced',
    description: 'Create a MySQL database on db.t3.micro with 20GB storage.',
    starterCode: `resource "aws_db_instance" "my_db" {\n  engine         = "___"\n  instance_class = "___"\n  allocated_storage = ___\n  multi_az       = ___\n  username       = "admin"\n  password       = "password123"\n}`,
    expectedAnswer: `resource "aws_db_instance" "my_db" {\n  engine         = "mysql"\n  instance_class = "db.t3.micro"\n  allocated_storage = 20\n  multi_az       = false\n  username       = "admin"\n  password       = "password123"\n}`,
    explanation: 'The engine is "mysql", instance_class is "db.t3.micro", allocated_storage is 20, and multi_az is false.' },
  // AWS CLI
  { id: 'cli-s3-ls', track: 'cloud', category: 'AWS CLI', title: 'List All S3 Buckets', difficulty: 'Beginner',
    description: 'Use the AWS CLI to list all your S3 buckets.',
    starterCode: `aws ___ ls`, expectedAnswer: `aws s3 ls`,
    explanation: 'The "aws s3 ls" command lists all your buckets.' },
  { id: 'cli-s3-cp', track: 'cloud', category: 'AWS CLI', title: 'Upload a File to S3', difficulty: 'Beginner',
    description: 'Use the AWS CLI to copy index.html to your bucket.',
    starterCode: `aws s3 ___ index.html s3://my-bucket/`, expectedAnswer: `aws s3 cp index.html s3://my-bucket/`,
    explanation: 'The "cp" command copies files to/from S3.' },
  { id: 'cli-ec2-run', track: 'cloud', category: 'AWS CLI', title: 'Launch an EC2 Instance', difficulty: 'Intermediate',
    description: 'Launch a t2.micro instance using the AWS CLI.',
    starterCode: `aws ec2 ___ --image-id ami-0c55b159 --instance-type ___ --key-name mykey`,
    expectedAnswer: `aws ec2 run-instances --image-id ami-0c55b159 --instance-type t2.micro --key-name mykey`,
    explanation: 'The "run-instances" command launches an EC2 instance. The free tier type is "t2.micro".' },
  // CloudFormation
  { id: 'cf-ec2', track: 'cloud', category: 'CloudFormation', title: 'Basic EC2 Template', difficulty: 'Intermediate',
    description: 'Fill in the YAML blanks for a CloudFormation EC2 instance.',
    starterCode: `Resources:\n  MyEC2Instance:\n    Type: "AWS::___::Instance"\n    Properties:\n      InstanceType: "___"\n      ImageId: "ami-0c55b159cbfafe1f0"`,
    expectedAnswer: `Resources:\n  MyEC2Instance:\n    Type: "AWS::EC2::Instance"\n    Properties:\n      InstanceType: "t2.micro"\n      ImageId: "ami-0c55b159cbfafe1f0"`,
    explanation: 'The Type is AWS::EC2::Instance, and the InstanceType is t2.micro.' },
  // Linux
  { id: 'lnx-df', track: 'cloud', category: 'Linux', title: 'Check Disk Space', difficulty: 'Beginner',
    description: 'Check available disk space in human-readable format.',
    starterCode: `___ -h`, expectedAnswer: `df -h`,
    explanation: 'The "df" (disk free) command with "-h" shows space in MB/GB.' },
  { id: 'lnx-ps', track: 'cloud', category: 'Linux', title: 'Find a Process', difficulty: 'Beginner',
    description: 'List all running processes and filter for "nginx".',
    starterCode: `ps ___ | ___ nginx`, expectedAnswer: `ps aux | grep nginx`,
    explanation: '"ps aux" lists all processes, and "grep" filters the output.' },
  { id: 'net-ssh', track: 'cloud', category: 'Networking', title: 'SSH Into a Server', difficulty: 'Beginner',
    description: 'SSH into an EC2 instance using a key pair.',
    starterCode: `___ -i mykey.pem ec2-user@54.123.45.67`, expectedAnswer: `ssh -i mykey.pem ec2-user@54.123.45.67`,
    explanation: 'The "ssh" command is used to connect to remote servers.' },
];

/* ------------------------------------------------------------------ */
/*  DevOps Coding Exercises                                            */
/* ------------------------------------------------------------------ */

const devopsExercises: CodingExercise[] = [
  // Docker
  { id: 'docker-build', track: 'devops', category: 'Docker', title: 'Build a Docker Image', difficulty: 'Beginner',
    description: 'Build a Docker image tagged "myapp:latest" from the current directory.',
    starterCode: `docker ___ -t ___:latest .`, expectedAnswer: `docker build -t myapp:latest .`,
    explanation: '"docker build" creates an image. "-t" tags it with a name. The "." means use the Dockerfile in the current directory.' },
  { id: 'docker-run', track: 'devops', category: 'Docker', title: 'Run a Container', difficulty: 'Beginner',
    description: 'Run a container from the "nginx" image and map port 8080 on your machine to port 80 in the container.',
    starterCode: `docker ___ -p ___:80 nginx`, expectedAnswer: `docker run -p 8080:80 nginx`,
    explanation: '"docker run" starts a container. "-p 8080:80" maps host port 8080 to container port 80.' },
  { id: 'docker-ps', track: 'devops', category: 'Docker', title: 'List Running Containers', difficulty: 'Beginner',
    description: 'List all running Docker containers.',
    starterCode: `docker ___`, expectedAnswer: `docker ps`,
    explanation: '"docker ps" lists all currently running containers. Add "-a" to see stopped containers too.' },
  { id: 'docker-stop', track: 'devops', category: 'Docker', title: 'Stop a Container', difficulty: 'Beginner',
    description: 'Stop a running container with ID "abc123".',
    starterCode: `docker ___ abc123`, expectedAnswer: `docker stop abc123`,
    explanation: '"docker stop" gracefully stops a running container by its ID or name.' },
  { id: 'dockerfile-node', track: 'devops', category: 'Dockerfile', title: 'Write a Dockerfile for Node.js', difficulty: 'Intermediate',
    description: 'Complete the Dockerfile: use node:18 base, copy package.json, install deps, copy code, expose port 3000, start with "npm start".',
    starterCode: `FROM ___:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ___\nCOPY . .\nEXPOSE ___\nCMD ["npm", "___"]`,
    expectedAnswer: `FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`,
    explanation: 'A standard Node.js Dockerfile: base image node:18, install deps with "npm install", expose 3000, and start with "npm start".' },
  { id: 'dockerfile-python', track: 'devops', category: 'Dockerfile', title: 'Write a Dockerfile for Python', difficulty: 'Intermediate',
    description: 'Complete the Dockerfile: use python:3.11, copy requirements, install deps, copy code, run with "python app.py".',
    starterCode: `FROM ___:3.11\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r ___\nCOPY . .\nCMD ["python", "___"]`,
    expectedAnswer: `FROM python:3.11\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "app.py"]`,
    explanation: 'A standard Python Dockerfile: base image python:3.11, install from requirements.txt, and run app.py.' },
  // CI/CD
  { id: 'gha-basic', track: 'devops', category: 'CI/CD', title: 'GitHub Actions — Basic Workflow', difficulty: 'Beginner',
    description: 'Complete this GitHub Actions workflow that runs on push to main and executes "npm test".',
    starterCode: `name: CI\non:\n  push:\n    branches: [___]\njobs:\n  test:\n    runs-on: ___\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm ___`,
    expectedAnswer: `name: CI\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm test`,
    explanation: 'Triggers on push to "main", runs on "ubuntu-latest", checks out code, installs deps, and runs "npm test".' },
  { id: 'gha-docker', track: 'devops', category: 'CI/CD', title: 'GitHub Actions — Build & Push Docker', difficulty: 'Intermediate',
    description: 'Complete the step to build and push a Docker image to Docker Hub.',
    starterCode: `- name: Build and push\n  run: |\n    docker ___ -t myuser/myapp:latest .\n    docker ___ myuser/myapp:latest`,
    expectedAnswer: `- name: Build and push\n  run: |\n    docker build -t myuser/myapp:latest .\n    docker push myuser/myapp:latest`,
    explanation: '"docker build" creates the image, and "docker push" uploads it to Docker Hub.' },
  { id: 'gha-deploy', track: 'devops', category: 'CI/CD', title: 'GitHub Actions — Deploy to EC2', difficulty: 'Advanced',
    description: 'Complete the SSH deploy step that connects to an EC2 instance and pulls the latest Docker image.',
    starterCode: '- name: Deploy to EC2\n  run: |\n    ___ -i key.pem ec2-user@$\\{\\{ secrets.EC2_HOST \\}\\} "\n      docker pull myuser/myapp:latest &&\n      docker ___ myapp || true &&\n      docker ___ -d --name myapp -p 80:3000 myuser/myapp:latest\n    "',
    expectedAnswer: '- name: Deploy to EC2\n  run: |\n    ssh -i key.pem ec2-user@$\\{\\{ secrets.EC2_HOST \\}\\} "\n      docker pull myuser/myapp:latest &&\n      docker stop myapp || true &&\n      docker run -d --name myapp -p 80:3000 myuser/myapp:latest\n    "',
    explanation: 'SSH into EC2, pull the latest image, stop the old container, and run the new one on port 80.' },
  // Git
  { id: 'git-branch', track: 'devops', category: 'Git', title: 'Create and Switch Branch', difficulty: 'Beginner',
    description: 'Create a new branch called "feature/login" and switch to it.',
    starterCode: `git ___ -b feature/___`, expectedAnswer: `git checkout -b feature/login`,
    explanation: '"git checkout -b" creates a new branch and switches to it in one command.' },
  { id: 'git-merge', track: 'devops', category: 'Git', title: 'Merge a Branch', difficulty: 'Beginner',
    description: 'Switch to main and merge the "feature/login" branch.',
    starterCode: `git checkout ___\ngit ___ feature/login`,
    expectedAnswer: `git checkout main\ngit merge feature/login`,
    explanation: 'First checkout "main", then "git merge" brings changes from the feature branch into main.' },
  { id: 'git-rebase', track: 'devops', category: 'Git', title: 'Rebase onto Main', difficulty: 'Intermediate',
    description: 'Rebase your current feature branch onto the latest main branch.',
    starterCode: `git ___ main`, expectedAnswer: `git rebase main`,
    explanation: '"git rebase main" replays your commits on top of the latest main, creating a clean linear history.' },
  { id: 'git-stash', track: 'devops', category: 'Git', title: 'Stash Your Changes', difficulty: 'Intermediate',
    description: 'Save your uncommitted changes temporarily, then apply them back.',
    starterCode: `git ___\n# ... do other work ...\ngit stash ___`,
    expectedAnswer: `git stash\n# ... do other work ...\ngit stash pop`,
    explanation: '"git stash" saves changes temporarily. "git stash pop" brings them back.' },
  // Bash Scripting
  { id: 'bash-deploy', track: 'devops', category: 'Bash', title: 'Simple Deploy Script', difficulty: 'Intermediate',
    description: 'Complete the deploy script: pull latest code, install deps, restart the service.',
    starterCode: `#!/bin/bash\ncd /var/www/myapp\ngit ___ origin main\nnpm ___\nsudo systemctl ___ myapp`,
    expectedAnswer: `#!/bin/bash\ncd /var/www/myapp\ngit pull origin main\nnpm install\nsudo systemctl restart myapp`,
    explanation: '"git pull" fetches latest code, "npm install" installs dependencies, "systemctl restart" restarts the service.' },
  { id: 'bash-health', track: 'devops', category: 'Bash', title: 'Health Check Script', difficulty: 'Advanced',
    description: 'Write a script that checks if a website returns HTTP 200, and restarts the service if not.',
    starterCode: `#!/bin/bash\nSTATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3000)\nif [ "$STATUS" != "___" ]; then\n  echo "Site is down! Restarting..."\n  sudo systemctl ___ myapp\nfi`,
    expectedAnswer: `#!/bin/bash\nSTATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3000)\nif [ "$STATUS" != "200" ]; then\n  echo "Site is down! Restarting..."\n  sudo systemctl restart myapp\nfi`,
    explanation: 'The script checks if the HTTP status code is "200" (OK). If not, it restarts the service with systemctl.' },
  // Kubernetes
  { id: 'k8s-deploy', track: 'devops', category: 'Kubernetes', title: 'Create a Deployment', difficulty: 'Intermediate',
    description: 'Complete the Kubernetes deployment YAML for an nginx pod with 3 replicas.',
    starterCode: `apiVersion: apps/v1\nkind: ___\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: ___\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:___\n        ports:\n        - containerPort: 80`,
    expectedAnswer: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:latest\n        ports:\n        - containerPort: 80`,
    explanation: 'The kind is "Deployment", replicas is 3 for three pods, and the image is "nginx:latest".' },
  { id: 'k8s-svc', track: 'devops', category: 'Kubernetes', title: 'Create a Service', difficulty: 'Intermediate',
    description: 'Complete the Kubernetes Service to expose nginx on port 80 as a LoadBalancer.',
    starterCode: `apiVersion: v1\nkind: ___\nmetadata:\n  name: nginx-service\nspec:\n  type: ___\n  ports:\n  - port: 80\n    targetPort: 80\n  selector:\n    app: nginx`,
    expectedAnswer: `apiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-service\nspec:\n  type: LoadBalancer\n  ports:\n  - port: 80\n    targetPort: 80\n  selector:\n    app: nginx`,
    explanation: 'The kind is "Service", and type "LoadBalancer" exposes the service externally.' },
  { id: 'k8s-apply', track: 'devops', category: 'Kubernetes', title: 'Apply a Configuration', difficulty: 'Beginner',
    description: 'Apply a Kubernetes YAML configuration file.',
    starterCode: `kubectl ___ -f deployment.yaml`, expectedAnswer: `kubectl apply -f deployment.yaml`,
    explanation: '"kubectl apply -f" applies a YAML configuration to your cluster.' },
];

const allExercises = [...cloudExercises, ...devopsExercises];

/* ------------------------------------------------------------------ */
/*  Simulation Data (On-Call Simulator)                                */
/* ------------------------------------------------------------------ */

const simulationScenarios: SimulationScenario[] = [
  {
    id: 'sim-502',
    title: 'The 502 Bad Gateway',
    alertMessage: '🚨 URGENT: The main website is throwing 502 Bad Gateway errors. Users can not log in! The nginx reverse proxy is running, but the backend Node.js app service seems to have crashed.',
    expectedCommand: 'sudo systemctl restart myapp',
    successMessage: 'Phew! The website is back up. Restarting the backend service fixed the 502 error.',
    failureMessage: 'That command did not fix the issue. We need to restart the backend service called "myapp" using systemctl.',
    hint: 'Use "sudo systemctl restart <service_name>"',
  },
  {
    id: 'sim-disk-full',
    title: '100% Disk Full',
    alertMessage: '🚨 URGENT: The database server is unresponsive. Monitoring shows the root disk is 100% full due to massive log files in /var/log/. We need to check disk space quickly!',
    expectedCommand: 'df -h',
    successMessage: 'Great. Now we can see the disk is full. (In a real scenario, you would then run "rm /var/log/*.log" to clear space).',
    failureMessage: 'We need to check the disk space in human-readable format to confirm the issue.',
    hint: 'Use the "disk free" command with the human-readable flag (-h).',
  },
  {
    id: 'sim-docker-crash',
    title: 'Container Crash Loop',
    alertMessage: '🚨 URGENT: The new microservice was just deployed but it is not responding. I suspect the Docker container crashed. How do we see all containers, including stopped ones?',
    expectedCommand: 'docker ps -a',
    successMessage: 'Excellent! We found the stopped container. It exited with code 1. We will check the logs next.',
    failureMessage: 'That is not right. We need to list ALL containers, even the ones that are not currently running.',
    hint: 'Add the "-a" flag to the standard docker process list command.',
  },
  {
    id: 'sim-git-revert',
    title: 'Bad Deployment Rollback',
    alertMessage: '🚨 URGENT: The latest commit broke the staging environment! We need to quickly switch back to the main branch from our current feature branch so we can push a hotfix.',
    expectedCommand: 'git checkout main',
    successMessage: 'Perfect! We are back on the stable main branch. Crisis averted.',
    failureMessage: 'We just need to switch branches to "main".',
    hint: 'Use the git command to switch/checkout branches.',
  }
];

/* ------------------------------------------------------------------ */
/*  Pipeline Data                                                      */
/* ------------------------------------------------------------------ */

const PIPELINE_STAGES = [
  { id: 'lint', label: '1. Lint', icon: '🧹', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  { id: 'test', label: '2. Test', icon: '🧪', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  { id: 'build', label: '3. Build', icon: '🔨', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  { id: 'push', label: '4. Push', icon: '☁️', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  { id: 'deploy', label: '5. Deploy', icon: '🚀', color: 'bg-green-500/10 text-green-400 border-green-500/30' }
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type TabType = 'cloud' | 'devops' | 'architecture' | 'simulator' | 'pipeline';

export default function PlaygroundContent() {
  const [activeTab, setActiveTab] = useState<TabType>('cloud');

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
  
  // Simulator State
  const [simIndex, setSimIndex] = useState(0);
  const [simCommand, setSimCommand] = useState('');
  const [simLogs, setSimLogs] = useState<{sender: 'admin' | 'user' | 'system', text: string}[]>([
    { sender: 'admin', text: simulationScenarios[0].alertMessage }
  ]);
  const [simStatus, setSimStatus] = useState<'active' | 'resolved'>('active');

  // Pipeline Builder State
  const initialShuffled = ['build', 'deploy', 'lint', 'push', 'test'];
  const [availableStages, setAvailableStages] = useState<string[]>(initialShuffled);
  const [pipelineStages, setPipelineStages] = useState<string[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'success' | 'fail'>('idle');
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cloudeng-exercises-completed');
    if (saved) {
      try { setCompletedExercises(JSON.parse(saved)); } catch { /* ignore */ }
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

  /* Architecture Handlers */
  const handleDragStart = useCallback((serviceId: string) => { setDraggedService(serviceId); }, []);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedService) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    uidCounterRef.current += 1;
    setPlacedServices(prev => [...prev, { uid: `${draggedService}-${uidCounterRef.current}`, serviceId: draggedService, x, y }]);
    setDraggedService(null);
    setResult(null);
  }, [draggedService]);
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }, []);
  const removeService = useCallback((uid: string) => { setPlacedServices(prev => prev.filter(s => s.uid !== uid)); setResult(null); }, []);
  const resetCanvas = useCallback(() => { setPlacedServices([]); setResult(null); setShowHint(false); }, []);
  const checkArchitecture = useCallback(() => {
    const placedIds = new Set(placedServices.map(s => s.serviceId));
    setResult(selectedScenario.requiredServices.every(id => placedIds.has(id)) ? 'success' : 'fail');
  }, [placedServices, selectedScenario]);

  /* Coding Handlers */
  const currentTrackExercises = useMemo(() => {
    return activeTab === 'cloud' ? cloudExercises : activeTab === 'devops' ? devopsExercises : [];
  }, [activeTab]);

  const currentCategories = useMemo(() => {
    const cats = [...new Set(currentTrackExercises.map(ex => ex.category))];
    return ['All', ...cats];
  }, [currentTrackExercises]);

  const filteredExercises = useMemo(() => {
    return currentTrackExercises.filter(ex => {
      if (activeCategory !== 'All' && ex.category !== activeCategory) return false;
      if (activeDifficulty !== 'All' && ex.difficulty !== activeDifficulty) return false;
      return true;
    });
  }, [currentTrackExercises, activeCategory, activeDifficulty]);

  const selectedExercise = useMemo(() => allExercises.find(ex => ex.id === selectedExerciseId) || null, [selectedExerciseId]);

  const handleExerciseClick = useCallback((ex: CodingExercise) => {
    setSelectedExerciseId(ex.id); setUserCode(ex.starterCode); setCodeResult(null); setShowExplanation(false);
  }, []);

  const normalizeCode = (code: string) => code.toLowerCase().replace(/\s+/g, ' ').trim();

  const checkCode = useCallback(() => {
    if (!selectedExercise) return;
    const isCorrect = normalizeCode(userCode) === normalizeCode(selectedExercise.expectedAnswer);
    if (isCorrect) { setCodeResult('success'); setShowExplanation(true); saveCompleted(selectedExercise.id); }
    else { setCodeResult('fail'); }
  }, [userCode, selectedExercise, saveCompleted]);

  const showSolution = useCallback(() => {
    if (!selectedExercise) return;
    setUserCode(selectedExercise.expectedAnswer); setCodeResult(null); setShowExplanation(true);
  }, [selectedExercise]);

  /* Simulator Handlers */
  const runSimCommand = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!simCommand.trim() || simStatus === 'resolved') return;
    
    const currentSim = simulationScenarios[simIndex];
    const userCmd = simCommand.trim();
    
    // Add user command to log
    const newLogs = [...simLogs, { sender: 'user' as const, text: `$ ${userCmd}` }];
    
    if (normalizeCode(userCmd) === normalizeCode(currentSim.expectedCommand)) {
      newLogs.push({ sender: 'system' as const, text: currentSim.successMessage });
      setSimStatus('resolved');
    } else {
      newLogs.push({ sender: 'system' as const, text: `Command failed: ${currentSim.failureMessage}` });
    }
    
    setSimLogs(newLogs);
    setSimCommand('');
  }, [simCommand, simStatus, simIndex, simLogs]);

  const nextSimScenario = useCallback(() => {
    const nextIndex = (simIndex + 1) % simulationScenarios.length;
    setSimIndex(nextIndex);
    setSimStatus('active');
    setSimLogs([
      { sender: 'admin', text: simulationScenarios[nextIndex].alertMessage }
    ]);
  }, [simIndex]);

  const showSimHint = useCallback(() => {
    const currentSim = simulationScenarios[simIndex];
    setSimLogs(prev => [...prev, { sender: 'system' as const, text: `Hint: ${currentSim.hint}` }]);
  }, [simIndex]);

  /* Pipeline Handlers */
  const moveToPipeline = useCallback((id: string) => {
    setAvailableStages(prev => prev.filter(s => s !== id));
    setPipelineStages(prev => [...prev, id]);
    setPipelineStatus('idle');
    setPipelineLogs([]);
  }, []);

  const moveToAvailable = useCallback((id: string) => {
    setPipelineStages(prev => prev.filter(s => s !== id));
    setAvailableStages(prev => [...prev, id]);
    setPipelineStatus('idle');
    setPipelineLogs([]);
  }, []);

  const runPipeline = useCallback(() => {
    if (pipelineStages.length === 0) return;
    setPipelineStatus('running');
    setPipelineLogs(['[SYSTEM] Starting CI/CD Pipeline...']);
    
    const expected = ['lint', 'test', 'build', 'push', 'deploy'];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= pipelineStages.length) {
        clearInterval(interval);
        if (pipelineStages.length === expected.length) {
          setPipelineLogs(prev => [...prev, '✅ All stages completed successfully!', '🎉 Pipeline Deployed to Production!']);
          setPipelineStatus('success');
        } else {
          setPipelineLogs(prev => [...prev, '⚠️ Pipeline finished, but it is missing some required stages.']);
          setPipelineStatus('fail');
        }
        return;
      }

      const stageId = pipelineStages[currentStep];
      const expectedId = expected[currentStep];
      
      if (stageId !== expectedId) {
        clearInterval(interval);
        setPipelineLogs(prev => [...prev, `⏳ Running ${stageId}...`, `❌ ERROR: Expected stage '${expectedId}' but got '${stageId}'. Pipeline failed.`]);
        setPipelineStatus('fail');
        return;
      }

      setPipelineLogs(prev => [...prev, `⏳ Running ${stageId}...`, `✅ ${stageId} completed successfully.`]);
      currentStep++;
    }, 1000);
  }, [pipelineStages]);

  // Reset category when switching tabs
  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab); setActiveCategory('All'); setActiveDifficulty('All');
    setSelectedExerciseId(null); setCodeResult(null); setShowExplanation(false);
  }, []);

  const trackCompletedCount = useMemo(() => {
    return currentTrackExercises.filter(ex => completedExercises.includes(ex.id)).length;
  }, [currentTrackExercises, completedExercises]);

  if (!mounted) return null;

  const tabs = [
    { id: 'cloud' as TabType, label: '☁️ Cloud Coding', color: 'bg-blue-500', count: cloudExercises.length },
    { id: 'devops' as TabType, label: '🔧 DevOps Coding', color: 'bg-purple-500', count: devopsExercises.length },
    { id: 'architecture' as TabType, label: '🧩 Architecture', color: 'bg-amber-500', count: scenarios.length },
    { id: 'simulator' as TabType, label: '🚨 On-Call Simulator', color: 'bg-rose-500', count: simulationScenarios.length },
    { id: 'pipeline' as TabType, label: '🔄 Pipeline Builder', color: 'bg-emerald-500', count: 1 },
  ];

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
            DevOps Playground
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Sharpen your Cloud &amp; DevOps skills with hands-on coding exercises.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex p-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl flex-wrap gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-medium transition-all text-sm ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SIMULATOR TAB                                                    */}
        {/* ================================================================ */}
        {activeTab === 'simulator' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-3">
                    🚨 On-Call Simulator
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Resolve real-world DevOps incidents. Type the correct terminal command to fix the issue.</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Incident</div>
                  <div className="text-xl font-bold text-rose-400">{simIndex + 1} / {simulationScenarios.length}</div>
                </div>
              </div>

              {/* Chat / Terminal Area */}
              <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {simLogs.map((log, i) => (
                  <div key={i} className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                      log.sender === 'admin' 
                        ? 'bg-rose-500/10 border border-rose-500/20 text-rose-100 rounded-tl-sm'
                        : log.sender === 'user'
                          ? 'bg-blue-500 text-white font-mono rounded-tr-sm shadow-lg shadow-blue-500/20'
                          : log.text.includes('failed')
                            ? 'bg-slate-800 border border-rose-500/30 text-rose-300 font-mono text-xs rounded-bl-sm'
                            : log.text.includes('Hint')
                              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200 font-mono text-xs rounded-bl-sm'
                              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono rounded-bl-sm'
                    }`}>
                      {log.sender === 'admin' && <div className="text-rose-400 text-xs font-bold mb-1 uppercase tracking-wider">Lead DevOps Engineer</div>}
                      {log.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              {simStatus === 'active' ? (
                <form onSubmit={runSimCommand} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-emerald-400 font-mono font-bold">$</span>
                  </div>
                  <input
                    type="text"
                    value={simCommand}
                    onChange={(e) => setSimCommand(e.target.value)}
                    placeholder="Type a bash/cli command to resolve the issue..."
                    className="w-full bg-[#0d1117] border border-slate-700 rounded-xl py-4 pl-10 pr-32 text-[#58a6ff] font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                    spellCheck="false"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                    <button type="button" onClick={showSimHint} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors">
                      Hint
                    </button>
                    <button type="submit" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-colors">
                      Run
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-emerald-400 font-bold text-lg mb-4">Incident Resolved!</h3>
                  <button 
                    onClick={nextSimScenario}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-1"
                  >
                    Next Incident →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PIPELINE BUILDER TAB                                             */}
        {/* ================================================================ */}
        {activeTab === 'pipeline' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Side: Builder */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-3 mb-2">
                    🔄 CI/CD Pipeline Builder
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">Drag or click the available stages to build a working CI/CD pipeline in the correct order. Then run it!</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Available Stages (Click to add)</h3>
                    <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-black/40 border border-white/10 min-h-[80px]">
                      {availableStages.map(id => {
                        const stage = PIPELINE_STAGES.find(s => s.id === id)!;
                        return (
                          <button
                            key={id}
                            onClick={() => moveToPipeline(id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${stage.color} font-medium hover:opacity-80 transition-opacity`}
                          >
                            <span>{stage.icon}</span>
                            <span>{stage.label}</span>
                          </button>
                        );
                      })}
                      {availableStages.length === 0 && <span className="text-slate-600 text-sm italic">All stages added.</span>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Your Pipeline (Click to remove)</h3>
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/10 min-h-[300px]">
                      {pipelineStages.map((id, idx) => {
                        const stage = PIPELINE_STAGES.find(s => s.id === id)!;
                        return (
                          <div key={id} className="flex flex-col">
                            <button
                              onClick={() => moveToAvailable(id)}
                              className={`flex items-center justify-between w-full p-4 rounded-xl border ${stage.color} hover:opacity-80 transition-opacity text-left`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{stage.icon}</span>
                                <span className="font-bold text-lg">{stage.label}</span>
                              </div>
                              <div className="text-sm opacity-60 font-mono">Stage {idx + 1}</div>
                            </button>
                            {idx < pipelineStages.length - 1 && (
                              <div className="flex justify-center py-1">
                                <span className="text-slate-600">↓</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {pipelineStages.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-slate-600 text-sm italic">
                          Your pipeline is empty.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={runPipeline}
                    disabled={pipelineStages.length === 0 || pipelineStatus === 'running'}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      pipelineStages.length === 0 || pipelineStatus === 'running'
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-1'
                    }`}
                  >
                    {pipelineStatus === 'running' ? 'Running Pipeline...' : '▶ Run Pipeline'}
                  </button>
                </div>

                {/* Right Side: Terminal */}
                <div className="flex-1 flex flex-col">
                  <div className="bg-[#0d1117] rounded-xl border border-slate-700 flex-1 flex flex-col overflow-hidden h-[500px] md:h-auto">
                    <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-400 font-mono ml-2">pipeline-logs.sh</span>
                    </div>
                    <div className="p-4 font-mono text-sm overflow-y-auto custom-scrollbar flex-1">
                      {pipelineLogs.length === 0 ? (
                        <div className="text-slate-600 italic">No logs yet. Build and run your pipeline!</div>
                      ) : (
                        <div className="space-y-2">
                          {pipelineLogs.map((log, i) => (
                            <div key={i} className={`
                              ${log.includes('❌') ? 'text-rose-400' : ''}
                              ${log.includes('✅') ? 'text-emerald-400' : ''}
                              ${log.includes('⚠️') ? 'text-amber-400' : ''}
                              ${log.includes('🎉') ? 'text-blue-400 font-bold mt-4' : ''}
                              ${!log.includes('❌') && !log.includes('✅') && !log.includes('⚠️') && !log.includes('🎉') ? 'text-slate-300' : ''}
                            `}>
                              {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* ARCHITECTURE BUILDER TAB                                         */}
        {/* ================================================================ */}
        {activeTab === 'architecture' && (
          <div className="grid lg:grid-cols-4 gap-6 animate-fade-in">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
                <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Scenario</h2>
                <div className="space-y-2">
                  {scenarios.map(s => (
                    <button key={s.id} onClick={() => { setSelectedScenario(s); resetCanvas(); }}
                      className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
                        selectedScenario.id === s.id ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' : 'bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:bg-white/[0.05]'
                      }`}>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs mt-1 opacity-70">{s.difficulty}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
                <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">AWS Services</h2>
                <div className="grid grid-cols-2 gap-2">
                  {services.map(service => (
                    <div key={service.id} draggable onDragStart={() => handleDragStart(service.id)}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-grab active:cursor-grabbing hover:bg-white/[0.08] hover:border-white/[0.12] transition-all text-center group">
                      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{service.icon}</div>
                      <div className="text-xs text-slate-400 font-medium truncate">{service.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Canvas */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedScenario.title}</h2>
                  <p className="text-sm text-slate-400">{selectedScenario.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowHint(!showHint)} className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">💡 Hint</button>
                  <button onClick={resetCanvas} className="px-4 py-2 rounded-xl bg-white/5 border border-white/[0.08] text-slate-400 text-sm font-medium hover:bg-white/10 transition-colors">🔄 Reset</button>
                  <button onClick={checkArchitecture} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20">✅ Check</button>
                </div>
              </div>
              {showHint && (<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm animate-fade-in">💡 <strong>Hint:</strong> {selectedScenario.hint}</div>)}
              {result && (<div className={`p-4 rounded-xl border text-sm animate-fade-in ${result === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>{result === 'success' ? selectedScenario.successMessage : '❌ Not quite right yet. Check if any services are missing!'}</div>)}
              <div onDrop={handleDrop} onDragOver={handleDragOver}
                className={`relative w-full aspect-[16/9] rounded-2xl border-2 border-dashed transition-all ${draggedService ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-slate-900/40'} backdrop-blur-xl overflow-hidden`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                {placedServices.length === 0 && (<div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><div className="text-5xl mb-4 opacity-30">☁️</div><p className="text-slate-500 text-sm">Drag AWS services here to build your architecture</p></div></div>)}
                {placedServices.map(placed => {
                  const service = services.find(s => s.id === placed.serviceId);
                  if (!service) return null;
                  return (
                    <div key={placed.uid} className="absolute group animate-fade-in" style={{ left: `${Math.min(Math.max(placed.x, 5), 90)}%`, top: `${Math.min(Math.max(placed.y, 5), 90)}%`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg cursor-default hover:scale-110 transition-transform min-w-[70px] text-center`}>
                        <button onClick={() => removeService(placed.uid)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">✕</button>
                        <div className="text-2xl mb-1">{service.icon}</div>
                        <div className="text-[10px] font-bold text-white/90 leading-tight">{service.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-500">
                <strong className="text-slate-400">Required services:</strong>{' '}
                {selectedScenario.requiredServices.map(id => {
                  const s = services.find(svc => svc.id === id);
                  const isPlaced = placedServices.some(p => p.serviceId === id);
                  return (<span key={id} className={`inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full border ${isPlaced ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/[0.03] border-white/[0.08] text-slate-500'}`}>{s?.icon} {s?.name} {isPlaced && '✓'}</span>);
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* CODING EXERCISES TAB (Cloud or DevOps)                           */}
        {/* ================================================================ */}
        {(activeTab === 'cloud' || activeTab === 'devops') && (
          <div className="space-y-6 animate-fade-in">
            {!selectedExercise ? (
              <>
                {/* Track Header */}
                <div className={`p-5 rounded-2xl border ${activeTab === 'cloud' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-purple-500/5 border-purple-500/20'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-lg font-bold ${activeTab === 'cloud' ? 'text-blue-300' : 'text-purple-300'}`}>
                        {activeTab === 'cloud' ? '☁️ Cloud Engineering Exercises' : '🔧 DevOps Engineering Exercises'}
                      </h2>
                      <p className="text-sm text-slate-400 mt-1">
                        {activeTab === 'cloud'
                          ? 'Practice Terraform, AWS CLI, CloudFormation, Linux, and Networking.'
                          : 'Practice Docker, Dockerfiles, CI/CD, Git, Bash, and Kubernetes.'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${activeTab === 'cloud' ? 'text-blue-400' : 'text-purple-400'}`}>
                        {trackCompletedCount}/{currentTrackExercises.length}
                      </div>
                      <div className="text-xs text-slate-500">Completed</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                    <div
                      className={`h-full transition-all duration-1000 ${activeTab === 'cloud' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                      style={{ width: `${currentTrackExercises.length > 0 ? (trackCompletedCount / currentTrackExercises.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
                    {currentCategories.map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === cat
                            ? (activeTab === 'cloud' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white')
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}>{cat}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Difficulty:</span>
                    <select value={activeDifficulty} onChange={(e) => setActiveDifficulty(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-blue-500">
                      {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (<option key={diff} value={diff}>{diff}</option>))}
                    </select>
                  </div>
                </div>

                {/* Exercise Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map(ex => {
                    const isCompleted = completedExercises.includes(ex.id);
                    return (
                      <div key={ex.id} onClick={() => handleExerciseClick(ex)}
                        className={`relative p-6 rounded-2xl bg-slate-900/40 border transition-all duration-300 cursor-pointer group ${
                          isCompleted ? 'border-emerald-500/30 hover:border-emerald-500/50' : 'border-white/[0.08] hover:border-blue-500/50 hover:bg-slate-900/60 hover:-translate-y-1'
                        }`}>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                            ex.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                            ex.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-rose-500/20 text-rose-400'
                          }`}>{ex.difficulty}</span>
                          {isCompleted && (<span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">✓</span>)}
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
                  {filteredExercises.length === 0 && (<div className="col-span-full py-12 text-center text-slate-500">No exercises found for these filters.</div>)}
                </div>
              </>
            ) : (
              /* Exercise Detail View */
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                <button onClick={() => setSelectedExerciseId(null)} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium mb-2">← Back to Exercises</button>
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${activeTab === 'cloud' ? 'bg-blue-500/20 text-blue-400 border-blue-500/20' : 'bg-purple-500/20 text-purple-400 border-purple-500/20'}`}>
                      {selectedExercise.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                      selectedExercise.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                      selectedExercise.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/20 text-rose-400 border-rose-500/20'
                    }`}>{selectedExercise.difficulty}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{selectedExercise.title}</h2>
                  <p className="text-slate-300 mb-8">{selectedExercise.description}</p>
                  {/* Code Editor */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-inner mb-6">
                    <div className="absolute top-0 w-full flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-slate-700/50">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs text-slate-500 font-mono">terminal</span>
                    </div>
                    <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-48 sm:h-64 pt-12 p-4 bg-transparent text-[#58a6ff] font-mono text-sm sm:text-base resize-y focus:outline-none" spellCheck="false" placeholder="Type your code here..." />
                  </div>
                  {/* Result */}
                  {codeResult && (
                    <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${codeResult === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-rose-500/10 border border-rose-500/30'}`}>
                      <span className="text-2xl mt-0.5">{codeResult === 'success' ? '✅' : '❌'}</span>
                      <div>
                        <h4 className={`font-bold ${codeResult === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{codeResult === 'success' ? 'Correct!' : 'Not quite right.'}</h4>
                        <p className={`text-sm mt-1 ${codeResult === 'success' ? 'text-emerald-200' : 'text-rose-200'}`}>{codeResult === 'success' ? 'Great job! You wrote the correct code.' : 'Check for typos or missing parameters. Replace the blanks (___). '}</p>
                      </div>
                    </div>
                  )}
                  {showExplanation && (
                    <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                      <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><span>💡</span> Explanation</h4>
                      <p className="text-sm text-blue-200">{selectedExercise.explanation}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-4">
                    <button onClick={checkCode} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/25">Check Answer</button>
                    {!showExplanation && (<button onClick={showSolution} className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all">Show Solution</button>)}
                    {codeResult === 'success' && (<button onClick={() => setSelectedExerciseId(null)} className="px-6 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold transition-all ml-auto">Next Exercise →</button>)}
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
