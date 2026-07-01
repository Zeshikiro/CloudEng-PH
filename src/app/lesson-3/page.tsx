import type { Metadata } from 'next';
import Lesson3Content from './Lesson3Content';

export const metadata: Metadata = {
  title: 'Lesson 3: Compute, Storage, Networking — CloudEng PH',
  description: 'Learn the three fundamental services of the cloud: Compute (EC2), Storage (S3), and Networking (VPC). Simple explanation.',
};

export default function Lesson3Page() {
  return <Lesson3Content />;
}
