import type { Metadata } from 'next';
import EC2LaunchLab from './EC2LaunchLab';

export const metadata: Metadata = {
  title: 'Lab: Launch an EC2 Instance — CloudEng PH',
  description: 'Step-by-step hands-on lab: Launch an EC2 virtual machine, connect via SSH, and deploy a web server.',
};

export default function EC2LaunchPage() {
  return <EC2LaunchLab />;
}
