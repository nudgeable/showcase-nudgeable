// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initCommon() {
const menuButton=document.querySelector('.menu-toggle');
  const menu=document.getElementById('mobile-nav');
  const submenuButton=document.querySelector('.submenu-toggle');
  const submenu=document.getElementById('teams-submenu');
  function closeMenus(){
    if(menu){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}
    if(submenu){submenu.hidden=true;submenuButton.setAttribute('aria-expanded','false');}
  }
  menuButton?.addEventListener('click',()=>{const open=menu.hidden;closeMenus();menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
  submenuButton?.addEventListener('click',()=>{const open=submenu.hidden;submenu.hidden=!open;submenuButton.setAttribute('aria-expanded',String(open));});
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenus));
  document.addEventListener('click',event=>{if(!event.target.closest('.nav-group')&&submenu){submenu.hidden=true;submenuButton.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(submenu&&!submenu.hidden)submenuButton.focus();closeMenus();}});

  const completionButton=document.getElementById('complete-action');
  completionButton?.addEventListener('click',()=>{
    const done=completionButton.getAttribute('aria-pressed')!=='true';
    completionButton.setAttribute('aria-pressed',String(done));
    completionButton.textContent=done?'✓ Completed':'Mark complete';
    const feedback=document.getElementById('completion-feedback');
    if(feedback)feedback.hidden=!done;
  });

  document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{const select=document.getElementById('interest');if(select)select.value=link.dataset.interest;}));
  document.getElementById('contact-form')?.addEventListener('submit',async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
    const button=form.querySelector('[type="submit"]'),status=document.getElementById('contact-status');
    button.disabled=true;button.textContent='Sending…';status.hidden=false;status.textContent='Sending your enquiry…';
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      const result=await response.json().catch(()=>null);
      if(!response.ok||result?.success===false)throw new Error('Submission failed');
      form.reset();status.textContent='Thank you. Your enquiry has been sent to the Nudgeable team.';
    }catch{status.textContent='Your enquiry could not be sent. Please try again or email team@nudgeable.ai.';}
    finally{button.disabled=false;button.textContent='Send enquiry';}
  });

  const player=document.getElementById('video-player');
  if(player){
    const embed=document.getElementById('video-embed');
    // Delegated so buttons rendered later from live data work too.
    document.addEventListener('click',event=>{
      const button=event.target.closest?.('.video-launch');if(!button)return;
      const id=button.dataset.videoId;if(!/^[\w-]{11}$/.test(id))return;
      player.classList.toggle('portrait-video-dialog',button.dataset.videoFormat==='shorts');document.getElementById('video-player-title').textContent=button.dataset.videoTitle;
      const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';frame.title=button.dataset.videoTitle;frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';embed.replaceChildren(frame);
      document.getElementById('watch-youtube').href='https://www.youtube.com/watch?v='+id;player.showModal();
    });
    function closePlayer(){embed.replaceChildren();player.close();}
    document.getElementById('close-video').addEventListener('click',closePlayer);player.addEventListener('close',()=>embed.replaceChildren());
    player.addEventListener('click',event=>{if(event.target===player){const r=player.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closePlayer();}});
  }
}
