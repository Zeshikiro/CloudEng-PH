import DynamicLessonContent from './DynamicLessonContent';

export default async function DynamicLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicLessonContent slug={slug} />;
}
