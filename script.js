/* ============================================================
   BODA ESTER & GABY · 11.07.2026
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCountdown();
  initReveal();
  initCopyIBAN();
  initRSVP();
});


/* ──────────────────────────────────────────
   1. NAVEGACIÓN — hamburger + sombra scroll
   ────────────────────────────────────────── */

function initNav() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!header || !toggle || !menu) return;

  // Hamburger toggle
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Cerrar menú al clicar un enlace interno
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sombra al hacer scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}


/* ──────────────────────────────────────────
   2. CUENTA ATRÁS — hasta el 11.07.2026 a las 19:00
   ────────────────────────────────────────── */

function initCountdown() {
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minEl   = document.getElementById('cd-min');
  const secEl   = document.getElementById('cd-sec');
  if (!daysEl) return;

  const target = new Date('2026-07-11T19:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      [daysEl, hoursEl, minEl, secEl].forEach(el => el.textContent = '00');
      return;
    }

    daysEl.textContent  = pad(Math.floor(diff / 86_400_000));
    hoursEl.textContent = pad(Math.floor((diff % 86_400_000) / 3_600_000));
    minEl.textContent   = pad(Math.floor((diff % 3_600_000)  /    60_000));
    secEl.textContent   = pad(Math.floor((diff %    60_000)  /     1_000));
  }

  tick();
  setInterval(tick, 1000);
}


/* ──────────────────────────────────────────
   3. SCROLL REVEAL — IntersectionObserver
   ────────────────────────────────────────── */

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Fallback para browsers sin soporte
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  items.forEach(el => io.observe(el));
}


/* ──────────────────────────────────────────
   4. COPIAR IBAN — portapapeles
   ────────────────────────────────────────── */

function initCopyIBAN() {
  const btn      = document.getElementById('btn-copy');
  const feedback = document.getElementById('copy-feedback');
  const ibanEl   = document.getElementById('iban-number');
  if (!btn || !ibanEl) return;

  btn.addEventListener('click', async () => {
    const text = ibanEl.textContent.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para Safari < 13.1 / HTTP
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showCopied();
    } catch {
      // Si falla, al menos seleccionamos el texto
      const range = document.createRange();
      range.selectNode(ibanEl);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  });

  function showCopied() {
    btn.classList.add('copied');
    if (feedback) feedback.classList.add('show');
    setTimeout(() => {
      btn.classList.remove('copied');
      if (feedback) feedback.classList.remove('show');
    }, 2800);
  }
}


/* ──────────────────────────────────────────
   5. FORMULARIO RSVP — fetch + no-cors
   ────────────────────────────────────────── */

function initRSVP() {
  const form      = document.getElementById('rsvp-form');
  const statusEl  = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const btnText   = document.getElementById('btn-text');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ── Validación básica ──
    const nombre       = form.nombre?.value.trim()       || '';
    const acompanantes = form.acompanantes?.value.trim() || '';

    if (!nombre) {
      form.nombre.focus();
      showStatus('Por favor, introduce tu nombre y apellidos.', 'error');
      return;
    }
    if (!acompanantes) {
      form.acompanantes.focus();
      showStatus('Por favor, indica el número de acompañantes.', 'error');
      return;
    }

    // ── Comprobar URL ──
    const actionUrl = form.getAttribute('action') || '';
    if (!actionUrl || actionUrl === 'PENDIENTE_URL_APPS_SCRIPT') {
      showStatus(
        'El formulario aún no está conectado. Añade la URL de Google Apps Script en el atributo action.',
        'error'
      );
      return;
    }

    // ── Estado: enviando ──
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Enviando…';

    try {
      // Google Apps Script requiere mode: 'no-cors'
      await fetch(actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form),
      });

      // Con no-cors no podemos leer la respuesta; asumimos éxito si no hubo excepción
      showStatus(
        '¡Gracias por confirmar! Estamos deseando verte el 11 de julio. 🤍',
        'success'
      );
      form.reset();
      if (btnText) btnText.textContent = '¡Enviado!';

    } catch {
      showStatus(
        'Ha habido un problema al enviar. Por favor, inténtalo de nuevo o contáctanos directamente.',
        'error'
      );
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Confirmar asistencia';
    }
  });

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className   = 'form-status ' + type;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
