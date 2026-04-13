// =============================================
// NAVBAR: sombra al hacer scroll + menú móvil
// =============================================
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Cerrar menú móvil al pulsar un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});


// =============================================
// CUENTA ATRÁS
// =============================================
const BODA_DATE = new Date('2026-05-15T16:00:00');

function actualizarContador() {
  const ahora = new Date();
  const diff = BODA_DATE - ahora;

  if (diff <= 0) {
    document.getElementById('dias').textContent = '00';
    document.getElementById('horas').textContent = '00';
    document.getElementById('minutos').textContent = '00';
    document.getElementById('segundos').textContent = '00';
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('dias').textContent = String(dias).padStart(2, '0');
  document.getElementById('horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
  document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

actualizarContador();
setInterval(actualizarContador, 1000);


// =============================================
// FADE-IN CON INTERSECTION OBSERVER
// =============================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));


// =============================================
// FORMULARIO RSVP
// =============================================
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');

rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = rsvpForm.nombre.value.trim();
  if (!nombre) {
    rsvpForm.nombre.focus();
    rsvpForm.nombre.style.borderColor = '#cc4444';
    return;
  }
  rsvpForm.nombre.style.borderColor = '';

  const datos = {
    nombre,
    email: rsvpForm.email.value.trim(),
    personas: rsvpForm.personas.value,
    asistencia: rsvpForm.asistencia.value,
    mensaje: rsvpForm.mensaje.value.trim(),
    fecha: new Date().toISOString(),
  };

  const rsvps = obtenerRSVPs();
  rsvps.push(datos);
  localStorage.setItem('rsvps_boda', JSON.stringify(rsvps));

  rsvpForm.classList.add('hidden');
  rsvpSuccess.classList.remove('hidden');
});

function obtenerRSVPs() {
  try {
    return JSON.parse(localStorage.getItem('rsvps_boda')) || [];
  } catch {
    return [];
  }
}

function limpiarRSVPs() {
  localStorage.removeItem('rsvps_boda');
}
