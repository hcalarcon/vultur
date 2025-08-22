// Navbar (siempre presente)
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

// Scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
function toggleMenu() {
  if (menu && overlay && hamburger) {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("active");
  }
}

// Función cerrar
function closeMenu() {
  if (menu && overlay && hamburger) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
  }
}

// Abrir/cerrar con el botón hamburguesa
if (hamburger) hamburger.addEventListener("click", toggleMenu);

// Cerrar si se hace click en overlay
if (overlay) overlay.addEventListener("click", closeMenu);

// Cerrar si se hace click en un link
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

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

// Loading animation (si quieres mantenerlo)
function showLoading() {
  const loader = document.createElement("div");
  loader.id = "page-loader";
  loader.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: hsl(35, 25%, 97%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    ">
      <div style="
        width: 50px;
        height: 50px;
        border: 3px solid hsl(30, 15%, 88%);
        border-top: 3px solid hsl(25, 35%, 25%);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(loader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }, 300);
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

// Form validation (si existe el formulario)
function initFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearValidationError(input));
  });
}

// Utilities
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  clearValidationError(field);

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "Este campo es obligatorio";
  } else if (
    field.type === "email" &&
    value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    isValid = false;
    errorMessage = "Por favor ingresa un email válido";
  }

  if (!isValid) showValidationError(field, errorMessage);

  return isValid;
}

function showValidationError(field, message) {
  field.style.borderColor = "hsl(0, 65%, 55%)";
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.cssText =
    "color: hsl(0, 65%, 55%); font-size: 0.875rem; margin-top: 0.25rem;";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearValidationError(field) {
  field.style.borderColor = "hsl(30, 15%, 88%)";
  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) errorDiv.remove();
}

// DOMContentLoaded init
document.addEventListener("DOMContentLoaded", () => {
  showLoading();
  initScrollAnimations();
  initSmoothScrolling();
  initHoverEffects();
  initFormValidation();
  console.log("Coworking San Martín website initialized successfully!");
});

// Export functions
window.navigateTo = navigateTo;
window.scrollToSection = scrollToSection;
window.handleSubmit = handleSubmit;
