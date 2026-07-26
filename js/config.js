/**
 * CONFIGURAÇÃO DO EVENTO
 * Edite apenas este arquivo para atualizar as informações do site.
 * Nenhum outro arquivo precisa ser alterado no dia a dia.
 */
const EVENT_CONFIG = {
  // --- Noivos ---
  coupleNames: "Fernanda & Matheus",

  // --- Data e local ---
  // dateLabel: o texto exibido no site. Deixe como está até a data ser confirmada.
  dateLabel: "29 de agosto de 2026",
  dateNote: "Data e horário em confirmação — em breve atualizamos aqui!",
  timeLabel: "Horário a confirmar",
  // eventDateTime: usado SÓ para calcular o contador regressivo.
  // Formato: "AAAA-MM-DDTHH:MM:00-03:00" (horário de Brasília).
  // Ainda sem hora definida? Deixe um horário provisório (ex: 16:00) —
  // o contador funciona normalmente e o aviso acima já avisa que pode mudar.
  eventDateTime: "2026-08-29T16:00:00-03:00",
  addressLine1: "Rua Américo Figueiredo, 6355",
  addressLine2: "Condomínio Coimbra — Salão de festas",
  // Link do Google Maps (gerado a partir do endereço acima)
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Rua Américo Figueiredo, 6355, Condomínio Coimbra, Salão de festas"),

  // --- E-mail para receber as confirmações (EmailJS) ---
  // Veja o README.md para o passo a passo de como criar sua conta gratuita
  // no https://www.emailjs.com/ e preencher os 3 campos abaixo.
  emailJs: {
    publicKey: "BG-ZQVOwt8qNe36D6",
    serviceId: "service_ulu6ye6",
    templateId: "template_ase57np",
  },

  // --- Pix ---
  pix: {
    key: "Matheus_domingues01@outlook.com",
    receiverName: "Fernanda e Matheus",
    receiverCity: "Votorantim",
  },

  // --- Lista de presentes (valores estimados/aproximados) ---
  gifts: [
    { name: "Jogo de panelas antiaderentes", value: 320 },
    { name: "Air fryer", value: 380 },
    { name: "Jogo de facas profissionais", value: 180 },
    { name: "Liquidificador", value: 210 },
    { name: "Kit de temperos e especiarias", value: 90 },
    { name: "Jogo de taças de vinho", value: 130 },
    { name: "Panela de pressão elétrica", value: 350 },
    { name: "Aparelho de jantar (12 peças)", value: 260 },
    { name: "Jogo de toalhas de cozinha", value: 70 },
    { name: "Forma de bolo com fundo removível", value: 60 },
    { name: "Cafeteira elétrica", value: 230 },
    { name: "Kit para churrasco", value: 150 },
    { name: "Jogo de potes herméticos", value: 110 },
    { name: "Batedeira", value: 290 },
    { name: "Jogo de copos de vidro", value: 85 },
  ],

  // --- Bingo / o que trazer ---
  bingoText:
    "Vamos ter bingo para todo mundo! Pedimos que cada convidado traga uma prenda simples para ser sorteada.",
  bringText: "Também pedimos a colaboração de cada família com 1kg de carne e bebidas.",
};
