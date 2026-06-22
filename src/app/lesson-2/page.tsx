import type { Metadata } from 'next';
import Lesson2Content from './Lesson2Content';

export const metadata: Metadata = {
  title: 'Lesson 2: IaaS, PaaS, SaaS — CloudEng PH',
  description: 'Alamin ang tatlong service models ng Cloud Computing: IaaS, PaaS, at SaaS. Taglish explanation with pizza analogy.',
};

export default function Lesson2Page() {
  return <Lesson2Content />;
}
