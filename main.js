(function () {
  'use strict';

  var nav          = document.getElementById('nav');
  var navBtn       = document.getElementById('navBtn');
  var overlay      = document.getElementById('overlay');
  var overlayClose = document.getElementById('overlayClose');

  if (!nav) return;

  /* --- Mobile menu ---------------------------------------- */
  function setMenu(open) {
    navBtn.textContent = open ? 'Close' : 'Menu';
    navBtn.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  navBtn.addEventListener('click', function () {
    setMenu(!overlay.classList.contains('open'));
  });

  if (overlayClose) {
    overlayClose.addEventListener('click', function () { setMenu(false); });
  }

  overlay.querySelectorAll('.overlay-link').forEach(function (l) {
    l.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* --- Page fade on navigation ---------------------------- */
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = this.getAttribute('href');
      document.body.style.transition = 'opacity 0.28s ease';
      document.body.style.opacity   = '0';
      setTimeout(function () { window.location.href = target; }, 290);
    });
  });

  /* --- Scroll reveal -------------------------------------- */
  var items = document.querySelectorAll('.ri');

  if ('IntersectionObserver' in window && items.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    items.forEach(function (el) { obs.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

})();
