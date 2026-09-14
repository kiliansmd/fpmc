/* FPMC motion: native scrolling, real links, and content that is visible by default. */
(() => {
  const ease = 'cubic-bezier(.2,.72,.2,1)';
  const animate = (element, frames, options = {}) => element.animate(frames, {
    duration: 760, easing: ease, fill: 'backwards', ...options
  });

  // Editorial rhythm. Every element is revealed once, when it enters the frame.
  const groups = [
    ['.section-head h2, .home-note h2, .people-heading h2, .label-copy h2, .team-heading, .studio-copy h2, .coda-link h2, .home-studio-copy h2, .label-feature h2, .cta-copy h2', 'type'],
    ['.project-media, .service-entry-media, .studio-image, .motion-screen, .label-portrait, .video-container, .case-image, .hero-film-image, .label-feature-image', 'image'],
    ['.team-card, .process-item, .price-card, .related-link, .fact, .people-names span, .craft-links>a, .service-overview-item, .studio-credits>span', 'row'],
    ['.note-aside, .people-copy>p, .studio-copy>p, .prose>p, .section-head>p, .label-copy>p, .footer-top>*, .contact-address, .contact-location', 'copy']
  ];
  const pending = new Map();
  groups.forEach(([selector, kind]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (!pending.has(element)) pending.set(element, {kind, index});
    });
  });
  const reveal = element => {
    const entry = pending.get(element);
    if (!entry || element.closest('[hidden]')) return;
    pending.delete(element);
    const delay = entry.kind === 'row' ? (entry.index % 4) * 55 : 0;
    if (entry.kind === 'image') {
      animate(element, [
        {clipPath: 'inset(0 0 100% 0)', opacity: .75},
        {clipPath: 'inset(0 0 0% 0)', opacity: 1}
      ], {duration: 800, delay});
    } else {
      animate(element, [
        {opacity: 0, translate: `0 ${entry.kind === 'type' ? 22 : 14}px`},
        {opacity: 1, translate: '0 0'}
      ], {duration: entry.kind === 'type' ? 700 : 540, delay});
    }
    element.dataset.revealed = 'true';
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.closest('[hidden]')) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    }), {threshold: .08, rootMargin: '0px 0px -24px 0px'});
    pending.forEach((_, element) => observer.observe(element));
  }
  // Keyboard focus never waits for an entrance animation.
  document.addEventListener('focusin', event => {
    for (const [element] of pending) {
      if (element === event.target || element.contains(event.target)) pending.delete(element);
    }
    let element = event.target;
    while (element && element !== document.body) {
      element.getAnimations().forEach(animation => {
        if (animation.effect?.getKeyframes().some(frame => 'clipPath' in frame || 'opacity' in frame)) animation.finish();
      });
      element = element.parentElement;
    }
  });

  // Filter changes keep their spatial relationship while the grid rearranges.
  document.addEventListener('fpmc:filter', event => {
    document.querySelectorAll('[data-category]:not([hidden])').forEach((card, index) => {
      card.getAnimations().forEach(animation => animation.cancel());
      const previous = event.detail.before.get(card);
      const current = card.getBoundingClientRect();
      animate(card, [
        {translate: previous ? `${previous.left-current.left}px ${previous.top-current.top}px` : '0 28px', opacity: previous ? 1 : 0},
        {translate: '0 0', opacity: 1}
      ], {duration: 580, delay: index * 35});
    });
  });

  // Native details remain the source of truth, including rapid reversals.
  document.querySelectorAll('.faq details').forEach(details => {
    const summary = details.querySelector('summary');
    let running;
    let expanded = details.open;
    summary.addEventListener('click', event => {
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      running?.cancel();
      expanded = !expanded;
      details.open = true;
      details.classList.add('faq-moving');
      const end = expanded ? details.scrollHeight : summary.getBoundingClientRect().height;
      running = animate(details, [{height: `${start}px`}, {height: `${end}px`}], {duration: 380, fill: 'none'});
      running.onfinish = () => {
        details.open = expanded;
        details.classList.remove('faq-moving');
        running = null;
      };
    });
  });

  // Small amounts of depth inside existing image frames; no scroll hijacking.
  const frames = [...document.querySelectorAll('.cinema-frame, .project-media, .service-entry-media, .label-portrait, .hero-film-image')];
  const active = new Set();
  const depthObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
    requestFrame();
  }, {rootMargin: '100px'}) : null;
  let scheduled = false;
  const header = document.querySelector('.header');
  function updateFrame() {
    scheduled = false;
    const height = window.innerHeight;
    const reads = [...active].map(element => ({element, rect: element.getBoundingClientRect()}));
    reads.forEach(({element, rect}) => {
      const progress = Math.max(-1, Math.min(1, (rect.top+rect.height/2-height/2)/(height/2+rect.height/2)));
      const cinema = element.classList.contains('cinema-frame');
      const amplitude = Math.min(cinema ? 32 : 15, rect.height * (cinema ? .04 : .028));
      element.style.setProperty('--frame-offset', `${(-progress * amplitude).toFixed(2)}px`);
    });
    header?.classList.toggle('has-scrolled', scrollY > 24);
    const total = document.documentElement.scrollHeight-height;
    document.documentElement.style.setProperty('--reading-progress', total > 0 ? String(Math.min(1, scrollY/total)) : '0');
  }
  function requestFrame() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateFrame); }
  }
  frames.forEach(element => depthObserver?.observe(element));
  window.addEventListener('scroll', requestFrame, {passive: true});
  window.addEventListener('resize', requestFrame, {passive: true});
  window.addEventListener('pageshow', requestFrame);
  requestFrame();

  // The pointer moves the invitation arrow, never the user's cursor or hit area.
  document.querySelectorAll('.project-card, .cinema-frame, .coda-link, .hero-film').forEach(surface => {
    const target = surface.querySelector('.project-open, .play-symbol, .coda-action .arrow, .hero-play');
    if (!target) return;
    surface.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = surface.getBoundingClientRect();
      target.style.setProperty('--magnet-x', `${Math.max(-7,Math.min(7,(event.clientX-rect.left-rect.width/2)*.025))}px`);
      target.style.setProperty('--magnet-y', `${Math.max(-7,Math.min(7,(event.clientY-rect.top-rect.height/2)*.025))}px`);
    }, {passive: true});
    surface.addEventListener('pointerleave', () => {
      target.style.setProperty('--magnet-x', '0px');
      target.style.setProperty('--magnet-y', '0px');
    });
  });
})();
