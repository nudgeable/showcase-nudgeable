'use client';

import { useState } from 'react';
import type { Explainer } from '@/lib/learnCatalog';
import { lessonUrl } from './ExplainerCard';

// The homepage hero's featured video, as in the 12 Nov 2026 design: a "Most watched" badge, the
// thumbnail with a yellow "Play 1:52" pill, and the title under it. Play swaps the thumbnail for the
// video, playing in place; a lesson with no playable video (a guide or walkthrough) opens on Learn.
export function HeroExplainer({ explainer }: { explainer: Explainer }) {
  const [playing, setPlaying] = useState(false);
  const playable = Boolean(explainer.previewUrl || explainer.youTubeId);
  const label = `Play ${explainer.title}, ${explainer.duration}`;

  const cover = <>
    {explainer.thumbnail ? <img src={explainer.thumbnail} alt="" /> : <span className="lx-card__blank" />}
    <span className="lx-hero__play" aria-hidden="true"><i />{`Play ${explainer.duration}`}</span>
  </>;

  return <div className="hero-art lx-hero" data-analytics-explainer={explainer.title}>
    <span className="lx-hero__badge">Most watched</span>
    {playing
      ? <div className="lx-hero__media is-playing">
        {explainer.previewUrl
          ? <video src={explainer.previewUrl} poster={explainer.thumbnail ?? undefined} controls autoPlay playsInline aria-label={explainer.title} />
          : <iframe src={`https://www.youtube-nocookie.com/embed/${explainer.youTubeId}?autoplay=1&rel=0`} title={explainer.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
      </div>
      : playable
        ? <button className="lx-hero__media" type="button" onClick={() => setPlaying(true)} data-analytics-action="Play (hero)" aria-label={label}>{cover}</button>
        : <a className="lx-hero__media" href={lessonUrl(explainer)} target="_blank" rel="noopener" data-analytics-action="Play (hero)" aria-label={label}>{cover}</a>}
    <h3 className="lx-hero__title">{explainer.title}</h3>
  </div>;
}
