'use client';

import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import LabViewer from '@/components/LabViewer';

const s3HostingSteps = [
  {
    id: 1,
    title: 'What is S3 Static Website Hosting?',
    content: (
      <div className="space-y-4">
        <p>
          Did you know that <strong>Amazon S3 (Simple Storage Service)</strong> is not just for storing files?
          You can also use it to <strong>host a static website</strong> — HTML, CSS, and JavaScript
          — <em>without needing to manage any servers!</em>
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
          <p className="font-bold text-white mb-3">🔄 Traditional Hosting vs S3 Hosting</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 font-semibold mb-2">❌ Traditional (EC2 + Apache/Nginx)</p>
              <ul className="list-disc pl-4 space-y-1 text-red-200">
                <li>Needs a server to be on all the time</li>
                <li>You have to manage OS updates</li>
                <li>More expensive (minimum ~$8/month)</li>
                <li>Can be hacked if not updated</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 font-semibold mb-2">✅ S3 Static Hosting (Serverless)</p>
              <ul className="list-disc pl-4 space-y-1 text-emerald-200">
                <li>No server to manage</li>
                <li>No OS updates</li>
                <li>Almost free! (~$0.023/GB storage)</li>
                <li>AWS handles all infrastructure security</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          <strong>Perfect for:</strong> portfolios, landing pages, documentation sites,
          and any website that doesn&apos;t need backend or server logic.
        </p>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
          💡 <strong>Cost Breakdown:</strong> Almost free! S3 is ~$0.023 per GB/month for storage,
          and ~$0.09 per 10,000 GET requests. If your site is small (under 1GB),
          your total cost will be less than $0.05/month — cheaper than candy!
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Create an S3 Bucket',
    content: (
      <div className="space-y-4">
        <p>
          The first step is to create an <strong>S3 bucket</strong> — this is the &quot;folder&quot; where
          we will place our website files.
        </p>

        <ol className="list-decimal pl-5 space-y-3">
          <li>Go to the <strong>AWS Management Console</strong> and search for <strong>S3</strong>.</li>
          <li>Click the orange <strong>Create bucket</strong> button.</li>
          <li>
            In <strong>Bucket name</strong>, put a globally unique name. For example:
            <pre className="mt-2 p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">my-website-juan-2026</pre>
            <p className="text-sm text-slate-400 mt-1">
              Tip: Use your name to make it unique! Ex: <code>my-website-[yourname]-2026</code>
            </p>
          </li>
          <li>
            For <strong>AWS Region</strong>, choose <strong>Asia Pacific (Singapore) ap-southeast-1</strong>
            — it&apos;s the closest to the Philippines for faster loading!
          </li>
          <li>
            <strong className="text-amber-400">IMPORTANT:</strong> In the <strong>Block Public Access settings</strong>,
            <strong>UNCHECK</strong> the <strong>&quot;Block all public access&quot;</strong> checkbox.
          </li>
          <li>
            A warning will appear — <strong>check/acknowledge</strong> the box that says
            &quot;I acknowledge that the current settings might result in this bucket and the objects within becoming public.&quot;
          </li>
          <li>Leave everything else as default.</li>
          <li>Click <strong>Create bucket</strong> at the bottom!</li>
        </ol>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          ⚠️ <strong>Remember:</strong> The bucket name must be <strong>GLOBALLY UNIQUE</strong> — meaning,
          no one else in the world can use the exact same name!
          If you get an error saying &quot;Bucket name already exists,&quot; try a different name.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Enable Static Website Hosting',
    content: (
      <div className="space-y-4">
        <p>
          Now, let&apos;s enable the <strong>Static Website Hosting</strong> feature of your S3 bucket.
        </p>

        <ol className="list-decimal pl-5 space-y-3">
          <li>Click the name of your new bucket in the S3 Dashboard.</li>
          <li>Go to the <strong>Properties</strong> tab (the second tab at the top).</li>
          <li>Scroll down until you see the <strong>Static website hosting</strong> section (at the very bottom).</li>
          <li>Click <strong>Edit</strong>.</li>
          <li>Choose <strong>Enable</strong>.</li>
          <li>
            For the <strong>Index document</strong>, type:
            <pre className="mt-2 p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">index.html</pre>
          </li>
          <li>
            For the <strong>Error document</strong>, type:
            <pre className="mt-2 p-3 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">error.html</pre>
          </li>
          <li>Click <strong>Save changes</strong>.</li>
          <li>
            After saving, you will see the <strong>Bucket website endpoint</strong> — a URL starting with
            <code className="ml-1">http://your-bucket-name.s3-website-ap-southeast-1.amazonaws.com</code>
          </li>
        </ol>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
          💡 <strong>Tip:</strong> Save your endpoint URL! This will be your website&apos;s link.
          Copy it now and paste it in a notepad — we will need it for Step 6.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Create Website Files',
    content: (
      <div className="space-y-4">
        <p>
          Time to create the actual website files! Create two files on your computer:
          <code>index.html</code> and <code>error.html</code>.
        </p>

        <div className="space-y-2">
          <p className="font-bold text-white">📄 index.html — The main page of your website:</p>
          <pre className="p-4 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Cloud Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white; min-height: 100vh;
            display: flex; align-items: center;
            justify-content: center;
        }
        .card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px; padding: 48px;
            text-align: center; max-width: 500px;
            backdrop-filter: blur(16px);
        }
        h1 { font-size: 2rem; margin-bottom: 8px; }
        p { color: #94a3b8; margin-bottom: 16px; }
        .badge {
            display: inline-block; padding: 4px 12px;
            border-radius: 9999px;
            background: rgba(59,130,246,0.2);
            color: #60a5fa; font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>☁️ Hello from S3!</h1>
        <p>This website is hosted on AWS S3.
           No servers needed!</p>
        <span class="badge">Powered by CloudEng</span>
    </div>
</body>
</html>`}</pre>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-white">📄 error.html — For 404 errors:</p>
          <pre className="p-4 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white; min-height: 100vh;
            display: flex; align-items: center;
            justify-content: center; text-align: center;
        }
        h1 { font-size: 4rem; margin-bottom: 8px; }
        p { color: #94a3b8; margin-bottom: 16px; }
        a { color: #60a5fa; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div>
        <h1>404</h1>
        <p>Oops! We couldn&apos;t find the page you&apos;re looking for.</p>
        <a href="/">← Back to Home</a>
    </div>
</body>
</html>`}</pre>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-white">📤 Upload the files to S3:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go back to your S3 bucket and click the <strong>Objects</strong> tab.</li>
            <li>Click the orange <strong>Upload</strong> button.</li>
            <li>Click <strong>Add files</strong> and choose <code>index.html</code> and <code>error.html</code> (you can also drag and drop).</li>
            <li>Click <strong>Upload</strong> at the bottom.</li>
            <li>Wait for the success message — you should see both files uploaded!</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Set Bucket Policy for Public Access',
    content: (
      <div className="space-y-4">
        <p>
          Even though we unchecked &quot;Block Public Access,&quot; we still need a
          <strong> Bucket Policy</strong> to explicitly allow people to read our files.
        </p>

        <ol className="list-decimal pl-5 space-y-3">
          <li>In your bucket, go to the <strong>Permissions</strong> tab.</li>
          <li>Scroll down to the <strong>Bucket policy</strong> section and click <strong>Edit</strong>.</li>
          <li>
            Paste this policy (replace <code>YOUR-BUCKET-NAME</code> with your actual bucket name):
          </li>
        </ol>

        <pre className="p-4 bg-black border border-white/10 rounded-lg text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">{`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": &quot;arn:aws:s3:::YOUR-BUCKET-NAME/*&quot;
        }
    ]
}`}</pre>

        <ol className="list-decimal pl-5 space-y-2" start={4}>
          <li>Click <strong>Save changes</strong>.</li>
          <li>
            If successful, you will see that the bucket now has a <span className="text-amber-400 font-bold">Publicly accessible</span> tag.
          </li>
        </ol>

        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200">
          ⚠️ <strong>IMPORTANT:</strong> Replace <code>YOUR-BUCKET-NAME</code> with your actual bucket name!
          Make sure to include <code>{'/*'}</code> at the end of the Resource — this specifies that all files in the bucket are
          accessible. If the bucket name is wrong, the policy won&apos;t work.
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
          💡 <strong>What does this policy do?</strong> It tells AWS to: &quot;Allow anyone (<code>Principal: *</code>)
          to read (<code>s3:GetObject</code>) any file (<code>{'/*'}</code>) in this bucket.&quot;
          This is necessary for people to be able to access your website.
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Access Your Website! 🎉',
    content: (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Awesome, you have a website in the cloud!</h3>
          <p className="text-slate-300">No servers, no maintenance — pure S3!</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
          <p className="font-bold text-white mb-3">🌐 Access your website:</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Go back to the <strong>Properties</strong> tab of your S3 bucket.</li>
            <li>Scroll down to the <strong>Static website hosting</strong> section.</li>
            <li>Click your <strong>Bucket website endpoint</strong> URL.</li>
            <li>Your website will open in a new tab!</li>
          </ol>
        </div>

        <p>
          If you see the &quot;☁️ Hello from S3!&quot; page — <strong>congratulations!</strong> You have successfully
          hosted your first static website on AWS S3!
        </p>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
          🚀 <strong>Next Steps:</strong> In the future, you can connect this to <strong>CloudFront</strong> to
          add a CDN (Content Delivery Network) and HTTPS support, and to <strong>Route 53</strong> for a
          custom domain name (e.g., <code>www.yourname.com</code>)!
        </div>

        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-left mt-6">
          <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <span>⚠️</span> CLEAN UP: Delete the Bucket After Practicing
          </h4>
          <p className="text-red-200 text-sm mb-4">
            To avoid any unexpected charges, delete your S3 bucket once you are done practicing.
            Follow these steps:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-red-200 font-medium">
            <li>Go to the S3 Dashboard and click your bucket name.</li>
            <li>Click <strong>Empty</strong> — this will delete all the files inside.</li>
            <li>Type <code>permanently delete</code> in the confirmation box and click <strong>Empty</strong>.</li>
            <li>Go back to the S3 Dashboard, select your bucket, and click <strong>Delete</strong>.</li>
            <li>Type your bucket name in the confirmation box and click <strong>Delete bucket</strong>.</li>
          </ol>
          <p className="text-red-300 text-xs mt-3 italic">
            Important: You must empty the bucket first before deleting it — AWS won&apos;t let you delete a bucket that still has files inside!
          </p>
        </div>
      </div>
    ),
  },
];

export default function S3HostingLab() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24">
        <LabViewer
          labId="s3-hosting-lab"
          title="Lab 3: Host a Website on S3"
          description="Host a static website using AWS S3 — no servers needed!"
          estimatedTime="~20 min"
          difficulty="Beginner"
          steps={s3HostingSteps}
        />
      </main>
    </div>
  );
}
