import type { Metadata } from 'next';
import Lesson1Content from './Lesson1Content';

export const metadata: Metadata = {
  title: 'Lesson 1: Ano ba ang Cloud? — CloudEng PH',
  description:
    'Alamin kung ano ang Cloud Computing sa simpleng Taglish. Analogy, problems na na-solve ng cloud, Big 3 providers (AWS, Azure, GCP), at bakit hindi ito magic.',
};

export default function Lesson1Page() {
  return <Lesson1Content />;
}
