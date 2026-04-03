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
    overlay.style.height = `${Math.max(240, Math.round(topRect.height - inset * 2))}px`;
  };
  placeOverlay();
  tdMid.place = placeOverlay;

  const win = frame.contentWindow;
  const doc = win && win.document;
  if (!win || !doc) {
    stopTdMode();
    return;
  }

  doc.open();
  doc.write('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;height:100%;display:grid;place-items:center;background:#101829;color:#fff;font:600 16px system-ui}small{display:block;opacity:.75;margin-top:6px}</style></head><body><div>Tower Defense is temporarily unavailable.<small>Use Exit and try again after reload.</small></div></body></html>');
  doc.close();

  tdMid.overlay = overlay;
  tdMid.frame = frame;
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
