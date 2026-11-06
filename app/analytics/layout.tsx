import type { ReactNode } from 'react';
import '@/app/globals.css';
import { ToolLayout } from '@/components/ToolLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
