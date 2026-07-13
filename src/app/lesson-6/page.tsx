import type { Metadata } from 'next';
import Lesson6Content from './Lesson6Content';

export const metadata: Metadata = {
  title: 'Lesson 6: Version Control & Git — CloudEng PH',
  description: 'Alamin kung paano gumagana ang Git, branches, pull requests, at ang fundamentals ng GitOps.',
};

export default function Lesson6Page() {
  return <Lesson6Content />;
}
