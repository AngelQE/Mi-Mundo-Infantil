(() => {
  "use strict";

  // 1. Navbar: se compacta al hacer scroll
  const navbar = document.querySelector(".navbar-mmi");
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    btnTop.classList.toggle("show", window.scrollY > 400);
  };

  // 2. Enlace activo según la página actual
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-mmi .nav-link").forEach((link) => {
    const activo = link.getAttribute("href") === pagina;
    link.classList.toggle("active", activo);
    if (activo) link.setAttribute("aria-current", "page");
  });

  // 3. Botón "volver arriba"
  const btnTop = document.createElement("button");
  btnTop.className = "btn-top";
  btnTop.type = "button";
  btnTop.textContent = "↑";
  btnTop.title = "Volver arriba";
  btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(btnTop);

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 4. Animación de entrada al hacer scroll
  const observer = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card, .valor").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  // 5. Galería: ver la foto en grande
  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", () => {
      const caja = document.createElement("div");
      caja.className = "lightbox";

      const foto = document.createElement("img");
      foto.src = img.src;
      foto.alt = img.alt;

      const texto = document.createElement("p");
      const titulo = img.closest(".card")?.querySelector("h2");
      texto.textContent = titulo ? titulo.textContent : img.alt;

      caja.append(foto, texto);
      caja.addEventListener("click", () => caja.remove());
      document.body.appendChild(caja);
    });
  });

  // 6. Cerrar la galería ampliada con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelector(".lightbox")?.remove();
  });
})();