// Navigation functions
function navigateTo(page) {
  window.location.href = page;
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Contact form handler
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simulate form submission
  alert(
    `¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`
  );

  // Reset form
  event.target.reset();

  // Here you would typically send the data to your backend
  console.log("Form data:", { name, email, message });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animatedElements = document.querySelectorAll(
    ".service-card, .stat-item, .pricing-card, .info-item, .features-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Loading animation
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

  // Remove loader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 300);
  });
}

// Add hover effects to interactive elements
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

// Mobile menu toggle (if needed for future navigation)
function initMobileMenu() {
  // This would be implemented if you add a navigation menu
  console.log("Mobile menu functionality ready for implementation");
}

// Form validation enhancements
function initFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearValidationError(this);
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Remove existing error
  clearValidationError(field);

  // Validation rules
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "Este campo es obligatorio";
  } else if (field.type === "email" && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = "Por favor ingresa un email válido";
  }

  if (!isValid) {
    showValidationError(field, errorMessage);
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showValidationError(field, message) {
  field.style.borderColor = "hsl(0, 65%, 55%)";

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.cssText = `
        color: hsl(0, 65%, 55%);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function clearValidationError(field) {
  field.style.borderColor = "hsl(30, 15%, 88%)";
  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Show loading animation
  showLoading();

  // Initialize all features
  initScrollAnimations();
  initSmoothScrolling();
  initHoverEffects();
  initMobileMenu();
  initFormValidation();

  console.log("Coworking San Martín website initialized successfully!");
});

// Add some utility functions
const utils = {
  // Debounce function for performance
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: function (func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

// Export functions for use in HTML onclick attributes
window.navigateTo = navigateTo;
window.scrollToSection = scrollToSection;
window.handleSubmit = handleSubmit;
