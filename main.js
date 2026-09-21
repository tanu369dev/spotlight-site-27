// ============================================================
// SPOTLIGHT — main.js
// Mobile nav toggle, cursor-follow hero glow, scroll reveal,
// contact form (front-end stub), footer year.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero cursor-follow spotlight glow
  var hero = document.getElementById('top');
  var heroGlow = document.getElementById('heroGlow');
  if (hero && heroGlow) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      heroGlow.style.left = (e.clientX - rect.left) + 'px';
      heroGlow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // Scroll reveal via IntersectionObserver (robust, works in every modern browser)
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: no JS animation support — just show everything
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact form stub — replace with a real endpoint (email API / CRM) before launch
  window.handleContactSubmit = function (event) {
    event.preventDefault();
    var form = event.target;
    var button = form.querySelector('button[type="submit"]');
    var originalLabel = button.innerHTML;
    button.innerHTML = 'Sent — thank you!';
    button.disabled = true;
    // TODO: replace with a fetch() call to your email/CRM endpoint, e.g.:
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) });
    setTimeout(function () {
      form.reset();
      button.innerHTML = originalLabel;
      button.disabled = false;
    }, 3000);
    return false;
  };

});
