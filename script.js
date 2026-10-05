// =============================================================
// CCC-BÁSICO - LANDING PAGE
// =============================================================

// IMPORTANTE:
// Reemplaza este valor por tu número real de WhatsApp.
// Formato Chile: 569XXXXXXXX (sin +, espacios ni guiones).
const WHATSAPP_NUMBER = "569XXXXXXXX";

const header = document.querySelector(".header");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");
const leadForm = document.getElementById("leadForm");
const formHint = document.getElementById("formHint");

// Año automático del footer.
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Cambia el estilo del encabezado al hacer scroll.
function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Menú móvil.
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Animaciones suaves de entrada.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
// Formulario -> WhatsApp.
if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name =
      document.getElementById("leadName")?.value.trim() || "";

    const business =
      document.getElementById("leadBusiness")?.value.trim() || "";

    const type =
      document.getElementById("leadType")?.value || "";

    const city =
      document.getElementById("leadCity")?.value.trim() || "";

    const need =
      document.getElementById("leadNeed")?.value.trim() || "";

    const message = [
      "Hola, quiero solicitar una demostración de CCC-Básico.",
      "",
      `Nombre: ${name}`,
      `Negocio: ${business}`,
      `Tipo de negocio: ${type}`,
      city ? `Ciudad/comuna: ${city}` : null,
      need ? `Quiero controlar mejor: ${need}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl =
      `https://wa.me/56932322246?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  });
}