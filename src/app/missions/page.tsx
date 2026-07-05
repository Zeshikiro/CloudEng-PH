import type { Metadata } from 'next';
import MissionsContent from './MissionsContent';

export const metadata: Metadata = {
  title: 'Cloud Missions — Real-World Scenarios | CloudEng PH',
  description: 'Practice solving real-world cloud engineering problems through interactive Jira tickets, incident response war rooms, architecture proposals, and cost optimization challenges.',
};

export default function MissionsPage() {
  return <MissionsContent />;
}
