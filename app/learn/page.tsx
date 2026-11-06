import type { Metadata } from 'next';
import '@/styles/design/learn.css';
import { LearnContent } from '@/components/design/content/LearnContent';
import { DesignShell } from '@/components/design/DesignShell';

const title = 'Nudgeable Learn';
const description = 'Build a habit of learning AI with a personalized plan, daily WhatsApp explainers and progress you can track. Explore AI Foundations, AI at Work, New in AI and AI Research.';

export const metadata: Metadata = {
  title: title,
  description,
  alternates: { canonical: '/learn' },
  openGraph: { title: title, description, url: '/learn', type: 'website', images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }] },
  twitter: { card: 'summary_large_image', title: title, description, images: ['/assets/og-default.png'] }
};

export default function LearnPage() {
  return <DesignShell page="learn" active="learn"><LearnContent /></DesignShell>;
}
