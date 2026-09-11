#!/usr/bin/env python3
from pathlib import Path
import re

r = re.compile(r"https://i\.postimg\.cc/[^\s\"']+")
files = [
    "PuddingMod.js",
    "SpeedrunMod.js",
    "MorePudding.js",
    "MoreMenuMod.js",
    "VisibilityMod.js",
]
any_left = False
for name in files:
    p = Path(name)
    if not p.exists():
        print(name, "MISSING")
        continue
    t = p.read_text(encoding="utf-8")
    m = sorted(set(r.findall(t)))
    print(
        f"{name}: {len(m)} postimg, data_urls={t.count('data:image/png;base64')}, "
        f"size={p.stat().st_size / 1024 / 1024:.2f}MB"
    )
    for u in m:
        print(" ", u)
        any_left = True
raise SystemExit(1 if any_left else 0)
