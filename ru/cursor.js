/* Cursor + interactions */
(() => {
  if (matchMedia('(hover: none)').matches) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  const label = document.createElement('span');
  label.className = 'label';
  ring.appendChild(label);
  document.body.appendChild(ring);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { ring.style.opacity = 1; });

  function tick() {
    rx += (mx - rx) * 0.28;
    ry += (my - ry) * 0.28;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  function bindHovers() {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      if (el.__cursorBound) return;
      el.__cursorBound = true;
      const variant = el.dataset.cursor;
      el.addEventListener('mouseenter', () => {
        ring.classList.remove('is-hover', 'is-card', 'is-cta');
        if (variant === 'card') { ring.classList.add('is-card'); label.textContent = el.dataset.cursorLabel || 'View'; }
        else if (variant === 'cta') { ring.classList.add('is-cta'); label.textContent = el.dataset.cursorLabel || 'Open'; }
        else { ring.classList.add('is-hover'); label.textContent = ''; }
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('is-hover', 'is-card', 'is-cta');
        label.textContent = '';
      });
    });
  }
  bindHovers();

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  revealEls.forEach(el => io.observe(el));

  // Belt-and-suspenders: reveal anything already in view on next frame
  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    revealEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('in');
    });
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // NYC clock
  const clockEl = document.querySelector('[data-clock]');
  function tickClock() {
    if (!clockEl) return;
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `Brooklyn · ${hh}:${mm}`;
  }
  tickClock();
  setInterval(tickClock, 30000);

  // Page transitions removed — links navigate normally.

  // Expose for late additions
  window.__rebindCursor = bindHovers;
})();
