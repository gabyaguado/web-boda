/* ==============================================
   BODA ESTER & GABY · 11.07.2026
   Script principal
   ============================================== */

'use strict';

/* =============================================
   NAVIGATION — hamburger + scroll shadow
   ============================================= */

(function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  const nav    = document.getElementById('nav');

  if (!toggle || !menu) return;

  // Hamburger toggle
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link inside it is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll shadow
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }
})();


/* =============================================
   COUNTDOWN — hasta el 11 de julio de 2026, 19:00
   ============================================= */

(function initCountdown() {
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return; // not on this page

  const weddingDate = new Date('2026-07-11T19:00:00');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();


/* =============================================
   IBAN COPY TO CLIPBOARD
   ============================================= */

(function initCopyIban() {
  const copyBtn      = document.getElementById('copyIban');
  const feedback     = document.getElementById('copyFeedback');
  const ibanEl       = document.getElementById('ibanNumber');

  if (!copyBtn || !ibanEl) return;

  copyBtn.addEventListener('click', () => {
    const iban = ibanEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(iban).then(showFeedback).catch(() => fallbackCopy(iban));
    } else {
      fallbackCopy(iban);
    }
  });

  function showFeedback() {
    if (!feedback) return;
    feedback.classList.add('visible');
    setTimeout(() => feedback.classList.remove('visible'), 2500);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); showFeedback(); } catch (_) {}
    document.body.removeChild(ta);
  }
})();


/* =============================================
   SCROLL REVEAL (Intersection Observer)
   ============================================= */

(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();


/* =============================================
   RSVP FORM — Google Apps Script submission
   ============================================= */

(function initRsvpForm() {
  const form      = document.getElementById('rsvpForm');
  const statusEl  = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const nombre       = form.nombre.value.trim();
    const acompanantes = form.acompanantes.value.trim();

    if (!nombre || !acompanantes) {
      showStatus('error', 'Por favor, completa los campos obligatorios antes de enviar.');
      return;
    }

    // Disable submit while sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    const action = form.getAttribute('action');

    // If URL is still placeholder, show a friendly message in dev
    if (!action || action === 'PENDIENTE_URL_APPS_SCRIPT') {
      showStatus('error', 'El formulario aún no está conectado. Añade la URL de Google Apps Script en el atributo action del formulario.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar asistencia';
      return;
    }

    const data = new FormData(form);

    try {
      await fetch(action, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // Google Apps Script requires no-cors
      });

      // no-cors means we can't read the response, so assume success
      showStatus('success', '¡Gracias por confirmar! Estamos deseando verte el 11 de julio. 🤍');
      form.reset();
      submitBtn.textContent = '¡Enviado!';

    } catch (err) {
      showStatus('error', 'Ha habido un problema al enviar el formulario. Por favor, inténtalo de nuevo o contáctanos directamente.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar asistencia';
    }
  });

  function showStatus(type, message) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className   = 'form-status ' + type;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
