(function () {
  const path = window.location.pathname;
  const isWork = /\/work\//.test(path);
  const isRu = path.startsWith('/ru/');
  const isEn = path.startsWith('/en/');
  const lang = isRu ? 'ru' : 'en';

  // Build equivalent page URL in the other language
  function switchLangHref(targetLang) {
    if (path.startsWith('/en/')) return path.replace('/en/', '/' + targetLang + '/');
    if (path.startsWith('/ru/')) return path.replace('/ru/', '/' + targetLang + '/');
    return '/' + targetLang + '/';
  }

  const indexHref = isRu ? '/ru/index.html' : '/en/index.html';

  const links = isWork
    ? [
        { href: indexHref,           label: 'Home' },
        { href: indexHref + '#work', label: 'Work', active: true },
        { href: indexHref + '#about',   label: 'About' },
        { href: indexHref + '#contact', label: 'Contact' },
      ]
    : [
        { href: '#top',     label: 'Home', active: true },
        { href: '#work',    label: 'Work' },
        { href: '#about',   label: 'About' },
        { href: '#contact', label: 'Contact' },
      ];

  const navLinks = links
    .map(l => `<a href="${l.href}"${l.active ? ' class="is-active"' : ''}>${l.label}</a>`)
    .join('\n    ');

  const enHref = switchLangHref('en');
  const ruHref = switchLangHref('ru');

  const langSwitch = `<span class="lang-switch">
      <a href="${enHref}" class="${lang === 'en' ? 'active' : ''}">EN</a>
      <span class="divider">/</span>
      <a href="${ruHref}" class="${lang === 'ru' ? 'active' : ''}">RU</a>
    </span>`;

  const html = `<header class="topbar">
  <div class="brand">
    <a href="${indexHref}" class="brand-name">Nina <em>Hayden</em></a>
    <span class="avail" title="Available for select projects"><span class="dot"></span>AVAILABLE NOW</span>
  </div>
  <nav class="nav">
    ${navLinks}
  </nav>
  <div class="meta-right">
    ${langSwitch}
    <a href="javascript:void(0)" class="topbar-cta">Let's talk</a>
  </div>
</header>`;

  const root = document.getElementById('site-nav');
  if (root) root.outerHTML = html;

  // Wire "Let's talk" to open contact modal
  document.querySelector('.topbar-cta')?.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById('modal-contact');
    if (modal) { modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
    else { window.location.href = indexHref + '#contact'; }
  });

  // Add favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = '/favicon.png';
  document.head.appendChild(favicon);
})();

// ─── Mobile-only: image lightbox + CV bottom sheet (≤743px) ──────────────
(function () {
  if (window.innerWidth <= 743) {
    initLightbox();
    initCvSheet();
  }

  function initLightbox() {
    const imgs = document.querySelectorAll('.proj-section img');
    if (!imgs.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'mobile-lightbox';
    overlay.innerHTML = '<div class="mobile-lightbox-close" aria-label="Close">✕</div><img alt="">';
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.mobile-lightbox-close');

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });
    closeBtn.addEventListener('click', close);

    imgs.forEach(img => {
      img.style.touchAction = 'pinch-zoom';
      img.addEventListener('click', () => {
        overlayImg.src = img.currentSrc || img.src;
        overlayImg.alt = img.alt || '';
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function initCvSheet() {
    const toggle = document.querySelector('.cv-toggle');
    const menu = document.querySelector('.cv-menu');
    if (!toggle || !menu) return;

    const links = Array.from(menu.querySelectorAll('a'));
    if (!links.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'mobile-cv-overlay';
    const sheet = document.createElement('div');
    sheet.className = 'mobile-cv-sheet';
    sheet.innerHTML = '<div class="handle"></div>';
    links.forEach(a => {
      const clone = document.createElement('a');
      clone.href = a.getAttribute('href');
      clone.textContent = a.textContent;
      if (a.hasAttribute('download')) clone.setAttribute('download', '');
      sheet.appendChild(clone);
    });
    document.body.appendChild(overlay);
    document.body.appendChild(sheet);

    function open() {
      overlay.classList.add('open');
      sheet.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('open');
      sheet.classList.remove('open');
      document.body.style.overflow = '';
    }
    overlay.addEventListener('click', close);

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      open();
    }, true);
  }
})();
