(function () {
  const path = window.location.pathname;
  const isWork = /\/work\//.test(path);
  const isPrivacy = /\/privacy\.html$/.test(path);
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

  const homeLabel    = isRu ? 'Главная'      : 'Home';
  const workLabel    = isRu ? 'Кейсы'        : 'Work';
  const helpLabel    = isRu ? 'Чем я помогу' : 'How I can help';
  const contactLabel = isRu ? 'Контакты'     : 'Contact';
  const ctaLabel     = isRu ? 'Написать' : "Let's talk";
  const availLabel   = isRu ? 'ОТКРЫТА ДЛЯ СОТРУДНИЧЕСТВА' : 'AVAILABLE NOW';

  const links = (isWork || isPrivacy)
    ? [
        { href: indexHref,                          label: homeLabel },
        { href: indexHref + '#how-i-can-help',       label: helpLabel },
        { href: indexHref + '#work',                 label: workLabel, active: true },
        { href: indexHref + '#contact',              label: contactLabel },
      ]
    : [
        { href: '#top',             label: homeLabel, active: true },
        { href: '#how-i-can-help',  label: helpLabel },
        { href: '#work',            label: workLabel },
        { href: '#contact',         label: contactLabel },
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

  const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M4.22 4.22l1.77 1.77M17.99 17.99l1.77 1.77M2.5 12h2.5M19 12h2.5M4.22 19.78l1.77-1.77M17.99 6.01l1.77-1.77"/></svg>`;
  const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.5 6.5 0 0 0 10 10Z"/></svg>`;

  const themeToggle = `<button type="button" class="theme-toggle" aria-label="" title="">
      <span class="theme-toggle-circle">
        <span class="theme-toggle-icon theme-toggle-icon--sun">${SUN_ICON}</span>
        <span class="theme-toggle-icon theme-toggle-icon--moon">${MOON_ICON}</span>
      </span>
    </button>`;

  const html = `<header class="topbar">
  <div class="topbar-inner">
    <div class="brand">
      <a href="${indexHref}" class="brand-name">Nina <em>Hayden</em></a>
      <span class="avail" title="Available for select projects"><span class="dot"></span>${availLabel}</span>
    </div>
    <nav class="nav">
      ${navLinks}
    </nav>
    <div class="meta-right">
      ${themeToggle}
      ${langSwitch}
      <a href="javascript:void(0)" class="topbar-cta">${ctaLabel}</a>
    </div>
  </div>
</header>`;

  const root = document.getElementById('site-nav');
  if (root) root.outerHTML = html;

  // ─── Theme toggle ────────────────────────────────────────────────
  (function () {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const sunLabel = { en: 'Switch to light theme', ru: 'Включить светлую тему' };
    const moonLabel = { en: 'Switch to dark theme', ru: 'Включить тёмную тему' };

    function currentTheme() {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function syncToggle() {
      const theme = currentTheme();
      // The icon shown is the theme a click switches TO.
      const label = theme === 'dark' ? sunLabel[lang] : moonLabel[lang];
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.querySelector('.theme-toggle-icon--sun').classList.toggle('is-active', theme === 'dark');
      toggle.querySelector('.theme-toggle-icon--moon').classList.toggle('is-active', theme === 'light');
    }
    syncToggle();

    function prefersReducedMotion() {
      try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    }

    // Cross-fades the whole page between palettes instead of an instant cut,
    // using the browser's built-in page-transition API. Where that API
    // doesn't exist (or the visitor asked for reduced motion), the switch
    // just stays instant, same as before. syncToggle runs inside `apply`,
    // not after calling setTheme — startViewTransition's callback isn't
    // guaranteed to run in the same tick, so calling it right after would
    // sometimes sync the icon/label to the theme that's about to be
    // replaced, not the one just switched to.
    function setTheme(next) {
      const apply = () => {
        document.documentElement.setAttribute('data-theme', next);
        syncToggle();
      };
      if (document.startViewTransition && !prefersReducedMotion()) {
        document.startViewTransition(apply);
      } else {
        apply();
      }
    }

    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('nh-theme', next); } catch (e) {}
      setTheme(next);
    });

    // Until the visitor picks a theme themselves, keep following the system setting live.
    try {
      if (!localStorage.getItem('nh-theme') && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          try { if (localStorage.getItem('nh-theme')) return; } catch (e2) {}
          setTheme(e.matches ? 'dark' : 'light');
        });
      }
    } catch (e) {}
  })();

  // Thin line fades in under the header over the first 24px of scroll
  const header = document.querySelector('.topbar');
  if (header) {
    function updateScrollLine() {
      const t = Math.min(window.scrollY / 24, 1);
      header.style.borderBottomColor = `color-mix(in srgb, var(--line) ${Math.round(t * 100)}%, transparent)`;
    }
    updateScrollLine();
    window.addEventListener('scroll', updateScrollLine, { passive: true });
  }

  // Wire CTA to open contact modal
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
    const imgs = document.querySelectorAll('.proj-section img, .case-img, .case-carousel-slide img, .case-square img');
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
