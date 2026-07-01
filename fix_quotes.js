const fs = require('fs');
const files = [
  'src/app/labs/ec2-launch/EC2LaunchLab.tsx',
  'src/app/labs/s3-hosting/S3HostingLab.tsx',
  'src/app/lesson-1/Lesson1Content.tsx',
  'src/app/lesson-2/Lesson2Content.tsx',
  'src/app/lesson-3/Lesson3Content.tsx'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\b(don)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(doesn)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(isn)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(aren)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(it)'(s)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(let)'(s)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(that)'(s)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(you)'(ll)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(you)'(re)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(we)'(re)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(they)'(re)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(I)'(m)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(you)'(ve)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(won)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(can)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(couldn)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(wouldn)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(shouldn)'(t)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(what)'(s)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(there)'(s)\b/gi, '$1&apos;$2');
  content = content.replace(/\b(here)'(s)\b/gi, '$1&apos;$2');
  // Alphanumeric words ending in s'
  content = content.replace(/(\w)s'(?=\s)/g, '$1s&apos;');
  // Also fix unescaped double quotes outside attributes
  content = content.replace(/>([^<]*)"([^<]*)</g, (match, p1, p2) => {
    return `>${p1}&quot;${p2}<`;
  });
  content = content.replace(/>([^<]*)"([^<]*)</g, (match, p1, p2) => {
    return `>${p1}&quot;${p2}<`;
  });
  
  fs.writeFileSync(file, content);
}
console.log('Fixed apostrophes and quotes');
