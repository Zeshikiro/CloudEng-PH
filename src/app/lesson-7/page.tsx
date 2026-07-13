import type { Metadata } from 'next';
import Lesson7Content from './Lesson7Content';

export const metadata: Metadata = {
  title: 'Lesson 7: CI/CD Pipelines — CloudEng PH',
  description: 'Automate everything! Learn how Continuous Integration and Continuous Delivery (CI/CD) pipelines work.',
};

export default function Lesson7Page() {
  return <Lesson7Content />;
}
