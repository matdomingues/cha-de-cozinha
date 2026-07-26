/**
 * CONFIGURAÇÃO DO EVENTO
 * Edite apenas este arquivo para atualizar as informações do site.
 * Nenhum outro arquivo precisa ser alterado no dia a dia.
 */
const EVENT_CONFIG = {
  // --- Noivos ---
  coupleNames: "Fernanda & Matheus",

  // --- Data e local ---
  dateLabel: "29 de agosto de 2026",
  // timeLabel: horário exibido no site. Atualize aqui quando tiver o horário definitivo.
  timeLabel: "Horário a confirmar",
  // eventDateTime: usado para calcular o contador regressivo.
  // Formato: "AAAA-MM-DDTHH:MM:00-03:00" (horário de Brasília). Atualize junto com timeLabel.
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

  // --- Lista de presentes (valores estimados/aproximados), organizada por categoria ---
  giftCategories: [
    {
      category: "Cozinha",
      items: [
        { name: "Jogo de panelas", value: 320 },
        { name: "Panela de pressão", value: 220 },
        { name: "Frigideira antiaderente", value: 90 },
        { name: "Panela wok", value: 130 },
        { name: "Caçarola", value: 100 },
        { name: "Leiteira", value: 60 },
        { name: "Assadeiras", value: 50 },
        { name: "Forma para bolo", value: 45 },
        { name: "Forma para pizza", value: 40 },
        { name: "Travessa de vidro", value: 70 },
        { name: "Bowls", value: 55 },
        { name: "Escorredor de arroz", value: 35 },
        { name: "Escorredor de macarrão", value: 40 },
        { name: "Peneiras", value: 25 },
        { name: "Tábua de corte", value: 45 },
        { name: "Kit de facas", value: 180 },
        { name: "Descascador", value: 15 },
        { name: "Ralador", value: 20 },
        { name: "Espremedor de alho", value: 20 },
        { name: "Abridor de latas", value: 20 },
        { name: "Abridor de vinho", value: 25 },
        { name: "Tesoura de cozinha", value: 25 },
        { name: "Fouet", value: 20 },
        { name: "Espátula de silicone", value: 20 },
        { name: "Colher de silicone", value: 20 },
        { name: "Pegador de massa", value: 20 },
        { name: "Concha", value: 20 },
        { name: "Escumadeira", value: 20 },
        { name: "Pegador de salada", value: 25 },
        { name: "Colheres e xícaras medidoras", value: 30 },
      ],
    },
    {
      category: "Mesa",
      items: [
        { name: "Jogo de pratos", value: 260 },
        { name: "Jogo de copos", value: 85 },
        { name: "Taças", value: 130 },
        { name: "Xícaras", value: 60 },
        { name: "Canecas", value: 45 },
        { name: "Faqueiro", value: 150 },
        { name: "Jarra", value: 50 },
        { name: "Porta-guardanapos", value: 25 },
        { name: "Toalha de mesa", value: 60 },
        { name: "Jogo americano", value: 45 },
      ],
    },
    {
      category: "Organização",
      items: [
        { name: "Potes herméticos", value: 110 },
        { name: "Porta-mantimentos", value: 60 },
        { name: "Porta-temperos", value: 70 },
        { name: "Saleiro", value: 20 },
        { name: "Pimenteiro", value: 20 },
        { name: "Porta-talheres", value: 45 },
        { name: "Organizador de gavetas", value: 50 },
        { name: "Cesto organizador", value: 55 },
      ],
    },
    {
      category: "Limpeza",
      items: [
        { name: "Lixeira", value: 90 },
        { name: "Escorredor de louça", value: 80 },
        { name: "Panos de prato", value: 30 },
        { name: "Panos de limpeza", value: 25 },
        { name: "Esponjas", value: 15 },
        { name: "Luvas", value: 15 },
        { name: "Balde", value: 25 },
        { name: "Rodo", value: 30 },
        { name: "Vassoura", value: 30 },
        { name: "Pá de lixo", value: 20 },
      ],
    },
    {
      category: "Eletroportáteis",
      items: [
        { name: "Liquidificador", value: 210 },
        { name: "Cafeteira", value: 230 },
        { name: "Chaleira elétrica", value: 130 },
        { name: "Sanduicheira", value: 120 },
        { name: "Torradeira", value: 150 },
        { name: "Mixer", value: 160 },
        { name: "Grill elétrico", value: 220 },
      ],
    },
    {
      category: "Extras",
      items: [
        { name: "Boleira", value: 60 },
        { name: "Bandeja", value: 45 },
        { name: "Petisqueira", value: 40 },
        { name: "Porta-bolo", value: 55 },
        { name: "Garrafa térmica", value: 90 },
        { name: "Moedor de pimenta", value: 45 },
        { name: "Moedor de café", value: 130 },
        { name: "Escorredor de salada", value: 40 },
        { name: "Porta-papel toalha", value: 25 },
        { name: "Porta-filme", value: 20 },
        { name: "Timer de cozinha", value: 25 },
      ],
    },
  ],

  // --- Bingo / o que trazer ---
  bingoText:
    "Vamos ter bingo para todo mundo! Pedimos que cada convidado traga uma prenda simples para ser sorteada.",
  bringText: "Também pedimos a colaboração de cada família com 1kg de carne e bebidas.",
};
