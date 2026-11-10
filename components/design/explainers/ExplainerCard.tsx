'use client';

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { describeSection } from '@/components/AnalyticsTracker';
import type { Explainer } from '@/lib/learnCatalog';
import { LEARN_URL } from '@/lib/siteLinks';

const HOVER_MS = 1000; // how long the pointer rests on a card before its preview opens
const PREVIEW_SECONDS = 10;

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const lessonUrl = (explainer: Explainer) => `${LEARN_URL}/lessons/${explainer.id}`;

const PlayIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>;
const EyeIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z" /></svg>;
const HeartIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.4C.4 8.4 2.3 4.5 6 4.5c2.2 0 3.6 1.2 4.5 2.6l1.5 2 1.5-2c.9-1.4 2.3-2.6 4.5-2.6 3.7 0 5.6 3.9 4 7.1C19.5 16.4 12 21 12 21z" /></svg>;

function Counts({ views, likes }: { views: number; likes: number }) {
  return <span className="lx-counts">
    <span title={`${views.toLocaleString('en-IN')} views`}><EyeIcon /> {compact.format(views)} views</span>
    <span title={`${likes.toLocaleString('en-IN')} likes`}><HeartIcon /> {compact.format(likes)}</span>
  </span>;
}

// section: where the card sits on the page, so clicks inside the floating
// preview (rendered into <body>) are still credited to that section.
type Popped = { explainer: Explainer; card: DOMRect; section: string | null };

// Resting a mouse on a card opens a larger preview; on touch a tap opens the lesson.
export function useHoverPreview() {
  const [popped, setPopped] = useState<Popped | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The preview is placed against the window, so anything that moves the card closes it
  useEffect(() => {
    if (!popped) return;
    const close = () => setPopped(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    addEventListener('scroll', close, { passive: true, capture: true });
    addEventListener('resize', close);
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('scroll', close, { capture: true });
      removeEventListener('resize', close);
      removeEventListener('keydown', onKey);
    };
  }, [popped]);

  useEffect(() => () => {
    clearTimeout(hoverTimer.current);
    clearTimeout(closeTimer.current);
  }, []);

  return {
    popped,
    close() {
      clearTimeout(hoverTimer.current);
      setPopped(null);
    },
    enterCard(event: ReactPointerEvent<HTMLElement>, explainer: Explainer) {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(closeTimer.current);
      clearTimeout(hoverTimer.current);
      const element = event.currentTarget;
      hoverTimer.current = setTimeout(() => setPopped({ explainer, card: element.getBoundingClientRect(), section: describeSection(element) }), HOVER_MS);
    },
    leaveCard() {
      clearTimeout(hoverTimer.current);
      closeTimer.current = setTimeout(() => setPopped(null), 120);
    },
    holdOpen() {
      clearTimeout(closeTimer.current);
    },
    cancelHover() {
      clearTimeout(hoverTimer.current);
    }
  };
}

export type HoverPreview = ReturnType<typeof useHoverPreview>;

export function ExplainerCard({ explainer, picked, under, hover, onToggle }: {
  explainer: Explainer;
  picked: boolean;
  under: boolean;
  hover: HoverPreview;
  onToggle: () => void;
}) {
  const href = lessonUrl(explainer);
  return <li
    className={`lx-card${picked ? ' is-on' : ''}${under ? ' is-under' : ''}`}
    onPointerEnter={event => hover.enterCard(event, explainer)}
    onPointerLeave={hover.leaveCard}
    data-analytics-explainer={explainer.title}
  >
    <a className="lx-card__media" data-analytics-action="Watch (thumbnail)" href={href} target="_blank" rel="noopener" aria-label={`Watch ${explainer.title}`}>
      {explainer.thumbnail ? <img src={explainer.thumbnail} alt="" loading="lazy" /> : <span className="lx-card__blank" />}
      <span className="lx-card__play"><PlayIcon /></span>
      <span className="lx-card__time">{explainer.duration}</span>
    </a>
    <div className="lx-card__copy">
      <h4><a href={href} target="_blank" rel="noopener" data-analytics-action="Watch (title)">{explainer.title}</a></h4>
      {explainer.summary && <p>{explainer.summary}</p>}
      <div className="lx-card__foot">
        <Counts views={explainer.views} likes={explainer.likes} />
        <button
          className="lx-card__add"
          type="button"
          aria-pressed={picked}
          aria-label={`${picked ? 'Remove from plan' : 'Add to plan'}: ${explainer.title}`}
          data-analytics-action={picked ? 'Remove from plan' : 'Add to plan'}
          onClick={onToggle}
          onPointerEnter={hover.cancelHover}
        >
          {picked ? '✓ Added' : 'Add to plan'}
        </button>
      </div>
    </div>
  </li>;
}

// The floating card: the video's first seconds on a muted loop, with Watch and Add to plan
export function ExplainerPreview({ popped, picked, hover, onToggle }: {
  popped: Popped;
  picked: boolean;
  hover: HoverPreview;
  onToggle: () => void;
}) {
  const { explainer, card } = popped;
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const [calm] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const canPlay = !calm && Boolean(explainer.previewUrl);

  // Centre it on the card, kept inside the window, then let it grow out of the card
  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const windowWidth = document.documentElement.clientWidth;
    const width = Math.min(windowWidth - 24, 520, Math.max(card.width * 1.5, 340));
    element.style.width = `${width}px`;
    const left = Math.max(12, Math.min(windowWidth - width - 12, card.left + card.width / 2 - width / 2));
    const top = Math.max(12, Math.min(innerHeight - element.offsetHeight - 12, card.top + card.height / 2 - element.offsetHeight / 2));
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    element.style.transformOrigin = `${card.left + card.width / 2 - left}px ${card.top + card.height / 2 - top}px`;
    const frame = requestAnimationFrame(() => element.classList.add('is-open'));
    return () => cancelAnimationFrame(frame);
  }, [card]);

  // Set here, not in the markup, so closing the preview also stops the download
  useEffect(() => {
    const player = video.current;
    if (!player || !explainer.previewUrl) return;
    player.src = explainer.previewUrl;
    player.play().catch(() => undefined); // the poster stays up if the browser refuses to play
    return () => {
      player.pause();
      player.removeAttribute('src');
      player.load();
    };
  }, [explainer.previewUrl]);

  function tick() {
    const player = video.current;
    if (!player) return;
    if (bar.current) bar.current.style.width = `${Math.min(100, (player.currentTime / PREVIEW_SECONDS) * 100)}%`;
    if (player.currentTime >= PREVIEW_SECONDS) player.currentTime = 0;
  }

  function toggleSound() {
    if (video.current) video.current.muted = sound;
    setSound(!sound);
  }

  return createPortal(<div ref={box} className={`lx-pop${picked ? ' is-on' : ''}`} onPointerEnter={hover.holdOpen} onPointerLeave={hover.leaveCard} data-analytics-explainer={explainer.title} data-analytics-section={`${popped.section || 'Explainers'} › Preview`}>
    <div className="lx-pop__media">
      {explainer.thumbnail && <img src={explainer.thumbnail} alt="" />}
      {canPlay && <video ref={video} className={playing ? 'is-playing' : ''} muted loop playsInline preload="auto" onPlaying={() => setPlaying(true)} onTimeUpdate={tick} aria-hidden="true" />}
      {canPlay && <span className="lx-pop__tag">{playing ? '● Preview' : 'Preview · loading'}</span>}
      {playing && <button className="lx-pop__sound" type="button" onClick={toggleSound} aria-pressed={sound} data-analytics-action={sound ? 'Mute preview' : 'Unmute preview'} aria-label={sound ? 'Mute preview' : 'Unmute preview'}>{sound ? '🔊' : '🔇'}</button>}
      <span className="lx-pop__bar"><i ref={bar} /></span>
    </div>
    <div className="lx-pop__copy">
      <h3>{explainer.title}</h3>
      {explainer.summary && <p>{explainer.summary}</p>}
      <div className="lx-pop__actions">
        <a className="button button-dark" href={lessonUrl(explainer)} target="_blank" rel="noopener" data-analytics-action="Watch (preview)">▶ Watch explainer</a>
        <button className={`button${picked ? ' button-outline' : ''}`} type="button" onClick={onToggle} aria-pressed={picked} data-analytics-action={picked ? 'Remove from plan (preview)' : 'Add to plan (preview)'}>{picked ? 'In your plan' : 'Add to plan'}</button>
      </div>
    </div>
  </div>, document.body);
}
