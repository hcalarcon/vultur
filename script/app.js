import { initNavbar } from "../modules/navBar/app.js";
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.querySelector(".carousel-dots");

async function loadModule(containerId, modulePath, initFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(modulePath);
    const html = await response.text();
    container.innerHTML = html;

    if (typeof initFn === "function") {
      initFn(container);
    }
  } catch (err) {
    console.error("Error cargando módulo:", err);
  }
  lucide.createIcons();
}

// Cargar el navbar en todas las páginas
loadModule("navbar-container", "../modules/navbar/index.html", initNavbar);
loadModule("footer-container", "../modules/footer/index.html");

// Details toggle (solo si existen)
const allDetails = document.querySelectorAll(".custom-details");
allDetails.forEach((details) => {
  const summaryText = details.querySelector("summary span");
  if (!summaryText) return; // por seguridad

  details.addEventListener("toggle", () => {
    summaryText.textContent = details.open ? "Ver menos" : "Ver más";
  });
});

// Contact form handler (solo si existe)
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (!form) return;

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  alert(
    `¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`
  );
  form.reset();
  console.log("Form data:", { name, email, message });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .stat-item, .pricing-card, .info-item, .features-card, .nosotros-content, .nosotros-image"
  );
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Smooth scrolling for anchor links (si existen)
function initSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (anchors.length === 0) return;

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Hover effects (si existen)
function initHoverEffects() {
  const buttons = document.querySelectorAll(
    ".cta-button, .service-cta-button, .submit-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });
  });
}

// DOMContentLoaded init
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initSmoothScrolling();
  initHoverEffects();
});

if (slides.length && dotsContainer) {
  let currentIndex = 0;
  let interval;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    dotsContainer.children[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dotsContainer.children[currentIndex].classList.add("active");

    resetInterval();
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
  }

  resetInterval();
}
window.handleSubmit = handleSubmit;
