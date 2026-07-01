import type { Metadata } from 'next';
import Lesson1Content from './Lesson1Content';

export const metadata: Metadata = {
  title: 'Lesson 1: What is the Cloud? — CloudEng PH',
  description:
    'Learn what Cloud Computing is in simple English. Analogies, problems solved by the cloud, Big 3 providers (AWS, Azure, GCP), and why it is not magic.',
};

export default function Lesson1Page() {
  return <Lesson1Content />;
}
