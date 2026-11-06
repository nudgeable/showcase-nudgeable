'use client';

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Explainer, ExplainerArea } from '@/lib/learnCatalog';
import { LEARN_URL } from '@/lib/siteLinks';
import { ExplainerCard, ExplainerPreview, useHoverPreview } from './ExplainerCard';
import { FREE_MAX, MIN_PICKS, savePicks, usePicks } from './picks';

type TopicCopy = { icon: string; tone: string; tab: string; title: string; description: string };
type PageCopy = Record<string, TopicCopy>;

// This site's wording for each Learn category. A category added in Learn later uses Learn's own description.
const COPY: Record<'home' | 'learn', PageCopy> = {
  home: {
    understand: { icon: '✧', tone: 'purple', tab: 'Understand how AI works', title: 'First, let’s make AI make sense.', description: 'The ideas underneath the tools, one explainer at a time.' },
    daily: { icon: '▣', tone: 'green', tab: 'Put AI to practical use', title: 'Less busywork. More possibilities.', description: 'Practical guides for the tools and workflows you use every day.' },
    new: { icon: '✦', tone: 'orange', tab: 'Keep up with what changes', title: 'Meet the next thing you can try.', description: 'Explore agents, connected tools and new ways of working.' },
    research: { icon: '⌘', tone: 'blue', tab: 'Explore the bigger questions', title: 'Stay curious about the bigger picture.', description: 'Explore questions about AI’s impact on work and the world.' }
  },
  learn: {
    understand: { icon: '✧', tone: 'purple', tab: 'How AI works, one idea at a time', title: 'First, let’s make AI make sense.', description: 'The ideas underneath the tools, one explainer at a time.' },
    daily: { icon: '▣', tone: 'green', tab: 'Use AI in your everyday work', title: 'Put AI to work in your day.', description: 'Practical ways to use ChatGPT, Claude, Gemini and Copilot.' },
    new: { icon: '✦', tone: 'orange', tab: 'Latest launches and new capabilities', title: 'Keep up with what’s new in AI.', description: 'New models, launches and capabilities, explained simply.' },
    research: { icon: '⌘', tone: 'blue', tab: 'New studies, explained simply', title: 'Understand the research behind the headlines.', description: 'Interesting AI studies and findings, in plain language.' }
  }
};

const planUrl = (picks: string[]) => `${LEARN_URL}/plan/new?picks=${picks.join(',')}`;

export function ExplainerPlanner({ areas, page }: { areas: ExplainerArea[]; page: 'home' | 'learn' }) {
  const [open, setOpen] = useState(areas[0]?.key);
  const [notice, setNotice] = useState('');
  const stored = usePicks();
  const hover = useHoverPreview();
  const dialog = useRef<HTMLDialogElement>(null);

  const all = areas.flatMap(area => area.explainers);
  // Anything no longer in the catalogue drops out of the plan
  const picks = stored.filter(id => all.some(explainer => explainer.id === id));
  const chosen = picks.flatMap(id => all.filter(explainer => explainer.id === id));
  const area = areas.find(item => item.key === open) ?? areas[0];

  function pickTopic(key: string) {
    hover.close();
    setOpen(key);
  }

  // The category cards on /learn jump to their topic here
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element).closest?.<HTMLElement>('.learn-category-link[data-area]');
      if (link?.dataset.area) setOpen(link.dataset.area);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!area) return <p className="lx-empty">Explore every explainer on <a href={`${LEARN_URL}/`}>Nudgeable Learn</a>.</p>;

  const copy = COPY[page];
  const topic = copy[area.key];
  const videos = area.explainers;
  const allIn = videos.length > 0 && videos.every(video => picks.includes(video.id));
  const count = picks.length;

  function toggle(id: string) {
    if (picks.includes(id)) {
      setNotice('');
      return savePicks(picks.filter(pick => pick !== id));
    }
    if (count >= FREE_MAX) return setNotice(`That’s ${FREE_MAX}, the most for a free plan. Remove one to swap it in.`);
    setNotice('');
    savePicks([...picks, id]);
  }

  function toggleAll() {
    const ids = videos.map(video => video.id);
    if (allIn) {
      setNotice('');
      return savePicks(picks.filter(pick => !ids.includes(pick)));
    }
    const next = [...picks];
    let skipped = 0;
    for (const id of ids) {
      if (next.includes(id)) continue;
      if (next.length < FREE_MAX) next.push(id);
      else skipped += 1;
    }
    setNotice(skipped ? `That’s ${FREE_MAX}, the most for a free plan. ${skipped} ${area.label} explainer${skipped > 1 ? 's weren’t' : ' wasn’t'} added.` : '');
    savePicks(next);
  }

  function tabKeys(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = areas.findIndex(item => item.key === area.key);
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? areas.length - 1 : (index + (forward ? 1 : -1) + areas.length) % areas.length;
    pickTopic(areas[nextIndex].key);
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-area="${areas[nextIndex].key}"]`)?.focus();
  }

  function downloadPicks() {
    const list = chosen.map((explainer: Explainer, index) => `${index + 1}. ${explainer.title}`).join('\n');
    const content = `MY NUDGEABLE LEARNING PICKS\nA little learning. Every day.\n\n${list}\n\nContinue at ${planUrl(picks)}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-nudgeable-learning-plan.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const helper = notice || (count === 0
    ? 'Free · 4 weeks · Up to 15 explainers'
    : count < MIN_PICKS
      ? `Pick at least ${MIN_PICKS} to make your plan.`
      : 'Your picks are saved on this device.');

  return <>
    <div className="planner-shell">
      <aside className="topic-sidebar">
        <span className="sidebar-label">CHOOSE YOUR TOPICS</span>
        <div className="topic-tabs" role="tablist" aria-label="Learning topics" aria-orientation="vertical" onKeyDown={tabKeys}>
          {areas.map(item => {
            const on = item.key === area.key;
            const words = copy[item.key];
            return <button key={item.key} className={`topic-tab${on ? ' selected' : ''}`} role="tab" id={`tab-${item.key}`} data-area={item.key} aria-selected={on} aria-controls="lesson-panel" tabIndex={on ? 0 : -1} onClick={() => pickTopic(item.key)}>
              <span className={`topic-icon ${words?.tone ?? 'purple'}`}>{words?.icon ?? '✦'}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{words?.tab ?? item.description}</small>
              </span>
            </button>;
          })}
        </div>
      </aside>
      <div className="lesson-panel" id="lesson-panel" role="tabpanel" aria-labelledby={`tab-${area.key}`}>
        <div className="panel-heading">
          <div>
            <h3 id="topic-title">{topic?.title ?? area.label}</h3>
            <p id="topic-description">{topic?.description ?? area.description}</p>
          </div>
          {videos.length > 0 && <button id="add-topic" className="text-button" onClick={toggleAll} aria-pressed={allIn}>
            {allIn ? `Remove all ${videos.length} ` : `Add all ${videos.length} `}
            <span>{allIn ? '−' : '＋'}</span>
          </button>}
        </div>
        <ul className="lesson-grid lx-grid">
          {videos.map(explainer => <ExplainerCard
            key={explainer.id}
            explainer={explainer}
            picked={picks.includes(explainer.id)}
            under={hover.popped?.explainer.id === explainer.id}
            hover={hover}
            onToggle={() => toggle(explainer.id)}
          />)}
        </ul>
        {area.comingSoon > 0 && <p className="coming-soon-note">+ {area.comingSoon} more coming soon</p>}
      </div>
      <div className="plan-summary">
        <div>
          <div className="summary-label">
            <span className="summary-dot" />
            <strong id="plan-count" aria-live="polite">{count} of {FREE_MAX} explainers picked</strong>
          </div>
          <p id="plan-helper" role="status">{helper}</p>
          <div className="plan-delivery">
            <span className="delivery-icons">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.6a8.5 8.5 0 1 1 16.2-4.1Z" />
                <path d="M8 7.5c.6 3.7 2.6 5.8 6.5 7.3l1.6-1.9-2.7-1.3-.9.9c-1.6-.8-2.4-1.6-3-3.2l.9-.8L9 6.5Z" />
              </svg>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </span>
            <span>Your explainers, delivered on WhatsApp or email.</span>
          </div>
        </div>
        <div className="summary-actions">
          <button className="clear-plan" id="clear-plan" hidden={count === 0} onClick={() => { setNotice(''); savePicks([]); }}>Clear</button>
          <button className="button" id="save-plan" disabled={count < MIN_PICKS} onClick={() => dialog.current?.showModal()}>{'Make this my plan '}</button>
        </div>
      </div>
    </div>
    {hover.popped && <ExplainerPreview
      key={hover.popped.explainer.id}
      popped={hover.popped}
      picked={picks.includes(hover.popped.explainer.id)}
      hover={hover}
      onToggle={() => toggle(hover.popped!.explainer.id)}
    />}
    <dialog
      id="plan-dialog"
      ref={dialog}
      aria-labelledby="dialog-title"
      onClick={event => {
        if (event.target !== dialog.current) return;
        const box = dialog.current.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close();
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <button className="dialog-close" aria-label="Close plan" onClick={() => dialog.current?.close()}>✕</button>
      </div>
      <div className="dialog-icon">✦</div>
      <h2 id="dialog-title">A little learning.<br />Made for you.</h2>
      <p>Your picks come with you to Nudgeable Learn, where you set up your account and WhatsApp delivery.</p>
      <div className="saved-lessons" id="saved-lessons">
        {chosen.map((explainer, index) => <div key={explainer.id}><span>{String(index + 1).padStart(2, '0')}</span>{explainer.title}</div>)}
      </div>
      <div className="dialog-note">A free 4-week plan · Up to 15 explainers</div>
      <a className="button" href={planUrl(picks)}>{'Continue to Nudgeable Learn '}</a>
      <button id="download-plan" className="text-button" onClick={downloadPicks}>Download my picks</button>
    </dialog>
  </>;
}
