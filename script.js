// Manejo del formulario RSVP
document.addEventListener('DOMContentLoaded', function() {
    const formRSVP = document.getElementById('formRSVP');
    
    if (formRSVP) {
        formRSVP.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const asistencia = document.getElementById('asistencia').value;
            const personas = document.getElementById('personas').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (!nombre || !email || !asistencia || !personas) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Crear objeto con datos
            const datosRSVP = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                asistencia: asistencia,
                personas: personas,
                mensaje: mensaje,
                fecha: new Date().toLocaleString('es-ES')
            };
            
            // Guardar en localStorage (para demostración)
            guardarRSVP(datosRSVP);
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
            
            // Limpiar formulario
            formRSVP.reset();
        });
    }
});

// Función para guardar RSVP en localStorage
function guardarRSVP(datos) {
    // Obtener array de RSVPs guardados
    let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    
    // Agregar nuevo RSVP
    rsvps.push(datos);
    
    // Guardar en localStorage
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    
    console.log('RSVP guardado:', datos);
    console.log('Total de RSVPs:', rsvps.length);
}

// Función para mostrar mensaje de éxito
function mostrarMensajeExito() {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = 'alerta-exito';
    alerta.textContent = '¡Gracias! Tu confirmación ha sido recibida. 💕';
    
    // Agregar estilos a la alerta
    alerta.style.cssText = `
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
        animation: slideInUp 0.5s ease;
        position: fixed;
        top: 80px;
        left: 20px;
        right: 20px;
        max-width: 600px;
        margin: 20px auto;
        z-index: 1000;
    `;
    
    // Insertar alerta
    const formRSVP = document.getElementById('formRSVP');
    formRSVP.parentNode.insertBefore(alerta, formRSVP);
    
    // Remover alerta después de 4 segundos
    setTimeout(() => {
        alerta.remove();
    }, 4000);
}

// Efecto de scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Agregar animación al scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Función para obtener y mostrar RSVPs (útil para administrativos)
function obtenerRSVPs() {
    const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    return rsvps;
}

// Función para limpiar todos los RSVPs (útil para resetear datos)
function limpiarRSVPs() {
    if (confirm('¿Deseas limpiar todos los RSVPs guardados?')) {
        localStorage.removeItem('rsvps');
        console.log('RSVPs limpios');
    }
}

// Agregar algunos emojis animados en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    // Opcional: agregar animación a elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos de tarjetas
    document.querySelectorAll('.detalle-card, .galeria-item, .contacto-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
