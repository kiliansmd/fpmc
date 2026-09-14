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
    let userPaused = false;
    let inView = false;
    let request;
    let loadingTimer;
    let failed = false;
    let wantsPlayback = false;
    let generation = 0;
    function setState(state) {
      clearTimeout(loadingTimer);
      frame.dataset.playback = state;
      const active = wantsPlayback && !userPaused;
      const text = state === 'error' ? 'Bewegtbild erneut laden' : active ? 'Bewegtbild pausieren' : 'Bewegtbild abspielen';
      toggle.textContent = text;
      toggle.setAttribute('aria-label',text);
      toggle.setAttribute('aria-pressed',String(active));
      toggle.removeAttribute('aria-busy');
    }
    function waitForFrames() {
      clearTimeout(loadingTimer);
      loadingTimer = setTimeout(() => {
        if (!wantsPlayback) return;
        frame.dataset.playback = 'loading';
        toggle.textContent = 'Lädt · pausieren';
        toggle.setAttribute('aria-label','Bewegtbild lädt – pausieren');
        toggle.setAttribute('aria-busy','true');
      }, 300);
    }
    function pause() {
      wantsPlayback = false;
      video.pause();
      setState(failed ? 'error' : 'paused');
    }
    function play() {
      if (failed || document.hidden) return;
      wantsPlayback = true;
      if (request) return;
      setState('starting');
      if (!video.getAttribute('src')) {
        video.src = video.dataset.motionSrc;
        video.load();
      }
      waitForFrames();
      const attempt = generation;
      request = video.play();
      request.catch(error => {
        if (attempt !== generation) return;
        if (!failed && (error.name !== 'AbortError' || !wantsPlayback)) {
          wantsPlayback = false;
          setState('paused');
        }
      }).finally(() => {
        request = null;
        if (wantsPlayback && video.paused && !failed && !document.hidden) play();
      });
    }
    toggle.hidden = false;
    setState('paused');
    toggle.addEventListener('click', () => {
      if (wantsPlayback) { userPaused = true; pause(); return; }
      userPaused = false;
      if (failed) { failed = false; generation += 1; video.removeAttribute('src'); }
      play();
    });
    video.addEventListener('playing', () => {
      if (!wantsPlayback || document.hidden) { pause(); return; }
      setState('playing');
    });
    video.addEventListener('waiting',waitForFrames);
    video.addEventListener('stalled', () => { if (video.readyState < 3) waitForFrames(); });
    video.addEventListener('pause', () => { if (!wantsPlayback) setState(failed ? 'error' : 'paused'); });
    video.addEventListener('error', () => { failed = true; wantsPlayback = false; setState('error'); });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const latest = entries[entries.length-1];
        inView = latest.isIntersecting && latest.intersectionRatio >= .15;
        if (inView && !userPaused && !failed) play(); else pause();
      }, {threshold:[0,.15]});
      observer.observe(video);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else if (inView && !userPaused && !failed) play();
    });
    window.addEventListener('pagehide',pause);
    window.addEventListener('pageshow',event => {
      if (event.persisted && inView && !userPaused && !failed) play();
    });
  });
})();
