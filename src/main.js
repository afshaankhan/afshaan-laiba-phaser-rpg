const Phaser = window.Phaser;

const GAME_W = 960;
const GAME_H = 640;
const START_DATE = new Date("2026-01-09T16:00:00-06:00");
const SAVE_KEY = "afshaan-laiba-phaser-rpg-save";
const SETTINGS_KEY = "afshaan-laiba-phaser-rpg-settings";
const SAVE_VERSION = 2;

const COLOR_OPTIONS = {
  skin: [0xffe4d0, 0xf3c7a8, 0xd4a574],
  hair: [0x8b5e3c, 0x5b3724, 0x19172a],
  outfit: [0xe8526b, 0x5bb5f0, 0xc9a2d6, 0x1ed760, 0xffd166],
};

const DEFAULT_CUSTOM = {
  Afshaan: { skin: 0xd4a574, hair: 0x19172a, outfit: 0x5bb5f0 },
  Laiba: { skin: 0xffe4d0, hair: 0x8b5e3c, outfit: 0xe8526b },
};

const SONGS = [
  ["https://p.scdn.co/mp3-preview/0d95bb81dbac4d96607c35dc8dae36a85b3e85ed?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "wave to earth - light"],
  ["https://p.scdn.co/mp3-preview/2b54680ec8cc2e1da05133386a4f38d136e8e699?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "IU - I."],
  ["https://p.scdn.co/mp3-preview/e05a2e6a7ae824a7d9abbd24ae6e5a82eab82300?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "Strawberries & Cigarettes"],
  ["https://p.scdn.co/mp3-preview/52accf6e63669cbf49ff2fd90f2c5eabbf19183c?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "wave to earth - seasons"],
  ["https://p.scdn.co/mp3-preview/fde444400feafc967b6f103db30868df79c8ac3a9?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "Cigarettes After Sex - K."],
  ["https://p.scdn.co/mp3-preview/91e3e5adef583dc29b2e89dc2a5e9c7d7a12af68?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "Kali Uchis - Sincerely,"],
  ["https://p.scdn.co/mp3-preview/bd80cc6de9d0f89a92b3bca7d1e0842cce7b58f2?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "beabadoobee - Glue Song"],
  ["https://p.scdn.co/mp3-preview/68ef9a47c4da4d3b9bf08ab6e2cc36bfa9b27e68?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "TV Girl - Lovers Rock"],
  ["https://p.scdn.co/mp3-preview/0dcffaf83437720696060e3a836b91eb9f47bba3?cid=2feb4729ba5145d7a7fd92f2af83cf0d", "Mazzy Star - Fade Into You"],
];

const ORDER = ["world", "hinge", "chat", "distance", "facetime", "movies", "games", "spotify", "sleep", "morning", "ending"];
const CHAPTER_ORDER = ORDER.filter((key) => key !== "world");

const MEMORY_GOAL = {
  world: 0,
  hinge: 4,
  chat: 4,
  distance: 5,
  facetime: 5,
  movies: 4,
  games: 5,
  spotify: 4,
  sleep: 4,
  morning: 4,
  ending: 5,
};

const WORLD_GROWTH_GOALS = {
  frisco: 3,
  ellicott: 3,
  callBridge: 4,
  memoryTree: 5,
};

const WORLD_PLACES = {
  frisco: { label: "Frisco Room", target: "hinge", x: 112, y: 168, w: 190, h: 150 },
  ellicott: { label: "Ellicott City Room", target: "chat", x: 658, y: 168, w: 190, h: 150 },
  callBridge: { label: "Call Bridge", target: "distance", x: 377, y: 236, w: 206, h: 130 },
  memoryTree: { label: "Memory Tree", target: "ending", x: 377, y: 420, w: 206, h: 130 },
};

const WORLD_TASKS = [
  { id: "send-good-morning", place: "frisco", label: "Send good morning text", item: "Morning Note", reward: 1 },
  { id: "save-song", place: "callBridge", label: "Save a song for the Jam", item: "Shared Song", reward: 1 },
  { id: "plan-movie", place: "ellicott", label: "Plan movie night", item: "Movie Ticket", reward: 1 },
  { id: "practice-doodle", place: "memoryTree", label: "Practice Skribbl doodle", item: "Tiny Doodle", reward: 1 },
  { id: "charge-phone", place: "callBridge", label: "Charge phone before call", item: "Full Battery", reward: 1 },
  { id: "pack-kisses", place: "memoryTree", label: "Pack phone-screen kisses", item: "Pocket Kiss", reward: 1 },
  { id: "share-playlist", place: "callBridge", label: "Share playlist loop", item: "Playlist Loop", reward: 1 },
  { id: "write-check-in", place: "ellicott", label: "Write a soft check-in", item: "Soft Check-in", reward: 1 },
];

const MEMORY_LINES = {
  hinge_jan9: ["Memory shard: Jan 9, 2026.", "A random Friday became the day everything started."],
  hinge_pigeon: ["Memory shard: pigeon photo.", "The tiny pet photo that accidentally opened the whole story."],
  hinge_song: ["Memory shard: first song.", "Mystery of Love enters the save file."],
  hinge_firstspark: ["Memory shard: first spark.", "One joke. One reply. One new timeline."],
  chat_easy: ["Memory shard: easy talking.", "The conversation did not feel forced. That mattered."],
  chat_movie: ["Memory shard: Call Me By Your Name.", "A movie reference turned into a shared little universe."],
  chat_laugh: ["Memory shard: first laugh.", "The microwave joke survives as legendary lore."],
  chat_daily: ["Memory shard: daily texts.", "The small messages started becoming routine."],
  distance_frisco: ["Memory shard: Frisco.", "Afshaan's side of the map is saved."],
  distance_ellicott: ["Memory shard: Ellicott City.", "Laiba's side of the map is saved."],
  distance_miles: ["Memory shard: 1,300 miles.", "The map says far. The calls say close."],
  distance_bridge: ["Memory shard: bridge.", "FaceTime becomes the road between both homes."],
  distance_timezone: ["Memory shard: timing.", "Even schedules learn to bend around love."],
  facetime_daily: ["Memory shard: daily FaceTime.", "The call window becomes a room you both live in."],
  facetime_smile: ["Memory shard: watching smiles.", "Sometimes the screen is not the main thing."],
  facetime_kisses: ["Memory shard: screen kisses.", "Multiple kisses on the phone screen. Completely valid magic."],
  facetime_games: ["Memory shard: she plays.", "Laiba plays. Afshaan watches like it is cinema."],
  facetime_night: ["Memory shard: late calls.", "The day closes better when the call is still there."],
  movies_popcorn: ["Memory shard: popcorn.", "Two snacks. One movie night."],
  movies_meet: ["Memory shard: Google Meet.", "The distance gets screen-shared."],
  movies_reactions: ["Memory shard: reactions.", "He watches the movie, but also watches her."],
  movies_sync: ["Memory shard: synced time.", "Pressing play together counts as a date."],
  games_skribbl: ["Memory shard: Skribbl.", "The drawings are questionable. The fun is not."],
  games_npat: ["Memory shard: Name Place Animal Thing.", "Classic game. Serious competition."],
  games_winner: ["Memory shard: Laiba wins.", "Afshaan remains proudly biased."],
  games_cheer: ["Memory shard: cheering.", "Big fan behavior unlocked."],
  games_guess: ["Memory shard: impossible guess.", "HOW did you guess that from that?"],
  spotify_jam: ["Memory shard: Spotify Jam.", "Songs become checkpoints."],
  spotify_playlist: ["Memory shard: playlist.", "The soundtrack keeps looping through the story."],
  spotify_wave: ["Memory shard: wave to earth.", "Soft songs, softer feelings."],
  spotify_mystery: ["Memory shard: Mystery of Love.", "The first song keeps following you both."],
  sleep_phone: ["Memory shard: phone propped up.", "The call stays awake while you both fall asleep."],
  sleep_breathe: ["Memory shard: quiet breathing.", "Peaceful, tiny, real."],
  sleep_safe: ["Memory shard: safe feeling.", "Long distance loses another night."],
  sleep_dream: ["Memory shard: dream save.", "Autosaved before sunrise."],
  morning_text: ["Memory shard: good morning.", "The best notification of the day."],
  morning_window: ["Memory shard: sunrise.", "Morning makes the map warmer."],
  morning_routine: ["Memory shard: routine.", "Love is also repetition."],
  morning_next: ["Memory shard: next month.", "The story is designed for updates."],
  ending_hinge: ["Final shard: Hinge.", "Chapter one is archived."],
  ending_calls: ["Final shard: calls.", "Everyday calls are archived."],
  ending_movies: ["Final shard: movies.", "Movie nights are archived."],
  ending_games: ["Final shard: games.", "Game nights are archived."],
  ending_songs: ["Final shard: songs.", "The soundtrack is archived."],
};

const SCENE_MEMORY_ZONES = {
  hinge: [
    ["hinge_jan9", 96, 92, 130, 96, "Jan 9"],
    ["hinge_pigeon", 260, 270, 90, 90, "Pigeon photo"],
    ["hinge_song", 502, 342, 64, 64, "Mystery song"],
    ["hinge_firstspark", 765, 135, 80, 72, "First spark"],
  ],
  chat: [
    ["chat_easy", 362, 150, 210, 76, "Easy talking"],
    ["chat_movie", 610, 154, 280, 92, "Movie reference"],
    ["chat_laugh", 112, 160, 90, 90, "First laugh"],
    ["chat_daily", 458, 355, 90, 90, "Daily texts"],
  ],
  distance: [
    ["distance_frisco", 88, 148, 165, 160, "Frisco"],
    ["distance_ellicott", 716, 148, 165, 160, "Ellicott City"],
    ["distance_miles", 330, 226, 290, 92, "1,300 miles"],
    ["distance_bridge", 405, 368, 150, 100, "Call bridge"],
    ["distance_timezone", 390, 92, 180, 82, "Timing"],
  ],
  facetime: [
    ["facetime_daily", 60, 95, 190, 164, "Daily call"],
    ["facetime_smile", 585, 95, 190, 164, "Her smile"],
    ["facetime_kisses", 390, 298, 180, 76, "Screen kisses"],
    ["facetime_games", 700, 300, 160, 90, "She plays"],
    ["facetime_night", 130, 310, 160, 90, "Late calls"],
  ],
  movies: [
    ["movies_popcorn", 140, 450, 90, 58, "Popcorn"],
    ["movies_meet", 155, 84, 620, 92, "Google Meet"],
    ["movies_reactions", 420, 230, 160, 72, "Reactions"],
    ["movies_sync", 448, 350, 100, 80, "Synced play"],
  ],
  games: [
    ["games_skribbl", 220, 118, 520, 230, "Skribbl"],
    ["games_npat", 125, 395, 210, 90, "NPAT"],
    ["games_winner", 735, 398, 90, 90, "Winner"],
    ["games_cheer", 620, 390, 90, 90, "Cheer"],
    ["games_guess", 418, 250, 130, 70, "Impossible guess"],
  ],
  spotify: [
    ["spotify_jam", 350, 118, 260, 190, "Jam"],
    ["spotify_playlist", 70, 250, 250, 150, "Playlist"],
    ["spotify_wave", 650, 330, 120, 76, "wave to earth"],
    ["spotify_mystery", 640, 150, 280, 90, "Mystery of Love"],
  ],
  sleep: [
    ["sleep_phone", 455, 330, 90, 90, "Phone"],
    ["sleep_breathe", 402, 185, 156, 70, "Quiet"],
    ["sleep_safe", 145, 250, 250, 120, "Safe"],
    ["sleep_dream", 565, 250, 250, 120, "Dream"],
  ],
  morning: [
    ["morning_text", 262, 245, 420, 92, "Morning text"],
    ["morning_window", 340, 90, 280, 130, "Sunrise"],
    ["morning_routine", 118, 420, 170, 70, "Routine"],
    ["morning_next", 785, 420, 120, 70, "Next month"],
  ],
  ending: [
    ["ending_hinge", 215, 310, 70, 70, "Hinge"],
    ["ending_calls", 365, 310, 70, 70, "Calls"],
    ["ending_movies", 515, 310, 70, 70, "Movies"],
    ["ending_games", 665, 310, 70, 70, "Games"],
    ["ending_songs", 450, 398, 70, 70, "Songs"],
  ],
};

const SCENES = {
  world: {
    title: "Together World",
    quest: "Grow places, complete errands, then enter memories",
    palette: ["0x0d1828", "0x14283d", "0x244765"],
    start: [480, 500],
    partner: [535, 500],
    props: [
      ["worldPlace", 112, 168, "Frisco Room"],
      ["worldPlacePink", 658, 168, "Ellicott City Room"],
      ["worldBridge", 377, 236, "Call Bridge"],
      ["worldTree", 377, 420, "Memory Tree"],
      ["memory", 480, 128, "Togetherness"],
    ],
    zones: [
      { type: "world_frisco", x: 112, y: 168, w: 190, h: 150, label: "Frisco Room" },
      { type: "world_ellicott", x: 658, y: 168, w: 190, h: 150, label: "Ellicott City" },
      { type: "world_bridge", x: 377, y: 236, w: 206, h: 130, label: "Call Bridge" },
      { type: "world_tree", x: 377, y: 420, w: 206, h: 130, label: "Memory Tree" },
      { type: "world_errand", x: 424, y: 112, w: 112, h: 92, label: "Errand Board" },
    ],
  },
  hinge: {
    title: "Jan 9, 2026 - Hinge Match",
    quest: "Inspect the Hinge phone",
    palette: ["0x141326", "0x211a3a", "0x31234d"],
    start: [390, 475],
    partner: [570, 475],
    props: [
      ["calendar", 96, 92, "JAN 9"],
      ["phone", 430, 214, "Hinge phone"],
      ["pigeon", 260, 270, "photo"],
      ["desk", 356, 400, "random Friday"],
      ["memory", 765, 135, "first spark"],
    ],
    zones: [{ type: "phone", x: 430, y: 214, w: 120, h: 184, label: "Hinge phone" }],
  },
  chat: {
    title: "First Messages",
    quest: "Read the first message memory",
    palette: ["0x111225", "0x1b1933", "0x2f2446"],
    start: [150, 475],
    partner: [810, 475],
    props: [
      ["chat", 240, 145, "Is that inside a microwave??"],
      ["music", 610, 154, "Mystery of Love"],
      ["memory", 458, 355, "message memory"],
      ["pigeon", 112, 160, "the pet photo"],
    ],
    zones: [{ type: "chat_scene", x: 360, y: 300, w: 240, h: 130, label: "Message memory" }],
  },
  distance: {
    title: "Frisco <-> Ellicott City",
    quest: "Visit both homes, then open FaceTime",
    palette: ["0x10182c", "0x14213a", "0x263655"],
    start: [110, 500],
    partner: [850, 500],
    props: [
      ["houseBlue", 90, 150, "Frisco, Texas"],
      ["housePink", 720, 150, "Ellicott City"],
      ["planePath", 280, 265, "1,300 miles"],
      ["laptop", 402, 365, "FaceTime bridge"],
    ],
    zones: [
      { type: "frisco", x: 88, y: 148, w: 165, h: 160, label: "Frisco TX" },
      { type: "baltimore", x: 716, y: 148, w: 165, h: 160, label: "Ellicott City" },
      { type: "facetime_btn", x: 405, y: 368, w: 150, h: 100, label: "Open FaceTime" },
    ],
  },
  facetime: {
    title: "FaceTime Every Day",
    quest: "Step into movie night",
    palette: ["0x0d0d1a", "0x151d34", "0x342038"],
    start: [168, 485],
    partner: [790, 485],
    props: [
      ["screenBlue", 60, 95, "Afshaan's screen"],
      ["screenPink", 585, 95, "Laiba's screen"],
      ["laptop", 405, 170, "Google Meet"],
      ["hearts", 150, 200, "daily call"],
    ],
    zones: [{ type: "facetime_next", x: 386, y: 500, w: 188, h: 90, label: "Movie Night" }],
  },
  movies: {
    title: "Google Meet Movie Night",
    quest: "Open the game-night portal",
    palette: ["0x181830", "0x211f3b", "0x30294a"],
    start: [250, 480],
    partner: [710, 480],
    props: [
      ["theater", 155, 84, "synced movie"],
      ["popcorn", 140, 450, "popcorn"],
      ["popcorn", 765, 450, "popcorn"],
      ["memory", 448, 350, "same movie"],
    ],
    zones: [{ type: "next", x: 388, y: 500, w: 184, h: 90, label: "Game Night" }],
  },
  games: {
    title: "Skribbl + Name Place Animal Thing",
    quest: "Start the Spotify portal",
    palette: ["0x241a34", "0x35264f", "0x493166"],
    start: [238, 474],
    partner: [720, 474],
    props: [
      ["skribbl", 220, 118, "Skribbl board"],
      ["cards", 125, 395, "Name Place Animal Thing"],
      ["memory", 735, 398, "Laiba wins"],
    ],
    zones: [{ type: "next2", x: 388, y: 500, w: 184, h: 90, label: "Spotify Jam" }],
  },
  spotify: {
    title: "Spotify Jam",
    quest: "Start the sleep-call portal",
    palette: ["0x081910", "0x102218", "0x173a25"],
    start: [250, 480],
    partner: [710, 480],
    props: [
      ["equalizer", 70, 250, "playlist"],
      ["album", 350, 118, "Now playing"],
      ["music", 640, 150, "songs together"],
    ],
    zones: [{ type: "next3", x: 388, y: 500, w: 184, h: 90, label: "Sleep Call" }],
  },
  sleep: {
    title: "Sleep on Call",
    quest: "Wake up into the morning scene",
    palette: ["0x080a18", "0x12142b", "0x1e203d"],
    start: [285, 485],
    partner: [675, 485],
    props: [
      ["bedBlue", 145, 250, "Afshaan"],
      ["bedPink", 565, 250, "Laiba"],
      ["phoneSmall", 455, 330, "call still on"],
      ["zzz", 208, 168, "quiet"],
    ],
    zones: [{ type: "next4", x: 388, y: 500, w: 184, h: 90, label: "Morning" }],
  },
  morning: {
    title: "Good Morning",
    quest: "Open the anniversary sunrise",
    palette: ["0xffecd2", "0xfcb69f", "0xff8cb3"],
    start: [280, 490],
    partner: [680, 490],
    props: [
      ["sunrise", 340, 90, "Good morning, beautiful"],
      ["chat", 262, 245, "daily ritual"],
      ["flowers", 118, 420, "morning garden"],
      ["flowers", 785, 420, "morning garden"],
    ],
    zones: [{ type: "next5", x: 388, y: 500, w: 184, h: 90, label: "5 Months" }],
  },
  ending: {
    title: "Five Months Together",
    quest: "Explore the final memory garden",
    palette: ["0x17052d", "0x2c1550", "0x071520"],
    start: [385, 455],
    partner: [575, 455],
    props: [
      ["garden", 70, 512, "memory garden"],
      ["titleStone", 285, 110, "Afshaan + Laiba"],
      ["memory", 215, 310, "Hinge"],
      ["memory", 365, 310, "calls"],
      ["memory", 515, 310, "movies"],
      ["memory", 665, 310, "songs"],
    ],
    zones: [{ type: "replay", x: 395, y: 520, w: 170, h: 78, label: "Play Again" }],
  },
};

const DIALOGUE = {
  phone: [
    "You replied to her pigeon photo on Hinge.",
    "Afshaan: Is that inside a microwave??",
    "Laiba: it's his cage 😭",
    "Then she sent Mystery of Love.",
    "Random Friday, Jan 9, 2026 became Chapter One.",
  ],
  chat_scene: [
    "The first messages felt weirdly easy.",
    "A pigeon, a joke, a song, and Call Me By Your Name.",
    "Somehow one tiny reply became every-day talking.",
    "New objective unlocked: survive 1,300 miles.",
  ],
  frisco: [
    "Frisco, Texas - Afshaan's side of the map.",
    "Laptop open. Phone charged. Waiting for her call.",
    "Distance: huge. Feelings: larger.",
  ],
  baltimore: [
    "Ellicott City / Baltimore - Laiba's side of the map.",
    "Her screen lights up and the whole map feels warmer.",
    "She is far, but never feels absent.",
  ],
  facetime_btn: [
    "FaceTime every day.",
    "Two homes. One call. Same little world.",
    "Movies, games, songs, sleep calls - all through a screen.",
    "Entering FaceTime realm...",
  ],
  facetime_next: [
    "FaceTime Daily Quest complete.",
    "Next memory: Google Meet movie nights.",
    "She watches the movie. He watches her reactions.",
  ],
  next: ["Movie night complete.", "Popcorn on two sides of the country.", "Next memory: chaotic game nights."],
  next2: ["Skribbl. Name Place Animal Thing.", "Laiba plays. Afshaan watches. Laiba wins.", "Afshaan still cheers like it is the finals."],
  next3: ["Spotify Jam unlocked.", "Every song becomes a little checkpoint.", "Mystery of Love keeps following them."],
  next4: ["Sleep on call.", "Phones propped up. Quiet breathing. Safe feeling.", "Distance loses another round."],
  next5: ["Good morning, beautiful.", "A daily ritual. A tiny spell.", "Five months later, still the best notification."],
};

class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    const base = "assets/vendor/gentle-forest/";
    this.load.image("gf_cover", `${base}gentle-forest-cover.png`);
    this.load.image("gf_sheet", `${base}gentle-forest-sheet.png`);
    this.load.image("gf_supertile", `${base}gentle-forest-supertile.png`);
    this.load.image("gf_palettes", `${base}gentle-forest-palettes-free.png`);
    this.load.image("gf_sample", `${base}gentle-forest-sample-map.png`);
    this.load.image("gf_waterfall", `${base}gentle-forest-waterfall.gif`);
    this.load.image("gf_scene", `${base}gentle-forest-character-scene.gif`);
  }

  create() {
    this.makeSprites();
    this.scene.start("Game");
  }

  makeSprites() {
    this.makeCharacterSet("afshaan", DEFAULT_CUSTOM.Afshaan.outfit, DEFAULT_CUSTOM.Afshaan.skin, DEFAULT_CUSTOM.Afshaan.hair, "Afshaan");
    this.makeCharacterSet("laiba", DEFAULT_CUSTOM.Laiba.outfit, DEFAULT_CUSTOM.Laiba.skin, DEFAULT_CUSTOM.Laiba.hair, "Laiba");
    this.makeIcon("heart", 0xff8cb3);
    this.makeIcon("spark", 0xffd166);
  }

  makeCharacterSet(key, outfit, skin, hair, name = key) {
    ["down", "up", "left", "right"].forEach((dir) => {
      for (let frame = 0; frame < 3; frame += 1) this.makeCharacterFrame(`${key}_${dir}_${frame}`, outfit, skin, hair, name, dir, frame);
    });
    this.makeCharacterFrame(key, outfit, skin, hair, name, "down", 1);
  }

  makeCharacterFrame(key, outfit, skin, hair, name, dir, frame) {
    const g = this.add.graphics();
    const bob = frame === 1 ? -1 : 0;
    const step = frame === 0 ? -3 : frame === 2 ? 3 : 0;
    g.fillStyle(0x000000, 0.24).fillEllipse(20, 65, 30, 8);
    g.fillStyle(outfit).fillRect(9, 24 + bob, 22, 30);
    g.lineStyle(1, 0x000000, 0.28).strokeRect(9, 24 + bob, 22, 30);
    g.fillStyle(skin).fillRect(12, 8, 16, 16);
    g.fillStyle(hair);
    if (name === "Afshaan") {
      g.fillRect(10, 3, 20, 8).fillRect(10, 9, 4, 10).fillRect(26, 9, 4, 10);
    } else {
      g.fillRect(10, 2, 20, 8).fillRect(9, 8, 5, 20).fillRect(26, 8, 5, 20).fillStyle(0xa97954).fillRect(14, 0, 12, 4);
    }
    if (dir !== "up") {
      g.fillStyle(0xffffff).fillRect(dir === "left" ? 14 : 15, 14, 3, 3).fillRect(dir === "right" ? 23 : 22, 14, 3, 3);
      g.fillStyle(0x111111).fillRect(dir === "left" ? 15 : 16, 15, 2, 2).fillRect(dir === "right" ? 24 : 23, 15, 2, 2);
    }
    g.fillStyle(0xc9767a).fillRect(18, 20, 4, 2);
    g.fillStyle(0xff8ca0, 0.55).fillRect(13, 18, 3, 2).fillRect(24, 18, 3, 2);
    g.fillStyle(0x353548).fillRect(11 + Math.max(0, step), 54, 7, 12).fillRect(22 + Math.min(0, step), 54, 7, 12);
    g.fillStyle(0x222232).fillRect(10 + Math.max(0, step), 64, 8, 4).fillRect(23 + Math.min(0, step), 64, 8, 4);
    g.generateTexture(key, 40, 72);
    g.destroy();
  }

  makeIcon(key, color) {
    const g = this.add.graphics();
    g.fillStyle(color).fillRect(6, 2, 8, 8).fillRect(18, 2, 8, 8).fillRect(2, 10, 28, 8).fillRect(7, 18, 18, 8).fillRect(12, 26, 8, 4);
    g.generateTexture(key, 32, 32);
    g.destroy();
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    this.mode = "title";
    this.sceneKey = "hinge";
    this.playerChoice = "";
    this.dialogue = [];
    this.dialogueIndex = 0;
    this.dialogueNext = null;
    this.musicOn = true;
    this.songIndex = Math.floor(Math.random() * SONGS.length);
    this.audio = null;
    this.virtual = { up: false, down: false, left: false, right: false };
    this.progress = this.defaultProgress();
    this.playStartedAt = Date.now();
    this.nextAutosaveAt = 0;
    this.playerDir = "down";
    this.partnerDir = "down";
    this.walkClock = 0;
    this.customizing = "Laiba";
    this.customization = structuredClone(DEFAULT_CUSTOM);
    this.settings = this.loadSettings();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D,E,M,ENTER,SPACE");
    this.input.keyboard.on("keydown", (event) => this.handleKey(event));
    this.ui = this.add.container(0, 0).setDepth(100);
    this.map = this.add.container(0, 0);
    this.mobileControls();
    const saved = this.loadSave();
    if (saved?.playerChoice && saved?.sceneKey) {
      this.mode = "title";
      this.saved = saved;
      this.progress = { ...this.defaultProgress(), ...(saved.progress || {}) };
      this.customization = { ...structuredClone(DEFAULT_CUSTOM), ...(saved.customization || {}) };
      this.playStartedAt = Date.now();
    }
    this.drawTitle();
    this.input.on("pointerdown", (pointer) => this.handlePointer(pointer));
    window.addEventListener("beforeunload", () => {
      if (this.mode === "play") this.save(false);
    });
  }

  update(time) {
    if (this.mode === "play" && this.playTimeText) this.playTimeText.setText(`play time ${this.formatPlayTime()}`);
    if (this.mode !== "play" || this.dialogue.length || this.journalOpen) return;
    if (time > this.nextAutosaveAt) {
      this.nextAutosaveAt = time + 5000;
      this.save(false);
    }
    const speed = 172;
    const body = this.player.body;
    const left = this.cursors.left.isDown || this.keys.A.isDown || this.virtual.left;
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.virtual.right;
    const up = this.cursors.up.isDown || this.keys.W.isDown || this.virtual.up;
    const down = this.cursors.down.isDown || this.keys.S.isDown || this.virtual.down;
    body.setVelocity(0);
    if (left) body.setVelocityX(-speed);
    if (right) body.setVelocityX(speed);
    if (up) body.setVelocityY(-speed);
    if (down) body.setVelocityY(speed);
    body.velocity.normalize().scale(speed);
    const moving = left || right || up || down;
    if (left) this.playerDir = "left";
    else if (right) this.playerDir = "right";
    else if (up) this.playerDir = "up";
    else if (down) this.playerDir = "down";
    if (moving) {
      this.walkClock += 1;
      this.emitHeart();
    }
    this.updateActorTexture(this.player, this.playerTextureKey, this.playerDir, moving);
    this.followPartner();
    if (this.sceneKey === "ending" && this.timerText) this.timerText.setText(this.loveTimer());
  }

  handleKey(event) {
    const key = event.key;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(key)) event.preventDefault();
    if (key === "m" || key === "M") {
      this.toggleMusic();
      return;
    }
    if (key === "j" || key === "J") {
      if (this.mode === "play") this.toggleJournal();
      return;
    }
    if (key === "s" || key === "S") {
      if (this.mode === "play") this.save(true);
      return;
    }
    if (key === "Escape" && this.journalOpen) {
      this.toggleJournal(false);
      return;
    }
    if (key === "Escape" && this.mode === "play") {
      this.save(false);
      this.drawSettings(true);
      return;
    }
    if (key === "Escape" && ["settings", "customize", "select"].includes(this.mode)) {
      if (this.mode === "settings" && this.settingsReturnToPlay) this.startRun(this.playerChoice, this.sceneKey, { reset: false });
      else this.drawTitle();
      return;
    }
    if (key === "o" || key === "O") {
      if (this.mode === "play") {
        this.save(false);
        this.drawSettings(true);
      } else {
        this.drawSettings(false);
      }
      return;
    }
    if ((key === "c" || key === "C") && this.mode !== "play") {
      this.drawCustomize("Laiba");
      return;
    }
    if (key === "Enter" || key === " " || key === "e" || key === "E") {
      if (this.mode === "settings" && this.settingsReturnToPlay) {
        this.startRun(this.playerChoice, this.sceneKey, { reset: false });
        return;
      }
      if (this.mode === "title") {
        this.drawSelect();
        return;
      }
      if (this.dialogue.length) {
        this.advanceDialogue();
        return;
      }
      if (this.mode === "play") this.tryInteract();
    }
  }

  drawTitle() {
    this.clearAll();
    this.mode = "title";
    this.drawBackdrop(0x090814, 0x1d0d37);
    this.addText(GAME_W / 2, 150, "Afshaan ♡ Laiba", 46, "#ffd6e8", true);
    this.addText(GAME_W / 2, 205, "A Complete Browser RPG", 20, "#f0e6d3");
    this.addText(GAME_W / 2, 240, "5 months together · made for monthly updates", 14, "#ff8cb3");
    this.add.image(GAME_W / 2 - 90, 375, "afshaan").setScale(2);
    this.add.image(GAME_W / 2 + 90, 375, "laiba").setScale(2);
    this.drawButton(GAME_W / 2 - 292, 485, 174, 42, "New Game", () => this.drawSelect());
    this.drawButton(GAME_W / 2 - 87, 485, 174, 42, "Customize", () => this.drawCustomize("Laiba"));
    this.drawButton(GAME_W / 2 + 118, 485, 174, 42, "Settings", () => this.drawSettings());
    if (this.saved) this.drawButton(GAME_W / 2 - 112, 538, 224, 40, "Continue Save", () => this.startRun(this.saved.playerChoice, this.saved.sceneKey, { reset: false }));
    this.addText(GAME_W / 2, 604, "ENTER starts · C customize · O settings", 11, "#aaa");
  }

  drawSelect() {
    this.clearAll();
    this.mode = "select";
    this.drawTiledFloor([0x0d0d1f, 0x191633, 0x2b2442]);
    this.addText(GAME_W / 2, 130, "Choose Your Character", 32, "#f0e6d3", true);
    this.drawCard(230, 205, "Afshaan", "Frisco, Texas", "afshaan", "#5bb5f0");
    this.drawCard(530, 205, "Laiba", "Ellicott City, Baltimore", "laiba", "#e8526b");
    if (this.saved) {
      const btn = this.drawButton(GAME_W / 2 - 115, 535, 230, 44, "Continue saved game", () => this.startRun(this.saved.playerChoice, this.saved.sceneKey, { reset: false }));
      btn.setData("action", "continue");
    }
    this.addText(GAME_W / 2, 595, "Click a card to customize first · ESC returns", 11, "#aaa");
  }

  drawCustomize(name = this.customizing) {
    this.clearAll();
    this.mode = "customize";
    this.customizing = name;
    this.drawTiledFloor([0x101020, 0x1d1934, 0x2c2444]);
    this.ensureCustomTextures();
    const key = name === "Laiba" ? "player_laiba" : "player_afshaan";
    const colors = this.customization[name];
    this.addText(GAME_W / 2, 94, "Character Customization", 30, "#ffd6e8", true);
    this.addText(GAME_W / 2, 124, `Playing as ${name}`, 14, "#f0e6d3");
    this.add.rectangle(GAME_W / 2, 280, 210, 250, 0x000000, 0.32).setStrokeStyle(3, colors.outfit);
    this.add.image(GAME_W / 2, 282, key).setScale(3);
    this.addText(GAME_W / 2, 430, "16-bit grounded walk sprite", 11, "#aaa");
    this.drawSwatchRow(140, 190, "Skin", "skin", colors.skin);
    this.drawSwatchRow(140, 285, "Hair", "hair", colors.hair);
    this.drawSwatchRow(140, 380, "Outfit", "outfit", colors.outfit);
    this.drawButton(650, 188, 190, 42, name === "Laiba" ? "Edit Afshaan" : "Edit Laiba", () => this.drawCustomize(name === "Laiba" ? "Afshaan" : "Laiba"));
    this.drawButton(650, 248, 190, 42, `Start as ${name}`, () => this.startRun(name, "world", { reset: true }));
    this.drawButton(650, 308, 190, 42, "Character Select", () => this.drawSelect());
    this.drawButton(650, 368, 190, 42, "Settings", () => this.drawSettings());
    this.drawButton(650, 428, 190, 42, "Back", () => this.drawTitle());
    this.addText(GAME_W / 2, 584, "Customization is saved with your game. ESC returns.", 11, "#aaa");
  }

  drawSwatchRow(x, y, label, field, selected) {
    this.addText(x, y, label, 13, "#f0e6d3", true).setOrigin(0, 0.5);
    COLOR_OPTIONS[field].forEach((color, i) => {
      const cx = x + 100 + i * 54;
      const swatch = this.add.rectangle(cx, y, 36, 36, color, 1).setStrokeStyle(selected === color ? 4 : 2, selected === color ? 0xffd166 : 0xffffff, selected === color ? 1 : 0.35);
      swatch.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
        this.customization[this.customizing][field] = color;
        this.saveSettings();
        this.drawCustomize(this.customizing);
      });
    });
  }

  drawSettings(returnToPlay = false) {
    this.clearAll();
    this.mode = "settings";
    this.settingsReturnToPlay = returnToPlay;
    this.dialogue = [];
    this.dialogueIndex = 0;
    this.dialogueNext = null;
    this.journalOpen = false;
    this.drawBackdrop(0x090814, 0x1a1a32);
    this.addText(GAME_W / 2, 100, "Settings", 34, "#ffd6e8", true);
    this.addText(GAME_W / 2, 135, "Game feel, audio, display, and save controls", 13, "#aaa");
    this.drawSettingsRow(245, 205, "Music", this.settings.music ? "ON" : "OFF", () => {
      this.settings.music = !this.settings.music;
      this.musicOn = this.settings.music;
      this.saveSettings();
      this.drawSettings(returnToPlay);
    });
    this.drawSettingsRow(245, 265, "Volume", `${Math.round(this.settings.volume * 100)}%`, () => {
      this.settings.volume = this.settings.volume >= 0.8 ? 0.2 : this.settings.volume + 0.2;
      if (this.audio) this.audio.volume = this.settings.volume;
      this.saveSettings();
      this.drawSettings(returnToPlay);
    });
    this.drawSettingsRow(245, 325, "Particles", this.settings.particles ? "ON" : "OFF", () => {
      this.settings.particles = !this.settings.particles;
      this.saveSettings();
      this.drawSettings(returnToPlay);
    });
    this.drawSettingsRow(245, 385, "Fullscreen", "TOGGLE", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    });
    this.drawSettingsRow(245, 445, "Reset Save", "CLEAR", () => {
      localStorage.removeItem(SAVE_KEY);
      this.saved = null;
      this.progress = this.defaultProgress();
      this.drawSettings(returnToPlay);
    }, "#e8526b");
    if (returnToPlay) {
      this.drawButton(GAME_W / 2 - 205, 535, 190, 44, "Resume", () => this.startRun(this.playerChoice, this.sceneKey, { reset: false }));
      this.drawButton(GAME_W / 2 + 15, 535, 190, 44, "Title", () => this.drawTitle());
    } else {
      this.drawButton(GAME_W / 2 - 95, 535, 190, 44, "Back", () => this.drawTitle());
    }
    this.addText(GAME_W / 2, 594, "Tip: in-game keys are J journal, S save, M music, ESC close menu.", 11, "#aaa");
  }

  drawSettingsRow(x, y, label, value, onClick, color = "#ffd166") {
    this.add.rectangle(GAME_W / 2, y, 470, 44, 0x000000, 0.46).setStrokeStyle(2, 0xc9a2d6, 0.45);
    this.addText(x, y + 4, label, 13, "#f0e6d3", true).setOrigin(0, 0.5);
    this.drawButton(x + 255, y - 20, 150, 40, value, onClick);
    this.children.getAll().at(-1)?.list?.[1]?.setColor?.(color);
  }

  startRun(choice, sceneKey = "world", options = {}) {
    this.playerChoice = choice;
    this.sceneKey = sceneKey;
    this.mode = "play";
    if (options.reset) this.progress = this.defaultProgress();
    this.playStartedAt = Date.now();
    this.startMusic();
    this.loadMap(sceneKey);
  }

  loadMap(key) {
    this.clearAll();
    this.mode = "play";
    this.sceneKey = key;
    const data = SCENES[key];
    this.drawTiledFloor(data.palette);
    this.drawGentleForestBackdrop(key);
    this.drawProps(data.props);
    this.drawZones(data.zones);
    this.drawMemoryZones(key);
    this.walls = this.physics.add.staticGroup();
    this.makeWalls();
    const pKey = this.playerChoice === "Laiba" ? "player_laiba" : "player_afshaan";
    const partnerKey = this.playerChoice === "Laiba" ? "afshaan" : "laiba";
    this.ensureCustomTextures();
    this.playerTextureKey = pKey;
    this.partnerTextureKey = partnerKey;
    this.playerDir = "down";
    this.partnerDir = "down";
    this.player = this.physics.add.sprite(data.start[0], data.start[1], pKey).setScale(1.35).setDepth(20);
    this.partner = this.physics.add.sprite(data.partner[0], data.partner[1], partnerKey).setScale(1.2).setDepth(19);
    if (this.saved?.progress?.lastScene === key && this.saved.progress.lastPosition) {
      this.player.setPosition(this.saved.progress.lastPosition.x, this.saved.progress.lastPosition.y);
    }
    this.player.body.setSize(24, 28).setOffset(8, 38);
    this.partner.body.setSize(24, 28).setOffset(8, 38);
    this.physics.add.collider(this.player, this.walls);
    this.drawHud();
    this.save();
  }

  makeWalls() {
    const rects = [
      [0, 0, GAME_W, 50],
      [0, GAME_H - 34, GAME_W, 34],
      [0, 0, 14, GAME_H],
      [GAME_W - 14, 0, 14, GAME_H],
    ];
    for (const r of rects) {
      const wall = this.add.rectangle(r[0] + r[2] / 2, r[1] + r[3] / 2, r[2], r[3], 0x000000, 0);
      this.physics.add.existing(wall, true);
      this.walls.add(wall);
    }
  }

  tryInteract() {
    if (this.dialogue.length) {
      this.advanceDialogue();
      return;
    }
    const memory = this.memoryZones?.find((z) => Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), z.rect) || Phaser.Math.Distance.Between(this.player.x, this.player.y, z.cx, z.cy) < 96);
    if (memory) {
      this.collectMemory(memory);
      return;
    }
    const zone = this.zones?.find((z) => Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), z.rect) || Phaser.Math.Distance.Between(this.player.x, this.player.y, z.cx, z.cy) < 116);
    if (zone) this.trigger(zone.type);
    else if (this.zones?.length === 1) this.trigger(this.zones[0].type);
  }

  trigger(type) {
    if (type === "replay") {
      localStorage.removeItem(SAVE_KEY);
      this.saved = null;
      this.drawTitle();
      return;
    }
    const nextMap = {
      phone: "world",
      chat_scene: "world",
      facetime_btn: "world",
      facetime_next: "world",
      next: "world",
      next2: "world",
      next3: "world",
      next4: "world",
      next5: "world",
    };
    if (type.startsWith("world_")) {
      this.handleWorldAction(type);
      return;
    }
    if (nextMap[type] && this.sceneKey !== "world" && !this.sceneReadyToLeave(this.sceneKey)) {
      this.showDialogue([
        "Chapter gate locked.",
        `Collect ${this.remainingMemories(this.sceneKey)} more memory shard${this.remainingMemories(this.sceneKey) === 1 ? "" : "s"} in this map first.`,
        "Check the journal with J if you need the chapter list.",
      ], null);
      return;
    }
    if (nextMap[type] && this.sceneKey !== "world") this.markChapterComplete(this.sceneKey);
    this.showDialogue(DIALOGUE[type] || ["Memory unlocked."], nextMap[type] ? () => this.loadMap(nextMap[type]) : null);
  }

  handleWorldAction(type) {
    if (type === "world_errand") {
      this.runErrand();
      return;
    }
    const map = {
      world_frisco: ["frisco", "hinge"],
      world_ellicott: ["ellicott", "chat"],
      world_bridge: ["callBridge", this.nextBridgeMemory()],
      world_tree: ["memoryTree", this.nextTreeMemory()],
    };
    const [place, target] = map[type] || [];
    if (!place || !target) return;
    if (!this.placeReady(place, target)) {
      this.showDialogue([
        `${WORLD_PLACES[place].label} needs more care first.`,
        `Complete errands and grow it to level ${this.placeRequiredLevel(place, target)}.`,
        "Use the Errand Board near the top of Together World.",
      ], null);
      return;
    }
    this.showDialogue([
      `Entering ${WORLD_PLACES[place].label}.`,
      "Explore it, collect every shard, then return to Together World.",
    ], () => this.loadMap(target));
  }

  nextBridgeMemory() {
    if (!this.progress.completedChapters.includes("distance")) return "distance";
    if (!this.progress.completedChapters.includes("facetime")) return "facetime";
    if (!this.progress.completedChapters.includes("movies")) return "movies";
    return "spotify";
  }

  nextTreeMemory() {
    if (!this.progress.completedChapters.includes("games")) return "games";
    if (!this.progress.completedChapters.includes("sleep")) return "sleep";
    if (!this.progress.completedChapters.includes("morning")) return "morning";
    return "ending";
  }

  placeRequiredLevel(place, target) {
    if (target === "hinge" || target === "chat") return 0;
    if (target === "distance" || target === "games") return 1;
    if (target === "facetime" || target === "sleep") return 2;
    if (target === "movies" || target === "morning") return 3;
    return 4;
  }

  placeReady(place, target) {
    return (this.progress.growth[place] || 0) >= this.placeRequiredLevel(place, target);
  }

  runErrand() {
    const task = WORLD_TASKS.find((t) => !this.progress.completedTasks.includes(t.id));
    if (!task) {
      this.showDialogue([
        "Errand Board complete.",
        "All daily-love tasks are done for this build.",
        "Together World is fully grown for the current story.",
      ], null);
      return;
    }
    this.progress.completedTasks.push(task.id);
    this.progress.inventory.push(task.item);
    this.progress.growth[task.place] = Math.min(WORLD_GROWTH_GOALS[task.place], (this.progress.growth[task.place] || 0) + task.reward);
    this.save();
    this.showDialogue([
      `Errand complete: ${task.label}.`,
      `Item received: ${task.item}.`,
      `${WORLD_PLACES[task.place].label} growth is now ${this.progress.growth[task.place]} / ${WORLD_GROWTH_GOALS[task.place]}.`,
    ], () => this.drawHud());
  }

  defaultProgress() {
    return {
      version: SAVE_VERSION,
      collected: [],
      completedChapters: [],
      completedTasks: [],
      inventory: [],
      growth: { frisco: 0, ellicott: 0, callBridge: 0, memoryTree: 0 },
      totalPlaySeconds: 0,
      lastScene: "world",
      lastPosition: null,
    };
  }

  ensureCustomTextures() {
    Object.entries(this.customization).forEach(([name, colors]) => {
      const key = name === "Laiba" ? "player_laiba" : "player_afshaan";
      ["down", "up", "left", "right"].forEach((dir) => {
        for (let frame = 0; frame < 3; frame += 1) {
          const textureKey = `${key}_${dir}_${frame}`;
          if (this.textures.exists(textureKey)) this.textures.remove(textureKey);
          this.makeRuntimeCharacterFrame(textureKey, colors.outfit, colors.skin, colors.hair, name, dir, frame);
        }
      });
      if (this.textures.exists(key)) this.textures.remove(key);
      this.makeRuntimeCharacterFrame(key, colors.outfit, colors.skin, colors.hair, name, "down", 1);
    });
  }

  makeRuntimeCharacterFrame(key, outfit, skin, hair, name, dir, frame) {
    const g = this.add.graphics();
    const bob = frame === 1 ? -1 : 0;
    const step = frame === 0 ? -3 : frame === 2 ? 3 : 0;
    g.fillStyle(0x000000, 0.24).fillEllipse(20, 65, 30, 8);
    g.fillStyle(outfit).fillRect(9, 24 + bob, 22, 30);
    g.lineStyle(1, 0x000000, 0.28).strokeRect(9, 24 + bob, 22, 30);
    g.fillStyle(skin).fillRect(12, 8, 16, 16);
    g.fillStyle(hair);
    if (name === "Afshaan") g.fillRect(10, 3, 20, 8).fillRect(10, 9, 4, 10).fillRect(26, 9, 4, 10);
    else g.fillRect(10, 2, 20, 8).fillRect(9, 8, 5, 20).fillRect(26, 8, 5, 20).fillStyle(0xa97954).fillRect(14, 0, 12, 4);
    if (dir !== "up") {
      g.fillStyle(0xffffff).fillRect(dir === "left" ? 14 : 15, 14, 3, 3).fillRect(dir === "right" ? 23 : 22, 14, 3, 3);
      g.fillStyle(0x111111).fillRect(dir === "left" ? 15 : 16, 15, 2, 2).fillRect(dir === "right" ? 24 : 23, 15, 2, 2);
    }
    g.fillStyle(0xc9767a).fillRect(18, 20, 4, 2);
    g.fillStyle(0xff8ca0, 0.55).fillRect(13, 18, 3, 2).fillRect(24, 18, 3, 2);
    g.fillStyle(0x353548).fillRect(11 + Math.max(0, step), 54, 7, 12).fillRect(22 + Math.min(0, step), 54, 7, 12);
    g.fillStyle(0x222232).fillRect(10 + Math.max(0, step), 64, 8, 4).fillRect(23 + Math.min(0, step), 64, 8, 4);
    g.generateTexture(key, 40, 72);
    g.destroy();
  }

  updateActorTexture(sprite, baseKey, dir, moving) {
    if (!sprite || !baseKey) return;
    const frame = moving ? Math.floor(this.walkClock / 8) % 3 : 1;
    const texture = `${baseKey}_${dir}_${frame}`;
    if (this.textures.exists(texture) && sprite.texture.key !== texture) sprite.setTexture(texture);
  }

  currentPlaySeconds() {
    return this.progress.totalPlaySeconds + Math.floor((Date.now() - this.playStartedAt) / 1000);
  }

  formatPlayTime() {
    const sec = this.currentPlaySeconds();
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
  }

  sceneCollected(sceneKey) {
    const ids = new Set((SCENE_MEMORY_ZONES[sceneKey] || []).map((z) => z[0]));
    return this.progress.collected.filter((id) => ids.has(id)).length;
  }

  remainingMemories(sceneKey) {
    return Math.max(0, (MEMORY_GOAL[sceneKey] || 0) - this.sceneCollected(sceneKey));
  }

  sceneReadyToLeave(sceneKey) {
    return this.sceneCollected(sceneKey) >= (MEMORY_GOAL[sceneKey] || 0);
  }

  markChapterComplete(sceneKey) {
    if (!this.progress.completedChapters.includes(sceneKey)) this.progress.completedChapters.push(sceneKey);
    this.save();
  }

  collectMemory(zone) {
    const already = this.progress.collected.includes(zone.id);
    if (!already) {
      this.progress.collected.push(zone.id);
      this.save();
      this.flashText(`Memory saved: ${zone.label}`);
      this.spawnBurst(zone.cx, zone.cy);
    }
    const lines = MEMORY_LINES[zone.id] || [`Memory shard: ${zone.label}.`, "Saved to the journal."];
    this.showDialogue(already ? [`Already saved: ${zone.label}.`, "This memory is in your journal."] : lines, () => this.drawHud());
  }

  drawMemoryZones(sceneKey) {
    this.memoryZones = (SCENE_MEMORY_ZONES[sceneKey] || []).map(([id, x, y, w, h, label]) => {
      const rect = new Phaser.Geom.Rectangle(x, y, w, h);
      const done = this.progress.collected.includes(id);
      this.memoryMarker(x + w / 2, y + h / 2, label, done);
      return { id, x, y, w, h, label, rect, cx: x + w / 2, cy: y + h / 2 };
    });
  }

  memoryMarker(x, y, label, done) {
    const color = done ? 0x5bbf7a : 0xffd166;
    this.add.rectangle(x, y, 38, 38, 0x000000, 0.4).setStrokeStyle(2, color).setDepth(7);
    this.add.image(x, y - 2, done ? "heart" : "spark").setScale(0.48).setDepth(8);
    this.addText(x, y + 33, done ? "saved" : label, 9, done ? "#91e5aa" : "#f0e6d3").setDepth(8);
  }

  spawnBurst(x, y) {
    for (let i = 0; i < 12; i += 1) {
      const p = this.add.image(x, y, i % 2 ? "spark" : "heart").setScale(0.28).setDepth(110);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-70, 70),
        y: y + Phaser.Math.Between(-70, 25),
        alpha: 0,
        duration: 750,
        onComplete: () => p.destroy(),
      });
    }
  }

  flashText(message) {
    this.toast?.destroy();
    this.toast = this.addText(GAME_W / 2, 94, message, 12, "#ffd166", true).setDepth(130);
    this.tweens.add({ targets: this.toast, y: 76, alpha: 0, duration: 1500, delay: 900, onComplete: () => this.toast?.destroy() });
  }

  toggleJournal(force) {
    const shouldOpen = typeof force === "boolean" ? force : !this.journalOpen;
    if (!shouldOpen) {
      this.journal?.destroy();
      this.journalOpen = false;
      return;
    }
    this.journal?.destroy();
    this.journalOpen = true;
    this.journal = this.add.container(0, 0).setDepth(150);
    this.journal.add(this.add.rectangle(GAME_W / 2, GAME_H / 2, 720, 500, 0x050510, 0.96).setStrokeStyle(3, 0xffd166));
    this.journal.add(this.addText(GAME_W / 2, 82, "Love Log / Item Box", 26, "#ffd6e8", true));
    this.journal.add(this.addText(GAME_W / 2, 112, `${this.progress.collected.length} / ${Object.keys(MEMORY_LINES).length} shards · ${this.formatPlayTime()} played · autosaved`, 12, "#f0e6d3"));
    const startX = 170;
    const startY = 142;
    CHAPTER_ORDER.forEach((key, i) => {
      const x = startX + (i % 2) * 330;
      const y = startY + Math.floor(i / 2) * 58;
      const count = this.sceneCollected(key);
      const goal = MEMORY_GOAL[key];
      const done = count >= goal;
      const label = SCENES[key].title;
      this.journal.add(this.addText(x, y, `${done ? "✓" : "•"} ${label}`, 11, done ? "#91e5aa" : "#ffd166", true).setOrigin(0, 0.5));
      this.journal.add(this.addText(x, y + 19, `${count}/${goal} memory shards`, 10, "#aaa").setOrigin(0, 0.5));
    });
    const growthLines = Object.entries(this.progress.growth).map(([k, v]) => `${WORLD_PLACES[k]?.label || k}: ${v}/${WORLD_GROWTH_GOALS[k]}`);
    this.journal.add(this.addText(178, 448, "Place Growth", 12, "#7ec8e3", true).setOrigin(0, 0.5));
    growthLines.forEach((line, i) => this.journal.add(this.addText(178, 470 + i * 17, line, 10, "#ddd").setOrigin(0, 0.5)));
    const inv = this.progress.inventory.slice(-6);
    this.journal.add(this.addText(570, 448, "Item Box", 12, "#ffd166", true).setOrigin(0, 0.5));
    this.journal.add(this.addText(570, 470, inv.length ? inv.join(" · ") : "empty", 10, "#ddd").setOrigin(0, 0.5));
    this.journal.add(this.addText(GAME_W / 2, GAME_H - 38, "J / ESC closes · S saves · Errands grow places and unlock deeper memories.", 11, "#aaa"));
  }

  showDialogue(lines, callback) {
    this.dialogue = lines;
    this.dialogueIndex = 0;
    this.dialogueNext = callback;
    this.drawDialogue();
  }

  advanceDialogue() {
    this.dialogueIndex += 1;
    if (this.dialogueIndex >= this.dialogue.length) {
      const next = this.dialogueNext;
      this.dialogue = [];
      this.dialogueNext = null;
      this.dialogueBox?.destroy();
      if (next) next();
      return;
    }
    this.drawDialogue();
  }

  drawDialogue() {
    this.dialogueBox?.destroy();
    this.dialogueBox = this.add.container(0, 0).setDepth(120);
    this.dialogueBox.add(this.add.rectangle(GAME_W / 2, GAME_H - 110, GAME_W - 82, 142, 0x050510, 0.94).setStrokeStyle(3, 0xc9a2d6));
    this.dialogueBox.add(this.addText(GAME_W / 2, GAME_H - 134, this.dialogue[this.dialogueIndex], 15, "#ffffff", false, 740));
    this.dialogueBox.add(this.addText(GAME_W / 2, GAME_H - 64, this.dialogueIndex < this.dialogue.length - 1 ? "ENTER / E to continue" : "ENTER / E to close", 11, "#ffd166"));
  }

  drawHud() {
    this.hud?.destroy();
    const data = SCENES[this.sceneKey];
    this.hud = this.add.container(0, 0).setDepth(90);
    this.hud.add(this.add.rectangle(GAME_W / 2, 17, GAME_W, 34, 0x000000, 0.72));
    this.hud.add(this.addText(18, 22, data.title, 12, "#c9a2d6", true).setOrigin(0, 0.5));
    this.hud.add(this.addText(GAME_W / 2, 22, `Quest: ${data.quest}`, 10, "#f0e6d3"));
    this.hud.add(this.addText(GAME_W - 18, 22, `${this.musicOn ? "♫" : "mute"} ${SONGS[this.songIndex][1].slice(0, 24)}`, 10, "#ff8cb3").setOrigin(1, 0.5));
    const idx = ORDER.indexOf(this.sceneKey);
    const bar = this.add.rectangle(GAME_W / 2, 48, 300, 10, 0xffffff, 0.12).setStrokeStyle(1, 0xffffff, 0.22);
    const fill = this.add.rectangle(GAME_W / 2 - 150, 48, 300 * (idx + 1) / ORDER.length, 10, 0xff8cb3, 1).setOrigin(0, 0.5);
    const shardText = this.sceneKey === "world"
      ? `growth ${Object.values(this.progress.growth).reduce((a, b) => a + b, 0)} / ${Object.values(WORLD_GROWTH_GOALS).reduce((a, b) => a + b, 0)}`
      : `${this.sceneCollected(this.sceneKey)} / ${MEMORY_GOAL[this.sceneKey]} shards`;
    this.playTimeText = this.addText(GAME_W - 18, 68, `play time ${this.formatPlayTime()}`, 9, "#aaa").setOrigin(1, 0.5);
    this.hud.add([bar, fill, this.addText(GAME_W / 2, 68, `${this.sceneKey === "world" ? "overworld" : `chapter ${idx} / ${CHAPTER_ORDER.length}`} · ${shardText}`, 9, "#aaa"), this.playTimeText]);
    this.hud.add(this.add.rectangle(GAME_W / 2, GAME_H - 13, GAME_W, 26, 0x000000, 0.62));
    this.hud.add(this.addText(GAME_W / 2, GAME_H - 9, "WASD/Arrows move · E/Enter interact · J journal · S save · M music", 10, "#aaa"));
    if (this.sceneKey === "ending") {
      this.timerText = this.addText(GAME_W / 2, 276, this.loveTimer(), 16, "#ffd166", true);
      this.hud.add(this.timerText);
    } else {
      this.timerText = null;
    }
  }

  drawTiledFloor(palette) {
    const [a, b, line] = palette.map((v) => Number(v));
    this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, a);
    const g = this.add.graphics();
    for (let y = 50; y < GAME_H - 34; y += 32) {
      for (let x = 0; x < GAME_W; x += 32) {
        g.fillStyle(((x / 32 + y / 32) % 2 ? b : a), 1).fillRect(x, y, 32, 32);
        g.fillStyle(line, 1).fillRect(x, y, 32, 1).fillRect(x, y, 1, 32);
      }
    }
  }
  drawGentleForestBackdrop(sceneKey) {
    const artByScene = {
      world: ["gf_sample", 0.92],
      hinge: ["gf_sheet", 0.18],
      chat: ["gf_supertile", 0.23],
      distance: ["gf_waterfall", 0.72],
      facetime: ["gf_palettes", 0.28],
      movies: ["gf_cover", 0.18],
      games: ["gf_scene", 0.24],
      spotify: ["gf_palettes", 0.22],
      sleep: ["gf_supertile", 0.16],
      morning: ["gf_cover", 0.36],
      ending: ["gf_sample", 0.62],
    };
    const entry = artByScene[sceneKey];
    if (!entry) return;
    const [key, alpha] = entry;
    if (!this.textures.exists(key)) return;
    const img = this.add.image(GAME_W / 2, GAME_H / 2, key).setDepth(0.6).setAlpha(alpha);
    const tex = this.textures.get(key).getSourceImage();
    const scale = Math.max(GAME_W / tex.width, GAME_H / tex.height);
    img.setScale(scale);
    this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x050510, sceneKey === "world" ? 0.08 : 0.38).setDepth(0.7);
    if (sceneKey === "world") {
      this.add.rectangle(GAME_W / 2, 40, GAME_W, 80, 0x071018, 0.5).setDepth(0.8);
      this.addText(GAME_W - 18, GAME_H - 38, "Forest maps by Seliel the Shaper", 9, "#d7f7d1").setOrigin(1, 0.5).setDepth(2);
    }
  }


  drawProps(props) {
    for (const [kind, x, y, label] of props) {
      if (kind === "calendar") this.calendar(x, y, label);
      else if (kind === "worldPlace") this.worldPlace(x, y, label, 0x5bb5f0, "frisco");
      else if (kind === "worldPlacePink") this.worldPlace(x, y, label, 0xe8526b, "ellicott");
      else if (kind === "worldBridge") this.worldBridge(x, y, label);
      else if (kind === "worldTree") this.worldTree(x, y, label);
      else if (kind === "phone") this.phone(x, y);
      else if (kind === "pigeon") this.pigeon(x, y, label);
      else if (kind === "houseBlue") this.house(x, y, 0x334d80, 0x5bb5f0, label);
      else if (kind === "housePink") this.house(x, y, 0x6b3f61, 0xe8526b, label);
      else if (kind === "laptop") this.laptop(x, y, label);
      else if (kind === "screenBlue") this.screen(x, y, 0x5bb5f0, label);
      else if (kind === "screenPink") this.screen(x, y, 0xe8526b, label);
      else if (kind === "theater") this.theater(x, y, label);
      else if (kind === "popcorn") this.popcorn(x, y);
      else if (kind === "skribbl") this.skribbl(x, y);
      else if (kind === "cards") this.cards(x, y);
      else if (kind === "equalizer") this.equalizer(x, y);
      else if (kind === "album") this.album(x, y);
      else if (kind === "bedBlue") this.bed(x, y, 0x5bb5f0, label);
      else if (kind === "bedPink") this.bed(x, y, 0xe8526b, label);
      else if (kind === "sunrise") this.sunrise(x, y, label);
      else if (kind === "flowers") this.flowers(x, y);
      else if (kind === "garden") this.garden(x, y);
      else if (kind === "titleStone") this.titleStone(x, y);
      else if (kind === "hearts") this.heartField(x, y);
      else if (kind === "planePath") this.planePath(x, y, label);
      else if (kind === "chat") this.chatProp(x, y, label);
      else if (kind === "music") this.musicProp(x, y, label);
      else if (kind === "memory") continue;
      else this.memory(x, y, label);
    }
  }

  drawZones(zones) {
    this.zones = zones.map((z) => {
      const rect = new Phaser.Geom.Rectangle(z.x, z.y, z.w, z.h);
      this.portal(z.x, z.y, z.w, z.h, z.label);
      return { ...z, rect, cx: z.x + z.w / 2, cy: z.y + z.h / 2 };
    });
  }

  portal(x, y, w, h, label) {
    const g = this.add.graphics().setDepth(4);
    g.lineStyle(3, 0xc9a2d6, 1).strokeRect(x, y, w, h);
    g.fillStyle(0xc9a2d6, 0.13).fillRect(x + 8, y + 8, w - 16, h - 16);
    this.addText(x + w / 2, y + h / 2 + 4, label, 12, "#ffffff", true).setDepth(5);
    this.addText(x + w / 2, y - 12, "E / ENTER", 10, "#ffd166", true).setDepth(5);
  }

  drawCard(x, y, name, home, sprite, color) {
    const card = this.add.rectangle(x + 100, y + 152, 200, 305, 0xffffff, 0.06).setStrokeStyle(3, Phaser.Display.Color.HexStringToColor(color).color);
    card.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.drawCustomize(name));
    this.add.image(x + 100, y + 140, sprite).setScale(2.1);
    this.addText(x + 100, y + 235, name, 18, color, true);
    this.addText(x + 100, y + 260, home, 11, "#ddd");
    this.addText(x + 100, y + 284, name === "Laiba" ? "fair skin · pink outfit" : "blue outfit", 10, "#aaa");
  }

  drawButton(x, y, w, h, label, onClick = null) {
    const c = this.add.container(x, y);
    c.add(this.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.55).setStrokeStyle(2, 0xffd166));
    c.add(this.addText(w / 2, h / 2 + 4, label, 12, "#ffd166", true));
    c.setSize(w, h).setInteractive({ useHandCursor: true }).on("pointerdown", onClick || (() => this.drawTitle()));
    return c;
  }

  addText(x, y, text, size, color, bold = false, wordWrap = 0) {
    return this.add.text(x, y, text, {
      fontFamily: "Courier New, monospace",
      fontSize: `${size}px`,
      fontStyle: bold ? "bold" : "normal",
      color,
      align: "center",
      wordWrap: wordWrap ? { width: wordWrap } : undefined,
    }).setOrigin(0.5);
  }

  clearAll() {
    this.children.removeAll(true);
    this.dialogueBox = null;
    this.hud = null;
    this.zones = [];
  }

  drawBackdrop(top, bottom) {
    const g = this.add.graphics();
    g.fillGradientStyle(top, top, bottom, bottom, 1).fillRect(0, 0, GAME_W, GAME_H);
    for (let i = 0; i < 70; i += 1) {
      this.add.rectangle((i * 43) % GAME_W, 65 + (i * 71) % 500, 2, 2, 0xffffff, 0.18);
    }
  }

  calendar(x, y, label) {
    this.add.rectangle(x + 65, y + 48, 130, 96, 0xffffff, 0.08).setStrokeStyle(2, 0xffd166);
    this.add.rectangle(x + 65, y + 12, 130, 24, 0xe8526b, 1);
    this.addText(x + 65, y + 18, "JAN 2026", 12, "#fff", true);
    this.addText(x + 65, y + 67, "9", 36, "#ffd166", true);
    this.addText(x + 65, y + 88, label, 10, "#f0e6d3");
  }

  phone(x, y) {
    this.add.rectangle(x + 48, y + 80, 96, 160, 0x111111).setStrokeStyle(4, 0xff8cb3);
    this.add.rectangle(x + 48, y + 72, 76, 118, 0x1f102d);
    this.addText(x + 48, y + 78, "H", 44, "#ff5a8a", true);
  }

  pigeon(x, y, label) {
    this.add.rectangle(x + 25, y + 36, 70, 70, 0x000000, 0).setStrokeStyle(2, 0x7ec8e3);
    this.add.rectangle(x + 22, y + 35, 44, 30, 0xdfe6ee);
    this.add.rectangle(x + 30, y + 24, 28, 20, 0xf7f9ff);
    this.add.rectangle(x + 61, y + 30, 13, 7, 0xffbf69);
    this.addText(x + 35, y + 92, label, 9, "#ddd");
  }

  house(x, y, body, roof, label) {
    this.add.rectangle(x + 75, y + 96, 150, 105, body).setStrokeStyle(3, 0x47395f);
    this.add.rectangle(x + 75, y + 45, 174, 32, roof);
    this.add.rectangle(x + 75, y + 122, 34, 55, 0x3a263f);
    this.add.rectangle(x + 35, y + 92, 30, 28, 0xffd88a);
    this.add.rectangle(x + 115, y + 92, 30, 28, 0xffd88a);
    this.addText(x + 75, y + 177, label, 12, "#f7e7ff");
  }

  laptop(x, y, label) {
    this.add.rectangle(x + 75, y + 46, 150, 92, 0x1b2036).setStrokeStyle(3, 0x7ec8e3);
    this.add.rectangle(x + 75, y + 42, 130, 58, 0x243b60);
    this.addText(x + 75, y + 50, label, 11, "#c9e9ff");
  }

  screen(x, y, color, label) {
    this.add.rectangle(x + 192, y + 175, 384, 350, color, 0.12).setStrokeStyle(3, color);
    this.addText(x + 192, y + 34, label, 13, "#f0e6d3");
  }

  theater(x, y, label) {
    this.add.rectangle(x + 310, y + 160, 620, 320, 0x05070d).setStrokeStyle(4, 0xc9a2d6);
    this.add.rectangle(x + 310, y + 160, 470, 205, 0x18233b);
    this.addText(x + 310, y + 165, label, 24, "#ffd166", true);
  }

  popcorn(x, y) {
    this.add.rectangle(x + 40, y + 22, 80, 46, 0xd56b6b);
    this.addText(x + 40, y + 26, "popcorn", 10, "#fff");
  }

  skribbl(x, y) {
    this.add.rectangle(x + 260, y + 120, 520, 230, 0xf7f3e9).setStrokeStyle(4, 0x5bb5f0);
    this.add.rectangle(x + 96, y + 105, 90, 70, 0xff8cb3);
    this.add.rectangle(x + 226, y + 105, 90, 70, 0x7ec8e3);
    this.add.rectangle(x + 356, y + 105, 90, 70, 0xffd166);
    this.addText(x + 96, y + 150, "Name", 13, "#111");
    this.addText(x + 226, y + 150, "Place", 13, "#111");
    this.addText(x + 356, y + 150, "Animal", 13, "#111");
    this.addText(x + 260, y + 240, "Laiba wins again", 16, "#2a1a3e", true);
  }

  cards(x, y) {
    ["Skribbl.io", "Name Place", "Afshaan cheering"].forEach((line, i) => this.addText(x + 105, y + 18 + i * 24, line, 11, "#f0e6d3"));
  }

  equalizer(x, y) {
    for (let i = 0; i < 13; i += 1) this.add.rectangle(x + i * 63, y + 110 - (i % 5) * 14, 36, 70 + (i % 4) * 24, 0x1ed760);
  }

  album(x, y) {
    this.add.rectangle(x + 130, y + 95, 260, 190, 0x1ed760, 0.08).setStrokeStyle(3, 0x1ed760);
    this.addText(x + 130, y + 55, "SPOTIFY JAM", 24, "#1ed760", true);
    this.addText(x + 130, y + 105, SONGS[this.songIndex][1], 14, "#f0e6d3");
  }

  bed(x, y, color, label) {
    this.add.rectangle(x + 125, y + 60, 250, 120, color, 0.28);
    this.add.rectangle(x + 125, y + 20, 250, 40, color);
    this.addText(x + 125, y + 96, label, 12, "#fff");
  }

  sunrise(x, y, label) {
    this.add.circle(x + 140, y + 60, 78, 0xfff3b0, 0.18);
    this.addText(x + 140, y + 78, label, 26, "#7a3351", true);
  }

  flowers(x, y) {
    for (let i = 0; i < 7; i += 1) this.add.image(x + i * 22, y + (i % 2) * 12, "heart").setScale(0.42);
  }

  garden(x, y) {
    for (let i = 0; i < 16; i += 1) {
      this.add.rectangle(x + i * 54, y + 34, 24, 34, 0x6b3f25);
      this.add.rectangle(x + i * 54, y, 62, 42, 0x2f663b);
    }
  }

  titleStone(x, y) {
    this.add.rectangle(x + 195, y + 92, 390, 110, 0x000000, 0.38).setStrokeStyle(3, 0xffd166);
    this.addText(x + 195, y + 50, "AFSHAAN ♡ LAIBA", 38, "#ffd6e8", true);
    this.addText(x + 195, y + 92, "Together since Jan 9, 2026 · 4:00 PM", 14, "#f0e6d3");
  }

  heartField(x, y) {
    for (let i = 0; i < 8; i += 1) this.add.image(x + i * 82, y + Math.sin(i) * 25, "heart").setScale(0.55);
  }

  planePath(x, y, label) {
    for (let i = 0; i < 9; i += 1) this.add.rectangle(x + i * 44, y + Math.sin(i) * 16, 26, 4, 0xc9a2d6);
    this.addText(x + 192, y - 35, label, 12, "#c9a2d6");
  }

  chatProp(x, y, label) {
    this.add.rectangle(x + 210, y + 70, 420, 92, 0xffffff, 0.08).setStrokeStyle(2, 0xff8cb3);
    this.addText(x + 210, y + 56, label, 13, "#fff");
  }

  musicProp(x, y, label) {
    this.add.rectangle(x + 140, y + 70, 280, 90, 0x000000, 0.36).setStrokeStyle(2, 0x1ed760);
    this.addText(x + 140, y + 55, "♫ " + label, 13, "#1ed760", true);
  }

  memory(x, y, label) {
    this.add.rectangle(x, y, 48, 48, 0x000000, 0.44).setStrokeStyle(2, 0xffd166);
    this.add.image(x, y - 2, "spark").setScale(0.6);
    this.addText(x, y + 40, label, 9, "#ddd");
  }

  worldPlace(x, y, label, color, placeKey) {
    const level = this.progress.growth[placeKey] || 0;
    this.add.rectangle(x + 95, y + 75, 190, 150, color, 0.16 + level * 0.04).setStrokeStyle(3, color);
    this.add.rectangle(x + 95, y + 85, 118 + level * 10, 78 + level * 5, color, 0.32);
    this.add.rectangle(x + 95, y + 130, 34, 45, 0x24152f);
    for (let i = 0; i < level; i += 1) this.add.image(x + 38 + i * 28, y + 38, "heart").setScale(0.32);
    this.addText(x + 95, y + 28, label, 13, "#f0e6d3", true);
    this.addText(x + 95, y + 168, `growth ${level}/${WORLD_GROWTH_GOALS[placeKey]}`, 10, "#aaa");
  }

  worldBridge(x, y, label) {
    const level = this.progress.growth.callBridge || 0;
    this.add.rectangle(x + 103, y + 65, 206, 130, 0x7ec8e3, 0.13 + level * 0.035).setStrokeStyle(3, 0x7ec8e3);
    for (let i = 0; i < 7 + level; i += 1) this.add.rectangle(x + 26 + i * 22, y + 65 + Math.sin(i) * 18, 16, 4, 0xc9a2d6);
    this.addText(x + 103, y + 30, label, 14, "#c9e9ff", true);
    this.addText(x + 103, y + 154, `call bridge ${level}/${WORLD_GROWTH_GOALS.callBridge}`, 10, "#aaa");
  }

  worldTree(x, y, label) {
    const level = this.progress.growth.memoryTree || 0;
    this.add.rectangle(x + 103, y + 65, 206, 130, 0x000000, 0.18).setStrokeStyle(3, 0xffd166);
    this.add.rectangle(x + 103, y + 94, 28, 60, 0x6b3f25);
    this.add.circle(x + 103, y + 52, 44 + level * 5, 0x2f663b, 0.9);
    for (let i = 0; i < level + 1; i += 1) this.add.image(x + 60 + i * 18, y + 42 + (i % 2) * 18, "heart").setScale(0.28);
    this.addText(x + 103, y + 28, label, 14, "#ffd166", true);
    this.addText(x + 103, y + 154, `memory tree ${level}/${WORLD_GROWTH_GOALS.memoryTree}`, 10, "#aaa");
  }

  emitHeart() {
    if (!this.settings.particles) return;
    if (Phaser.Math.Between(0, 100) > 96) {
      const heart = this.add.image(this.player.x + Phaser.Math.Between(-12, 12), this.player.y - 28, "heart").setScale(0.35).setDepth(12);
      this.tweens.add({ targets: heart, y: heart.y - 38, alpha: 0, duration: 900, onComplete: () => heart.destroy() });
    }
  }

  followPartner() {
    const dist = Phaser.Math.Distance.Between(this.partner.x, this.partner.y, this.player.x, this.player.y);
    if (dist > 80) {
      this.physics.moveToObject(this.partner, this.player, 112);
      const dx = this.player.x - this.partner.x;
      const dy = this.player.y - this.partner.y;
      this.partnerDir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
      this.updateActorTexture(this.partner, this.partnerTextureKey, this.partnerDir, true);
    } else {
      this.partner.body.setVelocity(0);
      this.updateActorTexture(this.partner, this.partnerTextureKey, this.partnerDir, false);
    }
  }

  startMusic() {
    if (!this.musicOn || !this.settings.music || this.audio) return;
    this.audio = new Audio(SONGS[this.songIndex][0]);
    this.audio.volume = this.settings.volume;
    this.audio.crossOrigin = "anonymous";
    this.audio.onended = () => {
      this.audio = null;
      this.songIndex = (this.songIndex + 1) % SONGS.length;
      this.startMusic();
      this.drawHud();
    };
    this.audio.play().catch(() => {});
  }

  toggleMusic() {
    this.musicOn = !this.musicOn;
    if (!this.musicOn && this.audio) {
      this.audio.pause();
      this.audio = null;
    } else {
      this.startMusic();
    }
    this.drawHud();
  }

  loveTimer() {
    const sec = Math.floor(Math.max(0, Date.now() - START_DATE.getTime()) / 1000);
    const days = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${days} days · ${h}h ${m}m ${s}s since together`;
  }

  save(showToast = false) {
    if (!this.playerChoice) return;
    const now = Date.now();
    const progress = {
      ...this.progress,
      version: SAVE_VERSION,
      totalPlaySeconds: this.currentPlaySeconds(),
      lastScene: this.sceneKey,
      lastPosition: this.player ? { x: Math.round(this.player.x), y: Math.round(this.player.y) } : this.progress.lastPosition,
      savedAt: now,
    };
    this.progress = progress;
    this.playStartedAt = now;
    localStorage.setItem(SAVE_KEY, JSON.stringify({ playerChoice: this.playerChoice, sceneKey: this.sceneKey, progress, customization: this.customization, settings: this.settings }));
    if (showToast) this.flashText("Game saved");
  }

  loadSave() {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY));
    } catch {
      return null;
    }
  }

  defaultSettings() {
    return { music: true, volume: 0.18, particles: true };
  }

  loadSettings() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY));
      if (parsed?.customization) this.customization = { ...structuredClone(DEFAULT_CUSTOM), ...parsed.customization };
      return { ...this.defaultSettings(), ...(parsed?.settings || parsed || {}) };
    } catch {
      return this.defaultSettings();
    }
  }

  saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ settings: this.settings, customization: this.customization }));
  }

  handlePointer(pointer) {
    const hit = (x, y, w, h) => Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(x, y, w, h), pointer.x, pointer.y);
    if (this.mode === "settings") {
      if (this.settingsReturnToPlay && hit(GAME_W / 2 - 205, 535, 190, 44)) {
        this.startRun(this.playerChoice, this.sceneKey, { reset: false });
        return;
      }
      if (this.settingsReturnToPlay && hit(GAME_W / 2 + 15, 535, 190, 44)) {
        this.drawTitle();
        return;
      }
      if (!this.settingsReturnToPlay && hit(GAME_W / 2 - 95, 535, 190, 44)) {
        this.drawTitle();
        return;
      }
      return;
    }
    if (this.mode === "title") {
      if (pointer.y < 450) this.drawSelect();
      return;
    }
    if (this.mode === "select") {
      if (hit(230, 205, 200, 305)) {
        this.drawCustomize("Afshaan");
        return;
      }
      if (hit(530, 205, 200, 305)) {
        this.drawCustomize("Laiba");
        return;
      }
      if (this.saved && hit(GAME_W / 2 - 115, 535, 230, 44)) {
        this.startRun(this.saved.playerChoice, this.saved.sceneKey, { reset: false });
        return;
      }
      return;
    }
    if (this.mode === "customize") {
      if (hit(650, 188, 190, 42)) {
        this.drawCustomize(this.customizing === "Laiba" ? "Afshaan" : "Laiba");
        return;
      }
      if (hit(650, 248, 190, 42)) {
        this.startRun(this.customizing, "world", { reset: true });
        return;
      }
      if (hit(650, 308, 190, 42)) {
        this.drawSelect();
        return;
      }
      if (hit(650, 368, 190, 42)) {
        this.drawSettings();
        return;
      }
      if (hit(650, 428, 190, 42)) {
        this.drawTitle();
        return;
      }
      return;
    }
    if (this.dialogue.length) {
      this.advanceDialogue();
      return;
    }
    if (this.mode !== "play") return;
    const memory = this.memoryZones?.find((z) => Phaser.Geom.Rectangle.Contains(z.rect, pointer.x, pointer.y));
    if (memory) {
      this.collectMemory(memory);
      return;
    }
    const zone = this.zones?.find((z) => Phaser.Geom.Rectangle.Contains(z.rect, pointer.x, pointer.y));
    if (zone) this.trigger(zone.type);
  }

  mobileControls() {
    document.querySelectorAll("[data-dir]").forEach((button) => {
      const dir = button.dataset.dir;
      const on = (value) => {
        this.virtual[dir] = value;
      };
      button.addEventListener("pointerdown", (e) => { e.preventDefault(); on(true); });
      button.addEventListener("pointerup", () => on(false));
      button.addEventListener("pointercancel", () => on(false));
      button.addEventListener("pointerleave", () => on(false));
    });
    document.getElementById("act-btn").addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.tryInteract();
    });
    document.getElementById("music-btn").addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.toggleMusic();
    });
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_W,
  height: GAME_H,
  backgroundColor: "#090814",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, GameScene],
});
