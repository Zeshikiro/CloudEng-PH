import type { Metadata } from 'next';
import AdminContent from './AdminContent';

export const metadata: Metadata = {
  title: 'Admin — CloudEng PH',
  description: 'Admin dashboard for managing lessons and quizzes.',
};

export default function AdminPage() {
  return <AdminContent />;
}
