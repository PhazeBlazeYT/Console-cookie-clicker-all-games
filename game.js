(() => {
  const ROOT_ID = 'cc-og-fullscreen-root';
  const STYLE_ID = 'cc-og-fullscreen-style';
  const SAVE_KEY = 'cc_pro_console_save_v5';
  const GREAT_RESET_VERSION_KEY = 'cc_great_reset_version';
  const GREAT_RESET_TARGET = '2026-04-day-night-reset';
  const HARD_RESET_KEY = '\\';

  const existing = document.getElementById(ROOT_ID);
  if (existing) existing.remove();
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) existingStyle.remove();

  const TAB_MASK_PRESETS = {
    classroom: { label: 'Google Classroom', title: 'Google Classroom', favicon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    docs: { label: 'Google Docs', title: 'Google Docs', favicon: 'https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_document_x16.png' },
    drive: { label: 'Google Drive', title: 'Google Drive', favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    ixl: { label: 'IXL | Math', title: 'IXL | Math, Language Arts, Science, Social Studies, and Spanish', favicon: 'https://www.ixl.com/favicon.ico' },
    quizlet: { label: 'Quizlet', title: 'Quizlet', favicon: 'https://quizlet.com/favicon.ico' },
    khan: { label: 'Khan Academy', title: 'Khan Academy', favicon: 'https://cdn.kastatic.org/images/favicon.ico' },
    canvas: { label: 'Canvas', title: 'Dashboard', favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico' },
    schoology: { label: 'Schoology', title: 'Home | Schoology', favicon: 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico' }
  };

  const setTabMask = (title, faviconHref) => {
    if (typeof title === 'string' && title.trim()) document.title = title.trim();
    if (typeof faviconHref === 'string' && faviconHref.trim()) {
      let favicon = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', faviconHref.trim());
      favicon.setAttribute('type', 'image/png');
    }
  };

  let policy;
  if (window.trustedTypes) {
    try {
      policy = window.trustedTypes.defaultPolicy || window.trustedTypes.createPolicy('cc-og-policy', { createHTML: (s) => s });
    } catch {
      policy = { createHTML: (s) => s };
    }
  } else {
    policy = { createHTML: (s) => s };
  }

  const state = {
    cookies: 0,
    totalCookiesBaked: 0,
    totalClicks: 0,
    handMadeCookies: 0,
    goldenClicks: 0,
    goldenSpawns: 0,
    goldenMisses: 0,
    multiplier: 1,
    prestigeChips: 0,
    frenzyTimer: 0,
    clickFrenzyTimer: 0,
    elderFrenzyTimer: 0,
    clotTimer: 0,
    cookieStormTimer: 0,
    buildingSpecialTimer: 0,
    dragonHarvestTimer: 0,
    cursedFingerTimer: 0,
    toggleKey: 'h',
    adminKey: 'g',
    isHidden: false,
    activeTab: 'shop',
    buyAmount: 1,
    buyMode: 'buy',
    log: [],
    buildings: [
      { name: 'Cursor', cost: 20, baseCost: 20, cps: 0.1, owned: 0 },
      { name: 'Grandma', cost: 135, baseCost: 135, cps: 1, owned: 0 },
      { name: 'Farm', cost: 1485, baseCost: 1485, cps: 8, owned: 0 },
      { name: 'Mine', cost: 16200, baseCost: 16200, cps: 47, owned: 0 },
      { name: 'Factory', cost: 175500, baseCost: 175500, cps: 260, owned: 0 },
      { name: 'Bank', cost: 1890000, baseCost: 1890000, cps: 1400, owned: 0 },
      { name: 'Temple', cost: 27000000, baseCost: 27000000, cps: 7800, owned: 0 },
      { name: 'Wizard Tower', cost: 445500000, baseCost: 445500000, cps: 44000, owned: 0 },
      { name: 'Shipment', cost: 6885000000, baseCost: 6885000000, cps: 260000, owned: 0 },
      { name: 'Alchemy Lab', cost: 101250000000, baseCost: 101250000000, cps: 1600000, owned: 0 },
      { name: 'Portal', cost: 1350000000000, baseCost: 1350000000000, cps: 10000000, owned: 0 },
      { name: 'Time Machine', cost: 18900000000000, baseCost: 18900000000000, cps: 65000000, owned: 0 },
      { name: 'Antimatter Condenser', cost: 229500000000000, baseCost: 229500000000000, cps: 430000000, owned: 0 },
      { name: 'Prism Forge', cost: 3600000000000000, baseCost: 3600000000000000, cps: 2100000000, owned: 0 },
      { name: 'Chancemaker', cost: 55000000000000000, baseCost: 55000000000000000, cps: 12000000000, owned: 0 },
      { name: 'Fractal Engine', cost: 850000000000000000, baseCost: 850000000000000000, cps: 65000000000, owned: 0 },
      { name: 'Javascript Console', cost: 13000000000000000000, baseCost: 13000000000000000000, cps: 340000000000, owned: 0 },
      { name: 'Idleverse', cost: 210000000000000000000, baseCost: 210000000000000000000, cps: 1600000000000, owned: 0 },
      { name: 'Singularity Oven', cost: 3200000000000000000000, baseCost: 3200000000000000000000, cps: 8500000000000, owned: 0 },
      { name: 'Reality Bakery', cost: 52000000000000000000000, baseCost: 52000000000000000000000, cps: 48000000000000, owned: 0 }
    ],
    upgrades: [],
    achievements: [],
    highestCookies: 0,
    totalPlaySeconds: 0,
    highestCpsEver: 0,
    totalManualClicksValue: 0,
    tutorialStep: 0,
    hintCooldown: 0,
    currentBuildingSpecial: '',
    buildingRushTimer: 0,
    sugarRushTimer: 0,
    wrathModeTimer: 0,
    eventCooldown: 35,
    sugarLumps: 0,
    sugarLumpTimer: 0,
    season: 'none',
    seasonTimer: 0,
    tabMaskTitle: TAB_MASK_PRESETS.classroom.title,
    tabMaskFavicon: TAB_MASK_PRESETS.classroom.favicon,
    prestigeUpgrades: {
      clickLegacy: 0,
      goldenLegacy: 0,
      offlineLegacy: 0,
      cpsLegacy: 0,
      fortuneLegacy: 0,
      stormLegacy: 0,
      eventLegacy: 0,
      syncLegacy: 0,
      cosmicLegacy: 0,
      celestialLuckLegacy: 0,
      stormEngineLegacy: 0,
      sugarLegacy: 0,
      seasonLegacy: 0,
      heavenlyLuckLegacy: 0,
      unlockFutureTech: false
    },
    miniGameScores: {
      towerDefense: 0,
      flappyBird: 0,
      snake: 0,
      blockBlast: 0
    },
    miniGameLastPlayed: {
      towerDefense: 0,
      flappyBird: 0,
      snake: 0,
      blockBlast: 0
    },
    tabTime: { shop: 0, upgrades: 0, prestige: 0, achievements: 0, stats: 0 }
  };

  const recentClickTimes = [];

  const trackRecentClick = () => {
    const now = Date.now();
    recentClickTimes.push(now);
    while (recentClickTimes.length && now - recentClickTimes[0] > 5000) recentClickTimes.shift();
  };

  const recentClicksPerSecond = () => {
    const now = Date.now();
    while (recentClickTimes.length && now - recentClickTimes[0] > 5000) recentClickTimes.shift();
    return recentClickTimes.length / 5;
  };

  const achievementDefs = [
    { id: 'click-1', name: 'Wake and bake', desc: 'Click 1 time.', check: () => state.totalClicks >= 1 },
    { id: 'click-100', name: 'Clicktastic', desc: 'Click 100 times.', check: () => state.totalClicks >= 100 },
    { id: 'bake-1k', name: 'Tiny bakery', desc: 'Bake 1,000 cookies total.', check: () => state.totalCookiesBaked >= 1000 },
    { id: 'bake-1m', name: 'Serious dough', desc: 'Bake 1 million cookies total.', check: () => state.totalCookiesBaked >= 1000000 },
    { id: 'cursor-10', name: 'Pointer power', desc: 'Own 10 Cursors.', check: () => (state.buildings.find((b) => b.name === 'Cursor')?.owned || 0) >= 10 },
    { id: 'grandma-10', name: 'Elder care', desc: 'Own 10 Grandmas.', check: () => (state.buildings.find((b) => b.name === 'Grandma')?.owned || 0) >= 10 },
    { id: 'golden-1', name: 'Golden touch', desc: 'Click 1 golden cookie.', check: () => state.goldenClicks >= 1 },
    { id: 'golden-10', name: 'Gilded finger', desc: 'Click 10 golden cookies.', check: () => state.goldenClicks >= 10 },
    { id: 'golden-25', name: 'Golden jackpot', desc: 'Click 25 golden cookies.', check: () => state.goldenClicks >= 25 },
    { id: 'grandma-50', name: 'Grandma army', desc: 'Own 50 Grandmas.', check: () => (state.buildings.find((b) => b.name === 'Grandma')?.owned || 0) >= 50 },
    { id: 'factory-25', name: 'Industrial district', desc: 'Own 25 Factories.', check: () => (state.buildings.find((b) => b.name === 'Factory')?.owned || 0) >= 25 },
    { id: 'bake-1b', name: 'Cookie empire', desc: 'Bake 1 billion cookies total.', check: () => state.totalCookiesBaked >= 1000000000 },
    { id: 'cps-1m', name: 'Speed bakery', desc: 'Reach 1 million CpS.', check: () => activeCps() >= 1000000 },
    { id: 'owned-200', name: 'It all adds up', desc: 'Own 200 total buildings.', check: () => state.buildings.reduce((n, b) => n + b.owned, 0) >= 200 },
    { id: 'click-1k', name: 'Click legion', desc: 'Click 1,000 times.', check: () => state.totalClicks >= 1000 },
    { id: 'golden-50', name: 'Gold rush', desc: 'Click 50 golden cookies.', check: () => state.goldenClicks >= 50 },
    { id: 'bake-1t', name: 'Galactic bakery', desc: 'Bake 1 trillion cookies total.', check: () => state.totalCookiesBaked >= 1000000000000 },
    { id: 'prestige-10', name: 'Legacy keeper', desc: 'Own 10 prestige chips.', check: () => state.prestigeChips >= 10 },
    { id: 'owned-500', name: 'Cookie metropolis', desc: 'Own 500 total buildings.', check: () => state.buildings.reduce((n, b) => n + b.owned, 0) >= 500 },
    { id: 'click-10k', name: 'Relentless tapping', desc: 'Click 10,000 times.', check: () => state.totalClicks >= 10000 },
    { id: 'golden-100', name: 'Midas dynasty', desc: 'Click 100 golden cookies.', check: () => state.goldenClicks >= 100 },
    { id: 'golden-250', name: 'Solar mint', desc: 'Click 250 golden cookies.', check: () => state.goldenClicks >= 250 },
    { id: 'bake-1qa', name: 'Interstellar bakery', desc: 'Bake 1 quadrillion cookies total.', check: () => state.totalCookiesBaked >= 1000000000000000 },
    { id: 'bake-1qi', name: 'Infinite pantry', desc: 'Bake 1 quintillion cookies total.', check: () => state.totalCookiesBaked >= 1000000000000000000 },
    { id: 'cps-1b', name: 'Quantum production', desc: 'Reach 1 billion CpS.', check: () => activeCps() >= 1000000000 },
    { id: 'cps-100b', name: 'Reality overclocked', desc: 'Reach 100 billion CpS.', check: () => activeCps() >= 100000000000 },
    { id: 'owned-1000', name: 'Cookie megacity', desc: 'Own 1,000 total buildings.', check: () => state.buildings.reduce((n, b) => n + b.owned, 0) >= 1000 },
    { id: 'idleverse-5', name: 'Dimensional landlord', desc: 'Own 5 Idleverses.', check: () => (state.buildings.find((b) => b.name === 'Idleverse')?.owned || 0) >= 5 },
    { id: 'prestige-100', name: 'Eternal bloodline', desc: 'Own 100 prestige chips.', check: () => state.prestigeChips >= 100 },
    { id: 'singularity-3', name: 'Collapsed starlight', desc: 'Own 3 Singularity Ovens.', check: () => (state.buildings.find((b) => b.name === 'Singularity Oven')?.owned || 0) >= 3 },
    { id: 'reality-1', name: 'Fabric keeper', desc: 'Own 1 Reality Bakery.', check: () => (state.buildings.find((b) => b.name === 'Reality Bakery')?.owned || 0) >= 1 }
  ];


  const seasonalAchievementDefs = [
    { id: 'season-harvest-1', name: 'Autumn Starter', desc: 'Buy 1 Harvest seasonal upgrade.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'harvest').length >= 1 },
    { id: 'season-harvest-3', name: 'Autumn Artisan', desc: 'Buy 3 Harvest seasonal upgrades.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'harvest').length >= 3 },
    { id: 'season-harvest-5', name: 'Harvest Sovereign', desc: 'Buy all Harvest seasonal upgrades.', check: () => state.upgrades.filter((u) => u.req?.type === 'season' && u.req.season === 'harvest').every((u) => u.bought) },
    { id: 'season-eclipse-1', name: 'Moonlit Tap', desc: 'Buy 1 Eclipse seasonal upgrade.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'eclipse').length >= 1 },
    { id: 'season-eclipse-3', name: 'Moonlit Mastery', desc: 'Buy 3 Eclipse seasonal upgrades.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'eclipse').length >= 3 },
    { id: 'season-eclipse-5', name: 'Eclipse Sovereign', desc: 'Buy all Eclipse seasonal upgrades.', check: () => state.upgrades.filter((u) => u.req?.type === 'season' && u.req.season === 'eclipse').every((u) => u.bought) },
    { id: 'season-bloom-1', name: 'Spring Sip', desc: 'Buy 1 Bloom seasonal upgrade.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'bloom').length >= 1 },
    { id: 'season-bloom-3', name: 'Spring Chorus', desc: 'Buy 3 Bloom seasonal upgrades.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'bloom').length >= 3 },
    { id: 'season-bloom-5', name: 'Bloom Sovereign', desc: 'Buy all Bloom seasonal upgrades.', check: () => state.upgrades.filter((u) => u.req?.type === 'season' && u.req.season === 'bloom').every((u) => u.bought) },
    { id: 'season-aurora-1', name: 'Northern Spark', desc: 'Buy 1 Aurora seasonal upgrade.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'aurora').length >= 1 },
    { id: 'season-aurora-3', name: 'Northern Chorus', desc: 'Buy 3 Aurora seasonal upgrades.', check: () => state.upgrades.filter((u) => u.bought && u.req?.type === 'season' && u.req.season === 'aurora').length >= 3 },
    { id: 'season-aurora-5', name: 'Aurora Sovereign', desc: 'Buy all Aurora seasonal upgrades.', check: () => state.upgrades.filter((u) => u.req?.type === 'season' && u.req.season === 'aurora').every((u) => u.bought) },
    { id: 'season-cycle-10', name: 'Wheel of Seasons', desc: 'Play through at least 10 season cycles.', check: () => state.totalPlaySeconds >= 2500 },
    { id: 'season-lumps-50', name: 'Sugar Orchard', desc: 'Harvest 50 sugar lumps.', check: () => state.sugarLumps >= 50 },
    { id: 'season-lumps-250', name: 'Sugar Conservatory', desc: 'Harvest 250 sugar lumps.', check: () => state.sugarLumps >= 250 },
    { id: 'season-survive-night', name: 'Midnight Baker', desc: 'Reach 1 billion cookies during night cycle.', check: () => !dayNightState().isDay && state.cookies >= 1000000000 },
    { id: 'season-all-sets', name: 'Season Collector', desc: 'Own at least 1 upgrade from each season set.', check: () => ['harvest','eclipse','bloom','aurora'].every((season) => state.upgrades.some((u) => u.bought && u.req?.type === 'season' && u.req.season === season)) }
  ];
  seasonalAchievementDefs.forEach((a) => achievementDefs.push(a));

  const fmt = (n) => {
    const value = Number(n);
    if (!Number.isFinite(value)) return '0';
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (abs < 1000) return `${sign}${Math.floor(abs).toLocaleString()}`;

    const exponent = Math.floor(Math.log10(abs));
    const mantissa = abs / (10 ** exponent);
    const decimals = mantissa >= 100 ? 0 : mantissa >= 10 ? 1 : 2;
    const text = mantissa.toFixed(decimals).replace(/\.0+$|(?<=\.\d)0+$/g, '');
    return `${sign}${text}×10^${exponent}`;
  };

  const fmtFloat = (n, precision = 1) => {
    const value = Number(n);
    if (!Number.isFinite(value)) return '0';
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (abs < 1000) return `${sign}${abs.toLocaleString(undefined, { maximumFractionDigits: precision })}`;

    const exponent = Math.floor(Math.log10(abs));
    const mantissa = abs / (10 ** exponent);
    const decimals = mantissa >= 100 ? 0 : mantissa >= 10 ? 1 : 2;
    const text = mantissa.toFixed(decimals).replace(/\.0+$|(?<=\.\d)0+$/g, '');
    return `${sign}${text}×10^${exponent}`;
  };
  const formatDuration = (seconds) => {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const secs = safe % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };
  const DAY_NIGHT_CYCLE_SECONDS = 20 * 60;
  const dayNightState = () => {
    const cyclePos = ((state.totalPlaySeconds % DAY_NIGHT_CYCLE_SECONDS) + DAY_NIGHT_CYCLE_SECONDS) % DAY_NIGHT_CYCLE_SECONDS;
    const isDay = cyclePos < DAY_NIGHT_CYCLE_SECONDS / 2;
    return { isDay, label: isDay ? 'Day' : 'Night' };
  };

  const applyGreatReset = () => {
    if (localStorage.getItem(GREAT_RESET_VERSION_KEY) === GREAT_RESET_TARGET) return;
    const keysToClear = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key === SAVE_KEY || key.startsWith('cc_pro_console_save_')) keysToClear.push(key);
    }
    keysToClear.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(GREAT_RESET_VERSION_KEY, GREAT_RESET_TARGET);
  };
  const COST_GROWTH = 1.4;
  const effectiveCostGrowth = (owned) => {
    if (owned < 25) return 1.28;
    if (owned < 100) return 1.33;
    if (owned < 300) return 1.37;
    return COST_GROWTH;
  };
  const UPGRADE_PRICE_MULT = 6.5;
  const BASE_DIFFICULTY_MULT = 1;
  const CLICK_DIFFICULTY_MULT = 1;

  state.buildings.forEach((item) => {
    state.upgrades.push({ name: `Reinforced ${item.name}`, cost: Math.ceil(item.baseCost * 10 * UPGRADE_PRICE_MULT), req: { type: 'building', name: item.name, count: 1 }, mult: 2, bought: false });
    state.upgrades.push({ name: `Steel ${item.name}`, cost: Math.ceil(item.baseCost * 50 * UPGRADE_PRICE_MULT), req: { type: 'building', name: item.name, count: 10 }, mult: 2, bought: false });
  });

  state.upgrades.push({ name: 'Plastic Mouse', cost: 90000, req: { type: 'total', count: 10000 }, clickMult: 2, bought: false });
  state.upgrades.push({ name: 'Iron Mouse', cost: 15000000, req: { type: 'total', count: 1000000 }, clickMult: 2, bought: false });
  state.upgrades.push({ name: 'Kitten Workers', cost: 15000000, req: { type: 'achievements', count: 4 }, milkMult: 1.1, bought: false });
  state.upgrades.push({ name: 'Kitten Engineers', cost: 1500000000, req: { type: 'achievements', count: 7 }, milkMult: 1.15, bought: false });
  state.upgrades.push({ name: 'Quantum Gloves', cost: 40000000000, req: { type: 'total', count: 5000000000 }, clickMult: 2, bought: false });
  state.upgrades.push({ name: 'Kitten Architects', cost: 90000000000, req: { type: 'achievements', count: 12 }, milkMult: 1.2, bought: false });
  state.upgrades.push({ name: 'Golden Foundry', cost: 300000000000000, req: { type: 'building', name: 'Reality Bakery', count: 1 }, mult: 2, bought: false });
  state.upgrades.push({ name: 'Cursor Calibration I', cost: 2500, req: { type: 'building', name: 'Cursor', count: 10 }, targetBuilding: 'Cursor', targetMult: 2, tier: 1, bought: false });
  state.upgrades.push({ name: 'Cursor Calibration II', cost: 250000, req: { type: 'building', name: 'Cursor', count: 40 }, targetBuilding: 'Cursor', targetMult: 2.5, tier: 2, hidden: true, hiddenReq: () => state.totalClicks >= 200, bought: false });
  state.upgrades.push({ name: 'Cursor Calibration III', cost: 8000000, req: { type: 'building', name: 'Cursor', count: 100 }, targetBuilding: 'Cursor', targetMult: 3, tier: 3, hidden: true, hiddenReq: () => state.goldenClicks >= 10, bought: false });
  state.upgrades.push({ name: 'Grandma-Farm Synergy I', cost: 120000, req: { type: 'building', name: 'Grandma', count: 12 }, synergy: { a: 'Grandma', b: 'Farm', bonus: 0.02 }, bought: false });
  state.upgrades.push({ name: 'Grandma-Farm Synergy II', cost: 4200000, req: { type: 'building', name: 'Farm', count: 25 }, synergy: { a: 'Grandma', b: 'Farm', bonus: 0.035 }, hidden: true, hiddenReq: () => (state.buildings.find((b) => b.name === 'Grandma')?.owned || 0) >= 40, bought: false });
  state.upgrades.push({ name: 'Grandma-Farm Synergy III', cost: 190000000, req: { type: 'total', count: 100000000 }, synergy: { a: 'Grandma', b: 'Farm', bonus: 0.05 }, hidden: true, hiddenReq: () => state.achievements.length >= 12, bought: false });
  state.upgrades.push({ name: 'Grandma Overclock', cost: 950000, req: { type: 'building', name: 'Grandma', count: 25 }, targetBuilding: 'Grandma', targetMult: 2.2, bought: false });
  state.upgrades.push({ name: 'Farm Irrigation Grid', cost: 2400000, req: { type: 'building', name: 'Farm', count: 20 }, targetBuilding: 'Farm', targetMult: 2, bought: false });


  const seasonalUpgradeDefs = [
    { name: 'Harvest Oven Blessing I', season: 'harvest', cost: 1800000, mult: 1.08 },
    { name: 'Harvest Oven Blessing II', season: 'harvest', cost: 7600000, mult: 1.11 },
    { name: 'Harvest Oven Blessing III', season: 'harvest', cost: 42000000, mult: 1.14 },
    { name: 'Harvest Oven Blessing IV', season: 'harvest', cost: 230000000, mult: 1.17 },
    { name: 'Harvest Oven Blessing V', season: 'harvest', cost: 1200000000, mult: 1.2 },
    { name: 'Eclipse Click Runes I', season: 'eclipse', cost: 1400000, clickMult: 1.12 },
    { name: 'Eclipse Click Runes II', season: 'eclipse', cost: 6200000, clickMult: 1.16 },
    { name: 'Eclipse Click Runes III', season: 'eclipse', cost: 36000000, clickMult: 1.21 },
    { name: 'Eclipse Click Runes IV', season: 'eclipse', cost: 210000000, clickMult: 1.26 },
    { name: 'Eclipse Click Runes V', season: 'eclipse', cost: 1100000000, clickMult: 1.31 },
    { name: 'Bloom Milk Choir I', season: 'bloom', cost: 1600000, milkMult: 1.08 },
    { name: 'Bloom Milk Choir II', season: 'bloom', cost: 7000000, milkMult: 1.11 },
    { name: 'Bloom Milk Choir III', season: 'bloom', cost: 39000000, milkMult: 1.14 },
    { name: 'Bloom Milk Choir IV', season: 'bloom', cost: 220000000, milkMult: 1.17 },
    { name: 'Bloom Milk Choir V', season: 'bloom', cost: 1200000000, milkMult: 1.2 },
    { name: 'Aurora Quantum Frost I', season: 'aurora', cost: 2200000, mult: 1.1, clickMult: 1.06 },
    { name: 'Aurora Quantum Frost II', season: 'aurora', cost: 9800000, mult: 1.12, clickMult: 1.09 },
    { name: 'Aurora Quantum Frost III', season: 'aurora', cost: 52000000, mult: 1.15, clickMult: 1.11 },
    { name: 'Aurora Quantum Frost IV', season: 'aurora', cost: 280000000, mult: 1.18, clickMult: 1.14 },
    { name: 'Aurora Quantum Frost V', season: 'aurora', cost: 1400000000, mult: 1.21, clickMult: 1.17 }
  ];
  seasonalUpgradeDefs.forEach((u, i) => {
    state.upgrades.push({
      name: u.name,
      cost: u.cost,
      req: { type: 'season', season: u.season, count: 1 },
      mult: u.mult,
      clickMult: u.clickMult,
      milkMult: u.milkMult,
      hidden: true,
      hiddenReq: () => state.totalCookiesBaked >= Math.max(100000, u.cost / 2) && state.season === u.season,
      bought: false
    });
  });


  state.buildings.push({ name: 'Chrono Reactor', cost: 900000000000000000000000, baseCost: 900000000000000000000000, cps: 1800000000000000, owned: 0, locked: true, unlockBy: 'futureTech' });
  state.buildings.push({ name: 'Nebula Foundry', cost: 17000000000000000000000000, baseCost: 17000000000000000000000000, cps: 12000000000000000, owned: 0, locked: true, unlockBy: 'futureTech' });

  const milkPercent = () => state.achievements.length * 4;
  const milkMult = () => state.upgrades.filter((u) => u.bought && u.milkMult).reduce((m, u) => m * u.milkMult, 1);
  const clickMult = () => state.upgrades.filter((u) => u.bought && u.clickMult).reduce((m, u) => m * u.clickMult, 1);
  const legacySyncMult = () => 1 + state.prestigeUpgrades.syncLegacy * 0.05;
  const permanentClickMult = () => (1 + state.prestigeUpgrades.clickLegacy * 0.25) * legacySyncMult();
  const prestigeMult = () => (1 + state.prestigeChips * 0.01) * (1 + state.prestigeUpgrades.cpsLegacy * 0.08) * legacySyncMult() * (1 + state.prestigeUpgrades.cosmicLegacy * 0.12);
  const goldenSpawnBoost = () => {
    const chipsBoost = Math.min(0.3, state.prestigeChips * 0.0025);
    const achievementsBoost = Math.min(0.2, state.achievements.length * 0.008);
    return 1 + chipsBoost + achievementsBoost;
  };
  const goldenEffectBoost = () => (1 + Math.min(0.2, state.goldenClicks * 0.003)) * (1 + state.prestigeUpgrades.fortuneLegacy * 0.1) * (1 + state.prestigeUpgrades.celestialLuckLegacy * 0.08);
  const goldenSpawnDelay = () => {
    const base = 110000 + Math.random() * 210000;
    return Math.floor(base / (goldenSpawnBoost() * (1 + state.prestigeUpgrades.goldenLegacy * 0.15) * (1 + state.prestigeUpgrades.celestialLuckLegacy * 0.08)));
  };
  const eventTickRateMult = () => 1 + state.prestigeUpgrades.eventLegacy * 0.1;
  const stormPayoutMult = () => (1 + state.prestigeUpgrades.stormLegacy * 0.12) * (1 + state.prestigeUpgrades.stormEngineLegacy * 0.2);
  const sugarLumpBoost = () => 1 + (Math.min(2000, state.sugarLumps) * 0.00025) * (1 + state.prestigeUpgrades.sugarLegacy * 0.15);
  const seasonEffects = {
    none: { cps: 1, click: 1, label: 'Neutral season' },
    harvest: { cps: 1.12, click: 1.02, label: 'Harvest season' },
    eclipse: { cps: 1.06, click: 1.18, label: 'Eclipse season' },
    bloom: { cps: 1.16, click: 1.04, label: 'Bloom season' },
    aurora: { cps: 1.2, click: 1.1, label: 'Aurora season' }
  };
  const seasonState = () => seasonEffects[state.season] || seasonEffects.none;
  const seasonalCpsMult = () => seasonState().cps * (1 + state.prestigeUpgrades.seasonLegacy * 0.05);
  const seasonalClickMult = () => seasonState().click * (1 + state.prestigeUpgrades.seasonLegacy * 0.04);
  const buildingMultiplier = (name) => state.upgrades.filter((u) => u.bought && u.targetBuilding === name && u.targetMult).reduce((m, u) => m * u.targetMult, 1);
  const grandmaFarmSynergyMult = () => {
    const totalBonus = state.upgrades
      .filter((u) => u.bought && u.synergy && u.synergy.a === 'Grandma' && u.synergy.b === 'Farm')
      .reduce((sum, u) => sum + u.synergy.bonus, 0);
    const grandmas = state.buildings.find((b) => b.name === 'Grandma')?.owned || 0;
    const farms = state.buildings.find((b) => b.name === 'Farm')?.owned || 0;
    return 1 + (Math.min(500, grandmas + farms) * totalBonus);
  };
  const baseCps = () => {
    const targetName = state.currentBuildingSpecial;
    const byBuildings = state.buildings.reduce((sum, b) => {
      const specialMult = state.buildingRushTimer > 0 && targetName === b.name ? 10 : 1;
      return sum + b.owned * b.cps * buildingMultiplier(b.name) * specialMult;
    }, 0);
    return byBuildings * state.multiplier * prestigeMult() * milkMult() * BASE_DIFFICULTY_MULT * grandmaFarmSynergyMult() * sugarLumpBoost() * seasonalCpsMult() * (1 + state.prestigeUpgrades.heavenlyLuckLegacy * 0.04);
  };
  const activeCps = () => {
    let cps = baseCps();
    if (state.frenzyTimer > 0) cps *= 7;
    if (state.elderFrenzyTimer > 0) cps *= 666;
    if (state.clotTimer > 0) cps *= 0.5;
    if (state.buildingSpecialTimer > 0) cps *= 2;
    if (state.dragonHarvestTimer > 0) cps *= 15;
    if (state.sugarRushTimer > 0) cps *= 4;
    if (state.wrathModeTimer > 0) cps *= 0.7;
    return cps;
  };
  const prestigePotential = () => Math.floor(((state.totalCookiesBaked / 2500000000) ** 0.52));
  const prestigeGain = () => Math.max(0, prestigePotential() - state.prestigeChips);
  const prestigeNeedForNext = () => {
    const nextTarget = ((prestigePotential() + 1) ** (1 / 0.52)) * 2500000000;
    return Math.max(0, nextTarget - state.totalCookiesBaked);
  };

  const addLog = (msg) => {
    state.log.unshift(`${new Date().toLocaleTimeString()} — ${msg}`);
    if (state.log.length > 50) state.log.length = 50;
    logDirty = true;
  };

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  let dirtySinceSave = false;
  const markDirty = () => { dirtySinceSave = true; };
  const saveNow = () => {
    save();
    dirtySinceSave = false;
  };

  function load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      Object.assign(state, {
        cookies: Number(saved.cookies) || 0,
        totalCookiesBaked: Number(saved.totalCookiesBaked) || 0,
        totalClicks: Number(saved.totalClicks) || 0,
        goldenClicks: Number(saved.goldenClicks) || 0,
        goldenSpawns: Number(saved.goldenSpawns) || 0,
        goldenMisses: Number(saved.goldenMisses) || 0,
        handMadeCookies: Number(saved.handMadeCookies) || 0,
        multiplier: Number(saved.multiplier) || 1,
        prestigeChips: Number(saved.prestigeChips) || 0,
        frenzyTimer: Number(saved.frenzyTimer) || 0,
        clickFrenzyTimer: Number(saved.clickFrenzyTimer) || 0,
        elderFrenzyTimer: Number(saved.elderFrenzyTimer) || 0,
        clotTimer: Number(saved.clotTimer) || 0,
        cookieStormTimer: Number(saved.cookieStormTimer) || 0,
        buildingSpecialTimer: Number(saved.buildingSpecialTimer) || 0,
        dragonHarvestTimer: Number(saved.dragonHarvestTimer) || 0,
        cursedFingerTimer: Number(saved.cursedFingerTimer) || 0,
        toggleKey: (typeof saved.toggleKey === 'string' && saved.toggleKey) ? saved.toggleKey.toLowerCase() : 'h',
        adminKey: (typeof saved.adminKey === 'string' && saved.adminKey) ? saved.adminKey.toLowerCase() : 'g',
        isHidden: Boolean(saved.isHidden),
        activeTab: saved.activeTab || 'shop',
        buyAmount: [1, 10, 100, 'max'].includes(saved.buyAmount) ? saved.buyAmount : 1,
        buyMode: saved.buyMode === 'sell' ? 'sell' : 'buy',
        log: Array.isArray(saved.log) ? saved.log.slice(0, 50) : [],
        achievements: Array.isArray(saved.achievements) ? saved.achievements : [],
        highestCookies: Number(saved.highestCookies) || 0,
        totalPlaySeconds: Number(saved.totalPlaySeconds) || 0,
        highestCpsEver: Number(saved.highestCpsEver) || 0,
        totalManualClicksValue: Number(saved.totalManualClicksValue) || 0,
        tutorialStep: Number(saved.tutorialStep) || 0,
        hintCooldown: Number(saved.hintCooldown) || 0,
        currentBuildingSpecial: typeof saved.currentBuildingSpecial === 'string' ? saved.currentBuildingSpecial : '',
        buildingRushTimer: Number(saved.buildingRushTimer) || 0,
        sugarRushTimer: Number(saved.sugarRushTimer) || 0,
        wrathModeTimer: Number(saved.wrathModeTimer) || 0,
        eventCooldown: Number(saved.eventCooldown) || 35,
        sugarLumps: Number(saved.sugarLumps) || 0,
        sugarLumpTimer: Number(saved.sugarLumpTimer) || 0,
        season: (typeof saved.season === 'string' && saved.season) ? saved.season : 'none',
        seasonTimer: Number(saved.seasonTimer) || 0,
        tabMaskTitle: (typeof saved.tabMaskTitle === 'string' && saved.tabMaskTitle.trim()) ? saved.tabMaskTitle : TAB_MASK_PRESETS.classroom.title,
        tabMaskFavicon: (typeof saved.tabMaskFavicon === 'string' && saved.tabMaskFavicon.trim()) ? saved.tabMaskFavicon : TAB_MASK_PRESETS.classroom.favicon,
        prestigeUpgrades: {
          clickLegacy: Number(saved?.prestigeUpgrades?.clickLegacy) || 0,
          goldenLegacy: Number(saved?.prestigeUpgrades?.goldenLegacy) || 0,
          offlineLegacy: Number(saved?.prestigeUpgrades?.offlineLegacy) || 0,
          cpsLegacy: Number(saved?.prestigeUpgrades?.cpsLegacy) || 0,
          fortuneLegacy: Number(saved?.prestigeUpgrades?.fortuneLegacy) || 0,
          stormLegacy: Number(saved?.prestigeUpgrades?.stormLegacy) || 0,
          eventLegacy: Number(saved?.prestigeUpgrades?.eventLegacy) || 0,
          syncLegacy: Number(saved?.prestigeUpgrades?.syncLegacy) || 0,
          cosmicLegacy: Number(saved?.prestigeUpgrades?.cosmicLegacy) || 0,
          celestialLuckLegacy: Number(saved?.prestigeUpgrades?.celestialLuckLegacy) || 0,
          stormEngineLegacy: Number(saved?.prestigeUpgrades?.stormEngineLegacy) || 0,
          sugarLegacy: Number(saved?.prestigeUpgrades?.sugarLegacy) || 0,
          seasonLegacy: Number(saved?.prestigeUpgrades?.seasonLegacy) || 0,
          heavenlyLuckLegacy: Number(saved?.prestigeUpgrades?.heavenlyLuckLegacy) || 0,
          unlockFutureTech: Boolean(saved?.prestigeUpgrades?.unlockFutureTech)
        },
        tabTime: {
          shop: Number(saved?.tabTime?.shop) || 0,
          upgrades: Number(saved?.tabTime?.upgrades) || 0,
          prestige: Number(saved?.tabTime?.prestige) || 0,
          achievements: Number(saved?.tabTime?.achievements) || 0,
          stats: Number(saved?.tabTime?.stats) || 0
        }
      });
      if (Array.isArray(saved.buildings)) {
        saved.buildings.forEach((b, i) => {
          if (!state.buildings[i]) return;
          state.buildings[i].owned = Number(b.owned) || 0;
          state.buildings[i].cost = Number(b.cost) || Math.ceil(state.buildings[i].baseCost * (effectiveCostGrowth(state.buildings[i].owned) ** state.buildings[i].owned));
        });
      }
      if (Array.isArray(saved.upgrades)) {
        saved.upgrades.forEach((u, i) => {
          if (state.upgrades[i]) state.upgrades[i].bought = Boolean(u.bought);
        });
      }
      if (state.prestigeUpgrades.unlockFutureTech) {
        state.buildings.forEach((b) => {
          if (b.unlockBy === 'futureTech') b.locked = false;
        });
      }
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    #${ROOT_ID} { position:fixed; inset:0; z-index:2147483646; font-family: Georgia, serif; color:#f5e6c8; }
    #${ROOT_ID} * { box-sizing:border-box; }
    #${ROOT_ID} .cc-bg { position:absolute; inset:-6%; background:
      radial-gradient(120% 120% at 20% 10%, #8e6842 0%, #5a3d25 40%, #3e2c1d 72%, #2a1e14 100%),
      repeating-linear-gradient(45deg,#ffffff08 0 8px,#00000000 8px 16px); animation: cc-pan 18s ease-in-out infinite alternate; transition: filter .8s ease, opacity .8s ease; }
    #${ROOT_ID}::after { content:''; position:absolute; inset:0; pointer-events:none; z-index:0; background:linear-gradient(180deg, rgba(9,14,28,0.20), rgba(6,10,22,0.26)); opacity:0; transition:opacity .8s ease; }
    #${ROOT_ID}.cc-night .cc-bg { filter:saturate(0.88) brightness(0.86); }
    #${ROOT_ID}.cc-night::after { opacity:1; }
    #${ROOT_ID} .cc-top { position:relative; z-index:1; height:100%; display:grid; grid-template-columns: 38% 29% 33%; }
    #${ROOT_ID}.cc-game-focus .cc-top { grid-template-columns: 18% 64% 18%; }
    #${ROOT_ID} .cc-col { border-right:1px solid #0007; min-height:0; }
    #${ROOT_ID} .cc-left { padding:22px 16px; display:flex; flex-direction:column; align-items:center; }
    #${ROOT_ID} .cc-title-wrap { width:100%; display:flex; flex-direction:column; align-items:center; margin-bottom:10px; }
    #${ROOT_ID} .cc-title-row { width:100%; display:flex; align-items:center; justify-content:center; margin-bottom:6px; }
    #${ROOT_ID} .cc-title-subrow { width:100%; display:flex; align-items:center; justify-content:center; gap:8px; }
    #${ROOT_ID} .cc-title { font-size:38px; font-weight:700; margin-bottom:0; text-shadow:0 2px 8px #000; text-align:center; }
    #${ROOT_ID} .cc-title-action { border:1px solid #0009; background:#4f3926; color:#ffe8bf; cursor:pointer; padding:3px 8px; border-radius:8px; font-size:11px; line-height:1.2; box-shadow: inset 0 1px 0 #fff2; }
    #${ROOT_ID} .cc-title-action:hover { filter:brightness(1.06); }
    #${ROOT_ID} .cc-games { position:relative; display:inline-block; }
    #${ROOT_ID} .cc-games-menu { position:absolute; top:calc(100% + 4px); right:0; min-width:132px; border:1px solid #0009; border-radius:8px; background:#3a2a18; box-shadow:0 8px 16px #0008; padding:4px; display:none; z-index:8; }
    #${ROOT_ID} .cc-games-menu.open { display:block; }
    #${ROOT_ID} .cc-games-item { width:100%; border:1px solid #0008; background:#5a4028; color:#ffe8bf; cursor:pointer; padding:6px 8px; border-radius:6px; font-size:11px; text-align:left; }
    #${ROOT_ID} .cc-games-item:hover { filter:brightness(1.07); }
    #${ROOT_ID} .cc-tabmask-select {
      border:1px solid #0009;
      background:#4f3926;
      color:#ffe8bf;
      cursor:pointer;
      padding:3px 6px;
      border-radius:8px;
      font-size:11px;
      line-height:1.2;
      box-shadow: inset 0 1px 0 #fff2;
      width:110px;
      max-width:110px;
      appearance:none;
      -webkit-appearance:none;
      -moz-appearance:none;
    }
    #${ROOT_ID} .cc-tabmask-select:hover { filter:brightness(1.06); }
    #${ROOT_ID} .cc-tabmask-select option { background:#4f3926; color:#ffe8bf; }
    #${ROOT_ID} .cc-grandma-badge { margin-bottom:8px; font-size:28px; filter:drop-shadow(0 2px 3px #0008); }
    #${ROOT_ID} .cc-lace { width:100%; height:8px; margin-bottom:8px; background:repeating-linear-gradient(90deg,#f6e7cf 0 10px,#e5cfad 10px 20px); box-shadow:0 1px 0 #0005; border-radius:4px; }
    #${ROOT_ID} .cc-news { width:100%; margin-bottom:10px; padding:6px; border:1px solid #0008; background:linear-gradient(180deg,#3a2a18,#22170f); color:#f3d39b; font-size:13px; text-align:center; border-radius:8px; box-shadow: inset 0 1px 0 #fff2, 0 4px 10px #0005; animation: cc-news-glow 3s ease-in-out infinite; }
    #${ROOT_ID} .cc-cookie-count { font-size:clamp(24px,3.2vw,44px); color:#ffd37e; text-align:center; line-height:1.15; max-width:100%; padding:0 10px; overflow-wrap:anywhere; word-break:break-word; }
    #${ROOT_ID} .cc-cps { font-size:20px; color:#e9d5ae; margin-bottom:8px; }
    #${ROOT_ID} .cc-playtime { font-size:15px; color:#d9c8a8; margin-bottom:8px; text-align:center; }
    #${ROOT_ID} .cc-cookie { width:320px; height:320px; border-radius:50%; border:3px solid #5a3116; cursor:pointer;
      background:radial-gradient(circle at 35% 28%, #f4c283 0 23%, #d08a44 37%, #b86f2e 67%, #8f4f1d 100%);
      box-shadow: inset -12px -18px 22px #0006, inset 8px 8px 12px #fff3, 0 12px 24px #000a;
      font-size:200px; line-height:1; display:flex; align-items:center; justify-content:center;
      transform-style:preserve-3d; animation: cc-cookie-bob 2.2s ease-in-out infinite; }
    #${ROOT_ID} .cc-cookie::before { content:none; }
    #${ROOT_ID} .cc-cookie::after { content:none; }
    #${ROOT_ID} .cc-cookie:active { transform:translateY(3px) scale(0.96); }
    #${ROOT_ID} .cc-buffs { min-height:24px; color:#a9ff9f; font-size:16px; margin-top:12px; text-align:center; }
    #${ROOT_ID} .cc-mid { position:relative; padding:12px; background:linear-gradient(180deg,#4a3722d9,#2c2014d9); display:flex; flex-direction:column; gap:10px; min-height:0; border-left:1px solid #f2d3ff22; border-right:1px solid #f2d3ff1a; }
    #${ROOT_ID} .cc-panel-title { font-size:22px; margin-bottom:2px; color:#ffe2b3; font-family: 'Times New Roman', serif; letter-spacing:0.5px; }
    #${ROOT_ID} .cc-pstat { font-size:16px; line-height:1.35; color:#e8d9bd; }
    #${ROOT_ID} .cc-scene { border:1px solid #0008; background:linear-gradient(180deg,#2d1e21,#1a1310); padding:8px; min-height:120px; height:240px; overflow-y:auto; overflow-x:hidden; box-shadow: inset 0 1px 0 #fff1; }
    #${ROOT_ID} .cc-scene-title { font-size:14px; color:#f2d4a3; margin-bottom:6px; }
    #${ROOT_ID} .cc-scene-row { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:4px; }
    #${ROOT_ID} .cc-worker { font-size:18px; line-height:1; filter:drop-shadow(0 2px 2px #0009); animation: cc-worker-bob 2.8s ease-in-out infinite; }
    #${ROOT_ID} .cc-img3d { display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%;
      background:radial-gradient(circle at 35% 30%, #fff9, #ffffff22 45%, #00000033 100%); box-shadow: inset 0 1px 0 #fff7, 0 2px 4px #0007; }
    #${ROOT_ID} .cc-log { flex:1; border:1px solid #0008; background:#0005; overflow:auto; padding:8px; font-size:13px; line-height:1.35; }
    #${ROOT_ID} .cc-log-entry { padding:4px 0; border-bottom:1px solid #ffffff1f; }
    #${ROOT_ID} .cc-right { display:flex; flex-direction:column; background:#2a2118ea; }
    #${ROOT_ID} .cc-tabs { display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1fr; }
    #${ROOT_ID} .cc-tab { border:1px solid #0008; background:#5d4227; color:#f9e3bf; padding:10px; cursor:pointer; font-size:16px; }
    #${ROOT_ID} .cc-tab.active { background:#87633e; }
    #${ROOT_ID} .cc-buymodes { display:flex; gap:6px; padding:8px; background:#2b2217; border-bottom:1px solid #0008; }
    #${ROOT_ID} .cc-mode { display:flex; gap:6px; padding:8px; background:#20180f; border-bottom:1px solid #0008; }
    #${ROOT_ID} .cc-buymode { flex:1; border:1px solid #0008; background:#363636; color:#fff; cursor:pointer; padding:5px; }
    #${ROOT_ID} .cc-buymode.active { background:#6a7e45; }
    #${ROOT_ID} .cc-switch { flex:1; border:1px solid #0008; background:#363636; color:#fff; cursor:pointer; padding:5px; }
    #${ROOT_ID} .cc-switch.active { background:#7d5a3a; }
    #${ROOT_ID} .cc-list { flex:1; overflow:auto; padding:10px; }
    #${ROOT_ID} .cc-card { width:100%; text-align:left; margin-bottom:7px; padding:9px; border:1px solid #0008; color:#f9e9c8; cursor:pointer; background:linear-gradient(180deg,#684d2f,#4b3724); border-radius:10px; box-shadow: inset 0 1px 0 #fff2, 0 4px 10px #0005; transition: transform .12s ease, box-shadow .12s ease; }
    #${ROOT_ID} .cc-card:hover { transform:translateY(-1px); box-shadow: inset 0 1px 0 #fff3, 0 8px 14px #0007; }
    #${ROOT_ID} .cc-card.can-buy { background:linear-gradient(180deg,#8b6a3f,#6f532f); }
    #${ROOT_ID} .cc-controls { display:flex; gap:8px; padding:8px; border-top:1px solid #0009; background:#2a2014; }
    #${ROOT_ID} .cc-controls button { flex:1; cursor:pointer; padding:7px; background:#3f3f3f; color:#fff; border:1px solid #111; }
    #${ROOT_ID} .cc-flappy-overlay { position:absolute; inset:8px; z-index:4; border:1px solid #0008; border-radius:10px; background:linear-gradient(180deg,#7ec8f3 0%, #8fd4fb 60%, #eadca8 100%); overflow:hidden; box-shadow:0 8px 18px #0008; }
    #${ROOT_ID} .cc-flappy-head { position:absolute; top:8px; left:8px; right:8px; z-index:5; display:flex; justify-content:space-between; align-items:center; color:#10253a; font-size:12px; font-weight:700; text-shadow:0 1px 0 #fff8; }
    #${ROOT_ID} .cc-flappy-close { border:1px solid #0007; background:#2f2f2f; color:#fff; border-radius:6px; cursor:pointer; padding:4px 8px; font-size:11px; }
    #${ROOT_ID} .cc-flappy-canvas { width:100%; height:100%; display:block; }
    #${ROOT_ID} .cc-td-overlay { position:absolute; z-index:9; border:1px solid #0008; border-radius:10px; background:#101829; overflow:hidden; box-shadow:0 8px 18px #0008; display:flex; flex-direction:column; }
    #${ROOT_ID} .cc-td-frame { flex:1; width:100%; border:0; background:#101829; display:block; }
    #${ROOT_ID} .cc-snake-overlay { position:absolute; inset:8px; z-index:4; display:flex; align-items:center; justify-content:center; }
    #${ROOT_ID} .cc-snake-win { width:min(720px,96%); height:min(620px,96%); background:#4e7cf6; border:6px solid #3c61d1; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 20px 50px rgba(0, 0, 0, 0.5); }
    #${ROOT_ID} .cc-snake-header { background:#4e7cf6; padding:10px 20px; display:flex; justify-content:space-between; color:white; font-family:Arial,sans-serif; font-weight:bold; align-items:center; gap:10px; }
    #${ROOT_ID} .cc-snake-close { cursor:pointer; font-size:20px; padding:0 5px; line-height:1; }
    #${ROOT_ID} .cc-snake-close:hover { color:#ff4d4d; }
    #${ROOT_ID} .cc-snake-settings { background:#3c61d1; padding:8px 20px; color:white; font-family:Arial,sans-serif; font-size:13px; display:flex; align-items:center; flex-wrap:wrap; gap:12px; }
    #${ROOT_ID} .cc-snake-settings select,#${ROOT_ID} .cc-snake-settings input { border-radius:4px; border:none; padding:3px 6px; font-size:12px; background:#fff; }
    #${ROOT_ID} .cc-snake-container { flex-grow:1; position:relative; background:#aad751; overflow:hidden; }
    #${ROOT_ID} .cc-snake-canvas { display:block; width:100%; height:100%; image-rendering:pixelated; }
    #${ROOT_ID} .cc-snake-block { position:absolute; inset:0; background:rgba(0,0,0,0.58); display:none; flex-direction:column; align-items:center; justify-content:center; color:white; font-family:Arial,sans-serif; text-align:center; gap:10px; }
    #${ROOT_ID} .cc-snake-block h2 { margin:0; font-size:36px; letter-spacing:1px; }
    #${ROOT_ID} .cc-snake-block p { margin:0; font-size:16px; opacity:0.95; }
    #${ROOT_ID} .cc-snake-btn { background:#fff; color:#4e7cf6; border:none; padding:10px 20px; border-radius:20px; cursor:pointer; font-weight:bold; margin-top:8px; }
    #${ROOT_ID} .cc-golden { position:fixed; width:84px; height:84px; border-radius:50%; cursor:pointer; z-index:2147483647; user-select:none;
      background: radial-gradient(circle at 30% 28%, #fff7c6 0 18%, #f5cf57 38%, #d89b1d 72%, #9f6806 100%);
      border: 3px solid #ffef9c; box-shadow: 0 0 14px #ffd45b, inset 0 2px 6px #fff8;
      display:flex; align-items:center; justify-content:center; font-size:34px; animation: cc-golden-spin 1.6s ease-in-out infinite alternate; }
    #${ROOT_ID} .cc-golden::after { content:'Golden cookie'; position:absolute; bottom:-18px; left:50%; transform:translateX(-50%); font-size:11px; color:#ffe7a8; text-shadow:0 1px 2px #000; }
    #${ROOT_ID} .cc-flash { position:fixed; left:50%; top:15%; transform:translateX(-50%); color:#ffea96; font-size:36px; z-index:2147483647; text-shadow:0 2px 10px #000; pointer-events:none; }
    #${ROOT_ID} .cc-click-float { position:fixed; z-index:2147483647; pointer-events:none; color:#ffd88a; font-weight:bold; text-shadow:0 2px 6px #000; animation: cc-rise 900ms ease-out forwards; }
    #${ROOT_ID} .cc-cookie-pop { position:fixed; z-index:2147483647; pointer-events:none; font-size:16px; filter:drop-shadow(0 2px 3px #0007); animation: cc-cookie-pop 700ms cubic-bezier(.17,.67,.32,1) forwards; }
    #${ROOT_ID} .cc-candy-cane { position:fixed; z-index:2147483647; pointer-events:none; font-size:26px; filter:drop-shadow(0 4px 6px #0009); animation: cc-candy-fall linear forwards; }
    #${ROOT_ID} .cc-lightning { position:fixed; z-index:2147483647; pointer-events:none; width:7px; border-radius:10px; background:linear-gradient(180deg,#fff,#bde5ff 45%,#e8f7ff); box-shadow:0 0 16px #d8f0ff, 0 0 30px #9fddff; transform-origin:top center; animation: cc-lightning-zap 230ms ease-out forwards; }
    #${ROOT_ID} .cc-storm-ring { position:fixed; z-index:2147483647; pointer-events:none; width:74px; height:74px; border-radius:50%; border:2px solid #d4ecff; box-shadow:0 0 18px #88d0ff; animation: cc-storm-ring 420ms ease-out forwards; }
    @keyframes cc-rise { from { opacity:1; transform:translate(-50%, 0) scale(1); } to { opacity:0; transform:translate(-50%, -48px) scale(1.08); } }
    @keyframes cc-pan { from { transform:translateX(-2%) translateY(-1%);} to { transform:translateX(2%) translateY(1%);} }
    @keyframes cc-news-glow { 0%,100% { box-shadow: inset 0 1px 0 #fff2, 0 4px 10px #0005; } 50% { box-shadow: inset 0 1px 0 #fff4, 0 6px 14px #0008; } }
    @keyframes cc-cookie-bob { 0%,100% { transform:translateY(0) rotate(-1deg);} 50% { transform:translateY(-4px) rotate(1deg);} }
    @keyframes cc-worker-bob { 0%,100% { transform:translateY(0);} 50% { transform:translateY(-1px);} }
    @keyframes cc-golden-spin { 0% { transform:rotate(-8deg) scale(1);} 100% { transform:rotate(8deg) scale(1.08);} }
    #${ROOT_ID} .cc-wrath { background: radial-gradient(circle at 30% 28%, #ffd0d0 0 18%, #f06b6b 38%, #b93737 72%, #6f1111 100%); border-color:#ffd0d0; box-shadow:0 0 14px #ff6f6f, inset 0 2px 6px #fff5; }
    #${ROOT_ID} .cc-wrath::after { content:'Wrath'; color:#ffc6c6; }
    @keyframes cc-cookie-pop {
      from { opacity:1; transform:translate(0,0) scale(1); }
      to { opacity:0; transform:translate(var(--dx), var(--dy)) scale(0.55) rotate(var(--rot)); }
    }
    @keyframes cc-candy-fall {
      from { opacity:0; transform:translate(var(--sx), -14vh) rotate(0deg) scale(0.8); }
      10% { opacity:1; }
      to { opacity:0; transform:translate(var(--ex), 110vh) rotate(var(--rot)) scale(1.1); }
    }
    @keyframes cc-lightning-zap {
      0% { opacity:0; transform:translate(-50%, 0) scaleY(0.2); }
      25% { opacity:1; transform:translate(-50%, 0) scaleY(1); }
      100% { opacity:0; transform:translate(-50%, 0) scaleY(1.15); }
    }
    @keyframes cc-storm-ring {
      from { opacity:0.95; transform:translate(-50%, -50%) scale(0.2); }
      to { opacity:0; transform:translate(-50%, -50%) scale(1.6); }
    }
    #${ROOT_ID} .cc-hotkey-note { margin-top:6px; color:#d7c7aa; font-size:12px; }
    #${ROOT_ID} .cc-admin-overlay { position:fixed; inset:0; background:radial-gradient(circle at 50% 20%, #0006 0%, #000d 70%); backdrop-filter:blur(2px); z-index:2147483647; display:flex; align-items:center; justify-content:center; padding:14px; }
    #${ROOT_ID} .cc-admin-overlay.cc-admin-overlay-lite { background:transparent; backdrop-filter:none; padding:0; }
    #${ROOT_ID} .cc-admin-panel { width:min(980px,96vw); max-height:92vh; overflow:auto; background:linear-gradient(180deg,#4d3624 0%,#2f2116 55%,#251a12 100%); border:1px solid #000; border-radius:14px; box-shadow:0 16px 34px #000c, inset 0 1px 0 #ffffff22; padding:14px; color:#f8e6c7; }
    #${ROOT_ID} .cc-admin-panel.cc-admin-dropdown { position:fixed; width:min(720px,92vw); max-height:min(78vh,720px); z-index:2147483647; }
    #${ROOT_ID} .cc-admin-title { font-size:22px; margin-bottom:4px; color:#ffe6bb; letter-spacing:0.4px; }
    #${ROOT_ID} .cc-admin-subtitle { font-size:12px; color:#d9c3a0; margin-bottom:10px; }
    #${ROOT_ID} .cc-admin-sections { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    #${ROOT_ID} .cc-admin-section { background:linear-gradient(180deg,#3b2a1d,#2a1d14); border:1px solid #0008; border-radius:10px; padding:10px; box-shadow: inset 0 1px 0 #fff1; }
    #${ROOT_ID} .cc-admin-section-title { font-size:14px; color:#ffe0a9; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.7px; }
    #${ROOT_ID} .cc-admin-grid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
    #${ROOT_ID} .cc-admin-grid button { padding:8px; border-radius:8px; background:linear-gradient(180deg,#6e5237,#4a3827); color:#fff; border:1px solid #000; cursor:pointer; font-size:12px; box-shadow: inset 0 1px 0 #fff2; }
    #${ROOT_ID} .cc-admin-grid button:hover { filter:brightness(1.06); transform:translateY(-1px); }
    #${ROOT_ID} .cc-admin-grid button:active { transform:translateY(1px); }
    #${ROOT_ID} .cc-admin-row { display:flex; gap:8px; margin-top:10px; }
    #${ROOT_ID} .cc-admin-row button { flex:1; padding:9px; background:linear-gradient(180deg,#745637,#594026); color:#fff; border:1px solid #000; border-radius:8px; cursor:pointer; }
    #${ROOT_ID} .cc-admin-note { font-size:12px; color:#d7c7aa; margin-top:10px; }
    #${ROOT_ID} .cc-admin-section-title { display:flex; align-items:center; justify-content:space-between; cursor:pointer; user-select:none; }
    #${ROOT_ID} .cc-admin-section-title::after { content:'▾'; font-size:12px; opacity:0.9; transition:transform 120ms ease; }
    #${ROOT_ID} .cc-admin-section:not(.open) .cc-admin-grid { display:none; }
    #${ROOT_ID} .cc-admin-section:not(.open) .cc-admin-section-title::after { transform:rotate(-90deg); }
    #${ROOT_ID} .cc-admin-auth-overlay { position:fixed; inset:0; z-index:2147483647; background:rgba(0,0,0,0.65); display:flex; align-items:center; justify-content:center; }
    #${ROOT_ID} .cc-admin-auth { width:min(360px,92vw); background:linear-gradient(180deg,#4d3624 0%,#2f2116 55%,#251a12 100%); border:1px solid #000; border-radius:12px; box-shadow:0 14px 28px #000c; padding:12px; color:#f8e6c7; }
    #${ROOT_ID} .cc-admin-auth-title { font-size:16px; margin-bottom:8px; color:#ffe6bb; }
    #${ROOT_ID} .cc-admin-auth input { width:100%; box-sizing:border-box; padding:9px; border-radius:8px; border:1px solid #000a; background:#1e140d; color:#ffeccd; margin-bottom:10px; }
    #${ROOT_ID} .cc-admin-auth-row { display:flex; gap:8px; }
    #${ROOT_ID} .cc-admin-auth-row button { flex:1; padding:8px; border-radius:8px; border:1px solid #000; cursor:pointer; background:linear-gradient(180deg,#6e5237,#4a3827); color:#fff; }

    #${ROOT_ID} #cc-admin { display:inline-flex; align-items:center; gap:6px; }
    #${ROOT_ID} #cc-admin::after { content:'▾'; font-size:11px; opacity:0.9; transition:transform 120ms ease; }
    #${ROOT_ID} #cc-admin.open::after { transform:rotate(180deg); }
    @media (max-width: 900px) { #${ROOT_ID} .cc-admin-sections { grid-template-columns:1fr; } }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = ROOT_ID;
  root.innerHTML = policy.createHTML(`
    <div class="cc-bg"></div>
    <div class="cc-top">
      <section class="cc-col cc-left">
        <div class="cc-grandma-badge">👵🍪</div>
        <div class="cc-title-wrap">
          <div class="cc-title-row">
            <div class="cc-title">Cookie Clicker</div>
          </div>
          <div class="cc-title-subrow">
            <div id="cc-games" class="cc-games">
              <button id="cc-games-btn" class="cc-title-action" title="Open games menu">Games ▾</button>
            <div id="cc-games-menu" class="cc-games-menu">
              <button id="cc-game-flappy" class="cc-games-item">Flappy Bird</button>
              <button id="cc-game-snake" class="cc-games-item">Snake</button>
              <button id="cc-game-td" class="cc-games-item">Tower Defense</button>
              <button id="cc-game-block" class="cc-games-item">Block Blast</button>
            </div>
            </div>
            <select id="cc-tabmask" class="cc-tabmask-select" title="Change tab disguise"></select>
          </div>
        </div>
        <div class="cc-lace"></div>
        <div id="cc-news" class="cc-news">A quiet bakery awaits...</div>
        <div id="cc-cookie-count" class="cc-cookie-count">0 cookies</div>
        <div id="cc-cps" class="cc-cps">per second: 0</div>
        <div id="cc-playtime" class="cc-playtime">Time played: 0h 0m 0s</div>
        <button id="cc-cookie" class="cc-cookie">🍪</button>
        <div id="cc-hotkey-note" class="cc-hotkey-note"></div>
        <div id="cc-buffs" class="cc-buffs"></div>
      </section>
      <section class="cc-col cc-mid">
        <div class="cc-panel-title">Legacy & Log</div>
        <div id="cc-prestige-stat" class="cc-pstat"></div>
        <div id="cc-scene" class="cc-scene"></div>
        <div id="cc-log" class="cc-log"></div>
      </section>
      <section class="cc-col cc-right">
        <div class="cc-tabs">
          <button id="cc-tab-shop" class="cc-tab">Buildings</button>
          <button id="cc-tab-upgrades" class="cc-tab">Upgrades</button>
          <button id="cc-tab-prestige" class="cc-tab">Prestige</button>
          <button id="cc-tab-achievements" class="cc-tab">Achievements</button>
          <button id="cc-tab-stats" class="cc-tab">Stats</button>
        </div>
        <div class="cc-mode">
          <button id="cc-mode-buy" class="cc-switch">Buy</button>
          <button id="cc-mode-sell" class="cc-switch">Sell</button>
        </div>
        <div class="cc-buymodes">
          <button id="cc-buy-1" class="cc-buymode">x1</button>
          <button id="cc-buy-10" class="cc-buymode">x10</button>
          <button id="cc-buy-100" class="cc-buymode">x100</button>
          <button id="cc-buy-max" class="cc-buymode">Max</button>
        </div>
        <div id="cc-list" class="cc-list"></div>
        <div class="cc-controls">
          <button id="cc-keybind">Set Toggle Key</button>
          <button id="cc-admin">Admin</button>
          <button id="cc-minimize">Close</button>
          <button id="cc-reset">Hard Reset</button>
        </div>
      </section>
    </div>
  `);
  document.body.appendChild(root);

  const els = {
    cookieCount: root.querySelector('#cc-cookie-count'),
    cps: root.querySelector('#cc-cps'),
    playtime: root.querySelector('#cc-playtime'),
    cookieBtn: root.querySelector('#cc-cookie'),
    news: root.querySelector('#cc-news'),
    hotkeyNote: root.querySelector('#cc-hotkey-note'),
    buffs: root.querySelector('#cc-buffs'),
    prestigeStat: root.querySelector('#cc-prestige-stat'),
    scene: root.querySelector('#cc-scene'),
    log: root.querySelector('#cc-log'),
    list: root.querySelector('#cc-list'),
    tabShop: root.querySelector('#cc-tab-shop'),
    tabUpgrades: root.querySelector('#cc-tab-upgrades'),
    tabPrestige: root.querySelector('#cc-tab-prestige'),
    tabAchievements: root.querySelector('#cc-tab-achievements'),
    tabStats: root.querySelector('#cc-tab-stats'),
    buy1: root.querySelector('#cc-buy-1'),
    buy10: root.querySelector('#cc-buy-10'),
    buy100: root.querySelector('#cc-buy-100'),
    buyMax: root.querySelector('#cc-buy-max'),
    modeBuy: root.querySelector('#cc-mode-buy'),
    modeSell: root.querySelector('#cc-mode-sell'),
    keybind: root.querySelector('#cc-keybind'),
    games: root.querySelector('#cc-games'),
    gamesBtn: root.querySelector('#cc-games-btn'),
    gamesMenu: root.querySelector('#cc-games-menu'),
    gameFlappy: root.querySelector('#cc-game-flappy'),
    gameSnake: root.querySelector('#cc-game-snake'),
    gameTd: root.querySelector('#cc-game-td'),
    gameBlock: root.querySelector('#cc-game-block'),
    admin: root.querySelector('#cc-admin'),
    close: root.querySelector('#cc-minimize'),
    reset: root.querySelector('#cc-reset'),
    tabmask: root.querySelector('#cc-tabmask'),
    midCol: root.querySelector('.cc-mid')
  };

  if (!els.gameBlock && els.gamesMenu) {
    const blockBtn = document.createElement('button');
    blockBtn.id = 'cc-game-block';
    blockBtn.className = 'cc-games-item';
    blockBtn.textContent = 'Block Blast';
    els.gamesMenu.appendChild(blockBtn);
    els.gameBlock = blockBtn;
  }

  const flappy = {
    active: false,
    rafId: null,
    overlay: null,
    canvas: null,
    ctx: null,
    width: 520,
    height: 340,
    birdX: 120,
    birdY: 170,
    birdVel: 0,
    gravity: 980,
    lift: -320,
    pipes: [],
    spawnTimer: 0,
    score: 0,
    best: 0,
    ended: false,
    lastTs: 0,
    hud: null
  };
  const snakeMid = {
    active: false,
    overlay: null,
    timer: null,
    controls: null,
    state: null
  };
  const tdMid = {
    active: false,
    overlay: null,
    resizeObs: null
  };

  const syncGameFocus = () => {
    root.classList.toggle('cc-game-focus', flappy.active || snakeMid.active || tdMid.active);
  };

  function resetFlappyRound() {
    flappy.birdY = flappy.height * 0.45;
    flappy.birdVel = 0;
    flappy.pipes = [];
    flappy.spawnTimer = 0;
    flappy.score = 0;
    flappy.ended = false;
    flappy.lastTs = 0;
  }

  function stopFlappyMode() {
    if (!flappy.active) return;
    flappy.active = false;
    if (flappy.rafId) cancelAnimationFrame(flappy.rafId);
    flappy.rafId = null;
    if (flappy.overlay?.isConnected) flappy.overlay.remove();
    flappy.overlay = null;
    flappy.canvas = null;
    flappy.ctx = null;
    flappy.hud = null;
    if (els.gameFlappy) els.gameFlappy.textContent = 'Flappy Bird';
    syncGameFocus();
  }

  function drawFlappy() {
    const ctx = flappy.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, flappy.width, flappy.height);

    ctx.fillStyle = '#7ec8f3';
    ctx.fillRect(0, 0, flappy.width, flappy.height);
    ctx.fillStyle = '#a6defc';
    for (let i = 0; i < 6; i += 1) ctx.fillRect((i * 120 + (Date.now() / 15) % 120) - 120, 25 + (i % 2) * 24, 64, 16);
    ctx.fillStyle = '#d9c289';
    ctx.fillRect(0, flappy.height - 34, flappy.width, 34);

    ctx.fillStyle = '#5cae4f';
    flappy.pipes.forEach((pipe) => {
      ctx.fillRect(pipe.x, 0, pipe.w, pipe.top);
      ctx.fillRect(pipe.x, pipe.top + pipe.gap, pipe.w, flappy.height - (pipe.top + pipe.gap));
    });

    ctx.fillStyle = '#ffeb75';
    ctx.beginPath();
    ctx.arc(flappy.birdX, flappy.birdY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillRect(flappy.birdX + 6, flappy.birdY - 6, 3, 3);

    ctx.fillStyle = '#0d2133';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`Score: ${flappy.score}`, 12, 28);
    ctx.fillText(`Best: ${flappy.best}`, 12, 52);
    if (flappy.ended) {
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Game Over', flappy.width / 2 - 64, flappy.height / 2 - 10);
      ctx.font = '14px sans-serif';
      ctx.fillText('Press Space or click to restart', flappy.width / 2 - 100, flappy.height / 2 + 18);
    }
  }

  function updateFlappy(dt) {
    if (flappy.ended) return;
    flappy.spawnTimer -= dt;
    if (flappy.spawnTimer <= 0) {
      const top = 55 + Math.random() * 165;
      flappy.pipes.push({ x: flappy.width + 30, w: 56, top, gap: 118, scored: false });
      flappy.spawnTimer = 1.35;
    }

    flappy.birdVel += flappy.gravity * dt;
    flappy.birdY += flappy.birdVel * dt;

    flappy.pipes.forEach((pipe) => {
      pipe.x -= 150 * dt;
      if (!pipe.scored && pipe.x + pipe.w < flappy.birdX) {
        pipe.scored = true;
        flappy.score += 1;
        flappy.best = Math.max(flappy.best, flappy.score);
      }
      const withinX = flappy.birdX + 12 > pipe.x && flappy.birdX - 12 < pipe.x + pipe.w;
      const hitTop = flappy.birdY - 12 < pipe.top;
      const hitBottom = flappy.birdY + 12 > pipe.top + pipe.gap;
      if (withinX && (hitTop || hitBottom)) flappy.ended = true;
    });

    flappy.pipes = flappy.pipes.filter((pipe) => pipe.x + pipe.w > -20);
    if (flappy.birdY < 12 || flappy.birdY > flappy.height - 46) flappy.ended = true;
  }

  function flappyFrame(ts) {
    if (!flappy.active) return;
    if (!flappy.lastTs) flappy.lastTs = ts;
    const dt = Math.min(0.034, (ts - flappy.lastTs) / 1000);
    flappy.lastTs = ts;
    updateFlappy(dt);
    drawFlappy();
    flappy.rafId = requestAnimationFrame(flappyFrame);
  }

  function flapBird() {
    if (!flappy.active) return;
    if (flappy.ended) {
      resetFlappyRound();
      return;
    }
    flappy.birdVel = flappy.lift;
  }

  function startFlappyMode() {
    if (flappy.active) return;
    flappy.active = true;
    if (els.gameFlappy) els.gameFlappy.textContent = 'Flappy Bird';
    const overlay = document.createElement('div');
    overlay.className = 'cc-flappy-overlay';

    const head = document.createElement('div');
    head.className = 'cc-flappy-head';
    head.innerHTML = policy.createHTML('<span>Flappy Bird (Space / Click to flap)</span>');

    const close = document.createElement('button');
    close.className = 'cc-flappy-close';
    close.textContent = 'Exit';
    close.onclick = () => stopFlappyMode();
    head.appendChild(close);

    const canvas = document.createElement('canvas');
    canvas.className = 'cc-flappy-canvas';
    canvas.width = flappy.width;
    canvas.height = flappy.height;
    canvas.onclick = () => flapBird();
    overlay.append(head, canvas);
    els.midCol.appendChild(overlay);

    flappy.overlay = overlay;
    flappy.canvas = canvas;
    flappy.ctx = canvas.getContext('2d');
    resetFlappyRound();
    flappy.rafId = requestAnimationFrame(flappyFrame);
    syncGameFocus();
  }

  function stopSnakeMode() {
    if (!snakeMid.active) return;
    snakeMid.active = false;
    if (snakeMid.timer) clearTimeout(snakeMid.timer);
    snakeMid.timer = null;
    if (snakeMid.overlay?.isConnected) snakeMid.overlay.remove();
    snakeMid.overlay = null;
    snakeMid.controls = null;
    snakeMid.state = null;
    syncGameFocus();
  }


  function stopTdMode() {
    if (tdMid.resizeObs) tdMid.resizeObs.disconnect();
    tdMid.resizeObs = null;
    if (tdMid.overlay?.isConnected) tdMid.overlay.remove();
    document.querySelectorAll(`#${ROOT_ID} .cc-td-overlay`).forEach((node) => node.remove());
    tdMid.overlay = null;
    tdMid.active = false;
    syncGameFocus();
  }

  window.__cc_tdMid = tdMid;
  window.__cc_syncGameFocus = syncGameFocus;
  window.__cc_stopTdMode = stopTdMode;

  function startSnakeMode() {
    if (snakeMid.active) return;
    snakeMid.active = true;
    const overlay = document.createElement('div');
    overlay.className = 'cc-snake-overlay';
    overlay.innerHTML = policy.createHTML(`
      <div class="cc-snake-win">
        <div class="cc-snake-header">
          <div><span id="cc-snake-score">🍎 0 </span><span id="cc-snake-best">🏆 0</span></div>
          <div style="opacity:.9;font-size:12px">Arrows move • P pause</div>
          <span id="cc-snake-close" class="cc-snake-close">✖</span>
        </div>
        <div class="cc-snake-settings">
          Apples: <input id="cc-snake-apples" type="number" min="1" max="5" step="1" value="1" style="width:42px">
          Speed: <select id="cc-snake-speed"><option value="145">Slow</option><option value="105" selected>Normal</option><option value="75">Fast</option></select>
          Grid: <input id="cc-snake-grid" type="checkbox" checked>
        </div>
        <div class="cc-snake-container">
          <canvas id="cc-snake-canvas" class="cc-snake-canvas"></canvas>
          <div id="cc-snake-block" class="cc-snake-block">
            <h2 id="cc-snake-title">SNAKE</h2>
            <p id="cc-snake-hint">Arrow keys to move • Press Space to start</p>
            <button id="cc-snake-start" class="cc-snake-btn">START</button>
          </div>
        </div>
      </div>
    `);
    els.midCol.appendChild(overlay);

    const canvas = overlay.querySelector('#cc-snake-canvas');
    const container = overlay.querySelector('.cc-snake-container');
    const ctx = canvas.getContext('2d');
    const scoreEl = overlay.querySelector('#cc-snake-score');
    const bestEl = overlay.querySelector('#cc-snake-best');
    const applesEl = overlay.querySelector('#cc-snake-apples');
    const speedEl = overlay.querySelector('#cc-snake-speed');
    const gridEl = overlay.querySelector('#cc-snake-grid');
    const block = overlay.querySelector('#cc-snake-block');
    const titleEl = overlay.querySelector('#cc-snake-title');
    const hintEl = overlay.querySelector('#cc-snake-hint');
    const startEl = overlay.querySelector('#cc-snake-start');
    overlay.querySelector('#cc-snake-close').onclick = () => stopSnakeMode();

    const STORAGE_KEY = 'snake_console_best_score_v2';
    const cellSize = 30;
    const game = {
      snake: [], foods: [], direction: { x: 1, y: 0 }, queued: { x: 1, y: 0 },
      score: 0, best: Number(localStorage.getItem(STORAGE_KEY) || 0),
      started: false, dead: false, paused: false
    };
    const clampApples = () => {
      const n = Number(applesEl.value);
      const safe = Number.isFinite(n) ? Math.max(1, Math.min(5, Math.floor(n))) : 1;
      applesEl.value = String(safe);
      return safe;
    };
    const resizeCanvas = () => { canvas.width = container.clientWidth; canvas.height = container.clientHeight; };
    const gridSize = () => ({ cols: Math.max(1, Math.floor(canvas.width / cellSize)), rows: Math.max(1, Math.floor(canvas.height / cellSize)) });
    const showBlock = (title, hint, btn) => { titleEl.textContent = title; hintEl.textContent = hint; startEl.textContent = btn; block.style.display = 'flex'; };
    const hideBlock = () => { block.style.display = 'none'; };
    const updateScores = () => { scoreEl.textContent = `🍎 ${game.score} `; bestEl.textContent = `🏆 ${game.best}`; };

    const spawnFood = () => {
      const { cols, rows } = gridSize();
      let point; let safety = 0;
      do {
        point = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
        safety += 1;
      } while (safety < cols * rows && (game.snake.some((s) => s.x === point.x && s.y === point.y) || game.foods.some((f) => f.x === point.x && f.y === point.y)));
      game.foods.push(point);
    };
    const initSnake = () => {
      const { cols, rows } = gridSize();
      const midX = Math.max(4, Math.floor(cols / 2));
      const midY = Math.floor(rows / 2);
      game.snake = [{ x: midX, y: midY }, { x: midX - 1, y: midY }, { x: midX - 2, y: midY }];
      game.direction = { x: 1, y: 0 };
      game.queued = { x: 1, y: 0 };
    };
    const draw = () => {
      const { cols, rows } = gridSize();
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          ctx.fillStyle = (x + y) % 2 === 0 ? '#aad751' : '#a2d149';
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
      if (gridEl.checked) {
        ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        for (let x = 0; x <= cols; x += 1) { ctx.beginPath(); ctx.moveTo(x * cellSize + 0.5, 0); ctx.lineTo(x * cellSize + 0.5, rows * cellSize); ctx.stroke(); }
        for (let y = 0; y <= rows; y += 1) { ctx.beginPath(); ctx.moveTo(0, y * cellSize + 0.5); ctx.lineTo(cols * cellSize, y * cellSize + 0.5); ctx.stroke(); }
      }
      game.foods.forEach((f) => {
        const cx = f.x * cellSize + cellSize / 2; const cy = f.y * cellSize + cellSize / 2;
        ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.arc(cx, cy, cellSize / 2.55, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#27ae60'; ctx.fillRect(cx - 2, cy - cellSize / 2 + 2, 4, 8);
      });
      game.snake.forEach((seg, index) => {
        const r = cellSize / 2 - 2; const x = seg.x * cellSize + cellSize / 2; const y = seg.y * cellSize + cellSize / 2;
        ctx.fillStyle = index === 0 ? '#4e7cf6' : '#5b89ff'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });
    };
    const endGame = () => {
      game.dead = true; game.started = false;
      if (game.score > game.best) { game.best = game.score; localStorage.setItem(STORAGE_KEY, String(game.best)); }
      updateScores();
      showBlock('GAME OVER', 'Press Space or click to play again', 'TRY AGAIN');
    };
    const tickSnake = () => {
      if (!snakeMid.active || !game.started || game.dead || game.paused) return;
      if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) resizeCanvas();
      game.direction = game.queued;
      const head = { x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y };
      const { cols, rows } = gridSize();
      const hitWall = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
      const hitSelf = game.snake.slice(0, -1).some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) { endGame(); return; }
      game.snake.unshift(head);
      let ate = false;
      for (let index = game.foods.length - 1; index >= 0; index -= 1) {
        const food = game.foods[index];
        if (food.x === head.x && food.y === head.y) { game.foods.splice(index, 1); game.score += 1; ate = true; }
      }
      if (!ate) game.snake.pop();
      while (game.foods.length < clampApples()) spawnFood();
      updateScores(); draw();
      snakeMid.timer = setTimeout(tickSnake, Number(speedEl.value));
    };
    const startSnake = () => {
      if (snakeMid.timer) clearTimeout(snakeMid.timer);
      resizeCanvas();
      game.score = 0; game.dead = false; game.paused = false; game.started = true; game.foods = [];
      initSnake();
      while (game.foods.length < clampApples()) spawnFood();
      hideBlock(); updateScores(); draw(); tickSnake();
    };
    startEl.onclick = () => {
      if (!game.started || game.dead) { startSnake(); return; }
      if (game.paused) { game.paused = false; hideBlock(); tickSnake(); }
    };
    applesEl.onchange = () => {
      const want = clampApples();
      while (game.foods.length < want) spawnFood();
      if (game.foods.length > want) game.foods = game.foods.slice(0, want);
      draw();
    };
    speedEl.onchange = () => {
      if (game.started && !game.dead && !game.paused) { clearTimeout(snakeMid.timer); tickSnake(); }
    };
    const resizeObs = new ResizeObserver(() => { if (!snakeMid.active) return; resizeCanvas(); draw(); });
    resizeObs.observe(container);

    snakeMid.overlay = overlay;
    snakeMid.state = { game, tickSnake, startSnake, hideBlock, showBlock };
    updateScores(); resizeCanvas(); initSnake(); draw();
    showBlock('SNAKE', 'Arrow keys to move • Press Space to start', 'START');
    syncGameFocus();
  }

  function launchSnakeGame() {
    const existing = document.getElementById('snake-win');
    if (existing) {
      existing.style.display = existing.style.display === 'none' ? 'flex' : 'none';
      return;
    }

    const STORAGE_KEY = 'snake_console_best_score_v2';
    const style = document.createElement('style');
    style.textContent = `
      #snake-win { position: fixed; top: 50px; left: 50px; width: 720px; height: 620px; background: #4e7cf6; border: 6px solid #3c61d1; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; z-index: 100000; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); resize: both; min-width: 380px; min-height: 420px; }
      #snake-header { background: #4e7cf6; padding: 10px 20px; display: flex; justify-content: space-between; color: white; font-family: Arial, sans-serif; font-weight: bold; cursor: move; user-select: none; align-items: center; gap: 10px; }
      #snake-x { cursor: pointer; font-size: 20px; padding: 0 5px; line-height: 1; }
      #snake-x:hover { color: #ff4d4d; }
      #snake-settings { background: #3c61d1; padding: 8px 20px; color: white; font-family: Arial, sans-serif; font-size: 13px; display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
      #snake-container { flex-grow: 1; position: relative; background: #aad751; overflow: hidden; }
      #snake-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; }
      #snake-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.58); display: none; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: Arial, sans-serif; text-align: center; padding: 16px; box-sizing: border-box; gap: 10px; }
      .snake-btn { background: #fff; color: #4e7cf6; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-weight: bold; margin-top: 8px; }
      .snake-btn:hover { filter: brightness(0.95); }
      #snake-overlay h2 { margin: 0; font-size: 36px; letter-spacing: 1px; }
      #snake-overlay p { margin: 0; font-size: 16px; opacity: 0.95; }
      #snake-settings select, #snake-settings input { border-radius: 4px; border: none; padding: 3px 6px; font-size: 12px; background: #ffffff; }
    `;
    document.head.appendChild(style);

    const win = document.createElement('div');
    win.id = 'snake-win';
    const header = document.createElement('div');
    header.id = 'snake-header';
    const leftHeader = document.createElement('div');
    const scoreText = document.createElement('span');
    scoreText.textContent = '🍎 0 ';
    const highScoreText = document.createElement('span');
    highScoreText.textContent = '🏆 0';
    leftHeader.append(scoreText, highScoreText);
    const rightHeader = document.createElement('div');
    rightHeader.textContent = 'Ctrl+E hide/show';
    const closeBtn = document.createElement('span');
    closeBtn.id = 'snake-x';
    closeBtn.textContent = '✖';
    header.append(leftHeader, rightHeader, closeBtn);

    const settings = document.createElement('div');
    settings.id = 'snake-settings';
    const appleInput = document.createElement('input');
    appleInput.type = 'number'; appleInput.min = '1'; appleInput.max = '5'; appleInput.step = '1'; appleInput.value = '1'; appleInput.style.width = '42px';
    const speedSelect = document.createElement('select');
    const speeds = { Slow: 145, Normal: 105, Fast: 75 };
    Object.entries(speeds).forEach(([name, value]) => {
      const opt = document.createElement('option');
      opt.value = String(value);
      opt.textContent = name;
      if (name === 'Normal') opt.selected = true;
      speedSelect.appendChild(opt);
    });
    const showGridInput = document.createElement('input');
    showGridInput.type = 'checkbox';
    showGridInput.checked = true;
    settings.append('Apples:', appleInput, 'Speed:', speedSelect, 'Grid:', showGridInput, 'P = Pause');

    const container = document.createElement('div');
    container.id = 'snake-container';
    const canvas = document.createElement('canvas');
    canvas.id = 'snake-canvas';
    const overlay = document.createElement('div');
    overlay.id = 'snake-overlay';
    const overlayTitle = document.createElement('h2');
    const overlayHint = document.createElement('p');
    const startBtn = document.createElement('button');
    startBtn.className = 'snake-btn';
    startBtn.textContent = 'START';
    overlay.append(overlayTitle, overlayHint, startBtn);
    container.append(canvas, overlay);
    win.append(header, settings, container);
    document.body.appendChild(win);

    const ctx = canvas.getContext('2d');
    let isDragging = false; let offX = 0; let offY = 0;
    header.onmousedown = (e) => { if (e.target !== closeBtn) { isDragging = true; offX = win.offsetLeft - e.clientX; offY = win.offsetTop - e.clientY; } };
    document.addEventListener('mousemove', (e) => { if (!isDragging) return; win.style.left = `${e.clientX + offX}px`; win.style.top = `${e.clientY + offY}px`; });
    document.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('keydown', (e) => { if (e.ctrlKey && e.key.toLowerCase() === 'e') { e.preventDefault(); win.style.display = win.style.display === 'none' ? 'flex' : 'none'; } });
    closeBtn.onclick = () => { win.style.display = 'none'; };

    const cellSize = 30;
    let snake = []; let foods = []; let direction = { x: 1, y: 0 }; let queuedDirection = { x: 1, y: 0 };
    let score = 0; let highScore = Number(localStorage.getItem(STORAGE_KEY) || 0); let isDead = false; let isStarted = false; let isPaused = false; let timer;

    const clampAppleCount = () => {
      const n = Number(appleInput.value);
      const safe = Number.isFinite(n) ? Math.max(1, Math.min(5, Math.floor(n))) : 1;
      appleInput.value = String(safe);
      return safe;
    };
    const updateScoreText = () => { scoreText.textContent = `🍎 ${score} `; highScoreText.textContent = `🏆 ${highScore}`; };
    const applyCanvasSize = () => { canvas.width = container.clientWidth; canvas.height = container.clientHeight; };
    const gridSize = () => ({ cols: Math.max(1, Math.floor(canvas.width / cellSize)), rows: Math.max(1, Math.floor(canvas.height / cellSize)) });
    const showOverlay = (title, hint, buttonText) => { overlayTitle.textContent = title; overlayHint.textContent = hint; startBtn.textContent = buttonText; overlay.style.display = 'flex'; };
    const hideOverlay = () => { overlay.style.display = 'none'; };

    const spawnFood = () => {
      const { cols, rows } = gridSize(); let newFood; let safety = 0;
      do {
        newFood = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
        safety += 1;
        if (safety > cols * rows) break;
      } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y) || foods.some((f) => f.x === newFood.x && f.y === newFood.y));
      foods.push(newFood);
    };

    const initializeSnake = () => {
      const { cols, rows } = gridSize();
      const midX = Math.max(4, Math.floor(cols / 2)); const midY = Math.floor(rows / 2);
      snake = [{ x: midX, y: midY }, { x: midX - 1, y: midY }, { x: midX - 2, y: midY }];
      direction = { x: 1, y: 0 }; queuedDirection = { x: 1, y: 0 };
    };

    const drawBoard = () => {
      const { cols, rows } = gridSize();
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const even = (x + y) % 2 === 0;
          ctx.fillStyle = even ? '#aad751' : '#a2d149';
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
      if (showGridInput.checked) {
        ctx.strokeStyle = 'rgba(0,0,0,0.05)'; ctx.lineWidth = 1;
        for (let x = 0; x <= cols; x += 1) { ctx.beginPath(); ctx.moveTo(x * cellSize + 0.5, 0); ctx.lineTo(x * cellSize + 0.5, rows * cellSize); ctx.stroke(); }
        for (let y = 0; y <= rows; y += 1) { ctx.beginPath(); ctx.moveTo(0, y * cellSize + 0.5); ctx.lineTo(cols * cellSize, y * cellSize + 0.5); ctx.stroke(); }
      }
    };

    const drawFood = () => {
      foods.forEach((f) => {
        const cx = f.x * cellSize + cellSize / 2; const cy = f.y * cellSize + cellSize / 2;
        ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.arc(cx, cy, cellSize / 2.55, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#27ae60'; ctx.fillRect(cx - 2, cy - cellSize / 2 + 2, 4, 8);
      });
    };

    const drawSnake = () => {
      snake.forEach((segment, i) => {
        const r = cellSize / 2 - 2; const x = segment.x * cellSize + cellSize / 2; const y = segment.y * cellSize + cellSize / 2;
        ctx.fillStyle = i === 0 ? '#4e7cf6' : '#5b89ff'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        if (i < snake.length - 1) {
          const n = snake[i + 1];
          ctx.fillRect(x + ((n.x - segment.x) * cellSize) / 2 - r, y + ((n.y - segment.y) * cellSize) / 2 - r, r * 2, r * 2);
        }
        if (i === 0) {
          const dx = direction.x; const dy = direction.y; const ex = dx !== 0 ? 7 : 5; const ey = dy !== 0 ? 7 : 5;
          ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(x + dx * 9 - dy * ex, y + dy * 9 - dx * ey, 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(x + dx * 9 + dy * ex, y + dy * 9 + dx * ey, 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(x + dx * 11 - dy * ex, y + dy * 11 - dx * ey, 1.5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(x + dx * 11 + dy * ex, y + dy * 11 + dx * ey, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      });
    };

    const render = () => { drawBoard(); drawFood(); drawSnake(); };

    const gameOver = () => {
      isDead = true; isStarted = false; clearTimeout(timer);
      if (score > highScore) { highScore = score; localStorage.setItem(STORAGE_KEY, String(highScore)); }
      updateScoreText(); showOverlay('GAME OVER', 'Press Space or click to play again', 'TRY AGAIN');
    };

    const tick = () => {
      if (!isStarted || isDead || isPaused) return;
      if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) { applyCanvasSize(); render(); }
      direction = queuedDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      const { cols, rows } = gridSize();
      const outOfBounds = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
      const selfHit = snake.slice(0, -1).some((s) => s.x === head.x && s.y === head.y);
      if (outOfBounds || selfHit) { gameOver(); return; }
      snake.unshift(head);
      let ate = false;
      for (let i = foods.length - 1; i >= 0; i -= 1) {
        const f = foods[i];
        if (f.x === head.x && f.y === head.y) { foods.splice(i, 1); score += 1; ate = true; }
      }
      if (ate) while (foods.length < clampAppleCount()) spawnFood();
      else snake.pop();
      updateScoreText(); render();
      timer = setTimeout(tick, Number(speedSelect.value));
    };

    const startGame = () => {
      clearTimeout(timer); applyCanvasSize(); score = 0; isDead = false; isPaused = false; isStarted = true; foods = [];
      initializeSnake();
      while (foods.length < clampAppleCount()) spawnFood();
      updateScoreText(); hideOverlay(); render(); tick();
    };

    const setDirection = (next) => {
      if (!isStarted || isDead || isPaused) return;
      const opposite = next.x === -direction.x && next.y === -direction.y;
      if (!opposite) queuedDirection = next;
    };

    const togglePause = () => {
      if (!isStarted || isDead) return;
      isPaused = !isPaused;
      if (isPaused) { clearTimeout(timer); showOverlay('PAUSED', 'Press P to continue', 'RESUME'); }
      else { hideOverlay(); tick(); }
    };

    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === ' ' || key === 'Spacebar') { if (!isStarted || isDead) { e.preventDefault(); startGame(); } return; }
      if (key.toLowerCase() === 'p') {
        e.preventDefault();
        if (!isStarted || isDead) return;
        if (isPaused) { isPaused = false; hideOverlay(); tick(); }
        else togglePause();
        return;
      }
      if (key === 'ArrowUp') setDirection({ x: 0, y: -1 });
      else if (key === 'ArrowDown') setDirection({ x: 0, y: 1 });
      else if (key === 'ArrowLeft') setDirection({ x: -1, y: 0 });
      else if (key === 'ArrowRight') setDirection({ x: 1, y: 0 });
    });

    startBtn.onclick = () => {
      if (!isStarted || isDead) { startGame(); return; }
      if (isPaused) { isPaused = false; hideOverlay(); tick(); }
    };

    appleInput.addEventListener('change', () => {
      const want = clampAppleCount();
      if (isStarted && !isDead) {
        while (foods.length < want) spawnFood();
        if (foods.length > want) foods = foods.slice(0, want);
        render();
      }
    });
    speedSelect.addEventListener('change', () => { if (isStarted && !isDead && !isPaused) { clearTimeout(timer); tick(); } });
    const resizeObserver = new ResizeObserver(() => { applyCanvasSize(); render(); });
    resizeObserver.observe(container);

    updateScoreText(); applyCanvasSize(); initializeSnake(); render();
    showOverlay('SNAKE', 'Arrow keys to move • Press Space to start', 'START');
  }

  const flash = (text) => {
    const f = document.createElement('div');
    f.className = 'cc-flash';
    f.textContent = text;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  };

  const beep = (freq = 440, len = 0.08, type = 'sine', vol = 0.02) => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = beep.ctx || (beep.ctx = new Ctx());
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + len);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + len);
    } catch {}
  };

  const screenShake = (intensity = 7) => {
    root.animate([
      { transform: 'translate(0px, 0px)' },
      { transform: `translate(${intensity}px, ${-intensity}px)` },
      { transform: `translate(${-intensity}px, ${intensity}px)` },
      { transform: 'translate(0px, 0px)' }
    ], { duration: 220, iterations: 1 });
  };

  const spawnClickFloat = (x, y, value) => {
    const f = document.createElement('div');
    f.className = 'cc-click-float';
    f.textContent = `+${fmt(value)}`;
    f.style.left = `${x}px`;
    f.style.top = `${y}px`;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 920);
  };

  const spawnCookieBurst = (x, y, scale = 1) => {
    const count = Math.min(35, Math.max(8, Math.floor(8 * scale)));
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement('div');
      p.className = 'cc-cookie-pop';
      p.textContent = '🍪';
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const dist = 22 + Math.random() * 38;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      p.style.setProperty('--rot', `${-25 + Math.random() * 50}deg`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 740);
    }
  };

  const spawnCandyCanes = (count = 12) => {
    for (let i = 0; i < count; i += 1) {
      const candy = document.createElement('div');
      candy.className = 'cc-candy-cane';
      candy.textContent = Math.random() < 0.85 ? '🦯' : '🍬';
      const startX = -20 + Math.random() * (window.innerWidth + 40);
      const driftX = startX + (-70 + Math.random() * 140);
      const duration = 1200 + Math.random() * 1200;
      candy.style.left = `${startX}px`;
      candy.style.top = `-24px`;
      candy.style.setProperty('--sx', '0px');
      candy.style.setProperty('--ex', `${driftX - startX}px`);
      candy.style.setProperty('--rot', `${-110 + Math.random() * 220}deg`);
      candy.style.animationDuration = `${duration}ms`;
      document.body.appendChild(candy);
      setTimeout(() => candy.remove(), duration + 80);
    }
  };

  const spawnLightning = (x, y, intensity = 1) => {
    const bolt = document.createElement('div');
    bolt.className = 'cc-lightning';
    bolt.style.left = `${x}px`;
    bolt.style.top = `${Math.max(0, y - 120)}px`;
    bolt.style.height = `${90 + Math.random() * 120 * intensity}px`;
    bolt.style.transform = `translate(-50%, 0) rotate(${-16 + Math.random() * 32}deg)`;
    document.body.appendChild(bolt);

    const ring = document.createElement('div');
    ring.className = 'cc-storm-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    document.body.appendChild(ring);

    setTimeout(() => bolt.remove(), 260);
    setTimeout(() => ring.remove(), 430);
  };

  const news = [
    'Grandmas are baking with suspicious efficiency.',
    'A cookie a day keeps the apocalypse away.',
    'Breaking: local cookie prices surge.',
    'Scientists confirm: cookies make time travel easier.',
    'The news ticker loves your bakery.',
    'A golden cookie might appear any second...',
    'Milk quality rises with achievements!'
  ];
  function rotateNews() {
    els.news.textContent = news[Math.floor(Math.random() * news.length)];
  }

  function checkAchievements() {
    achievementDefs.forEach((a) => {
      if (!state.achievements.includes(a.id) && a.check()) {
        state.achievements.push(a.id);
        addLog(`Achievement unlocked: ${a.name}`);
        flash(`🏆 ${a.name}`);
      }
    });
  }

  function renderLog() {
    els.log.innerHTML = policy.createHTML(state.log.length
      ? state.log.map((entry) => `<div class="cc-log-entry">${entry}</div>`).join('')
      : '<div class="cc-log-entry">No activity yet. Click the cookie to begin.</div>');
  }

  function renderStats() {
    els.cookieCount.textContent = `${fmt(state.cookies)} cookies`;
    const cpsNow = activeCps();
    const cycle = dayNightState();
    state.highestCpsEver = Math.max(state.highestCpsEver, cpsNow);
    els.cps.textContent = `per second: ${fmtFloat(cpsNow, 1)}`;
    els.playtime.textContent = `Time played: ${formatDuration(state.totalPlaySeconds)} • ${cycle.label}`;
    root.classList.toggle('cc-night', !cycle.isDay);
    const gain = prestigeGain();
    const need = prestigeNeedForNext();
    const clickSpeed = recentClicksPerSecond();
    els.hotkeyNote.textContent = `Toggle UI: ${state.toggleKey.toUpperCase()} | Admin: ${state.adminKey.toUpperCase()} | Wipe: ${HARD_RESET_KEY} | Milk: ${milkPercent()}% | Lumps: ${fmt(state.sugarLumps)} | Season: ${seasonState().label}`;
    els.prestigeStat.innerHTML = policy.createHTML(
      `Prestige chips: <b>${fmt(state.prestigeChips)}</b> (+${(prestigeMult() * 100 - 100).toFixed(0)}% CpS)<br>` +
      `Ascend reward now: <b>${fmt(gain)}</b> chip(s) (Potential: ${fmt(prestigePotential())})<br>` +
      `Need <b>${fmt(need)}</b> more total cookies for next prestige chip.<br>` +
      `Clicks: <b>${fmt(state.totalClicks)}</b> | Golden clicks: <b>${fmt(state.goldenClicks)}</b> / spawns: <b>${fmt(state.goldenSpawns)}</b> / missed: <b>${fmt(state.goldenMisses)}</b> | Achievements: <b>${state.achievements.length}/${achievementDefs.length}</b><br>` +
      `Golden spawn boost: <b>x${goldenSpawnBoost().toFixed(2)}</b> | Golden power: <b>x${goldenEffectBoost().toFixed(2)}</b> | Event rate: <b>x${eventTickRateMult().toFixed(2)}</b><br>` +
      `Hand-made: <b>${fmt(state.handMadeCookies)}</b> | Highest bank: <b>${fmt(state.highestCookies)}</b><br>` +
      `Highest CpS: <b>${fmtFloat(state.highestCpsEver, 1)}</b> | Click speed: <b>${clickSpeed.toFixed(1)}/s</b> | Time played: <b>${formatDuration(state.totalPlaySeconds)}</b> | Cycle: <b>${cycle.label}</b><br>` +
      `Sugar lumps: <b>${fmt(state.sugarLumps)}</b> | Season: <b>${seasonState().label}</b>`
    );

    const buffs = [];
    if (state.frenzyTimer > 0) buffs.push(`Frenzy ${Math.ceil(state.frenzyTimer)}s`);
    if (state.clickFrenzyTimer > 0) buffs.push(`Click Frenzy ${Math.ceil(state.clickFrenzyTimer)}s`);
    if (state.elderFrenzyTimer > 0) buffs.push(`Elder Frenzy ${Math.ceil(state.elderFrenzyTimer)}s`);
    if (state.clotTimer > 0) buffs.push(`Clot ${Math.ceil(state.clotTimer)}s`);
    if (state.cookieStormTimer > 0) buffs.push(`Cookie Storm ${Math.ceil(state.cookieStormTimer)}s`);
    if (state.buildingSpecialTimer > 0) buffs.push(`Building Special ${Math.ceil(state.buildingSpecialTimer)}s`);
    if (state.dragonHarvestTimer > 0) buffs.push(`Dragon Harvest ${Math.ceil(state.dragonHarvestTimer)}s`);
    if (state.cursedFingerTimer > 0) buffs.push(`Cursed Finger ${Math.ceil(state.cursedFingerTimer)}s`);
    els.buffs.textContent = buffs.join(' | ');

    [els.buy1, els.buy10, els.buy100, els.buyMax].forEach((b) => b.classList.remove('active'));
    if (state.buyAmount === 1) els.buy1.classList.add('active');
    if (state.buyAmount === 10) els.buy10.classList.add('active');
    if (state.buyAmount === 100) els.buy100.classList.add('active');
    if (state.buyAmount === 'max') els.buyMax.classList.add('active');
    els.modeBuy.classList.toggle('active', state.buyMode === 'buy');
    els.modeSell.classList.toggle('active', state.buyMode === 'sell');

    if (state.tutorialStep === 0) {
      els.news.textContent = 'Tip: Click the cookie to start your bakery!';
    }
  }

  let activeTabSince = Date.now();
  let listPointerActive = false;
  let logDirty = true;
  let lastPassiveListRender = 0;
  let lastPassiveSceneRender = 0;
  let lastPassiveStatsRender = 0;
  let lastAchievementCheck = 0;

  window.addEventListener('pointerdown', () => { listPointerActive = true; }, true);
  window.addEventListener('pointerup', () => { listPointerActive = false; renderList(); }, true);
  window.addEventListener('pointercancel', () => { listPointerActive = false; renderList(); }, true);

  function bindPress(el, handler) {
    let swallowedClick = false;
    el.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      swallowedClick = true;
      handler(event);
    });
    el.addEventListener('click', (event) => {
      if (swallowedClick) {
        swallowedClick = false;
        return;
      }
      handler(event);
    });
    el.addEventListener('pointercancel', () => {
      swallowedClick = false;
    });
  }

  function setTab(tab) {
    const now = Date.now();
    if (state.activeTab && state.tabTime[state.activeTab] !== undefined) {
      state.tabTime[state.activeTab] += Math.max(0, (now - activeTabSince) / 1000);
    }
    activeTabSince = now;
    state.activeTab = tab;
    [els.tabShop, els.tabUpgrades, els.tabPrestige, els.tabAchievements, els.tabStats].forEach((t) => t.classList.remove('active'));
    if (tab === 'shop') els.tabShop.classList.add('active');
    if (tab === 'upgrades') els.tabUpgrades.classList.add('active');
    if (tab === 'prestige') els.tabPrestige.classList.add('active');
    if (tab === 'achievements') els.tabAchievements.classList.add('active');
    if (tab === 'stats') els.tabStats.classList.add('active');
    renderList();
  }

  function getBulkPrice(baseCost, amount, owned) {
    let total = 0;
    for (let i = 0; i < amount; i += 1) total += Math.ceil(baseCost * (effectiveCostGrowth(owned + i) ** (owned + i)));
    return total;
  }

  function getMaxAffordableCount(baseCost, owned, cookies) {
    if (cookies < Math.ceil(baseCost * (effectiveCostGrowth(owned) ** owned))) return 0;
    let low = 0;
    let high = 1;
    while (getBulkPrice(baseCost, high, owned) <= cookies && high < 100000) high *= 2;
    while (low < high) {
      const mid = Math.floor((low + high + 1) / 2);
      if (getBulkPrice(baseCost, mid, owned) <= cookies) low = mid;
      else high = mid - 1;
    }
    return low;
  }

  function getSellRefund(baseCost, amount, owned) {
    let total = 0;
    for (let i = 0; i < amount; i += 1) {
      const tier = owned - 1 - i;
      if (tier < 0) break;
      total += Math.floor((Math.ceil(baseCost * (effectiveCostGrowth(tier) ** tier))) * 0.5);
    }
    return total;
  }

  function canUnlockUpgrade(u) {
    if (u.hidden && typeof u.hiddenReq === 'function' && !u.hiddenReq()) return false;
    if (!u.req) return true;
    if (u.req.type === 'building') {
      const b = state.buildings.find((x) => x.name === u.req.name);
      return b && b.owned >= u.req.count;
    }
    if (u.req.type === 'total') return state.totalCookiesBaked >= u.req.count;
    if (u.req.type === 'achievements') return state.achievements.length >= u.req.count;
    if (u.req.type === 'clicks') return state.totalClicks >= u.req.count;
    if (u.req.type === 'season') return state.season === u.req.season;
    return false;
  }

  function renderShop() {
    els.list.innerHTML = '';
    state.buildings.forEach((b) => {
      if (b.locked) {
        const lockRow = document.createElement('div');
        lockRow.className = 'cc-log-entry';
        lockRow.textContent = `${b.name} is locked. Unlock via prestige tree.`;
        els.list.appendChild(lockRow);
        return;
      }
      const amount = state.buyAmount;
      const maxBuy = amount === 'max' ? getMaxAffordableCount(b.baseCost, b.owned, state.cookies) : amount;
      const maxSell = amount === 'max' ? b.owned : Math.min(amount, b.owned);
      const tradeCount = state.buyMode === 'buy' ? maxBuy : maxSell;
      const price = state.buyMode === 'buy' ? getBulkPrice(b.baseCost, tradeCount, b.owned) : getSellRefund(b.baseCost, tradeCount, b.owned);
      const affordable = state.buyMode === 'buy' ? tradeCount > 0 : maxSell > 0;
      const btn = document.createElement('button');
      btn.className = `cc-card ${affordable ? 'can-buy' : ''}`;
      btn.innerHTML = policy.createHTML(`<b><span class="cc-img3d">${buildingIcon(b.name)}</span> ${b.name}</b> (${b.owned})<br>${state.buyMode === 'buy' ? `Buy ${tradeCount} — Cost: ${fmt(price)} | +${fmtFloat(b.cps * tradeCount, 1)}/s` : `Sell ${tradeCount} — Gain: ${fmt(price)} | -${fmtFloat(b.cps * tradeCount, 1)}/s`}`);
      bindPress(btn, () => {
        if (state.buyMode === 'buy') {
          if (tradeCount <= 0 || state.cookies < price) return;
          state.cookies -= price;
          b.owned += tradeCount;
          addLog(`You bought ${tradeCount} ${b.name}${tradeCount > 1 ? 's' : ''}.`);
          beep(420, 0.06, 'triangle', 0.03);
        } else {
          if (tradeCount <= 0) return;
          state.cookies += price;
          b.owned -= tradeCount;
          addLog(`You sold ${tradeCount} ${b.name}${tradeCount > 1 ? 's' : ''}.`);
          beep(250, 0.05, 'sawtooth', 0.02);
        }
        b.cost = Math.ceil(b.baseCost * (effectiveCostGrowth(b.owned) ** b.owned));
        checkAchievements();
        markDirty();
        saveNow();
        renderAll();
      });
      els.list.appendChild(btn);
    });
  }

  function reqText(req) {
    if (!req) return 'Unlocked';
    if (req.type === 'building') return `Needs ${req.count} ${req.name}${req.count > 1 ? 's' : ''}`;
    if (req.type === 'total') return `Needs ${fmt(req.count)} lifetime cookies`;
    if (req.type === 'achievements') return `Needs ${req.count} achievements`;
    if (req.type === 'clicks') return `Needs ${fmt(req.count)} clicks`;
    if (req.type === 'season') return `Only available during ${req.season} season`;
    return 'Locked';
  }

  function upgradeCategory(u) {
    if (u.milkMult) return { label: 'Kitten', icon: '🐱' };
    if (u.clickMult) return { label: 'Click', icon: '🖱️' };
    if (u.req?.type === 'season') return { label: 'Season', icon: '🌓' };
    return { label: 'Production', icon: '⚙️' };
  }

  function buildingIcon(name) {
    const defaultMap = {
      Cursor: '🖱️', Grandma: '👵', Farm: '🌾', Mine: '⛏️', Factory: '🏭', Bank: '🏦', Temple: '⛩️',
      'Wizard Tower': '🧙', Shipment: '🚀', 'Alchemy Lab': '⚗️', Portal: '🌀', 'Time Machine': '⏳', 'Antimatter Condenser': '⚛️',
      'Prism Forge': '💎', Chancemaker: '🎲', 'Fractal Engine': '🧩', 'Javascript Console': '💻', Idleverse: '🌌',
      'Singularity Oven': '🕳️', 'Reality Bakery': '🪐', 'Chrono Reactor': '🧿', 'Nebula Foundry': '🌠'
    };
    const seasonalMap = {
      harvest: { Farm: '🎃', Grandma: '🧓', Factory: '🍂', 'Reality Bakery': '🌰' },
      eclipse: { Cursor: '🌒', 'Wizard Tower': '🔮', Portal: '🕳️', 'Singularity Oven': '🌑' },
      bloom: { Farm: '🌸', Grandma: '🌷', Temple: '🪷', 'Prism Forge': '🌺' },
      aurora: { Shipment: '🛸', 'Time Machine': '🌌', Idleverse: '✨', 'Nebula Foundry': '🌈' }
    };
    return seasonalMap[state.season]?.[name] || defaultMap[name] || '🍪';
  }

  function renderProductionScene() {
    const kitchenMoodByGrandma = (grandmaCount) => {
      if (grandmaCount <= 0) return '<div class="cc-scene-title" style="font-size:12px;color:#b8a180">Kitchen is quiet... no grandmas baking yet.</div>';
      if (grandmaCount < 10) return '<div class="cc-scene-title" style="font-size:12px;color:#d8bf97">👵🍪 A cozy kitchen is baking fresh cookies.</div>';
      if (grandmaCount < 50) return '<div class="cc-scene-title" style="font-size:12px;color:#e3c89c">👵👵🍪🍪 Grandmas are running a busy bakery kitchen.</div>';
      return '<div class="cc-scene-title" style="font-size:12px;color:#f0d5ab">👵👵👵🍪🔥 Grandma mega-kitchen is in full production!</div>';
    };

    const row = (title, icon, count, maxDraw = 18, emptyText = 'none yet') => {
      const shown = Math.min(count, maxDraw);
      const workers = Array.from({ length: shown }, () => `<span class="cc-worker cc-img3d">${icon}</span>`).join('');
      const extra = count > maxDraw ? ` <span style="font-size:12px;color:#d9be96">+${count - maxDraw} more</span>` : '';
      return `<div class="cc-scene-title">${title}: <b>${count}</b>${extra}</div><div class="cc-scene-row">${workers || `<span style="font-size:12px;color:#9f8d73">${emptyText}</span>`}</div>`;
    };

    const lines = [];
    state.buildings.forEach((building) => {
      const count = building.owned || 0;
      const icon = buildingIcon(building.name);
      const maxDraw = building.name === 'Antimatter Condenser' ? 10 : building.name === 'Time Machine' ? 12 : 16;
      const label = `${building.name}${building.name.endsWith('s') ? '' : 's'} running`;
      lines.push(row(label, icon, count, maxDraw));
      if (building.name === 'Grandma') lines.push(kitchenMoodByGrandma(count));
    });

    els.scene.innerHTML = policy.createHTML(lines.join(''));
  }


  function renderUpgrades() {
    els.list.innerHTML = '';
    let count = 0;
    state.upgrades.forEach((u) => {
      if (!u.bought && canUnlockUpgrade(u)) {
        count += 1;
        const canBuy = state.cookies >= u.cost;
        const btn = document.createElement('button');
        btn.className = `cc-card ${canBuy ? 'can-buy' : ''}`;
        if (!canBuy) btn.style.filter = 'saturate(0.75) brightness(0.9)';
        const effects = [];
        if (u.mult) effects.push(`x${u.mult} global CpS`);
        if (u.clickMult) effects.push(`x${u.clickMult} click power`);
        if (u.milkMult) effects.push(`x${u.milkMult} milk bonus`);
        const cat = upgradeCategory(u);
        btn.innerHTML = policy.createHTML(`<b><span class="cc-img3d">${cat.icon}</span> ${u.name}</b> <span style="color:#c6d6ff">[${cat.label}]</span><br>Cost: ${fmt(u.cost)} | ${effects.join(' + ')}<br><small style="color:#d9c39f">${reqText(u.req)}</small>`);
        bindPress(btn, () => {
          if (!canBuy) return;
          state.cookies -= u.cost;
          u.bought = true;
          if (u.mult) state.multiplier *= u.mult;
          if (u.unlockBy === 'futureTech') {
            state.buildings.forEach((b) => {
              if (b.unlockBy === 'futureTech') b.locked = false;
            });
          }
          addLog(`You purchased upgrade: ${u.name}.`);
          flash(`${u.name} bought!`);
          beep(660, 0.09, 'square', 0.03);
          markDirty();
          saveNow();
          renderAll();
        });
        els.list.appendChild(btn);
      }
    });
    if (!count) {
      const d = document.createElement('div');
      d.className = 'cc-log-entry';
      d.textContent = 'No upgrades available yet. Buy more buildings or bake more cookies.';
      els.list.appendChild(d);
    }
  }

  function renderPrestigePanel() {
    const gain = prestigeGain();
    const need = prestigeNeedForNext();
    els.list.innerHTML = policy.createHTML('');
    const card = document.createElement('div');
    card.className = 'cc-log-entry';
    card.style.fontSize = '15px';
    card.style.lineHeight = '1.45';
    card.innerHTML = policy.createHTML(`Total baked: <b>${fmt(state.totalCookiesBaked)}</b><br>Current chips: <b>${fmt(state.prestigeChips)}</b><br>Potential chips: <b>${fmt(prestigePotential())}</b><br>Ascend reward now: <b>${fmt(gain)}</b><br>Need <b>${fmt(need)}</b> for next chip.`);

    const btn = document.createElement('button');
    btn.className = 'cc-card';
    btn.style.marginTop = '10px';
    btn.textContent = gain > 0 ? `Ascend now (+${fmt(gain)} chips)` : 'Bake more cookies to ascend';
    if (gain > 0) btn.classList.add('can-buy');
    bindPress(btn, () => {
      if (gain <= 0) return;
      if (!confirm(`Ascend for ${gain} NEW prestige chips? This resets current run progress.`)) return;
      state.prestigeChips += gain;
      state.cookies = 0;
      state.multiplier = 1;
      state.frenzyTimer = 0;
      state.clickFrenzyTimer = 0;
      state.elderFrenzyTimer = 0;
      state.clotTimer = 0;
      state.totalClicks = 0;
      state.goldenClicks = 0;
      state.buyAmount = 1;
      state.buyMode = 'buy';
      state.cookieStormTimer = 0;
      state.handMadeCookies = 0;
      state.highestCookies = 0;
      state.sugarLumps = 0;
      state.sugarLumpTimer = 0;
      state.season = 'none';
      state.seasonTimer = 0;
      state.buildings.forEach((b) => { b.owned = 0; b.cost = b.baseCost; });
      state.upgrades.forEach((u) => { u.bought = false; });
      state.achievements = [];
      addLog(`You ascended and gained ${gain} prestige chip(s).`);
      flash(`Ascended +${gain}`);
      setTab('shop');
      markDirty();
      saveNow();
      renderAll();
    });

    const treeDefs = [
      { id: 'clickLegacy', name: 'Legacy Fingers', max: 8, base: 3, desc: '+25% permanent click power/level' },
      { id: 'goldenLegacy', name: 'Golden Beacon', max: 6, base: 5, desc: '+15% golden spawn rate/level' },
      { id: 'offlineLegacy', name: 'Idle Relics', max: 5, base: 4, desc: '+20% offline production/level' },
      { id: 'cpsLegacy', name: 'Heavenly Machines', max: 8, base: 6, desc: '+8% permanent CpS/level' },
      { id: 'fortuneLegacy', name: 'Fortune Prism', max: 8, base: 8, desc: '+10% golden effect strength/level' },
      { id: 'stormLegacy', name: 'Storm Vault', max: 6, base: 7, desc: '+12% storm cookie payout/level' },
      { id: 'eventLegacy', name: 'Chaos Clockwork', max: 6, base: 6, desc: '+10% random event frequency/level' },
      { id: 'syncLegacy', name: 'Celestial Sync', max: 5, base: 10, desc: '+5% to CpS + click power/level' },
      { id: 'cosmicLegacy', name: 'Cosmic Dynasty', max: 6, base: 20, desc: '+12% permanent CpS/level (endgame)' },
      { id: 'celestialLuckLegacy', name: 'Celestial Fortune', max: 6, base: 18, desc: '+8% golden spawn + power/level (endgame)' },
      { id: 'stormEngineLegacy', name: 'Tempest Engine', max: 5, base: 16, desc: '+20% storm payout +10% spawn chance/level' },
      { id: 'sugarLegacy', name: 'Sugar Dynasty', max: 8, base: 12, desc: 'Boost sugar lump CpS bonus scaling/level' },
      { id: 'seasonLegacy', name: 'Seasonal Atlas', max: 8, base: 14, desc: 'Amplifies seasonal multipliers/level' },
      { id: 'heavenlyLuckLegacy', name: 'Heavenly Luck', max: 6, base: 24, desc: '+4% permanent CpS and better events/level' }
    ];
    const treeWrap = document.createElement('div');
    treeDefs.forEach((node) => {
      const level = state.prestigeUpgrades[node.id] || 0;
      const cost = Math.ceil(node.base * (1.9 ** level));
      const nodeBtn = document.createElement('button');
      nodeBtn.className = `cc-card ${state.prestigeChips >= cost && level < node.max ? 'can-buy' : ''}`;
      nodeBtn.innerHTML = policy.createHTML(`<b>${node.name}</b> Lv.${level}/${node.max}<br>${node.desc}<br>Cost: ${fmt(cost)} chips`);
      bindPress(nodeBtn, () => {
        if (level >= node.max || state.prestigeChips < cost) return;
        state.prestigeChips -= cost;
        state.prestigeUpgrades[node.id] += 1;
        addLog(`Prestige upgrade purchased: ${node.name} Lv.${state.prestigeUpgrades[node.id]}.`);
        beep(520, 0.08, 'triangle', 0.03);
        markDirty();
        saveNow();
        renderAll();
      });
      treeWrap.appendChild(nodeBtn);
    });

    const unlockCost = 120;
    const unlockBtn = document.createElement('button');
    unlockBtn.className = `cc-card ${!state.prestigeUpgrades.unlockFutureTech && state.prestigeChips >= unlockCost ? 'can-buy' : ''}`;
    unlockBtn.innerHTML = policy.createHTML(`<b>Future Tech Permit</b><br>Unlock Chrono Reactor + Nebula Foundry.<br>Cost: ${fmt(unlockCost)} chips`);
    bindPress(unlockBtn, () => {
      if (state.prestigeUpgrades.unlockFutureTech || state.prestigeChips < unlockCost) return;
      state.prestigeChips -= unlockCost;
      state.prestigeUpgrades.unlockFutureTech = true;
      state.buildings.forEach((b) => {
        if (b.unlockBy === 'futureTech') b.locked = false;
      });
      addLog('Future Tech unlocked: late-game buildings available.');
      flash('Future Tech unlocked!');
      screenShake(5);
      markDirty();
      saveNow();
      renderAll();
    });

    els.list.append(card, btn, treeWrap, unlockBtn);
  }


  function renderAchievementsPanel() {
    els.list.innerHTML = policy.createHTML('');
    achievementDefs.forEach((a) => {
      const unlocked = state.achievements.includes(a.id);
      const row = document.createElement('div');
      row.className = 'cc-log-entry';
      row.style.background = unlocked ? '#36513a' : '#222';
      row.style.padding = '8px';
      row.style.marginBottom = '6px';
      row.innerHTML = policy.createHTML(`<b>${unlocked ? '🏆' : '🔒'} ${a.name}</b><br>${a.desc}`);
      els.list.appendChild(row);
    });
  }

  function renderStatsPanel() {
    const totalOwned = state.buildings.reduce((n, b) => n + b.owned, 0);
    const topBuilding = [...state.buildings].sort((a, b) => b.owned - a.owned)[0];
    const avgClick = state.totalClicks > 0 ? state.totalManualClicksValue / state.totalClicks : 0;
    const expected = Math.max(1, state.totalPlaySeconds * Math.max(1, state.highestCpsEver));
    const efficiency = Math.min(100, (state.totalCookiesBaked / expected) * 100);
    const bestByOutput = [...state.buildings]
      .sort((a, b) => (b.owned * b.cps * buildingMultiplier(b.name)) - (a.owned * a.cps * buildingMultiplier(a.name)))[0];
    els.list.innerHTML = policy.createHTML('');
    const card = document.createElement('div');
    card.className = 'cc-log-entry';
    card.style.fontSize = '15px';
    card.style.lineHeight = '1.5';
    card.innerHTML = policy.createHTML(
      `<b>Bakery stats</b><br>` +
      `Cookies in bank: <b>${fmt(state.cookies)}</b><br>` +
      `Total baked (lifetime): <b>${fmt(state.totalCookiesBaked)}</b><br>` +
      `Hand-made cookies: <b>${fmt(state.handMadeCookies)}</b><br>` +
      `Current CpS: <b>${fmtFloat(activeCps(), 1)}</b><br>` +
      `Highest CpS reached: <b>${fmtFloat(state.highestCpsEver, 1)}</b><br>` +
      `Average cookies per click: <b>${fmtFloat(avgClick, 1)}</b><br>` +
      `Play efficiency: <b>${efficiency.toFixed(2)}%</b><br>` +
      `Buildings owned: <b>${fmt(totalOwned)}</b><br>` +
      `Most-owned building: <b>${topBuilding?.name || 'None'}</b><br>` +
      `Best performing building: <b>${bestByOutput?.name || 'None'}</b><br>` +
      `Golden cookies clicked: <b>${fmt(state.goldenClicks)}</b><br>` +
      `Golden cookies missed: <b>${fmt(state.goldenMisses)}</b><br>` +
      `Time in tabs (s): shop <b>${Math.floor(state.tabTime.shop)}</b>, upgrades <b>${Math.floor(state.tabTime.upgrades)}</b>, prestige <b>${Math.floor(state.tabTime.prestige)}</b>, achievements <b>${Math.floor(state.tabTime.achievements)}</b>, stats <b>${Math.floor(state.tabTime.stats)}</b><br>` +
      `Time played: <b>${formatDuration(state.totalPlaySeconds)}</b> | Cycle: <b>${dayNightState().label}</b><br>` +
      `Sugar lumps: <b>${fmt(state.sugarLumps)}</b> | Season: <b>${seasonState().label}</b> | Season time left: <b>${Math.ceil(state.seasonTimer)}s</b>`
    );
    els.list.appendChild(card);
  }

  function renderList() {
    if (state.activeTab === 'shop') renderShop();
    if (state.activeTab === 'upgrades') renderUpgrades();
    if (state.activeTab === 'prestige') renderPrestigePanel();
    if (state.activeTab === 'achievements') renderAchievementsPanel();
    if (state.activeTab === 'stats') renderStatsPanel();
  }

  function renderAll() {
    checkAchievements();
    renderStats();
    renderProductionScene();
    if (!listPointerActive) renderList();
    if (logDirty) {
      renderLog();
      logDirty = false;
    }
  }

  function triggerRandomEvent() {
    if (state.eventCooldown > 0) return;
    const roll = Math.random();
    if (roll < 0.10 && state.season !== 'none') {
      const bonus = Math.max(1, Math.floor(baseCps() * (10 + state.prestigeUpgrades.heavenlyLuckLegacy * 2)));
      state.cookies += bonus;
      state.totalCookiesBaked += bonus;
      state.sugarLumps += 1;
      flash(`${state.season.toUpperCase()} surge!`);
      addLog(`${seasonState().label} surge awarded ${fmt(bonus)} cookies and 1 sugar lump.`);
      spawnCandyCanes(10);
    } else if (roll < 0.14) {
      state.cookieStormTimer = Math.max(state.cookieStormTimer, 14);
      flash('Event: Cookie Storm!');
      spawnCandyCanes(16);
      addLog('Event triggered: Cookie Storm.');
    } else if (roll < 0.22) {
      const unlocked = state.buildings.filter((b) => !b.locked && b.owned > 0);
      if (unlocked.length) {
        state.currentBuildingSpecial = unlocked[Math.floor(Math.random() * unlocked.length)].name;
        state.buildingRushTimer = 20;
        flash(`Event: ${state.currentBuildingSpecial} Rush!`);
        addLog(`Event triggered: Building Rush for ${state.currentBuildingSpecial}.`);
      }
    } else if (roll < 0.28) {
      state.sugarRushTimer = 18;
      flash('Event: Sugar Rush x4!');
      spawnCandyCanes(12);
      addLog('Event triggered: Sugar Rush.');
    } else if (roll < 0.33) {
      state.wrathModeTimer = 26;
      flash('Event: Wrath Mode!');
      spawnLightning(window.innerWidth * (0.2 + Math.random() * 0.6), 140, 1.1);
      addLog('Event triggered: Wrath Mode.');
    }
    state.eventCooldown = Math.max(6, (18 + Math.random() * 24) / eventTickRateMult());
  }

  function spawnStormCookie() {
    if (!document.body.contains(root)) return;
    const c = document.createElement('div');
    c.className = 'cc-golden';
    c.style.width = '42px';
    c.style.height = '42px';
    c.style.fontSize = '18px';
    c.textContent = '🍪';
    c.style.left = `${8 + Math.random() * 86}%`;
    c.style.top = `${8 + Math.random() * 84}%`;
    root.appendChild(c);
    const rect = c.getBoundingClientRect();
    spawnLightning(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.8);
    c.onclick = (e) => {
      e.preventDefault();
      const bonus = Math.max(1, Math.floor(activeCps() * 4 * stormPayoutMult()));
      state.cookies += bonus;
      state.totalCookiesBaked += bonus;
      spawnClickFloat(e.clientX, e.clientY, bonus);
      c.remove();
      markDirty();
      renderAll();
    };
    setTimeout(() => c.remove(), 3500);
  }

  function spawnGoldenCookie() {
    if (!document.body.contains(root)) return;
    if (document.querySelectorAll(`.${'cc-golden'}`).length >= 2) {
      setTimeout(spawnGoldenCookie, goldenSpawnDelay());
      return;
    }

    const gc = document.createElement('div');
    gc.className = 'cc-golden';
    const wrathChance = Math.min(0.35, 0.14 + (state.buildings.find((b) => b.name === 'Grandma')?.owned || 0) * 0.0016);
    const rareArcane = Math.random() < 0.01;
    const wrath = Math.random() < wrathChance;
    if (wrath) gc.classList.add('cc-wrath');
    gc.textContent = rareArcane ? '🌟' : wrath ? '😈' : '🍪';
    gc.style.left = `${8 + Math.random() * 84}%`;
    gc.style.top = `${8 + Math.random() * 80}%`;
    root.appendChild(gc);
    state.goldenSpawns += 1;

    const absorbGoldenClick = (e) => {
      if (!e) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    };

    let collected = false;

    const onCollect = () => {
      if (collected || !gc.isConnected) return;
      collected = true;
      state.goldenClicks += 1;
      const r = Math.random();
      const power = goldenEffectBoost();
      beep(980, 0.08, 'triangle', 0.04);
      if (rareArcane) {
        const bonus = Math.floor(Math.max(1, activeCps() * 333));
        state.cookies += bonus;
        state.totalCookiesBaked += bonus;
        state.frenzyTimer = 77;
        state.clickFrenzyTimer = 13;
        addLog(`Arcane cookie! Massive reward: +${fmt(bonus)} and frenzy stack.`);
        flash('Arcane Blessing!');
        screenShake(10);
      } else if (wrath && r < 0.20) {
        const loss = Math.floor(state.cookies * 0.2);
        state.cookies = Math.max(0, state.cookies - loss);
        state.clotTimer = 90;
        addLog(`Wrath cookie! Cursed: lost ${fmt(loss)} cookies.`);
        flash('Cursed!');
      } else if (wrath && r < 0.32) {
        state.elderFrenzyTimer = 6;
        addLog('Wrath cookie! Elder Frenzy started (x666 production).');
        flash('Elder Frenzy!');
      } else if (wrath && r < 0.46) {
        state.cursedFingerTimer = 10;
        addLog('Wrath cookie! Cursed Finger started (clicking replaces CpS).');
        flash('Cursed Finger!');
      } else if (r < 0.18) {
        const gain = Math.min((state.cookies * 0.05 + 13) * power, baseCps() * 240 * power + 13);
        state.cookies += gain;
        state.totalCookiesBaked += gain;
        addLog(`Golden cookie! Lucky gave ${fmt(gain)} cookies.`);
        flash(`Lucky! +${fmt(gain)}`);
      } else if (r < 0.33) {
        const chain = Math.max(7, Math.floor((Math.log10(Math.max(1, state.cookies)) + 1) * 40 * power));
        state.cookies += chain;
        state.totalCookiesBaked += chain;
        addLog(`Golden cookie! Cookie Chain gave ${fmt(chain)} cookies.`);
        flash(`Chain +${fmt(chain)}`);
      } else if (r < 0.49) {
        state.frenzyTimer = 77;
        addLog('Golden cookie! Frenzy started (x7 production).');
        flash('Frenzy x7!');
      } else if (r < 0.63) {
        state.clickFrenzyTimer = 13;
        addLog('Golden cookie! Click Frenzy started (x777 click power).');
        flash('Click Frenzy!');
      } else if (r < 0.73) {
        state.buildingSpecialTimer = 32;
        const unlocked = state.buildings.filter((b) => !b.locked && b.owned > 0);
        const target = unlocked.length ? unlocked[Math.floor(Math.random() * unlocked.length)] : null;
        state.currentBuildingSpecial = target?.name || '';
        addLog(`Golden cookie! Building Special activated (${state.currentBuildingSpecial || 'all'} boosted).`);
        flash('Building Special!');
      } else if (r < 0.83) {
        state.cookieStormTimer = 12;
        addLog('Golden cookie! Cookie Storm started.');
        spawnCandyCanes(18);
        flash('Cookie Storm!');
      } else if (r < 0.92) {
        state.dragonHarvestTimer = 40;
        addLog('Golden cookie! Dragon Harvest started (x15 production).');
        spawnCandyCanes(10);
        flash('Dragon Harvest!');
      } else if (r < 0.97) {
        const bonus = Math.floor(Math.max(1, activeCps() * 95 * power));
        state.cookies += bonus;
        state.totalCookiesBaked += bonus;
        addLog(`Golden cookie! Sweet gave ${fmt(bonus)} cookies.`);
        flash(`Sweet! +${fmt(bonus)}`);
      } else {
        const loss = Math.floor(state.cookies * 0.14);
        state.cookies = Math.max(0, state.cookies - loss);
        state.clotTimer = 66;
        addLog(`Golden cookie backfired: Ruin! Lost ${fmt(loss)} cookies and got Clot.`);
        flash('Ruin + Clot');
      }
      clearTimeout(expireId);
      gc.remove();
      spawnCookieBurst(window.innerWidth * 0.5, window.innerHeight * 0.35, 2.5);
      markDirty();
      renderAll();
    };

    gc.onpointerdown = absorbGoldenClick;
    gc.onmousedown = absorbGoldenClick;
    gc.onclick = (e) => {
      absorbGoldenClick(e);
      onCollect();
    };

    const expireId = setTimeout(() => {
      if (gc.isConnected) {
        state.goldenMisses += 1;
        gc.remove();
        markDirty();
      }
    }, 13000);

    if (Math.random() < Math.min(0.22, 0.08 * goldenSpawnBoost())) {
      setTimeout(spawnGoldenCookie, 7000 + Math.random() * 9000);
    }
    setTimeout(spawnGoldenCookie, goldenSpawnDelay());
  }

  els.cookieBtn.onclick = (e) => {
    trackRecentClick();
    let click = Math.max(1, state.multiplier * prestigeMult() * clickMult() * milkMult() * permanentClickMult() * CLICK_DIFFICULTY_MULT * seasonalClickMult() * (1 + state.prestigeUpgrades.heavenlyLuckLegacy * 0.03));
    if (state.cursedFingerTimer > 0) click = Math.max(1, activeCps() * 15);
    if (state.clickFrenzyTimer > 0) click *= 777;
    state.cookies += click;
    state.totalCookiesBaked += click;
    state.handMadeCookies += click;
    state.totalManualClicksValue += click;
    state.totalClicks += 1;
    if (state.tutorialStep === 0) {
      state.tutorialStep = 1;
      addLog('Tutorial: Great! Buy a Cursor to automate production.');
    }
    state.highestCookies = Math.max(state.highestCookies, state.cookies);
    beep(330 + Math.random() * 60, 0.03, 'sine', 0.02);
    if (click > Math.max(5000, activeCps() * 3)) screenShake(5);
    spawnClickFloat(e.clientX, e.clientY, click);
    spawnCookieBurst(e.clientX, e.clientY, Math.max(1, Math.min(4, Math.log10(click + 10))));
    markDirty();
    renderAll();
  };

  bindPress(els.tabShop, () => { stopTdMode(); setTab('shop'); });
  bindPress(els.tabUpgrades, () => { stopTdMode(); setTab('upgrades'); });
  bindPress(els.tabPrestige, () => { stopTdMode(); setTab('prestige'); });
  bindPress(els.tabAchievements, () => { stopTdMode(); setTab('achievements'); });
  bindPress(els.tabStats, () => { stopTdMode(); setTab('stats'); });

  bindPress(els.buy1, () => { state.buyAmount = 1; renderAll(); });
  bindPress(els.buy10, () => { state.buyAmount = 10; renderAll(); });
  bindPress(els.buy100, () => { state.buyAmount = 100; renderAll(); });
  bindPress(els.buyMax, () => { state.buyAmount = 'max'; renderAll(); });
  bindPress(els.modeBuy, () => { state.buyMode = 'buy'; renderAll(); });
  bindPress(els.modeSell, () => { state.buyMode = 'sell'; renderAll(); });

  function hardResetNow() {
    localStorage.removeItem(SAVE_KEY);
    root.querySelectorAll('.cc-golden').forEach((item) => item.remove());
    state.cookies = 0;
    state.totalCookiesBaked = 0;
    state.totalClicks = 0;
    state.handMadeCookies = 0;
    state.goldenClicks = 0;
    state.goldenSpawns = 0;
    state.goldenMisses = 0;
    state.multiplier = 1;
    state.prestigeChips = 0;
    state.frenzyTimer = 0;
    state.clickFrenzyTimer = 0;
    state.elderFrenzyTimer = 0;
    state.clotTimer = 0;
    state.cookieStormTimer = 0;
    state.buildingSpecialTimer = 0;
    state.dragonHarvestTimer = 0;
    state.cursedFingerTimer = 0;
    state.toggleKey = 'h';
    state.adminKey = 'g';
    state.isHidden = false;
    state.activeTab = 'shop';
    state.buyAmount = 1;
    state.buyMode = 'buy';
    state.log = [];
    state.achievements = [];
    state.highestCookies = 0;
    state.totalPlaySeconds = 0;
    state.buildings.forEach((b) => { b.owned = 0; b.cost = b.baseCost; });
    state.upgrades.forEach((u) => { u.bought = false; });
    adminUnlocked = false;
    setTab('shop');
    markDirty();
    saveNow();
    renderAll();
  }

  function toggleVisibility() {
    state.isHidden = !state.isHidden;
    root.style.display = state.isHidden ? 'none' : 'block';
    addLog(`UI ${state.isHidden ? 'hidden' : 'shown'} via keybind (${state.toggleKey.toUpperCase()}).`);
    saveNow();
  }

  const onKeydown = (e) => {
    if (!e.key) return;
    const key = e.key.toLowerCase();
    if (key === HARD_RESET_KEY) {
      e.preventDefault();
      hardResetNow();
      return;
    }
    if (key === state.adminKey) {
      e.preventDefault();
      openAdminPanel();
      return;
    }
    if (key === state.toggleKey) {
      e.preventDefault();
      toggleVisibility();
      return;
    }
    if (flappy.active && (key === ' ' || key === 'arrowup' || key === 'w')) {
      e.preventDefault();
      flapBird();
      return;
    }
    if (snakeMid.active) {
      const snakeGame = snakeMid.state?.game;
      if (!snakeGame) return;
      if (key === ' ' || key === 'spacebar') {
        e.preventDefault();
        if (!snakeGame.started || snakeGame.dead) snakeMid.state.startSnake();
        return;
      }
      if (key === 'p') {
        e.preventDefault();
        if (!snakeGame.started || snakeGame.dead) return;
        snakeGame.paused = !snakeGame.paused;
        if (snakeGame.paused) {
          clearTimeout(snakeMid.timer);
          snakeMid.state.showBlock('PAUSED', 'Press P to continue', 'RESUME');
        } else {
          snakeMid.state.hideBlock();
          snakeMid.state.tickSnake();
        }
        return;
      }
      const nextDir = key === 'arrowup' ? { x: 0, y: -1 }
        : key === 'arrowdown' ? { x: 0, y: 1 }
          : key === 'arrowleft' ? { x: -1, y: 0 }
            : key === 'arrowright' ? { x: 1, y: 0 }
              : null;
      if (nextDir) {
        e.preventDefault();
        if (!snakeGame.started || snakeGame.dead || snakeGame.paused) return;
        const opposite = nextDir.x === -snakeGame.direction.x && nextDir.y === -snakeGame.direction.y;
        if (!opposite) snakeGame.queued = nextDir;
      }
    }
  };
  document.addEventListener('keydown', onKeydown);

  let adminUnlocked = false;
  const getAdminCode = () => {
    const layerOne = ['TkRZ', 'eU5UZzU='].map((piece) => atob(piece)).join('');
    return atob(layerOne);
  };

  function adminNumberPrompt(label, current = 0) {
    const raw = prompt(label, String(current));
    if (raw === null) return null;
    const value = Number(raw);
    if (!Number.isFinite(value)) return null;
    return value;
  }

  function applyTabMaskSelection(value) {
    if (value === 'off') {
      state.tabMaskTitle = 'Cookie Clicker';
      state.tabMaskFavicon = '';
      document.title = state.tabMaskTitle;
      addLog('Tab mask set to default title.');
      markDirty();
      saveNow();
      renderAll();
      return;
    }

    const preset = TAB_MASK_PRESETS[value];
    if (!preset) {
      alert('Unknown tab mask option.');
      return;
    }
    state.tabMaskTitle = preset.title;
    state.tabMaskFavicon = preset.favicon;
    setTabMask(state.tabMaskTitle, state.tabMaskFavicon);
    addLog(`Tab mask set to ${preset.label}.`);
    markDirty();
    saveNow();
    renderAll();
  }

  function syncTabMaskSelectValue() {
    const presetKey = Object.entries(TAB_MASK_PRESETS).find(([, preset]) => {
      return preset.title === state.tabMaskTitle && preset.favicon === state.tabMaskFavicon;
    })?.[0] || 'off';
    els.tabmask.value = presetKey;
  }

  function initTabMaskSelect() {
    const tabMaskEmoji = {
      classroom: '🏫',
      docs: '📄',
      drive: '📁',
      ixl: '🧮',
      quizlet: '🧠',
      khan: '🎓',
      canvas: '🖼️',
      schoology: '📚'
    };
    const presets = Object.entries(TAB_MASK_PRESETS)
      .map(([key, preset]) => `<option value="${key}">${tabMaskEmoji[key] || '🕶️'} ${preset.label}</option>`)
      .join('');
    els.tabmask.innerHTML = policy.createHTML(`${presets}<option value="off">🍪 Off</option>`);
    syncTabMaskSelectValue();
  }

  function promptAdminCodeMasked() {
    return new Promise((resolve) => {
      const authOverlay = document.createElement('div');
      authOverlay.className = 'cc-admin-auth-overlay';

      const modal = document.createElement('div');
      modal.className = 'cc-admin-auth';

      const title = document.createElement('div');
      title.className = 'cc-admin-auth-title';
      title.textContent = 'Admin code';

      const input = document.createElement('input');
      input.type = 'password';
      input.placeholder = 'Enter admin code';
      input.autocomplete = 'off';

      const row = document.createElement('div');
      row.className = 'cc-admin-auth-row';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';

      const okBtn = document.createElement('button');
      okBtn.textContent = 'Unlock';

      const finish = (value) => {
        if (authOverlay.isConnected) authOverlay.remove();
        resolve(value);
      };

      cancelBtn.onclick = () => finish(null);
      okBtn.onclick = () => finish(input.value);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          finish(input.value);
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          finish(null);
        }
      });
      authOverlay.onclick = (event) => {
        if (event.target === authOverlay) finish(null);
      };

      row.append(cancelBtn, okBtn);
      modal.append(title, input, row);
      authOverlay.appendChild(modal);
      root.appendChild(authOverlay);
      input.focus();
    });
  }

  function setAdminDropdownOpen(isOpen) {
    els.admin.classList.toggle('open', Boolean(isOpen));
  }

  async function openAdminPanel() {
    const existingOverlay = root.querySelector('.cc-admin-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
      setAdminDropdownOpen(false);
      return;
    }

    if (!adminUnlocked) {
      const pass = await promptAdminCodeMasked();
      if (pass === null) return;
      if (pass.trim() !== getAdminCode()) {
        alert('Wrong code.');
        return;
      }
      adminUnlocked = true;
      addLog('Admin panel unlocked.');
    }

    const overlay = document.createElement('div');
    overlay.className = 'cc-admin-overlay cc-admin-overlay-lite';
    const panel = document.createElement('div');
    panel.className = 'cc-admin-panel cc-admin-dropdown';
    setAdminDropdownOpen(true);

    const adminRect = els.admin.getBoundingClientRect();
    const panelWidth = Math.min(720, Math.floor(window.innerWidth * 0.92));
    const left = Math.min(window.innerWidth - panelWidth - 10, Math.max(10, adminRect.left + adminRect.width - panelWidth));
    const top = Math.min(window.innerHeight - 20, adminRect.bottom + 8);
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;

    const title = document.createElement('div');
    title.className = 'cc-admin-title';
    title.textContent = 'Admin Command Console';

    const subtitle = document.createElement('div');
    subtitle.className = 'cc-admin-subtitle';
    subtitle.textContent = 'Grouped controls for economy, progression, events, and emergency actions.';

    const sections = document.createElement('div');
    sections.className = 'cc-admin-sections';

    const makeSection = (label, openByDefault = false) => {
      const section = document.createElement('div');
      section.className = `cc-admin-section ${openByDefault ? 'open' : ''}`;
      const heading = document.createElement('div');
      heading.className = 'cc-admin-section-title';
      heading.textContent = label;
      const grid = document.createElement('div');
      grid.className = 'cc-admin-grid';
      heading.onclick = () => {
        section.classList.toggle('open');
      };
      section.append(heading, grid);
      sections.appendChild(section);
      return grid;
    };

    const economyGrid = makeSection('Economy', true);
    const progressGrid = makeSection('Progression');
    const eventGrid = makeSection('Event Control');
    const utilityGrid = makeSection('Cleanup & Utility');

    const addBtn = (grid, text, handler) => {
      const b = document.createElement('button');
      b.textContent = text;
      b.onclick = handler;
      grid.appendChild(b);
    };

    const forceEvent = (type) => {
      if (type === 'cookieStorm') {
        state.cookieStormTimer = Math.max(state.cookieStormTimer, 16);
        flash('Admin Event: Cookie Storm!');
        spawnCandyCanes(16);
        addLog('Admin: triggered Cookie Storm.');
        return;
      }
      if (type === 'buildingRush') {
        const unlocked = state.buildings.filter((b) => !b.locked && b.owned > 0);
        const target = unlocked.length ? unlocked[Math.floor(Math.random() * unlocked.length)] : state.buildings.find((b) => !b.locked);
        state.currentBuildingSpecial = target?.name || 'Cursor';
        state.buildingRushTimer = Math.max(state.buildingRushTimer, 24);
        flash(`Admin Event: ${state.currentBuildingSpecial} Rush!`);
        addLog(`Admin: triggered ${state.currentBuildingSpecial} Rush.`);
        return;
      }
      if (type === 'sugarRush') {
        state.sugarRushTimer = Math.max(state.sugarRushTimer, 22);
        flash('Admin Event: Sugar Rush x4!');
        spawnCandyCanes(12);
        addLog('Admin: triggered Sugar Rush.');
        return;
      }
      if (type === 'wrathMode') {
        state.wrathModeTimer = Math.max(state.wrathModeTimer, 30);
        flash('Admin Event: Wrath Mode!');
        spawnLightning(window.innerWidth * (0.2 + Math.random() * 0.6), 140, 1.1);
        addLog('Admin: triggered Wrath Mode.');
      }
    };

    addBtn(economyGrid, 'Set Cookies', () => {
      const n = adminNumberPrompt('Set cookies to:', state.cookies);
      if (n === null) return;
      state.cookies = Math.max(0, n);
      state.highestCookies = Math.max(state.highestCookies, state.cookies);
      addLog(`Admin: set cookies to ${fmt(state.cookies)}.`);
      renderAll();
    });
    addBtn(economyGrid, 'Add Cookies', () => {
      const n = adminNumberPrompt('Add cookies:', 1000000);
      if (n === null) return;
      state.cookies += n;
      state.totalCookiesBaked += Math.max(0, n);
      state.highestCookies = Math.max(state.highestCookies, state.cookies);
      addLog(`Admin: added ${fmt(n)} cookies.`);
      renderAll();
    });
    addBtn(economyGrid, 'Trigger Big Cookie Click', () => {
      let click = Math.max(1, state.multiplier * prestigeMult() * clickMult() * milkMult() * permanentClickMult() * CLICK_DIFFICULTY_MULT * seasonalClickMult() * (1 + state.prestigeUpgrades.heavenlyLuckLegacy * 0.03));
      if (state.cursedFingerTimer > 0) click = Math.max(1, activeCps() * 15);
      if (state.clickFrenzyTimer > 0) click *= 777;
      const boosted = click * 25;
      state.cookies += boosted;
      state.totalCookiesBaked += boosted;
      state.handMadeCookies += boosted;
      state.totalManualClicksValue += boosted;
      state.totalClicks += 25;
      addLog(`Admin: triggered mega cookie click for ${fmt(boosted)} cookies.`);
      flash(`Mega click! +${fmt(boosted)}`);
      renderAll();
    });
    addBtn(economyGrid, 'Spawn Storm Cookies x10', () => {
      for (let i = 0; i < 10; i += 1) {
        setTimeout(() => spawnStormCookie(), i * 120);
      }
      flash('Admin: Storm cookies deployed!');
      addLog('Admin: spawned 10 storm cookies.');
      renderAll();
    });

    addBtn(progressGrid, 'Set Prestige Chips', () => {
      const n = adminNumberPrompt('Set prestige chips to:', state.prestigeChips);
      if (n === null) return;
      state.prestigeChips = Math.max(0, Math.floor(n));
      addLog(`Admin: prestige chips set to ${fmt(state.prestigeChips)}.`);
      renderAll();
    });
    addBtn(progressGrid, 'Give All Buildings', () => {
      const n = adminNumberPrompt('Set each building to owned count:', 100);
      if (n === null) return;
      const owned = Math.max(0, Math.floor(n));
      state.buildings.forEach((b) => {
        b.owned = owned;
        b.cost = Math.ceil(b.baseCost * (effectiveCostGrowth(b.owned) ** b.owned));
      });
      addLog(`Admin: set all buildings to ${owned}.`);
      renderAll();
    });
    addBtn(progressGrid, 'Unlock All Upgrades', () => {
      state.upgrades.forEach((u) => {
        if (!u.bought) {
          u.bought = true;
          if (u.mult) state.multiplier *= u.mult;
        }
      });
      addLog('Admin: unlocked all upgrades.');
      renderAll();
    });
    addBtn(progressGrid, 'Unlock All Achievements', () => {
      state.achievements = achievementDefs.map((a) => a.id);
      addLog('Admin: unlocked all achievements.');
      renderAll();
    });

    addBtn(eventGrid, 'Trigger Random Event', () => {
      const previous = state.eventCooldown;
      state.eventCooldown = 0;
      triggerRandomEvent();
      state.eventCooldown = Math.min(state.eventCooldown, 6);
      if (previous <= 0) state.eventCooldown = Math.max(state.eventCooldown, 6);
      addLog('Admin: forced random event roll.');
      renderAll();
    });
    addBtn(eventGrid, 'Trigger Frenzy Stack', () => {
      state.frenzyTimer = 77;
      state.clickFrenzyTimer = 13;
      state.buildingSpecialTimer = 40;
      state.dragonHarvestTimer = 40;
      addLog('Admin: frenzy stack enabled.');
      renderAll();
    });
    addBtn(eventGrid, 'Trigger Cookie Storm', () => {
      forceEvent('cookieStorm');
      renderAll();
    });
    addBtn(eventGrid, 'Trigger Building Rush', () => {
      forceEvent('buildingRush');
      renderAll();
    });
    addBtn(eventGrid, 'Trigger Sugar Rush', () => {
      forceEvent('sugarRush');
      renderAll();
    });
    addBtn(eventGrid, 'Trigger Wrath Mode', () => {
      forceEvent('wrathMode');
      renderAll();
    });
    addBtn(eventGrid, 'Spawn Golden Cookie', () => {
      spawnGoldenCookie();
      flash('Admin: Golden cookie spawned!');
      addLog('Admin: spawned a golden cookie.');
      renderAll();
    });

    addBtn(utilityGrid, 'Clear Debuffs', () => {
      state.clotTimer = 0;
      state.cursedFingerTimer = 0;
      state.elderFrenzyTimer = 0;
      addLog('Admin: debuffs cleared.');
      renderAll();
    });
    addBtn(utilityGrid, 'Close Panel', () => { overlay.remove(); setAdminDropdownOpen(false); });

    const note = document.createElement('div');
    note.className = 'cc-admin-note';
    note.textContent = 'Tip: event controls stack with active buffs. Use with caution in saved runs.';

    panel.append(title, subtitle, sections, note);
    overlay.appendChild(panel);
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        overlay.remove();
        setAdminDropdownOpen(false);
      }
    };
    root.appendChild(overlay);
  }

  els.admin.onclick = () => openAdminPanel();
  const closeGamesMenu = () => {
    els.gamesMenu.classList.remove('open');
  };
  els.gamesBtn.onclick = (e) => {
    e.stopPropagation();
    els.gamesMenu.classList.toggle('open');
  };
  els.gamesMenu.onclick = (e) => e.stopPropagation();
  els.gameFlappy.onclick = () => {
    if (snakeMid.active) stopSnakeMode();
    if (flappy.active) stopFlappyMode();
    else startFlappyMode();
    closeGamesMenu();
  };
  els.gameSnake.onclick = () => {
    if (flappy.active) stopFlappyMode();
    if (snakeMid.active) stopSnakeMode();
    else startSnakeMode();
    closeGamesMenu();
  };
  els.gameTd.onclick = () => {
    if (flappy.active) stopFlappyMode();
    if (snakeMid.active) stopSnakeMode();
    if (tdMid.active) stopTdMode();
    else launchTdGame();
    closeGamesMenu();
  };
  if (els.gameBlock) {
    els.gameBlock.onclick = () => {
      if (flappy.active) stopFlappyMode();
      if (snakeMid.active) stopSnakeMode();
      launchBlockBlastGame();
      closeGamesMenu();
    };
  }

  const onDocClick = () => closeGamesMenu();
  document.addEventListener('click', onDocClick);

  els.keybind.onclick = () => {
    const input = prompt('Type a single key to toggle hide/show:', state.toggleKey);
    if (!input) return;
    const key = input.trim().toLowerCase();
    if (key.length !== 1) {
      alert('Please enter exactly one character key.');
      return;
    }
    state.toggleKey = key;
    addLog(`Toggle key changed to ${state.toggleKey.toUpperCase()}.`);
    markDirty();
    saveNow();
    renderAll();
  };

  els.tabmask.onchange = () => applyTabMaskSelection(els.tabmask.value);

  function cleanupAndRemove() {
    stopFlappyMode();
    stopSnakeMode();
    stopTdMode();
    document.removeEventListener('click', onDocClick);
    document.removeEventListener('keydown', onKeydown);
    clearInterval(tickId);
    clearInterval(autosaveId);
    root.remove();
    style.remove();
  }

  els.close.onclick = () => cleanupAndRemove();
  els.reset.onclick = () => {
    if (!confirm('This will wipe all saved progress. Continue?')) return;
    localStorage.removeItem(SAVE_KEY);
    cleanupAndRemove();
  };

  const tickId = setInterval(() => {
    if (!document.body.contains(root)) {
      clearInterval(tickId);
      return;
    }
    const gain = activeCps() / 10;
    const stormBonus = state.cookieStormTimer > 0 ? Math.max(1, baseCps() * 0.14) / 10 : 0;
    state.cookies += gain + stormBonus;
    state.totalCookiesBaked += gain + stormBonus;
    state.totalPlaySeconds += 0.1;
    state.sugarLumpTimer += 0.1;
    state.seasonTimer = Math.max(0, state.seasonTimer - 0.1);
    if (state.sugarLumpTimer >= Math.max(35, 900 - state.prestigeUpgrades.sugarLegacy * 90)) {
      state.sugarLumpTimer = 0;
      const gainLumps = 1 + (Math.random() < (0.16 + state.prestigeUpgrades.heavenlyLuckLegacy * 0.025) ? 1 : 0);
      state.sugarLumps += gainLumps;
      addLog(`You harvested ${gainLumps} sugar lump${gainLumps > 1 ? 's' : ''}.`);
    }
    if (state.seasonTimer <= 0) {
      const roll = Math.random();
      state.season = roll < 0.24 ? 'harvest' : roll < 0.48 ? 'eclipse' : roll < 0.72 ? 'bloom' : roll < 0.96 ? 'aurora' : 'none';
      state.seasonTimer = Math.max(55, (260 + Math.random() * 320) / (1 + state.prestigeUpgrades.eventLegacy * 0.07));
      addLog(`Season changed: ${seasonState().label}.`);
      flash(seasonState().label);
    }
    if (state.frenzyTimer > 0) state.frenzyTimer = Math.max(0, state.frenzyTimer - 0.1);
    if (state.clickFrenzyTimer > 0) state.clickFrenzyTimer = Math.max(0, state.clickFrenzyTimer - 0.1);
    if (state.elderFrenzyTimer > 0) state.elderFrenzyTimer = Math.max(0, state.elderFrenzyTimer - 0.1);
    if (state.clotTimer > 0) state.clotTimer = Math.max(0, state.clotTimer - 0.1);
    if (state.cookieStormTimer > 0) state.cookieStormTimer = Math.max(0, state.cookieStormTimer - 0.1);
    if (state.cookieStormTimer > 0 && Math.random() < (0.055 * (1 + state.prestigeUpgrades.stormEngineLegacy * 0.1))) spawnStormCookie();
    if (state.buildingSpecialTimer > 0) state.buildingSpecialTimer = Math.max(0, state.buildingSpecialTimer - 0.1);
    if (state.dragonHarvestTimer > 0) state.dragonHarvestTimer = Math.max(0, state.dragonHarvestTimer - 0.1);
    if (state.cursedFingerTimer > 0) state.cursedFingerTimer = Math.max(0, state.cursedFingerTimer - 0.1);
    if (state.buildingRushTimer > 0) state.buildingRushTimer = Math.max(0, state.buildingRushTimer - 0.1);
    if (state.sugarRushTimer > 0) state.sugarRushTimer = Math.max(0, state.sugarRushTimer - 0.1);
    if (state.wrathModeTimer > 0) state.wrathModeTimer = Math.max(0, state.wrathModeTimer - 0.1);
    if (state.eventCooldown > 0) state.eventCooldown = Math.max(0, state.eventCooldown - (0.1 * eventTickRateMult()));
    if (state.hintCooldown > 0) state.hintCooldown = Math.max(0, state.hintCooldown - 0.1);
    triggerRandomEvent();
    if (state.hintCooldown <= 0) {
      const cursorOwned = state.buildings.find((b) => b.name === 'Cursor')?.owned || 0;
      if (state.tutorialStep <= 1 && cursorOwned < 1 && state.totalCookiesBaked > 50) {
        addLog('Tip: Buy a Cursor to keep earning while idle.');
        state.hintCooldown = 35;
      } else if (state.goldenClicks === 0 && state.totalCookiesBaked > 5000) {
        addLog('Tip: Watch for golden cookies. They are huge boosts.');
        state.hintCooldown = 55;
      }
    }
    state.highestCookies = Math.max(state.highestCookies, state.cookies);
    markDirty();

    const now = Date.now();
    const gameOverlayActive = flappy.active || snakeMid.active || tdMid.active;

    if (now - lastAchievementCheck >= 400) {
      checkAchievements();
      lastAchievementCheck = now;
    }

    const statsInterval = gameOverlayActive ? 500 : 220;
    if (now - lastPassiveStatsRender >= statsInterval) {
      renderStats();
      lastPassiveStatsRender = now;
    }

    if (logDirty && now - lastPassiveListRender >= 250) {
      renderLog();
      logDirty = false;
    }

    if (!gameOverlayActive && !listPointerActive) {
      const passiveListInterval = (state.activeTab === 'shop' || state.activeTab === 'upgrades') ? 1500 : 900;
      if (now - lastPassiveListRender >= passiveListInterval) {
        renderList();
        lastPassiveListRender = now;
      }
      if (state.activeTab === 'shop' && now - lastPassiveSceneRender >= 1600) {
        renderProductionScene();
        lastPassiveSceneRender = now;
      }
    }
  }, 100);

  const autosaveId = setInterval(() => {
    if (dirtySinceSave) saveNow();
  }, 7000);

  applyGreatReset();
  load();
  initTabMaskSelect();
  setTabMask(state.tabMaskTitle, state.tabMaskFavicon);
  syncTabMaskSelectValue();
  if (!state.log.length) addLog('Game started. Welcome, baker!');
  if (state.isHidden) {
    state.isHidden = false;
    addLog('UI was hidden in save and has been auto-restored.');
  }
  setTab(state.activeTab || 'shop');
  root.style.display = state.isHidden ? 'none' : 'block';
  renderAll();
  rotateNews();
  setInterval(rotateNews, 9000);
  setTimeout(spawnGoldenCookie, goldenSpawnDelay());
})();

function launchTdGame() {
  const tdMid = window.__cc_tdMid;
  const syncGameFocus = window.__cc_syncGameFocus;
  const stopTdMode = window.__cc_stopTdMode;
  if (!tdMid || !syncGameFocus || !stopTdMode) return;

  const encoded = 'KCgpID0+IHsKICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1jb25zb2xlLXJvb3QnKTsKICBpZiAoZXhpc3RpbmcpIGV4aXN0aW5nLnJlbW92ZSgpOwoKICBjb25zdCByb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgcm9vdC5pZCA9ICd0ZC1jb25zb2xlLXJvb3QnOwogIE9iamVjdC5hc3NpZ24ocm9vdC5zdHlsZSwgewogICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAnMCcsIHpJbmRleDogJzIxNDc0ODM2NDcnLCBiYWNrZ3JvdW5kOiAnIzBmMWIyZCcsIHBvaW50ZXJFdmVudHM6ICdhdXRvJywKICB9KTsKICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpOwoKICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsKICBPYmplY3QuYXNzaWduKGNhbnZhcy5zdHlsZSwgewogICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAnMCcsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBkaXNwbGF5OiAnYmxvY2snLCBjdXJzb3I6ICdjcm9zc2hhaXInLAogIH0pOwogIHJvb3QuYXBwZW5kQ2hpbGQoY2FudmFzKTsKICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsKCiAgY29uc3QgaGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGhpbnQudGV4dENvbnRlbnQgPSAnTWVyZ2VkIENvbnNvbGUgVEQg4oCUIFNIT1AvVVBHUkFERVMvUFJPL0FHRU5UUyB8IEVTQyBxdWl0JzsKICBPYmplY3QuYXNzaWduKGhpbnQuc3R5bGUsIHsKICAgIHBvc2l0aW9uOiAnZml4ZWQnLCB0b3A6ICcxMHB4JywgbGVmdDogJzEwcHgnLCBjb2xvcjogJyNmZmYnLCBmb250OiAnNjAwIDEycHggc3lzdGVtLXVpLHNhbnMtc2VyaWYnLAogICAgYmFja2dyb3VuZDogJyMwMDA5JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzZweCAxMHB4JywgcG9pbnRlckV2ZW50czogJ25vbmUnLAogIH0pOwogIHJvb3QuYXBwZW5kQ2hpbGQoaGludCk7CgogIC8vIEFETUlOIFBBTkVMIChwYXNzd29yZCBwcm90ZWN0ZWQpCiAgY29uc3QgQURNSU5fUEFTU1dPUkQgPSAnMjU4OSc7CiAgbGV0IGFkbWluVW5sb2NrZWQgPSBmYWxzZTsKICBsZXQgc2hvd0FkbWluUGFuZWwgPSBmYWxzZTsKICBsZXQgc2hvd0FkbWluTG9naW4gPSBmYWxzZTsKCiAgY29uc3QgYWRtaW5QYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIE9iamVjdC5hc3NpZ24oYWRtaW5QYW5lbC5zdHlsZSwgewogICAgcG9zaXRpb246ICdmaXhlZCcsIHRvcDogJzYwcHgnLCByaWdodDogJzM1MHB4Jywgd2lkdGg6ICczMjBweCcsIGJhY2tncm91bmQ6ICcjMGQxYjJhJywKICAgIGJvcmRlcjogJzJweCBzb2xpZCAjZmZkMTY2JywgYm9yZGVyUmFkaXVzOiAnMTBweCcsIHBhZGRpbmc6ICcxNHB4JywgekluZGV4OiAnMjE0NzQ4MzY0OCcsCiAgICBjb2xvcjogJyNmZmYnLCBmb250RmFtaWx5OiAnc3lzdGVtLXVpLHNhbnMtc2VyaWYnLCBmb250U2l6ZTogJzEzcHgnLCBkaXNwbGF5OiAnbm9uZScsIGJveFNoYWRvdzogJzAgNHB4IDMycHggIzAwMGEnLAogIH0pOwogIHJvb3QuYXBwZW5kQ2hpbGQoYWRtaW5QYW5lbCk7CgogIGNvbnN0IGFkbWluTG9naW5Cb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBPYmplY3QuYXNzaWduKGFkbWluTG9naW5Cb3guc3R5bGUsIHsKICAgIHBvc2l0aW9uOiAnZml4ZWQnLCB0b3A6ICc1MCUnLCBsZWZ0OiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsLTUwJSknLCB3aWR0aDogJzM0MHB4JywKICAgIGJhY2tncm91bmQ6ICcjMGQxYjJhJywgYm9yZGVyOiAnMnB4IHNvbGlkICNmZmQxNjYnLCBib3JkZXJSYWRpdXM6ICcxMnB4JywgcGFkZGluZzogJzIwcHgnLAogICAgekluZGV4OiAnMjE0NzQ4MzY0OScsIGNvbG9yOiAnI2ZmZicsIGZvbnRGYW1pbHk6ICdzeXN0ZW0tdWksc2Fucy1zZXJpZicsIHRleHRBbGlnbjogJ2NlbnRlcicsIGRpc3BsYXk6ICdub25lJywKICB9KTsKICBhZG1pbkxvZ2luQm94LmlubmVySFRNTCA9IGAKICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToyMHB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tYm90dG9tOjhweDsiPvCflJIgQWRtaW4gQWNjZXNzPC9kaXY+CiAgICA8aW5wdXQgaWQ9InRkLWFkbWluLXB3IiB0eXBlPSJwYXNzd29yZCIgbWF4bGVuZ3RoPSIyMCIgcGxhY2Vob2xkZXI9IlBhc3N3b3JkIgogICAgICBzdHlsZT0id2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZzoxMHB4IDE0cHg7Zm9udC1zaXplOjE2cHg7Ym9yZGVyLXJhZGl1czo2cHg7Ym9yZGVyOjFweCBzb2xpZCAjZmZkMTY2O2JhY2tncm91bmQ6IzFhMmE0NDtjb2xvcjojZmZmO291dGxpbmU6bm9uZTttYXJnaW46MTBweCAwOyIgLz4KICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6MTBweDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyI+CiAgICAgIDxidXR0b24gaWQ9InRkLWFkbWluLXN1Ym1pdCIgc3R5bGU9InBhZGRpbmc6OXB4IDI4cHg7YmFja2dyb3VuZDojZmZkMTY2O2NvbG9yOiMxMTE7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NnB4O2N1cnNvcjpwb2ludGVyOyI+VW5sb2NrPC9idXR0b24+CiAgICAgIDxidXR0b24gaWQ9InRkLWFkbWluLWNhbmNlbCIgc3R5bGU9InBhZGRpbmc6OXB4IDI4cHg7YmFja2dyb3VuZDojM2E1MDZiO2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NnB4O2N1cnNvcjpwb2ludGVyOyI+Q2FuY2VsPC9idXR0b24+CiAgICA8L2Rpdj4KICAgIDxkaXYgaWQ9InRkLWFkbWluLWVyciIgc3R5bGU9Im1hcmdpbi10b3A6OHB4O2NvbG9yOiNmZjU5NWU7bWluLWhlaWdodDoxNnB4OyI+PC9kaXY+CiAgYDsKICByb290LmFwcGVuZENoaWxkKGFkbWluTG9naW5Cb3gpOwoKICBjb25zdCBTSURFX1BBTkVMID0gMzMwOwogIGNvbnN0IFRJQ0tfTVMgPSAxMDAwIC8gNjA7CiAgY29uc3QgTUFYX1dBVkVTID0gNDU7CiAgY29uc3QgSE9NRV9DRU5URVJfWF9PRkZTRVQgPSA0MjsKCiAgbGV0IHdpZHRoID0gMCwgaGVpZ2h0ID0gMDsKICBsZXQgZ2FtZU92ZXIgPSBmYWxzZSwgcnVuV29uID0gZmFsc2U7CiAgbGV0IHdhdmVJblByb2dyZXNzID0gZmFsc2UsIHNwYXduVGltZXIgPSAwLCB3YXZlUXVldWUgPSBbXTsKICBsZXQgc2hvcFNjcm9sbCA9IDAsIHdoZWVsQWNjdW1TaG9wID0gMCwgd2hlZWxBY2N1bU1hcCA9IDA7CiAgbGV0IG1hcFNjcm9sbCA9IDA7CiAgbGV0IGF1dG9OZXh0V2F2ZSA9IGZhbHNlLCBnYW1lU3BlZWQgPSAxOwogIGxldCBjdXJyZW50U2NyZWVuID0gJ2hvbWUnOwogIGxldCBzY2VuZXJ5QnlNYXAgPSBbXTsKCiAgY29uc3QgZGlmZmljdWx0eURlZnMgPSB7CiAgICBlYXN5OiB7IG5hbWU6ICdFYXN5Jywgc3RhcnRDYXNoOiA5MDAsIGxpdmVzOiAxNTAsIGJsb29uSHA6IDAuOSwgYmxvb25TcGVlZDogMC45MiwgY2FzaE11bHQ6IDEuMTIsIGNvaW5NdWx0OiAxLjAgfSwKICAgIG1lZGl1bTogeyBuYW1lOiAnTWVkaXVtJywgc3RhcnRDYXNoOiA3MDAsIGxpdmVzOiAxMDAsIGJsb29uSHA6IDEuMCwgYmxvb25TcGVlZDogMS4wLCBjYXNoTXVsdDogMS4wLCBjb2luTXVsdDogMS4zNSB9LAogICAgaGFyZDogeyBuYW1lOiAnSGFyZCcsIHN0YXJ0Q2FzaDogNTQwLCBsaXZlczogNzAsIGJsb29uSHA6IDEuMjUsIGJsb29uU3BlZWQ6IDEuMTIsIGNhc2hNdWx0OiAwLjksIGNvaW5NdWx0OiAxLjggfSwKICAgIGltcG9wcGFibGU6IHsgbmFtZTogJ0ltcG9wcGFibGUnLCBzdGFydENhc2g6IDQ1MCwgbGl2ZXM6IDEsIGJsb29uSHA6IDEuNDUsIGJsb29uU3BlZWQ6IDEuMiwgY2FzaE11bHQ6IDAuODIsIGNvaW5NdWx0OiAyLjIgfSwKICB9OwoKICBjb25zdCBwcm9ncmVzc2lvbiA9IHsKICAgIHhwOiAwLCBsZXZlbDogMSwgcG9pbnRzOiAwLCBhdHRhY2tTcGVlZExldmVsOiAwLCBzdGFydGluZ0Nhc2hMZXZlbDogMCwKICB9OwoKICBjb25zdCBwcm9maWxlID0gewogICAgY29pbnM6IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGRfY29pbnMnKSB8fCAnMCcpLAogICAgbW9ua2V5TW9uZXk6IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGRfbW0nKSB8fCAnMCcpLAogICAgdW5sb2NrZWRTcGVjaWFsVG93ZXJzOiB7CiAgICAgIHN1cGVyOiBmYWxzZSwgbGFzZXI6IGZhbHNlLCBwbGFzbWE6IGZhbHNlLCBzdW46IGZhbHNlLAogICAgfSwKICB9OwoKICBjb25zdCBsb2FkZWRVbmxvY2tzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RkX3VubG9ja3MnKTsKICBpZiAobG9hZGVkVW5sb2NrcykgewogICAgdHJ5IHsgT2JqZWN0LmFzc2lnbihwcm9maWxlLnVubG9ja2VkU3BlY2lhbFRvd2VycywgSlNPTi5wYXJzZShsb2FkZWRVbmxvY2tzKSk7IH0gY2F0Y2gge30KICB9CgogIGNvbnN0IHN0YXRlID0gewogICAgbW9uZXk6IDcwMCwgbGl2ZXM6IDEwMCwgd2F2ZTogMSwKICAgIGhvdmVyOiB7IHg6IDAsIHk6IDAgfSwKICAgIHNlbGVjdGVkVG93ZXJUeXBlOiAnZGFydCcsCiAgICBzZWxlY3RlZFRvd2VyOiBudWxsLAogICAgc2VsZWN0ZWRNYXA6IDAsCiAgICBkaWZmaWN1bHR5OiAnbWVkaXVtJywKICB9OwoKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtaW4tc3VibWl0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7CiAgICBjb25zdCB2YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtaW4tcHcnKS52YWx1ZTsKICAgIGlmICh2YWwgPT09IEFETUlOX1BBU1NXT1JEKSB7CiAgICAgIGFkbWluVW5sb2NrZWQgPSB0cnVlOwogICAgICBzaG93QWRtaW5Mb2dpbiA9IGZhbHNlOwogICAgICBzaG93QWRtaW5QYW5lbCA9IHRydWU7CiAgICAgIGFkbWluTG9naW5Cb3guc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgcmVuZGVyQWRtaW5QYW5lbCgpOwogICAgICBhZG1pblBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtaW4tZXJyJykudGV4dENvbnRlbnQgPSAnJzsKICAgIH0gZWxzZSB7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1hZG1pbi1lcnInKS50ZXh0Q29udGVudCA9ICdJbmNvcnJlY3QgcGFzc3dvcmQnOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtaW4tcHcnKS52YWx1ZSA9ICcnOwogICAgfQogIH0pOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1hZG1pbi1jYW5jZWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsKICAgIHNob3dBZG1pbkxvZ2luID0gZmFsc2U7CiAgICBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgfSk7CgogIGNvbnN0IGFnZW50cyA9IHsgc3Bpa2VzOiAzLCBnbHVlVHJhcDogMiwgZmFybWVyOiAxIH07CiAgbGV0IGFnZW50TW9kZSA9IG51bGw7CiAgY29uc3QgcGxhY2VkQWdlbnRzID0gW107IC8vIGRlcHJlY2F0ZWQgKGFnZW50cyByZW1vdmVkIGZyb20gVUkvY29udHJvbHMpCgogIGNvbnN0IHRvd2VyRGVmcyA9IHsKICAgIGRhcnQ6IHsgbmFtZTogJ0RhcnQnLCBpY29uOiAn4p6kJywgY29sb3I6ICcjOGQ2ZTYzJywgY29zdDogMTcwLCByYW5nZTogMTQ1LCBmaXJlUmF0ZTogMjksIGRhbWFnZTogMSwgcGllcmNlOiAxLCBwcm9qZWN0aWxlU3BlZWQ6IDExLCB1bmxvY2tMdmw6IDEsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydQaWVyY2UrJywgJ1JhbmdlKycsICdMZWFkIFBvcCcsICdSYXBpZCBEYXJ0cycsICdQUk8gUGxhc21hJywgJ1BSTysgSHlwZXInLCAnUFJPIE1BWCddLAogICAgICAgICAgICAgICAgICAgcDI6IFsnQ2FtbyBTaWdodCcsICdMZWFkIFBvcCcsICdDcml0IERhcnRzJywgJ0Zhc3RlciBIYW5kcycsICdQUk8gU2NvdXQnLCAnUFJPKyBJbnRlbCcsICdQUk8gTUFYJ10gfSB9LAogICAgbmluamE6IHsgbmFtZTogJ05pbmphJywgaWNvbjogJ+KcpicsIGNvbG9yOiAnIzVlMzViMScsIGNvc3Q6IDM2MCwgcmFuZ2U6IDE4NSwgZmlyZVJhdGU6IDE3LCBkYW1hZ2U6IDEsIHBpZXJjZTogMiwgcHJvamVjdGlsZVNwZWVkOiAxMywgdW5sb2NrTHZsOiAyLAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnU2hhcnBlciBTdGFycycsICdSYW5nZSsnLCAnTGVhZCBQb3AnLCAnRmxhc2ggQm9tYicsICdQUk8gR3JhbmRtYXN0ZXInLCAnUFJPKyBTdG9ybScsICdQUk8gTUFYJ10sCiAgICAgICAgICAgICAgICAgICBwMjogWydDYW1vIE1hc3RlcicsICdTaHVyaWtlbisnLCAnU3RpY2t5IEhpdCcsICdBdHRhY2sgU3BlZWQnLCAnUFJPIFNhYm90ZXVyJywgJ1BSTysgU2hhZG93JywgJ1BSTyBNQVgnXSB9IH0sCiAgICBib21iOiB7IG5hbWU6ICdCb21iJywgaWNvbjogJ+KcuScsIGNvbG9yOiAnIzM3NDc0ZicsIGNvc3Q6IDYyMCwgcmFuZ2U6IDE3MCwgZmlyZVJhdGU6IDU1LCBkYW1hZ2U6IDEsIHBpZXJjZTogMSwgcHJvamVjdGlsZVNwZWVkOiA4LCBzcGxhc2g6IDg1LCB1bmxvY2tMdmw6IDMsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydCaWdnZXIgQmxhc3QnLCAnSGVhdnkgU2hlbGwnLCAnQ2x1c3RlcicsICdNT0FCIFBvcCcsICdQUk8gU2llZ2UnLCAnUFJPKyBCYXJyYWdlJywgJ1BSTyBNQVgnXSwKICAgICAgICAgICAgICAgICAgIHAyOiBbJ0Zhc3RlciBSZWxvYWQnLCAnQmxhc3QrJywgJ1N0dW4nLCAnUmFwaWQgQm9tYnMnLCAnUFJPIERlbW8nLCAnUFJPKyBTaG9jaycsICdQUk8gTUFYJ10gfSB9LAogICAgaWNlOiB7IG5hbWU6ICdJY2UnLCBpY29uOiAn4p2EJywgY29sb3I6ICcjODFkNGZhJywgY29zdDogNDMwLCByYW5nZTogMTIwLCBmaXJlUmF0ZTogNDUsIGRhbWFnZTogMSwgcGllcmNlOiA5OTksIHByb2plY3RpbGVTcGVlZDogMCwgZnJlZXplRHVyYXRpb246IDgwLCB1bmxvY2tMdmw6IDQsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydMb25nIEZyZWV6ZScsICdDb2xkIFNuYXAnLCAnRGVlcCBGcmVlemUnLCAnQXJjdGljIEF1cmEnLCAnUFJPIFplcm8nLCAnUFJPKyBCbGl6emFyZCcsICdQUk8gTUFYJ10sCiAgICAgICAgICAgICAgICAgICBwMjogWydDYW1vIEZyZWV6ZScsICdMZWFkIENyYWNrJywgJ0JyaXR0bGUnLCAnUHVsc2UgU3BlZWQnLCAnUFJPIFBlcm1hZnJvc3QnLCAnUFJPKyBHbGFjaWFsJywgJ1BSTyBNQVgnXSB9IH0sCiAgICBzbmlwZXI6IHsgbmFtZTogJ1NuaXBlcicsIGljb246ICfil4knLCBjb2xvcjogJyMyNjMyMzgnLCBjb3N0OiA1NTAsIHJhbmdlOiA1MDAwLCBmaXJlUmF0ZTogNjgsIGRhbWFnZTogMywgcGllcmNlOiAxLCBwcm9qZWN0aWxlU3BlZWQ6IDIwLCB1bmxvY2tMdmw6IDUsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydEYW1hZ2UrJywgJ0RhbWFnZSsnLCAnTGVhZC9DZXJhbWljKycsICdGYXN0ZXIgQWltJywgJ1BSTyBFbGl0ZScsICdQUk8rIERlYWRleWUnLCAnUFJPIE1BWCddLAogICAgICAgICAgICAgICAgICAgcDI6IFsnVmlzaW9uKycsICdTaHJhcG5lbCcsICdSZXZlYWwnLCAnUmVsb2FkKycsICdQUk8gU3VwcG9ydCcsICdQUk8rIFJhZGFyJywgJ1BSTyBNQVgnXSB9IH0sCiAgICBib29tZXJhbmc6IHsgbmFtZTogJ0Jvb21lcicsIGljb246ICfil4wnLCBjb2xvcjogJyNmZjk4MDAnLCBjb3N0OiA0MTAsIHJhbmdlOiAxNzAsIGZpcmVSYXRlOiAyNCwgZGFtYWdlOiAxLCBwaWVyY2U6IDQsIHByb2plY3RpbGVTcGVlZDogMTAsIHVubG9ja0x2bDogMiwKICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ1BpZXJjZSsnLCAnUmFuZ2UrJywgJ0xlYWQgU2xpY2UnLCAnRGFtYWdlKycsICdQUk8gU3Rvcm0nLCAnUFJPKyBDeWNsb25lJywgJ1BSTyBNQVgnXSwKICAgICAgICAgICAgICAgICAgIHAyOiBbJ0Zhc3RlciBUaHJvdycsICdSaWNvY2hldCcsICdEb3VibGUgVGhyb3cnLCAnRmFzdGVyKycsICdQUk8gUmV0dXJuaW5nKycsICdQUk8rIE9yYml0JywgJ1BSTyBNQVgnXSB9IH0sCiAgICB0YWNrOiB7IG5hbWU6ICdUYWNrJywgaWNvbjogJ+KcuCcsIGNvbG9yOiAnI2YwNjI5MicsIGNvc3Q6IDMyMCwgcmFuZ2U6IDk1LCBmaXJlUmF0ZTogMTIsIGRhbWFnZTogMSwgcGllcmNlOiAxLCBwcm9qZWN0aWxlU3BlZWQ6IDksIGJ1cnN0OiA2LCB1bmxvY2tMdmw6IDIsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydNb3JlIFRhY2tzJywgJ1JhbmdlKycsICdIb3QgVGFja3MnLCAnQnVyc3QrJywgJ1BSTyBJbmZlcm5vJywgJ1BSTysgU3BpbicsICdQUk8gTUFYJ10sCiAgICAgICAgICAgICAgICAgICBwMjogWydGYXN0ZXIgU2hvdCcsICdGYXN0ZXIrJywgJ1JpbmcrJywgJ1NwZWVkKycsICdQUk8gSHlwZXInLCAnUFJPKyBCbGFkZXMnLCAnUFJPIE1BWCddIH0gfSwKICAgIGdsdWU6IHsgbmFtZTogJ0dsdWUnLCBpY29uOiAn4pePJywgY29sb3I6ICcjOGJjMzRhJywgY29zdDogMzAwLCByYW5nZTogMTQ1LCBmaXJlUmF0ZTogMjgsIGRhbWFnZTogMCwgcGllcmNlOiAxLCBwcm9qZWN0aWxlU3BlZWQ6IDEwLCBnbHVlU2xvdzogMC41NSwgZ2x1ZVRpY2tzOiAxMjAsIHVubG9ja0x2bDogMywKICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ0xvbmdlciBHbHVlJywgJ1N0cm9uZ2VyIFNsb3cnLCAnR2x1ZSBTcGxhdHRlcicsICdBT0UgR2x1ZScsICdQUk8gU29sdmVyJywgJ1BSTysgQ29ycm9zaW9uJywgJ1BSTyBNQVgnXSwKICAgICAgICAgICAgICAgICAgIHAyOiBbJ0Zhc3RlciBTaG90cycsICdHbHVlIFNvYWsnLCAnU2xvdysnLCAnR2xvYmFsIEdsdWUnLCAnUFJPIFN0b3JtJywgJ1BSTysgTWVsdCcsICdQUk8gTUFYJ10gfSB9LAogICAgdmlsbGFnZTogeyBuYW1lOiAnVmlsbGFnZScsIGljb246ICfijIInLCBjb2xvcjogJyNmMmQzOWMnLCBjb3N0OiA3NjAsIHJhbmdlOiAxNjUsIGZpcmVSYXRlOiA5OTk5OSwgZGFtYWdlOiAwLCBwaWVyY2U6IDAsIHByb2plY3RpbGVTcGVlZDogMCwgdW5sb2NrTHZsOiA2LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQmlnZ2VyIFJhZGl1cycsICdKdW5nbGUgRHJ1bXMnLCAnUmFkYXIgU2Nhbm5lcicsICdQcmltYXJ5IFRyYWluaW5nJywgJ1BSTyBIb21lbGFuZCcsICdQUk8rIENvbW1hbmQnLCAnUFJPIE1BWCddLAogICAgICAgICAgICAgICAgICAgcDI6IFsnRGlzY291bnQnLCAnQmlnIERpc2NvdW50JywgJ01vbmtleSBJbnRlbCcsICdNSUInLCAnUFJPIENUQScsICdQUk8rIFN1cHBvcnQnLCAnUFJPIE1BWCddIH0gfSwKICAgIHN1cGVyOiB7IG5hbWU6ICdTdXBlcicsIGljb246ICfirKInLCBjb2xvcjogJyNmZmQ1NGYnLCBjb3N0OiAyODAwLCByYW5nZTogMjQwLCBmaXJlUmF0ZTogNiwgZGFtYWdlOiAyLCBwaWVyY2U6IDMsIHByb2plY3RpbGVTcGVlZDogMTcsIHVubG9ja0NvaW5zOiA5MDAgfSwKICAgIGxhc2VyOiB7IG5hbWU6ICdMYXNlcicsIGljb246ICfilZAnLCBjb2xvcjogJyM4MGRlZWEnLCBjb3N0OiAzNDAwLCByYW5nZTogMjYwLCBmaXJlUmF0ZTogOSwgZGFtYWdlOiA0LCBwaWVyY2U6IDUsIHByb2plY3RpbGVTcGVlZDogMTksIHVubG9ja0NvaW5zOiAxNjAwIH0sCiAgICBwbGFzbWE6IHsgbmFtZTogJ1BsYXNtYScsIGljb246ICfinLonLCBjb2xvcjogJyNiYTY4YzgnLCBjb3N0OiA0MzAwLCByYW5nZTogMjc1LCBmaXJlUmF0ZTogOCwgZGFtYWdlOiA1LCBwaWVyY2U6IDYsIHByb2plY3RpbGVTcGVlZDogMjAsIHVubG9ja0NvaW5zOiAyNjAwIH0sCiAgICBzdW46IHsgbmFtZTogJ1N1biBHb2QnLCBpY29uOiAn4piAJywgY29sb3I6ICcjZmZjYTI4JywgY29zdDogNjIwMCwgcmFuZ2U6IDMwNSwgZmlyZVJhdGU6IDcsIGRhbWFnZTogOCwgcGllcmNlOiA4LCBwcm9qZWN0aWxlU3BlZWQ6IDIyLCB1bmxvY2tDb2luczogNDIwMCB9LAogICAgZmFybTogeyBuYW1lOiAnRmFybScsIGljb246ICfilqYnLCBjb2xvcjogJyM2NmJiNmEnLCBjb3N0OiAxMDUwLCByYW5nZTogMCwgZmlyZVJhdGU6IDk5OTk5LCBkYW1hZ2U6IDAsIHBpZXJjZTogMCwgcHJvamVjdGlsZVNwZWVkOiAwLCB1bmxvY2tMdmw6IDQsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydNb3JlIEJhbmFuYXMnLCAnRXZlbiBNb3JlJywgJ0JvdW50aWZ1bCcsICdNYXJrZXRwbGFjZScsICdCYW5hbmEgQ2VudHJhbCddLCBwMjogWydGYXN0ZXIgSGFydmVzdCcsICdWYWx1YWJsZSBCYW5hbmFzJywgJ0JhbmtpbmcnLCAnQmlnIEJhbmsnLCAnV2FsbCBTdHJlZXQnXSwgcDM6IFsnRmVydGlsaXplcicsICdMb25nIENyYXRlcycsICdBdXRvLUNvbGxlY3QnLCAnTW9ua2V5bm9taWNzJywgJ0dvZCBGYXJtJ10gfSB9LAogICAgc3VwcG9ydDogeyBuYW1lOiAnU3VwcG9ydCcsIGljb246ICfinJonLCBjb2xvcjogJyM5MGE0YWUnLCBjb3N0OiA5ODAsIHJhbmdlOiAxNzAsIGZpcmVSYXRlOiA5OTk5OSwgZGFtYWdlOiAwLCBwaWVyY2U6IDAsIHByb2plY3RpbGVTcGVlZDogMCwgdW5sb2NrTHZsOiA1LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnUmFuZ2UgQXVyYScsICdCaWdnZXIgQXVyYScsICdTaGFycGVuJywgJ0VsaXRlIFJhbmdlJywgJ0NvbW1hbmRlciddLCBwMjogWydTcGVlZCBBdXJhJywgJ0Zhc3RlciBBdXJhJywgJ092ZXJjbG9jaycsICdVbHRyYSBCb29zdCcsICdUaW1lIFdhcnAnXSwgcDM6IFsnRGV0ZWN0aW9uJywgJ0xlYWQgQXNzaXN0JywgJ0FybW9yIENyYWNrJywgJ0Jvc3MgRGVidWZmJywgJ0dvZCBTdXBwb3J0J10gfSB9LAogICAgd2l6YXJkOiB7IG5hbWU6ICdXaXphcmQnLCBpY29uOiAn4pynJywgY29sb3I6ICcjN2U1N2MyJywgY29zdDogNTIwLCByYW5nZTogMTkwLCBmaXJlUmF0ZTogMjAsIGRhbWFnZTogMiwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEyLCB1bmxvY2tMdmw6IDQsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydBcmNhbmUgUG93ZXInLCAnRHJhZ29uIEJyZWF0aCcsICdQaG9lbml4IFNwYXJrJywgJ01PQUIgSGV4JywgJ0FyY2htYWdlJ10sIHAyOiBbJ0Zhc3QgQ2FzdCcsICdGb3JrIEJvbHQnLCAnTWFuYSBGbG9vZCcsICdHbG9iYWwgUnVuZScsICdPcmFjbGUnXSwgcDM6IFsnQ2FtbyBTaWdodCcsICdMZWFkIE1lbHQnLCAnRmxhbWUgV2FsbCcsICdTdG9ybSBGaXJlJywgJ015dGhpYyddIH0gfSwKICAgIGVuZ2luZWVyOiB7IG5hbWU6ICdFbmdpbmVlcicsIGljb246ICfimpknLCBjb2xvcjogJyM5MGE0YWUnLCBjb3N0OiA2MDAsIHJhbmdlOiAxNTUsIGZpcmVSYXRlOiAyNCwgZGFtYWdlOiAxLCBwaWVyY2U6IDIsIHByb2plY3RpbGVTcGVlZDogMTEsIHVubG9ja0x2bDogNCwKICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ05haWwgR3VuKycsICdIZWF2eSBOYWlscycsICdTZW50cnkgRHJvcCcsICdNT0FCIFJpdmV0cycsICdPdmVyY2xvY2snXSwgcDI6IFsnRmFzdGVyIEJ1aWxkJywgJ1RyYXAnLCAnQmlnZ2VyIFRyYXAnLCAnU3VwcG9ydCBHcmlkJywgJ0ZhY3RvcnknXSwgcDM6IFsnSW50ZWwgVG9vbHMnLCAnUGluJywgJ0FybW9yIENyYWNrJywgJ01lZ2EgUml2ZXQnLCAnTWVjaCddIH0gfSwKICAgIGFsY2hlbWlzdDogeyBuYW1lOiAnQWxjaGVtaXN0JywgaWNvbjogJ+KalycsIGNvbG9yOiAnIzY2YmI2YScsIGNvc3Q6IDY0MCwgcmFuZ2U6IDE1MCwgZmlyZVJhdGU6IDMwLCBkYW1hZ2U6IDEsIHBpZXJjZTogMiwgcHJvamVjdGlsZVNwZWVkOiAxMCwgdW5sb2NrTHZsOiA1LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQWNpZCBNaXgnLCAnTGVhZCBNZWx0JywgJ01PQUIgQWNpZCcsICdVbnN0YWJsZSBCcmV3JywgJ1NvbHZlciddLCBwMjogWydTdGltIEJyZXcnLCAnQmVyc2Vya2VyIEJyZXcnLCAnUGVybWFuZW50IEJyZXcnLCAnQ2F0YWx5c3QgQXVyYScsICdFbGl4aXInXSwgcDM6IFsnUG90aW9uKycsICdDb3Jyb2RlKycsICdUb25pYycsICdUb3hpYyBDbG91ZCcsICdQaGlsb3NvcGhlciddIH0gfSwKICAgIGRydWlkOiB7IG5hbWU6ICdEcnVpZCcsIGljb246ICfimJgnLCBjb2xvcjogJyMyZTdkMzInLCBjb3N0OiA1NjAsIHJhbmdlOiAxODAsIGZpcmVSYXRlOiAyMywgZGFtYWdlOiAyLCBwaWVyY2U6IDIsIHByb2plY3RpbGVTcGVlZDogMTIsIHVubG9ja0x2bDogNSwKICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ1Rob3JucysnLCAnQnJhbWJsZXMnLCAnVmluZSBDcnVzaCcsICdOYXR1cmUgRnVyeScsICdXaWxkJ10sIHAyOiBbJ1RlbXBlc3QnLCAnU3Rvcm0rJywgJ1Rvcm5hZG8nLCAnSHVycmljYW5lJywgJ0N5Y2xvbmUnXSwgcDM6IFsnV3JhdGgnLCAnV3JhdGgrJywgJ1ByaW1hbCcsICdGb3Jlc3QgQ2FsbCcsICdHcm92ZSddIH0gfSwKICAgIG1vcnRhcjogeyBuYW1lOiAnTW9ydGFyJywgaWNvbjogJ+KcpicsIGNvbG9yOiAnIzhkNmU2MycsIGNvc3Q6IDc4MCwgcmFuZ2U6IDUwMDAsIGZpcmVSYXRlOiA0NiwgZGFtYWdlOiAzLCBwaWVyY2U6IDIsIHByb2plY3RpbGVTcGVlZDogOCwgc3BsYXNoOiA5MiwgdW5sb2NrTHZsOiA2LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQmxhc3QgUmFkaXVzKycsICdTaGVsbCBTaG9jaycsICdIZWF2eSBTaGVsbCcsICdNT0FCIEJhcnJhZ2UnLCAnU2llZ2UnXSwgcDI6IFsnRmFzdCBSZWxvYWQnLCAnQXJ0aWxsZXJ5JywgJ1JhcGlkIEZpcmUnLCAnSW5jZW5kaWFyeScsICdOYXBhbG0nXSwgcDM6IFsnVGFyZ2V0aW5nKycsICdTaWduYWwnLCAnU2hyYXBuZWwnLCAnU2hvY2t3YXZlJywgJ1F1YWtlJ10gfSB9LAogICAgc3Rvcm06IHsgbmFtZTogJ1N0b3JtJywgaWNvbjogJ+KYhCcsIGNvbG9yOiAnIzI5YjZmNicsIGNvc3Q6IDkyMCwgcmFuZ2U6IDIxMCwgZmlyZVJhdGU6IDE4LCBkYW1hZ2U6IDIsIHBpZXJjZTogMywgcHJvamVjdGlsZVNwZWVkOiAxNCwgdW5sb2NrTHZsOiA3LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnTGlnaHRuaW5nKycsICdDaGFpbiBCb2x0JywgJ1RodW5kZXJzdHJpa2UnLCAnU2t5IFdyYXRoJywgJ1RlbXBlc3QnXSwgcDI6IFsnV2luZCsnLCAnR2FsZScsICdDeWNsb25lJywgJ1Blcm1hIFNxdWFsbCcsICdWb3J0ZXgnXSwgcDM6IFsnU3RhdGljJywgJ1N0YXRpYysnLCAnSW9uJywgJ0VNUCcsICdOb3ZhJ10gfSB9LAogICAgc3VibWFyaW5lOiB7IG5hbWU6ICdTdWInLCBpY29uOiAn4p+BJywgY29sb3I6ICcjNGZjM2Y3JywgY29zdDogNjgwLCByYW5nZTogMjA1LCBmaXJlUmF0ZTogMjAsIGRhbWFnZTogMiwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEyLCB1bmxvY2tMdmw6IDUsCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydUb3JwZWRvKycsICdSYWRhciBTb25hcicsICdIdW50ZXInLCAnQXJtb3IgUGllcmNlcicsICdLcmFrZW4nXSwgcDI6IFsnRmFzdGVyIFNvbmFyJywgJ01pc3NpbGUnLCAnRGVwdGggQ2hhcmdlJywgJ1dhdmUgQnJlYWsnLCAnRmxlZXQnXSwgcDM6IFsnRGl2ZScsICdEaXZlKycsICdTdGVhbHRoJywgJ1NpbGVudCBSdW4nLCAnQWJ5c3MnXSB9IH0sCiAgICBib2F0OiB7IG5hbWU6ICdCb2F0JywgaWNvbjogJ+KbtScsIGNvbG9yOiAnIzY0YjVmNicsIGNvc3Q6IDc0MCwgcmFuZ2U6IDE5NSwgZmlyZVJhdGU6IDIyLCBkYW1hZ2U6IDIsIHBpZXJjZTogMywgcHJvamVjdGlsZVNwZWVkOiAxMSwgdW5sb2NrTHZsOiA1LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQ2Fubm9ucysnLCAnRG91YmxlIFNob3QnLCAnR3JhcGUgQnVyc3QnLCAnTU9BQiBIb29rJywgJ0ZyaWdhdGUnXSwgcDI6IFsnVHJhZGUgRGVjaycsICdEZWNrIEd1bnMnLCAnUmFwaWQgRGVjaycsICdDYXJyaWVyJywgJ0NvbnZveSddLCBwMzogWydTY291dCcsICdTY291dCsnLCAnRXNjb3J0JywgJ0Rlc3Ryb3llcicsICdEcmVhZG5vdWdodCddIH0gfSwKICAgIGNvbW1hbmRlcjogeyBuYW1lOiAnQ29tbWFuZGVyJywgaWNvbjogJ+KYhScsIGNvbG9yOiAnI2ZmYjcwMycsIGNvc3Q6IDk1MCwgcmFuZ2U6IDIzMCwgZmlyZVJhdGU6IDEwLCBkYW1hZ2U6IDIsIHBpZXJjZTogMiwgcHJvamVjdGlsZVNwZWVkOiAxMywgdW5sb2NrTHZsOiA2LAogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnRGFtYWdlKycsICdMZWFkIFJvdW5kcycsICdNT0FCIFJvdW5kcycsICdPdmVyZHJpdmUnLCAnUHJpbWUnXSwgcDI6IFsnTW92ZSBTcGVlZCsnLCAnQWltIEFzc2lzdCcsICdEcm9uZSBTaG90JywgJ0hlcm9pYyBQYWNlJywgJ0NvbnRyb2wnXSwgcDM6IFsnQXJtb3IgSW50ZWwnLCAnQ2FsbG91dCcsICdTcXVhZCBCdWZmJywgJ1RhY3RpY2FsIEdyaWQnLCAnR2hvc3QnXSB9IH0sCiAgfTsKCiAgY29uc3QgdG93ZXJJY29uRmFsbGJhY2tzID0gewogICAgZGFydDogJ+KepCcsIG5pbmphOiAn4pymJywgYm9tYjogJ+KcuScsIGljZTogJ+KdhCcsIHNuaXBlcjogJ+KXiScsIGJvb21lcmFuZzogJ+KXjCcsIHRhY2s6ICfinLgnLCBnbHVlOiAn4pePJywKICAgIHZpbGxhZ2U6ICfijIInLCBzdXBlcjogJ+KsoicsIGxhc2VyOiAn4pWQJywgcGxhc21hOiAn4py6Jywgc3VuOiAn4piAJywgZmFybTogJ+KWpicsIHN1cHBvcnQ6ICfinJonLCB3aXphcmQ6ICfinKcnLAogICAgZW5naW5lZXI6ICfimpknLCBhbGNoZW1pc3Q6ICfimpcnLCBkcnVpZDogJ+KYmCcsIG1vcnRhcjogJ+KcpicsIHN0b3JtOiAn4piEJywgc3VibWFyaW5lOiAn4p+BJywgYm9hdDogJ+KbtScsIGNvbW1hbmRlcjogJ+KYhScsCiAgfTsKCiAgT2JqZWN0LmtleXModG93ZXJEZWZzKS5mb3JFYWNoKChrKSA9PiB7CiAgICBpZiAoIXRvd2VyRGVmc1trXS5pY29uKSB0b3dlckRlZnNba10uaWNvbiA9IHRvd2VySWNvbkZhbGxiYWNrc1trXSB8fCAn4peGJzsKICB9KTsKCiAgLy8gTkVXOiBlbnN1cmUgZXZlcnkgdG93ZXIgaGFzIGEgM3JkIHBhdGggd2l0aCA1IHRpZXJzIGZvciBCVEQtc3R5bGUgMy1wYXRoIFVJL2xvZ2ljLgogIE9iamVjdC5rZXlzKHRvd2VyRGVmcykuZm9yRWFjaCgoaykgPT4gewogICAgY29uc3QgZCA9IHRvd2VyRGVmc1trXTsKICAgIGlmICghZC5wYXRoTmFtZXMpIGQucGF0aE5hbWVzID0ge307CiAgICBpZiAoIWQucGF0aE5hbWVzLnAxKSBkLnBhdGhOYW1lcy5wMSA9IFsnVDEnLCAnVDInLCAnVDMnLCAnVDQnLCAnVDUnXTsKICAgIGlmICghZC5wYXRoTmFtZXMucDIpIGQucGF0aE5hbWVzLnAyID0gWydUMScsICdUMicsICdUMycsICdUNCcsICdUNSddOwogICAgaWYgKCFkLnBhdGhOYW1lcy5wMykgZC5wYXRoTmFtZXMucDMgPSBbJ1QxJywgJ1QyJywgJ1QzJywgJ1Q0JywgJ1Q1J107CiAgfSk7CgogIGNvbnN0IGJsb29uQ2F0YWxvZyA9IHsKICAgIHJlZDogeyBocDogMSwgc3BlZWQ6IDEuNywgY29sb3I6ICcjZTUzOTM1JywgcmV3YXJkOiA4LCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sCiAgICBibHVlOiB7IGhwOiAyLCBzcGVlZDogMi4xLCBjb2xvcjogJyMxZTg4ZTUnLCByZXdhcmQ6IDEwLCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sCiAgICBncmVlbjogeyBocDogMywgc3BlZWQ6IDIuNCwgY29sb3I6ICcjNDNhMDQ3JywgcmV3YXJkOiAxMiwgZGFtYWdlOiAxLCBpbW11bml0aWVzOiBbXSB9LAogICAgeWVsbG93OiB7IGhwOiA1LCBzcGVlZDogMy4wLCBjb2xvcjogJyNmZGQ4MzUnLCByZXdhcmQ6IDE0LCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sCiAgICBwaW5rOiB7IGhwOiA2LCBzcGVlZDogMy41LCBjb2xvcjogJyNlYzQwN2EnLCByZXdhcmQ6IDE1LCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sCiAgICB6ZWJyYTogeyBocDogOSwgc3BlZWQ6IDMuMCwgY29sb3I6ICcjZmZmZmZmJywgcmV3YXJkOiAxOCwgZGFtYWdlOiAyLCBpbW11bml0aWVzOiBbJ2ljZScsICdleHBsb3NpdmUnXSwgc3RyaXBlOiAnIzExMScgfSwKICAgIGJsYWNrOiB7IGhwOiA3LCBzcGVlZDogMi44LCBjb2xvcjogJyM0MjQyNDInLCByZXdhcmQ6IDE2LCBkYW1hZ2U6IDIsIGltbXVuaXRpZXM6IFsnZXhwbG9zaXZlJ10gfSwKICAgIHdoaXRlOiB7IGhwOiA3LCBzcGVlZDogMi43LCBjb2xvcjogJyNmNWY1ZjUnLCByZXdhcmQ6IDE2LCBkYW1hZ2U6IDIsIGltbXVuaXRpZXM6IFsnaWNlJ10gfSwKICAgIHB1cnBsZTogeyBocDogMTAsIHNwZWVkOiAzLjIsIGNvbG9yOiAnIzhlMjRhYScsIHJld2FyZDogMjAsIGRhbWFnZTogMiwgaW1tdW5pdGllczogWydpY2UnXSB9LAogICAgcmFpbmJvdzogeyBocDogMjAsIHNwZWVkOiAzLjQsIGNvbG9yOiAnI2ZmOTgwMCcsIHJld2FyZDogMjgsIGRhbWFnZTogMywgaW1tdW5pdGllczogW10gfSwKICAgIGxlYWQ6IHsgaHA6IDEyLCBzcGVlZDogMS4zNSwgY29sb3I6ICcjOGU5YWE2JywgcmV3YXJkOiAyMiwgZGFtYWdlOiA0LCBpbW11bml0aWVzOiBbJ3NoYXJwJ10gfSwKICAgIGNlcmFtaWM6IHsgaHA6IDM0LCBzcGVlZDogMi4yLCBjb2xvcjogJyNiMDg5NjgnLCByZXdhcmQ6IDUyLCBkYW1hZ2U6IDksIGltbXVuaXRpZXM6IFtdIH0sCiAgICBmb3J0aWZpZWQ6IHsgaHA6IDcwLCBzcGVlZDogMi4wLCBjb2xvcjogJyM3OTU1NDgnLCByZXdhcmQ6IDg1LCBkYW1hZ2U6IDE0LCBpbW11bml0aWVzOiBbXSB9LAogICAgbW9hYjogeyBocDogMjMwLCBzcGVlZDogMS4yLCBjb2xvcjogJyMwMGI0ZDgnLCByZXdhcmQ6IDIwMCwgZGFtYWdlOiAzNSwgaW1tdW5pdGllczogW10sIHJhZGl1czogMzAgfSwKICAgIGJmYjogeyBocDogNjAwLCBzcGVlZDogMC45LCBjb2xvcjogJyNkOTA0MjknLCByZXdhcmQ6IDQyMCwgZGFtYWdlOiA2MCwgaW1tdW5pdGllczogW10sIHJhZGl1czogMzggfSwKICB9OwoKICBjb25zdCB0b3dlcnMgPSBbXTsKICBjb25zdCBibG9vbnMgPSBbXTsKICBjb25zdCBwcm9qZWN0aWxlcyA9IFtdOwoKICBjb25zdCBtYXBEZWZzID0gWwogICAgewogICAgICBuYW1lOiAnVmFsbGV5IEJlbmQnLCBjb2xvcjogJyM0Y2FmNTAnLAogICAgICBsYW5lczogW1tbMCwwLjU1XSxbMC4xNCwwLjU1XSxbMC4xNCwwLjE4XSxbMC4zOSwwLjE4XSxbMC4zOSwwLjgyXSxbMC42NCwwLjgyXSxbMC42NCwwLjNdLFswLjksMC4zXSxbMC45LDAuODVdLFsxLDAuODVdXV0sCiAgICAgIHdhdGVyOiBbeyBzaGFwZTonZWxsaXBzZScsIHg6MC43OCwgeTowLjE0LCByeDowLjEsIHJ5OjAuMDYsIHJvdDowLjIgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC41NiwgeTowLjQ4LCByeDowLjA2LCByeTowLjA0LCByb3Q6MCB9XSwKICAgIH0sCiAgICB7CiAgICAgIG5hbWU6ICdUd2luIFBhc3MnLCBjb2xvcjogJyM1ZDljNTknLAogICAgICBsYW5lczogW1tbMCwwLjI1XSxbMC4yLDAuMjVdLFswLjIsMC41OF0sWzAuNTIsMC41OF0sWzAuNTIsMC4yXSxbMSwwLjJdXSwgW1swLDAuNzVdLFswLjI0LDAuNzVdLFswLjI0LDAuNDJdLFswLjYsMC40Ml0sWzAuNiwwLjg1XSxbMSwwLjg1XV1dLAogICAgICB3YXRlcjogW3sgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNDIsIHk6MC44NSwgcng6MC4xLCByeTowLjA2NSwgcm90OjAuMTIgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC43NCwgeTowLjMyLCByeDowLjA4LCByeTowLjA1LCByb3Q6LTAuMTggfV0sCiAgICB9LAogICAgewogICAgICBuYW1lOiAnQ3Jvc3Nyb2FkcycsIGNvbG9yOiAnIzZlYTg1ZicsCiAgICAgIGxhbmVzOiBbW1swLDAuNV0sWzAuMjIsMC41XSxbMC4yMiwwLjJdLFswLjUsMC4yXSxbMC41LDAuOF0sWzAuNzgsMC44XSxbMC43OCwwLjVdLFsxLDAuNV1dLCBbWzAsMC4xNV0sWzAuMzIsMC4xNV0sWzAuMzIsMC41XSxbMC42OCwwLjVdLFswLjY4LDAuMTVdLFsxLDAuMTVdXSwgW1swLDAuODVdLFswLjMyLDAuODVdLFswLjMyLDAuNV0sWzAuNjgsMC41XSxbMC42OCwwLjg1XSxbMSwwLjg1XV1dLAogICAgICB3YXRlcjogW3sgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNSwgeTowLjUsIHJ4OjAuMTIsIHJ5OjAuMDgsIHJvdDowIH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuMTYsIHk6MC41LCByeDowLjA2LCByeTowLjA0LCByb3Q6MC4yIH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuODQsIHk6MC41LCByeDowLjA2LCByeTowLjA0LCByb3Q6LTAuMiB9XSwKICAgIH0sCiAgICB7CiAgICAgIG5hbWU6ICdSaXZlciBGb3JrJywgY29sb3I6ICcjN2NhZDY0JywKICAgICAgbGFuZXM6IFtbWzAsMC4xNF0sWzAuMTgsMC4xNF0sWzAuMTgsMC41XSxbMC40NiwwLjVdLFswLjQ2LDAuODJdLFswLjcyLDAuODJdLFswLjcyLDAuMzZdLFsxLDAuMzZdXSwgW1swLDAuODZdLFswLjIyLDAuODZdLFswLjIyLDAuNTRdLFswLjU4LDAuNTRdLFswLjU4LDAuMThdLFsxLDAuMThdXV0sCiAgICAgIHdhdGVyOiBbeyBzaGFwZToncmVjdCcsIHg6MC4zNSwgeTowLjA1LCB3OjAuMDgsIGg6MC45IH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNjUsIHk6MC41Niwgcng6MC4xMSwgcnk6MC4wNywgcm90OjAuMDUgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC44NCwgeTowLjc0LCByeDowLjA3LCByeTowLjA1LCByb3Q6LTAuMiB9XSwKICAgIH0sCiAgICB7CiAgICAgIG5hbWU6ICdMYWdvb24gUmluZycsIGNvbG9yOiAnIzZmYjA2ZicsCiAgICAgIGxhbmVzOiBbW1swLDAuNV0sWzAuMTYsMC41XSxbMC4xNiwwLjJdLFswLjUsMC4yXSxbMC41LDAuOF0sWzAuODQsMC44XSxbMC44NCwwLjVdLFsxLDAuNV1dLCBbWzAsMC4wOF0sWzAuMjgsMC4wOF0sWzAuMjgsMC45Ml0sWzAuNzIsMC45Ml0sWzAuNzIsMC4wOF0sWzEsMC4wOF1dXSwKICAgICAgd2F0ZXI6IFt7IHNoYXBlOidlbGxpcHNlJywgeDowLjUsIHk6MC41LCByeDowLjE2LCByeTowLjEsIHJvdDowIH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNSwgeTowLjUsIHJ4OjAuMDgsIHJ5OjAuMDUsIHJvdDowIH1dLAogICAgfSwKICAgIHsKICAgICAgbmFtZTogJ0RlbHRhIE1hemUnLCBjb2xvcjogJyM3OGI0NmInLAogICAgICBsYW5lczogW1tbMCwwLjIyXSxbMC4yLDAuMjJdLFswLjIsMC42NF0sWzAuNDIsMC42NF0sWzAuNDIsMC4zXSxbMC43LDAuM10sWzAuNywwLjddLFsxLDAuN11dLCBbWzAsMC43OF0sWzAuMTgsMC43OF0sWzAuMTgsMC40XSxbMC41LDAuNF0sWzAuNSwwLjldLFswLjg2LDAuOV0sWzAuODYsMC40Nl0sWzEsMC40Nl1dLCBbWzAsMC41XSxbMC4xMiwwLjVdLFswLjEyLDAuMTJdLFswLjYsMC4xMl0sWzAuNiwwLjU2XSxbMSwwLjU2XV1dLAogICAgICB3YXRlcjogW3sgc2hhcGU6J3JlY3QnLCB4OjAuMywgeTowLjEyLCB3OjAuMDcsIGg6MC43OCB9LCB7IHNoYXBlOidyZWN0JywgeDowLjYyLCB5OjAuMDQsIHc6MC4wOCwgaDowLjg0IH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuODQsIHk6MC4yLCByeDowLjA5LCByeTowLjA2LCByb3Q6MC4xOCB9XSwKICAgIH0sCiAgXTsKCiAgY29uc3QgeHBUb05leHRMZXZlbCA9IChsZXZlbCkgPT4gMTAwICsgbGV2ZWwgKiA3MDsKCiAgZnVuY3Rpb24gc2F2ZVByb2ZpbGUoKSB7CiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGRfY29pbnMnLCBTdHJpbmcocHJvZmlsZS5jb2lucykpOwogICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RkX21tJywgU3RyaW5nKHByb2ZpbGUubW9ua2V5TW9uZXkpKTsKICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0ZF91bmxvY2tzJywgSlNPTi5zdHJpbmdpZnkocHJvZmlsZS51bmxvY2tlZFNwZWNpYWxUb3dlcnMpKTsKICB9CgogIGZ1bmN0aW9uIHJlbmRlckFkbWluUGFuZWwoKSB7CiAgICBpZiAoIWFkbWluVW5sb2NrZWQpIHJldHVybjsKICAgIGFkbWluUGFuZWwuaW5uZXJIVE1MID0gYAogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206OHB4OyI+CiAgICAgICAgPGIgc3R5bGU9ImNvbG9yOiNmZmQxNjYiPuKamSBBZG1pbiBDb25zb2xlPC9iPgogICAgICAgIDxidXR0b24gaWQ9InRkLWFkbS1jbG9zZSIgc3R5bGU9ImJhY2tncm91bmQ6I2IyM2E0ODtjb2xvcjojZmZmO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NHB4O3BhZGRpbmc6M3B4IDEwcHg7Y3Vyc29yOnBvaW50ZXI7Ij5DbG9zZTwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iY29sb3I6IzlmZDNmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjZweDsiPkVjb25vbXk8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo2cHg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo4cHg7Ij4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ibW9uZXlfMTAwMCI+KyQxazwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJtb25leV8xMDAwMCI+KyQxMGs8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iY29pbnNfNTAwIj4rNTAwIENvaW5zPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Im1tXzUwMCI+KzUwMCBNTTwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJ1bmxvY2tfYWxsIj5VbmxvY2sgUHJlbWl1bTwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo2cHg7bWFyZ2luLWJvdHRvbToxMHB4OyI+CiAgICAgICAgPGlucHV0IGlkPSJ0ZC1hZG0tbW9uZXkiIHR5cGU9Im51bWJlciIgcGxhY2Vob2xkZXI9IlNldCBjYXNoIiBzdHlsZT0iZmxleDoxO21pbi13aWR0aDowO3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgIzRjYzlmMDY2O2JhY2tncm91bmQ6IzEwMjMzZDtjb2xvcjojZmZmOyIgLz4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic2V0X21vbmV5Ij5TZXQ8L2J1dHRvbj4KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjojOWZkM2ZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206NnB4OyI+UnVuIENvbnRyb2w8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo2cHg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo4cHg7Ij4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ibGl2ZXNfaW5mIj5Hb2QgTGl2ZXM8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iZnVsbF9oZWFsIj5GdWxsIEhlYWw8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iY2xlYXJfYmxvb25zIj5DbGVhciBCbG9vbnM8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iY2xlYXJfcHJvamVjdGlsZXMiPkNsZWFyIFNob3RzPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Indpbl9ydW4iPkZvcmNlIFdpbjwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo2cHg7bWFyZ2luLWJvdHRvbToxMHB4OyI+CiAgICAgICAgPGlucHV0IGlkPSJ0ZC1hZG0td2F2ZSIgdHlwZT0ibnVtYmVyIiBtaW49IjEiIG1heD0iJHtNQVhfV0FWRVN9IiBwbGFjZWhvbGRlcj0iV2F2ZSAjIiBzdHlsZT0iZmxleDoxO21pbi13aWR0aDowO3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgIzRjYzlmMDY2O2JhY2tncm91bmQ6IzEwMjMzZDtjb2xvcjojZmZmOyIgLz4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic2V0X3dhdmUiPkp1bXA8L2J1dHRvbj4KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjojOWZkM2ZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206NnB4OyI+VG93ZXIgQ29tbWFuZHMgKHNlbGVjdGVkIHRvd2VyKTwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjZweDtmbGV4LXdyYXA6d3JhcDttYXJnaW4tYm90dG9tOjEwcHg7Ij4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0idXBncmFkZV9zZWxlY3RlZF9tYXgiPlVwZ3JhZGUgTWF4PC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InByb19zZWxlY3RlZCI+R3JhbnQgUFJPPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Im1hc3Rlcnlfc2VsZWN0ZWQiPkdyYW50IE1hc3Rlcnk8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic2VsbF9zZWxlY3RlZCI+U2VsbCBTZWxlY3RlZDwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJ1cGdyYWRlX2FsbF9tYXgiPlVwZ3JhZGUgQWxsPC9idXR0b24+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBzdHlsZT0iY29sb3I6IzlmZDNmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjZweDsiPkN1c3RvbSBTcGF3bjwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjZweDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo4cHg7Ij4KICAgICAgICA8c2VsZWN0IGlkPSJ0ZC1hZG0tc3Bhd24tdHlwZSIgc3R5bGU9ImZsZXg6MTttaW4td2lkdGg6MTEwcHg7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyOjFweCBzb2xpZCAjNGNjOWYwNjY7YmFja2dyb3VuZDojMTAyMzNkO2NvbG9yOiNmZmY7Ij4KICAgICAgICAgICR7T2JqZWN0LmtleXMoYmxvb25DYXRhbG9nKS5tYXAoKGspID0+IGA8b3B0aW9uIHZhbHVlPSIke2t9Ij4ke2sudG9VcHBlckNhc2UoKX08L29wdGlvbj5gKS5qb2luKCcnKX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgICA8aW5wdXQgaWQ9InRkLWFkbS1zcGF3bi1jb3VudCIgdHlwZT0ibnVtYmVyIiBtaW49IjEiIG1heD0iNTAwIiB2YWx1ZT0iMTAiIHN0eWxlPSJ3aWR0aDo3MnB4O3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgIzRjYzlmMDY2O2JhY2tncm91bmQ6IzEwMjMzZDtjb2xvcjojZmZmOyIgLz4KICAgICAgICA8aW5wdXQgaWQ9InRkLWFkbS1zcGF3bi1sYW5lIiB0eXBlPSJudW1iZXIiIG1pbj0iLTEiIG1heD0iOSIgdmFsdWU9Ii0xIiBzdHlsZT0id2lkdGg6NzJweDtwYWRkaW5nOjVweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkICM0Y2M5ZjA2NjtiYWNrZ3JvdW5kOiMxMDIzM2Q7Y29sb3I6I2ZmZjsiIC8+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InNwYXduX2N1c3RvbSI+U3Bhd248L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToxMXB4O2NvbG9yOiNhN2JlZDM7bWFyZ2luLWJvdHRvbTo4cHg7Ij5MYW5lOiAtMSA9IGN5Y2xlIGFsbCBsYW5lczwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjZweDtmbGV4LXdyYXA6d3JhcCI+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InNwYXduX21vYWIiPk1PQUI8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic3Bhd25fYmZiIj5CRkI8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic3Bhd25fbWl4ZWQiPk1peGVkIFBhY2s8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgaWQ9InRkLWFkbS1tc2ciIHN0eWxlPSJtYXJnaW4tdG9wOjhweDtjb2xvcjojOGJjMzRhO21pbi1oZWlnaHQ6MTZweDsiPjwvZGl2PgogICAgYDsKICAgIGFkbWluUGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmFkbS1idG4nKS5mb3JFYWNoKChiKSA9PiB7CiAgICAgIE9iamVjdC5hc3NpZ24oYi5zdHlsZSwgeyBwYWRkaW5nOiAnNXB4IDhweCcsIGJhY2tncm91bmQ6ICcjMWUzYTVmJywgYm9yZGVyOiAnMXB4IHNvbGlkICM0Y2M5ZjA2NicsIGNvbG9yOiAnI2ZmZicsIGJvcmRlclJhZGl1czogJzRweCcsIGN1cnNvcjogJ3BvaW50ZXInIH0pOwogICAgICBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlQWRtaW5BY3Rpb24oYi5kYXRhc2V0LmFjdGlvbikpOwogICAgfSk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtLWNsb3NlJykub25jbGljayA9ICgpID0+IHsgc2hvd0FkbWluUGFuZWwgPSBmYWxzZTsgYWRtaW5QYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9OwogIH0KCiAgZnVuY3Rpb24gYWRtaW5Nc2cobXNnKSB7CiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1hZG0tbXNnJyk7CiAgICBpZiAoIWVsKSByZXR1cm47CiAgICBlbC50ZXh0Q29udGVudCA9IGDinJQgJHttc2d9YDsKICAgIHNldFRpbWVvdXQoKCkgPT4geyBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gJyc7IH0sIDE4MDApOwogIH0KCiAgZnVuY3Rpb24gcGFyc2VBZG1pbk51bWJlcihpZCwgZmFsbGJhY2sgPSAwKSB7CiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsKICAgIGlmICghZWwpIHJldHVybiBmYWxsYmFjazsKICAgIGNvbnN0IHZhbCA9IE51bWJlcihlbC52YWx1ZSk7CiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHZhbCkgPyB2YWwgOiBmYWxsYmFjazsKICB9CgogIGZ1bmN0aW9uIGdldFNlbGVjdGVkVG93ZXJTYWZlKCkgewogICAgaWYgKCFzdGF0ZS5zZWxlY3RlZFRvd2VyKSByZXR1cm4gbnVsbDsKICAgIGlmICghdG93ZXJzLmluY2x1ZGVzKHN0YXRlLnNlbGVjdGVkVG93ZXIpKSByZXR1cm4gbnVsbDsKICAgIHJldHVybiBzdGF0ZS5zZWxlY3RlZFRvd2VyOwogIH0KCiAgZnVuY3Rpb24gdXBncmFkZVRvd2VyRnVsbHkodG93ZXIpIHsKICAgIGlmICghdG93ZXIpIHJldHVybiBmYWxzZTsKICAgIGxldCBwYXRoSW5kZXggPSB0b3dlci51cGdyYWRlcy5maW5kSW5kZXgoKGx2bCkgPT4gbHZsID4gMCk7CiAgICBpZiAocGF0aEluZGV4ID09PSAtMSkgcGF0aEluZGV4ID0gMDsKICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7CiAgICB3aGlsZSAodG93ZXIudXBncmFkZXNbcGF0aEluZGV4XSA8IDUpIHsKICAgICAgYXBwbHlUb3dlclVwZ3JhZGUodG93ZXIsIHBhdGhJbmRleCk7CiAgICAgIGNoYW5nZWQgPSB0cnVlOwogICAgfQogICAgcmV0dXJuIGNoYW5nZWQ7CiAgfQoKICBmdW5jdGlvbiBzcGF3bkJsb29uc0N1c3RvbSh0eXBlLCBjb3VudCwgbGFuZSkgewogICAgY29uc3QgbWFwTGFuZUNvdW50ID0gZ2V0TWFwUGF0aHMoKS5sZW5ndGg7CiAgICBpZiAoIWJsb29uQ2F0YWxvZ1t0eXBlXSkgcmV0dXJuIDA7CiAgICBjb25zdCBzYWZlQ291bnQgPSBNYXRoLm1heCgxLCBNYXRoLm1pbig1MDAsIE1hdGguZmxvb3IoY291bnQgfHwgMSkpKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FmZUNvdW50OyBpKyspIHsKICAgICAgY29uc3QgbGFuZUluZGV4ID0gbGFuZSA+PSAwCiAgICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXBMYW5lQ291bnQgLSAxLCBsYW5lKSkKICAgICAgICA6IGkgJSBtYXBMYW5lQ291bnQ7CiAgICAgIGJsb29ucy5wdXNoKGNyZWF0ZUJsb29uKHR5cGUsIGxhbmVJbmRleCkpOwogICAgfQogICAgcmV0dXJuIHNhZmVDb3VudDsKICB9CgogIGZ1bmN0aW9uIGhhbmRsZUFkbWluQWN0aW9uKGFjdGlvbikgewogICAgc3dpdGNoIChhY3Rpb24pIHsKICAgICAgY2FzZSAnbW9uZXlfMTAwMCc6IHN0YXRlLm1vbmV5ICs9IDEwMDA7IGFkbWluTXNnKCcrJDEwMDAnKTsgYnJlYWs7CiAgICAgIGNhc2UgJ21vbmV5XzEwMDAwJzogc3RhdGUubW9uZXkgKz0gMTAwMDA7IGFkbWluTXNnKCcrJDEwMDAwJyk7IGJyZWFrOwogICAgICBjYXNlICdjb2luc181MDAnOiBwcm9maWxlLmNvaW5zICs9IDUwMDsgc2F2ZVByb2ZpbGUoKTsgYWRtaW5Nc2coJys1MDAgQ29pbnMnKTsgYnJlYWs7CiAgICAgIGNhc2UgJ21tXzUwMCc6IHByb2ZpbGUubW9ua2V5TW9uZXkgKz0gNTAwOyBzYXZlUHJvZmlsZSgpOyBhZG1pbk1zZygnKzUwMCBNTScpOyBicmVhazsKICAgICAgY2FzZSAndW5sb2NrX2FsbCc6IE9iamVjdC5rZXlzKHByb2ZpbGUudW5sb2NrZWRTcGVjaWFsVG93ZXJzKS5mb3JFYWNoKChrKSA9PiB7IHByb2ZpbGUudW5sb2NrZWRTcGVjaWFsVG93ZXJzW2tdID0gdHJ1ZTsgfSk7IHNhdmVQcm9maWxlKCk7IGFkbWluTXNnKCdVbmxvY2tlZCBhbGwgcHJlbWl1bScpOyBicmVhazsKICAgICAgY2FzZSAnc2V0X21vbmV5JzogewogICAgICAgIGNvbnN0IGNhc2ggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHBhcnNlQWRtaW5OdW1iZXIoJ3RkLWFkbS1tb25leScsIHN0YXRlLm1vbmV5KSkpOwogICAgICAgIHN0YXRlLm1vbmV5ID0gY2FzaDsKICAgICAgICBhZG1pbk1zZyhgQ2FzaCBzZXQgdG8gJCR7Y2FzaH1gKTsKICAgICAgICBicmVhazsKICAgICAgfQogICAgICBjYXNlICdsaXZlc19pbmYnOiBzdGF0ZS5saXZlcyA9IEluZmluaXR5OyBnYW1lT3ZlciA9IGZhbHNlOyBhZG1pbk1zZygnSW5maW5pdGUgbGl2ZXMnKTsgYnJlYWs7CiAgICAgIGNhc2UgJ2Z1bGxfaGVhbCc6IHsKICAgICAgICBzdGF0ZS5saXZlcyA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldLmxpdmVzOwogICAgICAgIGdhbWVPdmVyID0gZmFsc2U7CiAgICAgICAgYWRtaW5Nc2coYExpdmVzIHJlc3RvcmVkIHRvICR7c3RhdGUubGl2ZXN9YCk7CiAgICAgICAgYnJlYWs7CiAgICAgIH0KICAgICAgY2FzZSAnY2xlYXJfYmxvb25zJzogYmxvb25zLmxlbmd0aCA9IDA7IGFkbWluTXNnKCdCbG9vbnMgY2xlYXJlZCcpOyBicmVhazsKICAgICAgY2FzZSAnY2xlYXJfcHJvamVjdGlsZXMnOiBwcm9qZWN0aWxlcy5sZW5ndGggPSAwOyBhZG1pbk1zZygnUHJvamVjdGlsZXMgY2xlYXJlZCcpOyBicmVhazsKICAgICAgY2FzZSAnd2luX3J1bic6IHN0YXRlLndhdmUgPSBNQVhfV0FWRVM7IHdhdmVRdWV1ZSA9IFtdOyBibG9vbnMubGVuZ3RoID0gMDsgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTsgcnVuV29uID0gdHJ1ZTsgYWRtaW5Nc2coJ1J1biBmb3JjZWQgdG8gd2luIHN0YXRlJyk7IGJyZWFrOwogICAgICBjYXNlICdzZXRfd2F2ZSc6IHsKICAgICAgICBjb25zdCB0YXJnZXRXYXZlID0gTWF0aC5tYXgoMSwgTWF0aC5taW4oTUFYX1dBVkVTLCBNYXRoLmZsb29yKHBhcnNlQWRtaW5OdW1iZXIoJ3RkLWFkbS13YXZlJywgc3RhdGUud2F2ZSkpKSk7CiAgICAgICAgc3RhdGUud2F2ZSA9IHRhcmdldFdhdmU7CiAgICAgICAgd2F2ZVF1ZXVlID0gW107CiAgICAgICAgYmxvb25zLmxlbmd0aCA9IDA7CiAgICAgICAgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTsKICAgICAgICBnYW1lT3ZlciA9IGZhbHNlOwogICAgICAgIGFkbWluTXNnKGBXYXZlIHNldCB0byAke3RhcmdldFdhdmV9YCk7CiAgICAgICAgYnJlYWs7CiAgICAgIH0KICAgICAgY2FzZSAnc3Bhd25fbW9hYic6IGJsb29ucy5wdXNoKGNyZWF0ZUJsb29uKCdtb2FiJywgMCkpOyBhZG1pbk1zZygnU3Bhd25lZCBNT0FCJyk7IGJyZWFrOwogICAgICBjYXNlICdzcGF3bl9iZmInOiBibG9vbnMucHVzaChjcmVhdGVCbG9vbignYmZiJywgMCkpOyBhZG1pbk1zZygnU3Bhd25lZCBCRkInKTsgYnJlYWs7CiAgICAgIGNhc2UgJ3NwYXduX21peGVkJzogWydtb2FiJywgJ2ZvcnRpZmllZCcsICdjZXJhbWljJywgJ3JhaW5ib3cnLCAnbGVhZCcsICdiZmInXS5mb3JFYWNoKCh0LCBpKSA9PiBibG9vbnMucHVzaChjcmVhdGVCbG9vbih0LCBpICUgZ2V0TWFwUGF0aHMoKS5sZW5ndGgpKSk7IGFkbWluTXNnKCdTcGF3bmVkIG1peGVkIHBhY2snKTsgYnJlYWs7CiAgICAgIGNhc2UgJ3NwYXduX2N1c3RvbSc6IHsKICAgICAgICBjb25zdCB0eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbS1zcGF3bi10eXBlJyk/LnZhbHVlIHx8ICdyZWQnOwogICAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VBZG1pbk51bWJlcigndGQtYWRtLXNwYXduLWNvdW50JywgMTApOwogICAgICAgIGNvbnN0IGxhbmUgPSBNYXRoLmZsb29yKHBhcnNlQWRtaW5OdW1iZXIoJ3RkLWFkbS1zcGF3bi1sYW5lJywgLTEpKTsKICAgICAgICBjb25zdCBzcGF3bmVkID0gc3Bhd25CbG9vbnNDdXN0b20odHlwZSwgY291bnQsIGxhbmUpOwogICAgICAgIGFkbWluTXNnKGBTcGF3bmVkICR7c3Bhd25lZH0gJHt0eXBlLnRvVXBwZXJDYXNlKCl9YCk7CiAgICAgICAgYnJlYWs7CiAgICAgIH0KICAgICAgY2FzZSAndXBncmFkZV9zZWxlY3RlZF9tYXgnOiB7CiAgICAgICAgY29uc3QgdG93ZXIgPSBnZXRTZWxlY3RlZFRvd2VyU2FmZSgpOwogICAgICAgIGlmICghdG93ZXIpIHsgYWRtaW5Nc2coJ1NlbGVjdCBhIHRvd2VyIGZpcnN0Jyk7IGJyZWFrOyB9CiAgICAgICAgdXBncmFkZVRvd2VyRnVsbHkodG93ZXIpOwogICAgICAgIGFkbWluTXNnKGAke3Rvd2VyRGVmc1t0b3dlci50eXBlXT8ubmFtZSB8fCAnVG93ZXInfSB1cGdyYWRlZCB0byBtYXhgKTsKICAgICAgICBicmVhazsKICAgICAgfQogICAgICBjYXNlICd1cGdyYWRlX2FsbF9tYXgnOiB7CiAgICAgICAgdG93ZXJzLmZvckVhY2goKHRvd2VyKSA9PiB1cGdyYWRlVG93ZXJGdWxseSh0b3dlcikpOwogICAgICAgIGFkbWluTXNnKGBVcGdyYWRlZCAke3Rvd2Vycy5sZW5ndGh9IHRvd2VycyB0byBtYXhgKTsKICAgICAgICBicmVhazsKICAgICAgfQogICAgICBjYXNlICdwcm9fc2VsZWN0ZWQnOiB7CiAgICAgICAgY29uc3QgdG93ZXIgPSBnZXRTZWxlY3RlZFRvd2VyU2FmZSgpOwogICAgICAgIGlmICghdG93ZXIpIHsgYWRtaW5Nc2coJ1NlbGVjdCBhIHRvd2VyIGZpcnN0Jyk7IGJyZWFrOyB9CiAgICAgICAgdG93ZXIucHJvID0gdHJ1ZTsKICAgICAgICBhZG1pbk1zZygnU2VsZWN0ZWQgdG93ZXIgZ3JhbnRlZCBQUk8nKTsKICAgICAgICBicmVhazsKICAgICAgfQogICAgICBjYXNlICdtYXN0ZXJ5X3NlbGVjdGVkJzogewogICAgICAgIGNvbnN0IHRvd2VyID0gZ2V0U2VsZWN0ZWRUb3dlclNhZmUoKTsKICAgICAgICBpZiAoIXRvd2VyKSB7IGFkbWluTXNnKCdTZWxlY3QgYSB0b3dlciBmaXJzdCcpOyBicmVhazsgfQogICAgICAgIHRvd2VyLnBybyA9IHRydWU7CiAgICAgICAgdG93ZXIucHJvTWFzdGVyeSA9IHRydWU7CiAgICAgICAgYWRtaW5Nc2coJ1NlbGVjdGVkIHRvd2VyIGdyYW50ZWQgUFJPIE1hc3RlcnknKTsKICAgICAgICBicmVhazsKICAgICAgfQogICAgICBjYXNlICdzZWxsX3NlbGVjdGVkJzogewogICAgICAgIGNvbnN0IHRvd2VyID0gZ2V0U2VsZWN0ZWRUb3dlclNhZmUoKTsKICAgICAgICBpZiAoIXRvd2VyKSB7IGFkbWluTXNnKCdTZWxlY3QgYSB0b3dlciBmaXJzdCcpOyBicmVhazsgfQogICAgICAgIGNvbnN0IGlkeCA9IHRvd2Vycy5pbmRleE9mKHRvd2VyKTsKICAgICAgICBpZiAoaWR4ID49IDApIHRvd2Vycy5zcGxpY2UoaWR4LCAxKTsKICAgICAgICBzdGF0ZS5zZWxlY3RlZFRvd2VyID0gbnVsbDsKICAgICAgICBhZG1pbk1zZygnU2VsZWN0ZWQgdG93ZXIgc29sZCcpOwogICAgICAgIGJyZWFrOwogICAgICB9CiAgICB9CiAgfQoKICBmdW5jdGlvbiBhcHBseU1ldGFCb251c2VzKCkgewogICAgY29uc3QgZGlmZiA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldOwogICAgc3RhdGUubW9uZXkgPSBkaWZmLnN0YXJ0Q2FzaCArIHByb2dyZXNzaW9uLnN0YXJ0aW5nQ2FzaExldmVsICogMTAwOwogIH0KCiAgZnVuY3Rpb24gZ2FpblhwKGFtb3VudCkgewogICAgcHJvZ3Jlc3Npb24ueHAgKz0gYW1vdW50OwogICAgd2hpbGUgKHByb2dyZXNzaW9uLnhwID49IHhwVG9OZXh0TGV2ZWwocHJvZ3Jlc3Npb24ubGV2ZWwpKSB7CiAgICAgIHByb2dyZXNzaW9uLnhwIC09IHhwVG9OZXh0TGV2ZWwocHJvZ3Jlc3Npb24ubGV2ZWwpOwogICAgICBwcm9ncmVzc2lvbi5sZXZlbCArPSAxOwogICAgICBwcm9ncmVzc2lvbi5wb2ludHMgKz0gMTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIGdldEN1cnJlbnRNYXAoKSB7IHJldHVybiBtYXBEZWZzW3N0YXRlLnNlbGVjdGVkTWFwXTsgfQoKICBmdW5jdGlvbiB0b1BhdGgoYWJzUGF0aCkgewogICAgcmV0dXJuIGFic1BhdGgubWFwKChbcngsIHJ5XSkgPT4gKHsgeDogcnggKiAod2lkdGggLSBTSURFX1BBTkVMKSwgeTogcnkgKiBoZWlnaHQgfSkpOwogIH0KCiAgZnVuY3Rpb24gZ2V0TWFwUGF0aHMoKSB7IHJldHVybiBnZXRDdXJyZW50TWFwKCkubGFuZXMubWFwKHRvUGF0aCk7IH0KCiAgZnVuY3Rpb24gaXNXYXRlclRvd2VyVHlwZSh0eXBlKSB7CiAgICByZXR1cm4gdHlwZSA9PT0gJ3N1Ym1hcmluZScgfHwgdHlwZSA9PT0gJ2JvYXQnOwogIH0KCiAgZnVuY3Rpb24gaXNQb2ludEluV2F0ZXIoeCwgeSkgewogICAgY29uc3QgbWFwID0gZ2V0Q3VycmVudE1hcCgpOwogICAgY29uc3Qgd2F0ZXJBcmVhcyA9IG1hcC53YXRlciB8fCBbXTsKICAgIGNvbnN0IG1hcFdpZHRoID0gd2lkdGggLSBTSURFX1BBTkVMOwogICAgcmV0dXJuIHdhdGVyQXJlYXMuc29tZSgoYXJlYSkgPT4gewogICAgICBpZiAoYXJlYS5zaGFwZSA9PT0gJ2VsbGlwc2UnKSB7CiAgICAgICAgY29uc3QgY3ggPSBhcmVhLnggKiBtYXBXaWR0aDsKICAgICAgICBjb25zdCBjeSA9IGFyZWEueSAqIGhlaWdodDsKICAgICAgICBjb25zdCByeCA9IE1hdGgubWF4KDEsIGFyZWEucnggKiBtYXBXaWR0aCk7CiAgICAgICAgY29uc3QgcnkgPSBNYXRoLm1heCgxLCBhcmVhLnJ5ICogaGVpZ2h0KTsKICAgICAgICBjb25zdCByb3QgPSBhcmVhLnJvdCB8fCAwOwogICAgICAgIGNvbnN0IGR4ID0geCAtIGN4OwogICAgICAgIGNvbnN0IGR5ID0geSAtIGN5OwogICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKC1yb3QpOwogICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKC1yb3QpOwogICAgICAgIGNvbnN0IGV4ID0gZHggKiBjb3MgLSBkeSAqIHNpbjsKICAgICAgICBjb25zdCBleSA9IGR4ICogc2luICsgZHkgKiBjb3M7CiAgICAgICAgcmV0dXJuIChleCAqIGV4KSAvIChyeCAqIHJ4KSArIChleSAqIGV5KSAvIChyeSAqIHJ5KSA8PSAxOwogICAgICB9CiAgICAgIGlmIChhcmVhLnNoYXBlID09PSAncmVjdCcpIHsKICAgICAgICBjb25zdCByeCA9IGFyZWEueCAqIG1hcFdpZHRoOwogICAgICAgIGNvbnN0IHJ5ID0gYXJlYS55ICogaGVpZ2h0OwogICAgICAgIGNvbnN0IHJ3ID0gYXJlYS53ICogbWFwV2lkdGg7CiAgICAgICAgY29uc3QgcmggPSBhcmVhLmggKiBoZWlnaHQ7CiAgICAgICAgcmV0dXJuIHggPj0gcnggJiYgeCA8PSByeCArIHJ3ICYmIHkgPj0gcnkgJiYgeSA8PSByeSArIHJoOwogICAgICB9CiAgICAgIHJldHVybiBmYWxzZTsKICAgIH0pOwogIH0KCiAgZnVuY3Rpb24gcmVzaXplKCkgewogICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7CiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0OwogICAgd2lkdGggPSBjYW52YXMud2lkdGg7IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7CiAgICBzY2VuZXJ5QnlNYXAgPSBtYXBEZWZzLm1hcCgoXywgaWR4KSA9PiBidWlsZFNjZW5lcnkoaWR4KSk7CiAgfQoKICBmdW5jdGlvbiBidWlsZFNjZW5lcnkobWFwSW5kZXgpIHsKICAgIGNvbnN0IHByZXNldHMgPSBbCiAgICAgIFt7IHR5cGU6J3RyZWUnLHg6MC4wOCx5OjAuMTQgfSx7IHR5cGU6J3RyZWUnLHg6MC4yOCx5OjAuOSB9LHsgdHlwZToncm9jaycseDowLjczLHk6MC42MiB9LHsgdHlwZToncG9uZCcseDowLjc4LHk6MC4xNCB9LHsgdHlwZTonYnVzaCcseDowLjQ2LHk6MC41IH0seyB0eXBlOidyb2NrJyx4OjAuMTQseTowLjM0IH0seyB0eXBlOidmbG93ZXJzJyx4OjAuNix5OjAuMTIgfSx7IHR5cGU6J3N0dW1wJyx4OjAuOSx5OjAuNjIgfV0sCiAgICAgIFt7IHR5cGU6J3RyZWUnLHg6MC4xLHk6MC41MiB9LHsgdHlwZTondHJlZScseDowLjM0LHk6MC4xMiB9LHsgdHlwZToncG9uZCcseDowLjQyLHk6MC44NSB9LHsgdHlwZTonYnVzaCcseDowLjU4LHk6MC4xMiB9LHsgdHlwZToncm9jaycseDowLjcyLHk6MC41MiB9LHsgdHlwZTonYnVzaCcseDowLjg0LHk6MC43MiB9LHsgdHlwZTonY3JhdGUnLHg6MC4yMix5OjAuOTIgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC45Mix5OjAuMiB9XSwKICAgICAgW3sgdHlwZTondHJlZScseDowLjEyLHk6MC4xMiB9LHsgdHlwZTondHJlZScseDowLjEyLHk6MC44OCB9LHsgdHlwZToncG9uZCcseDowLjUseTowLjUgfSx7IHR5cGU6J3JvY2snLHg6MC44Nix5OjAuMTIgfSx7IHR5cGU6J3JvY2snLHg6MC44Nix5OjAuODggfSx7IHR5cGU6J2J1c2gnLHg6MC41LHk6MC4wOCB9LHsgdHlwZTonc3R1bXAnLHg6MC41Mix5OjAuOTIgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC4zMix5OjAuNSB9XSwKICAgICAgW3sgdHlwZTondHJlZScseDowLjA4LHk6MC4wOCB9LHsgdHlwZToncm9jaycseDowLjI0LHk6MC4yMiB9LHsgdHlwZTonYnVzaCcseDowLjMseTowLjg2IH0seyB0eXBlOidjcmF0ZScseDowLjUyLHk6MC4yNCB9LHsgdHlwZTonZmxvd2VycycseDowLjgyLHk6MC4xNCB9LHsgdHlwZTonc3R1bXAnLHg6MC45LHk6MC45IH1dLAogICAgICBbeyB0eXBlOid0cmVlJyx4OjAuMDgseTowLjI0IH0seyB0eXBlOid0cmVlJyx4OjAuMSx5OjAuNzggfSx7IHR5cGU6J3JvY2snLHg6MC4yOCx5OjAuNDYgfSx7IHR5cGU6J2J1c2gnLHg6MC43Mix5OjAuMTIgfSx7IHR5cGU6J2NyYXRlJyx4OjAuOSx5OjAuNjYgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC41LHk6MC4wNiB9LHsgdHlwZTonc3R1bXAnLHg6MC45NCx5OjAuMjggfV0sCiAgICAgIFt7IHR5cGU6J3RyZWUnLHg6MC4wNix5OjAuNjIgfSx7IHR5cGU6J3JvY2snLHg6MC4yNCx5OjAuMSB9LHsgdHlwZTonYnVzaCcseDowLjQseTowLjkyIH0seyB0eXBlOidjcmF0ZScseDowLjc0LHk6MC4xIH0seyB0eXBlOidmbG93ZXJzJyx4OjAuNzgseTowLjg0IH0seyB0eXBlOidzdHVtcCcseDowLjkyLHk6MC41OCB9LHsgdHlwZToncG9uZCcseDowLjg0LHk6MC4yIH1dLAogICAgXTsKICAgIHJldHVybiAocHJlc2V0c1ttYXBJbmRleF0gfHwgW10pLm1hcCgocykgPT4gKHsgLi4ucywgcHg6IHMueCAqICh3aWR0aCAtIFNJREVfUEFORUwpLCBweTogcy55ICogaGVpZ2h0IH0pKTsKICB9CgogIGZ1bmN0aW9uIGNyZWF0ZUJsb29uKHR5cGUsIGxhbmUpIHsKICAgIGNvbnN0IGJhc2UgPSBibG9vbkNhdGFsb2dbdHlwZV07CiAgICBjb25zdCBwYXRoID0gZ2V0TWFwUGF0aHMoKVtsYW5lXTsKICAgIGNvbnN0IGRpZmYgPSBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XTsKICAgIHJldHVybiB7CiAgICAgIC4uLnN0cnVjdHVyZWRDbG9uZShiYXNlKSwKICAgICAgdHlwZSwgbGFuZSwgeDogcGF0aFswXS54LCB5OiBwYXRoWzBdLnksIHBhdGhJZHg6IDAsCiAgICAgIHNsb3dUaWNrczogMCwgZ2x1ZVRpY2tzQWN0aXZlOiAwLCBnbHVlZEZhY3RvcjogMSwgY2Ftb1JldmVhbGVkOiBmYWxzZSwKICAgICAgcmFkaXVzOiBiYXNlLnJhZGl1cyA/PyAxMywKICAgICAgaHA6IE1hdGgubWF4KDEsIE1hdGguY2VpbChiYXNlLmhwICogZGlmZi5ibG9vbkhwKSksCiAgICAgIG1heEhwOiBNYXRoLm1heCgxLCBNYXRoLmNlaWwoYmFzZS5ocCAqIGRpZmYuYmxvb25IcCkpLAogICAgICBiYXNlU3BlZWQ6IGJhc2Uuc3BlZWQgKiBkaWZmLmJsb29uU3BlZWQsCiAgICB9OwogIH0KCiAgZnVuY3Rpb24gaXNUb3dlclVubG9ja2VkKHRvd2VyS2V5KSB7CiAgICBjb25zdCBkZWYgPSB0b3dlckRlZnNbdG93ZXJLZXldOwogICAgaWYgKCFkZWYpIHJldHVybiBmYWxzZTsKICAgIGlmIChkZWYudW5sb2NrQ29pbnMpIHJldHVybiAhIXByb2ZpbGUudW5sb2NrZWRTcGVjaWFsVG93ZXJzW3Rvd2VyS2V5XTsKICAgIHJldHVybiBwcm9ncmVzc2lvbi5sZXZlbCA+PSAoZGVmLnVubG9ja0x2bCA/PyAxKTsKICB9CgogIGZ1bmN0aW9uIGJ1aWxkV2F2ZSh3YXZlKSB7CiAgICBjb25zdCBxdWV1ZSA9IFtdOwogICAgY29uc3QgbGFuZUNvdW50ID0gZ2V0TWFwUGF0aHMoKS5sZW5ndGg7CiAgICBjb25zdCBhZGQgPSAodHlwZSwgY291bnQsIGRlbGF5ID0gMTgpID0+IHsgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSBxdWV1ZS5wdXNoKHsgdHlwZSwgZGVsYXksIGxhbmU6IGkgJSBsYW5lQ291bnQgfSk7IH07CiAgICBhZGQoJ3JlZCcsIDE0ICsgd2F2ZSAqIDMpOwogICAgaWYgKHdhdmUgPj0gMikgYWRkKCdibHVlJywgMTAgKyB3YXZlICogMik7CiAgICBpZiAod2F2ZSA+PSA0KSBhZGQoJ2dyZWVuJywgTWF0aC5mbG9vcih3YXZlICogMi4xKSk7CiAgICBpZiAod2F2ZSA+PSA2KSBhZGQoJ3llbGxvdycsIE1hdGguZmxvb3Iod2F2ZSAqIDEuOSksIDEzKTsKICAgIGlmICh3YXZlID49IDcpIGFkZCgncGluaycsIE1hdGguZmxvb3Iod2F2ZSAqIDEuNSksIDEyKTsKICAgIGlmICh3YXZlID49IDgpIGFkZCgnYmxhY2snLCBNYXRoLmZsb29yKHdhdmUgKiAxLjYpKTsKICAgIGlmICh3YXZlID49IDEwKSBhZGQoJ3doaXRlJywgTWF0aC5mbG9vcih3YXZlICogMS42KSk7CiAgICBpZiAod2F2ZSA+PSAxMSkgYWRkKCd6ZWJyYScsIE1hdGguZmxvb3Iod2F2ZSAqIDEuMikpOwogICAgaWYgKHdhdmUgPj0gMTMpIGFkZCgncHVycGxlJywgTWF0aC5mbG9vcih3YXZlICogMS4xKSwgMTQpOwogICAgaWYgKHdhdmUgPj0gMTIpIGFkZCgnbGVhZCcsIDggKyBNYXRoLmZsb29yKHdhdmUgKiAwLjcpLCAyMik7CiAgICBpZiAod2F2ZSA+PSAxNSkgYWRkKCdyYWluYm93JywgMyArIE1hdGguZmxvb3Iod2F2ZSAqIDAuNyksIDIwKTsKICAgIGlmICh3YXZlID49IDE2KSBhZGQoJ2NlcmFtaWMnLCA0ICsgTWF0aC5mbG9vcih3YXZlIC8gMiksIDI2KTsKICAgIGlmICh3YXZlID49IDIyKSBhZGQoJ2ZvcnRpZmllZCcsIDEgKyBNYXRoLmZsb29yKHdhdmUgLyA1KSwgMzIpOwogICAgaWYgKHdhdmUgJSAxMCA9PT0gMCkgcXVldWUucHVzaCh7IHR5cGU6J21vYWInLCBkZWxheTo4MCwgbGFuZTogd2F2ZSAlIGxhbmVDb3VudCB9KTsKICAgIGlmICh3YXZlICUgMjAgPT09IDApIHF1ZXVlLnB1c2goeyB0eXBlOidiZmInLCBkZWxheToxMjAsIGxhbmU6ICh3YXZlICsgMSkgJSBsYW5lQ291bnQgfSk7CiAgICByZXR1cm4gcXVldWU7CiAgfQoKICBmdW5jdGlvbiBkaXN0YW5jZVRvU2VnbWVudChweCwgcHksIHgxLCB5MSwgeDIsIHkyKSB7CiAgICBjb25zdCBBID0gcHggLSB4MSwgQiA9IHB5IC0geTEsIEMgPSB4MiAtIHgxLCBEID0geTIgLSB5MTsKICAgIGNvbnN0IGRvdCA9IEEgKiBDICsgQiAqIEQ7CiAgICBjb25zdCBsZW5TcSA9IEMgKiBDICsgRCAqIEQ7CiAgICBjb25zdCB0ID0gbGVuU3EgPT09IDAgPyAwIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgZG90IC8gbGVuU3EpKTsKICAgIHJldHVybiBNYXRoLmh5cG90KHB4IC0gKHgxICsgdCAqIEMpLCBweSAtICh5MSArIHQgKiBEKSk7CiAgfQoKICBmdW5jdGlvbiBpc1BvaW50T25BbnlQYXRoKHgsIHkpIHsKICAgIGNvbnN0IHBhdGhzID0gZ2V0TWFwUGF0aHMoKTsKICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykgaWYgKGRpc3RhbmNlVG9TZWdtZW50KHgsIHksIHBhdGhbaV0ueCwgcGF0aFtpXS55LCBwYXRoW2kgKyAxXS54LCBwYXRoW2kgKyAxXS55KSA8PSA0MikgcmV0dXJuIHRydWU7CiAgICByZXR1cm4gZmFsc2U7CiAgfQoKICBmdW5jdGlvbiBibG9vblByb2dyZXNzKGIpIHsKICAgIGNvbnN0IHBhdGggPSBnZXRNYXBQYXRocygpW2IubGFuZV07CiAgICBsZXQgcHJvZ3Jlc3MgPSAwOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiLnBhdGhJZHg7IGkrKykgcHJvZ3Jlc3MgKz0gTWF0aC5oeXBvdChwYXRoW2kgKyAxXS54IC0gcGF0aFtpXS54LCBwYXRoW2kgKyAxXS55IC0gcGF0aFtpXS55KTsKICAgIGlmIChwYXRoW2IucGF0aElkeCArIDFdKSBwcm9ncmVzcyArPSBNYXRoLmh5cG90KGIueCAtIHBhdGhbYi5wYXRoSWR4XS54LCBiLnkgLSBwYXRoW2IucGF0aElkeF0ueSk7CiAgICByZXR1cm4gcHJvZ3Jlc3M7CiAgfQoKICBmdW5jdGlvbiBnZXRUb3dlclVwZ3JhZGVDb3N0KHRvd2VyLCBwYXRoSW5kZXgpIHsKICAgIGNvbnN0IHRpZXIgPSB0b3dlci51cGdyYWRlc1twYXRoSW5kZXhdOwogICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgcmV0dXJuIDI2MCArIHRpZXIgKiAyNDA7CiAgICBpZiAocGF0aEluZGV4ID09PSAxKSByZXR1cm4gMzQwICsgdGllciAqIDMwMDsKICAgIHJldHVybiAzMDAgKyB0aWVyICogMjcwOwogIH0KCiAgZnVuY3Rpb24gY2FuVXBncmFkZVBhdGgodCwgcGF0aEluZGV4KSB7CiAgICAvLyBVUERBVEVEOiAzLXBhdGgsIHRpZXItNSBjYXAuIE9ubHkgMiBwYXRocyBjYW4gYmUgYWN0aXZlLiBUaWVyLTUgbG9ja3Mgb3RoZXJzLgogICAgaWYgKHQudXBncmFkZXNbcGF0aEluZGV4XSA+PSA1KSByZXR1cm4gZmFsc2U7CiAgICBpZiAodC51cGdyYWRlcy5zb21lKChsdmwpID0+IGx2bCA+PSA1ICYmIGx2bCAhPT0gdC51cGdyYWRlc1twYXRoSW5kZXhdKSkgcmV0dXJuIGZhbHNlOwogICAgY29uc3QgYWN0aXZlT3RoZXJQYXRocyA9IHQudXBncmFkZXMuZmlsdGVyKChsdmwsIGkpID0+IGkgIT09IHBhdGhJbmRleCAmJiBsdmwgPiAwKS5sZW5ndGg7CiAgICBpZiAodC51cGdyYWRlc1twYXRoSW5kZXhdID09PSAwICYmIGFjdGl2ZU90aGVyUGF0aHMgPj0gMikgcmV0dXJuIGZhbHNlOwogICAgcmV0dXJuIHRydWU7CiAgfQoKICBmdW5jdGlvbiBuZXh0VXBncmFkZVRleHQodCwgcGF0aEluZGV4KSB7CiAgICBjb25zdCB0aWVyID0gdC51cGdyYWRlc1twYXRoSW5kZXhdOwogICAgaWYgKHRpZXIgPj0gNSkgcmV0dXJuICdNQVgnOwogICAgaWYgKCFjYW5VcGdyYWRlUGF0aCh0LCBwYXRoSW5kZXgpKSByZXR1cm4gJ0Nyb3NzcGF0aCBMb2NrZWQnOwogICAgY29uc3Qga2V5ID0gcGF0aEluZGV4ID09PSAwID8gJ3AxJyA6IHBhdGhJbmRleCA9PT0gMSA/ICdwMicgOiAncDMnOwogICAgY29uc3QgbGlzdCA9IHRvd2VyRGVmc1t0LnR5cGVdLnBhdGhOYW1lcz8uW2tleV0gfHwgW107CiAgICByZXR1cm4gYCR7bGlzdFt0aWVyXSB8fCBgVGllciAke3RpZXIgKyAxfWB9ICgkJHtnZXRUb3dlclVwZ3JhZGVDb3N0KHQsIHBhdGhJbmRleCl9KWA7CiAgfQoKICBmdW5jdGlvbiBhcHBseVRvd2VyVXBncmFkZSh0LCBwYXRoSW5kZXgpIHsKICAgIGlmICghY2FuVXBncmFkZVBhdGgodCwgcGF0aEluZGV4KSkgcmV0dXJuOwogICAgY29uc3QgYmVmb3JlID0gdC51cGdyYWRlc1twYXRoSW5kZXhdOwogICAgaWYgKGJlZm9yZSA+PSA1KSByZXR1cm47CiAgICBjb25zdCB0aWVyID0gYmVmb3JlICsgMTsKCiAgICAvLyBVUERBVEVEOiB0b3dlci1zcGVjaWZpYyAzLXBhdGggdXBncmFkZSBlZmZlY3RzLgogICAgc3dpdGNoICh0LnR5cGUpIHsKICAgICAgY2FzZSAnZGFydCc6CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgeyB0LnBpZXJjZSArPSAxOyB0LnJhbmdlICs9IDEwOyB9CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgeyB0LmZpcmVSYXRlID0gTWF0aC5tYXgoNSwgdC5maXJlUmF0ZSAtIDMpOyBpZiAodGllciA+PSAzKSB0Lm11bHRpU2hvdCA9IE1hdGgubWF4KHQubXVsdGlTaG90IHx8IDEsIDIpOyB9CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdENhbW8gPSB0cnVlOyBpZiAodGllciA+PSAyKSB0LmNhbkhpdExlYWQgPSB0cnVlOyBpZiAodGllciA+PSA0KSB0LmNyaXRDaGFuY2UgPSAwLjI7IH0KICAgICAgICBicmVhazsKICAgICAgY2FzZSAnbmluamEnOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5waWVyY2UgKz0gMjsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDQsIHQuZmlyZVJhdGUgLSAzKTsgaWYgKHRpZXIgPj0gMykgdC5zdHVuVGlja3MgPSAxMDsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5jYW5IaXRDYW1vID0gdHJ1ZTsgaWYgKHRpZXIgPj0gMykgdC5hcm1vckJyZWFrID0gMTsgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICdib21iJzoKICAgICAgICBpZiAocGF0aEluZGV4ID09PSAwKSB7IHQuc3BsYXNoID0gKHQuc3BsYXNoIHx8IDg1KSArIDE4OyB0LmRhbWFnZSArPSAxOyB9CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgeyB0LmZpcmVSYXRlID0gTWF0aC5tYXgoOCwgdC5maXJlUmF0ZSAtIDMpOyBpZiAodGllciA+PSAzKSB0LnN0dW5UaWNrcyA9IDIwOyB9CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdENhbW8gPSB0aWVyID49IDI7IHQuYXJtb3JCcmVhayA9ICh0LmFybW9yQnJlYWsgfHwgMCkgKyAxOyB9CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgJ2ljZSc6CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgeyB0LmZyZWV6ZUR1cmF0aW9uICs9IDIwOyB0LnJhbmdlICs9IDg7IH0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg4LCB0LmZpcmVSYXRlIC0gNCk7IHQuZGFtYWdlICs9IDE7IH0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB7IHQuY2FuSGl0Q2FtbyA9IHRpZXIgPj0gMjsgdC5jYW5IaXRMZWFkID0gdGllciA+PSAzOyB0LmFybW9yQnJlYWsgPSB0aWVyID49IDQgPyAxIDogMDsgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICdzbmlwZXInOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5kYW1hZ2UgKz0gMjsgdC5waWVyY2UgKz0gMTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDgsIHQuZmlyZVJhdGUgLSA2KTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5jYW5IaXRDYW1vID0gdHJ1ZTsgdC5jYW5IaXRMZWFkID0gdHJ1ZTsgaWYgKHRpZXIgPj0gMykgdC5zdHVuVGlja3MgPSAxMjsgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICdib29tZXJhbmcnOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5waWVyY2UgKz0gMjsgdC5yYW5nZSArPSAxMDsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDUsIHQuZmlyZVJhdGUgLSAzKTsgaWYgKHRpZXIgPj0gMykgdC5tdWx0aVNob3QgPSAyOyB9CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdExlYWQgPSB0aWVyID49IDI7IGlmICh0aWVyID49IDQpIHQuc3R1blRpY2tzID0gODsgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICd0YWNrJzoKICAgICAgICBpZiAocGF0aEluZGV4ID09PSAwKSB7IHQuYnVyc3QgPSAodC5idXJzdCB8fCA2KSArIDI7IH0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg0LCB0LmZpcmVSYXRlIC0gMik7IH0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB7IHQuYnVyblRpY2tzID0gKHQuYnVyblRpY2tzIHx8IDApICsgMjA7IHQuYnVybkRhbWFnZSA9ICh0LmJ1cm5EYW1hZ2UgfHwgMCkgKyAxOyB9CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgJ2dsdWUnOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5nbHVlVGlja3MgKz0gMzA7IHQuZ2x1ZVNsb3cgPSBNYXRoLm1heCgwLjIsIHQuZ2x1ZVNsb3cgLSAwLjA2KTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDgsIHQuZmlyZVJhdGUgLSAzKTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5hcm1vckJyZWFrID0gKHQuYXJtb3JCcmVhayB8fCAwKSArIDE7IHQuY2FuSGl0Q2FtbyA9IHRpZXIgPj0gMzsgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICd2aWxsYWdlJzoKICAgICAgICBpZiAocGF0aEluZGV4ID09PSAwKSB0LnJhbmdlICs9IDE4OwogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHQuZGlzY291bnQgPSBNYXRoLm1pbigwLjMsICh0LmRpc2NvdW50IHx8IDApICsgMC4wNik7CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LnN1cHBvcnREZXRlY3QgPSB0aWVyID49IDE7IHQuc3VwcG9ydExlYWQgPSB0aWVyID49IDI7IHQuc3VwcG9ydERhbWFnZSA9IHRpZXIgPj0gNCA/IDIgOiAxOyB9CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgJ3N1cHBvcnQnOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHQucmFuZ2UgKz0gMjA7CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgdC5zdXBwb3J0U3BlZWQgPSBNYXRoLm1pbigwLjQsICh0LnN1cHBvcnRTcGVlZCB8fCAwKSArIDAuMDgpOwogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5zdXBwb3J0RGV0ZWN0ID0gdHJ1ZTsgdC5zdXBwb3J0TGVhZCA9IHRpZXIgPj0gMjsgdC5zdXBwb3J0QXJtb3JCcmVhayA9IE1hdGgubWluKDMsICh0LnN1cHBvcnRBcm1vckJyZWFrIHx8IDApICsgMSk7IH0KICAgICAgICBicmVhazsKICAgICAgY2FzZSAnZmFybSc6CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgdC5mYXJtSW5jb21lID0gKHQuZmFybUluY29tZSB8fCA0NSkgKyAyNTsKICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB0LmZhcm1SYXRlID0gTWF0aC5tYXgoNDAsICh0LmZhcm1SYXRlIHx8IDI0MCkgLSAyNSk7CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgdC5hdXRvQ29sbGVjdCA9IHRydWU7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgJ3N1cGVyJzoKICAgICAgY2FzZSAnbGFzZXInOgogICAgICBjYXNlICdwbGFzbWEnOgogICAgICBjYXNlICdzdW4nOgogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5kYW1hZ2UgKz0gMjsgdC5waWVyY2UgKz0gMTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDMsIHQuZmlyZVJhdGUgLSAyKTsgfQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5jYW5IaXRDYW1vID0gdHJ1ZTsgdC5jYW5IaXRMZWFkID0gdHJ1ZTsgdC5hcm1vckJyZWFrID0gKHQuYXJtb3JCcmVhayB8fCAwKSArIDE7IH0KICAgICAgICBicmVhazsKICAgICAgZGVmYXVsdDoKICAgICAgICBpZiAocGF0aEluZGV4ID09PSAwKSB0LnJhbmdlICs9IDEwOwogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHQuZmlyZVJhdGUgPSBNYXRoLm1heCg2LCB0LmZpcmVSYXRlIC0gMik7CiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgdC5kYW1hZ2UgKz0gMTsKICAgICAgICBicmVhazsKICAgIH0KCiAgICB0LnVwZ3JhZGVzW3BhdGhJbmRleF0gKz0gMTsKCiAgICBpZiAoIXQucHJvICYmICh0LnVwZ3JhZGVzWzBdID49IDUgfHwgdC51cGdyYWRlc1sxXSA+PSA1IHx8IHQudXBncmFkZXNbMl0gPj0gNSkpIHsKICAgICAgdC5wcm8gPSB0cnVlOwogICAgICBpZiAodC50eXBlICE9PSAndmlsbGFnZScpIHsKICAgICAgICB0LmRhbWFnZSArPSAyOwogICAgICAgIHQucGllcmNlICs9IDI7CiAgICAgICAgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDUsIHQuZmlyZVJhdGUgLSAyKTsKICAgICAgfQogICAgICB0LnJhbmdlICs9IDIyOwogICAgfQoKICAgIHJlY2FsY1ZpbGxhZ2VCdWZmcygpOwogIH0KCiAgZnVuY3Rpb24gYXBwbHlQcm9NYXN0ZXJ5KHQpIHsKICAgIGNvbnN0IGNvc3QgPSAyMjAwOwogICAgaWYgKCF0IHx8IHQucHJvTWFzdGVyeSB8fCAhdC5wcm8pIHJldHVybjsKICAgIGlmIChzdGF0ZS5tb25leSA8IGNvc3QpIHJldHVybjsKICAgIHN0YXRlLm1vbmV5IC09IGNvc3Q7CiAgICB0LnByb01hc3RlcnkgPSB0cnVlOwogICAgaWYgKHQudHlwZSAhPT0gJ3ZpbGxhZ2UnKSB7CiAgICAgIHQuZGFtYWdlICs9IDM7CiAgICAgIHQucGllcmNlICs9IDM7CiAgICAgIHQuZmlyZVJhdGUgPSBNYXRoLm1heCg0LCB0LmZpcmVSYXRlIC0gMyk7CiAgICB9CiAgICB0LnJhbmdlICs9IDMwOwogICAgaWYgKHQudHlwZSA9PT0gJ3ZpbGxhZ2UnKSB0LmRpc2NvdW50ID0gTWF0aC5taW4oMC40LCAodC5kaXNjb3VudCB8fCAwKSArIDAuMSk7CiAgICByZWNhbGNWaWxsYWdlQnVmZnMoKTsKICB9CgogIGZ1bmN0aW9uIGJ1eU1ldGFVcGdyYWRlKHdoaWNoKSB7CiAgICBpZiAocHJvZ3Jlc3Npb24ucG9pbnRzIDw9IDApIHJldHVybjsKICAgIGlmICh3aGljaCA9PT0gJ3NwZWVkJyAmJiBwcm9ncmVzc2lvbi5hdHRhY2tTcGVlZExldmVsIDwgOCkgeyBwcm9ncmVzc2lvbi5hdHRhY2tTcGVlZExldmVsICs9IDE7IHByb2dyZXNzaW9uLnBvaW50cyAtPSAxOyB9CiAgICBpZiAod2hpY2ggPT09ICdjYXNoJyAmJiBwcm9ncmVzc2lvbi5zdGFydGluZ0Nhc2hMZXZlbCA8IDgpIHsgcHJvZ3Jlc3Npb24uc3RhcnRpbmdDYXNoTGV2ZWwgKz0gMTsgcHJvZ3Jlc3Npb24ucG9pbnRzIC09IDE7IGFwcGx5TWV0YUJvbnVzZXMoKTsgfQogIH0KCiAgZnVuY3Rpb24gcmVjYWxjVmlsbGFnZUJ1ZmZzKCkgewogICAgZm9yIChjb25zdCB0IG9mIHRvd2VycykgewogICAgICB0LnZpbGxhZ2VCdWZmID0geyByYW5nZTogMCwgc3BlZWQ6IDAsIGNhbW86IGZhbHNlLCBsZWFkOiBmYWxzZSwgZGlzY291bnQ6IDAsIGRhbWFnZTogMCwgcGllcmNlOiAwLCBhcm1vckJyZWFrOiAwIH07CiAgICB9CiAgICBjb25zdCB2aWxsYWdlcyA9IHRvd2Vycy5maWx0ZXIodCA9PiB0LnR5cGUgPT09ICd2aWxsYWdlJyk7CiAgICBmb3IgKGNvbnN0IHYgb2YgdmlsbGFnZXMpIHsKICAgICAgY29uc3QgciA9IHYucmFuZ2U7CiAgICAgIGZvciAoY29uc3QgdCBvZiB0b3dlcnMpIHsKICAgICAgICBpZiAodCA9PT0gdikgY29udGludWU7CiAgICAgICAgaWYgKE1hdGguaHlwb3QodC54IC0gdi54LCB0LnkgLSB2LnkpID4gcikgY29udGludWU7CiAgICAgICAgY29uc3QgYSA9IHYudXBncmFkZXNbMF0sIGIgPSB2LnVwZ3JhZGVzWzFdOwogICAgICAgIHQudmlsbGFnZUJ1ZmYucmFuZ2UgPSBNYXRoLm1heCh0LnZpbGxhZ2VCdWZmLnJhbmdlLCBhID49IDEgPyAyMCA6IDApOwogICAgICAgIHQudmlsbGFnZUJ1ZmYuc3BlZWQgPSBNYXRoLm1heCh0LnZpbGxhZ2VCdWZmLnNwZWVkLCBhID49IDIgPyAwLjI0IDogMCk7CiAgICAgICAgaWYgKGEgPj0gMyB8fCBiID49IDMpIHQudmlsbGFnZUJ1ZmYuY2FtbyA9IHRydWU7CiAgICAgICAgaWYgKGIgPj0gNCkgdC52aWxsYWdlQnVmZi5sZWFkID0gdHJ1ZTsKICAgICAgICB0LnZpbGxhZ2VCdWZmLmRpc2NvdW50ID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5kaXNjb3VudCwgYiA+PSAxID8gMC4wOCA6IDAsIGIgPj0gMiA/IDAuMTYgOiAwKTsKICAgICAgICB0LnZpbGxhZ2VCdWZmLmRhbWFnZSA9IE1hdGgubWF4KHQudmlsbGFnZUJ1ZmYuZGFtYWdlLCB2LnN1cHBvcnREYW1hZ2UgfHwgMCk7CiAgICAgIH0KICAgIH0KICAgIC8vIE5FVzogc3VwcG9ydCB0b3dlciBhdXJhIGJ1ZmZzLgogICAgY29uc3Qgc3VwcG9ydHMgPSB0b3dlcnMuZmlsdGVyKCh0KSA9PiB0LnR5cGUgPT09ICdzdXBwb3J0Jyk7CiAgICBmb3IgKGNvbnN0IHMgb2Ygc3VwcG9ydHMpIHsKICAgICAgZm9yIChjb25zdCB0IG9mIHRvd2VycykgewogICAgICAgIGlmICh0ID09PSBzKSBjb250aW51ZTsKICAgICAgICBpZiAoTWF0aC5oeXBvdCh0LnggLSBzLngsIHQueSAtIHMueSkgPiBzLnJhbmdlKSBjb250aW51ZTsKICAgICAgICB0LnZpbGxhZ2VCdWZmLnJhbmdlID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5yYW5nZSwgKHMudXBncmFkZXNbMF0gfHwgMCkgKiAxMik7CiAgICAgICAgdC52aWxsYWdlQnVmZi5zcGVlZCA9IE1hdGgubWF4KHQudmlsbGFnZUJ1ZmYuc3BlZWQsIHMuc3VwcG9ydFNwZWVkIHx8IDApOwogICAgICAgIGlmIChzLnN1cHBvcnREZXRlY3QpIHQudmlsbGFnZUJ1ZmYuY2FtbyA9IHRydWU7CiAgICAgICAgaWYgKHMuc3VwcG9ydExlYWQpIHQudmlsbGFnZUJ1ZmYubGVhZCA9IHRydWU7CiAgICAgICAgdC52aWxsYWdlQnVmZi5hcm1vckJyZWFrID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5hcm1vckJyZWFrLCBzLnN1cHBvcnRBcm1vckJyZWFrIHx8IDApOwogICAgICAgIHQudmlsbGFnZUJ1ZmYuZGFtYWdlID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5kYW1hZ2UsIHMuc3VwcG9ydERhbWFnZSB8fCAwKTsKICAgICAgfQogICAgfQogIH0KCiAgZnVuY3Rpb24gcGlja1RhcmdldCh0b3dlcikgewogICAgY29uc3QgcmFuZ2UgPSB0b3dlci5yYW5nZSArICh0b3dlci52aWxsYWdlQnVmZj8ucmFuZ2UgfHwgMCk7CiAgICBjb25zdCBpblJhbmdlID0gYmxvb25zLmZpbHRlcigoYikgPT4gTWF0aC5oeXBvdChiLnggLSB0b3dlci54LCBiLnkgLSB0b3dlci55KSA8PSByYW5nZSk7CiAgICBpZiAoIWluUmFuZ2UubGVuZ3RoKSByZXR1cm4gbnVsbDsKICAgIGlmICh0b3dlci50YXJnZXRNb2RlID09PSAnbGFzdCcpIHJldHVybiBpblJhbmdlLnJlZHVjZSgoYSwgYikgPT4gKGJsb29uUHJvZ3Jlc3MoYSkgPCBibG9vblByb2dyZXNzKGIpID8gYSA6IGIpKTsKICAgIGlmICh0b3dlci50YXJnZXRNb2RlID09PSAnc3Ryb25nJykgcmV0dXJuIGluUmFuZ2UucmVkdWNlKChhLCBiKSA9PiAoYS5ocCA+IGIuaHAgPyBhIDogYikpOwogICAgaWYgKHRvd2VyLnRhcmdldE1vZGUgPT09ICdjbG9zZScpIHJldHVybiBpblJhbmdlLnJlZHVjZSgoYSwgYikgPT4gKE1hdGguaHlwb3QoYS54IC0gdG93ZXIueCwgYS55IC0gdG93ZXIueSkgPCBNYXRoLmh5cG90KGIueCAtIHRvd2VyLngsIGIueSAtIHRvd2VyLnkpID8gYSA6IGIpKTsKICAgIHJldHVybiBpblJhbmdlLnJlZHVjZSgoYSwgYikgPT4gKGJsb29uUHJvZ3Jlc3MoYSkgPiBibG9vblByb2dyZXNzKGIpID8gYSA6IGIpKTsKICB9CgogIGZ1bmN0aW9uIGhpdEJsb29uKGIsIHApIHsKICAgIC8vIFVQREFURUQ6IHNwZWNpYWwgZWZmZWN0cyAoY2Ftby9sZWFkIGNoZWNrcywgYnVybiwgc3R1biwgYXJtb3IgYnJlYWspCiAgICBpZiAoYi5jYW1vICYmICFwLmNhbkhpdENhbW8pIHJldHVybjsKICAgIGlmIChiLnR5cGUgPT09ICdsZWFkJyAmJiAhcC5jYW5IaXRMZWFkICYmIHAudHlwZSAhPT0gJ2JvbWInKSByZXR1cm47CiAgICBjb25zdCBpbW11bml0eSA9IHAudHlwZSA9PT0gJ2JvbWInID8gJ2V4cGxvc2l2ZScgOiBwLnR5cGUgPT09ICdpY2UnID8gJ2ljZScgOiAnc2hhcnAnOwogICAgaWYgKGIuaW1tdW5pdGllcy5pbmNsdWRlcyhpbW11bml0eSkpIHJldHVybjsKCiAgICBpZiAocC50eXBlID09PSAnZ2x1ZScpIHsKICAgICAgYi5nbHVlVGlja3NBY3RpdmUgPSBNYXRoLm1heChiLmdsdWVUaWNrc0FjdGl2ZSwgcC5nbHVlVGlja3MgPz8gMTAwKTsKICAgICAgYi5nbHVlZEZhY3RvciA9IE1hdGgubWluKGIuZ2x1ZWRGYWN0b3IsIHAuZ2x1ZVNsb3cgPz8gMC41NSk7CiAgICB9CgogICAgaWYgKHAuc3R1blRpY2tzKSBiLnN0dW5UaWNrcyA9IE1hdGgubWF4KGIuc3R1blRpY2tzIHx8IDAsIHAuc3R1blRpY2tzKTsKICAgIGlmIChwLmJ1cm5UaWNrcykgewogICAgICBiLmJ1cm5UaWNrcyA9IE1hdGgubWF4KGIuYnVyblRpY2tzIHx8IDAsIHAuYnVyblRpY2tzKTsKICAgICAgYi5idXJuRGFtYWdlID0gTWF0aC5tYXgoYi5idXJuRGFtYWdlIHx8IDAsIHAuYnVybkRhbWFnZSB8fCAxKTsKICAgIH0KICAgIGNvbnN0IGFybW9yQnJlYWsgPSBwLmFybW9yQnJlYWsgfHwgMDsKICAgIGlmIChhcm1vckJyZWFrID4gMCkgYi5hcm1vckJyb2tlbiA9IE1hdGgubWF4KGIuYXJtb3JCcm9rZW4gfHwgMCwgYXJtb3JCcmVhayAqIDYwKTsKICAgIGNvbnN0IGFybW9yTWl0aWdhdGlvbiA9IGIuYXJtb3JCcm9rZW4gPiAwID8gMCA6ICgoYi50eXBlID09PSAnZm9ydGlmaWVkJyB8fCBiLnR5cGUgPT09ICdsZWFkJykgPyAxIDogMCk7CiAgICBiLmhwIC09IE1hdGgubWF4KDAsIHAuZGFtYWdlIC0gYXJtb3JNaXRpZ2F0aW9uKTsKICAgIGlmIChwLnR5cGUgPT09ICdpY2UnKSBiLnNsb3dUaWNrcyA9IE1hdGgubWF4KGIuc2xvd1RpY2tzLCBwLmZyZWV6ZUR1cmF0aW9uIHx8IDgwKTsKCiAgICBpZiAoYi5ocCA8PSAwKSB7CiAgICAgIGNvbnN0IHJld2FyZE11bHQgPSBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XS5jYXNoTXVsdDsKICAgICAgc3RhdGUubW9uZXkgKz0gTWF0aC5mbG9vcihiLnJld2FyZCAqIHJld2FyZE11bHQpOwogICAgICBnYWluWHAoNCArIE1hdGguZmxvb3IoYi5tYXhIcCAvIDQpKTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHN0YXJ0V2F2ZSgpIHsKICAgIGlmICh3YXZlSW5Qcm9ncmVzcyB8fCBnYW1lT3ZlciB8fCBydW5Xb24pIHJldHVybjsKICAgIHdhdmVRdWV1ZSA9IGJ1aWxkV2F2ZShzdGF0ZS53YXZlKTsKICAgIHNwYXduVGltZXIgPSAwOwogICAgd2F2ZUluUHJvZ3Jlc3MgPSB0cnVlOwogICAgc3RhdGUuc2VsZWN0ZWRUb3dlciA9IG51bGw7CiAgfQoKICBmdW5jdGlvbiByZXNldFJ1bigpIHsKICAgIHRvd2Vycy5sZW5ndGggPSAwOyBibG9vbnMubGVuZ3RoID0gMDsgcHJvamVjdGlsZXMubGVuZ3RoID0gMDsgcGxhY2VkQWdlbnRzLmxlbmd0aCA9IDA7CiAgICB3YXZlUXVldWUgPSBbXTsgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTsgc3Bhd25UaW1lciA9IDA7CiAgICB3aGVlbEFjY3VtU2hvcCA9IDA7IHdoZWVsQWNjdW1NYXAgPSAwOyBnYW1lT3ZlciA9IGZhbHNlOyBydW5Xb24gPSBmYWxzZTsKICAgIHN0YXRlLndhdmUgPSAxOyBzdGF0ZS5saXZlcyA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldLmxpdmVzOwogICAgYWdlbnRzLnNwaWtlcyA9IDM7IGFnZW50cy5nbHVlVHJhcCA9IDI7IGFnZW50cy5mYXJtZXIgPSAxOyBhZ2VudE1vZGUgPSBudWxsOwogICAgYXBwbHlNZXRhQm9udXNlcygpOwogIH0KCiAgZnVuY3Rpb24gcGxhY2VBZ2VudCgpIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGFnZW50cyByZW1vdmVkCgogIGZ1bmN0aW9uIGRyb3BDYXNoQ3JhdGUoKSB7fQoKICAvLyBORVc6IHNoYXJlZCBsYXlvdXQgbW9kZWwgc28gZHJhdyArIGNsaWNrIGhpdGJveGVzIGFsd2F5cyBtYXRjaC4KICBmdW5jdGlvbiBnZXRUb3dlckNhcmRMYXlvdXQocGFuZWxYKSB7CiAgICBjb25zdCBjYXJkWSA9IGhlaWdodCAtIDM4ODsKICAgIHJldHVybiB7CiAgICAgIGNhcmRZLAogICAgICBwMTogeyB4MTogcGFuZWxYICsgMjAsIHgyOiBwYW5lbFggKyAxMDQsIHkxOiBjYXJkWSArIDk0LCB5MjogY2FyZFkgKyAxMjIgfSwKICAgICAgcDI6IHsgeDE6IHBhbmVsWCArIDExMCwgeDI6IHBhbmVsWCArIDE5NCwgeTE6IGNhcmRZICsgOTQsIHkyOiBjYXJkWSArIDEyMiB9LAogICAgICBwMzogeyB4MTogcGFuZWxYICsgMjAwLCB4MjogcGFuZWxYICsgMjk0LCB5MTogY2FyZFkgKyA5NCwgeTI6IGNhcmRZICsgMTIyIH0sCiAgICAgIHRhcmdldDogeyB4MTogcGFuZWxYICsgMjAsIHgyOiBwYW5lbFggKyAyOTQsIHkxOiBjYXJkWSArIDEyNiwgeTI6IGNhcmRZICsgMTQ0IH0sCiAgICAgIG1hc3Rlcnk6IHsgeDE6IHBhbmVsWCArIDIwLCB4MjogcGFuZWxYICsgMjk0LCB5MTogY2FyZFkgKyAxNDgsIHkyOiBjYXJkWSArIDE2NiB9LAogICAgICBzZWxsOiB7IHgxOiBwYW5lbFggKyAyMCwgeDI6IHBhbmVsWCArIDI5NCwgeTE6IGNhcmRZICsgMTcwLCB5MjogY2FyZFkgKyAxODggfSwKICAgIH07CiAgfQoKICBmdW5jdGlvbiB1cGRhdGVBZ2VudHMoKSB7fQoKICBmdW5jdGlvbiBkcmF3SG9tZSgpIHsKICAgIGNvbnN0IHBsYXlXaWR0aCA9IHdpZHRoIC0gU0lERV9QQU5FTDsKICAgIGNvbnN0IHBsYXlDZW50ZXJYID0gcGxheVdpZHRoIC8gMiArIEhPTUVfQ0VOVEVSX1hfT0ZGU0VUOwoKICAgIGN0eC5maWxsU3R5bGUgPSAnIzEwMmE0Myc7CiAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7CgogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsKICAgIGN0eC5mb250ID0gJzcwMCA1MnB4IHNhbnMtc2VyaWYnOwogICAgY3R4LmZpbGxUZXh0KCdDT05TT0xFIFRPV0VSIERFRkVOU0UgKE1FUkdFRCknLCBwbGF5Q2VudGVyWCAtIDM4NSwgMTEwKTsKICAgIGN0eC5mb250ID0gJzUwMCAxOHB4IHNhbnMtc2VyaWYnOwogICAgY3R4LmZpbGxUZXh0KCdQaWNrIG1hcCArIGRpZmZpY3VsdHksIHVubG9jayBwcmVtaXVtIHRvd2VycywgdGhlbiBTVEFSVCBHQU1FJywgcGxheUNlbnRlclggLSAyNTAsIDE0NSk7CiAgICBjdHguZm9udCA9ICc3MDAgMjBweCBzYW5zLXNlcmlmJzsKICAgIGN0eC5maWxsVGV4dChgQmFuazogJHtwcm9maWxlLmNvaW5zfSBDb2lucyB8IE1vbmtleSBNb25leTogJHtwcm9maWxlLm1vbmtleU1vbmV5fWAsIHBsYXlDZW50ZXJYIC0gMTkwLCAxNzUpOwoKICAgIGNvbnN0IGNhcmRXID0gMjIwLCBnYXAgPSAyNjsKICAgIGNvbnN0IHZpc2libGVNYXBDYXJkcyA9IE1hdGgubWluKDQsIG1hcERlZnMubGVuZ3RoKTsKICAgIGNvbnN0IG1heE1hcFNjcm9sbCA9IE1hdGgubWF4KDAsIG1hcERlZnMubGVuZ3RoIC0gdmlzaWJsZU1hcENhcmRzKTsKICAgIG1hcFNjcm9sbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1hcFNjcm9sbCwgbWF4TWFwU2Nyb2xsKSk7CiAgICBjb25zdCB0b3RhbFcgPSB2aXNpYmxlTWFwQ2FyZHMgKiBjYXJkVyArICh2aXNpYmxlTWFwQ2FyZHMgLSAxKSAqIGdhcDsKICAgIGNvbnN0IHN0YXJ0WCA9IChwbGF5V2lkdGggLSB0b3RhbFcpIC8gMjsKICAgIGNvbnN0IHkgPSAyMjA7CgogICAgY29uc3QgdmlzaWJsZU1hcHMgPSBtYXBEZWZzLnNsaWNlKG1hcFNjcm9sbCwgbWFwU2Nyb2xsICsgdmlzaWJsZU1hcENhcmRzKTsKICAgIHZpc2libGVNYXBzLmZvckVhY2goKG0sIGlkeCkgPT4gewogICAgICBjb25zdCBpID0gbWFwU2Nyb2xsICsgaWR4OwogICAgICBjb25zdCB4ID0gc3RhcnRYICsgaWR4ICogKGNhcmRXICsgZ2FwKTsKICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLnNlbGVjdGVkTWFwID09PSBpID8gJyNmZmQxNjYnIDogJyMzMjRhNWYnOwogICAgICBjdHguZmlsbFJlY3QoeCwgeSwgY2FyZFcsIDE3MCk7CiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7CiAgICAgIGN0eC5mb250ID0gJzcwMCAyMHB4IHNhbnMtc2VyaWYnOwogICAgICBjdHguZmlsbFRleHQobS5uYW1lLCB4ICsgMjAsIHkgKyAzNCk7CiAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7CiAgICAgIGN0eC5maWxsVGV4dChgJHttLmxhbmVzLmxlbmd0aH0gcGF0aChzKWAsIHggKyAyMCwgeSArIDYyKTsKICAgIH0pOwoKICAgIGlmIChtYXhNYXBTY3JvbGwgPiAwKSB7CiAgICAgIGNvbnN0IGFycm93VyA9IDQwOwogICAgICBjb25zdCBhcnJvd0dhcCA9IDE0OwogICAgICBjb25zdCBsZWZ0WCA9IHN0YXJ0WCAtIGFycm93R2FwIC0gYXJyb3dXOwogICAgICBjb25zdCByaWdodFggPSBzdGFydFggKyB0b3RhbFcgKyBhcnJvd0dhcDsKICAgICAgY29uc3QgYXJyb3dZID0geSArIDYyOwogICAgICBjdHguZmlsbFN0eWxlID0gbWFwU2Nyb2xsID4gMCA/ICcjZmZkMTY2JyA6ICcjNWQ2ZjgwJzsKICAgICAgY3R4LmZpbGxSZWN0KGxlZnRYLCBhcnJvd1ksIDQwLCA0NCk7CiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7CiAgICAgIGN0eC5mb250ID0gJzcwMCAyNHB4IHNhbnMtc2VyaWYnOwogICAgICBjdHguZmlsbFRleHQoJ+KAuScsIGxlZnRYICsgMTQsIGFycm93WSArIDI5KTsKCiAgICAgIGN0eC5maWxsU3R5bGUgPSBtYXBTY3JvbGwgPCBtYXhNYXBTY3JvbGwgPyAnI2ZmZDE2NicgOiAnIzVkNmY4MCc7CiAgICAgIGN0eC5maWxsUmVjdChyaWdodFgsIGFycm93WSwgNDAsIDQ0KTsKICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJzsKICAgICAgY3R4LmZpbGxUZXh0KCfigLonLCByaWdodFggKyAxNCwgYXJyb3dZICsgMjkpOwoKICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZDdlM2ZjJzsKICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJzsKICAgICAgY29uc3QgbWFwSW5mbyA9IGBNYXBzICR7bWFwU2Nyb2xsICsgMX0tJHtNYXRoLm1pbihtYXBEZWZzLmxlbmd0aCwgbWFwU2Nyb2xsICsgdmlzaWJsZU1hcENhcmRzKX0gLyAke21hcERlZnMubGVuZ3RofSAoc2Nyb2xsIHdoZWVsIHdvcmtzIHRvbylgOwogICAgICBjb25zdCBpbmZvWCA9IHN0YXJ0WCArIHRvdGFsVyAvIDIgLSBjdHgubWVhc3VyZVRleHQobWFwSW5mbykud2lkdGggLyAyOwogICAgICBjdHguZmlsbFRleHQobWFwSW5mbywgaW5mb1gsIHkgKyAxOTApOwogICAgfQoKICAgIGNvbnN0IGRpZmZZID0gNDE1OwogICAgY29uc3QgZGlmZktleXMgPSBbJ2Vhc3knLCAnbWVkaXVtJywgJ2hhcmQnLCAnaW1wb3BwYWJsZSddOwogICAgZGlmZktleXMuZm9yRWFjaCgoZCwgaWR4KSA9PiB7CiAgICAgIGNvbnN0IHggPSBwbGF5Q2VudGVyWCAtIDI2NSArIGlkeCAqIDEzMjsKICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLmRpZmZpY3VsdHkgPT09IGQgPyAnI2ZmZDE2NicgOiAnIzNhNTA2Yic7CiAgICAgIGN0eC5maWxsUmVjdCh4LCBkaWZmWSwgMTIyLCAzNik7CiAgICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5kaWZmaWN1bHR5ID09PSBkID8gJyMxMTEnIDogJyNmZmYnOwogICAgICBjdHguZm9udCA9ICc3MDAgMTZweCBzYW5zLXNlcmlmJzsKICAgICAgY3R4LmZpbGxUZXh0KGRpZmZpY3VsdHlEZWZzW2RdLm5hbWUsIHggKyAxOCwgZGlmZlkgKyAyNCk7CiAgICB9KTsKICAgIGN0eC5maWxsU3R5bGUgPSAnI2Q3ZTNmYyc7CiAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnOwogICAgY29uc3QgYmFzZVdpbiA9IDgwICsgTUFYX1dBVkVTICogNjsKICAgIGN0eC5maWxsVGV4dChgV2luIENvaW5zOiBFYXN5ICR7TWF0aC5mbG9vcihiYXNlV2luICogZGlmZmljdWx0eURlZnMuZWFzeS5jb2luTXVsdCl9IHwgTWVkaXVtICR7TWF0aC5mbG9vcihiYXNlV2luICogZGlmZmljdWx0eURlZnMubWVkaXVtLmNvaW5NdWx0KX0gfCBIYXJkICR7TWF0aC5mbG9vcihiYXNlV2luICogZGlmZmljdWx0eURlZnMuaGFyZC5jb2luTXVsdCl9YCwgcGxheUNlbnRlclggLSAyNTAsIDQ2Myk7CgogICAgY3R4LmZpbGxTdHlsZSA9ICcjMmE5ZDhmJzsKICAgIGN0eC5maWxsUmVjdChwbGF5Q2VudGVyWCAtIDEyMCwgNDcwLCAyNDAsIDU2KTsKICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7CiAgICBjdHguZm9udCA9ICc3MDAgMjRweCBzYW5zLXNlcmlmJzsKICAgIGN0eC5maWxsVGV4dCgnU1RBUlQgR0FNRScsIHBsYXlDZW50ZXJYIC0gNzQsIDUwNik7CgogICAgY29uc3QgcHJlbWl1bUtleXMgPSBPYmplY3Qua2V5cyh0b3dlckRlZnMpLmZpbHRlcigoaykgPT4gdG93ZXJEZWZzW2tdLnVubG9ja0NvaW5zKTsKICAgIGNvbnN0IHByZW1pdW1ZID0gNTYwLCBwcmVtaXVtQ2FyZFcgPSAxNTAsIHByZW1pdW1HYXAgPSAxMjsKICAgIGNvbnN0IHByZW1pdW1Ub3RhbFcgPSBwcmVtaXVtS2V5cy5sZW5ndGggKiBwcmVtaXVtQ2FyZFcgKyBNYXRoLm1heCgwLCBwcmVtaXVtS2V5cy5sZW5ndGggLSAxKSAqIHByZW1pdW1HYXA7CiAgICBjb25zdCBwcmVtaXVtU3RhcnRYID0gcGxheUNlbnRlclggLSBwcmVtaXVtVG90YWxXIC8gMjsKICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5mb250ID0gJzcwMCAxOHB4IHNhbnMtc2VyaWYnOwogICAgY29uc3QgcHJlbWl1bVRpdGxlID0gJ1ByZW1pdW0gVG93ZXIgVW5sb2NrcyAoSG9tZSBPbmx5KSc7CiAgICBjdHguZmlsbFRleHQocHJlbWl1bVRpdGxlLCBwbGF5Q2VudGVyWCAtIGN0eC5tZWFzdXJlVGV4dChwcmVtaXVtVGl0bGUpLndpZHRoIC8gMiwgcHJlbWl1bVkgLSAxMik7CgogICAgcHJlbWl1bUtleXMuZm9yRWFjaCgoaywgaSkgPT4gewogICAgICBjb25zdCBkID0gdG93ZXJEZWZzW2tdOwogICAgICBjb25zdCB4ID0gcHJlbWl1bVN0YXJ0WCArIGkgKiAocHJlbWl1bUNhcmRXICsgcHJlbWl1bUdhcCk7CiAgICAgIGNvbnN0IHVubG9ja2VkID0gcHJvZmlsZS51bmxvY2tlZFNwZWNpYWxUb3dlcnNba107CiAgICAgIGN0eC5maWxsU3R5bGUgPSB1bmxvY2tlZCA/ICcjMmU3ZDMyJyA6ICcjMzc0NzRmJzsKICAgICAgY3R4LmZpbGxSZWN0KHgsIHByZW1pdW1ZLCBwcmVtaXVtQ2FyZFcsIDg0KTsKICAgICAgY3R4LmZpbGxTdHlsZSA9IHVubG9ja2VkID8gJyNjOGU2YzknIDogJyNmZmYnOwogICAgICBjdHguZm9udCA9ICc3MDAgMTVweCBzYW5zLXNlcmlmJzsKICAgICAgY3R4LmZpbGxUZXh0KGAke2QuaWNvbn0gJHtkLm5hbWV9YCwgeCArIDEwLCBwcmVtaXVtWSArIDI1KTsKICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJzsKICAgICAgY3R4LmZpbGxUZXh0KHVubG9ja2VkID8gJ1VubG9ja2VkJyA6IGAke2QudW5sb2NrQ29pbnN9IGNvaW5zYCwgeCArIDEwLCBwcmVtaXVtWSArIDQ2KTsKICAgICAgY3R4LmZpbGxUZXh0KHVubG9ja2VkID8gJ1JlYWR5IGluIFNIT1AnIDogJ0NsaWNrIHRvIHVubG9jaycsIHggKyAxMCwgcHJlbWl1bVkgKyA2Nik7CiAgICB9KTsKCiAgICBjb25zdCBhZG1pblcgPSAxNDg7CiAgICBjb25zdCBhZG1pblggPSBwbGF5Q2VudGVyWCAtIGFkbWluVyAvIDI7CiAgICBjdHguZmlsbFN0eWxlID0gYWRtaW5VbmxvY2tlZCA/ICcjZmZkMTY2JyA6ICcjM2EzYTNhJzsKICAgIGN0eC5maWxsUmVjdChhZG1pblgsIDIwLCBhZG1pblcsIDMyKTsKICAgIGN0eC5maWxsU3R5bGUgPSBhZG1pblVubG9ja2VkID8gJyMxMTEnIDogJyNiYmInOwogICAgY3R4LmZvbnQgPSAnNzAwIDEzcHggc2Fucy1zZXJpZic7CiAgICBjb25zdCBhZG1pbkxhYmVsID0gYWRtaW5VbmxvY2tlZCA/ICfimpkgQWRtaW4gUGFuZWwnIDogJ/CflJIgQWRtaW4gTG9naW4nOwogICAgY3R4LmZpbGxUZXh0KGFkbWluTGFiZWwsIHBsYXlDZW50ZXJYIC0gY3R4Lm1lYXN1cmVUZXh0KGFkbWluTGFiZWwpLndpZHRoIC8gMiwgNDEpOwogIH0KCiAgZnVuY3Rpb24gdXBkYXRlKCkgewogICAgaWYgKGdhbWVPdmVyIHx8IHJ1bldvbikgcmV0dXJuOwoKICAgIGlmICh3YXZlSW5Qcm9ncmVzcyAmJiB3YXZlUXVldWUubGVuZ3RoID4gMCAmJiBzcGF3blRpbWVyIDw9IDApIHsKICAgICAgY29uc3QgbmV4dCA9IHdhdmVRdWV1ZS5zaGlmdCgpOwogICAgICBibG9vbnMucHVzaChjcmVhdGVCbG9vbihuZXh0LnR5cGUsIG5leHQubGFuZSkpOwogICAgICBzcGF3blRpbWVyID0gbmV4dC5kZWxheTsKICAgIH0KICAgIHNwYXduVGltZXIgLT0gMTsKCiAgICAvLyBhZ2VudHMvY2FzaCBjcmF0ZXMgcmVtb3ZlZAoKICAgIGNvbnN0IHBhdGhzID0gZ2V0TWFwUGF0aHMoKTsKCiAgICBmb3IgKGxldCBpID0gYmxvb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7CiAgICAgIGNvbnN0IGIgPSBibG9vbnNbaV07CiAgICAgIGNvbnN0IHBhdGggPSBwYXRoc1tiLmxhbmVdOwogICAgICBjb25zdCBuZXh0ID0gcGF0aFtiLnBhdGhJZHggKyAxXTsKICAgICAgaWYgKCFuZXh0KSBjb250aW51ZTsKCiAgICAgIGlmIChiLmhwIDw9IDApIHsgYmxvb25zLnNwbGljZShpLCAxKTsgY29udGludWU7IH0KCiAgICAgIGNvbnN0IGR4ID0gbmV4dC54IC0gYi54LCBkeSA9IG5leHQueSAtIGIueTsKICAgICAgY29uc3QgZGlzdCA9IE1hdGguaHlwb3QoZHgsIGR5KSB8fCAxOwogICAgICBiLnN0dW5UaWNrcyA9IE1hdGgubWF4KDAsIChiLnN0dW5UaWNrcyB8fCAwKSAtIDEpOwogICAgICBiLmFybW9yQnJva2VuID0gTWF0aC5tYXgoMCwgKGIuYXJtb3JCcm9rZW4gfHwgMCkgLSAxKTsKICAgICAgaWYgKChiLmJ1cm5UaWNrcyB8fCAwKSA+IDApIHsKICAgICAgICBiLmJ1cm5UaWNrcyAtPSAxOwogICAgICAgIGlmIChiLmJ1cm5UaWNrcyAlIDIwID09PSAwKSBiLmhwIC09IGIuYnVybkRhbWFnZSB8fCAxOwogICAgICB9CiAgICAgIGlmICgoYi5zdHVuVGlja3MgfHwgMCkgPiAwKSBjb250aW51ZTsKICAgICAgY29uc3Qgc3BlZWRNdWwgPSBiLnNsb3dUaWNrcyA+IDAgPyAwLjQ1IDogMTsKICAgICAgY29uc3QgZ2x1ZU11bCA9IGIuZ2x1ZVRpY2tzQWN0aXZlID4gMCA/IGIuZ2x1ZWRGYWN0b3IgOiAxOwogICAgICBjb25zdCBjdXJTcGVlZCA9IGIuYmFzZVNwZWVkICogc3BlZWRNdWwgKiBnbHVlTXVsOwoKICAgICAgYi54ICs9IChkeCAvIGRpc3QpICogY3VyU3BlZWQ7CiAgICAgIGIueSArPSAoZHkgLyBkaXN0KSAqIGN1clNwZWVkOwogICAgICBiLnNsb3dUaWNrcyA9IE1hdGgubWF4KDAsIGIuc2xvd1RpY2tzIC0gMSk7CiAgICAgIGIuZ2x1ZVRpY2tzQWN0aXZlID0gTWF0aC5tYXgoMCwgYi5nbHVlVGlja3NBY3RpdmUgLSAxKTsKICAgICAgaWYgKGIuZ2x1ZVRpY2tzQWN0aXZlID09PSAwKSBiLmdsdWVkRmFjdG9yID0gMTsKICAgICAgaWYgKGRpc3QgPCA2KSBiLnBhdGhJZHggKz0gMTsKCiAgICAgIGlmIChiLnBhdGhJZHggPj0gcGF0aC5sZW5ndGggLSAxKSB7CiAgICAgICAgc3RhdGUubGl2ZXMgLT0gYi5kYW1hZ2U7CiAgICAgICAgYmxvb25zLnNwbGljZShpLCAxKTsKICAgICAgfQogICAgfQoKICAgIHVwZGF0ZUFnZW50cygpOwoKICAgIHRvd2Vycy5mb3JFYWNoKCh0KSA9PiB7CiAgICAgIGlmICh0LnR5cGUgPT09ICd2aWxsYWdlJyB8fCB0LnR5cGUgPT09ICdzdXBwb3J0JykgcmV0dXJuOwogICAgICBpZiAodC50eXBlID09PSAnZmFybScpIHsKICAgICAgICB0LmZhcm1UaWNrID0gKHQuZmFybVRpY2sgfHwgMCkgKyAxOwogICAgICAgIGNvbnN0IHJhdGUgPSB0LmZhcm1SYXRlIHx8IDI0MDsKICAgICAgICBpZiAodC5mYXJtVGljayA+PSByYXRlKSB7CiAgICAgICAgICB0LmZhcm1UaWNrID0gMDsKICAgICAgICAgIHN0YXRlLm1vbmV5ICs9IHQuZmFybUluY29tZSB8fCA0NTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGNvbnN0IG1ldGFSYXRlTXVsdGlwbGllciA9IDEgLSBwcm9ncmVzc2lvbi5hdHRhY2tTcGVlZExldmVsICogMC4wNjsKICAgICAgY29uc3QgdmlsbGFnZVNwZWVkID0gMSAtICh0LnZpbGxhZ2VCdWZmPy5zcGVlZCB8fCAwKTsKICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IodC5maXJlUmF0ZSAqIG1ldGFSYXRlTXVsdGlwbGllciAqIHZpbGxhZ2VTcGVlZCkpOwoKICAgICAgaWYgKHQudHlwZSA9PT0gJ2ljZScpIHsKICAgICAgICBpZiAodC5jb29sZG93bi0tIDw9IDApIHsKICAgICAgICAgIGNvbnN0IHJyID0gdC5yYW5nZSArICh0LnZpbGxhZ2VCdWZmPy5yYW5nZSB8fCAwKTsKICAgICAgICAgIGJsb29ucy5mb3JFYWNoKChiKSA9PiB7CiAgICAgICAgICAgIGlmIChNYXRoLmh5cG90KGIueCAtIHQueCwgYi55IC0gdC55KSA8PSByciAmJiAhYi5pbW11bml0aWVzLmluY2x1ZGVzKCdpY2UnKSkgewogICAgICAgICAgICAgIGIuc2xvd1RpY2tzID0gTWF0aC5tYXgoYi5zbG93VGlja3MsIHQuZnJlZXplRHVyYXRpb24pOwogICAgICAgICAgICAgIGlmICh0LmRhbWFnZSA+IDApIGIuaHAgLT0gdC5kYW1hZ2U7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0pOwogICAgICAgICAgdC5jb29sZG93biA9IGVmZmVjdGl2ZVJhdGU7CiAgICAgICAgfQogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgaWYgKHQuY29vbGRvd24tLSA+IDApIHJldHVybjsKICAgICAgY29uc3QgdGFyZ2V0ID0gcGlja1RhcmdldCh0KTsKICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjsKCiAgICAgIGNvbnN0IGEgPSBNYXRoLmF0YW4yKHRhcmdldC55IC0gdC55LCB0YXJnZXQueCAtIHQueCk7CiAgICAgIGNvbnN0IGFkZFByb2plY3RpbGUgPSAoYW5nbGUpID0+IHsKICAgICAgICBjb25zdCBtYXhUcmF2ZWwgPSB0LnR5cGUgPT09ICd0YWNrJyA/IE1hdGgubWF4KDkwLCB0LnJhbmdlICogMC45NSkgOiBNYXRoLm1heCgyMjAsIHQucmFuZ2UgKiAxLjQpOwogICAgICAgIGNvbnN0IGZhc3RQcm9qZWN0aWxlU3BlZWQgPSBNYXRoLm1heCgyNCwgdC5wcm9qZWN0aWxlU3BlZWQgKiAzLjUpOwogICAgICAgIHByb2plY3RpbGVzLnB1c2goewogICAgICAgICAgeDogdC54LCB5OiB0LnksCiAgICAgICAgICB2eDogTWF0aC5jb3MoYW5nbGUpICogZmFzdFByb2plY3RpbGVTcGVlZCwgdnk6IE1hdGguc2luKGFuZ2xlKSAqIGZhc3RQcm9qZWN0aWxlU3BlZWQsCiAgICAgICAgICB0eXBlOiB0LnR5cGUsIHBpZXJjZTogdC5waWVyY2UgKyAodC52aWxsYWdlQnVmZj8ucGllcmNlIHx8IDApLCBkYW1hZ2U6IHQuZGFtYWdlICsgKHQudmlsbGFnZUJ1ZmY/LmRhbWFnZSB8fCAwKSwKICAgICAgICAgIHNwbGFzaDogdC5zcGxhc2gsIGdsdWVTbG93OiB0LmdsdWVTbG93LCBnbHVlVGlja3M6IHQuZ2x1ZVRpY2tzLAogICAgICAgICAgZnJlZXplRHVyYXRpb246IHQuZnJlZXplRHVyYXRpb24sCiAgICAgICAgICBzdHVuVGlja3M6IHQuc3R1blRpY2tzIHx8IDAsIGJ1cm5UaWNrczogdC5idXJuVGlja3MgfHwgMCwgYnVybkRhbWFnZTogdC5idXJuRGFtYWdlIHx8IDAsCiAgICAgICAgICBjYW5IaXRDYW1vOiAhISh0LmNhbkhpdENhbW8gfHwgdC52aWxsYWdlQnVmZj8uY2FtbyksIGNhbkhpdExlYWQ6ICEhKHQuY2FuSGl0TGVhZCB8fCB0LnZpbGxhZ2VCdWZmPy5sZWFkKSwKICAgICAgICAgIGFybW9yQnJlYWs6ICh0LmFybW9yQnJlYWsgfHwgMCkgKyAodC52aWxsYWdlQnVmZj8uYXJtb3JCcmVhayB8fCAwKSwKICAgICAgICAgIHRyYXZlbDogMCwgbWF4VHJhdmVsLCBoaXQ6IG5ldyBTZXQoKSwKICAgICAgICB9KTsKICAgICAgfTsKCiAgICAgIGlmICh0LnR5cGUgPT09ICd0YWNrJykgewogICAgICAgIGNvbnN0IGJ1cnN0ID0gdC5idXJzdCA/PyA2OwogICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVyc3Q7IGkrKykgYWRkUHJvamVjdGlsZSgoTWF0aC5QSSAqIDIgKiBpKSAvIGJ1cnN0KTsKICAgICAgfSBlbHNlIHsKICAgICAgICBjb25zdCBzaG90cyA9IE1hdGgubWF4KDEsIHQubXVsdGlTaG90IHx8IDEpOwogICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgc2hvdHM7IHMrKykgewogICAgICAgICAgY29uc3Qgc3ByZWFkID0gc2hvdHMgPiAxID8gKHMgLSAoc2hvdHMgLSAxKSAvIDIpICogMC4xMiA6IDA7CiAgICAgICAgICBhZGRQcm9qZWN0aWxlKGEgKyBzcHJlYWQpOwogICAgICAgIH0KICAgICAgfQogICAgICB0LmNvb2xkb3duID0gZWZmZWN0aXZlUmF0ZTsKICAgIH0pOwoKICAgIGZvciAobGV0IGkgPSBwcm9qZWN0aWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgewogICAgICBjb25zdCBwID0gcHJvamVjdGlsZXNbaV07CiAgICAgIGNvbnN0IHN0ZXAgPSBNYXRoLmh5cG90KHAudngsIHAudnkpOwogICAgICBwLnRyYXZlbCArPSBzdGVwOwogICAgICBwLnggKz0gcC52eDsgcC55ICs9IHAudnk7CgogICAgICBpZiAocC50cmF2ZWwgPiBwLm1heFRyYXZlbCB8fCBwLnggPCAwIHx8IHAueCA+IHdpZHRoIC0gU0lERV9QQU5FTCB8fCBwLnkgPCAwIHx8IHAueSA+IGhlaWdodCkgewogICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTsgY29udGludWU7CiAgICAgIH0KCiAgICAgIGZvciAobGV0IGogPSBibG9vbnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHsKICAgICAgICBjb25zdCBiID0gYmxvb25zW2pdOwogICAgICAgIGlmIChwLmhpdC5oYXMoaikgfHwgTWF0aC5oeXBvdChiLnggLSBwLngsIGIueSAtIHAueSkgPiBiLnJhZGl1cyArIDUpIGNvbnRpbnVlOwogICAgICAgIHAuaGl0LmFkZChqKTsKCiAgICAgICAgaWYgKHAudHlwZSA9PT0gJ2JvbWInKSB7CiAgICAgICAgICBibG9vbnMuZm9yRWFjaCgoYmIpID0+IHsgaWYgKE1hdGguaHlwb3QoYmIueCAtIHAueCwgYmIueSAtIHAueSkgPD0gcC5zcGxhc2gpIGhpdEJsb29uKGJiLCBwKTsgfSk7CiAgICAgICAgICBwLnBpZXJjZSA9IDA7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIGhpdEJsb29uKGIsIHApOwogICAgICAgICAgcC5waWVyY2UgLT0gMTsKICAgICAgICB9CgogICAgICAgIGlmIChwLnBpZXJjZSA8PSAwKSB7IHByb2plY3RpbGVzLnNwbGljZShpLCAxKTsgYnJlYWs7IH0KICAgICAgfQogICAgfQoKICAgIGZvciAobGV0IGkgPSBibG9vbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChibG9vbnNbaV0uaHAgPD0gMCkgYmxvb25zLnNwbGljZShpLCAxKTsKCiAgICBpZiAod2F2ZUluUHJvZ3Jlc3MgJiYgd2F2ZVF1ZXVlLmxlbmd0aCA9PT0gMCAmJiBibG9vbnMubGVuZ3RoID09PSAwKSB7CiAgICAgIHdhdmVJblByb2dyZXNzID0gZmFsc2U7CiAgICAgIHN0YXRlLndhdmUgKz0gMTsKICAgICAgc3RhdGUubW9uZXkgKz0gMTEwICsgc3RhdGUud2F2ZSAqIDExOwogICAgICBnYWluWHAoMTggKyBzdGF0ZS53YXZlICogMik7CgogICAgICBjb25zdCBtbUdhaW4gPSBNYXRoLmZsb29yKCg4ICsgc3RhdGUud2F2ZSAqIDAuOCkgKiBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XS5jb2luTXVsdCk7CiAgICAgIHByb2ZpbGUubW9ua2V5TW9uZXkgKz0gbW1HYWluOwogICAgICBwcm9maWxlLmNvaW5zICs9IE1hdGguZmxvb3IobW1HYWluICogMC40NSk7CiAgICAgIHNhdmVQcm9maWxlKCk7CgogICAgICBpZiAoc3RhdGUud2F2ZSA+IE1BWF9XQVZFUykgewogICAgICAgIHJ1bldvbiA9IHRydWU7CiAgICAgICAgY29uc3QgZGlmZiA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldOwogICAgICAgIGNvbnN0IGVhcm5lZENvaW5zID0gTWF0aC5mbG9vcigoODAgKyBNQVhfV0FWRVMgKiA2ICsgTWF0aC5tYXgoMCwgc3RhdGUubGl2ZXMpKSAqIGRpZmYuY29pbk11bHQpOwogICAgICAgIHByb2ZpbGUuY29pbnMgKz0gZWFybmVkQ29pbnM7CiAgICAgICAgcHJvZmlsZS5tb25rZXlNb25leSArPSBNYXRoLmZsb29yKGVhcm5lZENvaW5zICogMC42KTsKICAgICAgICBzYXZlUHJvZmlsZSgpOwogICAgICB9CgogICAgICBpZiAoYXV0b05leHRXYXZlICYmICFnYW1lT3Zlcikgc3RhcnRXYXZlKCk7CiAgICB9CgogICAgaWYgKHN0YXRlLmxpdmVzIDw9IDApIHsKICAgICAgc3RhdGUubGl2ZXMgPSAwOwogICAgICBnYW1lT3ZlciA9IHRydWU7CiAgICB9CiAgfQoKICBmdW5jdGlvbiBkcmF3TWFwKCkgewogICAgY29uc3QgbWFwID0gZ2V0Q3VycmVudE1hcCgpOwogICAgY3R4LmZpbGxTdHlsZSA9IG1hcC5jb2xvcjsKICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTsKCiAgICBjb25zdCBtYXBXaWR0aCA9IHdpZHRoIC0gU0lERV9QQU5FTDsKICAgIChtYXAud2F0ZXIgfHwgW10pLmZvckVhY2goKGFyZWEpID0+IHsKICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjM2FhNmQ3JzsKICAgICAgaWYgKGFyZWEuc2hhcGUgPT09ICdlbGxpcHNlJykgewogICAgICAgIGN0eC5iZWdpblBhdGgoKTsKICAgICAgICBjdHguZWxsaXBzZShhcmVhLnggKiBtYXBXaWR0aCwgYXJlYS55ICogaGVpZ2h0LCBhcmVhLnJ4ICogbWFwV2lkdGgsIGFyZWEucnkgKiBoZWlnaHQsIGFyZWEucm90IHx8IDAsIDAsIE1hdGguUEkgKiAyKTsKICAgICAgICBjdHguZmlsbCgpOwogICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjOGRkNmYwJzsKICAgICAgICBjdHgubGluZVdpZHRoID0gMjsKICAgICAgICBjdHguc3Ryb2tlKCk7CiAgICAgIH0gZWxzZSBpZiAoYXJlYS5zaGFwZSA9PT0gJ3JlY3QnKSB7CiAgICAgICAgY29uc3QgcnggPSBhcmVhLnggKiBtYXBXaWR0aDsKICAgICAgICBjb25zdCByeSA9IGFyZWEueSAqIGhlaWdodDsKICAgICAgICBjb25zdCBydyA9IGFyZWEudyAqIG1hcFdpZHRoOwogICAgICAgIGNvbnN0IHJoID0gYXJlYS5oICogaGVpZ2h0OwogICAgICAgIGN0eC5maWxsUmVjdChyeCwgcnksIHJ3LCByaCk7CiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM4ZGQ2ZjAnOwogICAgICAgIGN0eC5saW5lV2lkdGggPSAyOwogICAgICAgIGN0eC5zdHJva2VSZWN0KHJ4LCByeSwgcncsIHJoKTsKICAgICAgfQogICAgfSk7CgogICAgY29uc3Qgc2NlbmVyeSA9IHNjZW5lcnlCeU1hcFtzdGF0ZS5zZWxlY3RlZE1hcF0gfHwgW107CiAgICBzY2VuZXJ5LmZvckVhY2goKHMpID0+IHsKICAgICAgaWYgKHMudHlwZSA9PT0gJ3RyZWUnKSB7CiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNWQ0MDM3JzsgY3R4LmZpbGxSZWN0KHMucHggLSA1LCBzLnB5IC0gNiwgMTAsIDE4KTsKICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMyZTdkMzInOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMocy5weCwgcy5weSAtIDEwLCAxNiwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOwogICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gJ3JvY2snKSB7CiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNzU3NTc1JzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguZWxsaXBzZShzLnB4LCBzLnB5LCAxNSwgMTAsIDAsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsKICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdwb25kJykgewogICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzRmYzNmNyc7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmVsbGlwc2Uocy5weCwgcy5weSwgMjYsIDE2LCAwLjIsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsKICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdidXNoJykgewogICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzM4OGUzYyc7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhzLnB4IC0gOCwgcy5weSwgMTAsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmFyYyhzLnB4ICsgMiwgcy5weSAtIDUsIDExLCAwLCBNYXRoLlBJICogMik7IGN0eC5hcmMocy5weCArIDEyLCBzLnB5LCA5LCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7CiAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSAnZmxvd2VycycpIHsKICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmNDhmYjEnOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMocy5weCAtIDYsIHMucHksIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmFyYyhzLnB4ICsgNiwgcy5weSArIDIsIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmFyYyhzLnB4LCBzLnB5IC0gNCwgNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOwogICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZWIzYic7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhzLnB4LCBzLnB5LCAzLCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7CiAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSAnc3R1bXAnKSB7CiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNmQ0YzQxJzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguZWxsaXBzZShzLnB4LCBzLnB5LCAxMCwgNywgMCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOwogICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gJ2NyYXRlJykgewogICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ExODg3Zic7IGN0eC5maWxsUmVjdChzLnB4IC0gOSwgcy5weSAtIDksIDE4LCAxOCk7CiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM2ZDRjNDEnOyBjdHgubGluZVdpZHRoID0gMjsgY3R4LnN0cm9rZVJlY3Qocy5weCAtIDksIHMucHkgLSA5LCAxOCwgMTgpOwogICAgICB9CiAgICB9KTsKCiAgICBjb25zdCBwYXRocyA9IGdldE1hcFBhdGhzKCk7CiAgICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB7CiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjOGQ2ZTYzJzsgY3R4LmxpbmVXaWR0aCA9IDY2OyBjdHgubGluZUNhcCA9ICdyb3VuZCc7IGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7CiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyhwYXRoWzBdLngsIHBhdGhbMF0ueSk7IHBhdGguZm9yRWFjaCgocCkgPT4gY3R4LmxpbmVUbyhwLngsIHAueSkpOyBjdHguc3Ryb2tlKCk7CiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNWQ0MDM3JzsgY3R4LmxpbmVXaWR0aCA9IDU7IGN0eC5zdHJva2UoKTsKICAgIH0pOwogIH0KCiAgZnVuY3Rpb24gZHJhd0VudGl0aWVzKCkgewogICAgYmxvb25zLmZvckVhY2goKGIpID0+IHsKICAgICAgY3R4LmZpbGxTdHlsZSA9IGIuY29sb3I7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhiLngsIGIueSwgYi5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsKICAgICAgaWYgKGIuc3RyaXBlKSB7IGN0eC5zdHJva2VTdHlsZSA9IGIuc3RyaXBlOyBjdHgubGluZVdpZHRoID0gMzsgY3R4LnN0cm9rZSgpOyB9CiAgICAgIGNvbnN0IGhwID0gTWF0aC5tYXgoMCwgYi5ocCAvIGIubWF4SHApOwogICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDA4JzsgY3R4LmZpbGxSZWN0KGIueCAtIDE2LCBiLnkgLSBiLnJhZGl1cyAtIDEwLCAzMiwgNSk7CiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2VmNTM1MCc7IGN0eC5maWxsUmVjdChiLnggLSAxNiwgYi55IC0gYi5yYWRpdXMgLSAxMCwgMzIgKiBocCwgNSk7CiAgICB9KTsKCiAgICB0b3dlcnMuZm9yRWFjaCgodCkgPT4gewogICAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuc2VsZWN0ZWRUb3dlciA9PT0gdCA/ICcjZmZmZGU3JyA6IHQuY29sb3I7CiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyh0LngsIHQueSwgMjQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsKICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJzsgY3R4LmZvbnQgPSAnNzAwIDE2cHggc2Fucy1zZXJpZic7IGN0eC5maWxsVGV4dCh0Lmljb24gPz8gJz8nLCB0LnggLSA2LCB0LnkgKyA1KTsKCiAgICAgIGlmICh0LnBybykgeyBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZDE2Nic7IGN0eC5saW5lV2lkdGggPSAyOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmModC54LCB0LnksIDI4LCAwLCBNYXRoLlBJICogMik7IGN0eC5zdHJva2UoKTsgfQogICAgICBpZiAodC5wcm9NYXN0ZXJ5KSB7IGN0eC5zdHJva2VTdHlsZSA9ICcjZmY4ZmFiJzsgY3R4LmxpbmVXaWR0aCA9IDI7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyh0LngsIHQueSwgMzIsIDAsIE1hdGguUEkgKiAyKTsgY3R4LnN0cm9rZSgpOyB9CgogICAgICBpZiAoc3RhdGUuc2VsZWN0ZWRUb3dlciA9PT0gdCkgewogICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmZmNjYnOyBjdHgubGluZVdpZHRoID0gMjsKICAgICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmModC54LCB0LnksIHQucmFuZ2UgKyAodC52aWxsYWdlQnVmZj8ucmFuZ2UgfHwgMCksIDAsIE1hdGguUEkgKiAyKTsgY3R4LnN0cm9rZSgpOwogICAgICB9CiAgICB9KTsKCiAgICBwcm9qZWN0aWxlcy5mb3JFYWNoKChwKSA9PiB7CiAgICAgIGN0eC5maWxsU3R5bGUgPSBwLnR5cGUgPT09ICdib21iJyA/ICcjMTExJyA6IHAudHlwZSA9PT0gJ25pbmphJyA/ICcjN2U1N2MyJyA6IHAudHlwZSA9PT0gJ2dsdWUnID8gJyM4YmMzNGEnIDogcC50eXBlID09PSAnYm9vbWVyYW5nJyA/ICcjZmY5ODAwJyA6ICcjZmZlYjNiJzsKICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKHAueCwgcC55LCBwLnR5cGUgPT09ICdib21iJyA/IDcgOiA1LCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7CiAgICB9KTsKCiAgICBpZiAoc3RhdGUuaG92ZXIueCA8IHdpZHRoIC0gU0lERV9QQU5FTCkgewogICAgICBjb25zdCBkZWYgPSB0b3dlckRlZnNbc3RhdGUuc2VsZWN0ZWRUb3dlclR5cGVdOwogICAgICBjb25zdCB1bmxvY2tlZCA9IGlzVG93ZXJVbmxvY2tlZChzdGF0ZS5zZWxlY3RlZFRvd2VyVHlwZSk7CiAgICAgIGNvbnN0IHRvd2VyVG9vQ2xvc2UgPSB0b3dlcnMuc29tZSgodCkgPT4gTWF0aC5oeXBvdCh0LnggLSBzdGF0ZS5ob3Zlci54LCB0LnkgLSBzdGF0ZS5ob3Zlci55KSA8IDQ0KTsKICAgICAgY29uc3QgaXNXYXRlclRvd2VyID0gaXNXYXRlclRvd2VyVHlwZShzdGF0ZS5zZWxlY3RlZFRvd2VyVHlwZSk7CiAgICAgIGNvbnN0IGlzSW5XYXRlciA9IGlzUG9pbnRJbldhdGVyKHN0YXRlLmhvdmVyLngsIHN0YXRlLmhvdmVyLnkpOwogICAgICBjb25zdCBiYWRUZXJyYWluID0gaXNXYXRlclRvd2VyID8gIWlzSW5XYXRlciA6IGlzSW5XYXRlcjsKICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC40NTsKICAgICAgY3R4LmZpbGxTdHlsZSA9ICF1bmxvY2tlZCB8fCBpc1BvaW50T25BbnlQYXRoKHN0YXRlLmhvdmVyLngsIHN0YXRlLmhvdmVyLnkpIHx8IHRvd2VyVG9vQ2xvc2UgfHwgYmFkVGVycmFpbiA/ICcjZWY1MzUwJyA6IGRlZi5jb2xvcjsKICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKHN0YXRlLmhvdmVyLngsIHN0YXRlLmhvdmVyLnksIDI0LCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7CiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7CiAgICB9CiAgfQoKICBmdW5jdGlvbiBkcmF3VWkoKSB7CiAgICBjb25zdCBwYW5lbFggPSB3aWR0aCAtIFNJREVfUEFORUw7CiAgICBjb25zdCBtYXAgPSBnZXRDdXJyZW50TWFwKCk7CgogICAgY29uc3QgcGFuZWxHcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHBhbmVsWCwgMCwgcGFuZWxYLCBoZWlnaHQpOwogICAgcGFuZWxHcmFkLmFkZENvbG9yU3RvcCgwLCAnIzFhMmE0NCcpOwogICAgcGFuZWxHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzExMWQzMycpOwogICAgY3R4LmZpbGxTdHlsZSA9IHBhbmVsR3JhZDsKICAgIGN0eC5maWxsUmVjdChwYW5lbFgsIDAsIFNJREVfUEFORUwsIGhlaWdodCk7CiAgICBj

  if (tdMid.active) return;

  const top = document.querySelector('#cc-og-fullscreen-root .cc-top');
  const leftCol = document.querySelector('#cc-og-fullscreen-root .cc-left');
  if (!top || !leftCol) return;

  tdMid.active = true;
  syncGameFocus();

  const overlay = document.createElement('div');
  overlay.className = 'cc-td-overlay';

  const head = document.createElement('div');
  head.className = 'cc-flappy-head';
  const label = document.createElement('span');
  label.textContent = 'Tower Defense';
  const close = document.createElement('button');
  close.className = 'cc-flappy-close';
  close.textContent = 'Exit';
  close.onclick = () => stopTdMode();
  head.append(label, close);

  const frame = document.createElement('iframe');
  frame.className = 'cc-td-frame';

  overlay.append(head, frame);
  top.appendChild(overlay);

  const placeOverlay = () => {
    if (!overlay.isConnected || !leftCol.isConnected || !top.isConnected) return;
    const topRect = top.getBoundingClientRect();
    const leftRect = leftCol.getBoundingClientRect();
    const inset = 8;
    const left = Math.max(inset, Math.round(leftRect.right - topRect.left + inset));
    const width = Math.max(200, Math.round(topRect.width - left - inset));
    overlay.style.left = `${left}px`;
    overlay.style.top = `${inset}px`;
    overlay.style.width = `${width}px`;
    overlay.style.height = `calc(100% - ${inset * 2}px)`;
  };
  placeOverlay();
  const resizeObs = new ResizeObserver(placeOverlay);
  resizeObs.observe(top);
  resizeObs.observe(leftCol);

  const win = frame.contentWindow;
  const doc = win && win.document;
  if (!win || !doc) {
    stopTdMode();
    return;
  }

  doc.open();
  doc.write('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;height:100%;overflow:hidden;background:#101829}canvas{display:block}</style></head><body></body></html>');
  doc.close();

  try {
    const binary = win.atob(encoded);
    const bytes = win.Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const source = new win.TextDecoder('utf-8').decode(bytes);
    win.eval(source);
  } catch {
    stopTdMode();
    return;
  }

  tdMid.overlay = overlay;
  tdMid.resizeObs = resizeObs;
}

function launchBlockBlastGame() {
  const EXISTING_ID = 'bb-console-root';
  const STORAGE_KEY = 'bb-console-best-score-v1';

  const host = document.querySelector('#cc-og-fullscreen-root .cc-mid');
  if (!host) return;

  const existing = host.querySelector(`#${EXISTING_ID}`);
  if (existing) existing.remove();

  const GRID_SIZE = 8;
  const CELL = 54;
  const BOARD_PADDING = 12;
  const BOARD_PX = GRID_SIZE * CELL;
  const PANEL_WIDTH = BOARD_PX + BOARD_PADDING * 2;
  const PANEL_HEIGHT = 760;
  const HAND_CELL = 36;
  const SIDE_PANEL_WIDTH = 230;

  const PIECES = [
    [[1]], [[1, 1]], [[1], [1]], [[1, 1, 1]], [[1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]],
    [[1, 1], [1, 1]], [[1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1]], [[0, 1], [1, 1]],
    [[1, 1], [1, 0]], [[1, 1], [0, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]], [[1, 1, 1], [1, 1, 1]], [[1, 1, 1, 1, 1]], [[1], [1], [1], [1], [1]],
    [[1, 1, 0], [0, 1, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 1, 1], [0, 1, 0], [0, 0, 1]],
  ];

  const COLORS = ['#39ff88', '#45d6ff', '#ffd63d', '#ff8e6e', '#bb86ff', '#ff5fcf', '#84f1c8', '#7ab6ff'];

  const root = document.createElement('div');
  root.id = EXISTING_ID;
  root.className = 'cc-blockblast-overlay';
  Object.assign(root.style, {
    position: 'absolute', inset: '10px', zIndex: '30', borderRadius: '10px', overflow: 'hidden',
    border: '1px solid #ffffff22', boxShadow: '0 10px 26px #0008',
    background: 'radial-gradient(circle at 20% -10%, #2e3561 0%, #1a1d33 35%, #121526 100%)',
    backdropFilter: 'blur(6px)', userSelect: 'none', color: '#fff', display: 'flex', flexDirection: 'column'
  });

  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px',
    background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)'
  });

  const title = document.createElement('div');
  title.textContent = 'BLOCK BLAST';
  Object.assign(title.style, { fontSize: '12px', fontWeight: '700', letterSpacing: '1.1px', opacity: '0.92' });

  const rightControls = document.createElement('div');
  Object.assign(rightControls.style, { display: 'flex', gap: '8px', alignItems: 'center' });

  function makeBtn(label, color) {
    const btn = document.createElement('button');
    btn.textContent = label;
    Object.assign(btn.style, {
      border: 'none', borderRadius: '999px', padding: '6px 10px', fontSize: '11px', fontWeight: '700',
      letterSpacing: '0.5px', cursor: 'pointer', color: '#fff', background: color
    });
    return btn;
  }

  const resetBtn = makeBtn('RESET', '#ff5c7a');
  const closeBtn = makeBtn('✕', '#2e334e');
  rightControls.append(resetBtn, closeBtn);
  header.append(title, rightControls);

  const stage = document.createElement('div');
  Object.assign(stage.style, { display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px', height: '100%', boxSizing: 'border-box' });

  const topStats = document.createElement('div');
  Object.assign(topStats.style, { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' });

  const scoreBox = document.createElement('div');
  const bestBox = document.createElement('div');
  const comboBox = document.createElement('div');
  [scoreBox, bestBox, comboBox].forEach((el) => {
    Object.assign(el.style, {
      padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '12px', lineHeight: '1.3'
    });
  });

  const canvas = document.createElement('canvas');
  canvas.width = PANEL_WIDTH - BOARD_PADDING * 2;
  canvas.height = PANEL_HEIGHT - 220;
  Object.assign(canvas.style, {
    width: '100%', height: '100%', borderRadius: '16px', background: 'rgba(14, 18, 34, 0.55)',
    border: '1px solid rgba(255,255,255,0.08)', flex: '1'
  });
  const ctx = canvas.getContext('2d');

  stage.append(topStats, canvas);
  topStats.append(scoreBox, bestBox, comboBox);
  root.append(header, stage);
  host.appendChild(root);

  let board = [];
  let hand = [];
  let particles = [];
  let placeFx = [];
  let score = 0;
  let combo = 0;
  let best = Number(localStorage.getItem(STORAGE_KEY) || 0);
  let dragging = null;
  let dragOffset = { x: 0, y: 0 };
  let gameOver = false;
  let rafId = null;

  let boardOrigin = { x: BOARD_PADDING, y: BOARD_PADDING };
  let slotAnchors = [];

  function updateLayout() {
    const boardX = Math.max(20, Math.round((canvas.width - BOARD_PX) / 2));
    const boardY = Math.max(110, Math.round((canvas.height - BOARD_PX) / 2));
    boardOrigin = { x: boardX, y: boardY };

    const slotY = Math.max(12, boardY - 98);
    const step = BOARD_PX / 3;
    slotAnchors = [
      { x: Math.round(boardX + step * 0.5), y: slotY },
      { x: Math.round(boardX + step * 1.5), y: slotY },
      { x: Math.round(boardX + step * 2.5), y: slotY },
    ];
  }

  function randomPiece() { return { shape: PIECES[Math.floor(Math.random() * PIECES.length)].map((row) => [...row]), color: COLORS[Math.floor(Math.random() * COLORS.length)] }; }

  function refillHand() {
    if (hand.some(Boolean)) return;
    if (!slotAnchors.length) updateLayout();
    hand = slotAnchors.map((slot) => ({ ...randomPiece(), x: slot.x, y: slot.y, homeX: slot.x, homeY: slot.y, placed: false }));
  }

  function syncHandAnchors() {
    hand.forEach((piece, i) => {
      if (!piece || piece === dragging) return;
      const slot = slotAnchors[i];
      if (!slot) return;
      piece.x = slot.x; piece.y = slot.y; piece.homeX = slot.x; piece.homeY = slot.y;
    });
  }

  function resetGame() {
    board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    score = 0; combo = 0; gameOver = false; particles = []; placeFx = []; hand = [];
    refillHand();
    updateStats();
  }

  function canPlace(shape, row, col) {
    for (let r = 0; r < shape.length; r++) for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const rr = row + r; const cc = col + c;
      if (rr < 0 || rr >= GRID_SIZE || cc < 0 || cc >= GRID_SIZE) return false;
      if (board[rr][cc]) return false;
    }
    return true;
  }

  function updateStats() {
    scoreBox.innerHTML = `<div style="opacity:.7">SCORE</div><div style="font-size:22px;font-weight:800">${score}</div>`;
    bestBox.innerHTML = `<div style="opacity:.7">BEST</div><div style="font-size:22px;font-weight:800">${best}</div>`;
    comboBox.innerHTML = `<div style="opacity:.7">COMBO</div><div style="font-size:22px;font-weight:800">x${Math.max(combo, 1)}</div>`;
  }

  function burst(col, row, color) {
    const x = boardOrigin.x + col * CELL + CELL / 2;
    const y = boardOrigin.y + row * CELL + CELL / 2;
    for (let i = 0; i < 10; i++) particles.push({ x, y, color, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8, size: 2 + Math.random() * 3, life: 1 });
  }

  function placePiece(piece, row, col) {
    let cells = 0;
    for (let r = 0; r < piece.shape.length; r++) for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue;
      board[row + r][col + c] = piece.color;
      placeFx.push({ r: row + r, c: col + c, color: piece.color, t: 0 });
      cells++;
    }
    score += cells;

    const clearRows = []; const clearCols = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      if (board[i].every(Boolean)) clearRows.push(i);
      if (board.every((line) => line[i])) clearCols.push(i);
    }

    if (clearRows.length || clearCols.length) {
      combo++;
      score += (clearRows.length + clearCols.length) * 10 * combo;
      for (const r of clearRows) for (let c = 0; c < GRID_SIZE; c++) { burst(c, r, board[r][c]); board[r][c] = null; }
      for (const c of clearCols) for (let r = 0; r < GRID_SIZE; r++) if (board[r][c]) { burst(c, r, board[r][c]); board[r][c] = null; }
    } else combo = 0;

    if (score > best) { best = score; localStorage.setItem(STORAGE_KEY, String(best)); }
    updateStats();
  }

  function hasAnyMove() {
    const active = hand.filter((h) => h && !h.placed);
    if (!active.length) return true;
    for (const piece of active) for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) if (canPlace(piece.shape, r, c)) return true;
    return false;
  }

  function boardPosFromCanvas(x, y) { return { col: Math.round((x - boardOrigin.x) / CELL), row: Math.round((y - boardOrigin.y) / CELL) }; }

  function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  function drawBlockCell(x, y, w, h, color, scale = 1) {
    const cx = x + w / 2; const cy = y + h / 2; const ww = w * scale; const hh = h * scale;
    const xx = cx - ww / 2; const yy = cy - hh / 2;
    drawRoundedRect(xx, yy, ww, hh, Math.max(4, Math.min(10, ww * 0.2)));
    const grad = ctx.createLinearGradient(xx, yy, xx, yy + hh);
    grad.addColorStop(0, '#ffffff22'); grad.addColorStop(0.22, color); grad.addColorStop(1, '#00000040');
    ctx.fillStyle = grad; ctx.fill();
    drawRoundedRect(xx + 1.5, yy + 1.5, ww - 3, hh - 3, Math.max(4, Math.min(9, ww * 0.18)));
    ctx.strokeStyle = '#ffffff44'; ctx.lineWidth = 1; ctx.stroke();
  }

  function drawPiece(piece, size = HAND_CELL, alpha = 1, shadow = false) {
    ctx.save(); ctx.globalAlpha = alpha;
    if (shadow) { ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 8; }
    for (let r = 0; r < piece.shape.length; r++) for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue;
      drawBlockCell(piece.x + c * size, piece.y + r * size, size - 3, size - 3, piece.color);
    }
    ctx.restore();
  }

  function onMouseMove(e) {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    dragging.x = (e.clientX - rect.left) * (canvas.width / rect.width) - dragOffset.x;
    dragging.y = (e.clientY - rect.top) * (canvas.height / rect.height) - dragOffset.y;
  }

  function onMouseUp() {
    if (!dragging) return;
    const { row, col } = boardPosFromCanvas(dragging.x + 2, dragging.y + 2);
    if (canPlace(dragging.shape, row, col)) {
      placePiece(dragging, row, col);
      dragging.placed = true;
      const idx = hand.indexOf(dragging);
      if (idx >= 0) hand[idx] = null;
      refillHand();
      if (!hasAnyMove()) gameOver = true;
    } else {
      dragging.x = dragging.homeX; dragging.y = dragging.homeY;
    }
    dragging = null;
  }

  canvas.addEventListener('mousedown', (e) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    for (let i = hand.length - 1; i >= 0; i--) {
      const piece = hand[i];
      if (!piece || piece.placed) continue;
      const w = piece.shape[0].length * HAND_CELL;
      const h = piece.shape.length * HAND_CELL;
      if (mx >= piece.x && mx <= piece.x + w && my >= piece.y && my <= piece.y + h) {
        dragging = piece;
        dragOffset.x = mx - piece.x;
        dragOffset.y = my - piece.y;
        break;
      }
    }
  });

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  function cleanup() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    if (rafId) cancelAnimationFrame(rafId);
    root.remove();
  }

  resetBtn.onclick = resetGame;
  closeBtn.onclick = cleanup;

  function render() {
    if (!root.isConnected) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateLayout();
    syncHandAnchors();

    const boardX = boardOrigin.x;
    const boardY = boardOrigin.y;

    drawRoundedRect(boardX - 2, boardY - 2, BOARD_PX + 4, BOARD_PX + 4, 18);
    ctx.fillStyle = 'rgba(9, 13, 26, .95)';
    ctx.fill();

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const x = boardX + c * CELL;
        const y = boardY + r * CELL;
        const fx = placeFx.find((item) => item.r === r && item.c === c);
        if (board[r][c]) {
          const scale = fx ? Math.min(1, 0.72 + fx.t * 0.5) : 1;
          if (fx) { ctx.save(); ctx.shadowColor = board[r][c]; ctx.shadowBlur = 14; }
          drawBlockCell(x + 2, y + 2, CELL - 6, CELL - 6, board[r][c], scale);
          if (fx) { ctx.restore(); fx.t += 0.08; }
        } else {
          drawRoundedRect(x + 2, y + 2, CELL - 6, CELL - 6, 8);
          ctx.fillStyle = '#1e2748';
          ctx.fill();
        }
      }
    }

    placeFx = placeFx.filter((fx) => fx.t < 1.1 && board[fx.r][fx.c]);

    if (dragging && !gameOver) {
      const { row, col } = boardPosFromCanvas(dragging.x + 2, dragging.y + 2);
      const ok = canPlace(dragging.shape, row, col);
      ctx.save();
      ctx.globalAlpha = 0.4;
      for (let r = 0; r < dragging.shape.length; r++) {
        for (let c = 0; c < dragging.shape[r].length; c++) {
          if (!dragging.shape[r][c]) continue;
          drawBlockCell(boardX + (col + c) * CELL + 2, boardY + (row + r) * CELL + 2, CELL - 6, CELL - 6, ok ? dragging.color : '#ff4b5c', 0.95);
        }
      }
      ctx.restore();
    }

    for (const piece of hand) if (piece) drawPiece(piece, dragging === piece ? CELL : HAND_CELL, 1, dragging === piece);

    particles = particles.filter((part) => part.life > 0);
    for (const part of particles) {
      ctx.save(); ctx.globalAlpha = part.life; ctx.fillStyle = part.color;
      ctx.beginPath(); ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      part.x += part.vx; part.y += part.vy; part.vy += 0.22; part.life -= 0.03;
    }

    if (gameOver) {
      ctx.save();
      ctx.fillStyle = 'rgba(5, 6, 13, 0.72)';
      drawRoundedRect(0, 0, canvas.width, canvas.height, 16); ctx.fill();
      ctx.fillStyle = '#ff7d92'; ctx.font = 'bold 36px Inter, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 16);
      ctx.fillStyle = '#fff'; ctx.font = '600 16px Inter, sans-serif';
      ctx.fillText(`Final score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.font = '500 13px Inter, sans-serif';
      ctx.fillText('Click RESET to try again', canvas.width / 2, canvas.height / 2 + 48);
      ctx.restore();
    }

    rafId = requestAnimationFrame(render);
  }

  resetGame();
  render();
}
