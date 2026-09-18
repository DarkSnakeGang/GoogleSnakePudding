#!/usr/bin/env python3
"""Update mod indicator labels with game version on the current branch."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

BRANCH_VERSION = {
    "dice_added_version": 1,
    "shield_stable": 2,
    "arrow": 3,
    "pre_dpad": 4,
    "pre_hotdog": 5,
    "hotdog": 6,
    "magnet": 7,
    "broken_gate": 8,
    "v9": 9,
    "v10": 10,
    "v11": 11,
    "v12": 12,
    "main": 13,
}

# Exact indicator assignments only (not "Pudding Mod - Google Test Version")
PATTERNS = [
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])Pudding Mod\2"), r"\1\2Pudding Mod v{v}\2"),
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])More Pudding Mod\2"), r"\1\2More Pudding Mod v{v}\2"),
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])Speedrun Mod\2"), r"\1\2Speedrun Mod v{v}\2"),
    # Also catch already-versioned labels so re-runs are idempotent to a target version
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])Pudding Mod v\d+\2"), r"\1\2Pudding Mod v{v}\2"),
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])More Pudding Mod v\d+\2"), r"\1\2More Pudding Mod v{v}\2"),
    (re.compile(r"(modIndicator\.textContent\s*=\s*)(['\"])Speedrun Mod v\d+\2"), r"\1\2Speedrun Mod v{v}\2"),
]

SCAN_GLOBS = [
    "PuddingInit.js",
    "SpeedrunModInit.js",
    "MorePuddingInit.js",
    "PuddingMod.js",
    "SpeedrunMod.js",
    "MorePudding.js",
]


def current_branch() -> str:
    return subprocess.check_output(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=ROOT, text=True
    ).strip()


def patch_file(path: Path, version: int) -> int:
    text = path.read_text(encoding="utf-8")
    original = text
    for rx, repl in PATTERNS:
        text = rx.sub(repl.format(v=version), text)
    if text == original:
        return 0
    path.write_text(text, encoding="utf-8", newline="\n")
    return 1


def rebuild() -> None:
    for script in ("PuddingCombiner.py", "SpeedrunModCombiner.py", "MoreBuilder.py"):
        p = ROOT / script
        if p.is_file():
            print(f"  running {script}")
            subprocess.check_call([sys.executable, str(p)], cwd=ROOT)


def main() -> None:
    branch = current_branch()
    if branch not in BRANCH_VERSION:
        raise SystemExit(f"Branch {branch!r} has no mapped game version")
    version = BRANCH_VERSION[branch]
    print(f"Branch {branch} -> v{version}")

    changed = 0
    for name in SCAN_GLOBS:
        path = ROOT / name
        if path.is_file():
            n = patch_file(path, version)
            if n:
                print(f"  patched {name}")
                changed += n

    if changed == 0:
        print("  no indicator files needed patching (may already be set)")
    else:
        # Rebuild after source patches so bundles stay in sync when combiners exist
        if (ROOT / "PuddingInit.js").is_file() or (ROOT / "PuddingCombiner.py").is_file():
            try:
                rebuild()
                # Re-apply to rebuilt bundles in case combiner overwrote from already-patched init
                for name in ("PuddingMod.js", "SpeedrunMod.js", "MorePudding.js"):
                    path = ROOT / name
                    if path.is_file():
                        if patch_file(path, version):
                            print(f"  re-patched bundle {name}")
            except subprocess.CalledProcessError as e:
                print(f"  rebuild failed ({e}); leaving direct file patches")

    print("done")


if __name__ == "__main__":
    main()
