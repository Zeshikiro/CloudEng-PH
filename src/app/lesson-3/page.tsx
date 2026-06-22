import type { Metadata } from 'next';
import Lesson3Content from './Lesson3Content';

export const metadata: Metadata = {
  title: 'Lesson 3: Compute, Storage, Networking — CloudEng PH',
  description: 'Alamin ang tatlong fundamental services ng cloud: Compute (EC2), Storage (S3), at Networking (VPC). Taglish explanation.',
};

export default function Lesson3Page() {
  return <Lesson3Content />;
}
