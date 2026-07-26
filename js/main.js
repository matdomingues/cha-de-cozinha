document.addEventListener("DOMContentLoaded", () => {
  // ---------- Preenche textos a partir do config.js ----------
  document.getElementById("hero-date").textContent =
    EVENT_CONFIG.dateLabel + " · " + EVENT_CONFIG.addressLine2.split("—")[0].trim();
  document.getElementById("detail-date").textContent = EVENT_CONFIG.dateLabel;
  document.getElementById("detail-time").textContent = EVENT_CONFIG.timeLabel;
  document.getElementById("detail-address1").textContent = EVENT_CONFIG.addressLine1;
  document.getElementById("detail-address2").textContent = EVENT_CONFIG.addressLine2;
  document.getElementById("detail-maps").href = EVENT_CONFIG.mapsUrl;
  document.getElementById("detail-note").textContent = EVENT_CONFIG.dateNote;
  document.getElementById("bingo-text").textContent = EVENT_CONFIG.bingoText;
  document.getElementById("bring-text").textContent = EVENT_CONFIG.bringText;

  // ---------- Contador regressivo ----------
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date(EVENT_CONFIG.eventDateTime);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (isNaN(targetDate.getTime())) {
      countdownEl.style.display = "none";
      return;
    }

    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="countdown--done">É hoje! 🌿</p>';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // ---------- EmailJS init ----------
  if (window.emailjs && EVENT_CONFIG.emailJs.publicKey !== "SUA_PUBLIC_KEY_AQUI") {
    emailjs.init({ publicKey: EVENT_CONFIG.emailJs.publicKey });
  }

  // ---------- RSVP form ----------
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("rsvp-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("rsvp-name").value.trim();
    const count = document.getElementById("rsvp-count").value;
    const message = document.getElementById("rsvp-message").value.trim();

    if (!name || !count) return;

    const submittedAt = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const templateParams = {
      guest_name: name,
      guest_count: count,
      guest_message: message || "(sem mensagem)",
      submitted_at: submittedAt,
    };

    const notConfigured =
      EVENT_CONFIG.emailJs.publicKey === "SUA_PUBLIC_KEY_AQUI" ||
      EVENT_CONFIG.emailJs.serviceId === "SEU_SERVICE_ID_AQUI" ||
      EVENT_CONFIG.emailJs.templateId === "SEU_TEMPLATE_ID_AQUI";

    if (notConfigured) {
      status.textContent =
        "⚠ E-mail ainda não configurado (veja o README) — mas guardamos aqui: " +
        name +
        " confirmou " +
        count +
        " pessoa(s).";
      status.className = "form-status form-status--err";
      form.reset();
      return;
    }

    status.textContent = "Enviando...";
    status.className = "form-status";

    emailjs
      .send(EVENT_CONFIG.emailJs.serviceId, EVENT_CONFIG.emailJs.templateId, templateParams)
      .then(() => {
        status.textContent = "Presença confirmada! Obrigado, " + name + " 🌿";
        status.className = "form-status form-status--ok";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Não conseguimos enviar agora. Tente novamente em instantes.";
        status.className = "form-status form-status--err";
      });
  });

  // ---------- Lista de presentes ----------
  const GIFT_ICONS = {
    panela: '<circle cx="12" cy="14" r="7"/><path d="M5 14h14M9 10V6M15 10V6"/>',
    pressão: '<circle cx="12" cy="14" r="7"/><path d="M5 14h14M12 6V3M9 4h6"/>',
    faca: '<path d="M4 20L17 7a2.5 2.5 0 000-3.5v0A2.5 2.5 0 0013.5 7L4 16.5"/><path d="M4 20l-1-4 4 1z"/>',
    liquidificador: '<path d="M8 4h8l-1 12H9L8 4z"/><rect x="7" y="16" width="10" height="4" rx="1"/>',
    batedeira: '<path d="M8 4h8l-1 12H9L8 4z"/><rect x="7" y="16" width="10" height="4" rx="1"/>',
    fryer: '<rect x="5" y="9" width="14" height="11" rx="2"/><path d="M9 9V6a3 3 0 016 0v3"/>',
    tempero: '<rect x="8" y="6" width="8" height="14" rx="2"/><path d="M10 6V4h4v2"/>',
    especiaria: '<rect x="8" y="6" width="8" height="14" rx="2"/><path d="M10 6V4h4v2"/>',
    taça: '<path d="M7 4h10l-1 7a4 4 0 01-8 0L7 4z"/><path d="M12 15v5M9 20h6"/>',
    copo: '<path d="M7 4h10l-1.2 14a1 1 0 01-1 .9H9.2a1 1 0 01-1-.9L7 4z"/>',
    jantar: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/>',
    toalha: '<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    bolo: '<circle cx="12" cy="14" r="7"/><path d="M9 8V5M12 8V4M15 8V5"/>',
    forma: '<circle cx="12" cy="14" r="7"/><path d="M9 8V5M12 8V4M15 8V5"/>',
    cafeteira: '<path d="M6 8h9a3 3 0 010 6h-1"/><path d="M6 8v9a2 2 0 002 2h4a2 2 0 002-2v-3"/>',
    churrasco: '<path d="M12 3c1 2-1 2-1 4a2 2 0 004 0c0-1-1-2-1-3"/><path d="M6 14c2-2 10-2 12 0M7 14c0 4 3 7 5 7s5-3 5-7"/>',
    potes: '<rect x="7" y="8" width="10" height="12" rx="2"/><path d="M9 8V6h6v2"/>',
    hermético: '<rect x="7" y="8" width="10" height="12" rx="2"/><path d="M9 8V6h6v2"/>',
  };

  function iconFor(name) {
    const key = Object.keys(GIFT_ICONS).find((k) => name.toLowerCase().includes(k));
    return GIFT_ICONS[key] || '<path d="M12 8v13M12 8a3 3 0 10-3-3c0 1.7 3 3 3 3zM12 8a3 3 0 103-3c0 1.7-3 3-3 3z"/><rect x="4" y="8" width="16" height="4"/><path d="M6 12v7a2 2 0 002 2h8a2 2 0 002-2v-7"/>';
  }

  const grid = document.getElementById("gift-grid");
  EVENT_CONFIG.gifts.forEach((gift) => {
    const card = document.createElement("button");
    card.className = "gift-card";
    card.type = "button";
    card.innerHTML = `
      <svg class="gift-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconFor(gift.name)}</svg>
      <span class="gift-card__name">${gift.name}</span>
      <span class="gift-card__value">R$ ${gift.value}<small>valor aproximado</small></span>
    `;
    card.addEventListener("click", () => openPixModal(gift.name, gift.value));
    grid.appendChild(card);
  });

  // ---------- Reveal ao rolar a página ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---------- Pix modal ----------
  const modal = document.getElementById("pix-modal");
  const modalTitle = document.getElementById("pix-modal-title");
  const modalQr = document.getElementById("pix-modal-qr");
  const modalCode = document.getElementById("pix-modal-code");
  const copyBtn = document.getElementById("pix-copy-btn");

  function openPixModal(giftName, amount) {
    const payload = buildPixPayload({
      key: EVENT_CONFIG.pix.key,
      name: EVENT_CONFIG.pix.receiverName,
      city: EVENT_CONFIG.pix.receiverCity,
      amount: amount || undefined,
      description: giftName ? giftName.substring(0, 30) : "Cha de cozinha",
    });

    modalTitle.textContent = giftName
      ? `Presentear: ${giftName}`
      : "Presentear com valor livre";
    modalQr.src = pixQrCodeUrl(payload);
    modalCode.textContent = payload;
    copyBtn.dataset.code = payload;
    modal.classList.add("open");
  }

  document.getElementById("btn-pix-livre").addEventListener("click", () => openPixModal(null, null));
  document.getElementById("pix-modal-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  copyBtn.addEventListener("click", () => {
    const code = copyBtn.dataset.code;
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = "Copiado! ✓";
      setTimeout(() => (copyBtn.textContent = "Copiar código Pix"), 2000);
    });
  });
});
