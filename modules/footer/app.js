// vultur/modules/footer/app.js

function createFooterHTML() {
  return `
    <footer class="footer">
      <div class="footer-pattern"></div>
      <div class="container">
        <div class="footer-content">
          <!-- Logo + Nombre + Frase -->
          <div class="footer-section footer-brand">
            <img src="./public/logo-bg.png" alt="Logo" class="footer-logo" />
            <h4 class="footer-title merriweather-family">VULTUR cowork</h4>
            <p class="footer-text">Donde tus ideas cobran vuelo</p>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Contacto</h4>
            <address class="footer-text">
              <i data-lucide="map-pin"></i>
              Belgrano 845. San Martín de los Andes
            </address>
            <a href="tel:2972529892" class="footer-text">
              <i data-lucide="phone"></i>
              +54 2972529892
            </a>
            <a href="mailto:info@vulturcowork.com.ar" class="footer-text">
              <i data-lucide="mail"></i>
              info@vulturcowork.com
            </a>
          </div>

          <!-- Redes sociales -->
          <div class="footer-section">
            <h4 class="footer-title">Síguenos</h4>
            <div class="social-links">
              <a
                href="https://www.instagram.com/vultur.cowork/"
                target="_blank"
                class="social-link"
              >
                <i data-lucide="instagram"></i> Instagram
              </a>
              <a
                href="https://linktr.ee/vultur.cowork"
                target="_blank"
                class="social-link"
              >
                <i data-lucide="link"></i> Linktree
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2024 Coworking San Martín. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

export function createFooter() {
  const container = document.createElement("div");
  container.innerHTML = createFooterHTML();
  return container.firstElementChild; // Retorna solo el <footer>
}

export function initFooter(rootEl) {
  // rootEl = contenedor donde se insertará el footer
  if (!rootEl) return;

  // Evitar doble init
  if (rootEl.dataset.footerInitialized === "true") return;
  rootEl.dataset.footerInitialized = "true";

  // Crear e insertar el footer
  const footerElement = createFooter();
  rootEl.appendChild(footerElement);

  // Como el footer no tiene JavaScript específico,
  // solo necesitamos asegurarnos de que los iconos de Lucide se rendericen
  // (esto se hace desde el archivo principal)

  console.log("Footer inicializado correctamente");
}
