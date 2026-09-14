document.documentElement.classList.remove('no-js');
const menuButton=document.querySelector('[data-menu-toggle]');
const nav=document.querySelector('[data-nav]');
let menuAnimation;
function setMenu(open){
 menuAnimation?.cancel();
 menuButton?.setAttribute('aria-expanded',String(open));
 if(menuButton)menuButton.textContent=open?'Schließen −':'Menü +';
 if(open){
  nav.inert=false;
  nav.classList.add('is-open');
  menuAnimation=nav.animate([{opacity:0,clipPath:'inset(0 0 100% 0)'},{opacity:1,clipPath:'inset(0)'}],{duration:420,easing:'cubic-bezier(.2,.72,.2,1)'});
  [...nav.children].forEach((item,i)=>item.animate([{opacity:0,translate:'0 14px'},{opacity:1,translate:'0 0'}],{duration:400,delay:70+i*40,fill:'backwards',easing:'cubic-bezier(.2,.72,.2,1)'}));
 }else if(nav?.classList.contains('is-open')){
  if(nav.contains(document.activeElement))menuButton.focus();
  nav.inert=true;
  menuAnimation=nav.animate([{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -8px'}],{duration:180,easing:'ease-in'});
  menuAnimation.onfinish=()=>{nav.classList.remove('is-open');nav.inert=false;};
 }
}
function closeMenu(){setMenu(false);}
menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();menuButton.focus();}});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const before=new Map([...document.querySelectorAll('[data-category]:not([hidden])')].map(card=>[card,card.getBoundingClientRect()]));document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});const result=document.querySelector('[data-filter-status]');if(result)result.textContent=`${document.querySelectorAll('[data-category]:not([hidden])').length} Projekte angezeigt.`;document.dispatchEvent(new CustomEvent('fpmc:filter',{detail:{before}}));}));
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`;iframe.title=button.dataset.title||'Musikvideo';iframe.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';const parent=button.parentElement;parent.replaceChildren(iframe);iframe.focus();}));
const contactForm=document.querySelector('[data-contact-form]');
if(contactForm){const preset=new URLSearchParams(location.search).get('projekt');if(preset){const select=contactForm.elements.projekt;if([...select.options].some(o=>o.value===preset))select.value=preset;}
const offerField=contactForm.querySelector('[data-offer-field]'),offerSelect=contactForm.elements.paket;
function updateOffers(){const type=contactForm.elements.projekt.value;const applicable=['Website','Werbeclips'].includes(type);offerField.hidden=!applicable;offerSelect.disabled=!applicable;[...offerSelect.options].forEach(option=>{const fits=!option.dataset.project||option.dataset.project===type;option.hidden=!fits;option.disabled=!fits;});if(offerSelect.selectedOptions[0]?.disabled)offerSelect.value='';}
updateOffers();const offerPreset=new URLSearchParams(location.search).get('paket');if(offerPreset&&[...offerSelect.options].some(option=>option.value===offerPreset&&!option.disabled))offerSelect.value=offerPreset;
contactForm.elements.projekt.addEventListener('change',updateOffers);
const invalidateDraft=()=>{const draft=document.querySelector('[data-draft]');draft.hidden=true;draft.querySelector('[role=status]').textContent='';};contactForm.addEventListener('input',invalidateDraft);contactForm.addEventListener('change',invalidateDraft);
contactForm.addEventListener('submit',e=>{e.preventDefault();if(!contactForm.reportValidity())return;const data=new FormData(contactForm);const name=String(data.get('name')).trim(),email=String(data.get('email')).trim();if(!name){contactForm.elements.name.setCustomValidity('Bitte gib deinen Namen ein.');contactForm.elements.name.reportValidity();return;}const type=data.get('projekt')||'Projektidee';const body=`Hallo FPMC,\n\nich möchte mit euch über ein Projekt sprechen.\n\nProjekt: ${type}\n${data.get('paket')?'Angebot: '+data.get('paket')+'\n':''}Name: ${name}\nE-Mail: ${email}\n${data.get('firma')?'Firma / Artist: '+data.get('firma')+'\n':''}${data.get('termin')?'Zeitraum: '+data.get('termin')+'\n':''}\n${data.get('nachricht')||''}\n\nViele Grüße\n${name}`;const draft=document.querySelector('[data-draft]');draft.querySelector('pre').textContent=body;draft.querySelector('[data-mail-link]').href=`mailto:hello@fpmc.house?subject=${encodeURIComponent('Projektanfrage · '+type)}&body=${encodeURIComponent(body)}`;draft.hidden=false;draft.querySelector('[data-draft-heading]').focus();draft.scrollIntoView({behavior:'smooth',block:'center'});});contactForm.elements.name.addEventListener('input',()=>contactForm.elements.name.setCustomValidity(''));}
document.querySelector('[data-copy-draft]')?.addEventListener('click',async()=>{const draft=document.querySelector('[data-draft]'),text=draft.querySelector('pre').textContent,status=draft.querySelector('[role=status]');try{await navigator.clipboard.writeText(text);if(!draft.hidden&&draft.querySelector('pre').textContent===text)status.textContent='Text kopiert. Du kannst ihn in deine E-Mail einfügen.';}catch{if(!draft.hidden&&draft.querySelector('pre').textContent===text)status.textContent='Bitte markiere den Nachrichtentext und kopiere ihn manuell.';}});

// Local set footage starts in view. Manual playback controls remain available.
document.querySelectorAll('[data-motion-src]').forEach(video=>{
  const toggle=video.parentElement.querySelector('[data-motion-toggle]');
  let userPaused=false;
  let inView=false;
  const load=()=>{if(!video.getAttribute('src')){video.src=video.dataset.motionSrc;video.load();}};
  const update=()=>{const playing=!video.paused;toggle.textContent=playing?'Bewegtbild pausieren':'Bewegtbild abspielen';toggle.setAttribute('aria-label',playing?'Bewegtbild pausieren':'Bewegtbild abspielen');};
  const play=()=>{load();video.play().then(update).catch(update);};
  toggle.hidden=false;
  toggle.addEventListener('click',()=>{if(video.paused){userPaused=false;play();}else{userPaused=true;video.pause();}});
  video.addEventListener('play',update);video.addEventListener('pause',update);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!userPaused)play();else video.pause();},{threshold:.15});observer.observe(video);}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(inView&&!userPaused)play();});
});
