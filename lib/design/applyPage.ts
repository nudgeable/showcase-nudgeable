// @ts-nocheck -- Ported from the design's vanilla script. Runs once, after hydration, on plain server-rendered markup.

export function initApplyPage() {

 const complete=document.getElementById('apply-complete-demo');
 complete.addEventListener('click',()=>{
  const done=complete.getAttribute('aria-pressed')!=='true';
  complete.setAttribute('aria-pressed',String(done));complete.textContent=done?'✓ Completed':'✓ Mark complete';
  document.querySelector('#apply-phone-progress strong').textContent=done?'3 of 3 actions completed':'2 of 3 actions completed';
  document.getElementById('phone-progress-fill').style.width=done?'100%':'66.67%';
 });
 const tabs=[...document.querySelectorAll('[data-dashboard-tab]')];
 function selectTab(tab){tabs.forEach(button=>{const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!active;});}
 tabs.forEach(tab=>{
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let i=tabs.indexOf(tab);i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectTab(tabs[i]);tabs[i].focus();});
 });
 const people={
  aarav:{name:'Aarav',viewed:6,completed:5,actions:[['Ask a colleague to explain their view before offering your own.','Completed','Viewed: Day 1','Completed: Day 2 · WhatsApp'],['Give one piece of specific, useful feedback.','Completed','Viewed: Day 3','Completed: Day 4 · Email'],['Invite the quietest member to share their view.','Viewed','Viewed: Day 5','Completion not yet recorded']]},
  meera:{name:'Meera',viewed:4,completed:2,actions:[['Ask what support a team member needs this week.','Completed','Viewed: Day 1','Completed: Day 2 · WhatsApp'],['Pause and clarify the goal before responding to a difficult request.','Viewed','Viewed: Day 3','Completion not yet recorded'],['Ask one open question in your next team meeting.','Not viewed','Not yet viewed','Completion not yet recorded']]},
  dev:{name:'Dev',viewed:6,completed:6,actions:[['Recognize one specific contribution from a team member.','Completed','Viewed: Day 1','Completed: Day 1 · WhatsApp'],['Check understanding before moving to the next task.','Completed','Viewed: Day 3','Completed: Day 3 · Email'],['Ask for one suggestion to improve the team’s work.','Completed','Viewed: Day 5','Completed: Day 6 · WhatsApp']]}
 };
 const dialog=document.getElementById('apply-participant-dialog');let opener;
 document.querySelectorAll('[data-participant]').forEach(button=>button.addEventListener('click',()=>{
  opener=button;const person=people[button.dataset.participant];
  document.getElementById('apply-person-title').textContent=person.name;
  const content=document.getElementById('apply-person-content');
  content.innerHTML='<div class="person-detail-summary"><div><strong>6</strong><span>Actions planned</span></div><div><strong>'+person.viewed+'</strong><span>Actions viewed</span></div><div><strong>'+person.completed+'</strong><span>Completed</span></div></div><h3 class="person-actions-title">Recent actions · 3 of 6 shown</h3><ul class="person-actions">'+person.actions.map(([action,status,viewed,completed])=>'<li><strong>'+action+'</strong><div class="person-action-meta"><span class="participant-status '+(status==='Completed'?'active':'needs-support')+'">'+status+'</span><span>'+viewed+'</span><span>'+completed+'</span></div></li>').join('')+'</ul><button class="button button-outline person-support-button" id="preview-support-nudge" aria-expanded="false" aria-controls="person-support-preview">Preview support nudge</button><div class="person-support-preview" id="person-support-preview" hidden><h3>Example WhatsApp or email nudge</h3><p>Hi '+person.name+', how is your action plan going? If an action feels difficult to try at work, let’s find a smaller next step together.</p><small>Preview only. No message is sent from this page.</small></div>';
  document.getElementById('preview-support-nudge').addEventListener('click',event=>{const target=document.getElementById('person-support-preview');target.hidden=!target.hidden;event.currentTarget.setAttribute('aria-expanded',String(!target.hidden));});
  dialog.showModal();
 }));
 document.getElementById('close-apply-person').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
}
