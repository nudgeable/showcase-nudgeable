import type { Explainer, ExplainerArea } from '@/lib/learnCatalog';

// The explainer shown in the homepage hero ("Why Use Sarvam When ChatGPT Exists?"), when it's featured
// and published in Learn. Otherwise the first featured explainer takes its place.
const HERO_EXPLAINER_ID = 'ae61aa2c-4bd8-c3d2-3ffe-6bc2a52e20da';

// The explainers marked featured in Learn, in category order and then Learn's position order,
// with the hero explainer moved to the front. The first one leads the homepage hero; the rest
// fill the featured section. If none are marked, each category's first explainer stands in.
export function featuredExplainers(areas: ExplainerArea[]): Explainer[] {
  const marked = areas.flatMap(area => area.explainers.filter(explainer => explainer.featured));
  if (!marked.length) return areas.flatMap(area => area.explainers.slice(0, 1));
  const hero = marked.find(explainer => explainer.id === HERO_EXPLAINER_ID);
  return hero ? [hero, ...marked.filter(explainer => explainer !== hero)] : marked;
}
