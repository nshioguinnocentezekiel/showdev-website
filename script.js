// =========================================================
// SHOWDEV Foundation — Interactivity
// 1. Fade/float-in animation as sections scroll into view
// 2. Back-to-top button that appears after scrolling down
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- 0. Apply photos from images-config.js ----
  // This lets photos be swapped by editing ONE simple file
  // instead of hunting through every HTML page.
  if (window.SHOWDEV_IMAGES) {
    document.querySelectorAll('[data-img-key]').forEach(function (el) {
      var key = el.getAttribute('data-img-key');
      if (window.SHOWDEV_IMAGES[key]) {
        el.src = window.SHOWDEV_IMAGES[key];
      }
    });

    document.querySelectorAll('[data-bg-key]').forEach(function (el) {
      var key = el.getAttribute('data-bg-key');
      if (window.SHOWDEV_IMAGES[key]) {
        el.style.backgroundImage =
          "linear-gradient(135deg, rgba(59,30,122,0.55), rgba(123,47,190,0.45)), url('" +
          window.SHOWDEV_IMAGES[key] + "')";
      }
    });
  }

  var revealTargets = document.querySelectorAll(
    '.card, .photo-placeholder, .section-title, .section-sub, .hero h1, .hero .tagline, .hero .btn-row'
  );

  // If the page was opened with a #section link (e.g. Donate button),
  // skip the fade-in animation entirely so the target content is
  // never accidentally left invisible — just show everything normally.
  if (window.location.hash) {
    revealTargets.forEach(function (el) {
      el.classList.add('reveal', 'visible');
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once, not every scroll
          }
        });
      }, {
        threshold: 0.15
      });

      revealTargets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback for very old browsers: just show everything
      revealTargets.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // Extra safety net: some in-app preview browsers don't auto-scroll
  // to a #section on page load. Force it after content has settled.
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }

  // ---- Back-to-top button ----
  var backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '&uarr;';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Donate tabs (Bank / PayPal / Card & Mobile Money) ----
  var donateTabs = document.getElementById('donateTabs');
  if (donateTabs) {
    var tabButtons = donateTabs.querySelectorAll('.donate-tab-btn');
    var panels = document.querySelectorAll('.donate-panel');

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');

        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        panels.forEach(function (panel) {
          if (panel.getAttribute('data-panel') === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

});