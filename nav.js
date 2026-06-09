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

  const homeLabel    = isRu ? 'Главная'  : 'Home';
  const workLabel    = isRu ? 'Работы'   : 'Work';
  const aboutLabel   = isRu ? 'Обо мне'  : 'About';
  const contactLabel = isRu ? 'Контакты' : 'Contact';
  const ctaLabel     = isRu ? 'Написать' : "Let's talk";
  const availLabel   = isRu ? 'ОТКРЫТА ДЛЯ СОТРУДНИЧЕСТВА' : 'AVAILABLE NOW';

  const links = isWork
    ? [
        { href: indexHref,              label: homeLabel },
        { href: indexHref + '#work',    label: workLabel, active: true },
        { href: indexHref + '#about',   label: aboutLabel },
        { href: indexHref + '#contact', label: contactLabel },
      ]
    : [
        { href: '#top',     label: homeLabel, active: true },
        { href: '#work',    label: workLabel },
        { href: '#about',   label: aboutLabel },
        { href: '#contact', label: contactLabel },
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
    <span class="avail" title="Available for select projects"><span class="dot"></span>${availLabel}</span>
  </div>
  <nav class="nav">
    ${navLinks}
  </nav>
  <div class="meta-right">
    ${langSwitch}
    <a href="javascript:void(0)" class="topbar-cta">${ctaLabel}</a>
  </div>
</header>`;

  const root = document.getElementById('site-nav');
  if (root) root.outerHTML = html;

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
