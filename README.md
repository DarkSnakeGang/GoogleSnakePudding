# Google Snake Pudding

Pudding Mod is a visual and quality-of-life mod for Google Snake speedrunning. Play it on [googlesnakemods.com](https://googlesnakemods.com) by selecting **Pudding Mod**, or load `PuddingMod.js` through the Tampermonkey mod loader on Search / FBX.

This repository also ships Speedrun Mod and a few combo loaders. Game settings and Pudding toggles live in `localStorage` (`PuddingSettings`). `StorageVersion: 1` keeps those saves usable when switching between v11, v12, and v/current in the same browser.

![Pudding Mod showcase](https://static.wikia.nocookie.net/google-snake-game/images/6/67/Pudding_Mod_Showcase.png/revision/latest/scale-to-width-down/838?cb=20230605135736)

---

## Files in this repository

| File | What it is |
|------|------------|
| `PuddingMod.js` | Full Pudding Mod. Built from `Libraries/*.js` + `PuddingInit.js` by `PuddingCombiner.py`. |
| `SpeedrunMod.js` | Lighter speedrun-focused bundle. Built by `SpeedrunModCombiner.py`. |
| `MorePudding.js` | Pudding, then Visibility, then More Menu, applied in that order. Built by `MoreBuilder.py`. |
| `ChimeraMod.js` | Experimental combined bundle. |
| `Combo/LevelEditorPudding.js` | Loader that runs Pudding together with Level Editor. |
| `PauseGameMod.js` | Standalone pause helper. |

---

## Version branches

Each branch is a Pudding build for one Google Snake dump. `mod-info.json` on the website maps game version to the matching `PuddingMod.js` URL.

| Game version | Git branch | PuddingMod.js |
|--------------|------------|---------------|
| 1 | `dice_added_version` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/dice_added_version/PuddingMod.js` |
| 2 | `shield_stable` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/shield_stable/PuddingMod.js` |
| 3 | `arrow` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/arrow/PuddingMod.js` |
| 4 | `pre_dpad` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/pre_dpad/PuddingMod.js` |
| 5 | `pre_hotdog` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/pre_hotdog/PuddingMod.js` |
| 6 | `hotdog` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/hotdog/PuddingMod.js` |
| 7 | `magnet` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/magnet/PuddingMod.js` |
| 8 | `broken_gate` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/broken_gate/PuddingMod.js` |
| 9 | `v9` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/v9/PuddingMod.js` |
| 10 | `v10` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/v10/PuddingMod.js` |
| 11 | `v11` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/v11/PuddingMod.js` |
| 12 | `v12` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/v12/PuddingMod.js` |
| 13 (`v/current`) | `main` | `https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js` |

Other branches that are not wired as official version dumps: `chess`, `early_access`, `fetch_wall_pattern`.

Older branches do not include later libraries. v11 has no GraphicsMix, CustomBowl, SplitPanel, or ModeRegistry. Its saver still writes `StorageVersion: 1` and leaves newer fields alone so visiting v11 does not wipe a v12/v13 save.

---

## Pudding Mod (`main`, game v13)

Current target is **v13** at [googlesnakemods.com/v/current/](https://googlesnakemods.com/v/current/). Features below are what `main` ships.

### BootstrapMenu

Adds a **Pudding Mod Settings** panel on the side of the game, not inside Google's own settings. Open/close it from the Pudding UI on the top bar. The panel is styled with a stripped Bootstrap stylesheet (`bootstrap-stripped.css`).

From this panel you can:

- Choose what the counter overlay shows, then **Edit stat** / **Reset stats**
- Toggle Skull Poison Fruit, Distinct Soko Goals, Input Display, Top Bar Icons, Show Speed Info, Show Split Panel, Disable Randomizer, Save Game Settings
- Open **Timer settings**
- Rebind the reset key
- Open **Custom Bowl Fruits**
- Optionally disable the native Shuffle / randomizer button (`Disable Randomizer`)

### Counter

The overlay next to the top bar is not only a wall counter. It tracks several stats in `localStorage` (`inputCounterMod`) and can show one of:

- Inputs this game, this session, or lifetime (arrow keys / WASD, no repeats)
- Resets this session or lifetime
- Fruit eaten this session or lifetime
- Walls spawned this game (Wall / blender-with-wall; hidden automatically on other modes)
- Hidden

You can edit the currently shown number or wipe all counter stats from the side panel.

### InputDisplay

A D-pad overlay (up / left / down / right) that lights up for the **current** direction. It sits in the Speed Info area. It does not keep a history of inputs.

### Timer

Not an always-on HUD clock. `Timer.js` is the **Custom Timer/Splits Settings** dialog (opened from the side panel). From there you pick mode / count / speed / size for a category, set comparison times for 25, 50, 100, and ALL, add custom split scores, choose time format, and toggle delta display. Split PBs are stored in `localStorage._snake_pb`. The same dialog also has WR-holder and tracked-player fields used by Speed Info.

### SplitPanel

Optional LiveSplit-style panel on the left. Rows follow the current timer category (25, 50, 100, ALL, plus any custom splits). Times update during the run.

### TimeKeeper

Personal-best and attempt tracking per mode, count, speed, and size. Stores 25 / 50 / 100 / ALL times and high scores in `localStorage`, including blender combinations. Daily challenge and extra More-Menu-only settings are skipped. Starts the run clock on the first counted input.

### SpeedInfo

Optional always-visible speedrun panel: current category, PBs, attempt counts, and optional Speedrun.com / FastSnakeStats WR boards. Can show WR holders and a tracked SRC username (configured in Timer settings). On mobile this panel is not used.

### Fruit

Extra selectable foods, each with Normal, Pixel, and Realism sprites:

Pudding, Blueberries, Red Pepper, Lime, Green Grapes, Burger, Cheese, Fries, Hotdog, Pizza, Steak, Coconut, Poop, Egg, Musa Banana, Pear, Jacko, Ice, Red Pudding, Cabbage, Heart.

Secret golden fruits cannot be picked from the menu. If one rolls in place of a normal apple:

- Golden Apple — 1 in 1m
- Golden Cherry — 1 in 5m
- Golden Strawberry — 1 in 10m
- Golden Carrot — 1 in 50m
- Golden Watermelon — 1 in 100m

### DistinctVisual

Optional poison-mode skull fruit instead of the usual poison apple, and optional red Sokoban goal boxes so goals are easier to tell from crates. Both have Normal / Pixel / Realism art.

### Theme

Adds extra board themes that apply to tiles, borders, top bar, buttons, and the end screen as soon as you pick them. Included themes: Default Sun, Official Dark, Snow, Volcano, Desert, Official Jungle, Pool, Space, True Dark, Planeptune, Lastation, Pacman, Sonic, Jungle, Pudding, Ice. A custom-color theme can be filled from advanced settings.

### SnakeColor

Extra snake palettes in the color row, including pride-flag sets, Monochrome, and Catalonia, each with a matching Yin Yang pair color.

### GraphicsMix

After the four native graphics styles, three split icons mix two styles at random each apple: Classic|Pixel, Pixel|Realism, Classic|Realism. Saved mix indices fall back to a native style if those icons are missing (for example after switching game version).

### TopBar

Optional count and speed icons in the native top bar so you can see those settings without opening Google's menu.

### CustomBowl

When fruit bowl is selected, **Enable custom fruit bowl** keeps two saved pools, edited from **General** (default) and **Portal** tabs:

- **General**: **Always Unique Fruit** lives here (default on). Unique off: every apple count may have a single fruit. Unique on: same minima as Portal, and a too-small pool is padded. Stored in `SelectedPairsByCountGeneral`.
- **Portal**: always unique; cannot go below the apple-count minimum (1 / 3 / 5 / 10 / 6 / 24 / 5). Stored in `SelectedPairsByCount` (`SelectedPairs` still mirrors count `0`).

The open tab is only for editing. In-game, Portal (including blender-with-portal) uses the Portal pool; every other mode uses General. Fruit 24 (the bowl itself) is never included.

### SettingsSaver

Loads and writes `PuddingSettings`. With **Save Game Settings** on, it snapshots Google's trophy / count / speed / size / graphics / theme / color / apple rows, then restores them on the next load by driving the native menu API. Indices are clamped to the current row lengths. Mix-graphics slots wait until the mix icons exist.

### ResetKey

Default reset is Shift. Click **Reset Key** in the side panel and press another key to rebind. The bind is stored in `localStorage.keybinds`.

### RenderDelayFix

Holds the first tick after reset until the board has drawn once, and queues a key that was pressed during that gap so the first turn is not dropped.

### ModeRegistry

Internal map of trophy modes (Classic through Bridge, plus Peaceful and Blender) to labels and bit indices. TimeKeeper and SpeedInfo use it so blender combinations and older save keys stay named correctly.

### Core

Shared helpers used while patching `snake.js` (`assertReplace`, image UI helpers, and similar).

---

## Speedrun Mod

`SpeedrunMod.js` on `main` is a lighter bundle for runners who want timing and stats without the full fruit / theme / bowl surface. It targets the same **v13** game as Pudding Mod (`googlesnakemods.com/v/current/`). Libraries: Core, Theme, ModeRegistry, DistinctVisual, SettingsSaver, Counter, TimeKeeper, SpeedInfo, TopBar, BootstrapMenuSpeedrun, ResetKeySpeedrun, SpeedrunPerf.

`SpeedrunPerf` trims work that does not matter mid-run. The speedrun menu is a smaller side panel (`BootstrapMenuSpeedrun`).

`window.SpeedrunMod` is assigned on line 1 of `SpeedrunMod.js` so the v13 website loader can see the mod object before libraries finish evaluating. The picker still needs a `version: 13` entry in `mod-info.json` (same `main/SpeedrunMod.js` URL as v12).

---

## More Pudding and combos

`MorePudding.js` is a single file that applies Pudding, then Visibility (hide / delete game elements), then More Menu (extra speeds, counts, sizes). The website picker loads those as separate mods; this bundle is for custom URL / offline use.

`Combo/LevelEditorPudding.js` loads Pudding and Level Editor together. `ChimeraMod.js` is an older experimental mashup kept in the tree.

---

## Building

Python 3 for combiners. Node.js for verify scripts.

```bash
python PuddingCombiner.py
python SpeedrunModCombiner.py
python MoreBuilder.py

node tools/verify.js current
node tools/verify-speedrun.js current
node tools/verify.js path/to/snake.js
```

Library sources are in `Libraries/`. Init files: `PuddingInit.js`, `SpeedrunModInit.js`, `MorePuddingInit.js`. Combiners overwrite the root bundles; commit those after a rebuild so GitHub raw URLs update.

`window.PuddingMod` / `window.SpeedrunMod` are assigned on line 1 of their bundles so the v13 website loader can see the mod object before libraries finish evaluating.

---

## Storage (`PuddingSettings`)

| Field | Purpose |
|-------|---------|
| `StorageVersion` | Migration marker (`1`). |
| `Skull`, `SokoGoals`, `InputDisplay`, `TopBar`, `SpeedInfo` | Feature toggles. |
| `DisableRandom`, `SaveGameSettings`, `SplitPanel` | UI toggles. |
| `ScrollBar` | Leftover field; ignored by the current UI so older builds that still read it are unchanged. |
| `SelectedPairs` / `SelectedPairsByCount` | Portal custom bowl pools. |
| `SelectedPairsByCountGeneral` | General custom bowl pools. Copied from `SelectedPairsByCount` on first load if missing. |
| `SavedGameSettings` | Native menu snapshot plus row-length metadata. |
| `ShowWrHolders`, `TrackedPlayerName` | Speed Info WR display. |
| `PortalPairs` | Enable custom fruit bowl. |
| `AlwaysUniqueFruit` | General-tab uniqueness (default `true` when missing). Portal is always unique. |

Counter stats are a separate key: `inputCounterMod`. Timer split PBs: `_snake_pb`. Reset bind: `keybinds`.

The previous short README is in [`README.legacy.md`](README.legacy.md).

---

## Dice counts (historical)

Dice / blue dice / green dice apple counts started as a Pudding-era experiment. They are in the base game now. Branch `dice_added_version` is the v1 dump from that period.

---

## Links

- [googlesnakemods.com](https://googlesnakemods.com)
- [Official Google Snake Discord](https://discord.gg/dDuCTm62EZ) — `#snake-modding`

When changing `snake.js` hooks, run `tools/verify.js` against the target game version before pushing bundles.
