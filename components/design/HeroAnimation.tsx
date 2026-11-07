// The plan animation in the homepage and /learn heroes. lib/design/fluency.ts wires up the pause button.
export function HeroAnimation({ className }: { className: string }) {
  return <div className={`hero-art ${className}`}>
    <div className="fluency-animation-frame">
      <iframe id="fluency-animation" src="/assets/ai-learning-plan-animation.html" title="How your AI fluency plan works: choose topics, receive explainers on WhatsApp or email, and track completion" sandbox="allow-scripts allow-same-origin" loading="eager"></iframe>
    </div>
    <button className="fluency-animation-control" type="button" aria-controls="fluency-animation" aria-pressed="false">Pause animation</button>
  </div>;
}
