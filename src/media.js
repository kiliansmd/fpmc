/* Loading states follow real media events; the page never waits for every asset. */
(() => {
  const frameSelector = '.hero-film-image, .project-media, .service-entry-media, .label-feature-image, .service-hero-media, .next-project-image, .video-facade, .label-portrait, .stage-image, .release-artwork, .production-image, .screen-hero-image, .audio-release-image';
  document.querySelectorAll('img').forEach(img => {
    const frame = img.closest(frameSelector);
    let timer;
    function settle(ok) {
      clearTimeout(timer);
      img.dataset.loadState = ok ? 'ready' : 'error';
      if (!frame) return;
      frame.dataset.mediaState = ok ? 'ready' : 'error';
      frame.removeAttribute('aria-busy');
      if (!ok && !frame.querySelector('.media-fallback')) {
        const message = document.createElement('span');
        message.className = 'media-fallback';
        message.textContent = 'Bild konnte nicht geladen werden.';
        frame.append(message);
      }
    }
    if (img.complete) { settle(img.naturalWidth > 0); return; }
    img.dataset.loadState = 'pending';
    if (frame) {
      frame.setAttribute('aria-busy','true');
      timer = setTimeout(() => { frame.dataset.mediaState = 'loading'; }, 250);
    }
    img.addEventListener('load', () => {
      const decoded = img.decode ? img.decode() : Promise.resolve();
      decoded.catch(()=>{}).then(()=>settle(true));
    }, {once:true});
    img.addEventListener('error',()=>settle(false),{once:true});
  });

  document.querySelectorAll('[data-video]').forEach(button => {
    const frame = button.parentElement;
    const label = button.querySelector('strong');
    const originalLabel = label.textContent;
    let iframe;
    let timer;
    let slowTimer;
    let loading = false;
    button.addEventListener('click', () => {
      if (loading) return;
      loading = true;
      button.setAttribute('aria-disabled','true');
      frame.setAttribute('aria-busy','true');
      iframe = document.createElement('iframe');
      iframe.title = button.dataset.title || 'Musikvideo';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.tabIndex = -1;
      iframe.className = 'video-embed';
      const current = iframe;
      const fail = () => {
        if (iframe !== current) return;
        clearTimeout(timer);
        clearTimeout(slowTimer);
        current.remove();
        iframe = null;
        loading = false;
        frame.removeAttribute('aria-busy');
        frame.dataset.playerState = 'error';
        button.removeAttribute('aria-disabled');
        button.setAttribute('aria-label','YouTube-Player erneut laden');
        label.textContent = 'Erneut laden';
        frame.querySelector('[data-player-status]').textContent = 'Der Player ist nicht erreichbar. Versuche es erneut oder öffne das Video direkt auf YouTube.';
      };
      current.addEventListener('load', () => {
        if (iframe !== current) return;
        clearTimeout(timer);
        clearTimeout(slowTimer);
        frame.dataset.playerState = 'ready';
        frame.removeAttribute('aria-busy');
        frame.querySelector('[data-player-status]').textContent = '';
        current.tabIndex = 0;
        // Do not pull focus back if the visitor has moved on during loading.
        const hadFocus = document.activeElement === button;
        button.hidden = true;
        if (hadFocus) current.focus({preventScroll:true});
      }, {once:true});
      current.addEventListener('error',fail,{once:true});
      frame.dataset.playerState = 'loading';
      label.textContent = originalLabel;
      frame.querySelector('[data-player-status]').textContent = '';
      timer = setTimeout(() => {
        label.textContent = 'Player wird geladen…';
        frame.querySelector('[data-player-status]').textContent = 'YouTube-Player wird geladen.';
      }, 220);
      // A usable retry and the existing external link remain available on failure.
      slowTimer = setTimeout(fail,15000);
      current.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?autoplay=1';
      frame.append(current);
    });
    const status = document.createElement('p');
    status.dataset.playerStatus = '';
    status.className = 'player-status';
    status.setAttribute('role','status');
    frame.append(status);
  });

  document.querySelectorAll('[data-motion-src]').forEach(video => {
    const frame = video.parentElement;
    const toggle = frame.querySelector('[data-motion-toggle]');
    const nativeAutoplay = video.hasAttribute('autoplay');
    let userPaused = false;
    let manuallyStarted = false;
    let inView = false;
    let pageActive = true;
    let failed = !!video.error;
    let blocked = false;
    let needsInteraction = false;
    let wantsPlayback = false;
    let request = null;
    let generation = 0;
    let loadingTimer;
    let retryTimer;
    let abortRetries = 0;
    let readinessRetried = false;

    function configureInlinePlayback() {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('muted','');
      video.setAttribute('playsinline','');
      video.setAttribute('webkit-playsinline','');
    }
    function visibleNow() {
      const r = video.getBoundingClientRect();
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop || 0;
      const left = viewport?.offsetLeft || 0;
      const height = viewport?.height || window.innerHeight;
      const width = viewport?.width || window.innerWidth;
      const visibleHeight = Math.max(0,Math.min(r.bottom,top+height)-Math.max(r.top,top));
      const visibleWidth = Math.max(0,Math.min(r.right,left+width)-Math.max(r.left,left));
      const area = visibleHeight * visibleWidth;
      // An explicitly pressed, visible play control also works at the frame's edge.
      return r.width > 0 && r.height > 0 && area > 0 && area >= r.width * r.height * (manuallyStarted ? 0 : .15);
    }
    const canRun = () => pageActive && !document.hidden && inView && !userPaused && !failed;
    function labelToggle(text) {
      if (!('motionCompact' in toggle.dataset)) toggle.textContent = text;
      toggle.setAttribute('aria-label',text);
    }
    function setState(state) {
      clearTimeout(loadingTimer);
      frame.dataset.playback = state;
      const active = state === 'playing' && !video.paused;
      const text = state === 'error' ? 'Bewegtbild erneut laden' : active ? 'Bewegtbild pausieren' : state === 'starting' ? 'Bewegtbild startet – abbrechen' : 'Bewegtbild abspielen';
      labelToggle(text);
      toggle.setAttribute('aria-pressed',String(active));
      toggle.removeAttribute('aria-busy');
    }
    function waitForFrames() {
      clearTimeout(loadingTimer);
      if (!wantsPlayback || !canRun()) return;
      loadingTimer = setTimeout(() => {
        if (!wantsPlayback || !canRun()) return;
        frame.dataset.playback = 'loading';
        labelToggle('Bewegtbild lädt – abbrechen');
        toggle.setAttribute('aria-busy','true');
      },300);
    }
    function cancelPending() {
      generation += 1;
      request = null;
      clearTimeout(retryTimer);
      retryTimer = null;
      clearTimeout(loadingTimer);
    }
    function pause() {
      wantsPlayback = false;
      manuallyStarted = false;
      cancelPending();
      video.autoplay = false;
      video.pause();
      setState(failed ? 'error' : 'paused');
    }
    function play(recover = false) {
      if (!canRun()) return;
      if (recover) { blocked = false; abortRetries = 0; readinessRetried = false; }
      if (blocked || request !== null || retryTimer) return;
      configureInlinePlayback();
      video.autoplay = nativeAutoplay;
      wantsPlayback = true;
      // Native autoplay may already be running before this deferred script arrives.
      if (!video.paused && video.readyState >= 2) {
        needsInteraction = false;
        setState('playing');
        return;
      }
      setState('starting');
      if (!video.getAttribute('src')) {
        video.src = video.dataset.motionSrc;
        video.load();
      }
      const attempt = ++generation;
      request = attempt;
      waitForFrames();
      function rejected(error) {
        if (request !== attempt) return;
        request = null;
        if (failed || !canRun() || !wantsPlayback) { setState(failed ? 'error' : 'paused'); return; }
        // Interrupted requests get a bounded retry, never an endless promise loop.
        if (error?.name === 'AbortError' && abortRetries < 2) {
          abortRetries += 1;
          clearTimeout(loadingTimer);
          retryTimer = setTimeout(() => { retryTimer = null; play(); },abortRetries * 160);
          return;
        }
        wantsPlayback = false;
        blocked = error?.name === 'NotAllowedError';
        needsInteraction = true;
        setState(blocked ? 'blocked' : 'paused');
      }
      try {
        const promise = video.play();
        // Older embedded browsers may not return a promise from play().
        if (promise && typeof promise.then === 'function') {
          promise.then(() => {
            if (request !== attempt) return;
            request = null;
            if (!canRun()) { pause(); return; }
            if (!video.paused) { abortRetries = 0; needsInteraction = false; setState('playing'); }
            else { wantsPlayback = false; needsInteraction = true; setState('paused'); }
          },rejected);
        } else {
          request = null;
          if (!video.paused && video.readyState >= 2) setState('playing');
        }
      } catch (error) { rejected(error); }
    }
    function syncVisibility(recover = false) {
      const wasInView = inView;
      inView = visibleNow();
      if (canRun()) play(recover || !wasInView);
      else pause();
    }
    configureInlinePlayback();
    toggle.hidden = false;
    setState(failed ? 'error' : 'paused');
    toggle.addEventListener('click', () => {
      if (!video.paused || wantsPlayback) { userPaused = true; pause(); return; }
      userPaused = false;
      manuallyStarted = true;
      inView = visibleNow();
      if (failed) { failed = false; cancelPending(); video.removeAttribute('src'); }
      // Keep play() directly inside the trusted gesture, including after an error.
      play(true);
    });
    video.addEventListener('playing', () => {
      inView = visibleNow();
      if (!canRun()) { pause(); return; }
      wantsPlayback = true;
      blocked = false;
      needsInteraction = false;
      abortRetries = 0;
      clearTimeout(retryTimer);
      retryTimer = null;
      setState('playing');
    });
    video.addEventListener('waiting',waitForFrames);
    video.addEventListener('stalled', () => { if (video.readyState < 3) waitForFrames(); });
    video.addEventListener('pause', () => {
      if (!video.paused) return; // Ignore an old queued pause after a quick restart.
      if (wantsPlayback) needsInteraction = true;
      wantsPlayback = false;
      cancelPending();
      setState(failed ? 'error' : blocked ? 'blocked' : 'paused');
    });
    video.addEventListener('error', () => {
      failed = true;
      wantsPlayback = false;
      cancelPending();
      setState('error');
    });
    video.addEventListener('loadeddata', () => {
      inView = visibleNow();
      if (!canRun()) return;
      if (blocked) {
        if (readinessRetried) return;
        readinessRetried = true;
        blocked = false;
      }
      play();
    });
    // Initial geometry starts the hero immediately, independently of observer timing.
    syncVisibility();
    let queued = false;
    const scheduleVisibility = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(() => { queued = false; syncVisibility(); });
    };
    if ('IntersectionObserver' in window && typeof window.IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(() => syncVisibility(), {threshold:[0,.15]});
      observer.observe(video);
    } else {
      window.addEventListener('scroll',scheduleVisibility,{passive:true});
      window.addEventListener('resize',scheduleVisibility,{passive:true});
    }
    window.visualViewport?.addEventListener('resize',scheduleVisibility,{passive:true});
    window.visualViewport?.addEventListener('scroll',scheduleVisibility,{passive:true});
    function recoverFromGesture(event) {
      if (!event.isTrusted || event.repeat || event.target?.closest?.('[data-motion-toggle]')) return;
      if (!blocked && !needsInteraction) return;
      inView = visibleNow();
      if (canRun()) play(true);
    }
    ['click','touchend','keydown'].forEach(type => document.addEventListener(type,recoverFromGesture,{passive:true}));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else syncVisibility(true);
    });
    window.addEventListener('focus', () => syncVisibility(true));
    window.addEventListener('pagehide', () => { pageActive = false; pause(); });
    window.addEventListener('pageshow', () => { pageActive = true; syncVisibility(true); });
  });
})();
