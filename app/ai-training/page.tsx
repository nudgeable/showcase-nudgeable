import type { Metadata } from 'next';
import '@/styles/design/training.css';
import { TrainingContent } from '@/components/design/content/TrainingContent';
import { DesignShell } from '@/components/design/DesignShell';

const title = 'AI Masterclasses';
const description = 'Hands-on AI workshops for your team’s real tasks, with practical guides to keep learning afterward.';

export const metadata: Metadata = {
  title: title,
  description,
  alternates: { canonical: '/ai-training' },
  openGraph: { title: `${title} | Nudgeable`, description, url: '/ai-training', type: 'website', images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }] },
  twitter: { card: 'summary_large_image', title: `${title} | Nudgeable`, description, images: ['/assets/og-default.png'] }
};

export default function TrainingPage() {
  return <DesignShell page="training" active="training"><TrainingContent /></DesignShell>;
}
