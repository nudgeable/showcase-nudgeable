import type { Metadata } from 'next';
import '@/styles/design/home.css';
import '@/styles/design/explainers.css';
import { HomeContent } from '@/components/design/content/HomeContent';
import { DesignShell } from '@/components/design/DesignShell';
import { getExplainerAreas } from '@/lib/learnCatalog';

// Keep in step with CATALOG_REVALIDATE_SECONDS
export const revalidate = 60;

const title = 'Nudgeable — Learn AI. Put it to work.';
const description = 'Learn AI in 3 minutes a day. Build a personalized learning plan, explore practical AI workshops, and turn training into action with Nudgeable Apply.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: title, description, url: '/', type: 'website', images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }] },
  twitter: { card: 'summary_large_image', title: title, description, images: ['/assets/og-default.png'] }
};

export default async function HomePage() {
  const areas = await getExplainerAreas();
  return <DesignShell page="home" socials><HomeContent areas={areas} /></DesignShell>;
}
