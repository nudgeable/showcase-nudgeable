import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

// Frame for internal tools (blog editor, analytics), which keep the previous stylesheet.
export function ToolLayout({ children }: { children: ReactNode }) {
  return <>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
  </>;
}
