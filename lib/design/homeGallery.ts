// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initHomeGallery() {
const galleryImages=[...document.querySelectorAll('.gallery-image')];
const galleryLabels=['For an HR team','For senior leadership','For a manufacturing team','For fashion ecommerce','For customer experience','For a finance team','GenAI training'];
let photoIndex=0;let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function showPhoto(index){photoIndex=(index+galleryImages.length)%galleryImages.length;galleryImages.forEach((img,i)=>img.classList.toggle('current',i===photoIndex));document.getElementById('gallery-label').textContent=galleryLabels[photoIndex];document.getElementById('gallery-count').textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(galleryImages.length).padStart(2,'0');const nextIndex=(photoIndex+1)%galleryImages.length;const nextPhoto=document.getElementById('next-gallery-photo');nextPhoto.src=galleryImages[nextIndex].getAttribute('src');nextPhoto.alt=galleryImages[nextIndex].alt;document.getElementById('next-gallery-label').textContent=galleryLabels[nextIndex];}
function updatePause(){document.getElementById('pause-gallery').textContent=paused?'▶':'Ⅱ';document.getElementById('pause-gallery').setAttribute('aria-label',paused?'Play photo slideshow':'Pause photo slideshow');}
document.getElementById('previous-photo').addEventListener('click',()=>{showPhoto(photoIndex-1);paused=true;updatePause();});document.getElementById('next-photo').addEventListener('click',()=>{showPhoto(photoIndex+1);paused=true;updatePause();});document.getElementById('pause-gallery').addEventListener('click',()=>{paused=!paused;updatePause();});
let galleryVisible=false;new IntersectionObserver(entries=>{galleryVisible=entries[0].isIntersecting;}).observe(document.querySelector('.workshop-gallery'));
setInterval(()=>{if(!paused&&galleryVisible&&!document.hidden)showPhoto(photoIndex+1);},5000);updatePause();
}
