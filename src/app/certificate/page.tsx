import type { Metadata } from 'next';
import CertificateContent from './CertificateContent';

export const metadata: Metadata = {
  title: 'Certificate of Completion — CloudEng PH',
  description: 'Download your Cloud Engineering completion certificate.',
};

export default function CertificatePage() {
  return <CertificateContent />;
}
