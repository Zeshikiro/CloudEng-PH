import type { Metadata } from 'next';
import Lesson5Content from './Lesson5Content';

export const metadata: Metadata = {
  title: 'Lesson 5: What is DevOps? — CloudEng PH',
  description: 'Learn what DevOps engineers do, the tools in their toolkit, and how DevOps bridges development and operations. Beginner-friendly.',
};

export default function Lesson5Page() {
  return <Lesson5Content />;
}
