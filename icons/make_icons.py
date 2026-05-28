"""Generate flat PNG icons for the extension at 16/48/128 px.

Design: rounded blue square with a white magnifying glass and a red
diagonal slash, signaling "search without AI clutter".
"""
import math
from PIL import Image, ImageDraw

SS = 8  # supersample factor for smooth edges
ACCENT = (26, 115, 232, 255)   # google blue
GLASS = (255, 255, 255, 255)
SLASH = (234, 67, 53, 255)     # google red


def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def make(size):
    s = size * SS
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    rounded_rect(d, [0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=ACCENT)

    # Magnifying glass ring.
    cx, cy = int(s * 0.42), int(s * 0.42)
    r = int(s * 0.20)
    ring = max(SS, int(s * 0.055))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=GLASS, width=ring)

    # Handle.
    hx, hy = cx + int(r * 0.72), cy + int(r * 0.72)
    ex, ey = int(s * 0.74), int(s * 0.74)
    d.line([hx, hy, ex, ey], fill=GLASS, width=ring)

    # Diagonal "no" slash.
    pad = int(s * 0.16)
    d.line([s - pad, pad, pad, s - pad], fill=SLASH, width=max(SS, int(s * 0.07)))

    return img.resize((size, size), Image.LANCZOS)


for size in (16, 48, 128):
    make(size).save(f"icon{size}.png")
    print(f"wrote icon{size}.png")
