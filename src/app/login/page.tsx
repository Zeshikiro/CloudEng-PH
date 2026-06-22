import type { Metadata } from 'next';
import LoginContent from './LoginContent';

export const metadata: Metadata = {
  title: 'Login — CloudEng PH',
  description: 'Sign in to CloudEng PH to save your progress, quiz scores, and track your cloud engineering learning journey.',
};

export default function LoginPage() {
  return <LoginContent />;
}
