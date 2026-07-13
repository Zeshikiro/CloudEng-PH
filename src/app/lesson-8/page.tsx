import type { Metadata } from 'next';
import Lesson8Content from './Lesson8Content';

export const metadata: Metadata = {
  title: 'Lesson 8: Docker & Containers — CloudEng PH',
  description: 'Learn about Docker containers and orchestration in CloudEng PH',
};

export default function Lesson8Page() {
  return <Lesson8Content />;
}
