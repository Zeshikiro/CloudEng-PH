import type { Metadata } from 'next';
import LeaderboardContent from './LeaderboardContent';

export const metadata: Metadata = {
  title: 'Leaderboard — CloudEng PH',
  description: 'See the top cloud engineering learners! Track your ranking and compete with others.',
};

export default function LeaderboardPage() {
  return <LeaderboardContent />;
}
