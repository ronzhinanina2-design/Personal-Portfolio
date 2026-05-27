(function () {
  const isWork = /\/work\//.test(window.location.pathname);
  const base = isWork ? '../' : '';
  const ctaHref = isWork ? '../index.html#contact' : '#contact';

  const links = isWork
    ? [
        { href: '../index.html',         label: 'Home' },
        { href: '../index.html#work',    label: 'Work', active: true },
        { href: '../index.html#about',   label: 'About' },
        { href: '../index.html#contact', label: 'Contact' },
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

  const html = `<header class="topbar">
  <div class="brand">
    <a href="${base}index.html" class="brand-name">Nina <em>Hayden</em></a>
    <span class="avail" title="Available for select projects"><span class="dot"></span>AVAILABLE NOW</span>
  </div>
  <nav class="nav">
    ${navLinks}
  </nav>
  <div class="meta-right">
    <span class="lang-switch"><strong>EN</strong><span class="lang-divider"> / </span><span class="lang-ru">RU</span></span>
    <a href="${ctaHref}" class="topbar-cta" data-cursor="cta" data-cursor-label="Say hello">Let's talk</a>
  </div>
</header>`;

  const root = document.getElementById('site-nav');
  if (root) root.outerHTML = html;
})();
