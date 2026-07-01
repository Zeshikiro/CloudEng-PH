import type { Metadata } from 'next';
import AwsSetupLab from './AwsSetupLab';

export const metadata: Metadata = {
  title: 'Lab: AWS Account Setup — CloudEng PH',
  description:
    'Step-by-step hands-on lab: Create an AWS Free Tier account and navigate the AWS Console.',
};

export default function AwsSetupLabPage() {
  return <AwsSetupLab />;
}
