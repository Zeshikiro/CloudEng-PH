import type { Metadata } from 'next';
import Lesson4Content from './Lesson4Content';

export const metadata: Metadata = {
  title: 'Lesson 7: Infrastructure as Code (IaC) — CloudEng PH',
  description: 'Learn how to automate cloud deployments using Infrastructure as Code. Terraform, CloudFormation, and why IaC is essential for every Cloud Engineer.',
};

export default function Lesson4Page() {
  return <Lesson4Content />;
}
