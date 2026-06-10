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
let dialogueQueue = [];
let dialogueOpen = false;
let musicIndex = 0;
let audio = null;
let lastSave = 0;

const shell = document.getElementById("game-shell");
shell.innerHTML = `
  <canvas id="world"></canvas>
  <section id="overlay" class="overlay"></section>
  <section id="dialogue" class="dialogue hidden"><h3></h3><p></p><button>Continue</button></section>
  <section id="hud" class="hud hidden"><div><strong id="place"></strong><span id="quest"></span></div><div id="relics"></div></section>
  <section id="mobile" class="mobile"><div class="pad"><button data-m="up">▲</button><button data-m="left">◀</button><button data-m="down">▼</button><button data-m="right">▶</button></div><div class="act"><button data-action="interact">E</button><button data-action="menu">☰</button></div></section>
`;

const canvas = document.getElementById("world");
const overlay = document.getElementById("overlay");
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

function newSave() {
  return { chapterIndex: 0, relics: [], visited: {}, custom: structuredClone(defaultCustom), playSeconds: 0, pos: { x: 0, z: 6 } };
}
function normalizeSave(raw) {
  const fresh = newSave();
  const merged = { ...fresh, ...(raw || {}) };
  merged.chapterIndex = Number.isFinite(merged.chapterIndex) ? merged.chapterIndex : 0;
  merged.relics = Array.isArray(merged.relics) ? merged.relics : [];
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
  const body = box(0.48, 0.78, 0.34, outfit); body.position.y = 0.78; g.add(body);
  const head = orb(0.28, skin); head.position.y = 1.36; g.add(head);
  const hair = new THREE.Group();
  const hairTop = box(0.62, 0.18, 0.46, kind === "player" ? 0x19172a : 0x8b5e3c); hairTop.position.y = 1.58; hair.add(hairTop);
  const hairSideL = box(0.13, 0.33, 0.38, kind === "player" ? 0x19172a : 0x8b5e3c); hairSideL.position.set(-0.27, 1.42, 0); hair.add(hairSideL);
  const hairSideR = hairSideL.clone(); hairSideR.position.x = 0.27; hair.add(hairSideR);
  g.add(hair);
  const legL = box(0.16, 0.52, 0.18, 0x263044); legL.position.set(-0.14, 0.22, 0); g.add(legL);
  const legR = legL.clone(); legR.position.x = 0.14; g.add(legR);
  const glow = new THREE.PointLight(color(aura), 0.8, 3.5); glow.position.y = 1.15; g.add(glow);
  return { group: g, body, head, hair, legL, legR, speed: 5.4, walk: 0, glow };
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
function loadChapter(index, resetPos = true) {
  save.chapterIndex = Math.max(0, Math.min(index, chapters.length - 1));
  activeChapter = chapters[save.chapterIndex];
  clearWorld();
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
  for (let x = -12; x <= 12; x++) for (let z = -9; z <= 9; z++) tile(x, z, (x + z) % 3 === 0 ? base + 0x050505 : base + 0x101010);
  for (let z = -8; z <= 7; z++) tile(0, z, accent, 0, 0.1);
  for (let x = -8; x <= 8; x++) tile(x, 0, accent, 0, 0.1);
  if (["skybridge", "sleepsea", "jam"].includes(ch.id)) {
    for (let x = -12; x <= 12; x++) for (let z of [-8, -7, 7, 8]) tile(x, z, 0x0e4164, -0.03, 0.06);
  }
  for (let i = 0; i < 34; i++) {
    const x = -11 + Math.random() * 22, z = -8 + Math.random() * 16;
    if (Math.abs(x) < 1.1 || Math.abs(z) < 1.1) continue;
    const p = cyl(0.05 + Math.random() * 0.04, 0.35, warm, 7); p.position.set(x, 0.18, z); world.add(p);
  }
}
function addObj(mesh, type, label, lines = []) { mesh.userData = { type, label, lines }; objects.push(mesh); world.add(mesh); return mesh; }
function buildChapterProps(ch) {
  const [, accent, warm] = ch.palette;
  const portal = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.08, 12, 48), new THREE.MeshStandardMaterial({ color: warm, emissive: warm, emissiveIntensity: 0.75 }));
  ring.rotation.x = Math.PI / 2; portal.add(ring);
  const orbCore = orb(0.32, warm, warm); orbCore.position.y = 0.35; portal.add(orbCore);
  portal.position.set(0, 0.3, -6.6); addObj(portal, "portal", ch.relic, ["The path forward answers only after this memory is understood."]);
  const relic = orb(0.35, warm, warm); relic.position.set(0, 0.58, -1.4); addObj(relic, "relic", ch.relic, ch.lines);
  const npc = ch.npc === "Ammara" ? dragon : ch.npc === "Pika" ? pika : mufliya;
  npc.position.x = 3.4; npc.position.z = -2.1; npc.position.y = ch.npc === "Ammara" ? 5.2 : 0.55;
  addObj(makeSign(-3.8, -2.1, ch.npc, warm), "npc", ch.npc, [ch.npcLine]);
  for (let i = 0; i < 5; i++) {
    const shard = orb(0.16, accent, accent); shard.position.set(-6 + i * 3, 0.45, 2 + Math.sin(i) * 2.4); addObj(shard, "shard", `Memory shard ${i + 1}`, [ch.lines[i % ch.lines.length]]);
  }
  if (ch.props === "cards") for (let i = 0; i < 5; i++) { const card = box(0.9, 0.08, 1.2, 0xffd6e8); card.position.set(-5 + i * 2.5, 0.15, -4.4); world.add(card); }
  if (ch.props === "aviary") for (let i = 0; i < 8; i++) { const bar = cyl(0.025, 3.2, 0xbfe9ff, 8); bar.position.set(-4 + i, 1.6, -3.9); world.add(bar); }
  if (ch.props === "bridge") for (let i = -7; i <= 7; i++) { const b = box(0.72, 0.18, 0.55, warm); b.position.set(i * 0.8, 0.08, -3.5 + Math.sin(i) * 0.2); world.add(b); }
  if (ch.props === "garden") for (let i = 0; i < 18; i++) { const flower = orb(0.08, i % 2 ? 0xff86b7 : 0xffd166, i % 2 ? 0xff86b7 : 0xffd166); flower.position.set(-8 + Math.random() * 16, 0.25, -5 + Math.random() * 9); world.add(flower); }
}
function makeSign(x, z, label, c) { const g = new THREE.Group(); const post = box(0.08, 0.7, 0.08, 0x6a4a2c); post.position.y = 0.35; const face = box(1.2, 0.4, 0.08, c); face.position.y = 0.82; g.add(post, face); g.position.set(x, 0, z); return g; }

function updateHud() {
  placeEl.textContent = `${activeChapter.title} · ${activeChapter.place}`;
  questEl.textContent = activeChapter.quest;
  relicsEl.textContent = `${save.relics.length}/${chapters.length} relics · ${formatTime(save.playSeconds)}`;
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
  if (type === "portal") return openDialogue("Portal", [`Continue after recovering ${activeChapter.relic}?`, "The realm folds into the next page of the story."], "portal");
  if (type === "relic") { if (!save.relics.includes(activeChapter.relic)) save.relics.push(activeChapter.relic); persist(); updateHud(); return openDialogue(label, lines); }
  if (type === "shard") return openDialogue(label, lines);
  if (type === "npc") return openDialogue(label, lines);
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
  if (keys.has("KeyW") || keys.has("ArrowUp")) velocity.z -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) velocity.z += 1;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) velocity.x -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) velocity.x += 1;
  if (velocity.lengthSq() > 0) {
    velocity.normalize().multiplyScalar(player.speed * dt);
    player.group.position.add(velocity);
    player.group.position.x = THREE.MathUtils.clamp(player.group.position.x, -11.2, 11.2);
    player.group.position.z = THREE.MathUtils.clamp(player.group.position.z, -8.2, 8.2);
    player.group.lookAt(player.group.position.clone().add(velocity));
    player.walk += dt * 12;
    player.legL.rotation.x = Math.sin(player.walk) * 0.55;
    player.legR.rotation.x = -Math.sin(player.walk) * 0.55;
    save.pos = { x: player.group.position.x, z: player.group.position.z };
  }
  const follow = player.group.position.clone().add(new THREE.Vector3(-0.85, 0, 0.7));
  partner.group.position.lerp(follow, 0.045);
  partner.group.lookAt(player.group.position);
  dragon.rotation.y += dt * 0.35; dragon.position.y = 5.2 + Math.sin(performance.now() / 800) * 0.22;
  pika.position.y = 0.45 + Math.sin(performance.now() / 280) * 0.06;
  save.playSeconds += dt;
  if (performance.now() - lastSave > 3000) { lastSave = performance.now(); persist(); updateHud(); }
}
function render() {
  const dt = Math.min(clock.getDelta(), 0.05);
  update(dt);
  const target = player.group.position;
  const wide = settings.camera === "wide";
  camera.position.lerp(new THREE.Vector3(target.x, wide ? 14 : 10, target.z + (wide ? 13 : 9)), 0.06);
  camera.lookAt(target.x, 0.6, target.z - 1.5);
  for (const obj of objects) obj.rotation.y += obj.userData.type === "shard" || obj.userData.type === "relic" ? dt : 0;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
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
  player.group.position.set(pos.x, 0, pos.z);
  interact();
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
