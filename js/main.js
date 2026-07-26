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

    const templateParams = {
      guest_name: name,
      guest_count: count,
      guest_message: message || "(sem mensagem)",
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
  const grid = document.getElementById("gift-grid");
  EVENT_CONFIG.gifts.forEach((gift) => {
    const card = document.createElement("button");
    card.className = "gift-card";
    card.type = "button";
    card.innerHTML = `
      <span class="gift-card__name">${gift.name}</span>
      <span class="gift-card__value">R$ ${gift.value}<small>valor aproximado</small></span>
    `;
    card.addEventListener("click", () => openPixModal(gift.name, gift.value));
    grid.appendChild(card);
  });

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
