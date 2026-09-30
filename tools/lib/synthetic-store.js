// Synthetic snake_timeKeeper (v4, modeKey rows) of a chosen size, for the post-win tests.
// TimeKeeper.makeStorage() adds 21-bit + 20-bit mirror rows on load, so the live
// store ends up roughly 3x the key count generated here.
const MODE_IDS = ["wall", "portal", "cheese", "borderless", "twin", "winged", "yinyang", "key", "sokoban", "poison", "dimension", "minesweeper", "statue", "light", "shield", "arrow", "hotdog", "magnet", "gate", "peaceful"];

function syntheticStore(modes, settingsPerMode) {
  const s = { version: 4 };
  const now = new Date().toISOString();
  let made = 0;
  outer: for (let a = 0; a < MODE_IDS.length; a++) {
    for (let b = a; b < MODE_IDS.length; b++) {
      const modeKey = a === b ? MODE_IDS[a] : MODE_IDS[a] + "+" + MODE_IDS[b];
      for (let k = 0; k < settingsPerMode; k++) {
        const suffix = `${k % 5}-${Math.floor(k / 5) % 3}-${Math.floor(k / 15) % 3}`;
        for (const p of ["25", "50", "100", "ALL"]) s[`${p}-${modeKey}-${suffix}`] = { time: 20000 + k * 100, date: now, att: 3, sum: 60000 };
        s[`H-${modeKey}-${suffix}`] = { high: 120, time: 90000, date: now };
        s[`att-${modeKey}-${suffix}`] = { total: 50, lastAttempt: now, session: 1, lastSession: 2 };
      }
      if (++made >= modes) break outer;
    }
  }
  return s;
}

const PRESETS = {
  small: () => syntheticStore(5, 3),
  medium: () => syntheticStore(40, 6),
  large: () => syntheticStore(150, 12),
};

module.exports = { MODE_IDS, syntheticStore, PRESETS };
