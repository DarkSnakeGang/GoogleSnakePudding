# Google Snake Pudding

Pudding Mod is the main visual and quality-of-life mod for Google Snake speedrunning. It adds fruits, themes, snake colors, stat tracking, timers, and a large in-game settings menu. This repository also ships related bundles (Speedrun Mod, More Pudding) and maintains versioned branches for older game dumps on [googlesnakemods.com](https://googlesnakemods.com).

![Pudding Mod showcase](https://static.wikia.nocookie.net/google-snake-game/images/6/67/Pudding_Mod_Showcase.png/revision/latest/scale-to-width-down/838?cb=20230605135736)

---

## Where to play

| Site | URL | Notes |
|------|-----|-------|
| Google Snake Mods (web) | [googlesnakemods.com/v/current/](https://googlesnakemods.com/v/current/) | Latest game version (v13). Select **Pudding Mod** from the mod picker. |
| Older versions | [googlesnakemods.com/v/11/](https://googlesnakemods.com/v/11/), [v/12/](https://googlesnakemods.com/v/12/) | Branch-matched builds from this repo. |
| Google Search / FBX | Tampermonkey + [Google Snake Mod Loader](https://github.com/DarkSnakeGang/GoogleSnakeModLoader) | Uses the same `mod-info.json` URLs as the website. |

Settings, PBs, and mod toggles are stored in browser `localStorage` under `PuddingSettings`. As of `StorageVersion: 1`, saves migrate cleanly when switching between v11, v12, and v/current on the same browser.

---

## Bundles in this repository

| File | Branch (typical) | Description |
|------|------------------|-------------|
| `PuddingMod.js` | `main` (v13), `v12`, `v11`, … | Full Pudding Mod. Built from `Libraries/*.js` + `PuddingInit.js` via `PuddingCombiner.py`. |
| `SpeedrunMod.js` | `main` | Lighter bundle: speedrun-focused features without the full Pudding menu weight. Built via `SpeedrunModCombiner.py`. |
| `MorePudding.js` | `main` | Pudding Mod + Visibility Mod + More Menu Mod chain. Built via `MoreBuilder.py`. |
| `ChimeraMod.js` | `main` | Experimental combined bundle (not in official mod picker). |
| `Combo/LevelEditorPudding.js` | `main` | Pudding + Level Editor loader combo. |

Official mod-loader entries point at raw GitHub URLs; see [Shipped mods](#shipped-mods-on-googlesnakemods) below.

---

## Pudding Mod (v13 / `main`)

Current target: **game version 13** (`v/current` on googlesnakemods.com). The bundled libraries are:

| Library | Role |
|---------|------|
| `Core` | Shared helpers and bootstrap hooks. |
| `Theme` | Extra themes; menu and in-game theme apply instantly. |
| `DistinctVisual` | Distinct Sokoban goals and poison/skull fruit visuals. |
| `Counter` | Wall spawn counter overlay. |
| `ModeRegistry` | Maps trophy modes to labels and bit indices for stat tracking. |
| `TimeKeeper` | PBs, mode times, 25/50/100-apple HUD milestones. |
| `Fruit` | Extended fruit list, golden fruit rarities, realism/graphics hooks. |
| `GraphicsMix` | Pair-mix graphics styles (blend two native styles in the graphics row). |
| `TopBar` | Optional top bar showing count and speed icons. |
| `SnakeColor` | Additional snake color options. |
| `SettingsSaver` | `PuddingSettings` load/save, game-settings snapshot/restore. |
| `SpeedInfo` | Always-on speedrun info panel, WR boards, tracked player name. |
| `InputDisplay` | On-screen input history. |
| `Timer` | In-game timer modes (ALL, 25, 50, 100, etc.). |
| `SplitPanel` | LiveSplit-style side panel with auto-updating SRC-style splits. |
| `BootstrapMenu` | In-game gear menu (Bootstrap UI injected into snake settings). |
| `ResetKey` | Quick reset keybind. |
| `RenderDelayFix` | Fixes render delay edge cases on some builds. |
| `CustomBowl` | Custom fruit-bowl pool per apple count (replaces legacy portal-pairs UI). |

### Visual and gameplay extras

- **Fruits** — Many additional apple/food types beyond vanilla, including rare golden variants (Golden Apple ~1 in 1M, Golden Cherry ~1 in 5M, Golden Strawberry ~1 in 10M, Golden Carrot ~1 in 50M, Golden Watermelon ~1 in 100M). Skull poison fruit optional via settings.
- **Themes and colors** — Extra game themes and snake colors; theme changes apply to the menu immediately.
- **Graphics pair-mix** — Three blended graphics icons appended after the native styles; saved indices clamp safely when switching game versions.
- **Sokoban / poison** — Optional distinct goal and poison visuals (toggle in menu).
- **Top bar** — Optional icons for current count and speed setting.
- **Wall counter** — Shows wall-mode spawn progress.

### Speedrun and stat features

- **TimeKeeper** — Personal bests and run stats per mode; integrates with game reset/stop hooks.
- **Speed info panel** — Optional always-visible run info; WR holder display and custom tracked player name.
- **Timer** — Multiple timer targets (including ALL apples); works with mode-specific rules.
- **Split panel** — Optional left panel with segment times that refresh during the run.
- **Input display** — Shows recent inputs for route review and streaming.

### Settings menu (gear icon)

Toggle from the Pudding bootstrap panel:

- Skull poison fruit
- Distinct Sokoban goals
- Input display
- Top bar icons
- Show speed info
- Show split panel
- Disable randomizer (locks the in-game dice/random button)
- Remove scrollbar
- Save game settings (trophy, count, speed, size, graphics, theme, color, apple)
- Custom bowl fruits (per-count fruit pool editor for fruit-bowl / portal-style counts)

### Saved game settings

When **Save Game Settings** is enabled, Pudding remembers the native Google Snake menu selections (mode, count, speed, map size, graphics, theme, color, fruit). On load it opens settings briefly, applies selections through Google's internal menu API, then closes. Indices are clamped to the current game's row lengths so switching between v11, v12, and v13 does not break restores. Pair-mix graphics slots wait for mix icons to exist before applying.

### v13-specific technical notes

- `main` registers `window.PuddingMod` at the first line of the bundle so the v13 web loader can find the mod object early.
- googlesnakemods.com v13 preloads the selected mod from `mod-info.json` in `url-rules.js` before `snake.js` runs (fixes "Selected mod is not loaded" for all mods on v/current).
- Verify hooks against live snake: `node tools/verify.js current`.

---

## Speedrun Mod

Shipped on **`main`** for game version 12+ in mod-info (same `SpeedrunMod.js` URL). A trimmed Pudding fork aimed at runners who want core timing/stats without the full feature surface:

- Shared speedrun libraries (`SpeedrunPerf`, lighter menu via `BootstrapMenuSpeedrun`)
- Omits much of the full Pudding menu weight while keeping essential timing workflows
- Same `PuddingSettings` storage format when both mods share a browser profile (only one mod should be active at a time)

Build: `python SpeedrunModCombiner.py`

---

## More Pudding

`MorePudding.js` chains:

1. Pudding Mod (`PuddingMod.alterSnakeCode`)
2. Visibility Mod (delete/hide game elements)
3. More Menu Mod (extra speeds, counts, sizes)

Build: `python MoreBuilder.py`. Useful for offline testing; the website mod picker loads each mod separately unless you use a custom URL.

---

## Version branches

| Game version | Git branch | PuddingMod URL (mod-info) |
|--------------|------------|---------------------------|
| 1–10 | Historical branches (`dice_added_version`, `shield_stable`, `arrow`, …) | Per-version entries in mod-info |
| 11 | `v11` | `.../GoogleSnakePudding/v11/PuddingMod.js` |
| 12 | `v12` | `.../GoogleSnakePudding/v12/PuddingMod.js` |
| 13 (current) | `main` | `.../GoogleSnakePudding/main/PuddingMod.js` |

Each branch tracks the Closure dump for that era. Do not expect v11 to include v13-only libraries (GraphicsMix, CustomBowl, SplitPanel, etc.). Storage migration on v11 preserves fields from newer versions without applying unsupported features.

---

## Shipped mods on googlesnakemods

From [GoogleSnakeModLoader `mod-info.json`](https://github.com/DarkSnakeGang/GoogleSnakeModLoader/blob/main/build/mod-info.json). Mods not hosted in this repo are linked for completeness.

| Mod key | Display name | Repository / author | Web support (high level) |
|---------|--------------|---------------------|---------------------------|
| `PuddingMod` | Pudding Mod | **This repo** — Yarmiplay | v1–13; mobile (no input display / speed info on mobile) |
| `SpeedrunMod` | Speedrun Mod | **This repo** — Yarmiplay | v12+ |
| `moreMenu` | More Menu Mod | [GoogleSnakeCustomMenuStuff](https://github.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff) — Fizhes, ScienceCrafter | v3–12 |
| `VisibilityMod` | Visibility Mod | [GoogleSnakeDeleteStuffMod](https://github.com/DarkSnakeGang/GoogleSnakeDeleteStuffMod) — TF2Llama, Yarmiplay | v1–12; bundled in More Pudding |
| `levelEditorMod` | Level Editor Mod | [GoogleSnakeLevelEditor](https://github.com/DarkSnakeGang/GoogleSnakeLevelEditor) — TF2Llama | v2–4, v12 |
| `mouseMode` | Mouse Mode | [GoogleSnakeMouseMode](https://github.com/DarkSnakeGang/GoogleSnakeMouseMode) — TF2Llama | v2–5, v12 |
| `RemixMod` | Remix Mod | [GoogleSnakeRemix](https://github.com/DarkSnakeGang/GoogleSnakeRemix) — Fizhes, TF2Llama, Yarmiplay | gsmOnly; v2–5, v12 |
| `RemixUltraMod` | Remix Ultra Mod | GoogleSnakeRemix | gsmOnly; v12 (Remix + Level Editor) |
| `ConwayMod` | Conway Mod | [ConwayMod](https://github.com/DarkSnakeGang/ConwayMod) — cyt | gsmOnly; v1 |

**Remix Mod** combines More Menu, Visibility, and Pudding-style features (Candy/Chess/Burger modes, cat speed, dice counts on supported versions). **Remix Ultra** adds Level Editor on top.

---

## Building from source

Requirements: Python 3, Node.js (for verify scripts).

```bash
# Full Pudding Mod bundle
python PuddingCombiner.py

# Speedrun Mod bundle
python SpeedrunModCombiner.py

# More Pudding chain
python MoreBuilder.py

# Verify regex hooks against live v/current snake.js
node tools/verify.js current

# Verify against a local snake dump
node tools/verify.js path/to/snake.js
```

Library sources live in `Libraries/`. Entrypoints: `PuddingInit.js`, `SpeedrunModInit.js`, `MorePuddingInit.js`. Combined output overwrites `PuddingMod.js`, `SpeedrunMod.js`, or `MorePudding.js` at the repo root — commit those files after rebuilding for GitHub raw URLs to update.

---

## Storage format (`PuddingSettings`)

Key fields (non-exhaustive):

| Field | Purpose |
|-------|---------|
| `StorageVersion` | Migration marker (currently `1`). |
| `Skull`, `SokoGoals`, `InputDisplay`, `TopBar`, `SpeedInfo` | Feature toggles. |
| `DisableRandom`, `ScrollBar`, `SaveGameSettings`, `SplitPanel` | UI and behavior toggles. |
| `SelectedPairs` / `SelectedPairsByCount` | Custom fruit-bowl pools per count index. |
| `SavedGameSettings` | Snapshot of native menu indices + row metadata. |
| `ShowWrHolders`, `TrackedPlayerName` | Speed info / WR display. |
| `PortalPairs`, `AlwaysUniqueFruit` | Legacy portal-pairs era; superseded by CustomBowl on v12+. |

Legacy readme archived in [`README.legacy.md`](README.legacy.md).

---

## Dice Mod (historical)

Dice counts (1–6, 1–12, 4–9 apple spawns) were originally a separate Pudding-era experiment. Google added dice counts to the base game; old dice branches remain in git history but are not the focus of current development.

---

## Links

- [googlesnakemods.com](https://googlesnakemods.com)
- [Google Snake Mod Loader](https://github.com/DarkSnakeGang/GoogleSnakeModLoader)
- [Google Snake Mods Website](https://github.com/DarkSnakeGang/GoogleSnakeModsWebsite)
- [Official Google Snake Discord](https://discord.gg/dDuCTm62EZ) — `#snake-modding` for bugs and feedback

---

## License / contributing

Report bugs in Discord or via GitHub issues on this repository. When changing hook regexes, always run `tools/verify.js` against the target game version before pushing bundled `.js` files.
