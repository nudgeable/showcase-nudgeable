// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.
import { LEARN_URL } from '@/lib/siteLinks';

export function initHomePlan() {
const lessons = [
  {id:'genai',topic:'foundations',title:'What Is Generative AI?',image:1,duration:'1:46',level:'Starter'},
  {id:'nextword',topic:'foundations',title:'How AI Predicts the Next Word',image:2,duration:'1:55',level:'Starter'},
  {id:'tokens',topic:'foundations',title:'What Are Tokens?',image:3,duration:'1:24',level:'Starter'},
  {id:'context',topic:'foundations',title:'Why AI Stops Following Your Instructions',image:4,duration:'2:07',level:'Starter'},
  {id:'voice',topic:'foundations',title:'How Does AI Talk With You?',image:5,duration:'1:51',level:'Starter'},
  {id:'images',topic:'foundations',title:'How AI Makes Images and Videos',image:6,duration:'1:52',level:'Starter'},
  {id:'projects',topic:'work',title:'How AI Projects Keep Your Work and Context Together',symbol:'▣',label:'Projects',level:'Practical guide'},
  {id:'chatwork',topic:'work',title:'Chat vs Work: Which One Should You Use?',symbol:'✦',label:'Chat vs Work',level:'Practical guide'},
  {id:'apps',topic:'work',title:'How AI Connects to Your Apps',symbol:'⌘',label:'Connected apps',level:'Practical guide'},
  {id:'api',topic:'work',title:'What Is an API?',symbol:'{ }',label:'APIs, explained',level:'Practical guide'},
  {id:'workagent',topic:'new',title:'What Is a Work Agent?',symbol:'✳',label:'Work agents',level:'Practical guide'},
  {id:'codingagent',topic:'new',title:'What Is a Coding Agent?',symbol:'⌘',label:'Coding agents',level:'Practical guide'},
  {id:'externaltools',topic:'new',title:'How AI Uses External Tools',symbol:'✦',label:'AI + tools',level:'Practical guide'},
  {id:'risk',topic:'research',title:'How Should We Think About Long-Term AI Risk?',symbol:'✧',label:'The bigger questions',level:'Practical guide'},
  {id:'ainative',topic:'research',title:'What Changes When a Company Becomes AI-Native?',symbol:'✦',label:'AI-native work',level:'Practical guide'}
];
const topicInfo = {
  foundations:{title:'First, let’s make AI make sense.',description:'The ideas underneath the tools, one explainer at a time.',color:'#f0e8fc'},
  work:{title:'Less busywork. More possibilities.',description:'Practical guides for the tools and workflows you use every day.',color:'#e7f3e9'},
  new:{title:'Meet the next thing you can try.',description:'Explore agents, connected tools and new ways of working.',color:'#fff0e3'},
  research:{title:'Stay curious about the bigger picture.',description:'Explore questions about AI’s impact on work and the world.',color:'#e9f0fc'}
};
let selected = new Set();
try { const saved=JSON.parse(localStorage.getItem('nudgeable-homepage-plan')||'[]'); if(Array.isArray(saved))selected=new Set(saved.filter(id=>lessons.some(l=>l.id===id))); } catch {}
let activeTopic='foundations';
const grid=document.getElementById('lesson-grid');
let toastTimer;
function notify(message){const toast=document.getElementById('toast');toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,3500);}
function storePlan(){try{localStorage.setItem('nudgeable-homepage-plan',JSON.stringify([...selected]));}catch{}}
function render(){
 const info=topicInfo[activeTopic];
 document.getElementById('topic-title').textContent=info.title;
 document.getElementById('topic-description').textContent=info.description;
 document.getElementById('lesson-panel').setAttribute('aria-labelledby','tab-'+activeTopic);
 document.querySelectorAll('.topic-tab').forEach(tab=>{const active=tab.dataset.topic===activeTopic;tab.classList.toggle('selected',active);tab.setAttribute('aria-selected',String(active));});
 grid.replaceChildren();
 const visible=lessons.filter(l=>l.topic===activeTopic);
 visible.forEach(lesson=>{
  const card=document.createElement('article');card.className='lesson-card'+(selected.has(lesson.id)?' is-added':'');
  const image=document.createElement('div');image.className='lesson-image';
  if(lesson.image){const img=document.createElement('img');img.src='/assets/explainer-'+lesson.image+'.webp';img.alt=lesson.title;img.loading='lazy';image.append(img);const duration=document.createElement('span');duration.className='duration';duration.textContent=lesson.duration;image.append(duration);}
  else{const art=document.createElement('div');art.className='lesson-topic-art';art.style.background=info.color;const symbol=document.createElement('span');symbol.textContent=lesson.symbol;const label=document.createElement('small');label.textContent=lesson.label;art.append(symbol,label);image.append(art);}
  const content=document.createElement('div');content.className='lesson-card-content';const title=document.createElement('h4');title.textContent=lesson.title;const bottom=document.createElement('div');bottom.className='lesson-card-bottom';const level=document.createElement('span');level.className='level-tag';level.textContent=lesson.level;
  const button=document.createElement('button');button.className='add-lesson';button.setAttribute('aria-pressed',String(selected.has(lesson.id)));button.setAttribute('aria-label',(selected.has(lesson.id)?'Remove ':'Add ')+lesson.title+(selected.has(lesson.id)?' from plan':' to plan'));button.textContent=selected.has(lesson.id)?'✓ Added':'＋ Add to plan';button.addEventListener('click',()=>{if(selected.has(lesson.id))selected.delete(lesson.id);else selected.add(lesson.id);storePlan();render();grid.querySelector('[data-lesson="'+lesson.id+'"]').focus({preventScroll:true});});button.dataset.lesson=lesson.id;
  bottom.append(level,button);content.append(title,bottom);card.append(image,content);grid.append(card);
 });
 const allAdded=visible.every(l=>selected.has(l.id));const addTopic=document.getElementById('add-topic');addTopic.textContent=(allAdded?'Remove all ':'Add all ')+visible.length+(allAdded?' −':' ＋');
 document.getElementById('plan-count').textContent=selected.size+' of 15 '+(selected.size===1?'explainer':'explainers')+' picked';
 document.getElementById('plan-helper').textContent=selected.size?'Your picks are saved on this device.':'Free · 4 weeks · Up to 15 explainers';
 document.getElementById('save-plan').disabled=!selected.size;document.getElementById('clear-plan').hidden=!selected.size;
}
document.querySelectorAll('.topic-tab').forEach(tab=>{
 tab.addEventListener('click',()=>{activeTopic=tab.dataset.topic;render();});
 tab.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const tabs=[...document.querySelectorAll('.topic-tab')];let index=tabs.indexOf(tab);index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+tabs.length)%tabs.length;tabs[index].click();tabs[index].focus();});
});
document.getElementById('add-topic').addEventListener('click',()=>{const visible=lessons.filter(l=>l.topic===activeTopic);const remove=visible.every(l=>selected.has(l.id));visible.forEach(l=>remove?selected.delete(l.id):selected.add(l.id));storePlan();render();});
document.getElementById('clear-plan').addEventListener('click',()=>{selected.clear();storePlan();render();});
const dialog=document.getElementById('plan-dialog');
document.getElementById('save-plan').addEventListener('click',()=>{const saved=document.getElementById('saved-lessons');saved.replaceChildren();lessons.filter(l=>selected.has(l.id)).forEach((l,index)=>{const row=document.createElement('div');const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');row.append(number,document.createTextNode(l.title));saved.append(row);});dialog.showModal();});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
document.getElementById('download-plan').addEventListener('click',()=>{const content='MY NUDGEABLE LEARNING PICKS\nA little learning. Every day.\n\n'+lessons.filter(l=>selected.has(l.id)).map((l,i)=>(i+1)+'. '+l.title).join('\n')+'\n\nContinue at '+LEARN_URL+'/\n';const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='my-nudgeable-learning-plan.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
render();

const galleryImages=[...document.querySelectorAll('.gallery-image')];
const galleryLabels=['For an HR team','For senior leadership','For a manufacturing team','For fashion ecommerce','For customer experience','For a finance team','GenAI training'];
let photoIndex=0;let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function showPhoto(index){photoIndex=(index+galleryImages.length)%galleryImages.length;galleryImages.forEach((img,i)=>img.classList.toggle('current',i===photoIndex));document.getElementById('gallery-label').textContent=galleryLabels[photoIndex];document.getElementById('gallery-count').textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(galleryImages.length).padStart(2,'0');const nextIndex=(photoIndex+1)%galleryImages.length;const nextPhoto=document.getElementById('next-gallery-photo');nextPhoto.src=galleryImages[nextIndex].getAttribute('src');nextPhoto.alt=galleryImages[nextIndex].alt;document.getElementById('next-gallery-label').textContent=galleryLabels[nextIndex];}
function updatePause(){document.getElementById('pause-gallery').textContent=paused?'▶':'Ⅱ';document.getElementById('pause-gallery').setAttribute('aria-label',paused?'Play photo slideshow':'Pause photo slideshow');}
document.getElementById('previous-photo').addEventListener('click',()=>{showPhoto(photoIndex-1);paused=true;updatePause();});document.getElementById('next-photo').addEventListener('click',()=>{showPhoto(photoIndex+1);paused=true;updatePause();});document.getElementById('pause-gallery').addEventListener('click',()=>{paused=!paused;updatePause();});
let galleryVisible=false;new IntersectionObserver(entries=>{galleryVisible=entries[0].isIntersecting;}).observe(document.querySelector('.workshop-gallery'));
setInterval(()=>{if(!paused&&galleryVisible&&!document.hidden)showPhoto(photoIndex+1);},5000);updatePause();


}
