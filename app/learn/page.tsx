import type { Metadata } from 'next';
import '@/styles/design/learn.css';
import '@/styles/design/explainers.css';
import { LearnContent } from '@/components/design/content/LearnContent';
import { DesignShell } from '@/components/design/DesignShell';
import { getExplainerAreas } from '@/lib/learnCatalog';

// Keep in step with CATALOG_REVALIDATE_SECONDS
export const revalidate = 60;

const title = 'Nudgeable Learn';
const description = 'Build a habit of learning AI with a personalized plan, daily WhatsApp explainers and progress you can track. Explore AI Foundations, AI at Work, New in AI and AI Research.';

export const metadata: Metadata = {
  title: title,
  description,
  alternates: { canonical: '/learn' },
  openGraph: { title: title, description, url: '/learn', type: 'website', images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }] },
  twitter: { card: 'summary_large_image', title: title, description, images: ['/assets/og-default.png'] }
};

export default async function LearnPage() {
  const areas = await getExplainerAreas();
  return <DesignShell page="learn" active="learn"><LearnContent areas={areas} /></DesignShell>;
}
