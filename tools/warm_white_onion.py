"""Warm up white onion icons: less stark white, slightly browner."""
from pathlib import Path
from PIL import Image

ICONS = Path(__file__).resolve().parents[1] / "Libraries" / "fruit-icons"
PREVIEW = Path(__file__).resolve().parent / "_preview"
PREVIEW.mkdir(exist_ok=True)

FILES = [
    "white-onion-normal.png",
    "white-onion-pixel.png",
    "white-onion-real.png",
]


def warm_pixel(r: int, g: int, b: int, strength: float) -> tuple[int, int, int]:
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    if lum < 55:
        return r, g, b
    # Cream/brown target for highlights
    tr, tg, tb = 210, 178, 132
    if lum > 210:
        t = 0.28 * strength
    elif lum > 150:
        t = 0.18 * strength
    else:
        t = 0.10 * strength
    nr = int(r * (1 - t) + tr * t)
    ng = int(g * (1 - t) + tg * t)
    nb = int(b * (1 - t) + tb * t)
    # Slightly mute pure whites
    if lum > 220:
        nr = min(255, nr + 2)
        ng = max(0, ng - 6)
        nb = max(0, nb - 14)
    return min(255, nr), max(0, ng), max(0, nb)


def adjust(path: Path, strength: float) -> Image.Image:
    im = Image.open(path).convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a < 16:
                continue
            nr, ng, nb = warm_pixel(r, g, b, strength)
            px[x, y] = (nr, ng, nb, a)
    return im


def preview(im: Image.Image, name: str) -> None:
    bg = Image.new("RGB", im.size, (40, 160, 80))
    bg.paste(im, mask=im)
    bg.save(PREVIEW / name.replace(".png", "-on-green.png"))


def main() -> None:
    strengths = {
        "white-onion-normal.png": 1.0,
        "white-onion-pixel.png": 0.85,
        "white-onion-real.png": 1.0,
    }
    for name in FILES:
        path = ICONS / name
        im = adjust(path, strengths[name])
        im.save(path, "PNG", optimize=True)
        preview(im, name)
        px = im.load()
        vals = [px[x, y][:3] for y in range(0, im.height, 4) for x in range(0, im.width, 4) if px[x, y][3] > 20]
        avg = tuple(sum(c[i] for c in vals) // len(vals) for i in range(3))
        print(name, "avg rgb", avg)


if __name__ == "__main__":
    main()
