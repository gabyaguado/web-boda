# Página Web de Boda

Una página web moderna y responsiva para bodas con todas las características esenciales.

## 📁 Estructura del Proyecto

```
Web-boda/
├── index.html          # Página principal
├── styles.css          # Estilos de la web
├── script.js           # Funcionalidad y JavaScript
└── README.md           # Este archivo
```

## ✨ Características

- **Página de inicio** con una sección hero atractiva
- **Detalles de la boda**: fecha, hora, ubicación y información importante
- **Galería de fotos**: con placeholders listos para agregar imágenes
- **Formulario RSVP**: para confirmar asistencia con almacenamiento en localStorage
- **Sección de contacto**: con teléfono, email y dirección
- **Navegación pegajosa**: menú que permanece visible al hacer scroll
- **Diseño responsivo**: optimizado para dispositivos móviles, tablets y desktop
- **Animaciones suaves**: transiciones y efectos de scroll

## 🚀 Cómo Usar

### Opción 1: Abrir directamente en el navegador
1. Abre el archivo `index.html` en tu navegador web favorito
2. ¡Listo! La web está lista para usar

### Opción 2: Usar un servidor local
Si deseas servir la página desde un servidor local:

**Con Python 3:**
```bash
python -m http.server 8000
```

**Con Node.js (con módulo http-server):**
```bash
npx http-server
```

Luego accede a `http://localhost:8000`

## 🎨 Personalización

### Cambiar colores
Edita el archivo `styles.css` y modifica las variables CSS al inicio:

```css
:root {
    --color-primary: #e91e63;      /* Color principal (rosa) */
    --color-secondary: #f48fb1;    /* Color secundario */
    --color-dark: #333;             /* Color oscuro */
    --color-light: #f5f5f5;         /* Color claro */
}
```

### Actualizar información de la boda
Edita `index.html` y reemplaza:
- Nombres de los novios
- Fecha y hora
- Ubicación de la ceremonia
- Ubicación de la recepción
- Teléfono y email de contacto
- Información importante

### Agregar fotos reales
1. Crea una carpeta `images` en el proyecto
2. Agrega tus fotos en esa carpeta
3. En `index.html`, reemplaza los placeholders de galería:

```html
<div class="galeria-item">
    <img src="images/foto1.jpg" alt="Foto 1" class="foto-galeria">
    <p>Descripción de la foto</p>
</div>
```

4. Actualiza el CSS para las imágenes:

```css
.foto-galeria {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
}
```

## 💾 Almacenamiento de Datos

El formulario RSVP guarda los datos en `localStorage` del navegador. Para ver los RSVPs guardados, abre la consola del navegador (F12) y escribe:

```javascript
obtenerRSVPs()
```

Para limpiar todos los datos:
```javascript
limpiarRSVPs()
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (Últimas versiones)
- ✅ Firefox (Últimas versiones)
- ✅ Safari (Últimas versiones)
- ✅ Responsivo en móviles

## 🔄 Para ir más allá

### Integrar con base de datos real
Para guardar los RSVP en un servidor, necesitarías:
1. Un backend (Node.js, Python, PHP, etc.)
2. Una base de datos (MySQL, MongoDB, etc.)
3. Modificar `script.js` para enviar datos al servidor

### Enviar emails de confirmación
Puedes integrar servicios como:
- EmailJS
- Formspree
- Mailchimp

### Agregar más funcionalidades
- Mapa interactivo de ubicación
- Tabla de asientos
- Registro de deseos/lista de bodas
- Diario de la boda
- Chat en vivo

## 📝 Notas

- Los datos se guardan en localStorage, que es local del navegador/dispositivo
- Los datos se pierden si se borra el historial del navegador
- Para una solución profesional, considera integrar un backend

## 🎉 ¡Felicidades!

¡Esperamos que tu boda sea memorable! ¡Que disfrutes de tu día especial! 💕
