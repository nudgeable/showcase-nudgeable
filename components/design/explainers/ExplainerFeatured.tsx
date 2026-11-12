'use client';

import type { Explainer } from '@/lib/learnCatalog';
import { LEARN_URL } from '@/lib/siteLinks';
import { ExplainerCard, ExplainerPreview, useHoverPreview } from './ExplainerCard';
import { FREE_MAX, savePicks, usePicks } from './picks';

// The featured explainers after the one in the hero (see featured.ts)
export function ExplainerFeatured({ cards }: { cards: Explainer[] }) {
  const picks = usePicks();
  const hover = useHoverPreview();

  function toggle(id: string) {
    if (picks.includes(id)) return savePicks(picks.filter(pick => pick !== id));
    if (picks.length < FREE_MAX) savePicks([...picks, id]);
  }

  if (!cards.length) return <p className="lx-empty">Explore every explainer on <a href={`${LEARN_URL}/`}>Nudgeable Learn</a>.</p>;

  return <>
    <ul className="lx-featured">
      {cards.map(explainer => <ExplainerCard
        key={explainer.id}
        explainer={explainer}
        picked={picks.includes(explainer.id)}
        under={hover.popped?.explainer.id === explainer.id}
        hover={hover}
        onToggle={() => toggle(explainer.id)}
      />)}
    </ul>
    {hover.popped && <ExplainerPreview
      key={hover.popped.explainer.id}
      popped={hover.popped}
      picked={picks.includes(hover.popped.explainer.id)}
      hover={hover}
      onToggle={() => toggle(hover.popped!.explainer.id)}
    />}
  </>;
}
