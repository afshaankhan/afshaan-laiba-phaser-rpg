import * as THREE from "https://esm.sh/three@0.165.0";

const SAVE_KEY = "dragonbound-save-v1";
const SETTINGS_KEY = "dragonbound-settings-v1";
const START_DATE = new Date("2026-01-09T16:00:00-06:00");
const W = window.innerWidth;
const H = window.innerHeight;

const chapters = [
  {
    id: "hinge",
    title: "The Hinge Gate",
    place: "Baltimore / Ellicott City",
    quest: "Find Pika's photo and recover the Matchstone.",
    palette: [0x17112c, 0x7c4dff, 0xff7ab8],
    relic: "Matchstone",
    npc: "Pika",
    npcLine: "It was never a microwave. It was architecture.",
    lines: [
      "January 9, 2026. Afshaan is still in Baltimore when the match appears.",
      "Laiba's profile glows with moonlight, and Pika's photo flickers like a tiny portal.",
      "Afshaan replies: Is that inside a microwave??",
      "Laiba answers: it's his cage. The Between opens."
    ],
    props: "cards"
  },
  {
    id: "aviary",
    title: "Aviary of Pika",
    place: "The Not-Microwave Palace",
    quest: "Reveal Pika's cage-palace and earn the Pigeon Feather.",
    palette: [0x10283a, 0x5fd4ff, 0xffffff],
    relic: "Pigeon Feather",
    npc: "Pika",
    npcLine: "Coo. Finally, someone respects the architecture.",
    lines: [
      "The photo expands into a crystal aviary, half cage and half joke.",
      "Pika leads the way through mirrors labeled microwave, cage, and beginning.",
      "The right answer is all three: a cage, a joke, and the beginning.",
      "A feather falls into Afshaan and Laiba's shared inventory."
    ],
    props: "aviary"
  },
  {
    id: "messages",
    title: "Lantern Library of First Messages",
    place: "Baltimore Night Library",
    quest: "Light the Mystery Lantern from early texts.",
    palette: [0x10172f, 0x4ea6ff, 0xff6f9f],
    relic: "Song Lantern",
    npc: "Mufliya",
    npcLine: "I know Laiba. If the moon is brighter today, it is probably her fault.",
    lines: [
      "Every early message becomes a floating page in the library.",
      "Mystery of Love turns into a lantern. Call Me By Your Name becomes a moonlit reel.",
      "Mufliya watches from the balcony, making sure Laiba's side of the story is protected.",
      "The messages do not feel forced. That is their first real magic."
    ],
    props: "library"
  },
  {
    id: "ramadan",
    title: "The Ramadan Threshold",
    place: "Baltimore Harbor of Beginnings",
    quest: "Walk through the Westward Door after Ramadan.",
    palette: [0x1d1630, 0xffd36a, 0x72d6c9],
    relic: "Westward Lantern",
    npc: "Mufliya",
    npcLine: "Long distance is not a title. It is something you prove daily.",
    lines: [
      "For two months, the story is nearby. Baltimore and Ellicott City share the same soft moon.",
      "After Ramadan, Afshaan must move to Frisco, Texas for his job search.",
      "Laiba stands at the moonlit side of the bridge. The story changes shape but does not end.",
      "Afshaan says: It becomes long distance. It does not become less real."
    ],
    props: "lanterns"
  },
  {
    id: "skybridge",
    title: "The Long-Distance Skybridge",
    place: "Frisco ↔ Ellicott City",
    quest: "Repair the bridge with daily FaceTime light.",
    palette: [0x08182f, 0x4ca3ff, 0xff8db3],
    relic: "FaceTime Mirror",
    npc: "Ammara",
    npcLine: "Repeated care becomes architecture.",
    lines: [
      "The map stretches. Frisco becomes the western star. Ellicott City remains the eastern moon.",
      "A bridge appears from call logs, little prayers, shared songs, and check-ins.",
      "Every FaceTime call lays another tile under their feet.",
      "Distance stays large, but the road becomes real."
    ],
    props: "bridge"
  },
  {
    id: "theater",
    title: "Google Meet Moon Theater",
    place: "The Shared Screen Moon",
    quest: "Collect the film reels and recover the Movie Moon.",
    palette: [0x1a1029, 0xecc9ff, 0xffd166],
    relic: "Movie Moon",
    npc: "Laiba Echo",
    npcLine: "Sometimes the movie is not the main thing. Sometimes it is the person reacting to it.",
    lines: [
      "Seats made of clouds gather under a giant Google Meet mirror.",
      "They press play from different rooms and enter the same moment.",
      "Popcorn appears on both sides of the country.",
      "The screen becomes a small date night."
    ],
    props: "theater"
  },
  {
    id: "festival",
    title: "Festival of Little Games",
    place: "Skribbl Market",
    quest: "Win the Game Dice by playing instead of rushing.",
    palette: [0x172b22, 0x66e38a, 0xff74aa],
    relic: "Game Dice",
    npc: "Mufliya",
    npcLine: "Laiba is competitive. You should prepare emotionally.",
    lines: [
      "Skribbl stalls glow beside Name Place Animal Thing tents.",
      "Laiba plays. Afshaan watches, cheers, and sometimes loses with dignity.",
      "The market laughs every time someone guesses the impossible from a tiny doodle.",
      "Love is also play, repetition, teasing, and showing up for the small rituals."
    ],
    props: "festival"
  },
  {
    id: "jam",
    title: "Spotify Jam Constellation",
    place: "Song Planets",
    quest: "Tune the shared playlist and form the Screen-Kiss Star.",
    palette: [0x06180f, 0x1ed760, 0xc9a2d6],
    relic: "Screen-Kiss Star",
    npc: "Ammara",
    npcLine: "Songs are portable places. Listen together, and distance shrinks.",
    lines: [
      "The playlist becomes a constellation of small glowing planets.",
      "Mystery of Love keeps returning like a comet.",
      "Soft songs make the Frisco-Ellicott road warmer.",
      "A star forms from screen kisses and shared listening."
    ],
    props: "stars"
  },
  {
    id: "sleepsea",
    title: "Sleep Call Sea",
    place: "Two-Moon Shore",
    quest: "Keep the call lantern alive until dawn.",
    palette: [0x071026, 0x7b8cff, 0xffc4dd],
    relic: "Dream Thread",
    npc: "Pika",
    npcLine: "Coo... I will be quiet this once.",
    lines: [
      "Phones float like lantern boats on a calm dark sea.",
      "There is no battle here. Only quiet breathing, safe feeling, and trust.",
      "The Mists whisper from the waves, but the call lantern stays lit.",
      "Long distance loses another night."
    ],
    props: "sea"
  },
  {
    id: "garden",
    title: "Morning Garden",
    place: "Daily Bloom Shrine",
    quest: "Wake the seven flowers of daily care.",
    palette: [0x3a1835, 0xffb86b, 0xff7aa8],
    relic: "Daily Bloom",
    npc: "Laiba Echo",
    npcLine: "Good morning becomes magic when it keeps returning.",
    lines: [
      "Sunrise flowers open only when greeted with care.",
      "Good morning. Did you sleep? Eat something. Miss you. Call later. Safe drive. Always here.",
      "Nothing here is dramatic, and that is why it matters.",
      "Grand romance survives through small repeated choices."
    ],
    props: "garden"
  },
  {
    id: "shrine",
    title: "Five-Month Dragon Shrine",
    place: "Ammara's Heart Gate",
    quest: "Place every relic and load Month Six.",
    palette: [0x180b2d, 0xffd166, 0xff8db3],
    relic: "Month Six Door",
    npc: "Ammara",
    npcLine: "Five months is not the end of the road. It is proof the road exists.",
    lines: [
      "The Matchstone, Pigeon Feather, Song Lantern, Westward Lantern, FaceTime Mirror, Movie Moon, Game Dice, Screen-Kiss Star, Dream Thread, and Daily Bloom rise together.",
      "Afshaan and Laiba stand on opposite sides of the glowing mirror-screen.",
      "They send screen kisses through the shrine. The crack becomes a doorway.",
      "To be continued... Loading Month Six."
    ],
    props: "shrine"
  }
];

const defaultSettings = { music: true, bloom: true, camera: "follow", quality: "high" };
const defaultCustom = {
  player: "Afshaan",
  Afshaan: { outfit: "#5bb5f0", aura: "#89d8ff" },
  Laiba: { outfit: "#e8526b", aura: "#ffd6e8" }
};
let settings = loadJson(SETTINGS_KEY, defaultSettings);
let save = loadJson(SAVE_KEY, null) || newSave();
save = normalizeSave(save);
let custom = save.custom || structuredClone(defaultCustom);
let state = "title";
let selectedButton = 0;
let activeChapter = chapters[save.chapterIndex] || chapters[0];
let keys = new Set();
let velocity = new THREE.Vector3();
let interactTarget = null;
let moveTarget = null;
let dialogueQueue = [];
let dialogueOpen = false;
let musicIndex = 0;
let audio = null;
let lastSave = 0;
let promptEl;

const shell = document.getElementById("game-shell");
shell.innerHTML = `
  <canvas id="world"></canvas>
  <section id="overlay" class="overlay"></section>
  <section id="prompt" class="prompt hidden"></section>
  <section id="dialogue" class="dialogue hidden"><h3></h3><p></p><button>Continue</button></section>
  <section id="hud" class="hud hidden"><div><strong id="place"></strong><span id="quest"></span></div><div id="relics"></div></section>
  <section id="mobile" class="mobile"><div class="pad"><button data-m="up">▲</button><button data-m="left">◀</button><button data-m="down">▼</button><button data-m="right">▶</button></div><div class="act"><button data-action="interact">E</button><button data-action="menu">☰</button></div></section>
`;

const canvas = document.getElementById("world");
const overlay = document.getElementById("overlay");
promptEl = document.getElementById("prompt");
const dialogueEl = document.getElementById("dialogue");
const hud = document.getElementById("hud");
const placeEl = document.getElementById("place");
const questEl = document.getElementById("quest");
const relicsEl = document.getElementById("relics");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x090814, 16, 44);
const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const world = new THREE.Group();
scene.add(world);

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(5, 11, 8);
sun.castShadow = true;
scene.add(sun);
scene.add(new THREE.AmbientLight(0x9aa0ff, 1.2));

const player = makeHero("player", 0x5bb5f0, 0xd4a574, "#89d8ff");
const partner = makeHero("partner", 0xe8526b, 0xffe4d0, "#ffd6e8");
scene.add(player.group, partner.group);
const dragon = makeDragon();
scene.add(dragon);
const pika = makePika();
scene.add(pika);
const mufliya = makeMufliya();
scene.add(mufliya);
const objects = [];
const animatables = [];

function newSave() {
  return {
    chapterIndex: 0,
    relics: [],
    shards: {},
    visited: {},
    custom: structuredClone(defaultCustom),
    playSeconds: 0,
    pos: { x: 0, z: 6 }
  };
}
function normalizeSave(raw) {
  const fresh = newSave();
  const merged = { ...fresh, ...(raw || {}) };
  merged.chapterIndex = Number.isFinite(merged.chapterIndex) ? merged.chapterIndex : 0;
  merged.relics = Array.isArray(merged.relics) ? merged.relics : [];
  merged.shards = merged.shards && typeof merged.shards === "object" ? merged.shards : {};
  merged.visited = merged.visited && typeof merged.visited === "object" ? merged.visited : {};
  merged.playSeconds = Number.isFinite(merged.playSeconds) ? merged.playSeconds : 0;
  merged.pos = merged.pos && Number.isFinite(merged.pos.x) && Number.isFinite(merged.pos.z) ? merged.pos : fresh.pos;
  merged.custom = { ...fresh.custom, ...(merged.custom || {}) };
  return merged;
}
function loadJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function persist() { save.custom = custom; localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }
function persistSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }

function color(hex) { return new THREE.Color(hex); }
function mat(c, rough = 0.78, metal = 0.02) { return new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: metal }); }
function box(w, h, d, c) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); m.castShadow = true; m.receiveShadow = true; return m; }
function cyl(r, h, c, seg = 10) { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat(c)); m.castShadow = true; m.receiveShadow = true; return m; }
function orb(r, c, emissive = 0x000000) { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshStandardMaterial({ color: c, emissive, emissiveIntensity: emissive ? 0.65 : 0, roughness: 0.55 })); m.castShadow = true; return m; }

function makeHero(kind, outfit, skin, aura) {
  const g = new THREE.Group();
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.45, 20), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.02; g.add(shadow);
  const cape = box(0.58, 0.82, 0.08, kind === "player" ? 0x20345d : 0x6e2f55);
  cape.position.set(0, 0.77, 0.2);
  g.add(cape);
  const body = box(0.48, 0.78, 0.34, outfit); body.position.y = 0.78; g.add(body);
  const chest = box(0.34, 0.18, 0.37, 0xffffff);
  chest.position.set(0, 0.92, -0.01);
  chest.material.color.offsetHSL(0, 0, -0.08);
  g.add(chest);
  const head = orb(0.28, skin); head.position.y = 1.36; g.add(head);
  const hair = new THREE.Group();
  const hairTop = box(0.62, 0.18, 0.46, kind === "player" ? 0x19172a : 0x8b5e3c); hairTop.position.y = 1.58; hair.add(hairTop);
  const hairSideL = box(0.13, 0.33, 0.38, kind === "player" ? 0x19172a : 0x8b5e3c); hairSideL.position.set(-0.27, 1.42, 0); hair.add(hairSideL);
  const hairSideR = hairSideL.clone(); hairSideR.position.x = 0.27; hair.add(hairSideR);
  g.add(hair);
  const legL = box(0.16, 0.52, 0.18, 0x263044); legL.position.set(-0.14, 0.22, 0); g.add(legL);
  const legR = legL.clone(); legR.position.x = 0.14; g.add(legR);
  const armL = box(0.13, 0.55, 0.14, skin); armL.position.set(-0.34, 0.78, -0.02); g.add(armL);
  const armR = armL.clone(); armR.position.x = 0.34; g.add(armR);
  const phone = orb(0.08, kind === "player" ? 0x89d8ff : 0xffd6e8, kind === "player" ? 0x89d8ff : 0xffd6e8);
  phone.position.set(0.44, 0.72, -0.18);
  g.add(phone);
  const glow = new THREE.PointLight(color(aura), 0.8, 3.5); glow.position.y = 1.15; g.add(glow);
  return { group: g, body, head, hair, legL, legR, armL, armR, phone, cape, speed: 5.4, walk: 0, glow };
}
function setHeroStyle() {
  const p = custom[custom.player];
  player.body.material.color.set(p.outfit);
  player.glow.color.set(p.aura);
  const partnerName = custom.player === "Afshaan" ? "Laiba" : "Afshaan";
  const pp = custom[partnerName];
  partner.body.material.color.set(pp.outfit);
  partner.head.material.color.set(partnerName === "Laiba" ? 0xffe4d0 : 0xd4a574);
  partner.glow.color.set(pp.aura);
}
function makeDragon() {
  const g = new THREE.Group();
  const body = orb(0.9, 0xf0d078, 0xffcc66); body.scale.set(1.6, 0.7, 0.8); g.add(body);
  const neck = cyl(0.22, 1.2, 0xd8b45c, 8); neck.rotation.z = 0.9; neck.position.set(0.9, 0.35, 0); g.add(neck);
  const head = orb(0.38, 0xffd983, 0xffbb55); head.position.set(1.45, 0.75, 0); g.add(head);
  const wingMat = new THREE.MeshStandardMaterial({ color: 0xc9a2d6, emissive: 0x5f3b8c, emissiveIntensity: 0.35, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
  const wingGeo = new THREE.ConeGeometry(0.95, 2.3, 3);
  const wl = new THREE.Mesh(wingGeo, wingMat); wl.position.set(-0.25, 0.45, -0.9); wl.rotation.set(0.5, 0.2, -1.25); g.add(wl);
  const wr = wl.clone(); wr.position.z = 0.9; wr.rotation.z = 1.25; g.add(wr);
  g.position.set(0, 5.2, -7); g.scale.set(1.15, 1.15, 1.15);
  return g;
}
function makePika() {
  const g = new THREE.Group();
  g.add(orb(0.22, 0xe8eef5));
  const beak = box(0.18, 0.08, 0.08, 0xffb74d); beak.position.set(0.22, 0.04, 0); g.add(beak);
  g.position.set(-3, 0.45, -2); return g;
}
function makeMufliya() {
  const g = new THREE.Group();
  g.add(box(0.42, 0.78, 0.32, 0x9d7bea));
  const h = orb(0.25, 0xf4ccb2); h.position.y = 0.7; g.add(h);
  g.position.set(3.4, 0.55, -1.7); return g;
}

function clearWorld() { while (world.children.length) world.remove(world.children[0]); objects.length = 0; }
function clearAnimatables() { animatables.length = 0; }
function loadChapter(index, resetPos = true) {
  save.chapterIndex = Math.max(0, Math.min(index, chapters.length - 1));
  activeChapter = chapters[save.chapterIndex];
  clearWorld();
  clearAnimatables();
  moveTarget = null;
  promptEl.classList.add("hidden");
  scene.background = color(activeChapter.palette[0]);
  scene.fog.color.set(activeChapter.palette[0]);
  buildTerrain(activeChapter);
  buildChapterProps(activeChapter);
  if (resetPos) { player.group.position.set(0, 0, 6.5); partner.group.position.set(-0.9, 0, 7.2); } else { player.group.position.set(save.pos.x, 0, save.pos.z); partner.group.position.copy(player.group.position).add(new THREE.Vector3(-0.9, 0, 0.6)); }
  dragon.visible = ["skybridge", "jam", "shrine"].includes(activeChapter.id);
  pika.visible = ["hinge", "aviary", "sleepsea"].includes(activeChapter.id);
  mufliya.visible = ["messages", "ramadan", "festival"].includes(activeChapter.id);
  setHeroStyle();
  updateHud(); persist();
}
function tile(x, z, c, y = -0.05, h = 0.08) { const m = box(1, h, 1, c); m.position.set(x, y, z); world.add(m); return m; }
function buildTerrain(ch) {
  const [base, accent, warm] = ch.palette;
  world.add(makeSkyRelics(ch));
  const ground = new THREE.Group();
  for (let x = -14; x <= 14; x++) {
    for (let z = -10; z <= 10; z++) {
      const edge = Math.abs(x) > 12 || Math.abs(z) > 8;
      const checker = (x + z) % 3 === 0;
      const colorValue = edge ? base + 0x030306 : checker ? base + 0x08080a : base + 0x131018;
      const t = tile(x, z, colorValue, edge ? -0.12 : -0.05, edge ? 0.18 : 0.08);
      ground.add(t);
    }
  }
  world.add(ground);
  for (let z = -8; z <= 7; z++) tile(0, z, accent, 0, 0.1);
  for (let x = -8; x <= 8; x++) tile(x, 0, accent, 0, 0.1);
  for (let i = -5; i <= 5; i += 2) {
    const lamp = makeLantern(-9.5, i, warm);
    world.add(lamp);
    const lamp2 = makeLantern(9.5, i, warm);
    world.add(lamp2);
  }
  if (["skybridge", "sleepsea", "jam"].includes(ch.id)) {
    const water = new THREE.Mesh(new THREE.PlaneGeometry(31, 23, 1, 1), new THREE.MeshStandardMaterial({ color: 0x0a3d68, emissive: 0x082244, emissiveIntensity: 0.3, roughness: 0.35, transparent: true, opacity: 0.82 }));
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.16;
    world.add(water);
    animatables.push({ mesh: water, kind: "water" });
  }
  const treeCount = ["garden", "messages", "ramadan"].includes(ch.id) ? 32 : 18;
  for (let i = 0; i < treeCount; i++) {
    const side = i % 2 ? -1 : 1;
    const x = side * (7 + Math.random() * 5.5);
    const z = -8 + Math.random() * 16;
    world.add(makeTree(x, z, i % 3 ? 0x2f7d55 : 0x4a936f));
  }
  for (let i = 0; i < 26; i++) {
    const x = -10 + Math.random() * 20, z = -7 + Math.random() * 14;
    if (Math.abs(x) < 1.25 || Math.abs(z) < 1.25) continue;
    const p = cyl(0.05 + Math.random() * 0.04, 0.35, warm, 7);
    p.position.set(x, 0.18, z);
    world.add(p);
    animatables.push({ mesh: p, kind: "sparkPlant", phase: Math.random() * 10 });
  }
}
function makeSkyRelics(ch) {
  const g = new THREE.Group();
  const [, accent, warm] = ch.palette;
  const westMoon = orb(0.7, 0xffd166, 0xffd166);
  westMoon.position.set(-7.5, 6.8, -10.5);
  const eastMoon = orb(0.62, 0xffd6e8, 0xff9ac4);
  eastMoon.position.set(7.8, 6.4, -10.2);
  g.add(westMoon, eastMoon);
  const bridge = cyl(0.035, 15.2, accent, 8);
  bridge.rotation.z = Math.PI / 2;
  bridge.rotation.y = 0.12;
  bridge.position.set(0, 5.7, -10.3);
  g.add(bridge);
  for (let i = 0; i < 36; i++) {
    const star = orb(0.025 + Math.random() * 0.03, i % 3 ? 0xffffff : warm, i % 3 ? 0xffffff : warm);
    star.position.set(-12 + Math.random() * 24, 3.2 + Math.random() * 5.2, -8.5 - Math.random() * 4);
    g.add(star);
    animatables.push({ mesh: star, kind: "star", phase: Math.random() * 10 });
  }
  for (let i = 0; i < 5; i++) {
    const island = cyl(0.75 + Math.random() * 0.45, 0.18, ch.palette[0] + 0x171717, 12);
    island.position.set(-8 + i * 4, 1.8 + Math.sin(i) * 0.35, -9.6 - Math.cos(i));
    island.scale.z = 0.55;
    g.add(island);
    animatables.push({ mesh: island, kind: "island", phase: i, baseY: island.position.y });
  }
  animatables.push({ mesh: westMoon, kind: "moon", phase: 0 });
  animatables.push({ mesh: eastMoon, kind: "moon", phase: 2 });
  return g;
}
function addObj(mesh, type, label, lines = [], id = label) {
  mesh.userData = { type, label, lines, id };
  objects.push(mesh);
  world.add(mesh);
  return mesh;
}
function buildChapterProps(ch) {
  const [, accent, warm] = ch.palette;
  const portal = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.08, 12, 48), new THREE.MeshStandardMaterial({ color: warm, emissive: warm, emissiveIntensity: 0.75 }));
  ring.rotation.x = Math.PI / 2; portal.add(ring);
  const orbCore = orb(0.32, warm, warm); orbCore.position.y = 0.35; portal.add(orbCore);
  portal.position.set(0, 0.3, -6.6);
  addObj(portal, "portal", `Gate to next realm`, ["The path forward answers only after this memory is understood."], `${ch.id}:portal`);
  animatables.push({ mesh: portal, kind: "portal", phase: 0 });
  world.add(makeLabel(0, 1.55, -6.6, "NEXT REALM", warm));
  if (!save.relics.includes(ch.relic)) {
    const relic = orb(0.35, warm, warm);
    relic.position.set(0, 0.58, -1.4);
    addObj(relic, "relic", ch.relic, ch.lines, `${ch.id}:relic`);
    animatables.push({ mesh: relic, kind: "relic", phase: 1 });
    world.add(makeLabel(0, 1.18, -1.4, ch.relic.toUpperCase(), warm));
  }
  const npc = ch.npc === "Ammara" ? dragon : ch.npc === "Pika" ? pika : mufliya;
  npc.position.x = 3.4; npc.position.z = -2.1; npc.position.y = ch.npc === "Ammara" ? 5.2 : 0.55;
  addObj(makeSign(-3.8, -2.1, ch.npc, warm), "npc", ch.npc, [ch.npcLine], `${ch.id}:npc`);
  world.add(makeLabel(-3.8, 1.34, -2.1, ch.npc, warm));
  const collected = save.shards[ch.id] || [];
  for (let i = 0; i < 5; i++) {
    const shardId = `${ch.id}:shard:${i}`;
    if (collected.includes(shardId)) continue;
    const shard = orb(0.16, accent, accent);
    shard.position.set(-6 + i * 3, 0.45, 2 + Math.sin(i) * 2.4);
    addObj(shard, "shard", `Memory shard ${i + 1}`, [ch.lines[i % ch.lines.length]], shardId);
    animatables.push({ mesh: shard, kind: "shard", phase: i });
  }
  if (ch.props === "cards") for (let i = 0; i < 5; i++) { const card = box(0.9, 0.08, 1.2, 0xffd6e8); card.position.set(-5 + i * 2.5, 0.15, -4.4); world.add(card); }
  if (ch.props === "aviary") for (let i = 0; i < 8; i++) { const bar = cyl(0.025, 3.2, 0xbfe9ff, 8); bar.position.set(-4 + i, 1.6, -3.9); world.add(bar); }
  if (ch.props === "bridge") for (let i = -7; i <= 7; i++) { const b = box(0.72, 0.18, 0.55, warm); b.position.set(i * 0.8, 0.08, -3.5 + Math.sin(i) * 0.2); world.add(b); }
  if (ch.props === "garden") for (let i = 0; i < 18; i++) { const flower = orb(0.08, i % 2 ? 0xff86b7 : 0xffd166, i % 2 ? 0xff86b7 : 0xffd166); flower.position.set(-8 + Math.random() * 16, 0.25, -5 + Math.random() * 9); world.add(flower); }
  if (ch.id === "hinge") {
    const gate = makeHingeGate(warm, accent);
    gate.position.set(0, 0, -4.3);
    world.add(gate);
  }
  if (ch.id === "shrine") {
    const altar = makeAltar(warm);
    altar.position.set(0, 0.02, -0.1);
    world.add(altar);
  }
}
function makeSign(x, z, label, c) { const g = new THREE.Group(); const post = box(0.08, 0.7, 0.08, 0x6a4a2c); post.position.y = 0.35; const face = box(1.2, 0.4, 0.08, c); face.position.y = 0.82; g.add(post, face); g.position.set(x, 0, z); return g; }
function makeTree(x, z, leaf) {
  const g = new THREE.Group();
  const trunk = cyl(0.12, 0.85, 0x6d4528, 8);
  trunk.position.y = 0.42;
  const crown = orb(0.6, leaf, leaf);
  crown.position.y = 1.12;
  const crown2 = orb(0.42, leaf + 0x101010, leaf);
  crown2.position.set(0.26, 1.42, -0.08);
  g.add(trunk, crown, crown2);
  g.position.set(x, 0, z);
  return g;
}
function makeLantern(x, z, c) {
  const g = new THREE.Group();
  const post = cyl(0.035, 1.2, 0x3a2b48, 8);
  post.position.y = 0.6;
  const light = orb(0.16, c, c);
  light.position.y = 1.25;
  const glow = new THREE.PointLight(c, 0.8, 4);
  glow.position.y = 1.25;
  g.add(post, light, glow);
  g.position.set(x, 0, z);
  animatables.push({ mesh: light, kind: "lantern", phase: Math.random() * 8, light: glow });
  return g;
}
function makeLabel(x, y, z, text, c) {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 128;
  const cx = canvas.getContext("2d");
  cx.fillStyle = "rgba(9,8,20,.72)";
  cx.fillRect(0, 0, 512, 128);
  cx.strokeStyle = `#${c.toString(16).padStart(6, "0")}`;
  cx.lineWidth = 6;
  cx.strokeRect(8, 8, 496, 112);
  cx.fillStyle = "#fff";
  cx.font = "bold 38px system-ui";
  cx.textAlign = "center";
  cx.fillText(text, 256, 76);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sprite.position.set(x, y, z);
  sprite.scale.set(2.7, 0.68, 1);
  return sprite;
}
function makeHingeGate(warm, accent) {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const card = box(0.85, 0.06, 1.15, i % 2 ? 0xffd6e8 : 0xffffff);
    card.position.set(-2.4 + i * 1.2, 0.28 + i * 0.03, Math.sin(i) * 0.18);
    card.rotation.y = (i - 2) * 0.16;
    g.add(card);
  }
  const heart = orb(0.28, 0xff6f9f, 0xff6f9f);
  heart.scale.set(1, 0.8, 0.45);
  heart.position.set(0, 1.1, 0);
  g.add(heart);
  const line = cyl(0.03, 4.8, accent, 8);
  line.rotation.z = Math.PI / 2;
  line.position.y = 0.12;
  g.add(line);
  animatables.push({ mesh: heart, kind: "heart", phase: 0 });
  return g;
}
function makeAltar(c) {
  const g = new THREE.Group();
  const base = cyl(1.4, 0.28, 0x2d1d48, 16);
  base.position.y = 0.14;
  const top = cyl(0.9, 0.18, c, 16);
  top.position.y = 0.42;
  g.add(base, top);
  for (let i = 0; i < 8; i++) {
    const gem = orb(0.12, i % 2 ? 0xff8db3 : 0xffd166, i % 2 ? 0xff8db3 : 0xffd166);
    gem.position.set(Math.cos(i) * 1.15, 0.62, Math.sin(i) * 1.15);
    g.add(gem);
    animatables.push({ mesh: gem, kind: "shard", phase: i });
  }
  return g;
}

function updateHud() {
  placeEl.textContent = `${activeChapter.title} · ${activeChapter.place}`;
  questEl.textContent = activeChapter.quest;
  const shardCount = (save.shards[activeChapter.id] || []).length;
  const relicState = save.relics.includes(activeChapter.relic) ? "relic secured" : `${shardCount}/5 shards`;
  relicsEl.textContent = `${save.relics.length}/${chapters.length} relics · ${relicState} · ${formatTime(save.playSeconds)}`;
}
function formatTime(seconds) { const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = Math.floor(seconds % 60); return `${h}h ${m}m ${s}s`; }
function togetherTimer() { const d = Math.max(0, Date.now() - START_DATE.getTime()); const s = Math.floor(d / 1000); const months = Math.floor(s / 2629746); const days = Math.floor((s - months * 2629746) / 86400); const h = Math.floor((s % 86400) / 3600); const m = Math.floor((s % 3600) / 60); return `${months} months · ${days} days · ${h}h ${m}m since together`; }

function showTitle() {
  state = "title"; hud.classList.add("hidden");
  overlay.className = "overlay menu";
  overlay.innerHTML = `<div class="panel title"><p class="eyebrow">Fantasy Romance Adventure</p><h1>Afshaan & Laiba:<br/>Dragonbound</h1><p>Original lore preserved: Baltimore beginning, Pika, Ramadan, Frisco long distance, Ammara, Mufliya, FaceTime, movies, games, songs, sleep calls, and Month Six loading.</p><div class="buttons"><button data-menu="new">New Adventure</button><button data-menu="resume">Resume</button><button data-menu="custom">Customize</button><button data-menu="settings">Settings</button><button data-menu="story">Story Bible</button></div></div>`;
}
function showSettings() {
  state = "settings"; overlay.className = "overlay menu";
  overlay.innerHTML = `<div class="panel"><h2>Settings</h2><label><input type="checkbox" id="music" ${settings.music ? "checked" : ""}/> Music previews</label><label><input type="checkbox" id="bloom" ${settings.bloom ? "checked" : ""}/> Magical glow</label><label>Camera <select id="camera"><option value="follow">Follow</option><option value="wide">Wide</option></select></label><div class="buttons"><button data-menu="back">Back</button></div></div>`;
  overlay.querySelector("#camera").value = settings.camera;
}
function showCustom() {
  state = "custom"; overlay.className = "overlay menu";
  overlay.innerHTML = `<div class="panel"><h2>Character Customization</h2><p>Pick the player and outfit glow. Laiba stays fair-skinned and moonlit by canon.</p><div class="custom-grid">${["Afshaan", "Laiba"].map(name => `<article><h3>${name}</h3><button data-player="${name}">Play as ${name}</button><p>Outfit</p><div class="swatches">${["#5bb5f0", "#e8526b", "#c9a2d6", "#1ed760", "#ffd166"].map(c => `<button style="--c:${c}" data-color="${name}:${c}"></button>`).join("")}</div></article>`).join("")}</div><div class="buttons"><button data-menu="back">Back</button></div></div>`;
}
function showStory() {
  state = "story"; overlay.className = "overlay menu";
  overlay.innerHTML = `<div class="panel story"><h2>Story</h2><p>January 9, 2026 at 4:00 PM. Afshaan is in Baltimore when he matches with Laiba from Ellicott City. Pika's photo starts the first joke. After two months and Ramadan, Afshaan moves to Frisco for job search, and the nearby beginning becomes long distance. Ammara, the Dragon of Shared Light, wakes because their daily calls, songs, games, and screen kisses have made The Between real.</p><p>The game is now structured as a fantasy adventure: each realm contains shards, one relic, a guide, and a portal. Collect all relics to reach the Five-Month Dragon Shrine.</p><div class="buttons"><button data-menu="back">Back</button></div></div>`;
}
function startGame(fresh = false) {
  if (fresh) save = newSave();
  save.custom = custom;
  overlay.className = "overlay hidden"; hud.classList.remove("hidden"); state = "play";
  loadChapter(save.chapterIndex || 0, !save.pos || fresh);
  bootMusic();
}

function openDialogue(title, lines, done) {
  dialogueQueue = lines.map(text => ({ title, text })); dialogueOpen = true; dialogueEl.classList.remove("hidden"); dialogueEl.dataset.done = done || ""; nextDialogue();
}
function nextDialogue() {
  if (!dialogueOpen) return;
  const item = dialogueQueue.shift();
  if (!item) { dialogueOpen = false; dialogueEl.classList.add("hidden"); const done = dialogueEl.dataset.done; dialogueEl.dataset.done = ""; if (done === "portal") advanceChapter(); return; }
  dialogueEl.querySelector("h3").textContent = item.title;
  dialogueEl.querySelector("p").textContent = item.text;
}
function interact() {
  if (dialogueOpen) return nextDialogue();
  let nearest = null, dist = 1.35;
  for (const obj of objects) {
    const p = new THREE.Vector3(); obj.getWorldPosition(p);
    const d = p.distanceTo(player.group.position);
    if (d < dist) { dist = d; nearest = obj; }
  }
  if (!nearest) return toast("Nothing close enough. Walk to a glowing object.");
  const { type, label, lines } = nearest.userData;
  if (type === "portal") {
    if (!save.relics.includes(activeChapter.relic)) {
      return openDialogue("Sealed Gate", [
        `The gate asks for ${activeChapter.relic}.`,
        "Collect memory shards, speak to the guide, and claim the relic before leaving this realm."
      ]);
    }
    return openDialogue("Portal", [`${activeChapter.relic} answers.`, "The realm folds into the next page of the story."], "portal");
  }
  if (type === "relic") {
    const shardCount = (save.shards[activeChapter.id] || []).length;
    if (shardCount < 3) {
      return openDialogue(label, [
        `The ${label} is still asleep.`,
        "Collect at least 3 memory shards in this realm to wake it."
      ]);
    }
    if (!save.relics.includes(activeChapter.relic)) save.relics.push(activeChapter.relic);
    removeObject(nearest);
    persist();
    updateHud();
    return openDialogue(label, [...lines, `${label} joined your relics.`]);
  }
  if (type === "shard") {
    const shardId = nearest.userData.id;
    save.shards[activeChapter.id] ||= [];
    if (!save.shards[activeChapter.id].includes(shardId)) save.shards[activeChapter.id].push(shardId);
    removeObject(nearest);
    persist();
    updateHud();
    return openDialogue(label, [...lines, "Memory shard collected."]);
  }
  if (type === "npc") return openDialogue(label, lines);
}
function removeObject(obj) {
  const i = objects.indexOf(obj);
  if (i >= 0) objects.splice(i, 1);
  world.remove(obj);
}
function advanceChapter() {
  if (!save.relics.includes(activeChapter.relic)) return toast(`Collect ${activeChapter.relic} first.`);
  if (save.chapterIndex < chapters.length - 1) { save.chapterIndex++; save.pos = { x: 0, z: 6 }; loadChapter(save.chapterIndex, true); }
  else openDialogue("Month Six", [`${togetherTimer()}.`, "To be continued... Loading Month Six."]);
}
function toast(text) { questEl.textContent = text; setTimeout(updateHud, 1800); }

function bootMusic() {
  if (!settings.music || audio) return;
  const urls = [
    "https://p.scdn.co/mp3-preview/0d95bb81dbac4d96607c35dc8dae36a85b3e85ed?cid=2feb4729ba5145d7a7fd92f2af83cf0d",
    "https://p.scdn.co/mp3-preview/0dcffaf83437720696060e3a836b91eb9f47bba3?cid=2feb4729ba5145d7a7fd92f2af83cf0d"
  ];
  audio = new Audio(urls[musicIndex % urls.length]); audio.volume = 0.22; audio.onended = () => { audio = null; musicIndex++; bootMusic(); }; audio.play().catch(() => { audio = null; });
}
function stopMusic() { if (audio) { audio.pause(); audio = null; } }

function update(dt) {
  if (state !== "play" || dialogueOpen) return;
  velocity.set(0, 0, 0);
  if (moveTarget && !keys.size) {
    const dx = moveTarget.x - player.group.position.x;
    const dz = moveTarget.z - player.group.position.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.18) {
      moveTarget = null;
      interact();
    } else {
      velocity.set(dx / d, 0, dz / d);
    }
  }
  if (keys.has("KeyW") || keys.has("ArrowUp")) velocity.z -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) velocity.z += 1;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) velocity.x -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) velocity.x += 1;
  if (velocity.lengthSq() > 0) {
    if (keys.size) moveTarget = null;
    velocity.normalize().multiplyScalar(player.speed * dt);
    player.group.position.add(velocity);
    player.group.position.x = THREE.MathUtils.clamp(player.group.position.x, -11.2, 11.2);
    player.group.position.z = THREE.MathUtils.clamp(player.group.position.z, -8.2, 8.2);
    player.group.lookAt(player.group.position.clone().add(velocity));
    player.walk += dt * 12;
    player.legL.rotation.x = Math.sin(player.walk) * 0.55;
    player.legR.rotation.x = -Math.sin(player.walk) * 0.55;
    player.armL.rotation.x = -Math.sin(player.walk) * 0.45;
    player.armR.rotation.x = Math.sin(player.walk) * 0.45;
    player.cape.rotation.x = Math.sin(player.walk) * 0.08;
    save.pos = { x: player.group.position.x, z: player.group.position.z };
  }
  const follow = player.group.position.clone().add(new THREE.Vector3(-0.85, 0, 0.7));
  partner.group.position.lerp(follow, 0.045);
  partner.group.lookAt(player.group.position);
  const partnerMoving = partner.group.position.distanceTo(follow) > 0.08;
  if (partnerMoving) {
    partner.walk += dt * 9;
    partner.legL.rotation.x = Math.sin(partner.walk) * 0.45;
    partner.legR.rotation.x = -Math.sin(partner.walk) * 0.45;
    partner.armL.rotation.x = -Math.sin(partner.walk) * 0.35;
    partner.armR.rotation.x = Math.sin(partner.walk) * 0.35;
  }
  dragon.rotation.y += dt * 0.35; dragon.position.y = 5.2 + Math.sin(performance.now() / 800) * 0.22;
  pika.position.y = 0.45 + Math.sin(performance.now() / 280) * 0.06;
  save.playSeconds += dt;
  if (performance.now() - lastSave > 3000) { lastSave = performance.now(); persist(); updateHud(); }
  updatePrompt();
}
function render() {
  const dt = Math.min(clock.getDelta(), 0.05);
  update(dt);
  const target = player.group.position;
  const wide = settings.camera === "wide";
  camera.position.lerp(new THREE.Vector3(target.x, wide ? 14 : 10, target.z + (wide ? 13 : 9)), 0.06);
  camera.lookAt(target.x, 0.6, target.z - 1.5);
  animateWorld(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
function animateWorld(dt) {
  const now = performance.now() / 1000;
  for (const obj of objects) {
    const type = obj.userData.type;
    if (type === "shard" || type === "relic") {
      obj.rotation.y += dt * 1.5;
      obj.position.y = (type === "relic" ? 0.58 : 0.45) + Math.sin(now * 2.4 + obj.position.x) * 0.08;
    }
    if (type === "portal") {
      obj.rotation.y += dt * 0.5;
      obj.scale.setScalar(1 + Math.sin(now * 2) * 0.04);
    }
  }
  for (const item of animatables) {
    const p = item.phase || 0;
    if (item.kind === "water") item.mesh.material.opacity = 0.72 + Math.sin(now * 1.4) * 0.08;
    if (item.kind === "lantern") {
      item.mesh.scale.setScalar(1 + Math.sin(now * 2.2 + p) * 0.1);
      if (item.light) item.light.intensity = 0.65 + Math.sin(now * 2.2 + p) * 0.25;
    }
    if (item.kind === "sparkPlant") item.mesh.position.y = 0.18 + Math.sin(now * 1.8 + p) * 0.025;
    if (item.kind === "heart") item.mesh.scale.setScalar(1 + Math.sin(now * 3.5) * 0.12);
    if (item.kind === "star") item.mesh.scale.setScalar(0.75 + Math.sin(now * 2.8 + p) * 0.28);
    if (item.kind === "island") item.mesh.position.y = item.baseY + Math.sin(now * 0.9 + p) * 0.08;
    if (item.kind === "moon") item.mesh.scale.setScalar(1 + Math.sin(now * 0.9 + p) * 0.03);
  }
  dragon.rotation.y += dt * 0.55;
  dragon.rotation.z = Math.sin(now * 1.2) * 0.06;
  dragon.position.x = Math.sin(now * 0.28) * 1.8;
  dragon.position.y = 5.2 + Math.sin(now * 1.1) * 0.22;
  pika.rotation.y += dt * 2;
  pika.position.y = 0.45 + Math.sin(now * 4) * 0.06;
}
function updatePrompt() {
  let nearest = null, dist = 1.6;
  for (const obj of objects) {
    const p = new THREE.Vector3(); obj.getWorldPosition(p);
    const d = p.distanceTo(player.group.position);
    if (d < dist) { dist = d; nearest = obj; }
  }
  if (!nearest || dialogueOpen) {
    promptEl.classList.add("hidden");
    return;
  }
  promptEl.classList.remove("hidden");
  promptEl.textContent = `E / Enter: ${nearest.userData.label}`;
}

function onResize() { renderer.setSize(window.innerWidth, window.innerHeight); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); }
window.addEventListener("resize", onResize);
window.addEventListener("keydown", e => { keys.add(e.code); if (e.code === "KeyE" || e.code === "Enter" || e.code === "Space") interact(); if (e.code === "Escape") showTitle(); if (e.code === "KeyM") { settings.music = !settings.music; settings.music ? bootMusic() : stopMusic(); persistSettings(); } });
window.addEventListener("keyup", e => keys.delete(e.code));
canvas.addEventListener("pointerdown", e => {
  if (state !== "play") return;
  const r = canvas.getBoundingClientRect();
  pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(objects, true);
  if (!hits.length) return;
  const root = objects.find(o => o === hits[0].object || o.children.includes(hits[0].object) || o.children.some(c => c === hits[0].object));
  if (!root) return;
  const pos = new THREE.Vector3();
  root.getWorldPosition(pos);
  const away = player.group.position.clone().sub(pos);
  if (away.lengthSq() < 0.01) away.set(0.8, 0, 0.8);
  away.y = 0;
  away.normalize().multiplyScalar(0.85);
  moveTarget = new THREE.Vector3(pos.x + away.x, 0, pos.z + away.z);
});
dialogueEl.querySelector("button").addEventListener("click", nextDialogue);
overlay.addEventListener("click", e => {
  const menu = e.target.dataset.menu;
  if (menu === "new") return startGame(true);
  if (menu === "resume") return startGame(false);
  if (menu === "custom") return showCustom();
  if (menu === "settings") return showSettings();
  if (menu === "story") return showStory();
  if (menu === "back") return showTitle();
  if (e.target.dataset.player) { custom.player = e.target.dataset.player; save.custom = custom; persist(); showCustom(); }
  if (e.target.dataset.color) { const [name, c] = e.target.dataset.color.split(":"); custom[name].outfit = c; custom[name].aura = c; save.custom = custom; persist(); showCustom(); }
});
overlay.addEventListener("change", e => { if (e.target.id === "music") { settings.music = e.target.checked; settings.music ? bootMusic() : stopMusic(); } if (e.target.id === "bloom") settings.bloom = e.target.checked; if (e.target.id === "camera") settings.camera = e.target.value; persistSettings(); });
document.querySelectorAll("#mobile button").forEach(btn => {
  btn.addEventListener("pointerdown", e => { e.preventDefault(); const m = btn.dataset.m; const action = btn.dataset.action; if (m) keys.add({ up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD" }[m]); if (action === "interact") interact(); if (action === "menu") showTitle(); });
  btn.addEventListener("pointerup", () => { const m = btn.dataset.m; if (m) keys.delete({ up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD" }[m]); });
});
window.addEventListener("beforeunload", persist);
showTitle();
render();
