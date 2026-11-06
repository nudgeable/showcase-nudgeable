'use client';

import { useEffect } from 'react';

export type DesignPage = 'home' | 'training' | 'apply' | 'learn' | 'blogs' | 'videos' | 'article' | 'roleplay' | 'legal';

let started = false;

// Page behaviour runs after hydration. The guard keeps React Strict Mode from binding listeners twice.
export function DesignScripts({ page }: { page: DesignPage }) {
  useEffect(() => {
    if (started) return;
    started = true;
    void (async () => {
      (await import('@/lib/design/common')).initCommon();
      if (page === 'home') {
        (await import('@/lib/design/homeGallery')).initHomeGallery();
        (await import('@/lib/design/homeStats')).initHomeStats();
        (await import('@/lib/design/fluency')).initFluency();
      }
      if (page === 'training') (await import('@/lib/design/gallery')).initMasterclassGallery();
      if (page === 'apply') (await import('@/lib/design/applyPage')).initApplyPage();
    })();
  }, [page]);
  return null;
}
