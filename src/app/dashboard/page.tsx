import type { Metadata } from 'next';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard — CloudEng PH',
  description: 'Track your cloud engineering learning progress, achievements, and quiz scores.',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
