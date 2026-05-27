/* ============================================================
   THE BRIDESMAIDS ISSUE — main.js
   Scroll reveal · Nav behavior · Parallax · Mobile menu
============================================================ */

(function () {
  'use strict';

  // --- DOM refs -------------------------------------------
  const nav         = document.getElementById('nav');
  const navMenuBtn  = document.getElementById('navMenuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const coverBg     = document.getElementById('coverBg');
  const coverSection = document.querySelector('.s-cover');

  // --- Nav: scrolled state --------------------------------
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page reloaded mid-scroll

  // --- Parallax on cover ----------------------------------
  if (coverBg && coverSection) {
    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY   = window.scrollY;
          const heroH     = coverSection.offsetHeight;
          const progress  = Math.min(scrollY / heroH, 1);

          if (scrollY < heroH * 1.2) {
            // Subtle upward parallax + very slight scale
            const y     = scrollY * 0.28;
            const scale = 1.05 + progress * 0.03;
            coverBg.style.transform = `scale(${scale}) translateY(${y}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Mobile menu ----------------------------------------
  function openMenu() {
    navMenuBtn.classList.add('open');
    navMenuBtn.setAttribute('aria-expanded', 'true');
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenuBtn.classList.remove('open');
    navMenuBtn.setAttribute('aria-expanded', 'false');
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navMenuBtn.addEventListener('click', function () {
    if (menuOverlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOverlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Scroll Reveal (IntersectionObserver) ---------------
  const revealEls = document.querySelectorAll('.ri');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    // Assign stagger delays to sibling .ri elements in same parent
    document.querySelectorAll('section, .outfit-block, .travel-cols, .details-grid, .itinerary-list').forEach(function (parent) {
      const items = Array.from(parent.querySelectorAll(':scope > .ri'));
      items.forEach(function (el, i) {
        if (i > 0 && i < 5) {
          el.classList.add('d' + i);
        }
      });
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just make everything visible
    revealEls.forEach(function (el) {
      el.classList.add('in');
    });
  }

  // --- Smooth scroll for anchor links ---------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id     = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH   = nav.offsetHeight;
        const top    = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
