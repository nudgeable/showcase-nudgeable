// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initHomeStats() {

  const counters=[...document.querySelectorAll('.stat-counter[data-count]')];
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target,target=Number(el.dataset.count),duration=1500;
      let start;
      const tick=now=>{start??=now;const progress=Math.min((now-start)/duration,1),eased=1-Math.pow(1-progress,3);el.textContent=Math.round(target*eased).toLocaleString('en-US');if(progress<1)requestAnimationFrame(tick);};
      requestAnimationFrame(tick);observer.unobserve(el);
    });
  },{threshold:.65});
  counters.forEach(el=>observer.observe(el));
}
