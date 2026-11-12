'use client';

import { useEffect, useState } from 'react';
import type { Explainer } from '@/lib/learnCatalog';
import { lessonUrl } from './ExplainerCard';

const PLAY_HERO_EVENT = 'nudgeable:play-hero';

// "▶ Watch · 3:04" beside the hero headline: plays the featured video in the card next to it
export function HeroWatchButton({ duration }: { duration: string }) {
  return <button className="hero-watch" type="button" data-analytics-action="Watch (hero button)"
    onClick={() => dispatchEvent(new Event(PLAY_HERO_EVENT))}>
    <i aria-hidden="true" />{`Watch · ${duration}`}
  </button>;
}

// The homepage hero's featured video, as in the 12 Nov 2026 design: a "Most watched" badge, the
// thumbnail with a yellow "Play 1:52" pill, and the title under it. Play swaps the thumbnail for the
// video, playing in place; a lesson with no playable video (a guide or walkthrough) opens on Learn.
export function HeroExplainer({ explainer }: { explainer: Explainer }) {
  const [playing, setPlaying] = useState(false);
  const playable = Boolean(explainer.previewUrl || explainer.youTubeId);
  const label = `Play ${explainer.title}, ${explainer.duration}`;

  // The hero's "Watch · 3:04" button (HeroWatchButton) plays this video too
  useEffect(() => {
    const play = () => {
      if (playable) setPlaying(true);
      else window.open(lessonUrl(explainer), '_blank', 'noopener');
    };
    addEventListener(PLAY_HERO_EVENT, play);
    return () => removeEventListener(PLAY_HERO_EVENT, play);
  }, [playable, explainer]);

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
