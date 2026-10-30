/**
 * Mi Mundo Infantil - Scripts de producción
 * Proyecto: https://github.com
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Mi Mundo Infantil: JS cargado y listo.");

    // ==========================================================
    // 1. MENU DE NAVEGACIÓN RESPONSIVO (MOBILE TOGGLE)
    // ==========================================================
    // Pensado por si reduces la pantalla en móviles. 
    // Busca un botón con clase o id 'menu-toggle' y la lista 'nav-menu'
    const menuToggle = document.getElementById("menu-toggle") || document.querySelector(".menu-toggle");
    const navMenu = document.getElementById("nav-menu") || document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    // ==========================================================
    // 2. BOTÓN "VOLVER ARRIBA" (SCROLL TO TOP)
    // ==========================================================
    // Un clásico muy útil para mejorar la usabilidad al leer textos largos.
    const backToTopBtn = document.getElementById("back-to-top") || document.querySelector(".back-to-top");
    
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================================
    // 3. ENLACES ACTIVOS AUTOMÁTICOS
    // ==========================================================
    // Resalta visualmente en el menú qué página está viendo el usuario actualmente.
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a, .nav-menu a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPath.includes(href) && href !== "" && href !== "#") {
            link.classList.add("active-link");
        }
    });

    // ==========================================================
    // 4. CONTROLADOR DE FORMULARIOS (De haberlos, ej. Contacto/Registro)
    // ==========================================================
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue bruscamente
            
            // Validación básica antes de enviar
            const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = "red";
                } else {
                    input.style.borderColor = "#ccc";
                }
            });

            if (isValid) {
                alert("✨ ¡Muchas gracias por tu mensaje! Nos pondremos en contacto muy pronto. ✨");
                contactForm.reset();
            } else {
                alert("⚠️ Por favor, rellena todos los campos obligatorios.");
            }
        });
    }

    // ==========================================================
    // 5. EFECTO ANIMACIÓN AL HACER SCROLL (OPCIONAL)
    // ==========================================================
    // Añade la clase 'fade-in' a los elementos cuando entran en la pantalla
    const fadeElements = document.querySelectorAll(".reveal");
    
    const checkScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add("visible");
            }
        });
    };

    if (fadeElements.length > 0) {
        window.addEventListener("scroll", checkScroll);
        checkScroll(); // Ejecución inicial
    }
});