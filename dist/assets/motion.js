/* One motion owner per element. Native document scrolling remains in control. */
(() => {
  const ease = 'cubic-bezier(.22,.75,.2,1)';
  const animate = (element, frames, options = {}) => element.animate(frames, {
    duration: 580, easing: ease, fill: 'backwards', ...options
  });
  const pending = new Map();
  const entrances = new Map();
  const groups = [
    ['.hero-copy h1, .page-heading h1, .service-hero-copy h1, .contact-editorial h1, .stage-content h1, .label-opening h1, .studio-opening-copy h1', 'title'],
    ['.hero-introduction, .page-intro, .service-hero-copy>p, .service-hero-copy>.actions, .contact-intro, .stage-introduction, .label-opening>p', 'intro'],
    ['.section-head h2, .home-studio-copy h2, .label-feature h2, .cta-copy h2, .studio-copy h2, .team-heading, .service-entry-copy h2, .service-introduction h2, .content-grid h2, .case-navigation h2, .release-copy h2', 'type'],
    ['.project-media, .service-entry-media, .studio-image, .motion-screen, .label-portrait, .video-container, .case-image, .web-case-image, .hero-film-image, .label-feature-image, .service-hero-media, .next-project-image, .release-artwork', 'image'],
    ['.team-card, .process-item, .price-card, .related-link, .fact, .service-overview-item, .studio-credits>span', 'row'],
    ['.prose>p, .section-head>p, .footer-top>*, .contact-address, .home-studio-copy>p, .studio-copy>p, .studio-opening-copy>p, .release-copy>p', 'copy']
  ];
  groups.forEach(([selector, kind]) => document.querySelectorAll(selector).forEach((element, index) => {
    if (!pending.has(element)) pending.set(element, {kind, index});
  }));
  const initialPosition = scrollY;
  const restored = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  // A script delivered late must never hide a heading the visitor has already read.
  const late = performance.now() > 1000 || restored || !!location.hash || initialPosition > 40;
  const initiallyVisible = new Set(late ? [...pending.keys()].filter(element => element.getBoundingClientRect().top < innerHeight) : []);
  let observer;
  function reveal(element) {
    const entry = pending.get(element);
    if (!entry || element.closest('[hidden]')) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    pending.delete(element);
    observer?.unobserve(element);
    element.dataset.revealed = 'true';
    const alreadyPassed = rect.bottom < 80;
    if (alreadyPassed || initiallyVisible.has(element)) return;
    const image = element.matches('img') ? element : element.querySelector('img');
    // The image loader owns the fade if pixels are still on their way.
    if (entry.kind === 'image' && image && (!image.complete || image.dataset.loadState === 'pending')) return;
    const delay = entry.kind === 'row' ? (entry.index % 3) * 35 : 0;
    const distance = entry.kind === 'image' ? 12 : entry.kind === 'type' ? 20 : 12;
    const effect = animate(element, [
      {opacity: entry.kind === 'image' ? .45 : 0, translate: '0 ' + distance + 'px'},
      {opacity: 1, translate: '0 0'}
    ], {duration: entry.kind === 'image' ? 650 : entry.kind === 'copy' ? 420 : 560, delay});
    entrances.set(element, effect);
    effect.onfinish = () => entrances.delete(element);
    effect.oncancel = () => entrances.delete(element);
  }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target);
    }), {threshold: 0, rootMargin: '0px 0px 50px 0px'});
    pending.forEach((_, element) => observer.observe(element));
  }
  document.addEventListener('focusin', event => {
    for (const [element] of pending) {
      if (element === event.target || element.contains(event.target)) {
        pending.delete(element);
        observer?.unobserve(element);
      }
    }
    for (const [element, animation] of entrances) {
      if (element === event.target || element.contains(event.target)) animation.finish();
    }
  });

  document.addEventListener('fpmc:filter', event => {
    const cards = [...document.querySelectorAll('[data-category]:not([hidden])')];
    // Finish descendant entrances before moving the parent card.
    cards.forEach(card => {
      card.getAnimations().forEach(animation => animation.cancel());
      entrances.forEach((animation, element) => { if (card.contains(element)) animation.finish(); });
      card.querySelectorAll('[data-revealed]').forEach(element => entrances.delete(element));
      for (const [element] of pending) {
        if (card.contains(element)) {
          pending.delete(element);
          observer?.unobserve(element);
          element.dataset.revealed = 'true';
        }
      }
    });
    const positions = cards.map(card => ({card, rect:card.getBoundingClientRect()}));
    positions.forEach(({card, rect}, index) => {
      const previous = event.detail.before.get(card);
      animate(card, [
        {translate: previous ? (previous.left-rect.left)+'px '+(previous.top-rect.top)+'px' : '0 16px', opacity: previous ? previous.opacity : 0},
        {translate:'0 0', opacity:1}
      ], {duration:440, delay:Math.min(index,3)*25});
    });
  });

  // Rapid reversals start at the rendered height, not at a previous endpoint.
  const disclosures = new Map();
  document.querySelectorAll('.faq details, .form-extra').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    let running;
    let expanded = details.open;
    function settle(open = expanded) {
      running?.cancel();
      expanded = open;
      details.open = open;
      details.classList.remove('faq-moving');
      running = null;
      disclosures.delete(details);
    }
    details.addEventListener('focusin',event=>{
      if (event.target !== summary && running && !expanded) settle(true);
    });
    details.addEventListener('invalid',()=>settle(true),true);
    summary.addEventListener('click', event => {
      event.preventDefault();
      if (!running) expanded = details.open;
      const start = details.getBoundingClientRect().height;
      running?.cancel();
      expanded = !expanded;
      details.open = true;
      details.classList.add('faq-moving');
      const end = expanded ? details.scrollHeight : summary.getBoundingClientRect().height;
      running = animate(details, [{height:start+'px'}, {height:end+'px'}], {duration:300, fill:'none'});
      disclosures.set(details,settle);
      running.onfinish = () => settle();
    });
  });
  document.addEventListener('submit',()=>disclosures.forEach(settle=>settle()),true);

  const frames = [...document.querySelectorAll('.hero-film-image, .project-media, .service-entry-media, .label-feature-image, .service-hero-media, .next-project-image')];
  const active = new Set();
  const magnets = new Map();
  const header = document.querySelector('.header');
  let scheduled = false;
  let headerScrolled;
  function updateFrame() {
    scheduled = false;
    if (document.hidden) return;
    const height = innerHeight;
    const y = scrollY;
    const reads = [...active].filter(element => !element.closest('[hidden]')).map(element => ({element, rect:element.getBoundingClientRect()}));
    const pointerReads = [...magnets].map(([surface, state]) => ({...state, rect:surface.getBoundingClientRect()}));
    reads.forEach(({element, rect}) => {
      const progress = Math.max(-1, Math.min(1, (rect.top+rect.height/2-height/2)/(height/2+rect.height/2)));
      const amplitude = Math.min(18, rect.height*.026);
      element.style.setProperty('--frame-offset', (-progress*amplitude).toFixed(2)+'px');
    });
    pointerReads.forEach(({target,x,y,rect}) => {
      target.style.setProperty('--magnet-x', Math.max(-6,Math.min(6,(x-rect.left-rect.width/2)*.02))+'px');
      target.style.setProperty('--magnet-y', Math.max(-6,Math.min(6,(y-rect.top-rect.height/2)*.02))+'px');
    });
    magnets.clear();
    const scrolled = y > 24;
    if (headerScrolled !== scrolled) {
      header?.classList.toggle('has-scrolled', scrolled);
      headerScrolled = scrolled;
    }
  }
  function requestFrame() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateFrame); }
  }
  if ('IntersectionObserver' in window) {
    const depth = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
      requestFrame();
    }, {rootMargin:'80px'});
    frames.forEach(element => depth.observe(element));
  }
  window.addEventListener('scroll', requestFrame, {passive:true});
  window.addEventListener('resize', requestFrame, {passive:true});
  document.addEventListener('fpmc:filter', requestFrame);
  document.addEventListener('visibilitychange', requestFrame);
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      entrances.forEach(animation => animation.finish());
      pending.forEach((_, element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) {
          pending.delete(element);
          observer?.unobserve(element);
        }
      });
    }
    requestFrame();
  });
  requestFrame();
  document.querySelectorAll('.project-card, .hero-film').forEach(surface => {
    const target = surface.querySelector('.project-open, .hero-play');
    if (!target) return;
    surface.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      magnets.set(surface,{target,x:event.clientX,y:event.clientY});
      requestFrame();
    }, {passive:true});
    surface.addEventListener('pointerleave', () => {
      magnets.delete(surface);
      target.style.setProperty('--magnet-x','0px');
      target.style.setProperty('--magnet-y','0px');
    });
  });

  // Only intentional in-page jumps use smooth scrolling. Back/forward stays native.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    if (!target) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null,'',url.hash);
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex','-1');
      target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
    }
    target.focus({preventScroll:true});
    target.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();
