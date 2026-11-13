import type { Explainer, ExplainerArea } from '@/lib/learnCatalog';

// The explainer shown in the homepage hero ("Nvidia Didn't Get Lucky"), when it's featured
// and published in Learn. Otherwise the first featured explainer takes its place.
const HERO_EXPLAINER_ID = 'da1dee8f-1146-4ef8-a080-ae4fbd8921a7';

// The explainers marked featured in Learn, in category order and then Learn's position order,
// with the hero explainer moved to the front. The first one leads the homepage hero; the rest
// fill the featured section. If none are marked, each category's first explainer stands in.
export function featuredExplainers(areas: ExplainerArea[]): Explainer[] {
  const marked = areas.flatMap(area => area.explainers.filter(explainer => explainer.featured));
  if (!marked.length) return areas.flatMap(area => area.explainers.slice(0, 1));
  const hero = marked.find(explainer => explainer.id === HERO_EXPLAINER_ID);
  return hero ? [hero, ...marked.filter(explainer => explainer !== hero)] : marked;
}
