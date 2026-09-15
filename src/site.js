document.documentElement.classList.remove('no-js');
const menuButton=document.querySelector('[data-menu-toggle]');
const nav=document.querySelector('[data-nav]');
const mobileNavigation=window.matchMedia('(max-width: 1024px)');
const siteHeader=document.querySelector('.header');
if(siteHeader){
 const measureHeader=()=>document.documentElement.style.setProperty('--header-size',`${siteHeader.getBoundingClientRect().height}px`);
 measureHeader();
 if('ResizeObserver' in window){
  const headerSize=new ResizeObserver(measureHeader);
  headerSize.observe(siteHeader);
 }
}
let menuAnimation;
function setMenu(open,immediate=false){
 if(!nav||!menuButton)return;
 open=open&&mobileNavigation.matches;
 menuAnimation?.cancel();
 nav.querySelectorAll('a').forEach(item=>item.getAnimations().forEach(animation=>animation.cancel()));
 menuButton.setAttribute('aria-expanded',String(open));
 menuButton.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
 document.documentElement.classList.toggle('menu-is-open',open);
 if(immediate){nav.classList.toggle('is-open',open);nav.inert=false;return;}
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
document.addEventListener('pointerdown',event=>{
 if(menuButton?.getAttribute('aria-expanded')==='true'&&!event.target.closest('.header'))closeMenu();
});
document.addEventListener('focusin',event=>{
 if(menuButton?.getAttribute('aria-expanded')==='true'&&!event.target.closest('.header'))closeMenu();
});
mobileNavigation.addEventListener('change',()=>{
 const active=document.activeElement;
 const focusWasInNav=nav?.contains(active);
 const focusWasOnMobileControl=active===menuButton||active?.classList.contains('header-quick');
 setMenu(false,true);
 if(mobileNavigation.matches&&focusWasInNav)menuButton?.focus();
 else if(!mobileNavigation.matches&&focusWasOnMobileControl)nav?.querySelector('a')?.focus();
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{if(button.getAttribute('aria-pressed')==='true')return;const before=new Map([...document.querySelectorAll('[data-category]:not([hidden])')].map(card=>{const rect=card.getBoundingClientRect();return [card,{left:rect.left,top:rect.top,opacity:Number(getComputedStyle(card).opacity)}];}));document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});document.querySelector('.project-grid')?.classList.toggle('is-filtered',button.dataset.filter!=='all');const result=document.querySelector('[data-filter-status]');if(result)result.textContent=`${document.querySelectorAll('[data-category]:not([hidden])').length} Projekte angezeigt.`;document.dispatchEvent(new CustomEvent('fpmc:filter',{detail:{before}}));}));
const contactForm=document.querySelector('[data-contact-form]');
if(contactForm){contactForm.addEventListener('invalid',event=>{const group=event.target.closest('details');if(group)group.open=true;},true);const preset=new URLSearchParams(location.search).get('projekt');if(preset){const select=contactForm.elements.projekt;if([...select.options].some(o=>o.value===preset))select.value=preset;}
const offerField=contactForm.querySelector('[data-offer-field]'),offerSelect=contactForm.elements.paket;
function updateOffers(){const type=contactForm.elements.projekt.value;const applicable=['Website','Werbeclips'].includes(type);offerField.hidden=!applicable;offerSelect.disabled=!applicable;[...offerSelect.options].forEach(option=>{const fits=!option.dataset.project||option.dataset.project===type;option.hidden=!fits;option.disabled=!fits;});if(offerSelect.selectedOptions[0]?.disabled)offerSelect.value='';}
updateOffers();const offerPreset=new URLSearchParams(location.search).get('paket');if(offerPreset&&[...offerSelect.options].some(option=>option.value===offerPreset&&!option.disabled))offerSelect.value=offerPreset;
contactForm.elements.projekt.addEventListener('change',updateOffers);
const invalidateDraft=()=>{const draft=document.querySelector('[data-draft]');draft.hidden=true;draft.querySelector('[role=status]').textContent='';};contactForm.addEventListener('input',invalidateDraft);contactForm.addEventListener('change',invalidateDraft);
contactForm.addEventListener('submit',e=>{e.preventDefault();if(!contactForm.reportValidity())return;const data=new FormData(contactForm);const name=String(data.get('name')).trim(),email=String(data.get('email')||'').trim();if(!name){contactForm.elements.name.setCustomValidity('Bitte gib deinen Namen ein.');contactForm.elements.name.reportValidity();return;}const type=data.get('projekt')||'Projektidee';const body=`Hallo FPMC,\n\nich möchte mit euch über ein Projekt sprechen.\n\nProjekt: ${type}\n${data.get('paket')?'Angebot: '+data.get('paket')+'\n':''}Name: ${name}\n${email?'Antwortadresse: '+email+'\n':''}${data.get('firma')?'Firma / Artist: '+data.get('firma')+'\n':''}${data.get('termin')?'Zeitraum: '+data.get('termin')+'\n':''}\n${data.get('nachricht')||''}\n\nViele Grüße\n${name}`;const draft=document.querySelector('[data-draft]');draft.querySelector('pre').textContent=body;draft.querySelector('[data-mail-link]').href=`mailto:hello@fpmc.house?subject=${encodeURIComponent('Projektanfrage · '+type)}&body=${encodeURIComponent(body)}`;draft.hidden=false;const heading=draft.querySelector('[data-draft-heading]');heading.focus({preventScroll:true});heading.scrollIntoView({behavior:'smooth',block:'start'});});contactForm.elements.name.addEventListener('input',()=>contactForm.elements.name.setCustomValidity(''));}
document.querySelector('[data-copy-draft]')?.addEventListener('click',async()=>{const draft=document.querySelector('[data-draft]'),text=draft.querySelector('pre').textContent,status=draft.querySelector('[role=status]');try{await navigator.clipboard.writeText(text);if(!draft.hidden&&draft.querySelector('pre').textContent===text)status.textContent='Text kopiert. Du kannst ihn in deine E-Mail einfügen.';}catch{if(!draft.hidden&&draft.querySelector('pre').textContent===text)status.textContent='Bitte markiere den Nachrichtentext und kopiere ihn manuell.';}});


window.addEventListener('pageshow',event=>{if(event.persisted)setMenu(false,true);});

// Feedback never intercepts a document navigation or adds an artificial delay.
let navigationTimer;
let navigationReset;
const navigationStatus=document.createElement('span');
navigationStatus.className='sr-only';
navigationStatus.setAttribute('role','status');
document.body.append(navigationStatus);
function clearNavigation(){
 clearTimeout(navigationTimer);clearTimeout(navigationReset);
 delete document.documentElement.dataset.navigation;
 navigationStatus.textContent='';
}
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href]');
 if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
 const url=new URL(anchor.href);
 if(url.origin!==location.origin||url.pathname===location.pathname&&url.search===location.search||/\.[a-z0-9]+$/i.test(url.pathname)&&!url.pathname.endsWith('.html'))return;
 clearNavigation();
 navigationTimer=setTimeout(()=>{
  document.documentElement.dataset.navigation='loading';
  navigationStatus.textContent='Seite wird geladen.';
 },180);
 navigationReset=setTimeout(clearNavigation,15000);
});
window.addEventListener('pagehide',clearNavigation);
window.addEventListener('pageshow',clearNavigation);
window.addEventListener('pageswap',event=>{
 event.viewTransition?.ready.catch(()=>{});
 clearNavigation();
 setMenu(false,true);
});
window.addEventListener('pagereveal',event=>{
 event.viewTransition?.ready.catch(()=>{});
});
