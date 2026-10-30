/**
 * 🏫 I.E.P. Mi Mundo Infantil — Huancayo (Sistema de Interfaz de Usuario)
 * Versión: 2.1.0 (Producción Completa)
 * Desarrollado para optimizar la experiencia de padres y alumnos.
 */

// Encapsulamos todo en un módulo autoejecutable para proteger el alcance global
(() => {
  "use strict";

  // Configuración de Selectores Globales basados en tu marcado de Bootstrap y CSS
  const DOM = {
    navbar: document.querySelector(".navbar-mmi"),
    navLinks: document.querySelectorAll(".navbar-mmi .nav-link"),
    gallery: document.querySelector(".gallery-img") ? true : false,
    galleryImages: document.querySelectorAll(".gallery-img"),
    platformButtons: document.querySelectorAll('a[href*="plataforma"], a[href*="sesion"], .btn-plataforma'),
    cards: document.querySelectorAll(".card"),
    body: document.body
  };

  /**
   * 1. INICIALIZADOR PRINCIPAL
   */
  const init = () => {
    console.log("%c🏫 Mi Mundo Infantil — Core JS Activado con Éxito", "color: #2f5d3f; font-weight: bold; font-size: 12px;");
    
    setupNavbarScroll();
    setupActiveLinks();
    setupPlatformSecurity();
    setupSmoothAnimations();
    
    // Si detecta que estamos en la página de galería (viveic.html) activa sus componentes
    if (DOM.gallery) {
      initGalleryFeatures();
    }
    
    // Inyectar componentes globales complementarios
    injectScrollToTopButton();
  };

  /**
   * 2. EFECTO DINÁMICO DEL NAVBAR (SCROLL & BLUR)
   */
  const setupNavbarScroll = () => {
    if (!DOM.navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        DOM.navbar.style.padding = "0.5rem 1rem";
        DOM.navbar.style.background = "rgba(31, 58, 43, 0.98)";
        DOM.navbar.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
        DOM.navbar.style.borderBottom = "1px solid rgba(143, 196, 160, 0.2)";
      } else {
        DOM.navbar.style.padding = "1rem 1rem";
        DOM.navbar.style.background = "rgba(31, 58, 43, 0.92)";
        DOM.navbar.style.boxShadow = "none";
        DOM.navbar.style.borderBottom = "1px solid transparent";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Ejecución preventiva en carga
  };

  /**
   * 3. CONTROLADOR DE ENLACES ACTIVOS AUTOMÁTICOS
   */
  const setupActiveLinks = () => {
    if (DOM.navLinks.length === 0) return;
    
    const currentPath = window.location.pathname;

    DOM.navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      // Mapear rutas locales y relativas para evitar errores en GitHub Pages
      if (currentPath.includes(href) && href !== "" && href !== "#") {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else if ((currentPath === "/" || currentPath.includes("index.html")) && href === "index.html") {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  };

  /**
   * 4. CAPTURA Y GESTIÓN DE ACCESOS A LA PLATAFORMA (Seguridad Escolar)
   */
  const setupPlatformSecurity = () => {
    if (DOM.platformButtons.length === 0) return;

    DOM.platformButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const destination = button.getAttribute("href");
        
        // Si el enlace está vacío o apunta a un anchor falso, manejamos la UX de la intranet
        if (!destination || destination === "#" || destination.includes("javascript")) {
          event.preventDefault();
          
          showModalNotice(
            "🔒 Acceso al Sistema de Control Escolar",
            "Estimada familia de <strong>Mi Mundo Infantil</strong>:<br><br>" +
            "La plataforma de control de asistencias, registro de logros por competencia (AD, A, B, C) " +
            "y validación de recojo seguro se encuentra en mantenimiento programado preparando el ciclo escolar.<br><br>" +
            "<em>Las credenciales de acceso serán entregadas de manera personal durante la reunión de apertura.</em>"
          );
        }
      });
    });
  };

  /**
   * 5. ENRIQUECIMIENTO VISUAL E INTERACTIVIDAD DE LA GALERÍA (viveic.html)
   */
  const initGalleryFeatures = () => {
    console.log(`🖼️ Inicializando suite de imágenes: ${DOM.galleryImages.length} elementos encontrados.`);
    
    DOM.galleryImages.forEach((img, index) => {
      // Lazy loading nativo por JS en caso de imágenes pesadas de actividades escolares
      img.setAttribute("loading", "lazy");
      img.style.cursor = "pointer";
      img.style.transition = "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.3s ease";

      // Manejadores de interacción visual táctil y puntero
      img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.04)";
        img.style.filter = "brightness(1.05)";
      });

      img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
        img.style.filter = "brightness(1)";
      });

      // Crear componente Lightbox integrado dinámicamente al hacer clic
      img.addEventListener("click", () => {
        openLightbox(img.src, img.alt || `Actividad Escolar ${index + 1}`);
      });
    });
  };

  /**
   * 6. INTERFAZ DINÁMICA: DETECTOR DE SCROLL PARA EFECTOS DE ENTRADA (REVEAL)
   */
  const setupSmoothAnimations = () => {
    // Si aplicas la clase CSS 'reveal' a secciones o contenedores, estos se desvanecerán suavemente al hacer scroll
    const sectionsToReveal = document.querySelectorAll(".hero-section, section, .card");
    if (sectionsToReveal.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target); // Detiene la observación una vez animado
        }
      });
    }, observerOptions);

    sectionsToReveal.forEach(section => {
      section.style.opacity = "0";
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      sectionObserver.observe(section);
    });
  };

  /**
   * 7. UTILIDADES DE INTERFAZ: COMPONENTE DE NOTIFICACIÓN MODAL POP-UP
   */
  const showModalNotice = (title, message) => {
    // Evitar duplicados en el DOM
    const existingModal = document.getElementById("mmi-custom-modal");
    if (existingModal) existingModal.remove();

    const modalOverlay = document.createElement("div");
    modalOverlay.id = "mmi-custom-modal";
    Object.assign(modalOverlay.style, {
      position: "fixed", inset: "0", background: "rgba(0,0,0,0.6)",
      display: "grid", placeItems: "center", zIndex: "9999",
      padding: "1rem", backdropFilter: "blur(4px)", opacity: "0",
      transition: "opacity 0.3s ease"
    });

    const modalBox = document.createElement("div");
    Object.assign(modalBox.style, {
      background: "#faf6ef", padding: "2.5rem 2rem", borderRadius: "1rem",
      maxWidth: "500px", width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      textAlign: "center", border: "2px solid #2f5d3f", transform: "scale(0.9)",
      transition: "transform 0.3s ease", color: "#2a241c", fontFamily: "sans-serif"
    });

    modalBox.innerHTML = `
      <h3 style="font-family: serif; color: #1f3a2b; margin-bottom: 1.5rem;">${title}</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #5a5146; margin-bottom: 2rem;">${message}</p>
      <button id="close-mmi-modal" style="background: #2f5d3f; color: #fff; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.2s;">
        Entendido
      </button>
    `;

    modalOverlay.appendChild(modalBox);
    DOM.body.appendChild(modalOverlay);

    // Animación de entrada rápida
    setTimeout(() => {
      modalOverlay.style.opacity = "1";
      modalBox.style.transform = "scale(1)";
    }, 10);

    const closeModal = () => {
      modalOverlay.style.opacity = "0";
      modalBox.style.transform = "scale(0.9)";
      setTimeout(() => modalOverlay.remove(), 300);
    };

    modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
    modalOverlay.querySelector("#close-mmi-modal").addEventListener("click", closeModal);
  };

  /**
   * 8. COMPONENTE EXTRA: INTUICIÓNDEL LIGHTBOX PARA VER FOTOS EN GRANDE
   */
  const openLightbox = (src, altText) => {
    const lightbox = document.createElement("div");
    Object.assign(lightbox.style, {
      position: "fixed", inset: "0", background: "rgba(15, 26, 20, 0.95)",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      zIndex: "10000", padding: "1rem", cursor: "zoom-out"
    });

    lightbox.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 80vh;">
        <img src="${src}" alt="${altText}" style="max-width: 100%; max-height: 80vh; border-radius: 0.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); object-fit: contain;">
        <span style="position: absolute; top: -40px; right: 0; color: #fff; font-size: 30px; cursor: pointer; font-weight: bold;">&times;</span>
      </div>
      <p style="color: #faf6ef; margin-top: 15px; font-family: serif; font-size: 1.1rem; text-align: center;">${altText}</p>
    `;

    DOM.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => lightbox.remove());
  };

  /**
   * 9. UTILIDADES DE INTERFAZ: BOTÓN DINÁMICO "VOLVER ARRIBA"
   */
  const injectScrollToTopButton = () => {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.title = "Volver arriba";
    Object.assign(btn.style, {
        position: "fixed", bottom: "25px", right: "25px",
        width: "45px", height: "45px", borderRadius: "50%",
        background: "#c97a5a", color: "#fff", border: "none",
        fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)", display: "none",
        zIndex: "999", transition: "background 0.2s, transform 0.2s"
        });
        btn.addEventListener("mouseenter", () => { btn.style.background = "#a07855"; btn.style.transform = "scale(1.05)"; });
        btn.addEventListener("mouseleave", () => { btn.style.background = "#c97a5a"; btn.style.transform = "scale(1)"; });
        window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
        btn.style.display = "block";
        } else {
        btn.style.display = "none";
        }
        }, { passive: true });
        btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        });
        DOM.body.appendChild(btn);
        };
        // Lanzar el inicializador del documento
        DOM.body ? init() : document.addEventListener("DOMContentLoaded", init);
        })();
        