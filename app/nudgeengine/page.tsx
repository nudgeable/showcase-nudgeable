import type { Metadata } from 'next';
import '@/styles/design/apply.css';
import { ApplyContent } from '@/components/design/content/ApplyContent';
import { DesignShell } from '@/components/design/DesignShell';

const title = 'Nudgeable Apply';
const description = 'AI-designed action plans, WhatsApp and email nudges, and participant-level tracking after classroom training.';

export const metadata: Metadata = {
  title: title,
  description,
  alternates: { canonical: '/nudgeengine' },
  openGraph: { title: `${title} | From Training to Application`, description, url: '/nudgeengine', type: 'website', images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }] },
  twitter: { card: 'summary_large_image', title: `${title} | From Training to Application`, description, images: ['/assets/og-default.png'] }
};

export default function ApplyPage() {
  return <DesignShell page="apply" active="apply"><ApplyContent /></DesignShell>;
}
