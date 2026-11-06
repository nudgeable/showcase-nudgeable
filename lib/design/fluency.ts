// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initFluency() {
const frame=document.getElementById('fluency-animation'),button=document.querySelector('.fluency-animation-control');if(!frame||!button)return;let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;const label=()=>{button.textContent=paused?'Replay animation':'Pause animation';button.setAttribute('aria-pressed',String(paused))};label();button.addEventListener('click',()=>{paused=!paused;frame.contentWindow.postMessage(paused?'pause-fluency':'play-fluency',location.origin);label()});document.addEventListener('visibilitychange',()=>{if(document.hidden)frame.contentWindow.postMessage('pause-fluency',location.origin);else if(!paused)frame.contentWindow.postMessage('play-fluency',location.origin)})
}
