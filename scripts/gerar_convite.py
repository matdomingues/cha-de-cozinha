"""
Gera o convite em PDF (docs/convite.pdf).
Edite as constantes abaixo (principalmente SITE_URL) e rode:
    python3 scripts/gerar_convite.py
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

# ---------- CONFIGURAÇÃO ----------
SITE_URL = "https://matdomingues.github.io/cha-de-cozinha/#rsvp"
COUPLE_NAMES = "Fernanda & Matheus"
DATE_LABEL = "29 de agosto de 2026"
DATE_NOTE = "(data e horário em confirmação)"
ADDRESS_1 = "Rua Américo Figueiredo, 6355"
ADDRESS_2 = "Condomínio Coimbra — Salão de festas"
OUTPUT_PATH = "docs/convite.pdf"

SAGE = HexColor("#AFB796")
SAGE_DEEP = HexColor("#6F7A56")
CREAM = HexColor("#F2E5D5")
CREAM_LIGHT = HexColor("#FAF3EA")
INK = HexColor("#423F33")
GOLD = HexColor("#C69A5D")
WHITE = HexColor("#FFFDF9")

W, H = A4


def sprig(c, x, y, scale=1.0, color=SAGE_DEEP):
    """Desenha um pequeno ramo/folha decorativo (mesmo motivo do site)."""
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(color)
    c.setLineWidth(1.6)
    c.line(0, 0, 0, 58)
    p = c.beginPath()
    p.moveTo(0, 24)
    p.curveTo(-14, 22, -16, 8, -18, -2)
    p.curveTo(2, 0, 14, 10, 0, 24)
    c.drawPath(p, stroke=1, fill=0)
    p2 = c.beginPath()
    p2.moveTo(0, 40)
    p2.curveTo(12, 38, 14, 26, 16, 18)
    p2.curveTo(-2, 20, -12, 28, 0, 40)
    c.drawPath(p2, stroke=1, fill=0)
    c.restoreState()


def draw_invite(c):
    # fundo
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # moldura fina
    margin = 14 * mm
    c.setStrokeColor(SAGE)
    c.setLineWidth(1.2)
    c.rect(margin, margin, W - 2 * margin, H - 2 * margin, fill=0, stroke=1)

    center_x = W / 2

    # ramo decorativo no topo
    sprig(c, center_x, H - 78 * mm, scale=1.1)

    # eyebrow
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 11)
    text = "C H Á   D E   C O Z I N H A"
    c.drawCentredString(center_x, H - 92 * mm, text)

    # nomes
    c.setFillColor(SAGE_DEEP)
    c.setFont("Times-Bold", 34)
    c.drawCentredString(center_x, H - 108 * mm, COUPLE_NAMES)

    # frase
    c.setFillColor(INK)
    c.setFont("Helvetica", 12)
    c.drawCentredString(
        center_x, H - 120 * mm, "Com muito carinho, convidamos você para celebrar conosco"
    )

    # divisor
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(center_x - 22 * mm, H - 130 * mm, center_x + 22 * mm, H - 130 * mm)

    # cartão de detalhes
    card_w, card_h = 130 * mm, 55 * mm
    card_x = center_x - card_w / 2
    card_y = H - 130 * mm - card_h - 14 * mm
    c.setFillColor(WHITE)
    c.roundRect(card_x, card_y, card_w, card_h, 8, fill=1, stroke=0)

    c.setFillColor(SAGE_DEEP)
    c.setFont("Times-Bold", 15)
    c.drawCentredString(center_x, card_y + card_h - 16 * mm, DATE_LABEL)
    c.setFillColor(INK)
    c.setFont("Helvetica-Oblique", 9.5)
    c.drawCentredString(center_x, card_y + card_h - 22 * mm, DATE_NOTE)

    c.setStrokeColor(CREAM)
    c.setLineWidth(1)
    c.line(card_x + 14 * mm, card_y + card_h - 27 * mm, card_x + card_w - 14 * mm, card_y + card_h - 27 * mm)

    c.setFillColor(SAGE_DEEP)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawCentredString(center_x, card_y + card_h - 36 * mm, ADDRESS_1)
    c.setFillColor(INK)
    c.setFont("Helvetica", 10.5)
    c.drawCentredString(center_x, card_y + card_h - 42 * mm, ADDRESS_2)

    # botão "Confirmar Presença" (com link clicável)
    btn_w, btn_h = 78 * mm, 14 * mm
    btn_x = center_x - btn_w / 2
    btn_y = card_y - 22 * mm
    c.setFillColor(SAGE_DEEP)
    c.roundRect(btn_x, btn_y, btn_w, btn_h, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12.5)
    c.drawCentredString(center_x, btn_y + btn_h / 2 - 4, "CONFIRMAR PRESENÇA")

    # link clicável sobre o botão
    c.linkURL(
        SITE_URL,
        (btn_x, btn_y, btn_x + btn_w, btn_y + btn_h),
        relative=0,
    )

    c.setFillColor(INK)
    c.setFont("Helvetica-Oblique", 8.5)
    c.drawCentredString(center_x, btn_y - 8 * mm, "toque no botão acima para confirmar presença e ver os presentes")

    # ramo decorativo embaixo
    c.saveState()
    c.translate(center_x, margin + 30 * mm)
    c.rotate(180)
    sprig(c, 0, 0, scale=0.8)
    c.restoreState()


c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
draw_invite(c)
c.showPage()
c.save()
print(f"Convite gerado em {OUTPUT_PATH}")
