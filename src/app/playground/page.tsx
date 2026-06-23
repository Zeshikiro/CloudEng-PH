import type { Metadata } from 'next';
import PlaygroundContent from './PlaygroundContent';

export const metadata: Metadata = {
  title: 'Cloud Architecture Playground — CloudEng PH',
  description: 'Drag and drop AWS services to build cloud architectures! Interactive minigame to learn cloud design.',
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
