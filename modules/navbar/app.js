// const navbar = document.getElementById("navbar");
// const hamburger = document.getElementById("hamburger");
// const menu = document.getElementById("menu");
// const overlay = document.getElementById("overlay");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }
// });
// function toggleMenu() {
//   if (menu && overlay && hamburger) {
//     menu.classList.toggle("active");
//     overlay.classList.toggle("active");
//     hamburger.classList.toggle("active");
//   }
// }

// // Función cerrar
// function closeMenu() {
//   if (menu && overlay && hamburger) {
//     menu.classList.remove("active");
//     overlay.classList.remove("active");
//     hamburger.classList.remove("active");
//   }
// }

// // Abrir/cerrar con el botón hamburguesa
// if (hamburger) hamburger.addEventListener("click", toggleMenu);

// // Cerrar si se hace click en overlay
// if (overlay) overlay.addEventListener("click", closeMenu);

// // Cerrar si se hace click en un link
// document.querySelectorAll(".menu a").forEach((link) => {
//   link.addEventListener("click", closeMenu);
// });

export function initNavbar(rootEl) {
  // rootEl = contenedor donde inyectaste el HTML del navbar
  if (!rootEl) return;

  // Evitar doble init si se llama dos veces
  if (rootEl.dataset.navbarInitialized === "true") return;
  rootEl.dataset.navbarInitialized = "true";

  const navbar = rootEl.querySelector("#navbar, [data-navbar]");
  const hamburger = rootEl.querySelector("#hamburger, [data-hamburger]");
  const menu = rootEl.querySelector("#menu, [data-menu]");
  const overlay = rootEl.querySelector("#overlay, [data-overlay]");
  const links = rootEl.querySelectorAll(".menu a, [data-menu] a");

  // Efecto scroll (el nav está en todas)
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");
    },
    { passive: true }
  );

  function lockBodyScroll(lock) {
    document.body.classList.toggle("no-scroll", !!lock);
  }

  function toggleMenu() {
    if (!menu || !overlay || !hamburger) return;
    const willOpen = !menu.classList.contains("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("active");
    lockBodyScroll(willOpen);
  }

  function closeMenu() {
    if (!menu || !overlay || !hamburger) return;
    menu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    lockBodyScroll(false);
  }

  hamburger?.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", closeMenu);
  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Devuelvo API por si la querés usar
  return { toggleMenu, closeMenu };
}
