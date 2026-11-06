'use client';

import { useEffect, useMemo, useState } from 'react';
import { fallbackVideos } from '@/components/data';
import { type YouTubeVideo as Video } from '@/components/youtubeVideos';
import { VideoPlayerDialog } from './VideoPlayerDialog';

type Kind = 'shorts' | 'landscape';
type Format = 'all' | Kind;

const PAGE_SIZE: Record<Kind, number> = { shorts: 8, landscape: 6 };

// Shown in the hero until the live playlist arrives.
const HERO_PLACEHOLDER: Video = {
  id: 'uNCc8UCsYfE',
  title: 'AI Can Now Improve Another AI. What Happens Next?',
  category: 'AI explainer',
  thumbnail: 'https://i.ytimg.com/vi/uNCc8UCsYfE/maxresdefault.jpg'
};

function cleanTitle(title: string) {
  return title.replace(/(?:^|\s)#[\w.-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

async function loadPlaylist(type: 'shorts' | 'workflows', signal: AbortSignal) {
  const response = await fetch(`/api/youtube?type=${type}&limit=250`, { signal });
  if (!response.ok) throw new Error(`${type} unavailable`);
  const data = await response.json();
  if (!Array.isArray(data.videos)) return [];
  return (data.videos as Video[])
    .map(video => ({ ...video, title: cleanTitle(video.title) }))
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
}

function LaunchButton({ video, kind, lazy = true }: { video: Video; kind: Kind; lazy?: boolean }) {
  return <button className="video-launch" data-video-id={video.id} data-video-format={kind} data-video-title={video.title} aria-label={`Play ${video.title}`}>
    {video.thumbnail && <img src={video.thumbnail} alt={video.title} loading={lazy ? 'lazy' : undefined} />}
    <span className="play-button" aria-hidden="true">▶</span>
    {lazy && video.duration && <span className="duration">{video.duration}</span>}
  </button>;
}

function VideoCard({ video, kind }: { video: Video; kind: Kind }) {
  return <article className="library-video">
    <LaunchButton video={video} kind={kind} />
    <div className="library-video-meta">
      <span>{kind === 'shorts' ? 'AI SHORT' : 'AI EXPLAINER'}</span>
      {video.publishedAt && <time dateTime={video.publishedAt}>{video.publishedAt.slice(0, 10)}</time>}
    </div>
    <h3>{video.title}</h3>
  </article>;
}

const FILTERS: { key: Format; label: string }[] = [
  { key: 'all', label: 'All videos' },
  { key: 'shorts', label: 'Shorts' },
  { key: 'landscape', label: 'Landscape explainers' }
];

export function VideoLibrary() {
  const [shorts, setShorts] = useState<Video[]>(fallbackVideos);
  const [landscape, setLandscape] = useState<Video[]>([]);
  const [format, setFormat] = useState<Format>('all');
  const [query, setQuery] = useState('');
  const [limits, setLimits] = useState(PAGE_SIZE);

  useEffect(() => {
    const controller = new AbortController();
    loadPlaylist('shorts', controller.signal).then(videos => { if (videos.length) setShorts(videos); }).catch(() => undefined);
    loadPlaylist('workflows', controller.signal).then(videos => { if (videos.length) setLandscape(videos); }).catch(() => undefined);
    return () => controller.abort();
  }, []);

  const term = query.trim().toLowerCase();
  const matches = useMemo(() => ({
    shorts: shorts.filter(video => video.title.toLowerCase().includes(term)),
    landscape: landscape.filter(video => video.title.toLowerCase().includes(term))
  }), [shorts, landscape, term]);

  const showShorts = (format === 'all' || format === 'shorts') && matches.shorts.length > 0;
  const showLandscape = (format === 'all' || format === 'landscape') && matches.landscape.length > 0;
  const total = (format === 'landscape' ? 0 : matches.shorts.length) + (format === 'shorts' ? 0 : matches.landscape.length);
  const hero = landscape[0] ?? HERO_PLACEHOLDER;

  function search(value: string) {
    setQuery(value);
    setLimits(PAGE_SIZE);
  }

  return <>
    <section className="inner-hero video-page-hero unified-hero">
      <div className="container video-hero-grid unified-hero-grid">
        <div>
          <div className="eyebrow"><span className="section-dash" />WATCH. UNDERSTAND. TRY IT.</div>
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Big AI ideas.</span>
            <span className="hero-title-line"><span className="hero-title-highlight">Short videos.</span></span>
            <span className="hero-title-line">Clear explainers.</span>
          </h1>
          <p>Shorts and explainers on AI, work and putting learning into practice.</p>
          <div className="inner-hero-actions">
            <a className="button" href="#shorts">Explore the videos</a>
            <a className="text-link" href="https://www.youtube.com/@Gaurav-NudgeableAI" target="_blank" rel="noopener">Subscribe on YouTube</a>
          </div>
        </div>
        <div className="video-hero-art">
          <LaunchButton video={hero} kind="landscape" lazy={false} />
          <span className="hero-video-caption">One useful idea. A few minutes.</span>
        </div>
      </div>
    </section>
    <section className="section video-library">
      <div className="container">
        <div className="library-toolbar">
          <div className="filter-buttons" role="group" aria-label="Filter video formats">
            {FILTERS.map(filter => <button key={filter.key} className={`filter-chip${format === filter.key ? ' selected' : ''}`} aria-pressed={format === filter.key} onClick={() => setFormat(filter.key)}>{filter.label}</button>)}
          </div>
          <label className="library-search">
            <span>Search videos</span>
            <input id="video-search" type="search" placeholder="Search videos…" autoComplete="off" value={query} onChange={event => search(event.target.value)} />
          </label>
        </div>
        <div id="video-status" className="library-status" role="status">{total} video{total === 1 ? '' : 's'}{term ? ` matching “${query.trim()}”` : ''}</div>
        <section className="video-format-section" id="shorts" hidden={!showShorts}>
          <div className="format-heading">
            <div><span className="eyebrow">A LITTLE PERSPECTIVE</span><h2>AI <span className="serif-word">Shorts.</span></h2></div>
            <span className="format-badge">PORTRAIT · SHORTS</span>
          </div>
          <div className="shorts-grid">{matches.shorts.slice(0, limits.shorts).map(video => <VideoCard key={video.id} video={video} kind="shorts" />)}</div>
          <div className="load-more-wrap">
            <button className="button button-outline" hidden={matches.shorts.length <= limits.shorts} onClick={() => setLimits(value => ({ ...value, shorts: value.shorts + PAGE_SIZE.shorts }))}>Show more Shorts</button>
          </div>
        </section>
        <section className="video-format-section" id="landscape" hidden={!showLandscape}>
          <div className="format-heading">
            <div><span className="eyebrow">TAKE A CLOSER LOOK</span><h2>AI <span className="serif-word">explainers.</span></h2></div>
            <span className="format-badge">LANDSCAPE · 16:9</span>
          </div>
          <div className="landscape-grid">{matches.landscape.slice(0, limits.landscape).map(video => <VideoCard key={video.id} video={video} kind="landscape" />)}</div>
          <div className="load-more-wrap">
            <button className="button button-outline" hidden={matches.landscape.length <= limits.landscape} onClick={() => setLimits(value => ({ ...value, landscape: value.landscape + PAGE_SIZE.landscape }))}>Show more explainers</button>
          </div>
        </section>
        <p className="empty-results" id="video-empty" hidden={total !== 0}>No videos match your search. Try another keyword.</p>
      </div>
    </section>
    <VideoPlayerDialog />
  </>;
}
