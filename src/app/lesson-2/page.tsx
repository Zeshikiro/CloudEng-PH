import type { Metadata } from 'next';
import Lesson2Content from './Lesson2Content';

export const metadata: Metadata = {
  title: 'Lesson 2: IaaS, PaaS, SaaS — CloudEng PH',
  description: 'Learn the three service models of Cloud Computing: IaaS, PaaS, and SaaS. Simple explanation with a pizza analogy.',
};

export default function Lesson2Page() {
  return <Lesson2Content />;
}
