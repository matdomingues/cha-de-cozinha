/**
 * Gerador de payload Pix (BR Code / EMV) — 100% client-side, sem backend.
 * Gera o "Pix copia e cola" e a imagem do QR Code correspondente.
 */

function pixTLV(id, value) {
  const len = String(value.length).padStart(2, "0");
  return `${id}${len}${value}`;
}

function pixCRC16(payload) {
  let polinomio = 0x1021;
  let resultado = 0xffff;

  for (let offset = 0; offset < payload.length; offset++) {
    resultado ^= payload.charCodeAt(offset) << 8;
    for (let bitwise = 0; bitwise < 8; bitwise++) {
      if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
      resultado &= 0xffff;
    }
  }
  return resultado.toString(16).toUpperCase().padStart(4, "0");
}

function pixRemoveAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Monta o payload Pix no padrão BR Code.
 * @param {Object} params
 * @param {string} params.key - Chave Pix (email, CPF, celular ou aleatória)
 * @param {string} params.name - Nome do recebedor (máx. 25 caracteres)
 * @param {string} params.city - Cidade do recebedor (máx. 15 caracteres)
 * @param {number} [params.amount] - Valor (opcional; se ausente, quem paga escolhe o valor)
 * @param {string} [params.txid] - Identificador da transação
 * @param {string} [params.description] - Descrição curta (opcional)
 */
function buildPixPayload({ key, name, city, amount, txid = "***", description }) {
  const cleanName = pixRemoveAccents(name).substring(0, 25).toUpperCase();
  const cleanCity = pixRemoveAccents(city).substring(0, 15).toUpperCase();

  const gui = pixTLV("00", "BR.GOV.BCB.PIX");
  const chave = pixTLV("01", key);
  const merchantAccountValue = description
    ? gui + chave + pixTLV("02", pixRemoveAccents(description).substring(0, 40))
    : gui + chave;
  const merchantAccount = pixTLV("26", merchantAccountValue);

  let payload =
    pixTLV("00", "01") +
    pixTLV("01", "11") +
    merchantAccount +
    pixTLV("52", "0000") +
    pixTLV("53", "986") +
    (amount ? pixTLV("54", Number(amount).toFixed(2)) : "") +
    pixTLV("58", "BR") +
    pixTLV("59", cleanName) +
    pixTLV("60", cleanCity) +
    pixTLV("62", pixTLV("05", txid));

  payload += "6304";
  const crc = pixCRC16(payload);
  return payload + crc;
}

/** Retorna a URL de uma imagem de QR Code para o payload informado. */
function pixQrCodeUrl(payload, size = 280) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(
    payload
  )}`;
}
