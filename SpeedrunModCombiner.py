from pathlib import Path

LIB_ORDER = [
    "Core",
    "Theme",
    "SpeedrunCss",
    "ModeRegistry",
    "TimeKeeper",
    "TopBar",
    "Backup",
    "SpeedInfo",
    "ResetKey",
]
OUTPUT = "SpeedrunMod.js"
INIT = "SpeedrunModInit.js"
LIBS_DIR = Path("Libraries")
INIT_MARKER = "////////////////////////////////////////////////////////////////////\n//RUNCODEBEFORE"


def main() -> None:
    root = Path(__file__).resolve().parent
    libs_dir = root / LIBS_DIR
    init_path = root / INIT
    output_path = root / OUTPUT

    missing = []
    for name in LIB_ORDER:
        if not (libs_dir / f"{name}.js").is_file():
            missing.append(str(libs_dir / f"{name}.js"))
    if not init_path.is_file():
        missing.append(str(init_path))
    if missing:
        print("Missing required files:")
        for path in missing:
            print(f"  - {path}")
        raise SystemExit(1)

    init_content = init_path.read_text(encoding="utf-8")
    if INIT_MARKER in init_content:
        init_header, init_body = init_content.split(INIT_MARKER, 1)
    else:
        init_header = ""
        init_body = init_content

    parts = [init_header]
    for name in LIB_ORDER:
        parts.append((libs_dir / f"{name}.js").read_text(encoding="utf-8"))
    if INIT_MARKER in init_content:
        parts.append(INIT_MARKER + init_body)
    else:
        parts.append(init_body)

    output_path.write_text("".join(parts), encoding="utf-8")
    size_kb = output_path.stat().st_size / 1024
    print(f"Wrote {output_path.name} ({len(LIB_ORDER)} libraries + init, {size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
