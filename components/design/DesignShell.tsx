import type { ReactNode } from 'react';
import { DesignFooter } from './DesignFooter';
import { DesignHeader, type NavKey } from './DesignHeader';
import { DesignScripts, type DesignPage } from './DesignScripts';

export function DesignShell({ page, active, socials, after, children }: {
  page: DesignPage;
  active?: NavKey;
  socials?: boolean;
  after?: ReactNode;
  children: ReactNode;
}) {
  return <div data-page={page}>
    <a className="skip-link" href="#main">Skip to content</a>
    <DesignHeader active={active} />
    <main id="main">{children}</main>
    <DesignFooter socials={socials} />
    {after}
    <DesignScripts page={page} />
  </div>;
}
