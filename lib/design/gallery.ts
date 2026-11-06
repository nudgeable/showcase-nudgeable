// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initMasterclassGallery() {
const gallery=document.querySelector('.masterclass-gallery');if(!gallery)return;
 const images=[...gallery.querySelectorAll('.gallery-image')];
 const labels=['For an HR team','For senior leadership','For a manufacturing team','For fashion ecommerce','For customer experience','For a finance team'];
 let index=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,visible=false;
 const count=document.getElementById('gallery-count'),caption=document.getElementById('masterclass-photo-caption'),pause=document.getElementById('pause-gallery');
 function show(i){index=(i+images.length)%images.length;images.forEach((img,n)=>img.classList.toggle('current',n===index));count.textContent=String(index+1).padStart(2,'0')+' / '+String(images.length).padStart(2,'0');caption.textContent=labels[index];}
 function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play photo slideshow':'Pause photo slideshow');}
 document.getElementById('previous-photo').addEventListener('click',()=>{show(index-1);paused=true;updatePause();});
 document.getElementById('next-photo').addEventListener('click',()=>{show(index+1);paused=true;updatePause();});
 pause.addEventListener('click',()=>{paused=!paused;updatePause();});
 new IntersectionObserver(entries=>visible=entries[0].isIntersecting).observe(gallery);
 setInterval(()=>{if(visible&&!paused&&!document.hidden)show(index+1);},5000);updatePause();
}
