import type { Metadata } from 'next';
import S3HostingLab from './S3HostingLab';

export const metadata: Metadata = {
  title: 'Lab 3: Host a Website on S3 — CloudEng PH',
  description: 'Step-by-step hands-on lab: Host a static website using AWS S3. Learn bucket creation, static hosting, and public access configuration.',
};

export default function S3HostingLabPage() {
  return <S3HostingLab />;
}
