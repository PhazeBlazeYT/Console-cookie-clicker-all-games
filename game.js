(() => {
  const ROOT_ID = 'cc-og-fullscreen-root';
  const STYLE_ID = 'cc-og-fullscreen-style';
  const SAVE_KEY = 'cc_pro_console_save_v5';
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
    tabMaskTitle: TAB_MASK_PRESETS.classroom.title,
    tabMaskFavicon: TAB_MASK_PRESETS.classroom.favicon,
    prestigeUpgrades: {
      clickLegacy: 0,
      goldenLegacy: 0,
      offlineLegacy: 0,
      cpsLegacy: 0,
      unlockFutureTech: false
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

  const fmt = (n) => {
    const value = Math.floor(Number(n) || 0);
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (abs < 1000) return `${sign}${abs.toLocaleString()}`;

    const units = ['', 'k', 'm', 'b', 't', 'q', 'qi', 'sx', 'sp', 'oc', 'no', 'dc'];
    const tier = Math.min(units.length - 1, Math.floor(Math.log10(abs) / 3));
    const scaled = abs / (1000 ** tier);
    const decimals = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
    const text = scaled.toFixed(decimals).replace(/\.0+$|(?<=\.\d)0+$/g, '');
    return `${sign}${text}${units[tier]}`;
  };
  const formatDuration = (seconds) => {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const secs = safe % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };
  const COST_GROWTH = 1.4;
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

  state.buildings.push({ name: 'Chrono Reactor', cost: 900000000000000000000000, baseCost: 900000000000000000000000, cps: 1800000000000000, owned: 0, locked: true, unlockBy: 'futureTech' });
  state.buildings.push({ name: 'Nebula Foundry', cost: 17000000000000000000000000, baseCost: 17000000000000000000000000, cps: 12000000000000000, owned: 0, locked: true, unlockBy: 'futureTech' });

  const milkPercent = () => state.achievements.length * 4;
  const milkMult = () => state.upgrades.filter((u) => u.bought && u.milkMult).reduce((m, u) => m * u.milkMult, 1);
  const clickMult = () => state.upgrades.filter((u) => u.bought && u.clickMult).reduce((m, u) => m * u.clickMult, 1);
  const permanentClickMult = () => 1 + state.prestigeUpgrades.clickLegacy * 0.25;
  const prestigeMult = () => (1 + state.prestigeChips * 0.01) * (1 + state.prestigeUpgrades.cpsLegacy * 0.08);
  const goldenSpawnBoost = () => {
    const chipsBoost = Math.min(0.3, state.prestigeChips * 0.0025);
    const achievementsBoost = Math.min(0.2, state.achievements.length * 0.008);
    return 1 + chipsBoost + achievementsBoost;
  };
  const goldenEffectBoost = () => 1 + Math.min(0.2, state.goldenClicks * 0.003);
  const goldenSpawnDelay = () => {
    const base = 110000 + Math.random() * 210000;
    return Math.floor(base / (goldenSpawnBoost() * (1 + state.prestigeUpgrades.goldenLegacy * 0.15)));
  };
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
    return byBuildings * state.multiplier * prestigeMult() * milkMult() * BASE_DIFFICULTY_MULT * grandmaFarmSynergyMult();
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
  const prestigePotential = () => Math.floor(Math.sqrt(state.totalCookiesBaked / 4000000000));
  const prestigeGain = () => Math.max(0, prestigePotential() - state.prestigeChips);
  const prestigeNeedForNext = () => {
    const nextTarget = (prestigePotential() + 1) ** 2 * 4000000000;
    return Math.max(0, nextTarget - state.totalCookiesBaked);
  };

  const addLog = (msg) => {
    state.log.unshift(`${new Date().toLocaleTimeString()} — ${msg}`);
    if (state.log.length > 50) state.log.length = 50;
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
        tabMaskTitle: (typeof saved.tabMaskTitle === 'string' && saved.tabMaskTitle.trim()) ? saved.tabMaskTitle : TAB_MASK_PRESETS.classroom.title,
        tabMaskFavicon: (typeof saved.tabMaskFavicon === 'string' && saved.tabMaskFavicon.trim()) ? saved.tabMaskFavicon : TAB_MASK_PRESETS.classroom.favicon,
        prestigeUpgrades: {
          clickLegacy: Number(saved?.prestigeUpgrades?.clickLegacy) || 0,
          goldenLegacy: Number(saved?.prestigeUpgrades?.goldenLegacy) || 0,
          offlineLegacy: Number(saved?.prestigeUpgrades?.offlineLegacy) || 0,
          cpsLegacy: Number(saved?.prestigeUpgrades?.cpsLegacy) || 0,
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
          state.buildings[i].cost = Number(b.cost) || state.buildings[i].baseCost;
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
      repeating-linear-gradient(45deg,#ffffff08 0 8px,#00000000 8px 16px); animation: cc-pan 18s ease-in-out infinite alternate; }
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
    #${ROOT_ID} .cc-cookie-count { font-size:44px; color:#ffd37e; text-align:center; }
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
    #${ROOT_ID} .cc-admin-panel { width:min(980px,96vw); max-height:92vh; overflow:auto; background:linear-gradient(180deg,#4d3624 0%,#2f2116 55%,#251a12 100%); border:1px solid #000; border-radius:14px; box-shadow:0 16px 34px #000c, inset 0 1px 0 #ffffff22; padding:14px; color:#f8e6c7; }
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
    if (!tdMid.active) return;
    tdMid.active = false;
    if (tdMid.resizeObs) tdMid.resizeObs.disconnect();
    tdMid.resizeObs = null;
    if (tdMid.overlay?.isConnected) tdMid.overlay.remove();
    tdMid.overlay = null;
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
    state.highestCpsEver = Math.max(state.highestCpsEver, cpsNow);
    els.cps.textContent = `per second: ${cpsNow.toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
    els.playtime.textContent = `Time played: ${formatDuration(state.totalPlaySeconds)}`;
    const gain = prestigeGain();
    const need = prestigeNeedForNext();
    const clickSpeed = recentClicksPerSecond();
    els.hotkeyNote.textContent = `Toggle UI: ${state.toggleKey.toUpperCase()} | Admin: ${state.adminKey.toUpperCase()} | Wipe: ${HARD_RESET_KEY} | Milk: ${milkPercent()}%`;
    els.prestigeStat.innerHTML = policy.createHTML(
      `Prestige chips: <b>${fmt(state.prestigeChips)}</b> (+${(prestigeMult() * 100 - 100).toFixed(0)}% CpS)<br>` +
      `Ascend reward now: <b>${fmt(gain)}</b> chip(s) (Potential: ${fmt(prestigePotential())})<br>` +
      `Need <b>${fmt(need)}</b> more total cookies for next prestige chip.<br>` +
      `Clicks: <b>${fmt(state.totalClicks)}</b> | Golden clicks: <b>${fmt(state.goldenClicks)}</b> / spawns: <b>${fmt(state.goldenSpawns)}</b> / missed: <b>${fmt(state.goldenMisses)}</b> | Achievements: <b>${state.achievements.length}/${achievementDefs.length}</b><br>` +
      `Golden spawn boost: <b>x${goldenSpawnBoost().toFixed(2)}</b> | Golden power: <b>x${goldenEffectBoost().toFixed(2)}</b><br>` +
      `Hand-made: <b>${fmt(state.handMadeCookies)}</b> | Highest bank: <b>${fmt(state.highestCookies)}</b><br>` +
      `Highest CpS: <b>${state.highestCpsEver.toLocaleString(undefined, { maximumFractionDigits: 1 })}</b> | Click speed: <b>${clickSpeed.toFixed(1)}/s</b> | Time played: <b>${formatDuration(state.totalPlaySeconds)}</b>`
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

  window.addEventListener('pointerdown', () => { listPointerActive = true; }, true);
  window.addEventListener('pointerup', () => { listPointerActive = false; renderList(); }, true);
  window.addEventListener('pointercancel', () => { listPointerActive = false; renderList(); }, true);

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
    for (let i = 0; i < amount; i += 1) total += Math.ceil(baseCost * (COST_GROWTH ** (owned + i)));
    return total;
  }

  function getMaxAffordableCount(baseCost, owned, cookies) {
    if (cookies < Math.ceil(baseCost * (COST_GROWTH ** owned))) return 0;
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
      total += Math.floor((Math.ceil(baseCost * (COST_GROWTH ** tier))) * 0.5);
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
      btn.innerHTML = policy.createHTML(`<b><span class="cc-img3d">${buildingIcon(b.name)}</span> ${b.name}</b> (${b.owned})<br>${state.buyMode === 'buy' ? `Buy ${tradeCount} — Cost: ${fmt(price)} | +${(b.cps * tradeCount).toLocaleString()}/s` : `Sell ${tradeCount} — Gain: ${fmt(price)} | -${(b.cps * tradeCount).toLocaleString()}/s`}`);
      btn.onclick = () => {
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
        b.cost = Math.ceil(b.baseCost * (COST_GROWTH ** b.owned));
        checkAchievements();
        markDirty();
        saveNow();
        renderAll();
      };
      els.list.appendChild(btn);
    });
  }

  function reqText(req) {
    if (!req) return 'Unlocked';
    if (req.type === 'building') return `Needs ${req.count} ${req.name}${req.count > 1 ? 's' : ''}`;
    if (req.type === 'total') return `Needs ${fmt(req.count)} lifetime cookies`;
    if (req.type === 'achievements') return `Needs ${req.count} achievements`;
    return 'Locked';
  }

  function upgradeCategory(u) {
    if (u.milkMult) return { label: 'Kitten', icon: '🐱' };
    if (u.clickMult) return { label: 'Click', icon: '🖱️' };
    return { label: 'Production', icon: '⚙️' };
  }

  function buildingIcon(name) {
    const map = {
      Cursor: '🖱️', Grandma: '👵', Farm: '🌾', Mine: '⛏️', Factory: '🏭', Bank: '🏦', Temple: '⛩️',
      'Wizard Tower': '🧙', Shipment: '🚀', 'Alchemy Lab': '⚗️', Portal: '🌀', 'Time Machine': '⏳', 'Antimatter Condenser': '⚛️',
      'Prism Forge': '💎', Chancemaker: '🎲', 'Fractal Engine': '🧩', 'Javascript Console': '💻', Idleverse: '🌌',
      'Singularity Oven': '🕳️', 'Reality Bakery': '🪐', 'Chrono Reactor': '🧿', 'Nebula Foundry': '🌠'
    };
    return map[name] || '🍪';
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
        btn.onclick = () => {
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
        };
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
    btn.onclick = () => {
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
      state.buildings.forEach((b) => { b.owned = 0; b.cost = b.baseCost; });
      state.upgrades.forEach((u) => { u.bought = false; });
      state.achievements = [];
      addLog(`You ascended and gained ${gain} prestige chip(s).`);
      flash(`Ascended +${gain}`);
      setTab('shop');
      markDirty();
      saveNow();
      renderAll();
    };

    const treeDefs = [
      { id: 'clickLegacy', name: 'Legacy Fingers', max: 8, base: 3, desc: '+25% permanent click power/level' },
      { id: 'goldenLegacy', name: 'Golden Beacon', max: 6, base: 5, desc: '+15% golden spawn rate/level' },
      { id: 'offlineLegacy', name: 'Idle Relics', max: 5, base: 4, desc: '+20% offline production/level' },
      { id: 'cpsLegacy', name: 'Heavenly Machines', max: 8, base: 6, desc: '+8% permanent CpS/level' }
    ];
    const treeWrap = document.createElement('div');
    treeDefs.forEach((node) => {
      const level = state.prestigeUpgrades[node.id] || 0;
      const cost = Math.ceil(node.base * (1.9 ** level));
      const nodeBtn = document.createElement('button');
      nodeBtn.className = `cc-card ${state.prestigeChips >= cost && level < node.max ? 'can-buy' : ''}`;
      nodeBtn.innerHTML = policy.createHTML(`<b>${node.name}</b> Lv.${level}/${node.max}<br>${node.desc}<br>Cost: ${fmt(cost)} chips`);
      nodeBtn.onclick = () => {
        if (level >= node.max || state.prestigeChips < cost) return;
        state.prestigeChips -= cost;
        state.prestigeUpgrades[node.id] += 1;
        addLog(`Prestige upgrade purchased: ${node.name} Lv.${state.prestigeUpgrades[node.id]}.`);
        beep(520, 0.08, 'triangle', 0.03);
        markDirty();
        saveNow();
        renderAll();
      };
      treeWrap.appendChild(nodeBtn);
    });

    const unlockCost = 120;
    const unlockBtn = document.createElement('button');
    unlockBtn.className = `cc-card ${!state.prestigeUpgrades.unlockFutureTech && state.prestigeChips >= unlockCost ? 'can-buy' : ''}`;
    unlockBtn.innerHTML = policy.createHTML(`<b>Future Tech Permit</b><br>Unlock Chrono Reactor + Nebula Foundry.<br>Cost: ${fmt(unlockCost)} chips`);
    unlockBtn.onclick = () => {
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
    };

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
      `Current CpS: <b>${activeCps().toLocaleString(undefined, { maximumFractionDigits: 1 })}</b><br>` +
      `Highest CpS reached: <b>${state.highestCpsEver.toLocaleString(undefined, { maximumFractionDigits: 1 })}</b><br>` +
      `Average cookies per click: <b>${avgClick.toLocaleString(undefined, { maximumFractionDigits: 1 })}</b><br>` +
      `Play efficiency: <b>${efficiency.toFixed(2)}%</b><br>` +
      `Buildings owned: <b>${fmt(totalOwned)}</b><br>` +
      `Most-owned building: <b>${topBuilding?.name || 'None'}</b><br>` +
      `Best performing building: <b>${bestByOutput?.name || 'None'}</b><br>` +
      `Golden cookies clicked: <b>${fmt(state.goldenClicks)}</b><br>` +
      `Golden cookies missed: <b>${fmt(state.goldenMisses)}</b><br>` +
      `Time in tabs (s): shop <b>${Math.floor(state.tabTime.shop)}</b>, upgrades <b>${Math.floor(state.tabTime.upgrades)}</b>, prestige <b>${Math.floor(state.tabTime.prestige)}</b>, achievements <b>${Math.floor(state.tabTime.achievements)}</b>, stats <b>${Math.floor(state.tabTime.stats)}</b><br>` +
      `Time played: <b>${formatDuration(state.totalPlaySeconds)}</b>`
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
    renderLog();
  }

  function triggerRandomEvent() {
    if (state.eventCooldown > 0) return;
    const roll = Math.random();
    if (roll < 0.14) {
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
    state.eventCooldown = 26 + Math.random() * 35;
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
      const bonus = Math.max(1, Math.floor(activeCps() * 4));
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
    let click = Math.max(1, state.multiplier * prestigeMult() * clickMult() * milkMult() * permanentClickMult() * CLICK_DIFFICULTY_MULT);
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

  els.tabShop.onclick = () => setTab('shop');
  els.tabUpgrades.onclick = () => setTab('upgrades');
  els.tabPrestige.onclick = () => setTab('prestige');
  els.tabAchievements.onclick = () => setTab('achievements');
  els.tabStats.onclick = () => setTab('stats');

  els.buy1.onclick = () => { state.buyAmount = 1; renderAll(); };
  els.buy10.onclick = () => { state.buyAmount = 10; renderAll(); };
  els.buy100.onclick = () => { state.buyAmount = 100; renderAll(); };
  els.buyMax.onclick = () => { state.buyAmount = 'max'; renderAll(); };
  els.modeBuy.onclick = () => { state.buyMode = 'buy'; renderAll(); };
  els.modeSell.onclick = () => { state.buyMode = 'sell'; renderAll(); };

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

  function openAdminPanel() {
    const existingOverlay = root.querySelector('.cc-admin-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
      return;
    }

    if (!adminUnlocked) {
      const pass = prompt('Admin code:');
      if (pass === null) return;
      if (pass.trim() !== getAdminCode()) {
        alert('Wrong code.');
        return;
      }
      adminUnlocked = true;
      addLog('Admin panel unlocked.');
    }

    const overlay = document.createElement('div');
    overlay.className = 'cc-admin-overlay';
    const panel = document.createElement('div');
    panel.className = 'cc-admin-panel';

    const title = document.createElement('div');
    title.className = 'cc-admin-title';
    title.textContent = 'Admin Command Console';

    const subtitle = document.createElement('div');
    subtitle.className = 'cc-admin-subtitle';
    subtitle.textContent = 'Grouped controls for economy, progression, events, and emergency actions.';

    const sections = document.createElement('div');
    sections.className = 'cc-admin-sections';

    const makeSection = (label) => {
      const section = document.createElement('div');
      section.className = 'cc-admin-section';
      const heading = document.createElement('div');
      heading.className = 'cc-admin-section-title';
      heading.textContent = label;
      const grid = document.createElement('div');
      grid.className = 'cc-admin-grid';
      section.append(heading, grid);
      sections.appendChild(section);
      return grid;
    };

    const economyGrid = makeSection('Economy');
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
      let click = Math.max(1, state.multiplier * prestigeMult() * clickMult() * milkMult() * permanentClickMult() * CLICK_DIFFICULTY_MULT);
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
        b.cost = Math.ceil(b.baseCost * (COST_GROWTH ** b.owned));
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
    addBtn(utilityGrid, 'Close Panel', () => overlay.remove());

    const note = document.createElement('div');
    note.className = 'cc-admin-note';
    note.textContent = 'Tip: event controls stack with active buffs. Use with caution in saved runs.';

    panel.append(title, subtitle, sections, note);
    overlay.appendChild(panel);
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
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
    if (state.frenzyTimer > 0) state.frenzyTimer = Math.max(0, state.frenzyTimer - 0.1);
    if (state.clickFrenzyTimer > 0) state.clickFrenzyTimer = Math.max(0, state.clickFrenzyTimer - 0.1);
    if (state.elderFrenzyTimer > 0) state.elderFrenzyTimer = Math.max(0, state.elderFrenzyTimer - 0.1);
    if (state.clotTimer > 0) state.clotTimer = Math.max(0, state.clotTimer - 0.1);
    if (state.cookieStormTimer > 0) state.cookieStormTimer = Math.max(0, state.cookieStormTimer - 0.1);
    if (state.cookieStormTimer > 0 && Math.random() < 0.055) spawnStormCookie();
    if (state.buildingSpecialTimer > 0) state.buildingSpecialTimer = Math.max(0, state.buildingSpecialTimer - 0.1);
    if (state.dragonHarvestTimer > 0) state.dragonHarvestTimer = Math.max(0, state.dragonHarvestTimer - 0.1);
    if (state.cursedFingerTimer > 0) state.cursedFingerTimer = Math.max(0, state.cursedFingerTimer - 0.1);
    if (state.buildingRushTimer > 0) state.buildingRushTimer = Math.max(0, state.buildingRushTimer - 0.1);
    if (state.sugarRushTimer > 0) state.sugarRushTimer = Math.max(0, state.sugarRushTimer - 0.1);
    if (state.wrathModeTimer > 0) state.wrathModeTimer = Math.max(0, state.wrathModeTimer - 0.1);
    if (state.eventCooldown > 0) state.eventCooldown = Math.max(0, state.eventCooldown - 0.1);
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
    renderAll();
  }, 100);

  const autosaveId = setInterval(() => {
    if (dirtySinceSave) saveNow();
  }, 7000);

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

  const encoded = 'KCgpID0+IHsNCiAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtY29uc29sZS1yb290Jyk7DQogIGlmIChleGlzdGluZykgZXhpc3RpbmcucmVtb3ZlKCk7DQoNCiAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOw0KICByb290LmlkID0gJ3RkLWNvbnNvbGUtcm9vdCc7DQogIE9iamVjdC5hc3NpZ24ocm9vdC5zdHlsZSwgew0KICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogJzAnLCB6SW5kZXg6ICcyMTQ3NDgzNjQ3JywgYmFja2dyb3VuZDogJyMwZjFiMmQnLCBwb2ludGVyRXZlbnRzOiAnYXV0bycsDQogIH0pOw0KICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpOw0KDQogIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOw0KICBPYmplY3QuYXNzaWduKGNhbnZhcy5zdHlsZSwgew0KICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogJzAnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgZGlzcGxheTogJ2Jsb2NrJywgY3Vyc29yOiAnY3Jvc3NoYWlyJywNCiAgfSk7DQogIHJvb3QuYXBwZW5kQ2hpbGQoY2FudmFzKTsNCiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7DQoNCiAgY29uc3QgaGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOw0KICBoaW50LnRleHRDb250ZW50ID0gJ01lcmdlZCBDb25zb2xlIFREIOKAlCBTSE9QL1VQR1JBREVTL1BSTy9BR0VOVFMgfCBFU0MgcXVpdCc7DQogIE9iamVjdC5hc3NpZ24oaGludC5zdHlsZSwgew0KICAgIHBvc2l0aW9uOiAnZml4ZWQnLCB0b3A6ICcxMHB4JywgbGVmdDogJzEwcHgnLCBjb2xvcjogJyNmZmYnLCBmb250OiAnNjAwIDEycHggc3lzdGVtLXVpLHNhbnMtc2VyaWYnLA0KICAgIGJhY2tncm91bmQ6ICcjMDAwOScsIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIHBvaW50ZXJFdmVudHM6ICdub25lJywNCiAgfSk7DQogIHJvb3QuYXBwZW5kQ2hpbGQoaGludCk7DQoNCiAgLy8gQURNSU4gUEFORUwgKHBhc3N3b3JkIHByb3RlY3RlZCkNCiAgY29uc3QgQURNSU5fUEFTU1dPUkQgPSAnMjU4OSc7DQogIGxldCBhZG1pblVubG9ja2VkID0gZmFsc2U7DQogIGxldCBzaG93QWRtaW5QYW5lbCA9IGZhbHNlOw0KICBsZXQgc2hvd0FkbWluTG9naW4gPSBmYWxzZTsNCg0KICBjb25zdCBhZG1pblBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7DQogIE9iamVjdC5hc3NpZ24oYWRtaW5QYW5lbC5zdHlsZSwgew0KICAgIHBvc2l0aW9uOiAnZml4ZWQnLCB0b3A6ICc2MHB4JywgcmlnaHQ6ICczNTBweCcsIHdpZHRoOiAnMzIwcHgnLCBiYWNrZ3JvdW5kOiAnIzBkMWIyYScsDQogICAgYm9yZGVyOiAnMnB4IHNvbGlkICNmZmQxNjYnLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgcGFkZGluZzogJzE0cHgnLCB6SW5kZXg6ICcyMTQ3NDgzNjQ4JywNCiAgICBjb2xvcjogJyNmZmYnLCBmb250RmFtaWx5OiAnc3lzdGVtLXVpLHNhbnMtc2VyaWYnLCBmb250U2l6ZTogJzEzcHgnLCBkaXNwbGF5OiAnbm9uZScsIGJveFNoYWRvdzogJzAgNHB4IDMycHggIzAwMGEnLA0KICB9KTsNCiAgcm9vdC5hcHBlbmRDaGlsZChhZG1pblBhbmVsKTsNCg0KICBjb25zdCBhZG1pbkxvZ2luQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7DQogIE9iamVjdC5hc3NpZ24oYWRtaW5Mb2dpbkJveC5zdHlsZSwgew0KICAgIHBvc2l0aW9uOiAnZml4ZWQnLCB0b3A6ICc1MCUnLCBsZWZ0OiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsLTUwJSknLCB3aWR0aDogJzM0MHB4JywNCiAgICBiYWNrZ3JvdW5kOiAnIzBkMWIyYScsIGJvcmRlcjogJzJweCBzb2xpZCAjZmZkMTY2JywgYm9yZGVyUmFkaXVzOiAnMTJweCcsIHBhZGRpbmc6ICcyMHB4JywNCiAgICB6SW5kZXg6ICcyMTQ3NDgzNjQ5JywgY29sb3I6ICcjZmZmJywgZm9udEZhbWlseTogJ3N5c3RlbS11aSxzYW5zLXNlcmlmJywgdGV4dEFsaWduOiAnY2VudGVyJywgZGlzcGxheTogJ25vbmUnLA0KICB9KTsNCiAgYWRtaW5Mb2dpbkJveC5pbm5lckhUTUwgPSBgDQogICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjIwcHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1ib3R0b206OHB4OyI+8J+UkiBBZG1pbiBBY2Nlc3M8L2Rpdj4NCiAgICA8aW5wdXQgaWQ9InRkLWFkbWluLXB3IiB0eXBlPSJwYXNzd29yZCIgbWF4bGVuZ3RoPSIyMCIgcGxhY2Vob2xkZXI9IlBhc3N3b3JkIg0KICAgICAgc3R5bGU9IndpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6MTBweCAxNHB4O2ZvbnQtc2l6ZToxNnB4O2JvcmRlci1yYWRpdXM6NnB4O2JvcmRlcjoxcHggc29saWQgI2ZmZDE2NjtiYWNrZ3JvdW5kOiMxYTJhNDQ7Y29sb3I6I2ZmZjtvdXRsaW5lOm5vbmU7bWFyZ2luOjEwcHggMDsiIC8+DQogICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDoxMHB4O2p1c3RpZnktY29udGVudDpjZW50ZXI7Ij4NCiAgICAgIDxidXR0b24gaWQ9InRkLWFkbWluLXN1Ym1pdCIgc3R5bGU9InBhZGRpbmc6OXB4IDI4cHg7YmFja2dyb3VuZDojZmZkMTY2O2NvbG9yOiMxMTE7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NnB4O2N1cnNvcjpwb2ludGVyOyI+VW5sb2NrPC9idXR0b24+DQogICAgICA8YnV0dG9uIGlkPSJ0ZC1hZG1pbi1jYW5jZWwiIHN0eWxlPSJwYWRkaW5nOjlweCAyOHB4O2JhY2tncm91bmQ6IzNhNTA2Yjtjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjZweDtjdXJzb3I6cG9pbnRlcjsiPkNhbmNlbDwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgaWQ9InRkLWFkbWluLWVyciIgc3R5bGU9Im1hcmdpbi10b3A6OHB4O2NvbG9yOiNmZjU5NWU7bWluLWhlaWdodDoxNnB4OyI+PC9kaXY+DQogIGA7DQogIHJvb3QuYXBwZW5kQ2hpbGQoYWRtaW5Mb2dpbkJveCk7DQoNCiAgY29uc3QgU0lERV9QQU5FTCA9IDMzMDsNCiAgY29uc3QgVElDS19NUyA9IDEwMDAgLyA2MDsNCiAgY29uc3QgTUFYX1dBVkVTID0gNDU7DQogIGNvbnN0IEhPTUVfQ0VOVEVSX1hfT0ZGU0VUID0gNDI7DQoNCiAgbGV0IHdpZHRoID0gMCwgaGVpZ2h0ID0gMDsNCiAgbGV0IGdhbWVPdmVyID0gZmFsc2UsIHJ1bldvbiA9IGZhbHNlOw0KICBsZXQgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgc3Bhd25UaW1lciA9IDAsIHdhdmVRdWV1ZSA9IFtdOw0KICBsZXQgc2hvcFNjcm9sbCA9IDAsIHdoZWVsQWNjdW0gPSAwOw0KICBsZXQgbWFwU2Nyb2xsID0gMDsNCiAgbGV0IGF1dG9OZXh0V2F2ZSA9IGZhbHNlLCBnYW1lU3BlZWQgPSAxOw0KICBsZXQgY3VycmVudFNjcmVlbiA9ICdob21lJzsNCiAgbGV0IHNjZW5lcnlCeU1hcCA9IFtdOw0KDQogIGNvbnN0IGRpZmZpY3VsdHlEZWZzID0gew0KICAgIGVhc3k6IHsgbmFtZTogJ0Vhc3knLCBzdGFydENhc2g6IDkwMCwgbGl2ZXM6IDE1MCwgYmxvb25IcDogMC45LCBibG9vblNwZWVkOiAwLjkyLCBjYXNoTXVsdDogMS4xMiwgY29pbk11bHQ6IDEuMCB9LA0KICAgIG1lZGl1bTogeyBuYW1lOiAnTWVkaXVtJywgc3RhcnRDYXNoOiA3MDAsIGxpdmVzOiAxMDAsIGJsb29uSHA6IDEuMCwgYmxvb25TcGVlZDogMS4wLCBjYXNoTXVsdDogMS4wLCBjb2luTXVsdDogMS4zNSB9LA0KICAgIGhhcmQ6IHsgbmFtZTogJ0hhcmQnLCBzdGFydENhc2g6IDU0MCwgbGl2ZXM6IDcwLCBibG9vbkhwOiAxLjI1LCBibG9vblNwZWVkOiAxLjEyLCBjYXNoTXVsdDogMC45LCBjb2luTXVsdDogMS44IH0sDQogICAgaW1wb3BwYWJsZTogeyBuYW1lOiAnSW1wb3BwYWJsZScsIHN0YXJ0Q2FzaDogNDUwLCBsaXZlczogMSwgYmxvb25IcDogMS40NSwgYmxvb25TcGVlZDogMS4yLCBjYXNoTXVsdDogMC44MiwgY29pbk11bHQ6IDIuMiB9LA0KICB9Ow0KDQogIGNvbnN0IHByb2dyZXNzaW9uID0gew0KICAgIHhwOiAwLCBsZXZlbDogMSwgcG9pbnRzOiAwLCBhdHRhY2tTcGVlZExldmVsOiAwLCBzdGFydGluZ0Nhc2hMZXZlbDogMCwNCiAgfTsNCg0KICBjb25zdCBwcm9maWxlID0gew0KICAgIGNvaW5zOiBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RkX2NvaW5zJykgfHwgJzAnKSwNCiAgICBtb25rZXlNb25leTogTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0ZF9tbScpIHx8ICcwJyksDQogICAgdW5sb2NrZWRTcGVjaWFsVG93ZXJzOiB7DQogICAgICBzdXBlcjogZmFsc2UsIGxhc2VyOiBmYWxzZSwgcGxhc21hOiBmYWxzZSwgc3VuOiBmYWxzZSwNCiAgICB9LA0KICB9Ow0KDQogIGNvbnN0IGxvYWRlZFVubG9ja3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGRfdW5sb2NrcycpOw0KICBpZiAobG9hZGVkVW5sb2Nrcykgew0KICAgIHRyeSB7IE9iamVjdC5hc3NpZ24ocHJvZmlsZS51bmxvY2tlZFNwZWNpYWxUb3dlcnMsIEpTT04ucGFyc2UobG9hZGVkVW5sb2NrcykpOyB9IGNhdGNoIHt9DQogIH0NCg0KICBjb25zdCBzdGF0ZSA9IHsNCiAgICBtb25leTogNzAwLCBsaXZlczogMTAwLCB3YXZlOiAxLA0KICAgIGhvdmVyOiB7IHg6IDAsIHk6IDAgfSwNCiAgICBzZWxlY3RlZFRvd2VyVHlwZTogJ2RhcnQnLA0KICAgIHNlbGVjdGVkVG93ZXI6IG51bGwsDQogICAgc2VsZWN0ZWRNYXA6IDAsDQogICAgZGlmZmljdWx0eTogJ21lZGl1bScsDQogIH07DQoNCiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbWluLXN1Ym1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gew0KICAgIGNvbnN0IHZhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1hZG1pbi1wdycpLnZhbHVlOw0KICAgIGlmICh2YWwgPT09IEFETUlOX1BBU1NXT1JEKSB7DQogICAgICBhZG1pblVubG9ja2VkID0gdHJ1ZTsNCiAgICAgIHNob3dBZG1pbkxvZ2luID0gZmFsc2U7DQogICAgICBzaG93QWRtaW5QYW5lbCA9IHRydWU7DQogICAgICBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7DQogICAgICByZW5kZXJBZG1pblBhbmVsKCk7DQogICAgICBhZG1pblBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOw0KICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbWluLWVycicpLnRleHRDb250ZW50ID0gJyc7DQogICAgfSBlbHNlIHsNCiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1hZG1pbi1lcnInKS50ZXh0Q29udGVudCA9ICdJbmNvcnJlY3QgcGFzc3dvcmQnOw0KICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbWluLXB3JykudmFsdWUgPSAnJzsNCiAgICB9DQogIH0pOw0KICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtaW4tY2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7DQogICAgc2hvd0FkbWluTG9naW4gPSBmYWxzZTsNCiAgICBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7DQogIH0pOw0KDQogIGNvbnN0IGFnZW50cyA9IHsgc3Bpa2VzOiAzLCBnbHVlVHJhcDogMiwgZmFybWVyOiAxIH07DQogIGxldCBhZ2VudE1vZGUgPSBudWxsOw0KICBjb25zdCBwbGFjZWRBZ2VudHMgPSBbXTsgLy8gZGVwcmVjYXRlZCAoYWdlbnRzIHJlbW92ZWQgZnJvbSBVSS9jb250cm9scykNCg0KICBjb25zdCB0b3dlckRlZnMgPSB7DQogICAgZGFydDogeyBuYW1lOiAnRGFydCcsIGljb246ICfinqQnLCBjb2xvcjogJyM4ZDZlNjMnLCBjb3N0OiAxNzAsIHJhbmdlOiAxNDUsIGZpcmVSYXRlOiAyOSwgZGFtYWdlOiAxLCBwaWVyY2U6IDEsIHByb2plY3RpbGVTcGVlZDogMTEsIHVubG9ja0x2bDogMSwNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydQaWVyY2UrJywgJ1JhbmdlKycsICdMZWFkIFBvcCcsICdSYXBpZCBEYXJ0cycsICdQUk8gUGxhc21hJywgJ1BSTysgSHlwZXInLCAnUFJPIE1BWCddLA0KICAgICAgICAgICAgICAgICAgIHAyOiBbJ0NhbW8gU2lnaHQnLCAnTGVhZCBQb3AnLCAnQ3JpdCBEYXJ0cycsICdGYXN0ZXIgSGFuZHMnLCAnUFJPIFNjb3V0JywgJ1BSTysgSW50ZWwnLCAnUFJPIE1BWCddIH0gfSwNCiAgICBuaW5qYTogeyBuYW1lOiAnTmluamEnLCBpY29uOiAn4pymJywgY29sb3I6ICcjNWUzNWIxJywgY29zdDogMzYwLCByYW5nZTogMTg1LCBmaXJlUmF0ZTogMTcsIGRhbWFnZTogMSwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEzLCB1bmxvY2tMdmw6IDIsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnU2hhcnBlciBTdGFycycsICdSYW5nZSsnLCAnTGVhZCBQb3AnLCAnRmxhc2ggQm9tYicsICdQUk8gR3JhbmRtYXN0ZXInLCAnUFJPKyBTdG9ybScsICdQUk8gTUFYJ10sDQogICAgICAgICAgICAgICAgICAgcDI6IFsnQ2FtbyBNYXN0ZXInLCAnU2h1cmlrZW4rJywgJ1N0aWNreSBIaXQnLCAnQXR0YWNrIFNwZWVkJywgJ1BSTyBTYWJvdGV1cicsICdQUk8rIFNoYWRvdycsICdQUk8gTUFYJ10gfSB9LA0KICAgIGJvbWI6IHsgbmFtZTogJ0JvbWInLCBpY29uOiAn4py5JywgY29sb3I6ICcjMzc0NzRmJywgY29zdDogNjIwLCByYW5nZTogMTcwLCBmaXJlUmF0ZTogNTUsIGRhbWFnZTogMSwgcGllcmNlOiAxLCBwcm9qZWN0aWxlU3BlZWQ6IDgsIHNwbGFzaDogODUsIHVubG9ja0x2bDogMywNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydCaWdnZXIgQmxhc3QnLCAnSGVhdnkgU2hlbGwnLCAnQ2x1c3RlcicsICdNT0FCIFBvcCcsICdQUk8gU2llZ2UnLCAnUFJPKyBCYXJyYWdlJywgJ1BSTyBNQVgnXSwNCiAgICAgICAgICAgICAgICAgICBwMjogWydGYXN0ZXIgUmVsb2FkJywgJ0JsYXN0KycsICdTdHVuJywgJ1JhcGlkIEJvbWJzJywgJ1BSTyBEZW1vJywgJ1BSTysgU2hvY2snLCAnUFJPIE1BWCddIH0gfSwNCiAgICBpY2U6IHsgbmFtZTogJ0ljZScsIGljb246ICfinYQnLCBjb2xvcjogJyM4MWQ0ZmEnLCBjb3N0OiA0MzAsIHJhbmdlOiAxMjAsIGZpcmVSYXRlOiA0NSwgZGFtYWdlOiAxLCBwaWVyY2U6IDk5OSwgcHJvamVjdGlsZVNwZWVkOiAwLCBmcmVlemVEdXJhdGlvbjogODAsIHVubG9ja0x2bDogNCwNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydMb25nIEZyZWV6ZScsICdDb2xkIFNuYXAnLCAnRGVlcCBGcmVlemUnLCAnQXJjdGljIEF1cmEnLCAnUFJPIFplcm8nLCAnUFJPKyBCbGl6emFyZCcsICdQUk8gTUFYJ10sDQogICAgICAgICAgICAgICAgICAgcDI6IFsnQ2FtbyBGcmVlemUnLCAnTGVhZCBDcmFjaycsICdCcml0dGxlJywgJ1B1bHNlIFNwZWVkJywgJ1BSTyBQZXJtYWZyb3N0JywgJ1BSTysgR2xhY2lhbCcsICdQUk8gTUFYJ10gfSB9LA0KICAgIHNuaXBlcjogeyBuYW1lOiAnU25pcGVyJywgaWNvbjogJ+KXiScsIGNvbG9yOiAnIzI2MzIzOCcsIGNvc3Q6IDU1MCwgcmFuZ2U6IDUwMDAsIGZpcmVSYXRlOiA2OCwgZGFtYWdlOiAzLCBwaWVyY2U6IDEsIHByb2plY3RpbGVTcGVlZDogMjAsIHVubG9ja0x2bDogNSwNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydEYW1hZ2UrJywgJ0RhbWFnZSsnLCAnTGVhZC9DZXJhbWljKycsICdGYXN0ZXIgQWltJywgJ1BSTyBFbGl0ZScsICdQUk8rIERlYWRleWUnLCAnUFJPIE1BWCddLA0KICAgICAgICAgICAgICAgICAgIHAyOiBbJ1Zpc2lvbisnLCAnU2hyYXBuZWwnLCAnUmV2ZWFsJywgJ1JlbG9hZCsnLCAnUFJPIFN1cHBvcnQnLCAnUFJPKyBSYWRhcicsICdQUk8gTUFYJ10gfSB9LA0KICAgIGJvb21lcmFuZzogeyBuYW1lOiAnQm9vbWVyJywgaWNvbjogJ+KXjCcsIGNvbG9yOiAnI2ZmOTgwMCcsIGNvc3Q6IDQxMCwgcmFuZ2U6IDE3MCwgZmlyZVJhdGU6IDI0LCBkYW1hZ2U6IDEsIHBpZXJjZTogNCwgcHJvamVjdGlsZVNwZWVkOiAxMCwgdW5sb2NrTHZsOiAyLA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ1BpZXJjZSsnLCAnUmFuZ2UrJywgJ0xlYWQgU2xpY2UnLCAnRGFtYWdlKycsICdQUk8gU3Rvcm0nLCAnUFJPKyBDeWNsb25lJywgJ1BSTyBNQVgnXSwNCiAgICAgICAgICAgICAgICAgICBwMjogWydGYXN0ZXIgVGhyb3cnLCAnUmljb2NoZXQnLCAnRG91YmxlIFRocm93JywgJ0Zhc3RlcisnLCAnUFJPIFJldHVybmluZysnLCAnUFJPKyBPcmJpdCcsICdQUk8gTUFYJ10gfSB9LA0KICAgIHRhY2s6IHsgbmFtZTogJ1RhY2snLCBpY29uOiAn4py4JywgY29sb3I6ICcjZjA2MjkyJywgY29zdDogMzIwLCByYW5nZTogOTUsIGZpcmVSYXRlOiAxMiwgZGFtYWdlOiAxLCBwaWVyY2U6IDEsIHByb2plY3RpbGVTcGVlZDogOSwgYnVyc3Q6IDYsIHVubG9ja0x2bDogMiwNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydNb3JlIFRhY2tzJywgJ1JhbmdlKycsICdIb3QgVGFja3MnLCAnQnVyc3QrJywgJ1BSTyBJbmZlcm5vJywgJ1BSTysgU3BpbicsICdQUk8gTUFYJ10sDQogICAgICAgICAgICAgICAgICAgcDI6IFsnRmFzdGVyIFNob3QnLCAnRmFzdGVyKycsICdSaW5nKycsICdTcGVlZCsnLCAnUFJPIEh5cGVyJywgJ1BSTysgQmxhZGVzJywgJ1BSTyBNQVgnXSB9IH0sDQogICAgZ2x1ZTogeyBuYW1lOiAnR2x1ZScsIGljb246ICfil48nLCBjb2xvcjogJyM4YmMzNGEnLCBjb3N0OiAzMDAsIHJhbmdlOiAxNDUsIGZpcmVSYXRlOiAyOCwgZGFtYWdlOiAwLCBwaWVyY2U6IDEsIHByb2plY3RpbGVTcGVlZDogMTAsIGdsdWVTbG93OiAwLjU1LCBnbHVlVGlja3M6IDEyMCwgdW5sb2NrTHZsOiAzLA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ0xvbmdlciBHbHVlJywgJ1N0cm9uZ2VyIFNsb3cnLCAnR2x1ZSBTcGxhdHRlcicsICdBT0UgR2x1ZScsICdQUk8gU29sdmVyJywgJ1BSTysgQ29ycm9zaW9uJywgJ1BSTyBNQVgnXSwNCiAgICAgICAgICAgICAgICAgICBwMjogWydGYXN0ZXIgU2hvdHMnLCAnR2x1ZSBTb2FrJywgJ1Nsb3crJywgJ0dsb2JhbCBHbHVlJywgJ1BSTyBTdG9ybScsICdQUk8rIE1lbHQnLCAnUFJPIE1BWCddIH0gfSwNCiAgICB2aWxsYWdlOiB7IG5hbWU6ICdWaWxsYWdlJywgaWNvbjogJ+KMgicsIGNvbG9yOiAnI2YyZDM5YycsIGNvc3Q6IDc2MCwgcmFuZ2U6IDE2NSwgZmlyZVJhdGU6IDk5OTk5LCBkYW1hZ2U6IDAsIHBpZXJjZTogMCwgcHJvamVjdGlsZVNwZWVkOiAwLCB1bmxvY2tMdmw6IDYsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQmlnZ2VyIFJhZGl1cycsICdKdW5nbGUgRHJ1bXMnLCAnUmFkYXIgU2Nhbm5lcicsICdQcmltYXJ5IFRyYWluaW5nJywgJ1BSTyBIb21lbGFuZCcsICdQUk8rIENvbW1hbmQnLCAnUFJPIE1BWCddLA0KICAgICAgICAgICAgICAgICAgIHAyOiBbJ0Rpc2NvdW50JywgJ0JpZyBEaXNjb3VudCcsICdNb25rZXkgSW50ZWwnLCAnTUlCJywgJ1BSTyBDVEEnLCAnUFJPKyBTdXBwb3J0JywgJ1BSTyBNQVgnXSB9IH0sDQogICAgc3VwZXI6IHsgbmFtZTogJ1N1cGVyJywgaWNvbjogJ+KsoicsIGNvbG9yOiAnI2ZmZDU0ZicsIGNvc3Q6IDI4MDAsIHJhbmdlOiAyNDAsIGZpcmVSYXRlOiA2LCBkYW1hZ2U6IDIsIHBpZXJjZTogMywgcHJvamVjdGlsZVNwZWVkOiAxNywgdW5sb2NrQ29pbnM6IDkwMCB9LA0KICAgIGxhc2VyOiB7IG5hbWU6ICdMYXNlcicsIGljb246ICfilZAnLCBjb2xvcjogJyM4MGRlZWEnLCBjb3N0OiAzNDAwLCByYW5nZTogMjYwLCBmaXJlUmF0ZTogOSwgZGFtYWdlOiA0LCBwaWVyY2U6IDUsIHByb2plY3RpbGVTcGVlZDogMTksIHVubG9ja0NvaW5zOiAxNjAwIH0sDQogICAgcGxhc21hOiB7IG5hbWU6ICdQbGFzbWEnLCBpY29uOiAn4py6JywgY29sb3I6ICcjYmE2OGM4JywgY29zdDogNDMwMCwgcmFuZ2U6IDI3NSwgZmlyZVJhdGU6IDgsIGRhbWFnZTogNSwgcGllcmNlOiA2LCBwcm9qZWN0aWxlU3BlZWQ6IDIwLCB1bmxvY2tDb2luczogMjYwMCB9LA0KICAgIHN1bjogeyBuYW1lOiAnU3VuIEdvZCcsIGljb246ICfimIAnLCBjb2xvcjogJyNmZmNhMjgnLCBjb3N0OiA2MjAwLCByYW5nZTogMzA1LCBmaXJlUmF0ZTogNywgZGFtYWdlOiA4LCBwaWVyY2U6IDgsIHByb2plY3RpbGVTcGVlZDogMjIsIHVubG9ja0NvaW5zOiA0MjAwIH0sDQogICAgZmFybTogeyBuYW1lOiAnRmFybScsIGljb246ICfilqYnLCBjb2xvcjogJyM2NmJiNmEnLCBjb3N0OiAxMDUwLCByYW5nZTogMCwgZmlyZVJhdGU6IDk5OTk5LCBkYW1hZ2U6IDAsIHBpZXJjZTogMCwgcHJvamVjdGlsZVNwZWVkOiAwLCB1bmxvY2tMdmw6IDQsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnTW9yZSBCYW5hbmFzJywgJ0V2ZW4gTW9yZScsICdCb3VudGlmdWwnLCAnTWFya2V0cGxhY2UnLCAnQmFuYW5hIENlbnRyYWwnXSwgcDI6IFsnRmFzdGVyIEhhcnZlc3QnLCAnVmFsdWFibGUgQmFuYW5hcycsICdCYW5raW5nJywgJ0JpZyBCYW5rJywgJ1dhbGwgU3RyZWV0J10sIHAzOiBbJ0ZlcnRpbGl6ZXInLCAnTG9uZyBDcmF0ZXMnLCAnQXV0by1Db2xsZWN0JywgJ01vbmtleW5vbWljcycsICdHb2QgRmFybSddIH0gfSwNCiAgICBzdXBwb3J0OiB7IG5hbWU6ICdTdXBwb3J0JywgaWNvbjogJ+KcmicsIGNvbG9yOiAnIzkwYTRhZScsIGNvc3Q6IDk4MCwgcmFuZ2U6IDE3MCwgZmlyZVJhdGU6IDk5OTk5LCBkYW1hZ2U6IDAsIHBpZXJjZTogMCwgcHJvamVjdGlsZVNwZWVkOiAwLCB1bmxvY2tMdmw6IDUsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnUmFuZ2UgQXVyYScsICdCaWdnZXIgQXVyYScsICdTaGFycGVuJywgJ0VsaXRlIFJhbmdlJywgJ0NvbW1hbmRlciddLCBwMjogWydTcGVlZCBBdXJhJywgJ0Zhc3RlciBBdXJhJywgJ092ZXJjbG9jaycsICdVbHRyYSBCb29zdCcsICdUaW1lIFdhcnAnXSwgcDM6IFsnRGV0ZWN0aW9uJywgJ0xlYWQgQXNzaXN0JywgJ0FybW9yIENyYWNrJywgJ0Jvc3MgRGVidWZmJywgJ0dvZCBTdXBwb3J0J10gfSB9LA0KICAgIHdpemFyZDogeyBuYW1lOiAnV2l6YXJkJywgaWNvbjogJ+KcpycsIGNvbG9yOiAnIzdlNTdjMicsIGNvc3Q6IDUyMCwgcmFuZ2U6IDE5MCwgZmlyZVJhdGU6IDIwLCBkYW1hZ2U6IDIsIHBpZXJjZTogMiwgcHJvamVjdGlsZVNwZWVkOiAxMiwgdW5sb2NrTHZsOiA0LA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ0FyY2FuZSBQb3dlcicsICdEcmFnb24gQnJlYXRoJywgJ1Bob2VuaXggU3BhcmsnLCAnTU9BQiBIZXgnLCAnQXJjaG1hZ2UnXSwgcDI6IFsnRmFzdCBDYXN0JywgJ0ZvcmsgQm9sdCcsICdNYW5hIEZsb29kJywgJ0dsb2JhbCBSdW5lJywgJ09yYWNsZSddLCBwMzogWydDYW1vIFNpZ2h0JywgJ0xlYWQgTWVsdCcsICdGbGFtZSBXYWxsJywgJ1N0b3JtIEZpcmUnLCAnTXl0aGljJ10gfSB9LA0KICAgIGVuZ2luZWVyOiB7IG5hbWU6ICdFbmdpbmVlcicsIGljb246ICfimpknLCBjb2xvcjogJyM5MGE0YWUnLCBjb3N0OiA2MDAsIHJhbmdlOiAxNTUsIGZpcmVSYXRlOiAyNCwgZGFtYWdlOiAxLCBwaWVyY2U6IDIsIHByb2plY3RpbGVTcGVlZDogMTEsIHVubG9ja0x2bDogNCwNCiAgICAgIHBhdGhOYW1lczogeyBwMTogWydOYWlsIEd1bisnLCAnSGVhdnkgTmFpbHMnLCAnU2VudHJ5IERyb3AnLCAnTU9BQiBSaXZldHMnLCAnT3ZlcmNsb2NrJ10sIHAyOiBbJ0Zhc3RlciBCdWlsZCcsICdUcmFwJywgJ0JpZ2dlciBUcmFwJywgJ1N1cHBvcnQgR3JpZCcsICdGYWN0b3J5J10sIHAzOiBbJ0ludGVsIFRvb2xzJywgJ1BpbicsICdBcm1vciBDcmFjaycsICdNZWdhIFJpdmV0JywgJ01lY2gnXSB9IH0sDQogICAgYWxjaGVtaXN0OiB7IG5hbWU6ICdBbGNoZW1pc3QnLCBpY29uOiAn4pqXJywgY29sb3I6ICcjNjZiYjZhJywgY29zdDogNjQwLCByYW5nZTogMTUwLCBmaXJlUmF0ZTogMzAsIGRhbWFnZTogMSwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEwLCB1bmxvY2tMdmw6IDUsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnQWNpZCBNaXgnLCAnTGVhZCBNZWx0JywgJ01PQUIgQWNpZCcsICdVbnN0YWJsZSBCcmV3JywgJ1NvbHZlciddLCBwMjogWydTdGltIEJyZXcnLCAnQmVyc2Vya2VyIEJyZXcnLCAnUGVybWFuZW50IEJyZXcnLCAnQ2F0YWx5c3QgQXVyYScsICdFbGl4aXInXSwgcDM6IFsnUG90aW9uKycsICdDb3Jyb2RlKycsICdUb25pYycsICdUb3hpYyBDbG91ZCcsICdQaGlsb3NvcGhlciddIH0gfSwNCiAgICBkcnVpZDogeyBuYW1lOiAnRHJ1aWQnLCBpY29uOiAn4piYJywgY29sb3I6ICcjMmU3ZDMyJywgY29zdDogNTYwLCByYW5nZTogMTgwLCBmaXJlUmF0ZTogMjMsIGRhbWFnZTogMiwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEyLCB1bmxvY2tMdmw6IDUsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnVGhvcm5zKycsICdCcmFtYmxlcycsICdWaW5lIENydXNoJywgJ05hdHVyZSBGdXJ5JywgJ1dpbGQnXSwgcDI6IFsnVGVtcGVzdCcsICdTdG9ybSsnLCAnVG9ybmFkbycsICdIdXJyaWNhbmUnLCAnQ3ljbG9uZSddLCBwMzogWydXcmF0aCcsICdXcmF0aCsnLCAnUHJpbWFsJywgJ0ZvcmVzdCBDYWxsJywgJ0dyb3ZlJ10gfSB9LA0KICAgIG1vcnRhcjogeyBuYW1lOiAnTW9ydGFyJywgaWNvbjogJ+KcpicsIGNvbG9yOiAnIzhkNmU2MycsIGNvc3Q6IDc4MCwgcmFuZ2U6IDUwMDAsIGZpcmVSYXRlOiA0NiwgZGFtYWdlOiAzLCBwaWVyY2U6IDIsIHByb2plY3RpbGVTcGVlZDogOCwgc3BsYXNoOiA5MiwgdW5sb2NrTHZsOiA2LA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ0JsYXN0IFJhZGl1cysnLCAnU2hlbGwgU2hvY2snLCAnSGVhdnkgU2hlbGwnLCAnTU9BQiBCYXJyYWdlJywgJ1NpZWdlJ10sIHAyOiBbJ0Zhc3QgUmVsb2FkJywgJ0FydGlsbGVyeScsICdSYXBpZCBGaXJlJywgJ0luY2VuZGlhcnknLCAnTmFwYWxtJ10sIHAzOiBbJ1RhcmdldGluZysnLCAnU2lnbmFsJywgJ1NocmFwbmVsJywgJ1Nob2Nrd2F2ZScsICdRdWFrZSddIH0gfSwNCiAgICBzdG9ybTogeyBuYW1lOiAnU3Rvcm0nLCBpY29uOiAn4piEJywgY29sb3I6ICcjMjliNmY2JywgY29zdDogOTIwLCByYW5nZTogMjEwLCBmaXJlUmF0ZTogMTgsIGRhbWFnZTogMiwgcGllcmNlOiAzLCBwcm9qZWN0aWxlU3BlZWQ6IDE0LCB1bmxvY2tMdmw6IDcsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnTGlnaHRuaW5nKycsICdDaGFpbiBCb2x0JywgJ1RodW5kZXJzdHJpa2UnLCAnU2t5IFdyYXRoJywgJ1RlbXBlc3QnXSwgcDI6IFsnV2luZCsnLCAnR2FsZScsICdDeWNsb25lJywgJ1Blcm1hIFNxdWFsbCcsICdWb3J0ZXgnXSwgcDM6IFsnU3RhdGljJywgJ1N0YXRpYysnLCAnSW9uJywgJ0VNUCcsICdOb3ZhJ10gfSB9LA0KICAgIHN1Ym1hcmluZTogeyBuYW1lOiAnU3ViJywgaWNvbjogJ+KfgScsIGNvbG9yOiAnIzRmYzNmNycsIGNvc3Q6IDY4MCwgcmFuZ2U6IDIwNSwgZmlyZVJhdGU6IDIwLCBkYW1hZ2U6IDIsIHBpZXJjZTogMiwgcHJvamVjdGlsZVNwZWVkOiAxMiwgdW5sb2NrTHZsOiA1LA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ1RvcnBlZG8rJywgJ1JhZGFyIFNvbmFyJywgJ0h1bnRlcicsICdBcm1vciBQaWVyY2VyJywgJ0tyYWtlbiddLCBwMjogWydGYXN0ZXIgU29uYXInLCAnTWlzc2lsZScsICdEZXB0aCBDaGFyZ2UnLCAnV2F2ZSBCcmVhaycsICdGbGVldCddLCBwMzogWydEaXZlJywgJ0RpdmUrJywgJ1N0ZWFsdGgnLCAnU2lsZW50IFJ1bicsICdBYnlzcyddIH0gfSwNCiAgICBib2F0OiB7IG5hbWU6ICdCb2F0JywgaWNvbjogJ+KbtScsIGNvbG9yOiAnIzY0YjVmNicsIGNvc3Q6IDc0MCwgcmFuZ2U6IDE5NSwgZmlyZVJhdGU6IDIyLCBkYW1hZ2U6IDIsIHBpZXJjZTogMywgcHJvamVjdGlsZVNwZWVkOiAxMSwgdW5sb2NrTHZsOiA1LA0KICAgICAgcGF0aE5hbWVzOiB7IHAxOiBbJ0Nhbm5vbnMrJywgJ0RvdWJsZSBTaG90JywgJ0dyYXBlIEJ1cnN0JywgJ01PQUIgSG9vaycsICdGcmlnYXRlJ10sIHAyOiBbJ1RyYWRlIERlY2snLCAnRGVjayBHdW5zJywgJ1JhcGlkIERlY2snLCAnQ2FycmllcicsICdDb252b3knXSwgcDM6IFsnU2NvdXQnLCAnU2NvdXQrJywgJ0VzY29ydCcsICdEZXN0cm95ZXInLCAnRHJlYWRub3VnaHQnXSB9IH0sDQogICAgY29tbWFuZGVyOiB7IG5hbWU6ICdDb21tYW5kZXInLCBpY29uOiAn4piFJywgY29sb3I6ICcjZmZiNzAzJywgY29zdDogOTUwLCByYW5nZTogMjMwLCBmaXJlUmF0ZTogMTAsIGRhbWFnZTogMiwgcGllcmNlOiAyLCBwcm9qZWN0aWxlU3BlZWQ6IDEzLCB1bmxvY2tMdmw6IDYsDQogICAgICBwYXRoTmFtZXM6IHsgcDE6IFsnRGFtYWdlKycsICdMZWFkIFJvdW5kcycsICdNT0FCIFJvdW5kcycsICdPdmVyZHJpdmUnLCAnUHJpbWUnXSwgcDI6IFsnTW92ZSBTcGVlZCsnLCAnQWltIEFzc2lzdCcsICdEcm9uZSBTaG90JywgJ0hlcm9pYyBQYWNlJywgJ0NvbnRyb2wnXSwgcDM6IFsnQXJtb3IgSW50ZWwnLCAnQ2FsbG91dCcsICdTcXVhZCBCdWZmJywgJ1RhY3RpY2FsIEdyaWQnLCAnR2hvc3QnXSB9IH0sDQogIH07DQoNCiAgY29uc3QgdG93ZXJJY29uRmFsbGJhY2tzID0gew0KICAgIGRhcnQ6ICfinqQnLCBuaW5qYTogJ+KcpicsIGJvbWI6ICfinLknLCBpY2U6ICfinYQnLCBzbmlwZXI6ICfil4knLCBib29tZXJhbmc6ICfil4wnLCB0YWNrOiAn4py4JywgZ2x1ZTogJ+KXjycsDQogICAgdmlsbGFnZTogJ+KMgicsIHN1cGVyOiAn4qyiJywgbGFzZXI6ICfilZAnLCBwbGFzbWE6ICfinLonLCBzdW46ICfimIAnLCBmYXJtOiAn4pamJywgc3VwcG9ydDogJ+KcmicsIHdpemFyZDogJ+KcpycsDQogICAgZW5naW5lZXI6ICfimpknLCBhbGNoZW1pc3Q6ICfimpcnLCBkcnVpZDogJ+KYmCcsIG1vcnRhcjogJ+KcpicsIHN0b3JtOiAn4piEJywgc3VibWFyaW5lOiAn4p+BJywgYm9hdDogJ+KbtScsIGNvbW1hbmRlcjogJ+KYhScsDQogIH07DQoNCiAgT2JqZWN0LmtleXModG93ZXJEZWZzKS5mb3JFYWNoKChrKSA9PiB7DQogICAgaWYgKCF0b3dlckRlZnNba10uaWNvbikgdG93ZXJEZWZzW2tdLmljb24gPSB0b3dlckljb25GYWxsYmFja3Nba10gfHwgJ+KXhic7DQogIH0pOw0KDQogIC8vIE5FVzogZW5zdXJlIGV2ZXJ5IHRvd2VyIGhhcyBhIDNyZCBwYXRoIHdpdGggNSB0aWVycyBmb3IgQlRELXN0eWxlIDMtcGF0aCBVSS9sb2dpYy4NCiAgT2JqZWN0LmtleXModG93ZXJEZWZzKS5mb3JFYWNoKChrKSA9PiB7DQogICAgY29uc3QgZCA9IHRvd2VyRGVmc1trXTsNCiAgICBpZiAoIWQucGF0aE5hbWVzKSBkLnBhdGhOYW1lcyA9IHt9Ow0KICAgIGlmICghZC5wYXRoTmFtZXMucDEpIGQucGF0aE5hbWVzLnAxID0gWydUMScsICdUMicsICdUMycsICdUNCcsICdUNSddOw0KICAgIGlmICghZC5wYXRoTmFtZXMucDIpIGQucGF0aE5hbWVzLnAyID0gWydUMScsICdUMicsICdUMycsICdUNCcsICdUNSddOw0KICAgIGlmICghZC5wYXRoTmFtZXMucDMpIGQucGF0aE5hbWVzLnAzID0gWydUMScsICdUMicsICdUMycsICdUNCcsICdUNSddOw0KICB9KTsNCg0KICBjb25zdCBibG9vbkNhdGFsb2cgPSB7DQogICAgcmVkOiB7IGhwOiAxLCBzcGVlZDogMS43LCBjb2xvcjogJyNlNTM5MzUnLCByZXdhcmQ6IDgsIGRhbWFnZTogMSwgaW1tdW5pdGllczogW10gfSwNCiAgICBibHVlOiB7IGhwOiAyLCBzcGVlZDogMi4xLCBjb2xvcjogJyMxZTg4ZTUnLCByZXdhcmQ6IDEwLCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sDQogICAgZ3JlZW46IHsgaHA6IDMsIHNwZWVkOiAyLjQsIGNvbG9yOiAnIzQzYTA0NycsIHJld2FyZDogMTIsIGRhbWFnZTogMSwgaW1tdW5pdGllczogW10gfSwNCiAgICB5ZWxsb3c6IHsgaHA6IDUsIHNwZWVkOiAzLjAsIGNvbG9yOiAnI2ZkZDgzNScsIHJld2FyZDogMTQsIGRhbWFnZTogMSwgaW1tdW5pdGllczogW10gfSwNCiAgICBwaW5rOiB7IGhwOiA2LCBzcGVlZDogMy41LCBjb2xvcjogJyNlYzQwN2EnLCByZXdhcmQ6IDE1LCBkYW1hZ2U6IDEsIGltbXVuaXRpZXM6IFtdIH0sDQogICAgemVicmE6IHsgaHA6IDksIHNwZWVkOiAzLjAsIGNvbG9yOiAnI2ZmZmZmZicsIHJld2FyZDogMTgsIGRhbWFnZTogMiwgaW1tdW5pdGllczogWydpY2UnLCAnZXhwbG9zaXZlJ10sIHN0cmlwZTogJyMxMTEnIH0sDQogICAgYmxhY2s6IHsgaHA6IDcsIHNwZWVkOiAyLjgsIGNvbG9yOiAnIzQyNDI0MicsIHJld2FyZDogMTYsIGRhbWFnZTogMiwgaW1tdW5pdGllczogWydleHBsb3NpdmUnXSB9LA0KICAgIHdoaXRlOiB7IGhwOiA3LCBzcGVlZDogMi43LCBjb2xvcjogJyNmNWY1ZjUnLCByZXdhcmQ6IDE2LCBkYW1hZ2U6IDIsIGltbXVuaXRpZXM6IFsnaWNlJ10gfSwNCiAgICBwdXJwbGU6IHsgaHA6IDEwLCBzcGVlZDogMy4yLCBjb2xvcjogJyM4ZTI0YWEnLCByZXdhcmQ6IDIwLCBkYW1hZ2U6IDIsIGltbXVuaXRpZXM6IFsnaWNlJ10gfSwNCiAgICByYWluYm93OiB7IGhwOiAyMCwgc3BlZWQ6IDMuNCwgY29sb3I6ICcjZmY5ODAwJywgcmV3YXJkOiAyOCwgZGFtYWdlOiAzLCBpbW11bml0aWVzOiBbXSB9LA0KICAgIGxlYWQ6IHsgaHA6IDEyLCBzcGVlZDogMS4zNSwgY29sb3I6ICcjOGU5YWE2JywgcmV3YXJkOiAyMiwgZGFtYWdlOiA0LCBpbW11bml0aWVzOiBbJ3NoYXJwJ10gfSwNCiAgICBjZXJhbWljOiB7IGhwOiAzNCwgc3BlZWQ6IDIuMiwgY29sb3I6ICcjYjA4OTY4JywgcmV3YXJkOiA1MiwgZGFtYWdlOiA5LCBpbW11bml0aWVzOiBbXSB9LA0KICAgIGZvcnRpZmllZDogeyBocDogNzAsIHNwZWVkOiAyLjAsIGNvbG9yOiAnIzc5NTU0OCcsIHJld2FyZDogODUsIGRhbWFnZTogMTQsIGltbXVuaXRpZXM6IFtdIH0sDQogICAgbW9hYjogeyBocDogMjMwLCBzcGVlZDogMS4yLCBjb2xvcjogJyMwMGI0ZDgnLCByZXdhcmQ6IDIwMCwgZGFtYWdlOiAzNSwgaW1tdW5pdGllczogW10sIHJhZGl1czogMzAgfSwNCiAgICBiZmI6IHsgaHA6IDYwMCwgc3BlZWQ6IDAuOSwgY29sb3I6ICcjZDkwNDI5JywgcmV3YXJkOiA0MjAsIGRhbWFnZTogNjAsIGltbXVuaXRpZXM6IFtdLCByYWRpdXM6IDM4IH0sDQogIH07DQoNCiAgY29uc3QgdG93ZXJzID0gW107DQogIGNvbnN0IGJsb29ucyA9IFtdOw0KICBjb25zdCBwcm9qZWN0aWxlcyA9IFtdOw0KDQogIGNvbnN0IG1hcERlZnMgPSBbDQogICAgew0KICAgICAgbmFtZTogJ1ZhbGxleSBCZW5kJywgY29sb3I6ICcjNGNhZjUwJywNCiAgICAgIGxhbmVzOiBbW1swLDAuNTVdLFswLjE0LDAuNTVdLFswLjE0LDAuMThdLFswLjM5LDAuMThdLFswLjM5LDAuODJdLFswLjY0LDAuODJdLFswLjY0LDAuM10sWzAuOSwwLjNdLFswLjksMC44NV0sWzEsMC44NV1dXSwNCiAgICAgIHdhdGVyOiBbeyBzaGFwZTonZWxsaXBzZScsIHg6MC43OCwgeTowLjE0LCByeDowLjEsIHJ5OjAuMDYsIHJvdDowLjIgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC41NiwgeTowLjQ4LCByeDowLjA2LCByeTowLjA0LCByb3Q6MCB9XSwNCiAgICB9LA0KICAgIHsNCiAgICAgIG5hbWU6ICdUd2luIFBhc3MnLCBjb2xvcjogJyM1ZDljNTknLA0KICAgICAgbGFuZXM6IFtbWzAsMC4yNV0sWzAuMiwwLjI1XSxbMC4yLDAuNThdLFswLjUyLDAuNThdLFswLjUyLDAuMl0sWzEsMC4yXV0sIFtbMCwwLjc1XSxbMC4yNCwwLjc1XSxbMC4yNCwwLjQyXSxbMC42LDAuNDJdLFswLjYsMC44NV0sWzEsMC44NV1dXSwNCiAgICAgIHdhdGVyOiBbeyBzaGFwZTonZWxsaXBzZScsIHg6MC40MiwgeTowLjg1LCByeDowLjEsIHJ5OjAuMDY1LCByb3Q6MC4xMiB9LCB7IHNoYXBlOidlbGxpcHNlJywgeDowLjc0LCB5OjAuMzIsIHJ4OjAuMDgsIHJ5OjAuMDUsIHJvdDotMC4xOCB9XSwNCiAgICB9LA0KICAgIHsNCiAgICAgIG5hbWU6ICdDcm9zc3JvYWRzJywgY29sb3I6ICcjNmVhODVmJywNCiAgICAgIGxhbmVzOiBbW1swLDAuNV0sWzAuMjIsMC41XSxbMC4yMiwwLjJdLFswLjUsMC4yXSxbMC41LDAuOF0sWzAuNzgsMC44XSxbMC43OCwwLjVdLFsxLDAuNV1dLCBbWzAsMC4xNV0sWzAuMzIsMC4xNV0sWzAuMzIsMC41XSxbMC42OCwwLjVdLFswLjY4LDAuMTVdLFsxLDAuMTVdXSwgW1swLDAuODVdLFswLjMyLDAuODVdLFswLjMyLDAuNV0sWzAuNjgsMC41XSxbMC42OCwwLjg1XSxbMSwwLjg1XV1dLA0KICAgICAgd2F0ZXI6IFt7IHNoYXBlOidlbGxpcHNlJywgeDowLjUsIHk6MC41LCByeDowLjEyLCByeTowLjA4LCByb3Q6MCB9LCB7IHNoYXBlOidlbGxpcHNlJywgeDowLjE2LCB5OjAuNSwgcng6MC4wNiwgcnk6MC4wNCwgcm90OjAuMiB9LCB7IHNoYXBlOidlbGxpcHNlJywgeDowLjg0LCB5OjAuNSwgcng6MC4wNiwgcnk6MC4wNCwgcm90Oi0wLjIgfV0sDQogICAgfSwNCiAgICB7DQogICAgICBuYW1lOiAnUml2ZXIgRm9yaycsIGNvbG9yOiAnIzdjYWQ2NCcsDQogICAgICBsYW5lczogW1tbMCwwLjE0XSxbMC4xOCwwLjE0XSxbMC4xOCwwLjVdLFswLjQ2LDAuNV0sWzAuNDYsMC44Ml0sWzAuNzIsMC44Ml0sWzAuNzIsMC4zNl0sWzEsMC4zNl1dLCBbWzAsMC44Nl0sWzAuMjIsMC44Nl0sWzAuMjIsMC41NF0sWzAuNTgsMC41NF0sWzAuNTgsMC4xOF0sWzEsMC4xOF1dXSwNCiAgICAgIHdhdGVyOiBbeyBzaGFwZToncmVjdCcsIHg6MC4zNSwgeTowLjA1LCB3OjAuMDgsIGg6MC45IH0sIHsgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNjUsIHk6MC41Niwgcng6MC4xMSwgcnk6MC4wNywgcm90OjAuMDUgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC44NCwgeTowLjc0LCByeDowLjA3LCByeTowLjA1LCByb3Q6LTAuMiB9XSwNCiAgICB9LA0KICAgIHsNCiAgICAgIG5hbWU6ICdMYWdvb24gUmluZycsIGNvbG9yOiAnIzZmYjA2ZicsDQogICAgICBsYW5lczogW1tbMCwwLjVdLFswLjE2LDAuNV0sWzAuMTYsMC4yXSxbMC41LDAuMl0sWzAuNSwwLjhdLFswLjg0LDAuOF0sWzAuODQsMC41XSxbMSwwLjVdXSwgW1swLDAuMDhdLFswLjI4LDAuMDhdLFswLjI4LDAuOTJdLFswLjcyLDAuOTJdLFswLjcyLDAuMDhdLFsxLDAuMDhdXV0sDQogICAgICB3YXRlcjogW3sgc2hhcGU6J2VsbGlwc2UnLCB4OjAuNSwgeTowLjUsIHJ4OjAuMTYsIHJ5OjAuMSwgcm90OjAgfSwgeyBzaGFwZTonZWxsaXBzZScsIHg6MC41LCB5OjAuNSwgcng6MC4wOCwgcnk6MC4wNSwgcm90OjAgfV0sDQogICAgfSwNCiAgICB7DQogICAgICBuYW1lOiAnRGVsdGEgTWF6ZScsIGNvbG9yOiAnIzc4YjQ2YicsDQogICAgICBsYW5lczogW1tbMCwwLjIyXSxbMC4yLDAuMjJdLFswLjIsMC42NF0sWzAuNDIsMC42NF0sWzAuNDIsMC4zXSxbMC43LDAuM10sWzAuNywwLjddLFsxLDAuN11dLCBbWzAsMC43OF0sWzAuMTgsMC43OF0sWzAuMTgsMC40XSxbMC41LDAuNF0sWzAuNSwwLjldLFswLjg2LDAuOV0sWzAuODYsMC40Nl0sWzEsMC40Nl1dLCBbWzAsMC41XSxbMC4xMiwwLjVdLFswLjEyLDAuMTJdLFswLjYsMC4xMl0sWzAuNiwwLjU2XSxbMSwwLjU2XV1dLA0KICAgICAgd2F0ZXI6IFt7IHNoYXBlOidyZWN0JywgeDowLjMsIHk6MC4xMiwgdzowLjA3LCBoOjAuNzggfSwgeyBzaGFwZToncmVjdCcsIHg6MC42MiwgeTowLjA0LCB3OjAuMDgsIGg6MC44NCB9LCB7IHNoYXBlOidlbGxpcHNlJywgeDowLjg0LCB5OjAuMiwgcng6MC4wOSwgcnk6MC4wNiwgcm90OjAuMTggfV0sDQogICAgfSwNCiAgXTsNCg0KICBjb25zdCB4cFRvTmV4dExldmVsID0gKGxldmVsKSA9PiAxMDAgKyBsZXZlbCAqIDcwOw0KDQogIGZ1bmN0aW9uIHNhdmVQcm9maWxlKCkgew0KICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0ZF9jb2lucycsIFN0cmluZyhwcm9maWxlLmNvaW5zKSk7DQogICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RkX21tJywgU3RyaW5nKHByb2ZpbGUubW9ua2V5TW9uZXkpKTsNCiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGRfdW5sb2NrcycsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUudW5sb2NrZWRTcGVjaWFsVG93ZXJzKSk7DQogIH0NCg0KICBmdW5jdGlvbiByZW5kZXJBZG1pblBhbmVsKCkgew0KICAgIGlmICghYWRtaW5VbmxvY2tlZCkgcmV0dXJuOw0KICAgIGFkbWluUGFuZWwuaW5uZXJIVE1MID0gYA0KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW4tYm90dG9tOjhweDsiPg0KICAgICAgICA8YiBzdHlsZT0iY29sb3I6I2ZmZDE2NiI+4pqZIEFkbWluIENvbnNvbGU8L2I+DQogICAgICAgIDxidXR0b24gaWQ9InRkLWFkbS1jbG9zZSIgc3R5bGU9ImJhY2tncm91bmQ6I2IyM2E0ODtjb2xvcjojZmZmO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NHB4O3BhZGRpbmc6M3B4IDEwcHg7Y3Vyc29yOnBvaW50ZXI7Ij5DbG9zZTwvYnV0dG9uPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjojOWZkM2ZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206NnB4OyI+RWNvbm9teTwvZGl2Pg0KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo2cHg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo4cHg7Ij4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Im1vbmV5XzEwMDAiPiskMWs8L2J1dHRvbj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Im1vbmV5XzEwMDAwIj4rJDEwazwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iY29pbnNfNTAwIj4rNTAwIENvaW5zPC9idXR0b24+DQogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJtbV81MDAiPis1MDAgTU08L2J1dHRvbj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InVubG9ja19hbGwiPlVubG9jayBQcmVtaXVtPC9idXR0b24+DQogICAgICA8L2Rpdj4NCiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6NnB4O21hcmdpbi1ib3R0b206MTBweDsiPg0KICAgICAgICA8aW5wdXQgaWQ9InRkLWFkbS1tb25leSIgdHlwZT0ibnVtYmVyIiBwbGFjZWhvbGRlcj0iU2V0IGNhc2giIHN0eWxlPSJmbGV4OjE7bWluLXdpZHRoOjA7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyOjFweCBzb2xpZCAjNGNjOWYwNjY7YmFja2dyb3VuZDojMTAyMzNkO2NvbG9yOiNmZmY7IiAvPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic2V0X21vbmV5Ij5TZXQ8L2J1dHRvbj4NCiAgICAgIDwvZGl2Pg0KDQogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjojOWZkM2ZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206NnB4OyI+UnVuIENvbnRyb2w8L2Rpdj4NCiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6NnB4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206OHB4OyI+DQogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJsaXZlc19pbmYiPkdvZCBMaXZlczwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0iZnVsbF9oZWFsIj5GdWxsIEhlYWw8L2J1dHRvbj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249ImNsZWFyX2Jsb29ucyI+Q2xlYXIgQmxvb25zPC9idXR0b24+DQogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJjbGVhcl9wcm9qZWN0aWxlcyI+Q2xlYXIgU2hvdHM8L2J1dHRvbj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249Indpbl9ydW4iPkZvcmNlIFdpbjwvYnV0dG9uPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjZweDttYXJnaW4tYm90dG9tOjEwcHg7Ij4NCiAgICAgICAgPGlucHV0IGlkPSJ0ZC1hZG0td2F2ZSIgdHlwZT0ibnVtYmVyIiBtaW49IjEiIG1heD0iJHtNQVhfV0FWRVN9IiBwbGFjZWhvbGRlcj0iV2F2ZSAjIiBzdHlsZT0iZmxleDoxO21pbi13aWR0aDowO3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgIzRjYzlmMDY2O2JhY2tncm91bmQ6IzEwMjMzZDtjb2xvcjojZmZmOyIgLz4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InNldF93YXZlIj5KdW1wPC9idXR0b24+DQogICAgICA8L2Rpdj4NCg0KICAgICAgPGRpdiBzdHlsZT0iY29sb3I6IzlmZDNmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjZweDsiPlRvd2VyIENvbW1hbmRzIChzZWxlY3RlZCB0b3dlcik8L2Rpdj4NCiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6NnB4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206MTBweDsiPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0idXBncmFkZV9zZWxlY3RlZF9tYXgiPlVwZ3JhZGUgTWF4PC9idXR0b24+DQogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJwcm9fc2VsZWN0ZWQiPkdyYW50IFBSTzwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ibWFzdGVyeV9zZWxlY3RlZCI+R3JhbnQgTWFzdGVyeTwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic2VsbF9zZWxlY3RlZCI+U2VsbCBTZWxlY3RlZDwvYnV0dG9uPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0idXBncmFkZV9hbGxfbWF4Ij5VcGdyYWRlIEFsbDwvYnV0dG9uPg0KICAgICAgPC9kaXY+DQoNCiAgICAgIDxkaXYgc3R5bGU9ImNvbG9yOiM5ZmQzZmY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbTo2cHg7Ij5DdXN0b20gU3Bhd248L2Rpdj4NCiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6NnB4O2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4LXdyYXA6d3JhcDttYXJnaW4tYm90dG9tOjhweDsiPg0KICAgICAgICA8c2VsZWN0IGlkPSJ0ZC1hZG0tc3Bhd24tdHlwZSIgc3R5bGU9ImZsZXg6MTttaW4td2lkdGg6MTEwcHg7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyOjFweCBzb2xpZCAjNGNjOWYwNjY7YmFja2dyb3VuZDojMTAyMzNkO2NvbG9yOiNmZmY7Ij4NCiAgICAgICAgICAke09iamVjdC5rZXlzKGJsb29uQ2F0YWxvZykubWFwKChrKSA9PiBgPG9wdGlvbiB2YWx1ZT0iJHtrfSI+JHtrLnRvVXBwZXJDYXNlKCl9PC9vcHRpb24+YCkuam9pbignJyl9DQogICAgICAgIDwvc2VsZWN0Pg0KICAgICAgICA8aW5wdXQgaWQ9InRkLWFkbS1zcGF3bi1jb3VudCIgdHlwZT0ibnVtYmVyIiBtaW49IjEiIG1heD0iNTAwIiB2YWx1ZT0iMTAiIHN0eWxlPSJ3aWR0aDo3MnB4O3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgIzRjYzlmMDY2O2JhY2tncm91bmQ6IzEwMjMzZDtjb2xvcjojZmZmOyIgLz4NCiAgICAgICAgPGlucHV0IGlkPSJ0ZC1hZG0tc3Bhd24tbGFuZSIgdHlwZT0ibnVtYmVyIiBtaW49Ii0xIiBtYXg9IjkiIHZhbHVlPSItMSIgc3R5bGU9IndpZHRoOjcycHg7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyOjFweCBzb2xpZCAjNGNjOWYwNjY7YmFja2dyb3VuZDojMTAyMzNkO2NvbG9yOiNmZmY7IiAvPg0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJhZG0tYnRuIiBkYXRhLWFjdGlvbj0ic3Bhd25fY3VzdG9tIj5TcGF3bjwvYnV0dG9uPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MTFweDtjb2xvcjojYTdiZWQzO21hcmdpbi1ib3R0b206OHB4OyI+TGFuZTogLTEgPSBjeWNsZSBhbGwgbGFuZXM8L2Rpdj4NCiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6NnB4O2ZsZXgtd3JhcDp3cmFwIj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InNwYXduX21vYWIiPk1PQUI8L2J1dHRvbj4NCiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYWRtLWJ0biIgZGF0YS1hY3Rpb249InNwYXduX2JmYiI+QkZCPC9idXR0b24+DQogICAgICAgIDxidXR0b24gY2xhc3M9ImFkbS1idG4iIGRhdGEtYWN0aW9uPSJzcGF3bl9taXhlZCI+TWl4ZWQgUGFjazwvYnV0dG9uPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IGlkPSJ0ZC1hZG0tbXNnIiBzdHlsZT0ibWFyZ2luLXRvcDo4cHg7Y29sb3I6IzhiYzM0YTttaW4taGVpZ2h0OjE2cHg7Ij48L2Rpdj4NCiAgICBgOw0KICAgIGFkbWluUGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmFkbS1idG4nKS5mb3JFYWNoKChiKSA9PiB7DQogICAgICBPYmplY3QuYXNzaWduKGIuc3R5bGUsIHsgcGFkZGluZzogJzVweCA4cHgnLCBiYWNrZ3JvdW5kOiAnIzFlM2E1ZicsIGJvcmRlcjogJzFweCBzb2xpZCAjNGNjOWYwNjYnLCBjb2xvcjogJyNmZmYnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBjdXJzb3I6ICdwb2ludGVyJyB9KTsNCiAgICAgIGIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVBZG1pbkFjdGlvbihiLmRhdGFzZXQuYWN0aW9uKSk7DQogICAgfSk7DQogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbS1jbG9zZScpLm9uY2xpY2sgPSAoKSA9PiB7IHNob3dBZG1pblBhbmVsID0gZmFsc2U7IGFkbWluUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfTsNCiAgfQ0KDQogIGZ1bmN0aW9uIGFkbWluTXNnKG1zZykgew0KICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWFkbS1tc2cnKTsNCiAgICBpZiAoIWVsKSByZXR1cm47DQogICAgZWwudGV4dENvbnRlbnQgPSBg4pyUICR7bXNnfWA7DQogICAgc2V0VGltZW91dCgoKSA9PiB7IGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSAnJzsgfSwgMTgwMCk7DQogIH0NCg0KICBmdW5jdGlvbiBwYXJzZUFkbWluTnVtYmVyKGlkLCBmYWxsYmFjayA9IDApIHsNCiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsNCiAgICBpZiAoIWVsKSByZXR1cm4gZmFsbGJhY2s7DQogICAgY29uc3QgdmFsID0gTnVtYmVyKGVsLnZhbHVlKTsNCiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHZhbCkgPyB2YWwgOiBmYWxsYmFjazsNCiAgfQ0KDQogIGZ1bmN0aW9uIGdldFNlbGVjdGVkVG93ZXJTYWZlKCkgew0KICAgIGlmICghc3RhdGUuc2VsZWN0ZWRUb3dlcikgcmV0dXJuIG51bGw7DQogICAgaWYgKCF0b3dlcnMuaW5jbHVkZXMoc3RhdGUuc2VsZWN0ZWRUb3dlcikpIHJldHVybiBudWxsOw0KICAgIHJldHVybiBzdGF0ZS5zZWxlY3RlZFRvd2VyOw0KICB9DQoNCiAgZnVuY3Rpb24gdXBncmFkZVRvd2VyRnVsbHkodG93ZXIpIHsNCiAgICBpZiAoIXRvd2VyKSByZXR1cm4gZmFsc2U7DQogICAgbGV0IHBhdGhJbmRleCA9IHRvd2VyLnVwZ3JhZGVzLmZpbmRJbmRleCgobHZsKSA9PiBsdmwgPiAwKTsNCiAgICBpZiAocGF0aEluZGV4ID09PSAtMSkgcGF0aEluZGV4ID0gMDsNCiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlOw0KICAgIHdoaWxlICh0b3dlci51cGdyYWRlc1twYXRoSW5kZXhdIDwgNSkgew0KICAgICAgYXBwbHlUb3dlclVwZ3JhZGUodG93ZXIsIHBhdGhJbmRleCk7DQogICAgICBjaGFuZ2VkID0gdHJ1ZTsNCiAgICB9DQogICAgcmV0dXJuIGNoYW5nZWQ7DQogIH0NCg0KICBmdW5jdGlvbiBzcGF3bkJsb29uc0N1c3RvbSh0eXBlLCBjb3VudCwgbGFuZSkgew0KICAgIGNvbnN0IG1hcExhbmVDb3VudCA9IGdldE1hcFBhdGhzKCkubGVuZ3RoOw0KICAgIGlmICghYmxvb25DYXRhbG9nW3R5cGVdKSByZXR1cm4gMDsNCiAgICBjb25zdCBzYWZlQ291bnQgPSBNYXRoLm1heCgxLCBNYXRoLm1pbig1MDAsIE1hdGguZmxvb3IoY291bnQgfHwgMSkpKTsNCiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhZmVDb3VudDsgaSsrKSB7DQogICAgICBjb25zdCBsYW5lSW5kZXggPSBsYW5lID49IDANCiAgICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXBMYW5lQ291bnQgLSAxLCBsYW5lKSkNCiAgICAgICAgOiBpICUgbWFwTGFuZUNvdW50Ow0KICAgICAgYmxvb25zLnB1c2goY3JlYXRlQmxvb24odHlwZSwgbGFuZUluZGV4KSk7DQogICAgfQ0KICAgIHJldHVybiBzYWZlQ291bnQ7DQogIH0NCg0KICBmdW5jdGlvbiBoYW5kbGVBZG1pbkFjdGlvbihhY3Rpb24pIHsNCiAgICBzd2l0Y2ggKGFjdGlvbikgew0KICAgICAgY2FzZSAnbW9uZXlfMTAwMCc6IHN0YXRlLm1vbmV5ICs9IDEwMDA7IGFkbWluTXNnKCcrJDEwMDAnKTsgYnJlYWs7DQogICAgICBjYXNlICdtb25leV8xMDAwMCc6IHN0YXRlLm1vbmV5ICs9IDEwMDAwOyBhZG1pbk1zZygnKyQxMDAwMCcpOyBicmVhazsNCiAgICAgIGNhc2UgJ2NvaW5zXzUwMCc6IHByb2ZpbGUuY29pbnMgKz0gNTAwOyBzYXZlUHJvZmlsZSgpOyBhZG1pbk1zZygnKzUwMCBDb2lucycpOyBicmVhazsNCiAgICAgIGNhc2UgJ21tXzUwMCc6IHByb2ZpbGUubW9ua2V5TW9uZXkgKz0gNTAwOyBzYXZlUHJvZmlsZSgpOyBhZG1pbk1zZygnKzUwMCBNTScpOyBicmVhazsNCiAgICAgIGNhc2UgJ3VubG9ja19hbGwnOiBPYmplY3Qua2V5cyhwcm9maWxlLnVubG9ja2VkU3BlY2lhbFRvd2VycykuZm9yRWFjaCgoaykgPT4geyBwcm9maWxlLnVubG9ja2VkU3BlY2lhbFRvd2Vyc1trXSA9IHRydWU7IH0pOyBzYXZlUHJvZmlsZSgpOyBhZG1pbk1zZygnVW5sb2NrZWQgYWxsIHByZW1pdW0nKTsgYnJlYWs7DQogICAgICBjYXNlICdzZXRfbW9uZXknOiB7DQogICAgICAgIGNvbnN0IGNhc2ggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHBhcnNlQWRtaW5OdW1iZXIoJ3RkLWFkbS1tb25leScsIHN0YXRlLm1vbmV5KSkpOw0KICAgICAgICBzdGF0ZS5tb25leSA9IGNhc2g7DQogICAgICAgIGFkbWluTXNnKGBDYXNoIHNldCB0byAkJHtjYXNofWApOw0KICAgICAgICBicmVhazsNCiAgICAgIH0NCiAgICAgIGNhc2UgJ2xpdmVzX2luZic6IHN0YXRlLmxpdmVzID0gSW5maW5pdHk7IGdhbWVPdmVyID0gZmFsc2U7IGFkbWluTXNnKCdJbmZpbml0ZSBsaXZlcycpOyBicmVhazsNCiAgICAgIGNhc2UgJ2Z1bGxfaGVhbCc6IHsNCiAgICAgICAgc3RhdGUubGl2ZXMgPSBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XS5saXZlczsNCiAgICAgICAgZ2FtZU92ZXIgPSBmYWxzZTsNCiAgICAgICAgYWRtaW5Nc2coYExpdmVzIHJlc3RvcmVkIHRvICR7c3RhdGUubGl2ZXN9YCk7DQogICAgICAgIGJyZWFrOw0KICAgICAgfQ0KICAgICAgY2FzZSAnY2xlYXJfYmxvb25zJzogYmxvb25zLmxlbmd0aCA9IDA7IGFkbWluTXNnKCdCbG9vbnMgY2xlYXJlZCcpOyBicmVhazsNCiAgICAgIGNhc2UgJ2NsZWFyX3Byb2plY3RpbGVzJzogcHJvamVjdGlsZXMubGVuZ3RoID0gMDsgYWRtaW5Nc2coJ1Byb2plY3RpbGVzIGNsZWFyZWQnKTsgYnJlYWs7DQogICAgICBjYXNlICd3aW5fcnVuJzogc3RhdGUud2F2ZSA9IE1BWF9XQVZFUzsgd2F2ZVF1ZXVlID0gW107IGJsb29ucy5sZW5ndGggPSAwOyB3YXZlSW5Qcm9ncmVzcyA9IGZhbHNlOyBydW5Xb24gPSB0cnVlOyBhZG1pbk1zZygnUnVuIGZvcmNlZCB0byB3aW4gc3RhdGUnKTsgYnJlYWs7DQogICAgICBjYXNlICdzZXRfd2F2ZSc6IHsNCiAgICAgICAgY29uc3QgdGFyZ2V0V2F2ZSA9IE1hdGgubWF4KDEsIE1hdGgubWluKE1BWF9XQVZFUywgTWF0aC5mbG9vcihwYXJzZUFkbWluTnVtYmVyKCd0ZC1hZG0td2F2ZScsIHN0YXRlLndhdmUpKSkpOw0KICAgICAgICBzdGF0ZS53YXZlID0gdGFyZ2V0V2F2ZTsNCiAgICAgICAgd2F2ZVF1ZXVlID0gW107DQogICAgICAgIGJsb29ucy5sZW5ndGggPSAwOw0KICAgICAgICB3YXZlSW5Qcm9ncmVzcyA9IGZhbHNlOw0KICAgICAgICBnYW1lT3ZlciA9IGZhbHNlOw0KICAgICAgICBhZG1pbk1zZyhgV2F2ZSBzZXQgdG8gJHt0YXJnZXRXYXZlfWApOw0KICAgICAgICBicmVhazsNCiAgICAgIH0NCiAgICAgIGNhc2UgJ3NwYXduX21vYWInOiBibG9vbnMucHVzaChjcmVhdGVCbG9vbignbW9hYicsIDApKTsgYWRtaW5Nc2coJ1NwYXduZWQgTU9BQicpOyBicmVhazsNCiAgICAgIGNhc2UgJ3NwYXduX2JmYic6IGJsb29ucy5wdXNoKGNyZWF0ZUJsb29uKCdiZmInLCAwKSk7IGFkbWluTXNnKCdTcGF3bmVkIEJGQicpOyBicmVhazsNCiAgICAgIGNhc2UgJ3NwYXduX21peGVkJzogWydtb2FiJywgJ2ZvcnRpZmllZCcsICdjZXJhbWljJywgJ3JhaW5ib3cnLCAnbGVhZCcsICdiZmInXS5mb3JFYWNoKCh0LCBpKSA9PiBibG9vbnMucHVzaChjcmVhdGVCbG9vbih0LCBpICUgZ2V0TWFwUGF0aHMoKS5sZW5ndGgpKSk7IGFkbWluTXNnKCdTcGF3bmVkIG1peGVkIHBhY2snKTsgYnJlYWs7DQogICAgICBjYXNlICdzcGF3bl9jdXN0b20nOiB7DQogICAgICAgIGNvbnN0IHR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtYWRtLXNwYXduLXR5cGUnKT8udmFsdWUgfHwgJ3JlZCc7DQogICAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VBZG1pbk51bWJlcigndGQtYWRtLXNwYXduLWNvdW50JywgMTApOw0KICAgICAgICBjb25zdCBsYW5lID0gTWF0aC5mbG9vcihwYXJzZUFkbWluTnVtYmVyKCd0ZC1hZG0tc3Bhd24tbGFuZScsIC0xKSk7DQogICAgICAgIGNvbnN0IHNwYXduZWQgPSBzcGF3bkJsb29uc0N1c3RvbSh0eXBlLCBjb3VudCwgbGFuZSk7DQogICAgICAgIGFkbWluTXNnKGBTcGF3bmVkICR7c3Bhd25lZH0gJHt0eXBlLnRvVXBwZXJDYXNlKCl9YCk7DQogICAgICAgIGJyZWFrOw0KICAgICAgfQ0KICAgICAgY2FzZSAndXBncmFkZV9zZWxlY3RlZF9tYXgnOiB7DQogICAgICAgIGNvbnN0IHRvd2VyID0gZ2V0U2VsZWN0ZWRUb3dlclNhZmUoKTsNCiAgICAgICAgaWYgKCF0b3dlcikgeyBhZG1pbk1zZygnU2VsZWN0IGEgdG93ZXIgZmlyc3QnKTsgYnJlYWs7IH0NCiAgICAgICAgdXBncmFkZVRvd2VyRnVsbHkodG93ZXIpOw0KICAgICAgICBhZG1pbk1zZyhgJHt0b3dlckRlZnNbdG93ZXIudHlwZV0/Lm5hbWUgfHwgJ1Rvd2VyJ30gdXBncmFkZWQgdG8gbWF4YCk7DQogICAgICAgIGJyZWFrOw0KICAgICAgfQ0KICAgICAgY2FzZSAndXBncmFkZV9hbGxfbWF4Jzogew0KICAgICAgICB0b3dlcnMuZm9yRWFjaCgodG93ZXIpID0+IHVwZ3JhZGVUb3dlckZ1bGx5KHRvd2VyKSk7DQogICAgICAgIGFkbWluTXNnKGBVcGdyYWRlZCAke3Rvd2Vycy5sZW5ndGh9IHRvd2VycyB0byBtYXhgKTsNCiAgICAgICAgYnJlYWs7DQogICAgICB9DQogICAgICBjYXNlICdwcm9fc2VsZWN0ZWQnOiB7DQogICAgICAgIGNvbnN0IHRvd2VyID0gZ2V0U2VsZWN0ZWRUb3dlclNhZmUoKTsNCiAgICAgICAgaWYgKCF0b3dlcikgeyBhZG1pbk1zZygnU2VsZWN0IGEgdG93ZXIgZmlyc3QnKTsgYnJlYWs7IH0NCiAgICAgICAgdG93ZXIucHJvID0gdHJ1ZTsNCiAgICAgICAgYWRtaW5Nc2coJ1NlbGVjdGVkIHRvd2VyIGdyYW50ZWQgUFJPJyk7DQogICAgICAgIGJyZWFrOw0KICAgICAgfQ0KICAgICAgY2FzZSAnbWFzdGVyeV9zZWxlY3RlZCc6IHsNCiAgICAgICAgY29uc3QgdG93ZXIgPSBnZXRTZWxlY3RlZFRvd2VyU2FmZSgpOw0KICAgICAgICBpZiAoIXRvd2VyKSB7IGFkbWluTXNnKCdTZWxlY3QgYSB0b3dlciBmaXJzdCcpOyBicmVhazsgfQ0KICAgICAgICB0b3dlci5wcm8gPSB0cnVlOw0KICAgICAgICB0b3dlci5wcm9NYXN0ZXJ5ID0gdHJ1ZTsNCiAgICAgICAgYWRtaW5Nc2coJ1NlbGVjdGVkIHRvd2VyIGdyYW50ZWQgUFJPIE1hc3RlcnknKTsNCiAgICAgICAgYnJlYWs7DQogICAgICB9DQogICAgICBjYXNlICdzZWxsX3NlbGVjdGVkJzogew0KICAgICAgICBjb25zdCB0b3dlciA9IGdldFNlbGVjdGVkVG93ZXJTYWZlKCk7DQogICAgICAgIGlmICghdG93ZXIpIHsgYWRtaW5Nc2coJ1NlbGVjdCBhIHRvd2VyIGZpcnN0Jyk7IGJyZWFrOyB9DQogICAgICAgIGNvbnN0IGlkeCA9IHRvd2Vycy5pbmRleE9mKHRvd2VyKTsNCiAgICAgICAgaWYgKGlkeCA+PSAwKSB0b3dlcnMuc3BsaWNlKGlkeCwgMSk7DQogICAgICAgIHN0YXRlLnNlbGVjdGVkVG93ZXIgPSBudWxsOw0KICAgICAgICBhZG1pbk1zZygnU2VsZWN0ZWQgdG93ZXIgc29sZCcpOw0KICAgICAgICBicmVhazsNCiAgICAgIH0NCiAgICB9DQogIH0NCg0KICBmdW5jdGlvbiBhcHBseU1ldGFCb251c2VzKCkgew0KICAgIGNvbnN0IGRpZmYgPSBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XTsNCiAgICBzdGF0ZS5tb25leSA9IGRpZmYuc3RhcnRDYXNoICsgcHJvZ3Jlc3Npb24uc3RhcnRpbmdDYXNoTGV2ZWwgKiAxMDA7DQogIH0NCg0KICBmdW5jdGlvbiBnYWluWHAoYW1vdW50KSB7DQogICAgcHJvZ3Jlc3Npb24ueHAgKz0gYW1vdW50Ow0KICAgIHdoaWxlIChwcm9ncmVzc2lvbi54cCA+PSB4cFRvTmV4dExldmVsKHByb2dyZXNzaW9uLmxldmVsKSkgew0KICAgICAgcHJvZ3Jlc3Npb24ueHAgLT0geHBUb05leHRMZXZlbChwcm9ncmVzc2lvbi5sZXZlbCk7DQogICAgICBwcm9ncmVzc2lvbi5sZXZlbCArPSAxOw0KICAgICAgcHJvZ3Jlc3Npb24ucG9pbnRzICs9IDE7DQogICAgfQ0KICB9DQoNCiAgZnVuY3Rpb24gZ2V0Q3VycmVudE1hcCgpIHsgcmV0dXJuIG1hcERlZnNbc3RhdGUuc2VsZWN0ZWRNYXBdOyB9DQoNCiAgZnVuY3Rpb24gdG9QYXRoKGFic1BhdGgpIHsNCiAgICByZXR1cm4gYWJzUGF0aC5tYXAoKFtyeCwgcnldKSA9PiAoeyB4OiByeCAqICh3aWR0aCAtIFNJREVfUEFORUwpLCB5OiByeSAqIGhlaWdodCB9KSk7DQogIH0NCg0KICBmdW5jdGlvbiBnZXRNYXBQYXRocygpIHsgcmV0dXJuIGdldEN1cnJlbnRNYXAoKS5sYW5lcy5tYXAodG9QYXRoKTsgfQ0KDQogIGZ1bmN0aW9uIGlzV2F0ZXJUb3dlclR5cGUodHlwZSkgew0KICAgIHJldHVybiB0eXBlID09PSAnc3VibWFyaW5lJyB8fCB0eXBlID09PSAnYm9hdCc7DQogIH0NCg0KICBmdW5jdGlvbiBpc1BvaW50SW5XYXRlcih4LCB5KSB7DQogICAgY29uc3QgbWFwID0gZ2V0Q3VycmVudE1hcCgpOw0KICAgIGNvbnN0IHdhdGVyQXJlYXMgPSBtYXAud2F0ZXIgfHwgW107DQogICAgY29uc3QgbWFwV2lkdGggPSB3aWR0aCAtIFNJREVfUEFORUw7DQogICAgcmV0dXJuIHdhdGVyQXJlYXMuc29tZSgoYXJlYSkgPT4gew0KICAgICAgaWYgKGFyZWEuc2hhcGUgPT09ICdlbGxpcHNlJykgew0KICAgICAgICBjb25zdCBjeCA9IGFyZWEueCAqIG1hcFdpZHRoOw0KICAgICAgICBjb25zdCBjeSA9IGFyZWEueSAqIGhlaWdodDsNCiAgICAgICAgY29uc3QgcnggPSBNYXRoLm1heCgxLCBhcmVhLnJ4ICogbWFwV2lkdGgpOw0KICAgICAgICBjb25zdCByeSA9IE1hdGgubWF4KDEsIGFyZWEucnkgKiBoZWlnaHQpOw0KICAgICAgICBjb25zdCByb3QgPSBhcmVhLnJvdCB8fCAwOw0KICAgICAgICBjb25zdCBkeCA9IHggLSBjeDsNCiAgICAgICAgY29uc3QgZHkgPSB5IC0gY3k7DQogICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKC1yb3QpOw0KICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbigtcm90KTsNCiAgICAgICAgY29uc3QgZXggPSBkeCAqIGNvcyAtIGR5ICogc2luOw0KICAgICAgICBjb25zdCBleSA9IGR4ICogc2luICsgZHkgKiBjb3M7DQogICAgICAgIHJldHVybiAoZXggKiBleCkgLyAocnggKiByeCkgKyAoZXkgKiBleSkgLyAocnkgKiByeSkgPD0gMTsNCiAgICAgIH0NCiAgICAgIGlmIChhcmVhLnNoYXBlID09PSAncmVjdCcpIHsNCiAgICAgICAgY29uc3QgcnggPSBhcmVhLnggKiBtYXBXaWR0aDsNCiAgICAgICAgY29uc3QgcnkgPSBhcmVhLnkgKiBoZWlnaHQ7DQogICAgICAgIGNvbnN0IHJ3ID0gYXJlYS53ICogbWFwV2lkdGg7DQogICAgICAgIGNvbnN0IHJoID0gYXJlYS5oICogaGVpZ2h0Ow0KICAgICAgICByZXR1cm4geCA+PSByeCAmJiB4IDw9IHJ4ICsgcncgJiYgeSA+PSByeSAmJiB5IDw9IHJ5ICsgcmg7DQogICAgICB9DQogICAgICByZXR1cm4gZmFsc2U7DQogICAgfSk7DQogIH0NCg0KICBmdW5jdGlvbiByZXNpemUoKSB7DQogICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7DQogICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsNCiAgICB3aWR0aCA9IGNhbnZhcy53aWR0aDsgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDsNCiAgICBzY2VuZXJ5QnlNYXAgPSBtYXBEZWZzLm1hcCgoXywgaWR4KSA9PiBidWlsZFNjZW5lcnkoaWR4KSk7DQogIH0NCg0KICBmdW5jdGlvbiBidWlsZFNjZW5lcnkobWFwSW5kZXgpIHsNCiAgICBjb25zdCBwcmVzZXRzID0gWw0KICAgICAgW3sgdHlwZTondHJlZScseDowLjA4LHk6MC4xNCB9LHsgdHlwZTondHJlZScseDowLjI4LHk6MC45IH0seyB0eXBlOidyb2NrJyx4OjAuNzMseTowLjYyIH0seyB0eXBlOidwb25kJyx4OjAuNzgseTowLjE0IH0seyB0eXBlOididXNoJyx4OjAuNDYseTowLjUgfSx7IHR5cGU6J3JvY2snLHg6MC4xNCx5OjAuMzQgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC42LHk6MC4xMiB9LHsgdHlwZTonc3R1bXAnLHg6MC45LHk6MC42MiB9XSwNCiAgICAgIFt7IHR5cGU6J3RyZWUnLHg6MC4xLHk6MC41MiB9LHsgdHlwZTondHJlZScseDowLjM0LHk6MC4xMiB9LHsgdHlwZToncG9uZCcseDowLjQyLHk6MC44NSB9LHsgdHlwZTonYnVzaCcseDowLjU4LHk6MC4xMiB9LHsgdHlwZToncm9jaycseDowLjcyLHk6MC41MiB9LHsgdHlwZTonYnVzaCcseDowLjg0LHk6MC43MiB9LHsgdHlwZTonY3JhdGUnLHg6MC4yMix5OjAuOTIgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC45Mix5OjAuMiB9XSwNCiAgICAgIFt7IHR5cGU6J3RyZWUnLHg6MC4xMix5OjAuMTIgfSx7IHR5cGU6J3RyZWUnLHg6MC4xMix5OjAuODggfSx7IHR5cGU6J3BvbmQnLHg6MC41LHk6MC41IH0seyB0eXBlOidyb2NrJyx4OjAuODYseTowLjEyIH0seyB0eXBlOidyb2NrJyx4OjAuODYseTowLjg4IH0seyB0eXBlOididXNoJyx4OjAuNSx5OjAuMDggfSx7IHR5cGU6J3N0dW1wJyx4OjAuNTIseTowLjkyIH0seyB0eXBlOidmbG93ZXJzJyx4OjAuMzIseTowLjUgfV0sDQogICAgICBbeyB0eXBlOid0cmVlJyx4OjAuMDgseTowLjA4IH0seyB0eXBlOidyb2NrJyx4OjAuMjQseTowLjIyIH0seyB0eXBlOididXNoJyx4OjAuMyx5OjAuODYgfSx7IHR5cGU6J2NyYXRlJyx4OjAuNTIseTowLjI0IH0seyB0eXBlOidmbG93ZXJzJyx4OjAuODIseTowLjE0IH0seyB0eXBlOidzdHVtcCcseDowLjkseTowLjkgfV0sDQogICAgICBbeyB0eXBlOid0cmVlJyx4OjAuMDgseTowLjI0IH0seyB0eXBlOid0cmVlJyx4OjAuMSx5OjAuNzggfSx7IHR5cGU6J3JvY2snLHg6MC4yOCx5OjAuNDYgfSx7IHR5cGU6J2J1c2gnLHg6MC43Mix5OjAuMTIgfSx7IHR5cGU6J2NyYXRlJyx4OjAuOSx5OjAuNjYgfSx7IHR5cGU6J2Zsb3dlcnMnLHg6MC41LHk6MC4wNiB9LHsgdHlwZTonc3R1bXAnLHg6MC45NCx5OjAuMjggfV0sDQogICAgICBbeyB0eXBlOid0cmVlJyx4OjAuMDYseTowLjYyIH0seyB0eXBlOidyb2NrJyx4OjAuMjQseTowLjEgfSx7IHR5cGU6J2J1c2gnLHg6MC40LHk6MC45MiB9LHsgdHlwZTonY3JhdGUnLHg6MC43NCx5OjAuMSB9LHsgdHlwZTonZmxvd2VycycseDowLjc4LHk6MC44NCB9LHsgdHlwZTonc3R1bXAnLHg6MC45Mix5OjAuNTggfSx7IHR5cGU6J3BvbmQnLHg6MC44NCx5OjAuMiB9XSwNCiAgICBdOw0KICAgIHJldHVybiAocHJlc2V0c1ttYXBJbmRleF0gfHwgW10pLm1hcCgocykgPT4gKHsgLi4ucywgcHg6IHMueCAqICh3aWR0aCAtIFNJREVfUEFORUwpLCBweTogcy55ICogaGVpZ2h0IH0pKTsNCiAgfQ0KDQogIGZ1bmN0aW9uIGNyZWF0ZUJsb29uKHR5cGUsIGxhbmUpIHsNCiAgICBjb25zdCBiYXNlID0gYmxvb25DYXRhbG9nW3R5cGVdOw0KICAgIGNvbnN0IHBhdGggPSBnZXRNYXBQYXRocygpW2xhbmVdOw0KICAgIGNvbnN0IGRpZmYgPSBkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XTsNCiAgICByZXR1cm4gew0KICAgICAgLi4uc3RydWN0dXJlZENsb25lKGJhc2UpLA0KICAgICAgdHlwZSwgbGFuZSwgeDogcGF0aFswXS54LCB5OiBwYXRoWzBdLnksIHBhdGhJZHg6IDAsDQogICAgICBzbG93VGlja3M6IDAsIGdsdWVUaWNrc0FjdGl2ZTogMCwgZ2x1ZWRGYWN0b3I6IDEsIGNhbW9SZXZlYWxlZDogZmFsc2UsDQogICAgICByYWRpdXM6IGJhc2UucmFkaXVzID8/IDEzLA0KICAgICAgaHA6IE1hdGgubWF4KDEsIE1hdGguY2VpbChiYXNlLmhwICogZGlmZi5ibG9vbkhwKSksDQogICAgICBtYXhIcDogTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGJhc2UuaHAgKiBkaWZmLmJsb29uSHApKSwNCiAgICAgIGJhc2VTcGVlZDogYmFzZS5zcGVlZCAqIGRpZmYuYmxvb25TcGVlZCwNCiAgICB9Ow0KICB9DQoNCiAgZnVuY3Rpb24gaXNUb3dlclVubG9ja2VkKHRvd2VyS2V5KSB7DQogICAgY29uc3QgZGVmID0gdG93ZXJEZWZzW3Rvd2VyS2V5XTsNCiAgICBpZiAoIWRlZikgcmV0dXJuIGZhbHNlOw0KICAgIGlmIChkZWYudW5sb2NrQ29pbnMpIHJldHVybiAhIXByb2ZpbGUudW5sb2NrZWRTcGVjaWFsVG93ZXJzW3Rvd2VyS2V5XTsNCiAgICByZXR1cm4gcHJvZ3Jlc3Npb24ubGV2ZWwgPj0gKGRlZi51bmxvY2tMdmwgPz8gMSk7DQogIH0NCg0KICBmdW5jdGlvbiBidWlsZFdhdmUod2F2ZSkgew0KICAgIGNvbnN0IHF1ZXVlID0gW107DQogICAgY29uc3QgbGFuZUNvdW50ID0gZ2V0TWFwUGF0aHMoKS5sZW5ndGg7DQogICAgY29uc3QgYWRkID0gKHR5cGUsIGNvdW50LCBkZWxheSA9IDE4KSA9PiB7IGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykgcXVldWUucHVzaCh7IHR5cGUsIGRlbGF5LCBsYW5lOiBpICUgbGFuZUNvdW50IH0pOyB9Ow0KICAgIGFkZCgncmVkJywgMTQgKyB3YXZlICogMyk7DQogICAgaWYgKHdhdmUgPj0gMikgYWRkKCdibHVlJywgMTAgKyB3YXZlICogMik7DQogICAgaWYgKHdhdmUgPj0gNCkgYWRkKCdncmVlbicsIE1hdGguZmxvb3Iod2F2ZSAqIDIuMSkpOw0KICAgIGlmICh3YXZlID49IDYpIGFkZCgneWVsbG93JywgTWF0aC5mbG9vcih3YXZlICogMS45KSwgMTMpOw0KICAgIGlmICh3YXZlID49IDcpIGFkZCgncGluaycsIE1hdGguZmxvb3Iod2F2ZSAqIDEuNSksIDEyKTsNCiAgICBpZiAod2F2ZSA+PSA4KSBhZGQoJ2JsYWNrJywgTWF0aC5mbG9vcih3YXZlICogMS42KSk7DQogICAgaWYgKHdhdmUgPj0gMTApIGFkZCgnd2hpdGUnLCBNYXRoLmZsb29yKHdhdmUgKiAxLjYpKTsNCiAgICBpZiAod2F2ZSA+PSAxMSkgYWRkKCd6ZWJyYScsIE1hdGguZmxvb3Iod2F2ZSAqIDEuMikpOw0KICAgIGlmICh3YXZlID49IDEzKSBhZGQoJ3B1cnBsZScsIE1hdGguZmxvb3Iod2F2ZSAqIDEuMSksIDE0KTsNCiAgICBpZiAod2F2ZSA+PSAxMikgYWRkKCdsZWFkJywgOCArIE1hdGguZmxvb3Iod2F2ZSAqIDAuNyksIDIyKTsNCiAgICBpZiAod2F2ZSA+PSAxNSkgYWRkKCdyYWluYm93JywgMyArIE1hdGguZmxvb3Iod2F2ZSAqIDAuNyksIDIwKTsNCiAgICBpZiAod2F2ZSA+PSAxNikgYWRkKCdjZXJhbWljJywgNCArIE1hdGguZmxvb3Iod2F2ZSAvIDIpLCAyNik7DQogICAgaWYgKHdhdmUgPj0gMjIpIGFkZCgnZm9ydGlmaWVkJywgMSArIE1hdGguZmxvb3Iod2F2ZSAvIDUpLCAzMik7DQogICAgaWYgKHdhdmUgJSAxMCA9PT0gMCkgcXVldWUucHVzaCh7IHR5cGU6J21vYWInLCBkZWxheTo4MCwgbGFuZTogd2F2ZSAlIGxhbmVDb3VudCB9KTsNCiAgICBpZiAod2F2ZSAlIDIwID09PSAwKSBxdWV1ZS5wdXNoKHsgdHlwZTonYmZiJywgZGVsYXk6MTIwLCBsYW5lOiAod2F2ZSArIDEpICUgbGFuZUNvdW50IH0pOw0KICAgIHJldHVybiBxdWV1ZTsNCiAgfQ0KDQogIGZ1bmN0aW9uIGRpc3RhbmNlVG9TZWdtZW50KHB4LCBweSwgeDEsIHkxLCB4MiwgeTIpIHsNCiAgICBjb25zdCBBID0gcHggLSB4MSwgQiA9IHB5IC0geTEsIEMgPSB4MiAtIHgxLCBEID0geTIgLSB5MTsNCiAgICBjb25zdCBkb3QgPSBBICogQyArIEIgKiBEOw0KICAgIGNvbnN0IGxlblNxID0gQyAqIEMgKyBEICogRDsNCiAgICBjb25zdCB0ID0gbGVuU3EgPT09IDAgPyAwIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgZG90IC8gbGVuU3EpKTsNCiAgICByZXR1cm4gTWF0aC5oeXBvdChweCAtICh4MSArIHQgKiBDKSwgcHkgLSAoeTEgKyB0ICogRCkpOw0KICB9DQoNCiAgZnVuY3Rpb24gaXNQb2ludE9uQW55UGF0aCh4LCB5KSB7DQogICAgY29uc3QgcGF0aHMgPSBnZXRNYXBQYXRocygpOw0KICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykgaWYgKGRpc3RhbmNlVG9TZWdtZW50KHgsIHksIHBhdGhbaV0ueCwgcGF0aFtpXS55LCBwYXRoW2kgKyAxXS54LCBwYXRoW2kgKyAxXS55KSA8PSA0MikgcmV0dXJuIHRydWU7DQogICAgcmV0dXJuIGZhbHNlOw0KICB9DQoNCiAgZnVuY3Rpb24gYmxvb25Qcm9ncmVzcyhiKSB7DQogICAgY29uc3QgcGF0aCA9IGdldE1hcFBhdGhzKClbYi5sYW5lXTsNCiAgICBsZXQgcHJvZ3Jlc3MgPSAwOw0KICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYi5wYXRoSWR4OyBpKyspIHByb2dyZXNzICs9IE1hdGguaHlwb3QocGF0aFtpICsgMV0ueCAtIHBhdGhbaV0ueCwgcGF0aFtpICsgMV0ueSAtIHBhdGhbaV0ueSk7DQogICAgaWYgKHBhdGhbYi5wYXRoSWR4ICsgMV0pIHByb2dyZXNzICs9IE1hdGguaHlwb3QoYi54IC0gcGF0aFtiLnBhdGhJZHhdLngsIGIueSAtIHBhdGhbYi5wYXRoSWR4XS55KTsNCiAgICByZXR1cm4gcHJvZ3Jlc3M7DQogIH0NCg0KICBmdW5jdGlvbiBnZXRUb3dlclVwZ3JhZGVDb3N0KHRvd2VyLCBwYXRoSW5kZXgpIHsNCiAgICBjb25zdCB0aWVyID0gdG93ZXIudXBncmFkZXNbcGF0aEluZGV4XTsNCiAgICBpZiAocGF0aEluZGV4ID09PSAwKSByZXR1cm4gMjYwICsgdGllciAqIDI0MDsNCiAgICBpZiAocGF0aEluZGV4ID09PSAxKSByZXR1cm4gMzQwICsgdGllciAqIDMwMDsNCiAgICByZXR1cm4gMzAwICsgdGllciAqIDI3MDsNCiAgfQ0KDQogIGZ1bmN0aW9uIGNhblVwZ3JhZGVQYXRoKHQsIHBhdGhJbmRleCkgew0KICAgIC8vIFVQREFURUQ6IDMtcGF0aCwgdGllci01IGNhcC4gT25seSAyIHBhdGhzIGNhbiBiZSBhY3RpdmUuIFRpZXItNSBsb2NrcyBvdGhlcnMuDQogICAgaWYgKHQudXBncmFkZXNbcGF0aEluZGV4XSA+PSA1KSByZXR1cm4gZmFsc2U7DQogICAgaWYgKHQudXBncmFkZXMuc29tZSgobHZsKSA9PiBsdmwgPj0gNSAmJiBsdmwgIT09IHQudXBncmFkZXNbcGF0aEluZGV4XSkpIHJldHVybiBmYWxzZTsNCiAgICBjb25zdCBhY3RpdmVPdGhlclBhdGhzID0gdC51cGdyYWRlcy5maWx0ZXIoKGx2bCwgaSkgPT4gaSAhPT0gcGF0aEluZGV4ICYmIGx2bCA+IDApLmxlbmd0aDsNCiAgICBpZiAodC51cGdyYWRlc1twYXRoSW5kZXhdID09PSAwICYmIGFjdGl2ZU90aGVyUGF0aHMgPj0gMikgcmV0dXJuIGZhbHNlOw0KICAgIHJldHVybiB0cnVlOw0KICB9DQoNCiAgZnVuY3Rpb24gbmV4dFVwZ3JhZGVUZXh0KHQsIHBhdGhJbmRleCkgew0KICAgIGNvbnN0IHRpZXIgPSB0LnVwZ3JhZGVzW3BhdGhJbmRleF07DQogICAgaWYgKHRpZXIgPj0gNSkgcmV0dXJuICdNQVgnOw0KICAgIGlmICghY2FuVXBncmFkZVBhdGgodCwgcGF0aEluZGV4KSkgcmV0dXJuICdDcm9zc3BhdGggTG9ja2VkJzsNCiAgICBjb25zdCBrZXkgPSBwYXRoSW5kZXggPT09IDAgPyAncDEnIDogcGF0aEluZGV4ID09PSAxID8gJ3AyJyA6ICdwMyc7DQogICAgY29uc3QgbGlzdCA9IHRvd2VyRGVmc1t0LnR5cGVdLnBhdGhOYW1lcz8uW2tleV0gfHwgW107DQogICAgcmV0dXJuIGAke2xpc3RbdGllcl0gfHwgYFRpZXIgJHt0aWVyICsgMX1gfSAoJCR7Z2V0VG93ZXJVcGdyYWRlQ29zdCh0LCBwYXRoSW5kZXgpfSlgOw0KICB9DQoNCiAgZnVuY3Rpb24gYXBwbHlUb3dlclVwZ3JhZGUodCwgcGF0aEluZGV4KSB7DQogICAgaWYgKCFjYW5VcGdyYWRlUGF0aCh0LCBwYXRoSW5kZXgpKSByZXR1cm47DQogICAgY29uc3QgYmVmb3JlID0gdC51cGdyYWRlc1twYXRoSW5kZXhdOw0KICAgIGlmIChiZWZvcmUgPj0gNSkgcmV0dXJuOw0KICAgIGNvbnN0IHRpZXIgPSBiZWZvcmUgKyAxOw0KDQogICAgLy8gVVBEQVRFRDogdG93ZXItc3BlY2lmaWMgMy1wYXRoIHVwZ3JhZGUgZWZmZWN0cy4NCiAgICBzd2l0Y2ggKHQudHlwZSkgew0KICAgICAgY2FzZSAnZGFydCc6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5waWVyY2UgKz0gMTsgdC5yYW5nZSArPSAxMDsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg1LCB0LmZpcmVSYXRlIC0gMyk7IGlmICh0aWVyID49IDMpIHQubXVsdGlTaG90ID0gTWF0aC5tYXgodC5tdWx0aVNob3QgfHwgMSwgMik7IH0NCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdENhbW8gPSB0cnVlOyBpZiAodGllciA+PSAyKSB0LmNhbkhpdExlYWQgPSB0cnVlOyBpZiAodGllciA+PSA0KSB0LmNyaXRDaGFuY2UgPSAwLjI7IH0NCiAgICAgICAgYnJlYWs7DQogICAgICBjYXNlICduaW5qYSc6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5waWVyY2UgKz0gMjsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg0LCB0LmZpcmVSYXRlIC0gMyk7IGlmICh0aWVyID49IDMpIHQuc3R1blRpY2tzID0gMTA7IH0NCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdENhbW8gPSB0cnVlOyBpZiAodGllciA+PSAzKSB0LmFybW9yQnJlYWsgPSAxOyB9DQogICAgICAgIGJyZWFrOw0KICAgICAgY2FzZSAnYm9tYic6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5zcGxhc2ggPSAodC5zcGxhc2ggfHwgODUpICsgMTg7IHQuZGFtYWdlICs9IDE7IH0NCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgeyB0LmZpcmVSYXRlID0gTWF0aC5tYXgoOCwgdC5maXJlUmF0ZSAtIDMpOyBpZiAodGllciA+PSAzKSB0LnN0dW5UaWNrcyA9IDIwOyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5jYW5IaXRDYW1vID0gdGllciA+PSAyOyB0LmFybW9yQnJlYWsgPSAodC5hcm1vckJyZWFrIHx8IDApICsgMTsgfQ0KICAgICAgICBicmVhazsNCiAgICAgIGNhc2UgJ2ljZSc6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5mcmVlemVEdXJhdGlvbiArPSAyMDsgdC5yYW5nZSArPSA4OyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDgsIHQuZmlyZVJhdGUgLSA0KTsgdC5kYW1hZ2UgKz0gMTsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB7IHQuY2FuSGl0Q2FtbyA9IHRpZXIgPj0gMjsgdC5jYW5IaXRMZWFkID0gdGllciA+PSAzOyB0LmFybW9yQnJlYWsgPSB0aWVyID49IDQgPyAxIDogMDsgfQ0KICAgICAgICBicmVhazsNCiAgICAgIGNhc2UgJ3NuaXBlcic6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5kYW1hZ2UgKz0gMjsgdC5waWVyY2UgKz0gMTsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg4LCB0LmZpcmVSYXRlIC0gNik7IH0NCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmNhbkhpdENhbW8gPSB0cnVlOyB0LmNhbkhpdExlYWQgPSB0cnVlOyBpZiAodGllciA+PSAzKSB0LnN0dW5UaWNrcyA9IDEyOyB9DQogICAgICAgIGJyZWFrOw0KICAgICAgY2FzZSAnYm9vbWVyYW5nJzoNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgeyB0LnBpZXJjZSArPSAyOyB0LnJhbmdlICs9IDEwOyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDUsIHQuZmlyZVJhdGUgLSAzKTsgaWYgKHRpZXIgPj0gMykgdC5tdWx0aVNob3QgPSAyOyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5jYW5IaXRMZWFkID0gdGllciA+PSAyOyBpZiAodGllciA+PSA0KSB0LnN0dW5UaWNrcyA9IDg7IH0NCiAgICAgICAgYnJlYWs7DQogICAgICBjYXNlICd0YWNrJzoNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgeyB0LmJ1cnN0ID0gKHQuYnVyc3QgfHwgNikgKyAyOyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDQsIHQuZmlyZVJhdGUgLSAyKTsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB7IHQuYnVyblRpY2tzID0gKHQuYnVyblRpY2tzIHx8IDApICsgMjA7IHQuYnVybkRhbWFnZSA9ICh0LmJ1cm5EYW1hZ2UgfHwgMCkgKyAxOyB9DQogICAgICAgIGJyZWFrOw0KICAgICAgY2FzZSAnZ2x1ZSc6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHsgdC5nbHVlVGlja3MgKz0gMzA7IHQuZ2x1ZVNsb3cgPSBNYXRoLm1heCgwLjIsIHQuZ2x1ZVNsb3cgLSAwLjA2KTsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB7IHQuZmlyZVJhdGUgPSBNYXRoLm1heCg4LCB0LmZpcmVSYXRlIC0gMyk7IH0NCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgeyB0LmFybW9yQnJlYWsgPSAodC5hcm1vckJyZWFrIHx8IDApICsgMTsgdC5jYW5IaXRDYW1vID0gdGllciA+PSAzOyB9DQogICAgICAgIGJyZWFrOw0KICAgICAgY2FzZSAndmlsbGFnZSc6DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDApIHQucmFuZ2UgKz0gMTg7DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHQuZGlzY291bnQgPSBNYXRoLm1pbigwLjMsICh0LmRpc2NvdW50IHx8IDApICsgMC4wNik7DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5zdXBwb3J0RGV0ZWN0ID0gdGllciA+PSAxOyB0LnN1cHBvcnRMZWFkID0gdGllciA+PSAyOyB0LnN1cHBvcnREYW1hZ2UgPSB0aWVyID49IDQgPyAyIDogMTsgfQ0KICAgICAgICBicmVhazsNCiAgICAgIGNhc2UgJ3N1cHBvcnQnOg0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAwKSB0LnJhbmdlICs9IDIwOw0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAxKSB0LnN1cHBvcnRTcGVlZCA9IE1hdGgubWluKDAuNCwgKHQuc3VwcG9ydFNwZWVkIHx8IDApICsgMC4wOCk7DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDIpIHsgdC5zdXBwb3J0RGV0ZWN0ID0gdHJ1ZTsgdC5zdXBwb3J0TGVhZCA9IHRpZXIgPj0gMjsgdC5zdXBwb3J0QXJtb3JCcmVhayA9IE1hdGgubWluKDMsICh0LnN1cHBvcnRBcm1vckJyZWFrIHx8IDApICsgMSk7IH0NCiAgICAgICAgYnJlYWs7DQogICAgICBjYXNlICdmYXJtJzoNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgdC5mYXJtSW5jb21lID0gKHQuZmFybUluY29tZSB8fCA0NSkgKyAyNTsNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgdC5mYXJtUmF0ZSA9IE1hdGgubWF4KDQwLCAodC5mYXJtUmF0ZSB8fCAyNDApIC0gMjUpOw0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB0LmF1dG9Db2xsZWN0ID0gdHJ1ZTsNCiAgICAgICAgYnJlYWs7DQogICAgICBjYXNlICdzdXBlcic6DQogICAgICBjYXNlICdsYXNlcic6DQogICAgICBjYXNlICdwbGFzbWEnOg0KICAgICAgY2FzZSAnc3VuJzoNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgeyB0LmRhbWFnZSArPSAyOyB0LnBpZXJjZSArPSAxOyB9DQogICAgICAgIGlmIChwYXRoSW5kZXggPT09IDEpIHsgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDMsIHQuZmlyZVJhdGUgLSAyKTsgfQ0KICAgICAgICBpZiAocGF0aEluZGV4ID09PSAyKSB7IHQuY2FuSGl0Q2FtbyA9IHRydWU7IHQuY2FuSGl0TGVhZCA9IHRydWU7IHQuYXJtb3JCcmVhayA9ICh0LmFybW9yQnJlYWsgfHwgMCkgKyAxOyB9DQogICAgICAgIGJyZWFrOw0KICAgICAgZGVmYXVsdDoNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMCkgdC5yYW5nZSArPSAxMDsNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMSkgdC5maXJlUmF0ZSA9IE1hdGgubWF4KDYsIHQuZmlyZVJhdGUgLSAyKTsNCiAgICAgICAgaWYgKHBhdGhJbmRleCA9PT0gMikgdC5kYW1hZ2UgKz0gMTsNCiAgICAgICAgYnJlYWs7DQogICAgfQ0KDQogICAgdC51cGdyYWRlc1twYXRoSW5kZXhdICs9IDE7DQoNCiAgICBpZiAoIXQucHJvICYmICh0LnVwZ3JhZGVzWzBdID49IDUgfHwgdC51cGdyYWRlc1sxXSA+PSA1IHx8IHQudXBncmFkZXNbMl0gPj0gNSkpIHsNCiAgICAgIHQucHJvID0gdHJ1ZTsNCiAgICAgIGlmICh0LnR5cGUgIT09ICd2aWxsYWdlJykgew0KICAgICAgICB0LmRhbWFnZSArPSAyOw0KICAgICAgICB0LnBpZXJjZSArPSAyOw0KICAgICAgICB0LmZpcmVSYXRlID0gTWF0aC5tYXgoNSwgdC5maXJlUmF0ZSAtIDIpOw0KICAgICAgfQ0KICAgICAgdC5yYW5nZSArPSAyMjsNCiAgICB9DQoNCiAgICByZWNhbGNWaWxsYWdlQnVmZnMoKTsNCiAgfQ0KDQogIGZ1bmN0aW9uIGFwcGx5UHJvTWFzdGVyeSh0KSB7DQogICAgY29uc3QgY29zdCA9IDIyMDA7DQogICAgaWYgKCF0IHx8IHQucHJvTWFzdGVyeSB8fCAhdC5wcm8pIHJldHVybjsNCiAgICBpZiAoc3RhdGUubW9uZXkgPCBjb3N0KSByZXR1cm47DQogICAgc3RhdGUubW9uZXkgLT0gY29zdDsNCiAgICB0LnByb01hc3RlcnkgPSB0cnVlOw0KICAgIGlmICh0LnR5cGUgIT09ICd2aWxsYWdlJykgew0KICAgICAgdC5kYW1hZ2UgKz0gMzsNCiAgICAgIHQucGllcmNlICs9IDM7DQogICAgICB0LmZpcmVSYXRlID0gTWF0aC5tYXgoNCwgdC5maXJlUmF0ZSAtIDMpOw0KICAgIH0NCiAgICB0LnJhbmdlICs9IDMwOw0KICAgIGlmICh0LnR5cGUgPT09ICd2aWxsYWdlJykgdC5kaXNjb3VudCA9IE1hdGgubWluKDAuNCwgKHQuZGlzY291bnQgfHwgMCkgKyAwLjEpOw0KICAgIHJlY2FsY1ZpbGxhZ2VCdWZmcygpOw0KICB9DQoNCiAgZnVuY3Rpb24gYnV5TWV0YVVwZ3JhZGUod2hpY2gpIHsNCiAgICBpZiAocHJvZ3Jlc3Npb24ucG9pbnRzIDw9IDApIHJldHVybjsNCiAgICBpZiAod2hpY2ggPT09ICdzcGVlZCcgJiYgcHJvZ3Jlc3Npb24uYXR0YWNrU3BlZWRMZXZlbCA8IDgpIHsgcHJvZ3Jlc3Npb24uYXR0YWNrU3BlZWRMZXZlbCArPSAxOyBwcm9ncmVzc2lvbi5wb2ludHMgLT0gMTsgfQ0KICAgIGlmICh3aGljaCA9PT0gJ2Nhc2gnICYmIHByb2dyZXNzaW9uLnN0YXJ0aW5nQ2FzaExldmVsIDwgOCkgeyBwcm9ncmVzc2lvbi5zdGFydGluZ0Nhc2hMZXZlbCArPSAxOyBwcm9ncmVzc2lvbi5wb2ludHMgLT0gMTsgYXBwbHlNZXRhQm9udXNlcygpOyB9DQogIH0NCg0KICBmdW5jdGlvbiByZWNhbGNWaWxsYWdlQnVmZnMoKSB7DQogICAgZm9yIChjb25zdCB0IG9mIHRvd2Vycykgew0KICAgICAgdC52aWxsYWdlQnVmZiA9IHsgcmFuZ2U6IDAsIHNwZWVkOiAwLCBjYW1vOiBmYWxzZSwgbGVhZDogZmFsc2UsIGRpc2NvdW50OiAwLCBkYW1hZ2U6IDAsIHBpZXJjZTogMCwgYXJtb3JCcmVhazogMCB9Ow0KICAgIH0NCiAgICBjb25zdCB2aWxsYWdlcyA9IHRvd2Vycy5maWx0ZXIodCA9PiB0LnR5cGUgPT09ICd2aWxsYWdlJyk7DQogICAgZm9yIChjb25zdCB2IG9mIHZpbGxhZ2VzKSB7DQogICAgICBjb25zdCByID0gdi5yYW5nZTsNCiAgICAgIGZvciAoY29uc3QgdCBvZiB0b3dlcnMpIHsNCiAgICAgICAgaWYgKHQgPT09IHYpIGNvbnRpbnVlOw0KICAgICAgICBpZiAoTWF0aC5oeXBvdCh0LnggLSB2LngsIHQueSAtIHYueSkgPiByKSBjb250aW51ZTsNCiAgICAgICAgY29uc3QgYSA9IHYudXBncmFkZXNbMF0sIGIgPSB2LnVwZ3JhZGVzWzFdOw0KICAgICAgICB0LnZpbGxhZ2VCdWZmLnJhbmdlID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5yYW5nZSwgYSA+PSAxID8gMjAgOiAwKTsNCiAgICAgICAgdC52aWxsYWdlQnVmZi5zcGVlZCA9IE1hdGgubWF4KHQudmlsbGFnZUJ1ZmYuc3BlZWQsIGEgPj0gMiA/IDAuMjQgOiAwKTsNCiAgICAgICAgaWYgKGEgPj0gMyB8fCBiID49IDMpIHQudmlsbGFnZUJ1ZmYuY2FtbyA9IHRydWU7DQogICAgICAgIGlmIChiID49IDQpIHQudmlsbGFnZUJ1ZmYubGVhZCA9IHRydWU7DQogICAgICAgIHQudmlsbGFnZUJ1ZmYuZGlzY291bnQgPSBNYXRoLm1heCh0LnZpbGxhZ2VCdWZmLmRpc2NvdW50LCBiID49IDEgPyAwLjA4IDogMCwgYiA+PSAyID8gMC4xNiA6IDApOw0KICAgICAgICB0LnZpbGxhZ2VCdWZmLmRhbWFnZSA9IE1hdGgubWF4KHQudmlsbGFnZUJ1ZmYuZGFtYWdlLCB2LnN1cHBvcnREYW1hZ2UgfHwgMCk7DQogICAgICB9DQogICAgfQ0KICAgIC8vIE5FVzogc3VwcG9ydCB0b3dlciBhdXJhIGJ1ZmZzLg0KICAgIGNvbnN0IHN1cHBvcnRzID0gdG93ZXJzLmZpbHRlcigodCkgPT4gdC50eXBlID09PSAnc3VwcG9ydCcpOw0KICAgIGZvciAoY29uc3QgcyBvZiBzdXBwb3J0cykgew0KICAgICAgZm9yIChjb25zdCB0IG9mIHRvd2Vycykgew0KICAgICAgICBpZiAodCA9PT0gcykgY29udGludWU7DQogICAgICAgIGlmIChNYXRoLmh5cG90KHQueCAtIHMueCwgdC55IC0gcy55KSA+IHMucmFuZ2UpIGNvbnRpbnVlOw0KICAgICAgICB0LnZpbGxhZ2VCdWZmLnJhbmdlID0gTWF0aC5tYXgodC52aWxsYWdlQnVmZi5yYW5nZSwgKHMudXBncmFkZXNbMF0gfHwgMCkgKiAxMik7DQogICAgICAgIHQudmlsbGFnZUJ1ZmYuc3BlZWQgPSBNYXRoLm1heCh0LnZpbGxhZ2VCdWZmLnNwZWVkLCBzLnN1cHBvcnRTcGVlZCB8fCAwKTsNCiAgICAgICAgaWYgKHMuc3VwcG9ydERldGVjdCkgdC52aWxsYWdlQnVmZi5jYW1vID0gdHJ1ZTsNCiAgICAgICAgaWYgKHMuc3VwcG9ydExlYWQpIHQudmlsbGFnZUJ1ZmYubGVhZCA9IHRydWU7DQogICAgICAgIHQudmlsbGFnZUJ1ZmYuYXJtb3JCcmVhayA9IE1hdGgubWF4KHQudmlsbGFnZUJ1ZmYuYXJtb3JCcmVhaywgcy5zdXBwb3J0QXJtb3JCcmVhayB8fCAwKTsNCiAgICAgICAgdC52aWxsYWdlQnVmZi5kYW1hZ2UgPSBNYXRoLm1heCh0LnZpbGxhZ2VCdWZmLmRhbWFnZSwgcy5zdXBwb3J0RGFtYWdlIHx8IDApOw0KICAgICAgfQ0KICAgIH0NCiAgfQ0KDQogIGZ1bmN0aW9uIHBpY2tUYXJnZXQodG93ZXIpIHsNCiAgICBjb25zdCByYW5nZSA9IHRvd2VyLnJhbmdlICsgKHRvd2VyLnZpbGxhZ2VCdWZmPy5yYW5nZSB8fCAwKTsNCiAgICBjb25zdCBpblJhbmdlID0gYmxvb25zLmZpbHRlcigoYikgPT4gTWF0aC5oeXBvdChiLnggLSB0b3dlci54LCBiLnkgLSB0b3dlci55KSA8PSByYW5nZSk7DQogICAgaWYgKCFpblJhbmdlLmxlbmd0aCkgcmV0dXJuIG51bGw7DQogICAgaWYgKHRvd2VyLnRhcmdldE1vZGUgPT09ICdsYXN0JykgcmV0dXJuIGluUmFuZ2UucmVkdWNlKChhLCBiKSA9PiAoYmxvb25Qcm9ncmVzcyhhKSA8IGJsb29uUHJvZ3Jlc3MoYikgPyBhIDogYikpOw0KICAgIGlmICh0b3dlci50YXJnZXRNb2RlID09PSAnc3Ryb25nJykgcmV0dXJuIGluUmFuZ2UucmVkdWNlKChhLCBiKSA9PiAoYS5ocCA+IGIuaHAgPyBhIDogYikpOw0KICAgIGlmICh0b3dlci50YXJnZXRNb2RlID09PSAnY2xvc2UnKSByZXR1cm4gaW5SYW5nZS5yZWR1Y2UoKGEsIGIpID0+IChNYXRoLmh5cG90KGEueCAtIHRvd2VyLngsIGEueSAtIHRvd2VyLnkpIDwgTWF0aC5oeXBvdChiLnggLSB0b3dlci54LCBiLnkgLSB0b3dlci55KSA/IGEgOiBiKSk7DQogICAgcmV0dXJuIGluUmFuZ2UucmVkdWNlKChhLCBiKSA9PiAoYmxvb25Qcm9ncmVzcyhhKSA+IGJsb29uUHJvZ3Jlc3MoYikgPyBhIDogYikpOw0KICB9DQoNCiAgZnVuY3Rpb24gaGl0Qmxvb24oYiwgcCkgew0KICAgIC8vIFVQREFURUQ6IHNwZWNpYWwgZWZmZWN0cyAoY2Ftby9sZWFkIGNoZWNrcywgYnVybiwgc3R1biwgYXJtb3IgYnJlYWspDQogICAgaWYgKGIuY2FtbyAmJiAhcC5jYW5IaXRDYW1vKSByZXR1cm47DQogICAgaWYgKGIudHlwZSA9PT0gJ2xlYWQnICYmICFwLmNhbkhpdExlYWQgJiYgcC50eXBlICE9PSAnYm9tYicpIHJldHVybjsNCiAgICBjb25zdCBpbW11bml0eSA9IHAudHlwZSA9PT0gJ2JvbWInID8gJ2V4cGxvc2l2ZScgOiBwLnR5cGUgPT09ICdpY2UnID8gJ2ljZScgOiAnc2hhcnAnOw0KICAgIGlmIChiLmltbXVuaXRpZXMuaW5jbHVkZXMoaW1tdW5pdHkpKSByZXR1cm47DQoNCiAgICBpZiAocC50eXBlID09PSAnZ2x1ZScpIHsNCiAgICAgIGIuZ2x1ZVRpY2tzQWN0aXZlID0gTWF0aC5tYXgoYi5nbHVlVGlja3NBY3RpdmUsIHAuZ2x1ZVRpY2tzID8/IDEwMCk7DQogICAgICBiLmdsdWVkRmFjdG9yID0gTWF0aC5taW4oYi5nbHVlZEZhY3RvciwgcC5nbHVlU2xvdyA/PyAwLjU1KTsNCiAgICB9DQoNCiAgICBpZiAocC5zdHVuVGlja3MpIGIuc3R1blRpY2tzID0gTWF0aC5tYXgoYi5zdHVuVGlja3MgfHwgMCwgcC5zdHVuVGlja3MpOw0KICAgIGlmIChwLmJ1cm5UaWNrcykgew0KICAgICAgYi5idXJuVGlja3MgPSBNYXRoLm1heChiLmJ1cm5UaWNrcyB8fCAwLCBwLmJ1cm5UaWNrcyk7DQogICAgICBiLmJ1cm5EYW1hZ2UgPSBNYXRoLm1heChiLmJ1cm5EYW1hZ2UgfHwgMCwgcC5idXJuRGFtYWdlIHx8IDEpOw0KICAgIH0NCiAgICBjb25zdCBhcm1vckJyZWFrID0gcC5hcm1vckJyZWFrIHx8IDA7DQogICAgaWYgKGFybW9yQnJlYWsgPiAwKSBiLmFybW9yQnJva2VuID0gTWF0aC5tYXgoYi5hcm1vckJyb2tlbiB8fCAwLCBhcm1vckJyZWFrICogNjApOw0KICAgIGNvbnN0IGFybW9yTWl0aWdhdGlvbiA9IGIuYXJtb3JCcm9rZW4gPiAwID8gMCA6ICgoYi50eXBlID09PSAnZm9ydGlmaWVkJyB8fCBiLnR5cGUgPT09ICdsZWFkJykgPyAxIDogMCk7DQogICAgYi5ocCAtPSBNYXRoLm1heCgwLCBwLmRhbWFnZSAtIGFybW9yTWl0aWdhdGlvbik7DQogICAgaWYgKHAudHlwZSA9PT0gJ2ljZScpIGIuc2xvd1RpY2tzID0gTWF0aC5tYXgoYi5zbG93VGlja3MsIHAuZnJlZXplRHVyYXRpb24gfHwgODApOw0KDQogICAgaWYgKGIuaHAgPD0gMCkgew0KICAgICAgY29uc3QgcmV3YXJkTXVsdCA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldLmNhc2hNdWx0Ow0KICAgICAgc3RhdGUubW9uZXkgKz0gTWF0aC5mbG9vcihiLnJld2FyZCAqIHJld2FyZE11bHQpOw0KICAgICAgZ2FpblhwKDQgKyBNYXRoLmZsb29yKGIubWF4SHAgLyA0KSk7DQogICAgfQ0KICB9DQoNCiAgZnVuY3Rpb24gc3RhcnRXYXZlKCkgew0KICAgIGlmICh3YXZlSW5Qcm9ncmVzcyB8fCBnYW1lT3ZlciB8fCBydW5Xb24pIHJldHVybjsNCiAgICB3YXZlUXVldWUgPSBidWlsZFdhdmUoc3RhdGUud2F2ZSk7DQogICAgc3Bhd25UaW1lciA9IDA7DQogICAgd2F2ZUluUHJvZ3Jlc3MgPSB0cnVlOw0KICAgIHN0YXRlLnNlbGVjdGVkVG93ZXIgPSBudWxsOw0KICB9DQoNCiAgZnVuY3Rpb24gcmVzZXRSdW4oKSB7DQogICAgdG93ZXJzLmxlbmd0aCA9IDA7IGJsb29ucy5sZW5ndGggPSAwOyBwcm9qZWN0aWxlcy5sZW5ndGggPSAwOyBwbGFjZWRBZ2VudHMubGVuZ3RoID0gMDsNCiAgICB3YXZlUXVldWUgPSBbXTsgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTsgc3Bhd25UaW1lciA9IDA7DQogICAgd2hlZWxBY2N1bSA9IDA7IGdhbWVPdmVyID0gZmFsc2U7IHJ1bldvbiA9IGZhbHNlOw0KICAgIHN0YXRlLndhdmUgPSAxOyBzdGF0ZS5saXZlcyA9IGRpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldLmxpdmVzOw0KICAgIGFnZW50cy5zcGlrZXMgPSAzOyBhZ2VudHMuZ2x1ZVRyYXAgPSAyOyBhZ2VudHMuZmFybWVyID0gMTsgYWdlbnRNb2RlID0gbnVsbDsNCiAgICBhcHBseU1ldGFCb251c2VzKCk7DQogIH0NCg0KICBmdW5jdGlvbiBwbGFjZUFnZW50KCkgeyByZXR1cm4gZmFsc2U7IH0gLy8gYWdlbnRzIHJlbW92ZWQNCg0KICBmdW5jdGlvbiBkcm9wQ2FzaENyYXRlKCkge30NCg0KICAvLyBORVc6IHNoYXJlZCBsYXlvdXQgbW9kZWwgc28gZHJhdyArIGNsaWNrIGhpdGJveGVzIGFsd2F5cyBtYXRjaC4NCiAgZnVuY3Rpb24gZ2V0VG93ZXJDYXJkTGF5b3V0KHBhbmVsWCkgew0KICAgIGNvbnN0IGNhcmRZID0gaGVpZ2h0IC0gMzg4Ow0KICAgIHJldHVybiB7DQogICAgICBjYXJkWSwNCiAgICAgIHAxOiB7IHgxOiBwYW5lbFggKyAyMCwgeDI6IHBhbmVsWCArIDEwNCwgeTE6IGNhcmRZICsgOTQsIHkyOiBjYXJkWSArIDEyMiB9LA0KICAgICAgcDI6IHsgeDE6IHBhbmVsWCArIDExMCwgeDI6IHBhbmVsWCArIDE5NCwgeTE6IGNhcmRZICsgOTQsIHkyOiBjYXJkWSArIDEyMiB9LA0KICAgICAgcDM6IHsgeDE6IHBhbmVsWCArIDIwMCwgeDI6IHBhbmVsWCArIDI5NCwgeTE6IGNhcmRZICsgOTQsIHkyOiBjYXJkWSArIDEyMiB9LA0KICAgICAgdGFyZ2V0OiB7IHgxOiBwYW5lbFggKyAyMCwgeDI6IHBhbmVsWCArIDI5NCwgeTE6IGNhcmRZICsgMTI2LCB5MjogY2FyZFkgKyAxNDQgfSwNCiAgICAgIG1hc3Rlcnk6IHsgeDE6IHBhbmVsWCArIDIwLCB4MjogcGFuZWxYICsgMjk0LCB5MTogY2FyZFkgKyAxNDgsIHkyOiBjYXJkWSArIDE2NiB9LA0KICAgICAgc2VsbDogeyB4MTogcGFuZWxYICsgMjAsIHgyOiBwYW5lbFggKyAyOTQsIHkxOiBjYXJkWSArIDE3MCwgeTI6IGNhcmRZICsgMTg4IH0sDQogICAgfTsNCiAgfQ0KDQogIGZ1bmN0aW9uIHVwZGF0ZUFnZW50cygpIHt9DQoNCiAgZnVuY3Rpb24gZHJhd0hvbWUoKSB7DQogICAgY29uc3QgcGxheVdpZHRoID0gd2lkdGggLSBTSURFX1BBTkVMOw0KICAgIGNvbnN0IHBsYXlDZW50ZXJYID0gcGxheVdpZHRoIC8gMiArIEhPTUVfQ0VOVEVSX1hfT0ZGU0VUOw0KDQogICAgY3R4LmZpbGxTdHlsZSA9ICcjMTAyYTQzJzsNCiAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOw0KICAgIGN0eC5mb250ID0gJzcwMCA1MnB4IHNhbnMtc2VyaWYnOw0KICAgIGN0eC5maWxsVGV4dCgnQ09OU09MRSBUT1dFUiBERUZFTlNFIChNRVJHRUQpJywgcGxheUNlbnRlclggLSAzODUsIDExMCk7DQogICAgY3R4LmZvbnQgPSAnNTAwIDE4cHggc2Fucy1zZXJpZic7DQogICAgY3R4LmZpbGxUZXh0KCdQaWNrIG1hcCArIGRpZmZpY3VsdHksIHVubG9jayBwcmVtaXVtIHRvd2VycywgdGhlbiBTVEFSVCBHQU1FJywgcGxheUNlbnRlclggLSAyNTAsIDE0NSk7DQogICAgY3R4LmZvbnQgPSAnNzAwIDIwcHggc2Fucy1zZXJpZic7DQogICAgY3R4LmZpbGxUZXh0KGBCYW5rOiAke3Byb2ZpbGUuY29pbnN9IENvaW5zIHwgTW9ua2V5IE1vbmV5OiAke3Byb2ZpbGUubW9ua2V5TW9uZXl9YCwgcGxheUNlbnRlclggLSAxOTAsIDE3NSk7DQoNCiAgICBjb25zdCBjYXJkVyA9IDIyMCwgZ2FwID0gMjY7DQogICAgY29uc3QgdmlzaWJsZU1hcENhcmRzID0gTWF0aC5taW4oNCwgbWFwRGVmcy5sZW5ndGgpOw0KICAgIGNvbnN0IG1heE1hcFNjcm9sbCA9IE1hdGgubWF4KDAsIG1hcERlZnMubGVuZ3RoIC0gdmlzaWJsZU1hcENhcmRzKTsNCiAgICBtYXBTY3JvbGwgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXBTY3JvbGwsIG1heE1hcFNjcm9sbCkpOw0KICAgIGNvbnN0IHRvdGFsVyA9IHZpc2libGVNYXBDYXJkcyAqIGNhcmRXICsgKHZpc2libGVNYXBDYXJkcyAtIDEpICogZ2FwOw0KICAgIGNvbnN0IHN0YXJ0WCA9IChwbGF5V2lkdGggLSB0b3RhbFcpIC8gMjsNCiAgICBjb25zdCB5ID0gMjIwOw0KDQogICAgY29uc3QgdmlzaWJsZU1hcHMgPSBtYXBEZWZzLnNsaWNlKG1hcFNjcm9sbCwgbWFwU2Nyb2xsICsgdmlzaWJsZU1hcENhcmRzKTsNCiAgICB2aXNpYmxlTWFwcy5mb3JFYWNoKChtLCBpZHgpID0+IHsNCiAgICAgIGNvbnN0IGkgPSBtYXBTY3JvbGwgKyBpZHg7DQogICAgICBjb25zdCB4ID0gc3RhcnRYICsgaWR4ICogKGNhcmRXICsgZ2FwKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5zZWxlY3RlZE1hcCA9PT0gaSA/ICcjZmZkMTY2JyA6ICcjMzI0YTVmJzsNCiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBjYXJkVywgMTcwKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7DQogICAgICBjdHguZm9udCA9ICc3MDAgMjBweCBzYW5zLXNlcmlmJzsNCiAgICAgIGN0eC5maWxsVGV4dChtLm5hbWUsIHggKyAyMCwgeSArIDM0KTsNCiAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7DQogICAgICBjdHguZmlsbFRleHQoYCR7bS5sYW5lcy5sZW5ndGh9IHBhdGgocylgLCB4ICsgMjAsIHkgKyA2Mik7DQogICAgfSk7DQoNCiAgICBpZiAobWF4TWFwU2Nyb2xsID4gMCkgew0KICAgICAgY29uc3QgYXJyb3dXID0gNDA7DQogICAgICBjb25zdCBhcnJvd0dhcCA9IDE0Ow0KICAgICAgY29uc3QgbGVmdFggPSBzdGFydFggLSBhcnJvd0dhcCAtIGFycm93VzsNCiAgICAgIGNvbnN0IHJpZ2h0WCA9IHN0YXJ0WCArIHRvdGFsVyArIGFycm93R2FwOw0KICAgICAgY29uc3QgYXJyb3dZID0geSArIDYyOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9IG1hcFNjcm9sbCA+IDAgPyAnI2ZmZDE2NicgOiAnIzVkNmY4MCc7DQogICAgICBjdHguZmlsbFJlY3QobGVmdFgsIGFycm93WSwgNDAsIDQ0KTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7DQogICAgICBjdHguZm9udCA9ICc3MDAgMjRweCBzYW5zLXNlcmlmJzsNCiAgICAgIGN0eC5maWxsVGV4dCgn4oC5JywgbGVmdFggKyAxNCwgYXJyb3dZICsgMjkpOw0KDQogICAgICBjdHguZmlsbFN0eWxlID0gbWFwU2Nyb2xsIDwgbWF4TWFwU2Nyb2xsID8gJyNmZmQxNjYnIDogJyM1ZDZmODAnOw0KICAgICAgY3R4LmZpbGxSZWN0KHJpZ2h0WCwgYXJyb3dZLCA0MCwgNDQpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJzsNCiAgICAgIGN0eC5maWxsVGV4dCgn4oC6JywgcmlnaHRYICsgMTQsIGFycm93WSArIDI5KTsNCg0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZDdlM2ZjJzsNCiAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7DQogICAgICBjb25zdCBtYXBJbmZvID0gYE1hcHMgJHttYXBTY3JvbGwgKyAxfS0ke01hdGgubWluKG1hcERlZnMubGVuZ3RoLCBtYXBTY3JvbGwgKyB2aXNpYmxlTWFwQ2FyZHMpfSAvICR7bWFwRGVmcy5sZW5ndGh9IChzY3JvbGwgd2hlZWwgd29ya3MgdG9vKWA7DQogICAgICBjb25zdCBpbmZvWCA9IHN0YXJ0WCArIHRvdGFsVyAvIDIgLSBjdHgubWVhc3VyZVRleHQobWFwSW5mbykud2lkdGggLyAyOw0KICAgICAgY3R4LmZpbGxUZXh0KG1hcEluZm8sIGluZm9YLCB5ICsgMTkwKTsNCiAgICB9DQoNCiAgICBjb25zdCBkaWZmWSA9IDQxNTsNCiAgICBjb25zdCBkaWZmS2V5cyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCcsICdpbXBvcHBhYmxlJ107DQogICAgZGlmZktleXMuZm9yRWFjaCgoZCwgaWR4KSA9PiB7DQogICAgICBjb25zdCB4ID0gcGxheUNlbnRlclggLSAyNjUgKyBpZHggKiAxMzI7DQogICAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuZGlmZmljdWx0eSA9PT0gZCA/ICcjZmZkMTY2JyA6ICcjM2E1MDZiJzsNCiAgICAgIGN0eC5maWxsUmVjdCh4LCBkaWZmWSwgMTIyLCAzNik7DQogICAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuZGlmZmljdWx0eSA9PT0gZCA/ICcjMTExJyA6ICcjZmZmJzsNCiAgICAgIGN0eC5mb250ID0gJzcwMCAxNnB4IHNhbnMtc2VyaWYnOw0KICAgICAgY3R4LmZpbGxUZXh0KGRpZmZpY3VsdHlEZWZzW2RdLm5hbWUsIHggKyAxOCwgZGlmZlkgKyAyNCk7DQogICAgfSk7DQogICAgY3R4LmZpbGxTdHlsZSA9ICcjZDdlM2ZjJzsNCiAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnOw0KICAgIGNvbnN0IGJhc2VXaW4gPSA4MCArIE1BWF9XQVZFUyAqIDY7DQogICAgY3R4LmZpbGxUZXh0KGBXaW4gQ29pbnM6IEVhc3kgJHtNYXRoLmZsb29yKGJhc2VXaW4gKiBkaWZmaWN1bHR5RGVmcy5lYXN5LmNvaW5NdWx0KX0gfCBNZWRpdW0gJHtNYXRoLmZsb29yKGJhc2VXaW4gKiBkaWZmaWN1bHR5RGVmcy5tZWRpdW0uY29pbk11bHQpfSB8IEhhcmQgJHtNYXRoLmZsb29yKGJhc2VXaW4gKiBkaWZmaWN1bHR5RGVmcy5oYXJkLmNvaW5NdWx0KX1gLCBwbGF5Q2VudGVyWCAtIDI1MCwgNDYzKTsNCg0KICAgIGN0eC5maWxsU3R5bGUgPSAnIzJhOWQ4Zic7DQogICAgY3R4LmZpbGxSZWN0KHBsYXlDZW50ZXJYIC0gMTIwLCA0NzAsIDI0MCwgNTYpOw0KICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7DQogICAgY3R4LmZvbnQgPSAnNzAwIDI0cHggc2Fucy1zZXJpZic7DQogICAgY3R4LmZpbGxUZXh0KCdTVEFSVCBHQU1FJywgcGxheUNlbnRlclggLSA3NCwgNTA2KTsNCg0KICAgIGNvbnN0IHByZW1pdW1LZXlzID0gT2JqZWN0LmtleXModG93ZXJEZWZzKS5maWx0ZXIoKGspID0+IHRvd2VyRGVmc1trXS51bmxvY2tDb2lucyk7DQogICAgY29uc3QgcHJlbWl1bVkgPSA1NjAsIHByZW1pdW1DYXJkVyA9IDE1MCwgcHJlbWl1bUdhcCA9IDEyOw0KICAgIGNvbnN0IHByZW1pdW1Ub3RhbFcgPSBwcmVtaXVtS2V5cy5sZW5ndGggKiBwcmVtaXVtQ2FyZFcgKyBNYXRoLm1heCgwLCBwcmVtaXVtS2V5cy5sZW5ndGggLSAxKSAqIHByZW1pdW1HYXA7DQogICAgY29uc3QgcHJlbWl1bVN0YXJ0WCA9IHBsYXlDZW50ZXJYIC0gcHJlbWl1bVRvdGFsVyAvIDI7DQogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsgY3R4LmZvbnQgPSAnNzAwIDE4cHggc2Fucy1zZXJpZic7DQogICAgY29uc3QgcHJlbWl1bVRpdGxlID0gJ1ByZW1pdW0gVG93ZXIgVW5sb2NrcyAoSG9tZSBPbmx5KSc7DQogICAgY3R4LmZpbGxUZXh0KHByZW1pdW1UaXRsZSwgcGxheUNlbnRlclggLSBjdHgubWVhc3VyZVRleHQocHJlbWl1bVRpdGxlKS53aWR0aCAvIDIsIHByZW1pdW1ZIC0gMTIpOw0KDQogICAgcHJlbWl1bUtleXMuZm9yRWFjaCgoaywgaSkgPT4gew0KICAgICAgY29uc3QgZCA9IHRvd2VyRGVmc1trXTsNCiAgICAgIGNvbnN0IHggPSBwcmVtaXVtU3RhcnRYICsgaSAqIChwcmVtaXVtQ2FyZFcgKyBwcmVtaXVtR2FwKTsNCiAgICAgIGNvbnN0IHVubG9ja2VkID0gcHJvZmlsZS51bmxvY2tlZFNwZWNpYWxUb3dlcnNba107DQogICAgICBjdHguZmlsbFN0eWxlID0gdW5sb2NrZWQgPyAnIzJlN2QzMicgOiAnIzM3NDc0Zic7DQogICAgICBjdHguZmlsbFJlY3QoeCwgcHJlbWl1bVksIHByZW1pdW1DYXJkVywgODQpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9IHVubG9ja2VkID8gJyNjOGU2YzknIDogJyNmZmYnOw0KICAgICAgY3R4LmZvbnQgPSAnNzAwIDE1cHggc2Fucy1zZXJpZic7DQogICAgICBjdHguZmlsbFRleHQoYCR7ZC5pY29ufSAke2QubmFtZX1gLCB4ICsgMTAsIHByZW1pdW1ZICsgMjUpOw0KICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJzsNCiAgICAgIGN0eC5maWxsVGV4dCh1bmxvY2tlZCA/ICdVbmxvY2tlZCcgOiBgJHtkLnVubG9ja0NvaW5zfSBjb2luc2AsIHggKyAxMCwgcHJlbWl1bVkgKyA0Nik7DQogICAgICBjdHguZmlsbFRleHQodW5sb2NrZWQgPyAnUmVhZHkgaW4gU0hPUCcgOiAnQ2xpY2sgdG8gdW5sb2NrJywgeCArIDEwLCBwcmVtaXVtWSArIDY2KTsNCiAgICB9KTsNCg0KICAgIGNvbnN0IGFkbWluVyA9IDE0ODsNCiAgICBjb25zdCBhZG1pblggPSBwbGF5Q2VudGVyWCAtIGFkbWluVyAvIDI7DQogICAgY3R4LmZpbGxTdHlsZSA9IGFkbWluVW5sb2NrZWQgPyAnI2ZmZDE2NicgOiAnIzNhM2EzYSc7DQogICAgY3R4LmZpbGxSZWN0KGFkbWluWCwgMjAsIGFkbWluVywgMzIpOw0KICAgIGN0eC5maWxsU3R5bGUgPSBhZG1pblVubG9ja2VkID8gJyMxMTEnIDogJyNiYmInOw0KICAgIGN0eC5mb250ID0gJzcwMCAxM3B4IHNhbnMtc2VyaWYnOw0KICAgIGNvbnN0IGFkbWluTGFiZWwgPSBhZG1pblVubG9ja2VkID8gJ+KamSBBZG1pbiBQYW5lbCcgOiAn8J+UkiBBZG1pbiBMb2dpbic7DQogICAgY3R4LmZpbGxUZXh0KGFkbWluTGFiZWwsIHBsYXlDZW50ZXJYIC0gY3R4Lm1lYXN1cmVUZXh0KGFkbWluTGFiZWwpLndpZHRoIC8gMiwgNDEpOw0KICB9DQoNCiAgZnVuY3Rpb24gdXBkYXRlKCkgew0KICAgIGlmIChnYW1lT3ZlciB8fCBydW5Xb24pIHJldHVybjsNCg0KICAgIGlmICh3YXZlSW5Qcm9ncmVzcyAmJiB3YXZlUXVldWUubGVuZ3RoID4gMCAmJiBzcGF3blRpbWVyIDw9IDApIHsNCiAgICAgIGNvbnN0IG5leHQgPSB3YXZlUXVldWUuc2hpZnQoKTsNCiAgICAgIGJsb29ucy5wdXNoKGNyZWF0ZUJsb29uKG5leHQudHlwZSwgbmV4dC5sYW5lKSk7DQogICAgICBzcGF3blRpbWVyID0gbmV4dC5kZWxheTsNCiAgICB9DQogICAgc3Bhd25UaW1lciAtPSAxOw0KDQogICAgLy8gYWdlbnRzL2Nhc2ggY3JhdGVzIHJlbW92ZWQNCg0KICAgIGNvbnN0IHBhdGhzID0gZ2V0TWFwUGF0aHMoKTsNCg0KICAgIGZvciAobGV0IGkgPSBibG9vbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHsNCiAgICAgIGNvbnN0IGIgPSBibG9vbnNbaV07DQogICAgICBjb25zdCBwYXRoID0gcGF0aHNbYi5sYW5lXTsNCiAgICAgIGNvbnN0IG5leHQgPSBwYXRoW2IucGF0aElkeCArIDFdOw0KICAgICAgaWYgKCFuZXh0KSBjb250aW51ZTsNCg0KICAgICAgaWYgKGIuaHAgPD0gMCkgeyBibG9vbnMuc3BsaWNlKGksIDEpOyBjb250aW51ZTsgfQ0KDQogICAgICBjb25zdCBkeCA9IG5leHQueCAtIGIueCwgZHkgPSBuZXh0LnkgLSBiLnk7DQogICAgICBjb25zdCBkaXN0ID0gTWF0aC5oeXBvdChkeCwgZHkpIHx8IDE7DQogICAgICBiLnN0dW5UaWNrcyA9IE1hdGgubWF4KDAsIChiLnN0dW5UaWNrcyB8fCAwKSAtIDEpOw0KICAgICAgYi5hcm1vckJyb2tlbiA9IE1hdGgubWF4KDAsIChiLmFybW9yQnJva2VuIHx8IDApIC0gMSk7DQogICAgICBpZiAoKGIuYnVyblRpY2tzIHx8IDApID4gMCkgew0KICAgICAgICBiLmJ1cm5UaWNrcyAtPSAxOw0KICAgICAgICBpZiAoYi5idXJuVGlja3MgJSAyMCA9PT0gMCkgYi5ocCAtPSBiLmJ1cm5EYW1hZ2UgfHwgMTsNCiAgICAgIH0NCiAgICAgIGlmICgoYi5zdHVuVGlja3MgfHwgMCkgPiAwKSBjb250aW51ZTsNCiAgICAgIGNvbnN0IHNwZWVkTXVsID0gYi5zbG93VGlja3MgPiAwID8gMC40NSA6IDE7DQogICAgICBjb25zdCBnbHVlTXVsID0gYi5nbHVlVGlja3NBY3RpdmUgPiAwID8gYi5nbHVlZEZhY3RvciA6IDE7DQogICAgICBjb25zdCBjdXJTcGVlZCA9IGIuYmFzZVNwZWVkICogc3BlZWRNdWwgKiBnbHVlTXVsOw0KDQogICAgICBiLnggKz0gKGR4IC8gZGlzdCkgKiBjdXJTcGVlZDsNCiAgICAgIGIueSArPSAoZHkgLyBkaXN0KSAqIGN1clNwZWVkOw0KICAgICAgYi5zbG93VGlja3MgPSBNYXRoLm1heCgwLCBiLnNsb3dUaWNrcyAtIDEpOw0KICAgICAgYi5nbHVlVGlja3NBY3RpdmUgPSBNYXRoLm1heCgwLCBiLmdsdWVUaWNrc0FjdGl2ZSAtIDEpOw0KICAgICAgaWYgKGIuZ2x1ZVRpY2tzQWN0aXZlID09PSAwKSBiLmdsdWVkRmFjdG9yID0gMTsNCiAgICAgIGlmIChkaXN0IDwgNikgYi5wYXRoSWR4ICs9IDE7DQoNCiAgICAgIGlmIChiLnBhdGhJZHggPj0gcGF0aC5sZW5ndGggLSAxKSB7DQogICAgICAgIHN0YXRlLmxpdmVzIC09IGIuZGFtYWdlOw0KICAgICAgICBibG9vbnMuc3BsaWNlKGksIDEpOw0KICAgICAgfQ0KICAgIH0NCg0KICAgIHVwZGF0ZUFnZW50cygpOw0KDQogICAgdG93ZXJzLmZvckVhY2goKHQpID0+IHsNCiAgICAgIGlmICh0LnR5cGUgPT09ICd2aWxsYWdlJyB8fCB0LnR5cGUgPT09ICdzdXBwb3J0JykgcmV0dXJuOw0KICAgICAgaWYgKHQudHlwZSA9PT0gJ2Zhcm0nKSB7DQogICAgICAgIHQuZmFybVRpY2sgPSAodC5mYXJtVGljayB8fCAwKSArIDE7DQogICAgICAgIGNvbnN0IHJhdGUgPSB0LmZhcm1SYXRlIHx8IDI0MDsNCiAgICAgICAgaWYgKHQuZmFybVRpY2sgPj0gcmF0ZSkgew0KICAgICAgICAgIHQuZmFybVRpY2sgPSAwOw0KICAgICAgICAgIHN0YXRlLm1vbmV5ICs9IHQuZmFybUluY29tZSB8fCA0NTsNCiAgICAgICAgfQ0KICAgICAgICByZXR1cm47DQogICAgICB9DQogICAgICBjb25zdCBtZXRhUmF0ZU11bHRpcGxpZXIgPSAxIC0gcHJvZ3Jlc3Npb24uYXR0YWNrU3BlZWRMZXZlbCAqIDAuMDY7DQogICAgICBjb25zdCB2aWxsYWdlU3BlZWQgPSAxIC0gKHQudmlsbGFnZUJ1ZmY/LnNwZWVkIHx8IDApOw0KICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IodC5maXJlUmF0ZSAqIG1ldGFSYXRlTXVsdGlwbGllciAqIHZpbGxhZ2VTcGVlZCkpOw0KDQogICAgICBpZiAodC50eXBlID09PSAnaWNlJykgew0KICAgICAgICBpZiAodC5jb29sZG93bi0tIDw9IDApIHsNCiAgICAgICAgICBjb25zdCByciA9IHQucmFuZ2UgKyAodC52aWxsYWdlQnVmZj8ucmFuZ2UgfHwgMCk7DQogICAgICAgICAgYmxvb25zLmZvckVhY2goKGIpID0+IHsNCiAgICAgICAgICAgIGlmIChNYXRoLmh5cG90KGIueCAtIHQueCwgYi55IC0gdC55KSA8PSByciAmJiAhYi5pbW11bml0aWVzLmluY2x1ZGVzKCdpY2UnKSkgew0KICAgICAgICAgICAgICBiLnNsb3dUaWNrcyA9IE1hdGgubWF4KGIuc2xvd1RpY2tzLCB0LmZyZWV6ZUR1cmF0aW9uKTsNCiAgICAgICAgICAgICAgaWYgKHQuZGFtYWdlID4gMCkgYi5ocCAtPSB0LmRhbWFnZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICB9KTsNCiAgICAgICAgICB0LmNvb2xkb3duID0gZWZmZWN0aXZlUmF0ZTsNCiAgICAgICAgfQ0KICAgICAgICByZXR1cm47DQogICAgICB9DQoNCiAgICAgIGlmICh0LmNvb2xkb3duLS0gPiAwKSByZXR1cm47DQogICAgICBjb25zdCB0YXJnZXQgPSBwaWNrVGFyZ2V0KHQpOw0KICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjsNCg0KICAgICAgY29uc3QgYSA9IE1hdGguYXRhbjIodGFyZ2V0LnkgLSB0LnksIHRhcmdldC54IC0gdC54KTsNCiAgICAgIGNvbnN0IGFkZFByb2plY3RpbGUgPSAoYW5nbGUpID0+IHsNCiAgICAgICAgY29uc3QgbWF4VHJhdmVsID0gdC50eXBlID09PSAndGFjaycgPyBNYXRoLm1heCg5MCwgdC5yYW5nZSAqIDAuOTUpIDogTWF0aC5tYXgoMjIwLCB0LnJhbmdlICogMS40KTsNCiAgICAgICAgY29uc3QgZmFzdFByb2plY3RpbGVTcGVlZCA9IE1hdGgubWF4KDI0LCB0LnByb2plY3RpbGVTcGVlZCAqIDMuNSk7DQogICAgICAgIHByb2plY3RpbGVzLnB1c2goew0KICAgICAgICAgIHg6IHQueCwgeTogdC55LA0KICAgICAgICAgIHZ4OiBNYXRoLmNvcyhhbmdsZSkgKiBmYXN0UHJvamVjdGlsZVNwZWVkLCB2eTogTWF0aC5zaW4oYW5nbGUpICogZmFzdFByb2plY3RpbGVTcGVlZCwNCiAgICAgICAgICB0eXBlOiB0LnR5cGUsIHBpZXJjZTogdC5waWVyY2UgKyAodC52aWxsYWdlQnVmZj8ucGllcmNlIHx8IDApLCBkYW1hZ2U6IHQuZGFtYWdlICsgKHQudmlsbGFnZUJ1ZmY/LmRhbWFnZSB8fCAwKSwNCiAgICAgICAgICBzcGxhc2g6IHQuc3BsYXNoLCBnbHVlU2xvdzogdC5nbHVlU2xvdywgZ2x1ZVRpY2tzOiB0LmdsdWVUaWNrcywNCiAgICAgICAgICBmcmVlemVEdXJhdGlvbjogdC5mcmVlemVEdXJhdGlvbiwNCiAgICAgICAgICBzdHVuVGlja3M6IHQuc3R1blRpY2tzIHx8IDAsIGJ1cm5UaWNrczogdC5idXJuVGlja3MgfHwgMCwgYnVybkRhbWFnZTogdC5idXJuRGFtYWdlIHx8IDAsDQogICAgICAgICAgY2FuSGl0Q2FtbzogISEodC5jYW5IaXRDYW1vIHx8IHQudmlsbGFnZUJ1ZmY/LmNhbW8pLCBjYW5IaXRMZWFkOiAhISh0LmNhbkhpdExlYWQgfHwgdC52aWxsYWdlQnVmZj8ubGVhZCksDQogICAgICAgICAgYXJtb3JCcmVhazogKHQuYXJtb3JCcmVhayB8fCAwKSArICh0LnZpbGxhZ2VCdWZmPy5hcm1vckJyZWFrIHx8IDApLA0KICAgICAgICAgIHRyYXZlbDogMCwgbWF4VHJhdmVsLCBoaXQ6IG5ldyBTZXQoKSwNCiAgICAgICAgfSk7DQogICAgICB9Ow0KDQogICAgICBpZiAodC50eXBlID09PSAndGFjaycpIHsNCiAgICAgICAgY29uc3QgYnVyc3QgPSB0LmJ1cnN0ID8/IDY7DQogICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVyc3Q7IGkrKykgYWRkUHJvamVjdGlsZSgoTWF0aC5QSSAqIDIgKiBpKSAvIGJ1cnN0KTsNCiAgICAgIH0gZWxzZSB7DQogICAgICAgIGNvbnN0IHNob3RzID0gTWF0aC5tYXgoMSwgdC5tdWx0aVNob3QgfHwgMSk7DQogICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgc2hvdHM7IHMrKykgew0KICAgICAgICAgIGNvbnN0IHNwcmVhZCA9IHNob3RzID4gMSA/IChzIC0gKHNob3RzIC0gMSkgLyAyKSAqIDAuMTIgOiAwOw0KICAgICAgICAgIGFkZFByb2plY3RpbGUoYSArIHNwcmVhZCk7DQogICAgICAgIH0NCiAgICAgIH0NCiAgICAgIHQuY29vbGRvd24gPSBlZmZlY3RpdmVSYXRlOw0KICAgIH0pOw0KDQogICAgZm9yIChsZXQgaSA9IHByb2plY3RpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7DQogICAgICBjb25zdCBwID0gcHJvamVjdGlsZXNbaV07DQogICAgICBjb25zdCBzdGVwID0gTWF0aC5oeXBvdChwLnZ4LCBwLnZ5KTsNCiAgICAgIHAudHJhdmVsICs9IHN0ZXA7DQogICAgICBwLnggKz0gcC52eDsgcC55ICs9IHAudnk7DQoNCiAgICAgIGlmIChwLnRyYXZlbCA+IHAubWF4VHJhdmVsIHx8IHAueCA8IDAgfHwgcC54ID4gd2lkdGggLSBTSURFX1BBTkVMIHx8IHAueSA8IDAgfHwgcC55ID4gaGVpZ2h0KSB7DQogICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTsgY29udGludWU7DQogICAgICB9DQoNCiAgICAgIGZvciAobGV0IGogPSBibG9vbnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHsNCiAgICAgICAgY29uc3QgYiA9IGJsb29uc1tqXTsNCiAgICAgICAgaWYgKHAuaGl0LmhhcyhqKSB8fCBNYXRoLmh5cG90KGIueCAtIHAueCwgYi55IC0gcC55KSA+IGIucmFkaXVzICsgNSkgY29udGludWU7DQogICAgICAgIHAuaGl0LmFkZChqKTsNCg0KICAgICAgICBpZiAocC50eXBlID09PSAnYm9tYicpIHsNCiAgICAgICAgICBibG9vbnMuZm9yRWFjaCgoYmIpID0+IHsgaWYgKE1hdGguaHlwb3QoYmIueCAtIHAueCwgYmIueSAtIHAueSkgPD0gcC5zcGxhc2gpIGhpdEJsb29uKGJiLCBwKTsgfSk7DQogICAgICAgICAgcC5waWVyY2UgPSAwOw0KICAgICAgICB9IGVsc2Ugew0KICAgICAgICAgIGhpdEJsb29uKGIsIHApOw0KICAgICAgICAgIHAucGllcmNlIC09IDE7DQogICAgICAgIH0NCg0KICAgICAgICBpZiAocC5waWVyY2UgPD0gMCkgeyBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7IGJyZWFrOyB9DQogICAgICB9DQogICAgfQ0KDQogICAgZm9yIChsZXQgaSA9IGJsb29ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGJsb29uc1tpXS5ocCA8PSAwKSBibG9vbnMuc3BsaWNlKGksIDEpOw0KDQogICAgaWYgKHdhdmVJblByb2dyZXNzICYmIHdhdmVRdWV1ZS5sZW5ndGggPT09IDAgJiYgYmxvb25zLmxlbmd0aCA9PT0gMCkgew0KICAgICAgd2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTsNCiAgICAgIHN0YXRlLndhdmUgKz0gMTsNCiAgICAgIHN0YXRlLm1vbmV5ICs9IDExMCArIHN0YXRlLndhdmUgKiAxMTsNCiAgICAgIGdhaW5YcCgxOCArIHN0YXRlLndhdmUgKiAyKTsNCg0KICAgICAgY29uc3QgbW1HYWluID0gTWF0aC5mbG9vcigoOCArIHN0YXRlLndhdmUgKiAwLjgpICogZGlmZmljdWx0eURlZnNbc3RhdGUuZGlmZmljdWx0eV0uY29pbk11bHQpOw0KICAgICAgcHJvZmlsZS5tb25rZXlNb25leSArPSBtbUdhaW47DQogICAgICBwcm9maWxlLmNvaW5zICs9IE1hdGguZmxvb3IobW1HYWluICogMC40NSk7DQogICAgICBzYXZlUHJvZmlsZSgpOw0KDQogICAgICBpZiAoc3RhdGUud2F2ZSA+IE1BWF9XQVZFUykgew0KICAgICAgICBydW5Xb24gPSB0cnVlOw0KICAgICAgICBjb25zdCBkaWZmID0gZGlmZmljdWx0eURlZnNbc3RhdGUuZGlmZmljdWx0eV07DQogICAgICAgIGNvbnN0IGVhcm5lZENvaW5zID0gTWF0aC5mbG9vcigoODAgKyBNQVhfV0FWRVMgKiA2ICsgTWF0aC5tYXgoMCwgc3RhdGUubGl2ZXMpKSAqIGRpZmYuY29pbk11bHQpOw0KICAgICAgICBwcm9maWxlLmNvaW5zICs9IGVhcm5lZENvaW5zOw0KICAgICAgICBwcm9maWxlLm1vbmtleU1vbmV5ICs9IE1hdGguZmxvb3IoZWFybmVkQ29pbnMgKiAwLjYpOw0KICAgICAgICBzYXZlUHJvZmlsZSgpOw0KICAgICAgfQ0KDQogICAgICBpZiAoYXV0b05leHRXYXZlICYmICFnYW1lT3Zlcikgc3RhcnRXYXZlKCk7DQogICAgfQ0KDQogICAgaWYgKHN0YXRlLmxpdmVzIDw9IDApIHsNCiAgICAgIHN0YXRlLmxpdmVzID0gMDsNCiAgICAgIGdhbWVPdmVyID0gdHJ1ZTsNCiAgICB9DQogIH0NCg0KICBmdW5jdGlvbiBkcmF3TWFwKCkgew0KICAgIGNvbnN0IG1hcCA9IGdldEN1cnJlbnRNYXAoKTsNCiAgICBjdHguZmlsbFN0eWxlID0gbWFwLmNvbG9yOw0KICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTsNCg0KICAgIGNvbnN0IG1hcFdpZHRoID0gd2lkdGggLSBTSURFX1BBTkVMOw0KICAgIChtYXAud2F0ZXIgfHwgW10pLmZvckVhY2goKGFyZWEpID0+IHsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzNhYTZkNyc7DQogICAgICBpZiAoYXJlYS5zaGFwZSA9PT0gJ2VsbGlwc2UnKSB7DQogICAgICAgIGN0eC5iZWdpblBhdGgoKTsNCiAgICAgICAgY3R4LmVsbGlwc2UoYXJlYS54ICogbWFwV2lkdGgsIGFyZWEueSAqIGhlaWdodCwgYXJlYS5yeCAqIG1hcFdpZHRoLCBhcmVhLnJ5ICogaGVpZ2h0LCBhcmVhLnJvdCB8fCAwLCAwLCBNYXRoLlBJICogMik7DQogICAgICAgIGN0eC5maWxsKCk7DQogICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjOGRkNmYwJzsNCiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7DQogICAgICAgIGN0eC5zdHJva2UoKTsNCiAgICAgIH0gZWxzZSBpZiAoYXJlYS5zaGFwZSA9PT0gJ3JlY3QnKSB7DQogICAgICAgIGNvbnN0IHJ4ID0gYXJlYS54ICogbWFwV2lkdGg7DQogICAgICAgIGNvbnN0IHJ5ID0gYXJlYS55ICogaGVpZ2h0Ow0KICAgICAgICBjb25zdCBydyA9IGFyZWEudyAqIG1hcFdpZHRoOw0KICAgICAgICBjb25zdCByaCA9IGFyZWEuaCAqIGhlaWdodDsNCiAgICAgICAgY3R4LmZpbGxSZWN0KHJ4LCByeSwgcncsIHJoKTsNCiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM4ZGQ2ZjAnOw0KICAgICAgICBjdHgubGluZVdpZHRoID0gMjsNCiAgICAgICAgY3R4LnN0cm9rZVJlY3QocngsIHJ5LCBydywgcmgpOw0KICAgICAgfQ0KICAgIH0pOw0KDQogICAgY29uc3Qgc2NlbmVyeSA9IHNjZW5lcnlCeU1hcFtzdGF0ZS5zZWxlY3RlZE1hcF0gfHwgW107DQogICAgc2NlbmVyeS5mb3JFYWNoKChzKSA9PiB7DQogICAgICBpZiAocy50eXBlID09PSAndHJlZScpIHsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNWQ0MDM3JzsgY3R4LmZpbGxSZWN0KHMucHggLSA1LCBzLnB5IC0gNiwgMTAsIDE4KTsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMmU3ZDMyJzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKHMucHgsIHMucHkgLSAxMCwgMTYsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsNCiAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSAncm9jaycpIHsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNzU3NTc1JzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguZWxsaXBzZShzLnB4LCBzLnB5LCAxNSwgMTAsIDAsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTsNCiAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSAncG9uZCcpIHsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNGZjM2Y3JzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguZWxsaXBzZShzLnB4LCBzLnB5LCAyNiwgMTYsIDAuMiwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdidXNoJykgew0KICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMzODhlM2MnOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMocy5weCAtIDgsIHMucHksIDEwLCAwLCBNYXRoLlBJICogMik7IGN0eC5hcmMocy5weCArIDIsIHMucHkgLSA1LCAxMSwgMCwgTWF0aC5QSSAqIDIpOyBjdHguYXJjKHMucHggKyAxMiwgcy5weSwgOSwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdmbG93ZXJzJykgew0KICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmNDhmYjEnOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMocy5weCAtIDYsIHMucHksIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmFyYyhzLnB4ICsgNiwgcy5weSArIDIsIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmFyYyhzLnB4LCBzLnB5IC0gNCwgNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmViM2InOyBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMocy5weCwgcy5weSwgMywgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdzdHVtcCcpIHsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNmQ0YzQxJzsgY3R4LmJlZ2luUGF0aCgpOyBjdHguZWxsaXBzZShzLnB4LCBzLnB5LCAxMCwgNywgMCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgfSBlbHNlIGlmIChzLnR5cGUgPT09ICdjcmF0ZScpIHsNCiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjYTE4ODdmJzsgY3R4LmZpbGxSZWN0KHMucHggLSA5LCBzLnB5IC0gOSwgMTgsIDE4KTsNCiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM2ZDRjNDEnOyBjdHgubGluZVdpZHRoID0gMjsgY3R4LnN0cm9rZVJlY3Qocy5weCAtIDksIHMucHkgLSA5LCAxOCwgMTgpOw0KICAgICAgfQ0KICAgIH0pOw0KDQogICAgY29uc3QgcGF0aHMgPSBnZXRNYXBQYXRocygpOw0KICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHsNCiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjOGQ2ZTYzJzsgY3R4LmxpbmVXaWR0aCA9IDY2OyBjdHgubGluZUNhcCA9ICdyb3VuZCc7IGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7DQogICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8ocGF0aFswXS54LCBwYXRoWzBdLnkpOyBwYXRoLmZvckVhY2goKHApID0+IGN0eC5saW5lVG8ocC54LCBwLnkpKTsgY3R4LnN0cm9rZSgpOw0KICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM1ZDQwMzcnOyBjdHgubGluZVdpZHRoID0gNTsgY3R4LnN0cm9rZSgpOw0KICAgIH0pOw0KICB9DQoNCiAgZnVuY3Rpb24gZHJhd0VudGl0aWVzKCkgew0KICAgIGJsb29ucy5mb3JFYWNoKChiKSA9PiB7DQogICAgICBjdHguZmlsbFN0eWxlID0gYi5jb2xvcjsgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKGIueCwgYi55LCBiLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgaWYgKGIuc3RyaXBlKSB7IGN0eC5zdHJva2VTdHlsZSA9IGIuc3RyaXBlOyBjdHgubGluZVdpZHRoID0gMzsgY3R4LnN0cm9rZSgpOyB9DQogICAgICBjb25zdCBocCA9IE1hdGgubWF4KDAsIGIuaHAgLyBiLm1heEhwKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDgnOyBjdHguZmlsbFJlY3QoYi54IC0gMTYsIGIueSAtIGIucmFkaXVzIC0gMTAsIDMyLCA1KTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2VmNTM1MCc7IGN0eC5maWxsUmVjdChiLnggLSAxNiwgYi55IC0gYi5yYWRpdXMgLSAxMCwgMzIgKiBocCwgNSk7DQogICAgfSk7DQoNCiAgICB0b3dlcnMuZm9yRWFjaCgodCkgPT4gew0KICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLnNlbGVjdGVkVG93ZXIgPT09IHQgPyAnI2ZmZmRlNycgOiB0LmNvbG9yOw0KICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKHQueCwgdC55LCAyNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJzsgY3R4LmZvbnQgPSAnNzAwIDE2cHggc2Fucy1zZXJpZic7IGN0eC5maWxsVGV4dCh0Lmljb24gPz8gJz8nLCB0LnggLSA2LCB0LnkgKyA1KTsNCg0KICAgICAgaWYgKHQucHJvKSB7IGN0eC5zdHJva2VTdHlsZSA9ICcjZmZkMTY2JzsgY3R4LmxpbmVXaWR0aCA9IDI7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyh0LngsIHQueSwgMjgsIDAsIE1hdGguUEkgKiAyKTsgY3R4LnN0cm9rZSgpOyB9DQogICAgICBpZiAodC5wcm9NYXN0ZXJ5KSB7IGN0eC5zdHJva2VTdHlsZSA9ICcjZmY4ZmFiJzsgY3R4LmxpbmVXaWR0aCA9IDI7IGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyh0LngsIHQueSwgMzIsIDAsIE1hdGguUEkgKiAyKTsgY3R4LnN0cm9rZSgpOyB9DQoNCiAgICAgIGlmIChzdGF0ZS5zZWxlY3RlZFRvd2VyID09PSB0KSB7DQogICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmZmNjYnOyBjdHgubGluZVdpZHRoID0gMjsNCiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKHQueCwgdC55LCB0LnJhbmdlICsgKHQudmlsbGFnZUJ1ZmY/LnJhbmdlIHx8IDApLCAwLCBNYXRoLlBJICogMik7IGN0eC5zdHJva2UoKTsNCiAgICAgIH0NCiAgICB9KTsNCg0KICAgIHByb2plY3RpbGVzLmZvckVhY2goKHApID0+IHsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSBwLnR5cGUgPT09ICdib21iJyA/ICcjMTExJyA6IHAudHlwZSA9PT0gJ25pbmphJyA/ICcjN2U1N2MyJyA6IHAudHlwZSA9PT0gJ2dsdWUnID8gJyM4YmMzNGEnIDogcC50eXBlID09PSAnYm9vbWVyYW5nJyA/ICcjZmY5ODAwJyA6ICcjZmZlYjNiJzsNCiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhwLngsIHAueSwgcC50eXBlID09PSAnYm9tYicgPyA3IDogNSwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgIH0pOw0KDQogICAgaWYgKHN0YXRlLmhvdmVyLnggPCB3aWR0aCAtIFNJREVfUEFORUwpIHsNCiAgICAgIGNvbnN0IGRlZiA9IHRvd2VyRGVmc1tzdGF0ZS5zZWxlY3RlZFRvd2VyVHlwZV07DQogICAgICBjb25zdCB1bmxvY2tlZCA9IGlzVG93ZXJVbmxvY2tlZChzdGF0ZS5zZWxlY3RlZFRvd2VyVHlwZSk7DQogICAgICBjb25zdCB0b3dlclRvb0Nsb3NlID0gdG93ZXJzLnNvbWUoKHQpID0+IE1hdGguaHlwb3QodC54IC0gc3RhdGUuaG92ZXIueCwgdC55IC0gc3RhdGUuaG92ZXIueSkgPCA0NCk7DQogICAgICBjb25zdCBpc1dhdGVyVG93ZXIgPSBpc1dhdGVyVG93ZXJUeXBlKHN0YXRlLnNlbGVjdGVkVG93ZXJUeXBlKTsNCiAgICAgIGNvbnN0IGlzSW5XYXRlciA9IGlzUG9pbnRJbldhdGVyKHN0YXRlLmhvdmVyLngsIHN0YXRlLmhvdmVyLnkpOw0KICAgICAgY29uc3QgYmFkVGVycmFpbiA9IGlzV2F0ZXJUb3dlciA/ICFpc0luV2F0ZXIgOiBpc0luV2F0ZXI7DQogICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjQ1Ow0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICF1bmxvY2tlZCB8fCBpc1BvaW50T25BbnlQYXRoKHN0YXRlLmhvdmVyLngsIHN0YXRlLmhvdmVyLnkpIHx8IHRvd2VyVG9vQ2xvc2UgfHwgYmFkVGVycmFpbiA/ICcjZWY1MzUwJyA6IGRlZi5jb2xvcjsNCiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhzdGF0ZS5ob3Zlci54LCBzdGF0ZS5ob3Zlci55LCAyNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpOw0KICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTsNCiAgICB9DQogIH0NCg0KICBmdW5jdGlvbiBkcmF3VWkoKSB7DQogICAgY29uc3QgcGFuZWxYID0gd2lkdGggLSBTSURFX1BBTkVMOw0KICAgIGNvbnN0IG1hcCA9IGdldEN1cnJlbnRNYXAoKTsNCg0KICAgIGNvbnN0IHBhbmVsR3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChwYW5lbFgsIDAsIHBhbmVsWCwgaGVpZ2h0KTsNCiAgICBwYW5lbEdyYWQuYWRkQ29sb3JTdG9wKDAsICcjMWEyYTQ0Jyk7DQogICAgcGFuZWxHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzExMWQzMycpOw0KICAgIGN0eC5maWxsU3R5bGUgPSBwYW5lbEdyYWQ7DQogICAgY3R4LmZpbGxSZWN0KHBhbmVsWCwgMCwgU0lERV9QQU5FTCwgaGVpZ2h0KTsNCiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzY1ZDZmZjU1JzsNCiAgICBjdHgubGluZVdpZHRoID0gMjsNCiAgICBjdHguc3Ryb2tlUmVjdChwYW5lbFggKyAyLCAyLCBTSURFX1BBTkVMIC0gNCwgaGVpZ2h0IC0gNCk7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyNlOGY3ZmYnOyBjdHguZm9udCA9ICc3MDAgMjJweCBzYW5zLXNlcmlmJzsgY3R4LmZpbGxUZXh0KCdTSE9QJywgcGFuZWxYICsgMTYsIDMwKTsNCiAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnOyBjdHguZmlsbFRleHQoYE1hcDogJHttYXAubmFtZX0gfCAke2RpZmZpY3VsdHlEZWZzW3N0YXRlLmRpZmZpY3VsdHldLm5hbWV9YCwgcGFuZWxYICsgMTYsIDQ4KTsNCg0KICAgIGN0eC5maWxsU3R5bGUgPSAnIzJhOWQ4Zic7IGN0eC5maWxsUmVjdChwYW5lbFggKyAxNiwgNTYsIFNJREVfUEFORUwgLSAzMiwgMzQpOw0KICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5mb250ID0gJzYwMCAxM3B4IHNhbnMtc2VyaWYnOyBjdHguZmlsbFRleHQoJ0hvbWUgU2NyZWVuJywgcGFuZWxYICsgMTEyLCA3OCk7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gYXV0b05leHRXYXZlID8gJyM0M2EwNDcnIDogJyM2Yzc1N2QnOw0KICAgIGN0eC5maWxsUmVjdChwYW5lbFggKyAxNiwgOTYsIFNJREVfUEFORUwgLSAzMiwgMzApOw0KICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5maWxsVGV4dChgQXV0byBOZXh0OiAke2F1dG9OZXh0V2F2ZSA/ICdPTicgOiAnT0ZGJ31gLCBwYW5lbFggKyAxMDgsIDExNik7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZm9udCA9ICc2MDAgMTJweCBzYW5zLXNlcmlmJzsgY3R4LmZpbGxUZXh0KGBTcGVlZDogJHtnYW1lU3BlZWR9eGAsIHBhbmVsWCArIDE2LCAxNDIpOw0KICAgIFsyLCA1LCAxMF0uZm9yRWFjaCgocywgaWR4KSA9PiB7DQogICAgICBjb25zdCBieCA9IHBhbmVsWCArIDE2ICsgaWR4ICogOTYsIGJ5ID0gMTQ4Ow0KICAgICAgY3R4LmZpbGxTdHlsZSA9IGdhbWVTcGVlZCA9PT0gcyA/ICcjZmZkMTY2JyA6ICcjM2E1MDZiJzsgY3R4LmZpbGxSZWN0KGJ4LCBieSwgODgsIDIyKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSBnYW1lU3BlZWQgPT09IHMgPyAnIzExMScgOiAnI2ZmZic7IGN0eC5maWxsVGV4dChgJHtzfXhgLCBieCArIDM4LCBieSArIDE1KTsNCiAgICB9KTsNCg0KICAgIGN0eC5maWxsU3R5bGUgPSBhZG1pblVubG9ja2VkID8gJyM3YzVjMDAnIDogJyMyZDJkMmQnOw0KICAgIGN0eC5maWxsUmVjdChwYW5lbFggKyAxNiwgMTc0LCBTSURFX1BBTkVMIC0gMzIsIDI0KTsNCiAgICBjdHguZmlsbFN0eWxlID0gYWRtaW5VbmxvY2tlZCA/ICcjZmZkMTY2JyA6ICcjOTk5JzsNCiAgICBjdHguZm9udCA9ICc3MDAgMTJweCBzYW5zLXNlcmlmJzsNCiAgICBjdHguZmlsbFRleHQoYWRtaW5VbmxvY2tlZCA/ICfimpkgQWRtaW4gUGFuZWwnIDogJ/CflJIgQWRtaW4gTG9naW4nLCBwYW5lbFggKyAxMTAsIDE5MCk7DQoNCiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModG93ZXJEZWZzKTsNCiAgICBjb25zdCB0b3dlckxpc3RUb3AgPSAyMDQsIHRvd2VyUm93ID0gNjIsIHZpc2libGVSb3dzID0gNDsNCiAgICBjb25zdCBtYXhTY3JvbGwgPSBNYXRoLm1heCgwLCBrZXlzLmxlbmd0aCAtIHZpc2libGVSb3dzKTsNCiAgICBzaG9wU2Nyb2xsID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2hvcFNjcm9sbCwgbWF4U2Nyb2xsKSk7DQogICAgY29uc3QgdmlzaWJsZUtleXMgPSBrZXlzLnNsaWNlKHNob3BTY3JvbGwsIHNob3BTY3JvbGwgKyB2aXNpYmxlUm93cyk7DQoNCiAgICB2aXNpYmxlS2V5cy5mb3JFYWNoKChrLCBpZHgpID0+IHsNCiAgICAgIGNvbnN0IGQgPSB0b3dlckRlZnNba10sIHkgPSB0b3dlckxpc3RUb3AgKyBpZHggKiB0b3dlclJvdzsNCiAgICAgIGNvbnN0IHVubG9ja2VkID0gaXNUb3dlclVubG9ja2VkKGspOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLnNlbGVjdGVkVG93ZXJUeXBlID09PSBrID8gJyMzYjgyZjYnIDogJyMyNjNhNTknOw0KICAgICAgY3R4LmZpbGxSZWN0KHBhbmVsWCArIDEyLCB5LCBTSURFX1BBTkVMIC0gMjQsIDUyKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSB1bmxvY2tlZCA/IGQuY29sb3IgOiAnIzU1NSc7IGN0eC5maWxsUmVjdChwYW5lbFggKyAyMCwgeSArIDgsIDM0LCAzNCk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyMxMTEnOyBjdHguZm9udCA9ICc3MDAgMTZweCBzYW5zLXNlcmlmJzsgY3R4LmZpbGxUZXh0KGQuaWNvbiA/PyAnPycsIHBhbmVsWCArIDMyLCB5ICsgMzApOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsgY3R4LmZvbnQgPSAnNjAwIDEzcHggc2Fucy1zZXJpZic7DQogICAgICBjb25zdCBsb2NrTGFiZWwgPSBkLnVubG9ja0NvaW5zID8gYChVbmxvY2sgJHtkLnVubG9ja0NvaW5zfWMpYCA6IGAoTHZsICR7ZC51bmxvY2tMdmx9KWA7DQogICAgICBjdHguZmlsbFRleHQoYCR7ZC5uYW1lfSAke3VubG9ja2VkID8gJycgOiBsb2NrTGFiZWx9YCwgcGFuZWxYICsgNjQsIHkgKyAyMyk7DQogICAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnOw0KICAgICAgY3R4LmZpbGxUZXh0KHVubG9ja2VkID8gYCQke2QuY29zdH1gIDogKGQudW5sb2NrQ29pbnMgPyAnVW5sb2NrIG9uIEhvbWUgc2NyZWVuJyA6ICdMb2NrZWQnKSwgcGFuZWxYICsgNjQsIHkgKyA0MCk7DQogICAgfSk7DQoNCiAgICBpZiAobWF4U2Nyb2xsID4gMCkgew0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmOTknOyBjdHguZm9udCA9ICcxMXB4IHNhbnMtc2VyaWYnOw0KICAgICAgY3R4LmZpbGxUZXh0KGBTY3JvbGwgdG93ZXJzICgke3Nob3BTY3JvbGwgKyAxfS0ke01hdGgubWluKGtleXMubGVuZ3RoLCBzaG9wU2Nyb2xsICsgdmlzaWJsZVJvd3MpfS8ke2tleXMubGVuZ3RofSlgLCBwYW5lbFggKyAxNiwgdG93ZXJMaXN0VG9wICsgdmlzaWJsZVJvd3MgKiB0b3dlclJvdyArIDEwKTsNCiAgICB9DQoNCiAgICBjb25zdCB3YXZlWSA9IGhlaWdodCAtIDIxMDsNCiAgICBjdHguZmlsbFN0eWxlID0gd2F2ZUluUHJvZ3Jlc3MgPyAnIzZjNzU3ZCcgOiAnI2ZjYTMxMSc7IGN0eC5maWxsUmVjdChwYW5lbFggKyAxOCwgd2F2ZVksIFNJREVfUEFORUwgLSAzNiwgNDIpOw0KICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7IGN0eC5mb250ID0gJzcwMCAxNnB4IHNhbnMtc2VyaWYnOyBjdHguZmlsbFRleHQod2F2ZUluUHJvZ3Jlc3MgPyAnV0FWRSBBQ1RJVkUnIDogJ1NUQVJUIFdBVkUnLCBwYW5lbFggKyAxMDYsIHdhdmVZICsgMjcpOw0KDQogICAgLy8gbWV0YQ0KICAgIGN0eC5maWxsU3R5bGUgPSAnIzBkMWIyYSc7IGN0eC5maWxsUmVjdChwYW5lbFggKyAxMiwgaGVpZ2h0IC0gMTYwLCBTSURFX1BBTkVMIC0gMjQsIDk2KTsNCiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZm9udCA9ICc3MDAgMTNweCBzYW5zLXNlcmlmJzsgY3R4LmZpbGxUZXh0KGBNZXRhIFBvaW50czogJHtwcm9ncmVzc2lvbi5wb2ludHN9YCwgcGFuZWxYICsgMjAsIGhlaWdodCAtIDE0MCk7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyMyYTlkOGYnOyBjdHguZmlsbFJlY3QocGFuZWxYICsgMjAsIGhlaWdodCAtIDEzMCwgMTMwLCAzMCk7DQogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJzsgY3R4LmZpbGxUZXh0KGArU3RhcnQgQ2FzaCAoJHtwcm9ncmVzc2lvbi5zdGFydGluZ0Nhc2hMZXZlbH0pYCwgcGFuZWxYICsgMjQsIGhlaWdodCAtIDExMCk7DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyNlNzZmNTEnOyBjdHguZmlsbFJlY3QocGFuZWxYICsgMTY0LCBoZWlnaHQgLSAxMzAsIDEzMCwgMzApOw0KICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5maWxsVGV4dChgK0F0ayBTcGVlZCAoJHtwcm9ncmVzc2lvbi5hdHRhY2tTcGVlZExldmVsfSlgLCBwYW5lbFggKyAxNjgsIGhlaWdodCAtIDExMCk7DQoNCiAgICBpZiAoc3RhdGUuc2VsZWN0ZWRUb3dlcikgew0KICAgICAgY29uc3QgdCA9IHN0YXRlLnNlbGVjdGVkVG93ZXI7DQogICAgICBjb25zdCBsYXlvdXQgPSBnZXRUb3dlckNhcmRMYXlvdXQocGFuZWxYKTsNCiAgICAgIGNvbnN0IHsgY2FyZFkgfSA9IGxheW91dDsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzBkMWIyYSc7IGN0eC5maWxsUmVjdChwYW5lbFggKyAxMiwgY2FyZFksIFNJREVfUEFORUwgLSAyNCwgMTgyKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5mb250ID0gJzcwMCAxM3B4IHNhbnMtc2VyaWYnOw0KICAgICAgY3R4LmZpbGxUZXh0KGAke3Rvd2VyRGVmc1t0LnR5cGVdLm5hbWV9IHwgJHt0LnRhcmdldE1vZGV9ICR7dC5wcm9NYXN0ZXJ5ID8gJ3wgUFJPIE1BU1RFUlknIDogdC5wcm8gPyAnfCBQUk8nIDogJyd9YCwgcGFuZWxYICsgMjAsIGNhcmRZICsgMjApOw0KICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJzsNCiAgICAgIGN0eC5maWxsVGV4dChgTmV4dCBQMTogJHtuZXh0VXBncmFkZVRleHQodCwgMCl9YCwgcGFuZWxYICsgMjAsIGNhcmRZICsgNDApOw0KICAgICAgY3R4LmZpbGxUZXh0KGBOZXh0IFAyOiAke25leHRVcGdyYWRlVGV4dCh0LCAxKX1gLCBwYW5lbFggKyAyMCwgY2FyZFkgKyA1Nik7DQogICAgICBjdHguZmlsbFRleHQoYE5leHQgUDM6ICR7bmV4dFVwZ3JhZGVUZXh0KHQsIDIpfWAsIHBhbmVsWCArIDIwLCBjYXJkWSArIDcyKTsNCg0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMmE5ZDhmJzsgY3R4LmZpbGxSZWN0KGxheW91dC5wMS54MSwgbGF5b3V0LnAxLnkxLCBsYXlvdXQucDEueDIgLSBsYXlvdXQucDEueDEsIGxheW91dC5wMS55MiAtIGxheW91dC5wMS55MSk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZmlsbFRleHQoJ1VwIFAxJywgcGFuZWxYICsgNDQsIGNhcmRZICsgMTAwKTsNCg0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZTc2ZjUxJzsgY3R4LmZpbGxSZWN0KGxheW91dC5wMi54MSwgbGF5b3V0LnAyLnkxLCBsYXlvdXQucDIueDIgLSBsYXlvdXQucDIueDEsIGxheW91dC5wMi55MiAtIGxheW91dC5wMi55MSk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZmlsbFRleHQoJ1VwIFAyJywgcGFuZWxYICsgMTM0LCBjYXJkWSArIDEwMCk7DQoNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzVlNjBjZSc7IGN0eC5maWxsUmVjdChsYXlvdXQucDMueDEsIGxheW91dC5wMy55MSwgbGF5b3V0LnAzLngyIC0gbGF5b3V0LnAzLngxLCBsYXlvdXQucDMueTIgLSBsYXlvdXQucDMueTEpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsgY3R4LmZpbGxUZXh0KCdVcCBQMycsIHBhbmVsWCArIDIzMCwgY2FyZFkgKyAxMDApOw0KDQogICAgICBjdHguZmlsbFN0eWxlID0gJyM2ZDU5N2EnOyBjdHguZmlsbFJlY3QobGF5b3V0LnRhcmdldC54MSwgbGF5b3V0LnRhcmdldC55MSwgbGF5b3V0LnRhcmdldC54MiAtIGxheW91dC50YXJnZXQueDEsIGxheW91dC50YXJnZXQueTIgLSBsYXlvdXQudGFyZ2V0LnkxKTsNCiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5maWxsVGV4dCgnVG9nZ2xlIFRhcmdldGluZycsIHBhbmVsWCArIDExNSwgY2FyZFkgKyAxMjgpOw0KDQogICAgICBjdHguZmlsbFN0eWxlID0gdC5wcm8gJiYgIXQucHJvTWFzdGVyeSA/ICcjZjRhMjYxJyA6ICcjNmM3NTdkJzsNCiAgICAgIGN0eC5maWxsUmVjdChsYXlvdXQubWFzdGVyeS54MSwgbGF5b3V0Lm1hc3RlcnkueTEsIGxheW91dC5tYXN0ZXJ5LngyIC0gbGF5b3V0Lm1hc3RlcnkueDEsIGxheW91dC5tYXN0ZXJ5LnkyIC0gbGF5b3V0Lm1hc3RlcnkueTEpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsNCiAgICAgIGN0eC5maWxsVGV4dCgnUHJvIE1hc3RlcnkgKCQyMjAwKScsIHBhbmVsWCArIDExMiwgY2FyZFkgKyAxNjApOw0KDQogICAgICBjb25zdCBzZWxsVmFsdWUgPSBNYXRoLmZsb29yKCh0b3dlckRlZnNbdC50eXBlXT8uY29zdCB8fCAwKSAqIDAuNyk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyNiMjNhNDgnOw0KICAgICAgY3R4LmZpbGxSZWN0KGxheW91dC5zZWxsLngxLCBsYXlvdXQuc2VsbC55MSwgbGF5b3V0LnNlbGwueDIgLSBsYXlvdXQuc2VsbC54MSwgbGF5b3V0LnNlbGwueTIgLSBsYXlvdXQuc2VsbC55MSk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOw0KICAgICAgY3R4LmZpbGxUZXh0KGBTZWxsIFRvd2VyICgrJCR7c2VsbFZhbHVlfSlgLCBwYW5lbFggKyAxMDgsIGNhcmRZICsgMTgyKTsNCiAgICB9DQoNCiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZm9udCA9ICc3MDAgMjBweCBzYW5zLXNlcmlmJzsNCiAgICBjdHguZmlsbFRleHQoYCQke01hdGguZmxvb3Ioc3RhdGUubW9uZXkpfWAsIDIwLCA1OCk7DQogICAgY3R4LmZpbGxUZXh0KGDinaQgJHtzdGF0ZS5saXZlc31gLCAyMCwgODQpOw0KICAgIGN0eC5maWxsVGV4dChgV2F2ZSAke3N0YXRlLndhdmV9YCwgMjAsIDExMCk7DQogICAgY3R4LmZpbGxUZXh0KGBNTSAke01hdGguZmxvb3IocHJvZmlsZS5tb25rZXlNb25leSl9YCwgMjAsIDEzNik7DQoNCiAgICBjb25zdCBuZWVkID0geHBUb05leHRMZXZlbChwcm9ncmVzc2lvbi5sZXZlbCk7DQogICAgY29uc3QgcGN0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgcHJvZ3Jlc3Npb24ueHAgLyBuZWVkKSk7DQogICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwOCc7IGN0eC5maWxsUmVjdCgyMCwgMTQ2LCAyMjAsIDEyKTsNCiAgICBjdHguZmlsbFN0eWxlID0gJyM0Y2M5ZjAnOyBjdHguZmlsbFJlY3QoMjAsIDE0NiwgMjIwICogcGN0LCAxMik7DQogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsgY3R4LmZvbnQgPSAnMTFweCBzYW5zLXNlcmlmJzsNCiAgICBjdHguZmlsbFRleHQoYEx2ICR7cHJvZ3Jlc3Npb24ubGV2ZWx9ICgke3Byb2dyZXNzaW9uLnhwfS8ke25lZWR9IFhQKWAsIDI0LCAxNTYpOw0KDQogICAgaWYgKGdhbWVPdmVyKSB7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDBhJzsgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmY1OTVlJzsgY3R4LmZvbnQgPSAnNzAwIDUycHggc2Fucy1zZXJpZic7IGN0eC5maWxsVGV4dCgnR0FNRSBPVkVSJywgd2lkdGggLyAyIC0gMTcwLCBoZWlnaHQgLyAyIC0gMTApOw0KICAgICAgY3R4LmZvbnQgPSAnNzAwIDIwcHggc2Fucy1zZXJpZic7IGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7IGN0eC5maWxsVGV4dCgnUHJlc3MgUiB0byByZXN0YXJ0IHJ1bicsIHdpZHRoIC8gMiAtIDk1LCBoZWlnaHQgLyAyICsgMzApOw0KICAgIH0NCiAgICBpZiAocnVuV29uKSB7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDBhJzsgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpOw0KICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjOGJjMzRhJzsgY3R4LmZvbnQgPSAnNzAwIDQ4cHggc2Fucy1zZXJpZic7IGN0eC5maWxsVGV4dCgnVklDVE9SWSEnLCB3aWR0aCAvIDIgLSAxMjAsIGhlaWdodCAvIDIgLSAxOCk7DQogICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnOyBjdHguZm9udCA9ICc3MDAgMTlweCBzYW5zLXNlcmlmJzsNCiAgICAgIGN0eC5maWxsVGV4dChgWW91IGJlYXQgd2F2ZSAke01BWF9XQVZFU30gb24gJHtkaWZmaWN1bHR5RGVmc1tzdGF0ZS5kaWZmaWN1bHR5XS5uYW1lfS5gLCB3aWR0aCAvIDIgLSAxNzAsIGhlaWdodCAvIDIgKyAxOCk7DQogICAgICBjdHguZmlsbFRleHQoYENvaW5zOiAke3Byb2ZpbGUuY29pbnN9IHwgTW9ua2V5IE1vbmV5OiAke01hdGguZmxvb3IocHJvZmlsZS5tb25rZXlNb25leSl9YCwgd2lkdGggLyAyIC0gMTUwLCBoZWlnaHQgLyAyICsgNDQpOw0KICAgICAgY3R4LmZpbGxUZXh0KCdHbyBIb21lIHRvIHN0YXJ0IGFub3RoZXIgcnVuLicsIHdpZHRoIC8gMiAtIDExNSwgaGVpZ2h0IC8gMiArIDcwKTsNCiAgICB9DQogIH0NCg0KICBmdW5jdGlvbiBkcmF3KCkgew0KICAgIGlmIChjdXJyZW50U2NyZWVuID09PSAnaG9tZScpIHsgZHJhd0hvbWUoKTsgcmV0dXJuOyB9DQogICAgZHJhd01hcCgpOyBkcmF3RW50aXRpZXMoKTsgZHJhd1VpKCk7DQogIH0NCg0KICBmdW5jdGlvbiBvbkNsaWNrKGUpIHsNCiAgICBjb25zdCB4ID0gZS5jbGllbnRYLCB5ID0gZS5jbGllbnRZOw0KICAgIGlmIChzaG93QWRtaW5Mb2dpbikgcmV0dXJuOw0KDQogICAgaWYgKGN1cnJlbnRTY3JlZW4gPT09ICdob21lJykgew0KICAgICAgY29uc3QgcGxheVdpZHRoID0gd2lkdGggLSBTSURFX1BBTkVMOw0KICAgICAgY29uc3QgcGxheUNlbnRlclggPSBwbGF5V2lkdGggLyAyICsgSE9NRV9DRU5URVJfWF9PRkZTRVQ7DQoNCiAgICAgIGlmICh4ID49IHBsYXlDZW50ZXJYIC0gNzQgJiYgeCA8PSBwbGF5Q2VudGVyWCArIDc0ICYmIHkgPj0gMjAgJiYgeSA8PSA1Mikgew0KICAgICAgICBpZiAoYWRtaW5VbmxvY2tlZCkgew0KICAgICAgICAgIHNob3dBZG1pblBhbmVsID0gIXNob3dBZG1pblBhbmVsOw0KICAgICAgICAgIGlmIChzaG93QWRtaW5QYW5lbCkgeyByZW5kZXJBZG1pblBhbmVsKCk7IGFkbWluUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IH0gZWxzZSBhZG1pblBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7DQogICAgICAgIH0gZWxzZSB7DQogICAgICAgICAgc2hvd0FkbWluTG9naW4gPSB0cnVlOw0KICAgICAgICAgIGFkbWluTG9naW5Cb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuOw0KICAgICAgfQ0KICAgICAgY29uc3QgY2FyZFcgPSAyMjAsIGdhcCA9IDI2Ow0KICAgICAgY29uc3QgdmlzaWJsZU1hcENhcmRzID0gTWF0aC5taW4oNCwgbWFwRGVmcy5sZW5ndGgpOw0KICAgICAgY29uc3QgbWF4TWFwU2Nyb2xsID0gTWF0aC5tYXgoMCwgbWFwRGVmcy5sZW5ndGggLSB2aXNpYmxlTWFwQ2FyZHMpOw0KICAgICAgbWFwU2Nyb2xsID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWFwU2Nyb2xsLCBtYXhNYXBTY3JvbGwpKTsNCiAgICAgIGNvbnN0IHRvdGFsVyA9IHZpc2libGVNYXBDYXJkcyAqIGNhcmRXICsgKHZpc2libGVNYXBDYXJkcyAtIDEpICogZ2FwOw0KICAgICAgY29uc3Qgc3RhcnRYID0gKHBsYXlXaWR0aCAtIHRvdGFsVykgLyAyOw0KICAgICAgY29uc3QgY2FyZFkgPSAyMjA7DQoNCiAgICAgIGlmIChtYXhNYXBTY3JvbGwgPiAwKSB7DQogICAgICAgIGNvbnN0IGFycm93VyA9IDQwOw0KICAgICAgICBjb25zdCBhcnJvd0dhcCA9IDE0Ow0KICAgICAgICBjb25zdCBsZWZ0WCA9IHN0YXJ0WCAtIGFycm93R2FwIC0gYXJyb3dXOw0KICAgICAgICBjb25zdCByaWdodFggPSBzdGFydFggKyB0b3RhbFcgKyBhcnJvd0dhcDsNCiAgICAgICAgY29uc3QgYXJyb3dZID0gY2FyZFkgKyA2MjsNCiAgICAgICAgaWYgKHggPj0gbGVmdFggJiYgeCA8PSBsZWZ0WCArIDQwICYmIHkgPj0gYXJyb3dZICYmIHkgPD0gYXJyb3dZICsgNDQpIHsgbWFwU2Nyb2xsID0gTWF0aC5tYXgoMCwgbWFwU2Nyb2xsIC0gMSk7IHJldHVybjsgfQ0KICAgICAgICBpZiAoeCA+PSByaWdodFggJiYgeCA8PSByaWdodFggKyA0MCAmJiB5ID49IGFycm93WSAmJiB5IDw9IGFycm93WSArIDQ0KSB7IG1hcFNjcm9sbCA9IE1hdGgubWluKG1heE1hcFNjcm9sbCwgbWFwU2Nyb2xsICsgMSk7IHJldHVybjsgfQ0KICAgICAgfQ0KDQogICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB2aXNpYmxlTWFwQ2FyZHM7IGlkeCsrKSB7DQogICAgICAgIGNvbnN0IGkgPSBtYXBTY3JvbGwgKyBpZHg7DQogICAgICAgIGNvbnN0IGN4ID0gc3RhcnRYICsgaWR4ICogKGNhcmRXICsgZ2FwKTsNCiAgICAgICAgaWYgKHggPj0gY3ggJiYgeCA8PSBjeCArIGNhcmRXICYmIHkgPj0gY2FyZFkgJiYgeSA8PSBjYXJkWSArIDE3MCkgeyBzdGF0ZS5zZWxlY3RlZE1hcCA9IGk7IHJldHVybjsgfQ0KICAgICAgfQ0KICAgICAgZm9yIChjb25zdCBbaWR4LCBkXSBvZiBbJ2Vhc3knLCAnbWVkaXVtJywgJ2hhcmQnLCAnaW1wb3BwYWJsZSddLmVudHJpZXMoKSkgew0KICAgICAgICBjb25zdCBieCA9IHBsYXlDZW50ZXJYIC0gMjY1ICsgaWR4ICogMTMyOw0KICAgICAgICBpZiAoeCA+PSBieCAmJiB4IDw9IGJ4ICsgMTIyICYmIHkgPj0gNDE1ICYmIHkgPD0gNDUxKSB7IHN0YXRlLmRpZmZpY3VsdHkgPSBkOyByZXR1cm47IH0NCiAgICAgIH0NCiAgICAgIGlmICh4ID49IHBsYXlDZW50ZXJYIC0gMTIwICYmIHggPD0gcGxheUNlbnRlclggKyAxMjAgJiYgeSA+PSA0NzAgJiYgeSA8PSA1MjYpIHsNCiAgICAgICAgcmVzZXRSdW4oKTsgY3VycmVudFNjcmVlbiA9ICdnYW1lJzsgcmV0dXJuOw0KICAgICAgfQ0KDQogICAgICBjb25zdCBwcmVtaXVtS2V5cyA9IE9iamVjdC5rZXlzKHRvd2VyRGVmcykuZmlsdGVyKChrKSA9PiB0b3dlckRlZnNba10udW5sb2NrQ29pbnMpOw0KICAgICAgY29uc3QgcHJlbWl1bVkgPSA1NjAsIHByZW1pdW1DYXJkVyA9IDE1MCwgcHJlbWl1bUdhcCA9IDEyOw0KICAgICAgY29uc3QgcHJlbWl1bVRvdGFsVyA9IHByZW1pdW1LZXlzLmxlbmd0aCAqIHByZW1pdW1DYXJkVyArIE1hdGgubWF4KDAsIHByZW1pdW1LZXlzLmxlbmd0aCAtIDEpICogcHJlbWl1bUdhcDsNCiAgICAgIGNvbnN0IHByZW1pdW1TdGFydFggPSBwbGF5Q2VudGVyWCAtIHByZW1pdW1Ub3RhbFcgLyAyOw0KICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVtaXVtS2V5cy5sZW5ndGg7IGkrKykgew0KICAgICAgICBjb25zdCBrZXkgPSBwcmVtaXVtS2V5c1tpXTsNCiAgICAgICAgY29uc3QgZCA9IHRvd2VyRGVmc1trZXldOw0KICAgICAgICBjb25zdCBweCA9IHByZW1pdW1TdGFydFggKyBpICogKHByZW1pdW1DYXJkVyArIHByZW1pdW1HYXApOw0KICAgICAgICBpZiAoeCA+PSBweCAmJiB4IDw9IHB4ICsgcHJlbWl1bUNhcmRXICYmIHkgPj0gcHJlbWl1bVkgJiYgeSA8PSBwcmVtaXVtWSArIDg0KSB7DQogICAgICAgICAgaWYgKCFwcm9maWxlLnVubG9ja2VkU3BlY2lhbFRvd2Vyc1trZXldICYmIHByb2ZpbGUuY29pbnMgPj0gZC51bmxvY2tDb2lucykgew0KICAgICAgICAgICAgcHJvZmlsZS5jb2lucyAtPSBkLnVubG9ja0NvaW5zOw0KICAgICAgICAgICAgcHJvZmlsZS51bmxvY2tlZFNwZWNpYWxUb3dlcnNba2V5XSA9IHRydWU7DQogICAgICAgICAgICBzYXZlUHJvZmlsZSgpOw0KICAgICAgICAgIH0NCiAgICAgICAgICByZXR1cm47DQogICAgICAgIH0NCiAgICAgIH0NCiAgICAgIHJldHVybjsNCiAgICB9DQoNCiAgICBjb25zdCBwYW5lbFggPSB3aWR0aCAtIFNJREVfUEFORUw7DQogICAgaWYgKGdhbWVPdmVyIHx8IHJ1bldvbikgew0KICAgICAgY29uc3QgY2xpY2tlZEhvbWUgPSB4ID49IHBhbmVsWCArIDE2ICYmIHggPD0gd2lkdGggLSAxNiAmJiB5ID49IDU2ICYmIHkgPD0gOTA7DQogICAgICBpZiAoY2xpY2tlZEhvbWUpIGN1cnJlbnRTY3JlZW4gPSAnaG9tZSc7DQogICAgICByZXR1cm47DQogICAgfQ0KDQogICAgaWYgKHggPj0gcGFuZWxYKSB7DQogICAgICBpZiAoeCA+PSBwYW5lbFggKyAxNiAmJiB4IDw9IHdpZHRoIC0gMTYgJiYgeSA+PSA1NiAmJiB5IDw9IDkwKSB7IGN1cnJlbnRTY3JlZW4gPSAnaG9tZSc7IHJldHVybjsgfQ0KICAgICAgaWYgKHggPj0gcGFuZWxYICsgMTYgJiYgeCA8PSB3aWR0aCAtIDE2ICYmIHkgPj0gOTYgJiYgeSA8PSAxMjYpIHsgYXV0b05leHRXYXZlID0gIWF1dG9OZXh0V2F2ZTsgcmV0dXJuOyB9DQogICAgICBpZiAoeCA+PSBwYW5lbFggKyAxNiAmJiB4IDw9IHdpZHRoIC0gMTYgJiYgeSA+PSAxNzQgJiYgeSA8PSAxOTgpIHsNCiAgICAgICAgaWYgKGFkbWluVW5sb2NrZWQpIHsNCiAgICAgICAgICBzaG93QWRtaW5QYW5lbCA9ICFzaG93QWRtaW5QYW5lbDsNCiAgICAgICAgICBpZiAoc2hvd0FkbWluUGFuZWwpIHsgcmVuZGVyQWRtaW5QYW5lbCgpOyBhZG1pblBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9IGVsc2UgYWRtaW5QYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOw0KICAgICAgICB9IGVsc2Ugew0KICAgICAgICAgIHNob3dBZG1pbkxvZ2luID0gdHJ1ZTsNCiAgICAgICAgICBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOw0KICAgICAgICB9DQogICAgICAgIHJldHVybjsNCiAgICAgIH0NCg0KICAgICAgZm9yIChjb25zdCBbaWR4LCBzXSBvZiBbMiwgNSwgMTBdLmVudHJpZXMoKSkgew0KICAgICAgICBjb25zdCBieCA9IHBhbmVsWCArIDE2ICsgaWR4ICogOTYsIGJ5ID0gMTQ4Ow0KICAgICAgICBpZiAoeCA+PSBieCAmJiB4IDw9IGJ4ICsgODggJiYgeSA+PSBieSAmJiB5IDw9IGJ5ICsgMjIpIHsgZ2FtZVNwZWVkID0gczsgcmV0dXJuOyB9DQogICAgICB9DQoNCiAgICAgIGNvbnN0IHQgPSBzdGF0ZS5zZWxlY3RlZFRvd2VyOw0KICAgICAgaWYgKHQpIHsNCiAgICAgICAgY29uc3QgbGF5b3V0ID0gZ2V0VG93ZXJDYXJkTGF5b3V0KHBhbmVsWCk7DQogICAgICAgIGlmICh4ID49IGxheW91dC5wMS54MSAmJiB4IDw9IGxheW91dC5wMS54MiAmJiB5ID49IGxheW91dC5wMS55MSAmJiB5IDw9IGxheW91dC5wMS55Mikgew0KICAgICAgICAgIGNvbnN0IGNvc3QgPSBnZXRUb3dlclVwZ3JhZGVDb3N0KHQsIDApOw0KICAgICAgICAgIGlmIChjYW5VcGdyYWRlUGF0aCh0LCAwKSAmJiBzdGF0ZS5tb25leSA+PSBjb3N0KSB7IHN0YXRlLm1vbmV5IC09IGNvc3Q7IGFwcGx5VG93ZXJVcGdyYWRlKHQsIDApOyB9DQogICAgICAgICAgcmV0dXJuOw0KICAgICAgICB9DQogICAgICAgIGlmICh4ID49IGxheW91dC5wMi54MSAmJiB4IDw9IGxheW91dC5wMi54MiAmJiB5ID49IGxheW91dC5wMi55MSAmJiB5IDw9IGxheW91dC5wMi55Mikgew0KICAgICAgICAgIGNvbnN0IGNvc3QgPSBnZXRUb3dlclVwZ3JhZGVDb3N0KHQsIDEpOw0KICAgICAgICAgIGlmIChjYW5VcGdyYWRlUGF0aCh0LCAxKSAmJiBzdGF0ZS5tb25leSA+PSBjb3N0KSB7IHN0YXRlLm1vbmV5IC09IGNvc3Q7IGFwcGx5VG93ZXJVcGdyYWRlKHQsIDEpOyB9DQogICAgICAgICAgcmV0dXJuOw0KICAgICAgICB9DQogICAgICAgIGlmICh4ID49IGxheW91dC5wMy54MSAmJiB4IDw9IGxheW91dC5wMy54MiAmJiB5ID49IGxheW91dC5wMy55MSAmJiB5IDw9IGxheW91dC5wMy55Mikgew0KICAgICAgICAgIGNvbnN0IGNvc3QgPSBnZXRUb3dlclVwZ3JhZGVDb3N0KHQsIDIpOw0KICAgICAgICAgIGlmIChjYW5VcGdyYWRlUGF0aCh0LCAyKSAmJiBzdGF0ZS5tb25leSA+PSBjb3N0KSB7IHN0YXRlLm1vbmV5IC09IGNvc3Q7IGFwcGx5VG93ZXJVcGdyYWRlKHQsIDIpOyB9DQogICAgICAgICAgcmV0dXJuOw0KICAgICAgICB9DQogICAgICAgIGlmICh4ID49IGxheW91dC50YXJnZXQueDEgJiYgeCA8PSBsYXlvdXQudGFyZ2V0LngyICYmIHkgPj0gbGF5b3V0LnRhcmdldC55MSAmJiB5IDw9IGxheW91dC50YXJnZXQueTIpIHsNCiAgICAgICAgICBjb25zdCBtb2RlcyA9IFsnZmlyc3QnLCAnbGFzdCcsICdzdHJvbmcnLCAnY2xvc2UnXTsNCiAgICAgICAgICB0LnRhcmdldE1vZGUgPSBtb2Rlc1sobW9kZXMuaW5kZXhPZih0LnRhcmdldE1vZGUpICsgMSkgJSBtb2Rlcy5sZW5ndGhdOw0KICAgICAgICAgIHJldHVybjsNCiAgICAgICAgfQ0KICAgICAgICBpZiAoeCA+PSBsYXlvdXQubWFzdGVyeS54MSAmJiB4IDw9IGxheW91dC5tYXN0ZXJ5LngyICYmIHkgPj0gbGF5b3V0Lm1hc3RlcnkueTEgJiYgeSA8PSBsYXlvdXQubWFzdGVyeS55Mikgew0KICAgICAgICAgIGFwcGx5UHJvTWFzdGVyeSh0KTsNCiAgICAgICAgICByZXR1cm47DQogICAgICAgIH0NCiAgICAgICAgaWYgKHggPj0gbGF5b3V0LnNlbGwueDEgJiYgeCA8PSBsYXlvdXQuc2VsbC54MiAmJiB5ID49IGxheW91dC5zZWxsLnkxICYmIHkgPD0gbGF5b3V0LnNlbGwueTIpIHsNCiAgICAgICAgICBjb25zdCBpZHggPSB0b3dlcnMuaW5kZXhPZih0KTsNCiAgICAgICAgICBpZiAoaWR4ID49IDApIHsNCiAgICAgICAgICAgIHN0YXRlLm1vbmV5ICs9IE1hdGguZmxvb3IoKHRvd2VyRGVmc1t0LnR5cGVdPy5jb3N0IHx8IDApICogMC43KTsNCiAgICAgICAgICAgIHRvd2Vycy5zcGxpY2UoaWR4LCAxKTsNCiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkVG93ZXIgPSBudWxsOw0KICAgICAgICAgICAgcmVjYWxjVmlsbGFnZUJ1ZmZzKCk7DQogICAgICAgICAgfQ0KICAgICAgICAgIHJldHVybjsNCiAgICAgICAgfQ0KICAgICAgfQ0KDQogICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModG93ZXJEZWZzKTsNCiAgICAgIGNvbnN0IHRvd2VyTGlzdFRvcCA9IDE4NCwgdG93ZXJSb3cgPSA2MiwgdmlzaWJsZVJvd3MgPSA0Ow0KICAgICAgY29uc3QgdmlzaWJsZUtleXMgPSBrZXlzLnNsaWNlKHNob3BTY3JvbGwsIHNob3BTY3JvbGwgKyB2aXNpYmxlUm93cyk7DQogICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGVLZXlzLmxlbmd0aDsgaSsrKSB7DQogICAgICAgIGNvbnN0IHl5ID0gdG93ZXJMaXN0VG9wICsgaSAqIHRvd2VyUm93Ow0KICAgICAgICBpZiAoeCA+PSBwYW5lbFggKyAxMiAmJiB4IDw9IHdpZHRoIC0gMTIgJiYgeSA+PSB5eSAmJiB5IDw9IHl5ICsgNTIpIHsNCiAgICAgICAgICBjb25zdCBrZXkgPSB2aXNpYmxlS2V5c1tpXTsNCiAgICAgICAgICBpZiAoaXNUb3dlclVubG9ja2VkKGtleSkpIHN0YXRlLnNlbGVjdGVkVG93ZXJUeXBlID0ga2V5Ow0KICAgICAgICAgIHN0YXRlLnNlbGVjdGVkVG93ZXIgPSBudWxsOw0KICAgICAgICAgIHJldHVybjsNCiAgICAgICAgfQ0KICAgICAgfQ0KDQogICAgICBjb25zdCB3YXZlWSA9IGhlaWdodCAtIDIxMDsNCiAgICAgIGlmICh4ID49IHBhbmVsWCArIDE4ICYmIHggPD0gd2lkdGggLSAxOCAmJiB5ID49IHdhdmVZICYmIHkgPD0gd2F2ZVkgKyA0MikgeyBzdGFydFdhdmUoKTsgcmV0dXJuOyB9DQoNCiAgICAgIGlmICh4ID49IHBhbmVsWCArIDIwICYmIHggPD0gcGFuZWxYICsgMTUwICYmIHkgPj0gaGVpZ2h0IC0gMTMwICYmIHkgPD0gaGVpZ2h0IC0gMTAwKSB7IGJ1eU1ldGFVcGdyYWRlKCdjYXNoJyk7IHJldHVybjsgfQ0KICAgICAgaWYgKHggPj0gcGFuZWxYICsgMTY0ICYmIHggPD0gcGFuZWxYICsgMjk0ICYmIHkgPj0gaGVpZ2h0IC0gMTMwICYmIHkgPD0gaGVpZ2h0IC0gMTAwKSB7IGJ1eU1ldGFVcGdyYWRlKCdzcGVlZCcpOyByZXR1cm47IH0NCiAgICAgIHJldHVybjsNCiAgICB9DQoNCiAgICBjb25zdCBjbGlja2VkID0gdG93ZXJzLmZpbmQoKHQpID0+IE1hdGguaHlwb3QodC54IC0geCwgdC55IC0geSkgPCAyNCk7DQogICAgaWYgKGNsaWNrZWQpIHsgc3RhdGUuc2VsZWN0ZWRUb3dlciA9IGNsaWNrZWQ7IHJldHVybjsgfQ0KDQogICAgaWYgKHBsYWNlQWdlbnQoeCwgeSkpIHJldHVybjsNCg0KICAgIGNvbnN0IGRlZiA9IHRvd2VyRGVmc1tzdGF0ZS5zZWxlY3RlZFRvd2VyVHlwZV07DQogICAgaWYgKCFpc1Rvd2VyVW5sb2NrZWQoc3RhdGUuc2VsZWN0ZWRUb3dlclR5cGUpKSByZXR1cm47DQogICAgY29uc3QgdG93ZXJUb29DbG9zZSA9IHRvd2Vycy5zb21lKCh0KSA9PiBNYXRoLmh5cG90KHQueCAtIHgsIHQueSAtIHkpIDwgNDQpOw0KICAgIGNvbnN0IGlzV2F0ZXJUb3dlciA9IGlzV2F0ZXJUb3dlclR5cGUoc3RhdGUuc2VsZWN0ZWRUb3dlclR5cGUpOw0KICAgIGNvbnN0IGlzSW5XYXRlciA9IGlzUG9pbnRJbldhdGVyKHgsIHkpOw0KICAgIGlmIChzdGF0ZS5tb25leSA8IGRlZi5jb3N0IHx8IGlzUG9pbnRPbkFueVBhdGgoeCwgeSkgfHwgdG93ZXJUb29DbG9zZSkgcmV0dXJuOw0KICAgIGlmICgoaXNXYXRlclRvd2VyICYmICFpc0luV2F0ZXIpIHx8ICghaXNXYXRlclRvd2VyICYmIGlzSW5XYXRlcikpIHJldHVybjsNCg0KICAgIGNvbnN0IGRpc2NvdW50ID0gdG93ZXJzDQogICAgICAuZmlsdGVyKHQgPT4gdC50eXBlID09PSAndmlsbGFnZScpDQogICAgICAuc29tZSh2ID0+IE1hdGguaHlwb3Qodi54IC0geCwgdi55IC0geSkgPD0gdi5yYW5nZSkgPyAwLjEgOiAwOw0KDQogICAgY29uc3QgZmluYWxDb3N0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihkZWYuY29zdCAqICgxIC0gZGlzY291bnQpKSk7DQogICAgaWYgKHN0YXRlLm1vbmV5IDwgZmluYWxDb3N0KSByZXR1cm47DQoNCiAgICB0b3dlcnMucHVzaCh7DQogICAgICAuLi5zdHJ1Y3R1cmVkQ2xvbmUoZGVmKSwNCiAgICAgIHR5cGU6IHN0YXRlLnNlbGVjdGVkVG93ZXJUeXBlLCB4LCB5LCBjb29sZG93bjogMCwgdXBncmFkZXM6IFswLCAwLCAwXSwgdGFyZ2V0TW9kZTogJ2ZpcnN0JywNCiAgICAgIGRpc2NvdW50OiAwLCBwcm86IGZhbHNlLCBwcm9NYXN0ZXJ5OiBmYWxzZSwNCiAgICAgIHZpbGxhZ2VCdWZmOiB7IHJhbmdlOiAwLCBzcGVlZDogMCwgY2FtbzogZmFsc2UsIGxlYWQ6IGZhbHNlLCBkaXNjb3VudDogMCwgZGFtYWdlOiAwLCBwaWVyY2U6IDAsIGFybW9yQnJlYWs6IDAgfSwNCiAgICAgIGZhcm1UaWNrOiAwLCBmYXJtUmF0ZTogMjQwLCBmYXJtSW5jb21lOiA0NSwNCiAgICAgIGNhbkhpdENhbW86IGZhbHNlLCBjYW5IaXRMZWFkOiBmYWxzZSwgYXJtb3JCcmVhazogMCwgc3R1blRpY2tzOiAwLCBidXJuVGlja3M6IDAsIGJ1cm5EYW1hZ2U6IDAsIG11bHRpU2hvdDogMSwNCiAgICB9KTsNCiAgICBzdGF0ZS5tb25leSAtPSBmaW5hbENvc3Q7DQogICAgcmVjYWxjVmlsbGFnZUJ1ZmZzKCk7DQogIH0NCg0KICBmdW5jdGlvbiBvbk1vdmUoZSkgeyBzdGF0ZS5ob3Zlci54ID0gZS5jbGllbnRYOyBzdGF0ZS5ob3Zlci55ID0gZS5jbGllbnRZOyB9DQoNCiAgZnVuY3Rpb24gb25Qb2ludGVyRG93bihlKSB7DQogICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHJvb3QpKSByZXR1cm47DQogICAgaWYgKGUuYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgZS5idXR0b24gIT09IDApIHJldHVybjsNCiAgICBpZiAoYWRtaW5QYW5lbC5jb250YWlucyhlLnRhcmdldCkgfHwgYWRtaW5Mb2dpbkJveC5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjsNCiAgICBvbkNsaWNrKGUpOw0KICAgIGUucHJldmVudERlZmF1bHQoKTsNCiAgfQ0KDQogIGZ1bmN0aW9uIG9uV2hlZWwoZSkgew0KICAgIGlmIChjdXJyZW50U2NyZWVuID09PSAnaG9tZScpIHsNCiAgICAgIGNvbnN0IGNhcmRXID0gMjIwLCBnYXAgPSAyNjsNCiAgICAgIGNvbnN0IHZpc2libGVNYXBDYXJkcyA9IE1hdGgubWluKDQsIG1hcERlZnMubGVuZ3RoKTsNCiAgICAgIGNvbnN0IG1heE1hcFNjcm9sbCA9IE1hdGgubWF4KDAsIG1hcERlZnMubGVuZ3RoIC0gdmlzaWJsZU1hcENhcmRzKTsNCiAgICAgIGlmIChtYXhNYXBTY3JvbGwgPiAwICYmIGUuY2xpZW50WSA+PSAyMTAgJiYgZS5jbGllbnRZIDw9IDQxMCAmJiBlLmNsaWVudFggPD0gd2lkdGggLSBTSURFX1BBTkVMKSB7DQogICAgICAgIGUucHJldmVudERlZmF1bHQoKTsNCiAgICAgICAgd2hlZWxBY2N1bSArPSBlLmRlbHRhWTsNCiAgICAgICAgY29uc3Qgc3RlcFRocmVzaG9sZCA9IDE2MDsNCiAgICAgICAgaWYgKE1hdGguYWJzKHdoZWVsQWNjdW0pIDwgc3RlcFRocmVzaG9sZCkgcmV0dXJuOw0KICAgICAgICBjb25zdCBzdGVwcyA9IE1hdGgudHJ1bmMod2hlZWxBY2N1bSAvIHN0ZXBUaHJlc2hvbGQpOw0KICAgICAgICB3aGVlbEFjY3VtIC09IHN0ZXBzICogc3RlcFRocmVzaG9sZDsNCiAgICAgICAgbWFwU2Nyb2xsID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWFwU2Nyb2xsICsgc3RlcHMsIG1heE1hcFNjcm9sbCkpOw0KICAgICAgICByZXR1cm47DQogICAgICB9DQogICAgfQ0KDQogICAgY29uc3QgcGFuZWxYID0gd2lkdGggLSBTSURFX1BBTkVMOw0KICAgIGlmIChlLmNsaWVudFggPCBwYW5lbFgpIHJldHVybjsNCg0KICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0b3dlckRlZnMpOw0KICAgIGNvbnN0IHZpc2libGVSb3dzID0gNDsNCiAgICBjb25zdCBtYXhTY3JvbGwgPSBNYXRoLm1heCgwLCBrZXlzLmxlbmd0aCAtIHZpc2libGVSb3dzKTsNCiAgICBpZiAobWF4U2Nyb2xsID09PSAwKSByZXR1cm47DQoNCiAgICBlLnByZXZlbnREZWZhdWx0KCk7DQogICAgd2hlZWxBY2N1bSArPSBlLmRlbHRhWTsNCiAgICBjb25zdCBzdGVwVGhyZXNob2xkID0gMTgwOw0KICAgIGlmIChNYXRoLmFicyh3aGVlbEFjY3VtKSA8IHN0ZXBUaHJlc2hvbGQpIHJldHVybjsNCiAgICBjb25zdCBzdGVwcyA9IE1hdGgudHJ1bmMod2hlZWxBY2N1bSAvIHN0ZXBUaHJlc2hvbGQpOw0KICAgIHdoZWVsQWNjdW0gLT0gc3RlcHMgKiBzdGVwVGhyZXNob2xkOw0KICAgIHNob3BTY3JvbGwgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzaG9wU2Nyb2xsICsgc3RlcHMsIG1heFNjcm9sbCkpOw0KICB9DQoNCiAgZnVuY3Rpb24gZGVzdHJveSgpIHsNCiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTsNCiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTsNCiAgICByb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW92ZSk7DQogICAgcm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIG9uV2hlZWwpOw0KICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24sIHRydWUpOw0KICAgIHJvb3QucmVtb3ZlKCk7DQogIH0NCg0KICBmdW5jdGlvbiBvbktleWRvd24oZSkgew0KICAgIGNvbnN0IGsgPSBlLmtleS50b0xvd2VyQ2FzZSgpOw0KICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHsNCiAgICAgIGlmIChzaG93QWRtaW5Mb2dpbikgeyBzaG93QWRtaW5Mb2dpbiA9IGZhbHNlOyBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IHJldHVybjsgfQ0KICAgICAgaWYgKHNob3dBZG1pblBhbmVsKSB7IHNob3dBZG1pblBhbmVsID0gZmFsc2U7IGFkbWluUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgcmV0dXJuOyB9DQogICAgICBkZXN0cm95KCk7DQogICAgfQ0KICAgIGlmIChrID09PSAncicgJiYgZ2FtZU92ZXIpIHJlc2V0UnVuKCk7DQogICAgaWYgKGsgPT09ICdmJyAmJiBjdXJyZW50U2NyZWVuID09PSAnZ2FtZScpIHsNCiAgICAgIGNvbnN0IG9yZGVyID0gWydlYXN5JywgJ21lZGl1bScsICdoYXJkJywgJ2ltcG9wcGFibGUnXTsNCiAgICAgIGNvbnN0IGlkeCA9IChvcmRlci5pbmRleE9mKHN0YXRlLmRpZmZpY3VsdHkpICsgMSkgJSBvcmRlci5sZW5ndGg7DQogICAgICBzdGF0ZS5kaWZmaWN1bHR5ID0gb3JkZXJbaWR4XTsNCiAgICAgIHJlc2V0UnVuKCk7DQogICAgfQ0KICAgIGlmIChrID09PSAncCcgJiYgc3RhdGUuc2VsZWN0ZWRUb3dlcikgYXBwbHlQcm9NYXN0ZXJ5KHN0YXRlLnNlbGVjdGVkVG93ZXIpOw0KICAgIGlmIChlLmN0cmxLZXkgJiYgZS5zaGlmdEtleSAmJiBrID09PSAnYScpIHsNCiAgICAgIGlmIChhZG1pblVubG9ja2VkKSB7DQogICAgICAgIHNob3dBZG1pblBhbmVsID0gIXNob3dBZG1pblBhbmVsOw0KICAgICAgICBpZiAoc2hvd0FkbWluUGFuZWwpIHsgcmVuZGVyQWRtaW5QYW5lbCgpOyBhZG1pblBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9IGVsc2UgYWRtaW5QYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOw0KICAgICAgfSBlbHNlIHsNCiAgICAgICAgc2hvd0FkbWluTG9naW4gPSB0cnVlOw0KICAgICAgICBhZG1pbkxvZ2luQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOw0KICAgICAgfQ0KICAgIH0NCiAgfQ0KDQogIGxldCBsYXN0ID0gcGVyZm9ybWFuY2Uubm93KCk7DQogIGxldCBhY2MgPSAwOw0KICBmdW5jdGlvbiBsb29wKG5vdykgew0KICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyhyb290KSkgcmV0dXJuOw0KICAgIGFjYyArPSBub3cgLSBsYXN0Ow0KICAgIGxhc3QgPSBub3c7DQoNCiAgICB3aGlsZSAoYWNjID49IFRJQ0tfTVMpIHsNCiAgICAgIGlmIChjdXJyZW50U2NyZWVuID09PSAnZ2FtZScpIHsNCiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lU3BlZWQ7IGkrKykgdXBkYXRlKCk7DQogICAgICB9DQogICAgICBhY2MgLT0gVElDS19NUzsNCiAgICB9DQoNCiAgICBkcmF3KCk7DQogICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOw0KICB9DQoNCiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7DQogIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pOw0KICByb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW92ZSk7DQogIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBvbldoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0pOw0KICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duLCB0cnVlKTsNCg0KICByZXNpemUoKTsNCiAgYXBwbHlNZXRhQm9udXNlcygpOw0KICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7DQp9KSgpOw==';

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
