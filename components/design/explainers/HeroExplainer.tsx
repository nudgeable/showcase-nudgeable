'use client';

import { useState } from 'react';
import type { Explainer } from '@/lib/learnCatalog';
import { PlayIcon, lessonUrl } from './ExplainerCard';

// The homepage hero's featured video: the first featured explainer's thumbnail, with Play and its length
// in the corner. Play swaps the thumbnail for the video, playing in place; a lesson with no playable
// video (a guide or walkthrough) opens on Learn instead.
export function HeroExplainer({ explainer }: { explainer: Explainer }) {
  const [playing, setPlaying] = useState(false);
  const playable = Boolean(explainer.previewUrl || explainer.youTubeId);
  const label = `Play ${explainer.title}, ${explainer.duration}`;

  const cover = <>
    {explainer.thumbnail ? <img src={explainer.thumbnail} alt="" /> : <span className="lx-card__blank" />}
    <span className="lx-hero__play" aria-hidden="true">
      <PlayIcon />
      Play
      <span className="lx-hero__time">{explainer.duration}</span>
    </span>
  </>;

  return <div className="hero-art lx-hero" data-analytics-explainer={explainer.title}>
    {playing
      ? <div className="lx-hero__media is-playing">
        {explainer.previewUrl
          ? <video src={explainer.previewUrl} poster={explainer.thumbnail ?? undefined} controls autoPlay playsInline aria-label={explainer.title} />
          : <iframe src={`https://www.youtube-nocookie.com/embed/${explainer.youTubeId}?autoplay=1&rel=0`} title={explainer.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
      </div>
      : playable
        ? <button className="lx-hero__media" type="button" onClick={() => setPlaying(true)} data-analytics-action="Play (hero)" aria-label={label}>{cover}</button>
        : <a className="lx-hero__media" href={lessonUrl(explainer)} target="_blank" rel="noopener" data-analytics-action="Play (hero)" aria-label={label}>{cover}</a>}
  </div>;
}
