# Chá de Panela — Fernanda & Matheus 🌿

Site simples e bonito para o chá de panela, com confirmação de presença por
e-mail, lista de presentes e pagamento direto via Pix (com QR Code).

Não precisa de servidor, banco de dados nem programação para funcionar — é só
publicar os arquivos e configurar duas contas gratuitas (GitHub e EmailJS).

---

## 1. Editar as informações do evento

Abra o arquivo **`js/config.js`** — é o único arquivo que você deve editar no
dia a dia. Nele dá pra mudar:

- Data e horário (`dateLabel`, `timeLabel`, `dateNote`)
- Endereço (`addressLine1`, `addressLine2`)
- Lista de presentes e valores (`gifts`)
- Chave Pix (`pix.key`)
- Textos do bingo (`bingoText`, `bringText`)

Depois de editar, é só salvar o arquivo — o site atualiza sozinho.

---

## 2. Configurar o envio de e-mail (EmailJS) — grátis

Isso é o que faz a confirmação de presença chegar automaticamente no seu
e-mail, sem precisar de servidor.

1. Crie uma conta gratuita em **https://www.emailjs.com/**
2. Em **Email Services**, conecte seu e-mail (Gmail, Outlook etc.) → copie o
   **Service ID**
3. Em **Email Templates**, crie um template novo com este conteúdo, por
   exemplo:
   ```
   Assunto: Nova confirmação de presença — Chá de Panela

   Nome: {{guest_name}}
   Quantidade de pessoas: {{guest_count}}
   Mensagem: {{guest_message}}
   ```
   Copie o **Template ID**.
4. Em **Account → General**, copie a **Public Key**.
5. Cole os 3 valores em `js/config.js`, dentro de `emailJs: { ... }`.

Pronto — cada confirmação de presença vai cair automaticamente no seu e-mail.

> Enquanto esses campos não forem preenchidos, o site continua funcionando
> normalmente; ele só avisa na tela que o e-mail ainda não foi configurado.

---

## 3. Publicar o site (GitHub Pages) — grátis

1. Crie uma conta em **https://github.com** (se ainda não tiver)
2. Crie um repositório novo, por exemplo `cha-de-cozinha`
3. Envie estes arquivos para o repositório (pelo site do GitHub mesmo, em
   **Add file → Upload files**, arrastando a pasta inteira)
4. Vá em **Settings → Pages**, em "Source" escolha **branch `main`**, pasta
   `/ (root)` → **Save**
5. Em alguns minutos o site estará em:
   `https://SEU-USUARIO.github.io/cha-de-cozinha/`

Depois de publicar, atualize o link no arquivo `docs/convite.pdf`
(veja o passo 4) para que o botão "Confirmar presença" do convite em PDF
aponte para o endereço certo.

---

## 4. Convite em PDF

O arquivo **`docs/convite.pdf`** é o convite pronto para enviar por
WhatsApp/e-mail. Ele tem um botão **"Confirmar Presença"** que abre o site
direto na seção de confirmação.

Se o endereço do site mudar, me avise (ou peça para eu gerar de novo) que eu
recrio o PDF já apontando para o link definitivo.

---

## Estrutura dos arquivos

```
cha-de-cozinha/
├── index.html          → estrutura da página
├── css/style.css       → cores e visual
├── js/config.js        → ⭐ informações do evento (edite aqui)
├── js/main.js          → lógica do site (RSVP, presentes, Pix)
├── js/pix.js           → gerador do QR Code Pix
└── docs/convite.pdf    → convite para compartilhar
```

## Observações importantes

- A lista de presentes é só uma vitrine com valores aproximados — ela **não
  reserva** o item automaticamente para quem escolheu (não há um banco de
  dados por trás). Se um presente for muito procurado, é normal duas pessoas
  presentearem o mesmo valor — o Pix cai direto na conta de vocês de qualquer
  forma.
- O QR Code é gerado por um serviço público (`api.qrserver.com`) — ele só
  desenha a imagem a partir do código Pix, não guarda nem processa nenhum
  dado.
- Teste sempre a confirmação de presença e o Pix antes de divulgar o link
  para os convidados.
