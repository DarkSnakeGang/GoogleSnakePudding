#!/usr/bin/env python3
"""Download postimg URLs and replace them with Remix-style data:image/png;base64 URIs."""

from __future__ import annotations

import base64
import re
import ssl
import sys
import threading
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path(__file__).resolve().parent / "postimg-cache"
FRUIT_ICONS = ROOT / "Libraries" / "fruit-icons"
POSTIMG_RE = re.compile(r"https://i\.postimg\.cc/[A-Za-z0-9_/-]+\.png")
WORKERS = 16
MAX_RETRIES = 4

# postimg CDN serves an expired cert; still fetch the image bytes.
SSL_CTX = ssl._create_unverified_context()

SCAN_FILES = [
    *sorted((ROOT / "Libraries").glob("*.js")),
    ROOT / "MoreMenuMod.js",
    ROOT / "VisibilityMod.js",
]

_print_lock = threading.Lock()
_cache_lock = threading.Lock()


def log(msg: str = "") -> None:
    with _print_lock:
        print(msg, flush=True)


def to_data_url(png_bytes: bytes) -> str:
    return "data:image/png;base64," + base64.b64encode(png_bytes).decode("ascii")


def cache_path_for(url: str) -> Path:
    parts = url.split("i.postimg.cc/", 1)[1]
    return CACHE / parts.replace("/", "__")


def local_fruit_icon(url: str) -> Path | None:
    name = url.rsplit("/", 1)[-1]
    candidate = FRUIT_ICONS / name
    return candidate if candidate.is_file() else None


def download_bytes(url: str) -> tuple[bytes, int]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept": "image/png,image/*;q=0.8,*/*;q=0.5",
            "Referer": "https://postimages.org/",
        },
    )
    with urllib.request.urlopen(req, timeout=90, context=SSL_CTX) as resp:
        data = resp.read()
        status = getattr(resp, "status", None) or resp.getcode()
    return data, status


def fetch_png(url: str) -> tuple[bytes, str]:
    """Return (png_bytes, source_label)."""
    local = local_fruit_icon(url)
    if local is not None:
        return local.read_bytes(), f"local fruit-icons/{local.name}"

    path = cache_path_for(url)
    with _cache_lock:
        if path.is_file() and path.stat().st_size > 0:
            return path.read_bytes(), f"cache {path.name}"

    t0 = time.perf_counter()
    last_err: Exception | None = None
    data = b""
    status = 0
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            data, status = download_bytes(url)
            last_err = None
            break
        except urllib.error.HTTPError as e:
            last_err = e
            log(f"         retry {attempt}/{MAX_RETRIES} HTTP {e.code} {url.rsplit('/', 1)[-1]}")
        except Exception as e:
            last_err = e
            log(f"         retry {attempt}/{MAX_RETRIES} {url.rsplit('/', 1)[-1]}: {e}")
        time.sleep(min(2 ** attempt, 8))

    if last_err is not None:
        raise RuntimeError(f"Failed fetching {url} after {MAX_RETRIES} tries: {last_err}") from last_err

    elapsed = time.perf_counter() - t0
    if not data.startswith(b"\x89PNG"):
        raise RuntimeError(
            f"Not a PNG (HTTP {status}, {len(data)} bytes, {elapsed:.1f}s): {url}"
        )

    with _cache_lock:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)

    return data, f"download {len(data)} bytes in {elapsed:.1f}s (HTTP {status})"


def resolve_one(index: int, total: int, url: str) -> tuple[str, str]:
    name = url.rsplit("/", 1)[-1]
    log(f"[{index}/{total}] start {name}")
    data, source = fetch_png(url)
    data_url = to_data_url(data)
    log(f"[{index}/{total}] done  {name} <- {source} | {len(data_url)} chars")
    return url, data_url


def collect_urls(files: list[Path]) -> list[str]:
    found: set[str] = set()
    for path in files:
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        found.update(POSTIMG_RE.findall(text))
    return sorted(found)


def replace_in_file(path: Path, mapping: dict[str, str]) -> int:
    text = path.read_text(encoding="utf-8")
    count = 0
    for url in sorted(mapping.keys(), key=len, reverse=True):
        n = text.count(url)
        if n:
            text = text.replace(url, mapping[url])
            count += n
    path.write_text(text, encoding="utf-8", newline="\n")
    return count


def main() -> None:
    t_all = time.perf_counter()
    log(f"Root: {ROOT}")
    log(f"Cache: {CACHE}")
    log(f"Workers: {WORKERS}")
    log("SSL verification: disabled (postimg expired cert workaround)")

    files = [p for p in SCAN_FILES if p.is_file()]
    if not files:
        raise SystemExit("No source files to scan")

    log(f"Scanning {len(files)} files...")
    for path in files:
        log(f"  - {path.relative_to(ROOT)}")

    urls = collect_urls(files)
    log(f"Found {len(urls)} unique postimg URLs")
    if not urls:
        log("Nothing to embed")
        return

    CACHE.mkdir(parents=True, exist_ok=True)
    mapping: dict[str, str] = {}
    errors: list[str] = []

    log(f"Fetching with {WORKERS} parallel workers...")
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {
            pool.submit(resolve_one, i, len(urls), url): url
            for i, url in enumerate(urls, 1)
        }
        for fut in as_completed(futures):
            url = futures[fut]
            try:
                key, data_url = fut.result()
                mapping[key] = data_url
            except Exception as e:
                errors.append(f"{url}: {e}")
                log(f"ERROR {url}: {e}")

    if errors:
        log(f"Failed {len(errors)}/{len(urls)} downloads:")
        for err in errors:
            log(f"  {err}")
        raise SystemExit(1)

    log(f"All {len(mapping)} images ready in {time.perf_counter() - t_all:.1f}s")
    log("")
    log("Replacing URLs in source files...")
    total = 0
    for path in files:
        n = replace_in_file(path, mapping)
        if n:
            log(f"  replaced {n} in {path.relative_to(ROOT)}")
            total += n
        else:
            log(f"  (none) {path.relative_to(ROOT)}")

    leftovers = collect_urls(files)
    if leftovers:
        log("ERROR: postimg URLs still present:")
        for u in leftovers:
            log(f"  {u}")
        raise SystemExit(1)

    log("")
    log(
        f"Done. Replaced {total} occurrences in {time.perf_counter() - t_all:.1f}s. "
        "No postimg leftovers."
    )


if __name__ == "__main__":
    main()
