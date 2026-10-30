/**
 * I.E.P. Mi Mundo Infantil - Huancayo
 * Script de Control de Interfaz y Navegación
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🏫 Sistema de Mi Mundo Infantil inicializado correctamente.");

  // ==========================================
  // 1. COMPORTAMIENTO DEL NAVBAR (SCROLL EFFECT)
  // ==========================================
  // Cambia la opacidad o añade un sombreado al menú cuando el usuario baja la página
  const navbar = document.querySelector(".navbar-mmi");
  
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
        navbar.style.background = "rgba(31, 58, 43, 0.98)"; // Más sólido al hacer scroll
      } else {
        navbar.style.boxShadow = "none";
        navbar.style.background = "rgba(31, 58, 43, 0.92)"; // Transparencia original
      }
    });
  }

  // ==========================================
  // 2. DETECTOR DE PÁGINA ACTIVA (NAV-LINKS)
  // ==========================================
  // Bootstrap usa la clase .active en los enlaces. Esto asegura que se marque 
  // correctamente el botón según la página en la que se encuentra el padre de familia.
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-mmi .nav-link");

  navLinks.forEach(link => {
    // Quitamos el active por defecto para gestionarlo limpio
    link.classList.remove("active"); 
    
    const href = link.getAttribute("href");
    if (currentUrl.includes(href) && href !== "" && href !== "#") {
      link.classList.add("active");
    } else if ((currentUrl === "/" || currentUrl.includes("index.html")) && href === "index.html") {
      link.classList.add("active");
    }
  });

  // ==========================================
  // 3. CAPTURA DE ACCESO A LA PLATAFORMA
  // ==========================================
  // Manejo de clicks en los botones de "Iniciar sesión" o "Acceso Plataforma"
  const botonesPlataforma = document.querySelectorAll('a[href*="plataforma"], a[href*="sesion"]');
  
  botonesPlataforma.forEach(boton => {
    boton.addEventListener("click", (e) => {
      // Si aún no tienes el backend de la plataforma listo, esto evita enlaces rotos
      if (boton.getAttribute("href") === "#" || boton.getAttribute("href") === "") {
        e.preventDefault();
        alert("🔒 El sistema de control de asistencias y seguridad escolar estará disponible para el inicio del año escolar 2026. ¡Muchas gracias por su paciencia! ✨");
      }
    });
  });

  // ==========================================
  // 4. OPTIMIZACIÓN DE IMÁGENES EN LA GALERÍA (viveic.html)
  // ==========================================
  // Si estamos en la página de galería, maneja transiciones suaves cuando cargan las fotos
  const galeriaImagenes = document.querySelectorAll(".gallery-img");
  
  if (galeriaImagenes.length > 0) {
    console.log(`🖼️ Detectadas ${galeriaImagenes.length} fotos en la galería escolar.`);
    
    galeriaImagenes.forEach(img => {
      // Añade un pequeño efecto visual de carga limpia si las imágenes son pesadas
      img.style.transition = "opacity 0.3s ease-in-out, transform 0.25s ease";
      
      // Hover interactivo extra para las fotos mediante JS (aparte del CSS de tus .cards)
      img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.03)";
      });
      img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    });
  }
});
