const EMAIL_DESTINO = "gustavozsouza.forwork@gmail.com";

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#menu");
const form = document.querySelector("#form-contato");
const statusEl = document.querySelector("#form-status");
const anoEl = document.querySelector("#ano");

const resetToTop = () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", resetToTop);
} else {
  resetToTop();
}

if (anoEl) {
  anoEl.textContent = String(new Date().getFullYear());
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (form && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    if (!nome || !email || !mensagem) {
      statusEl.textContent = "Preencha nome, e-mail e mensagem.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = "Informe um e-mail válido.";
      return;
    }

    statusEl.textContent = "Enviando mensagem…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent = "Mensagem enviada! Em breve eu respondo.";
        form.reset();
      } else {
        statusEl.textContent =
          "Não consegui enviar agora. Tente novamente em instantes.";
      }
    } catch (error) {
      statusEl.textContent =
        "Falha de conexão. Verifique sua internet e tente de novo.";
    }
  });
}
