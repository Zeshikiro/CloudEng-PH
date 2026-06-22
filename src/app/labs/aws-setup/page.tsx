import type { Metadata } from 'next';
import AwsSetupLab from './AwsSetupLab';

export const metadata: Metadata = {
  title: 'Lab: AWS Account Setup — CloudEng PH',
  description:
    'Step-by-step hands-on lab: Gumawa ng AWS Free Tier account at i-navigate ang AWS Console.',
};

export default function AwsSetupLabPage() {
  return <AwsSetupLab />;
}
