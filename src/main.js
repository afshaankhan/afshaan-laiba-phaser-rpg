import * as THREE from "https://esm.sh/three@0.165.0";

const SAVE_KEY = "dragonbound-3d-save-v1";
const SETTINGS_KEY = "dragonbound-3d-settings-v1";
const START_DATE = new Date("2026-01-09T16:00:00-06:00");

const chapters = [
  {id:"hinge", title:"The Hinge Gate", place:"Baltimore / Ellicott City", relic:"Matchstone", npc:"Pika", color:0xff77aa, sky:0x170f2f, ground:0x241642, quest:"Find Pika's photo, gather memory sparks, awaken the Matchstone.", lines:["January 9, 2026. Afshaan is still in Baltimore when the match appears.","Laiba's profile glows with moonlight. Pika's photo becomes a door.","Afshaan replies: Is that inside a microwave??", "Laiba answers: it's his cage. The Between opens."], landmark:"profile"},
  {id:"aviary", title:"Aviary of Pika", place:"The Not-Microwave Palace", relic:"Pigeon Feather", npc:"Pika", color:0x9ce9ff, sky:0x10263b, ground:0x17364a, quest:"Reveal the crystal cage-palace and recover Pika's feather.", lines:["The photo expands into a crystal aviary, half palace and half joke.","The world teases Afshaan with microwave-shaped illusions.","Pika demands architectural respect.","A blue-white feather falls into the shared inventory."], landmark:"aviary"},
  {id:"messages", title:"Lantern Library", place:"First Messages", relic:"Song Lantern", npc:"Mufliya", color:0x7ec8ff, sky:0x111832, ground:0x182348, quest:"Collect message pages and light the Mystery Lantern.", lines:["Every early message becomes a floating page.","Mystery of Love becomes a lantern; Call Me By Your Name becomes a moonlit reel.","Mufliya guards Laiba's side of the story.","The rhythm of replying becomes the first real magic."], landmark:"library"},
  {id:"ramadan", title:"Ramadan Threshold", place:"Baltimore Harbor of Beginnings", relic:"Westward Lantern", npc:"Mufliya", color:0xffd166, sky:0x1d1630, ground:0x312244, quest:"Light Ramadan lanterns and open the Westward Door.", lines:["For two months, Baltimore and Ellicott City share one soft moon.","After Ramadan, Afshaan moves to Frisco for his job search.","The Westward Door is not betrayal. It is life becoming real.","Laiba says: Then come back every day. Afshaan says: I will."], landmark:"ramadan"},
  {id:"skybridge", title:"Long-Distance Skybridge", place:"Frisco ↔ Ellicott City", relic:"FaceTime Mirror", npc:"Ammara", color:0x76b7ff, sky:0x07142a, ground:0x10233d, quest:"Repair the bridge with daily FaceTime light.", lines:["Frisco becomes the western star. Ellicott City stays the eastern moon.","The bridge is built from calls, prayers, songs, and daily check-ins.","Every FaceTime call lays another tile under their feet.","Distance stays large, but the road becomes real."], landmark:"bridge"},
  {id:"theater", title:"Google Meet Moon Theater", place:"The Shared Screen Moon", relic:"Movie Moon", npc:"Mufliya", color:0xecc9ff, sky:0x1b102b, ground:0x2d1e3d, quest:"Sync the cloud seats and recover the Movie Moon.", lines:["Seats made of clouds gather under a giant mirror-screen.","They press play from different rooms and enter the same moment.","Popcorn appears on both sides of the country.","The movie becomes a date night because they chose the same moment."], landmark:"theater"},
  {id:"festival", title:"Festival of Little Games", place:"Skribbl Market", relic:"Game Dice", npc:"Mufliya", color:0x66e38a, sky:0x142822, ground:0x203828, quest:"Win the Game Dice by playing instead of rushing.", lines:["Skribbl tents glow beside Name Place Animal Thing stalls.","Laiba plays. Afshaan watches, cheers, and loses with dignity.","The market laughs at impossible guesses from tiny doodles.","Love is repetition, teasing, and returning tomorrow."], landmark:"festival"},
  {id:"jam", title:"Spotify Jam Constellation", place:"Song Planets", relic:"Screen-Kiss Star", npc:"Ammara", color:0x1ed760, sky:0x06180f, ground:0x10251a, quest:"Tune the shared playlist and form the Screen-Kiss Star.", lines:["The playlist becomes planets of color and weather.","Mystery of Love returns like a comet.","Songs become portable places.","The first half of the Screen-Kiss Star forms."], landmark:"constellation"},
  {id:"sleepsea", title:"Sleep Call Sea", place:"Two-Moon Shore", relic:"Dream Thread", npc:"Pika", color:0xa9b4ff, sky:0x071026, ground:0x10213d, quest:"Keep the call lantern alive until dawn.", lines:["Phones float like lantern boats on a calm dark sea.","There is no battle here. Only quiet breathing and safe feeling.","The Mists whisper, but the call lantern stays lit.","Long distance loses another night."], landmark:"sea"},
  {id:"garden", title:"Morning Garden", place:"Daily Bloom Shrine", relic:"Daily Bloom", npc:"Laiba Echo", color:0xffb86b, sky:0x3a1835, ground:0x4a2a3f, quest:"Wake the flowers of daily care.", lines:["Sunrise flowers open only when greeted with care.","Good morning. Did you sleep? Eat something. Miss you. Call later. Safe drive. Always here.","Nothing here is dramatic, and that is why it matters.","Grand romance survives through small repeated choices."], landmark:"garden"},
  {id:"shrine", title:"Five-Month Dragon Shrine", place:"Ammara's Heart Gate", relic:"Month Six Door", npc:"Ammara", color:0xffd166, sky:0x180b2d, ground:0x291545, quest:"Place every relic and load Month Six.", lines:["The relics rise together inside Ammara's shrine.","Afshaan and Laiba stand on opposite sides of a glowing mirror-screen.","They send screen kisses through the shrine. The crack becomes a doorway.","Mashallah. To be continued... Loading Month Six."], landmark:"shrine"}
];

const shell = document.getElementById("game-shell");
shell.innerHTML = `<canvas id="world"></canvas><section id="overlay" class="overlay"></section><section class="topbar"><div class="hud-card"><strong id="place"></strong><span id="quest"></span><em id="controls">WASD/Arrows move · E interact · J journal · S save · M music</em></div><div class="hud-card"><strong id="relics"></strong><span id="sparkline"></span></div></section><section id="prompt" class="prompt hidden"></section><section id="dialogue" class="dialogue hidden"><h3></h3><p></p><button>Continue</button></section><section class="mobile"><div class="pad"><button data-m="up">▲</button><button data-m="left">◀</button><button data-m="down">▼</button><button data-m="right">▶</button></div><div class="act"><button data-action="interact">E</button><button data-action="journal">J</button></div></section><span class="codex-note">Dragonbound 3D</span>`;

const canvas = document.getElementById("world");
const overlay = document.getElementById("overlay");
const promptEl = document.getElementById("prompt");
const dialogueEl = document.getElementById("dialogue");
const placeEl = document.getElementById("place");
const questEl = document.getElementById("quest");
const relicsEl = document.getElementById("relics");
const sparklineEl = document.getElementById("sparkline");

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x080914, 0.028);
const camera = new THREE.PerspectiveCamera(54, innerWidth/innerHeight, 0.1, 160);
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const world = new THREE.Group();
scene.add(world);

let settings = loadJson(SETTINGS_KEY, {music:true, camera:"follow", quality:"high"});
let save = normalizeSave(loadJson(SAVE_KEY, null));
let custom = save.custom;
let active = chapters[save.chapter] || chapters[0];
let state = "title";
let keys = new Set();
let mobile = {};
let target = null;
let objects = [];
let solids = [];
let particles = [];
let labels = [];
let dialogue = [];
let dialogueTitle = "";
let audio = null;
let lastPersist = 0;

const mats = {};
const player = createCharacter("Afshaan");
const partner = createCharacter("Laiba");
const pika = createPika();
const mufliya = createMufliya();
const ammara = createAmmara();
scene.add(player.group, partner.group, pika, mufliya, ammara);

function defaultSave(){return {chapter:0, relics:[], sparks:{}, pos:null, playSeconds:0, player:"Afshaan", custom:{Afshaan:{outfit:0x4ca3ff,aura:0x9fdcff}, Laiba:{outfit:0xe8526b,aura:0xffd6e8}}};}
function normalizeSave(raw){const fresh=defaultSave(); const s={...fresh,...(raw||{})}; s.relics=Array.isArray(s.relics)?s.relics:[]; s.sparks=s.sparks&&typeof s.sparks==="object"?s.sparks:{}; s.custom={...fresh.custom,...(s.custom||{})}; s.player=s.player||"Afshaan"; s.chapter=Number.isFinite(s.chapter)?s.chapter:0; s.playSeconds=Number.isFinite(s.playSeconds)?s.playSeconds:0; return s;}
function loadJson(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback;}catch{return fallback;}}
function persist(){save.custom=custom; localStorage.setItem(SAVE_KEY, JSON.stringify(save));}
function persistSettings(){localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));}
function sparkList(){save.sparks[active.id] ||= []; return save.sparks[active.id];}
function togetherTimer(){const sec=Math.max(0,Math.floor((Date.now()-START_DATE.getTime())/1000)); const mo=Math.floor(sec/2629746); const d=Math.floor((sec-mo*2629746)/86400); const h=Math.floor((sec%86400)/3600); const m=Math.floor((sec%3600)/60); return `${mo} months · ${d} days · ${h}h ${m}m since together`;}
function fmt(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=Math.floor(s%60); return `${h}h ${m}m ${sec}s`;}
function color(v){return new THREE.Color(v);}
function material(c, opts={}){const key=JSON.stringify([c,opts.emissive||0,opts.opacity||1,opts.metalness||0,opts.roughness||0.68]); if(!mats[key]) mats[key]=new THREE.MeshStandardMaterial({color:c, roughness:opts.roughness??0.68, metalness:opts.metalness??0.03, emissive:opts.emissive??0x000000, emissiveIntensity:opts.emissiveIntensity??0.35, transparent:(opts.opacity??1)<1, opacity:opts.opacity??1, side:opts.side??THREE.FrontSide}); return mats[key];}
function box(w,h,d,c,opts){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(c,opts)); m.castShadow=true; m.receiveShadow=true; return m;}
function sphere(r,c,opts){const m=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),material(c,opts)); m.castShadow=true; m.receiveShadow=true; return m;}
function cyl(r,h,c,seg=16,opts){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),material(c,opts)); m.castShadow=true; m.receiveShadow=true; return m;}
function cone(r,h,c,seg=16,opts){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,seg),material(c,opts)); m.castShadow=true; m.receiveShadow=true; return m;}

function createCharacter(name){
  const g=new THREE.Group();
  const isL=name==="Laiba";
  const outfit=isL?0xe8526b:0x4ca3ff, skin=isL?0xffe4d0:0xd3a26f, hair=isL?0x8b5e3c:0x171728;
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(.52,32),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.23})); shadow.rotation.x=-Math.PI/2; shadow.position.y=.02; g.add(shadow);
  const robe=box(.62,.92,.38,outfit); robe.position.y=.82; robe.userData.part="robe"; g.add(robe);
  const trim=box(.68,.13,.42,isL?0xd7fff4:0xd7e8ff,{emissive:isL?0x225544:0x243f66,emissiveIntensity:.12}); trim.position.y=1.16; g.add(trim);
  const cape=box(.74,.95,.08,isL?0x0f8290:0x223b64,{opacity:.88}); cape.position.set(0,.8,.23); cape.userData.part="cape"; g.add(cape);
  const head=sphere(.28,skin); head.position.y=1.48; g.add(head);
  const hairTop=box(.66,.2,.5,hair); hairTop.position.y=1.72; g.add(hairTop);
  const hairL=box(.13,isL?.68:.36,.4,hair); hairL.position.set(-.31,isL?1.36:1.5,0); g.add(hairL);
  const hairR=hairL.clone(); hairR.position.x=.31; g.add(hairR);
  if(isL){const hairBack=box(.54,.72,.16,hair,{roughness:.85}); hairBack.position.set(0,1.32,.28); g.add(hairBack);}
  const eyeL=sphere(.035,0x111111); eyeL.position.set(-.09,1.51,-.255); const eyeR=eyeL.clone(); eyeR.position.x=.09; g.add(eyeL,eyeR);
  const blushL=box(.08,.025,.012,0xff8fa8,{emissive:0xff5577,emissiveIntensity:.18}); blushL.position.set(-.16,1.43,-.27); const blushR=blushL.clone(); blushR.position.x=.16; g.add(blushL,blushR);
  const armL=box(.14,.62,.16,skin); armL.position.set(-.46,.82,-.03); armL.userData.part="armL"; const armR=armL.clone(); armR.position.x=.46; armR.userData.part="armR"; g.add(armL,armR);
  const legL=box(.18,.58,.18,0x1f2738); legL.position.set(-.16,.26,0); legL.userData.part="legL"; const legR=legL.clone(); legR.position.x=.16; legR.userData.part="legR"; g.add(legL,legR);
  const auraLight=new THREE.PointLight(isL?0xffd6e8:0x8ed8ff,.85,4); auraLight.position.y=1.25; g.add(auraLight);
  if(isL){
    const charm=sphere(.075,0xd7fff4,{emissive:0x77fff0,emissiveIntensity:.7}); charm.position.set(0,1.05,-.24); g.add(charm);
    for(let i=0;i<5;i++){const f=sphere(.035,0xffd6e8,{emissive:0xff80b8,emissiveIntensity:.7}); f.position.set(Math.cos(i*1.25)*.62,.06,Math.sin(i*1.25)*.62); g.add(f);}
  } else {
    const star=sphere(.07,0xffd166,{emissive:0xffcc55,emissiveIntensity:.8}); star.position.set(-.18,1.12,-.24); g.add(star);
    const blade=box(.07,.9,.05,0xc9d9ff,{metalness:.2,roughness:.35,emissive:0x223355,emissiveIntensity:.25}); blade.position.set(.52,.75,.14); blade.rotation.z=-.35; g.add(blade);
  }
  const phone=sphere(.08,isL?0xffd6e8:0x89d8ff,{emissive:isL?0xff7ab8:0x4ca3ff,emissiveIntensity:.65}); phone.position.set(.54,.75,-.16); phone.userData.part="phone"; g.add(phone);
  return {name,group:g,robe,cape,armL,armR,legL,legR,phone,walk:0,speed:6.2};
}

function createPika(){
  const g=new THREE.Group();
  const body=sphere(.24,0xe8edf4); body.scale.set(1.15,.82,.75); g.add(body);
  const head=sphere(.15,0xf8fbff); head.position.set(.24,.12,0); g.add(head);
  const beak=cone(.06,.16,0xffb347,8); beak.rotation.z=-Math.PI/2; beak.position.set(.39,.12,0); g.add(beak);
  const eye=sphere(.018,0x111111); eye.position.set(.34,.17,-.07); const eye2=eye.clone(); eye2.position.z=.07; g.add(eye,eye2);
  const wingL=box(.08,.28,.38,0xcfd8e8,{opacity:.85}); wingL.position.set(-.02,.02,-.26); wingL.rotation.x=.45; const wingR=wingL.clone(); wingR.position.z=.26; wingR.rotation.x=-.45; g.add(wingL,wingR);
  const foot1=box(.04,.16,.04,0xff9d2e); foot1.position.set(-.05,-.25,-.08); const foot2=foot1.clone(); foot2.position.z=.08; g.add(foot1,foot2);
  g.position.set(-3,.6,-2); g.userData={kind:"npc",name:"Pika",lines:["It was never a microwave. It was architecture.","Coo. Collect the memory sparks. I will supervise."]};
  return g;
}
function createMufliya(){
  const g=createCharacter("Laiba").group; g.scale.set(.92,.92,.92); g.traverse(o=>{if(o.material&&o.material.color){o.material=o.material.clone(); if(o.material.color.getHex()===0xe8526b)o.material.color.setHex(0x9d7bea);}}); g.userData={kind:"npc",name:"Mufliya",lines:["I know Laiba. If the moon is brighter today, it is probably her fault.","Be careful with each other. Long distance reveals who is careful."]}; return g;
}
function createAmmara(){
  const g=new THREE.Group();
  const body=sphere(.82,0xffd27a,{emissive:0x6b4b14,emissiveIntensity:.25}); body.scale.set(2.5,.78,.9); g.add(body);
  for(let i=0;i<7;i++){const seg=sphere(.22, i%2?0xffe0a0:0xd9b45c,{emissive:0x553800,emissiveIntensity:.18}); seg.position.set(-1.0+i*.34,.62+Math.sin(i)*.08,0); g.add(seg);}
  const neck=cyl(.18,1.1,0xd9b45c,12); neck.rotation.z=1.05; neck.position.set(1.45,.63,0); g.add(neck);
  const head=sphere(.38,0xffdc91,{emissive:0xffbb55,emissiveIntensity:.28}); head.position.set(2.0,1.12,0); g.add(head);
  const eye=sphere(.05,0xfff0a0,{emissive:0xffdd66,emissiveIntensity:1}); eye.position.set(2.28,1.18,-.12); const eye2=eye.clone(); eye2.position.z=.12; g.add(eye,eye2);
  const horn1=cone(.06,.42,0xfff4d0,8); horn1.position.set(1.84,1.48,-.13); horn1.rotation.z=-.4; const horn2=horn1.clone(); horn2.position.z=.13; g.add(horn1,horn2);
  const wingMat=material(0xc9a2d6,{emissive:0x724aa8,emissiveIntensity:.35,opacity:.46,side:THREE.DoubleSide});
  const wingGeo=new THREE.BufferGeometry(); wingGeo.setAttribute("position",new THREE.BufferAttribute(new Float32Array([0,0,0,-2.7,.25,-1.25,-.55,1.15,-.12,0,0,0,-2.7,.25,1.25,-.55,1.15,.12]),3)); wingGeo.computeVertexNormals();
  const wings=new THREE.Mesh(wingGeo,wingMat); wings.position.set(.1,.58,0); g.add(wings);
  for(let i=0;i<9;i++){const scale=sphere(.055,0xffffff,{emissive:0x91ddff,emissiveIntensity:.7}); scale.position.set(-.9+i*.24,.95+Math.sin(i)*.05,0); g.add(scale);}
  g.position.set(0,6.0,-8); g.scale.set(1.15,1.15,1.15); g.userData={kind:"npc",name:"Ammara",lines:["I am Ammara, Dragon of Shared Light.","I woke because your calls, songs, prayers, jokes, and screen kisses became a realm."]}; return g;
}

function clearWorld(){while(world.children.length)world.remove(world.children[0]); objects=[]; solids=[]; particles=[]; labels=[];}
function loadChapter(idx, reset=true){
  save.chapter=Math.max(0,Math.min(idx,chapters.length-1)); active=chapters[save.chapter]; clearWorld(); target=null;
  scene.background=color(active.sky); scene.fog.color.set(active.sky); scene.fog.density= active.id==="sleepsea"?.045:.026;
  buildLights(); buildRealm(active); placeCharacters(reset); updateHud(); persist();
}
function buildLights(){
  scene.children.filter(x=>x.userData.light).forEach(l=>scene.remove(l));
  const hemi=new THREE.HemisphereLight(0xbfd8ff,0x160a20,1.45); hemi.userData.light=true; scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xffffff,1.1); sun.position.set(8,16,10); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048); sun.userData.light=true; scene.add(sun);
}
function buildRealm(ch){
  const floorMat=material(ch.ground,{roughness:.82});
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(46,34,32,24),floorMat); floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; world.add(floor);
  const pathMat=material(ch.color,{emissive:ch.color,emissiveIntensity:.08,roughness:.75});
  const path1=new THREE.Mesh(new THREE.PlaneGeometry(3.2,28),pathMat); path1.rotation.x=-Math.PI/2; path1.position.y=.012; world.add(path1);
  const path2=new THREE.Mesh(new THREE.PlaneGeometry(30,3.2),pathMat); path2.rotation.x=-Math.PI/2; path2.position.y=.015; path2.position.z=-3.5; world.add(path2);
  addMoons(ch); addBoundaries(); addLandmark(ch); addGuide(ch); addSparks(ch); addRelicAndPortal(ch); addAmbient(ch);
}
function addBoundaries(){[[0,-17,46,1],[0,17,46,1],[-23,0,1,34],[23,0,1,34]].forEach(([x,z,w,d])=>{const b=box(w,.8,d,0x111827,{opacity:.08}); b.position.set(x,.4,z); b.visible=false; world.add(b); solids.push({x,z,w,d});});}
function addMoons(ch){
  const west=sphere(1.1,0xffd166,{emissive:0xffb949,emissiveIntensity:.85}); west.position.set(-11,8,-16); world.add(west);
  const east=sphere(1.0,0xffd6e8,{emissive:0xff7ab8,emissiveIntensity:.78}); east.position.set(11,7.5,-16); world.add(east);
  const bridge=cyl(.035,22,ch.color,12,{emissive:ch.color,emissiveIntensity:.7}); bridge.rotation.z=Math.PI/2; bridge.position.set(0,6.7,-16); world.add(bridge);
  for(let i=0;i<90;i++){const star=sphere(Math.random()*.035+.014,i%5?0xffffff:ch.color,{emissive:i%5?0xffffff:ch.color,emissiveIntensity:.85}); star.position.set(-22+Math.random()*44,2.5+Math.random()*10,-12-Math.random()*9); world.add(star); particles.push({mesh:star,type:"star",phase:Math.random()*9});}
}
function addAmbient(ch){
  for(let i=0;i<34;i++){const x=-20+Math.random()*40,z=-14+Math.random()*26;if(Math.abs(x)<3||Math.abs(z+3.5)<3)continue; const tree=makeFantasyTree(ch.color); tree.position.set(x,0,z); world.add(tree); solids.push({x,z,w:1.2,d:1.2});}
  for(let i=0;i<20;i++){const l=makeLantern(ch.color); l.position.set(i%2?-18:18,.0,-13+i*1.3); world.add(l);}
  for(let i=0;i<24;i++){const f=sphere(.08,i%2?0xffd6e8:ch.color,{emissive:i%2?0xff7ab8:ch.color,emissiveIntensity:.55}); f.position.set(-18+Math.random()*36,.09,-12+Math.random()*24); world.add(f); particles.push({mesh:f,type:"flower",phase:Math.random()*8});}
}
function makeFantasyTree(accent){const g=new THREE.Group(); const trunk=cyl(.18,1.15,0x6a422a,8); trunk.position.y=.58; const crown=sphere(.82,0x2f7d55,{emissive:accent,emissiveIntensity:.04}); crown.position.y=1.35; const crown2=sphere(.55,0x4a936f,{emissive:accent,emissiveIntensity:.06}); crown2.position.set(.38,1.72,-.12); g.add(trunk,crown,crown2); return g;}
function makeLantern(c){const g=new THREE.Group(); const post=cyl(.035,1.1,0x1f2738,8); post.position.y=.55; const light=sphere(.14,c,{emissive:c,emissiveIntensity:.95}); light.position.y=1.16; const pl=new THREE.PointLight(c,1.0,5); pl.position.y=1.16; g.add(post,light,pl); particles.push({mesh:light,type:"lantern",phase:Math.random()*8,light:pl}); return g;}
function addLandmark(ch){
  if(ch.landmark==="profile"){for(let i=0;i<7;i++){const card=box(1.5,.08,2.1,i%2?0xffd6e8:0xffffff); card.position.set(-7+i*2.3,.18,-8+Math.sin(i)*.7); card.rotation.y=(i-3)*.13; world.add(card);} const heart=sphere(.42,0xff6f9f,{emissive:0xff4f99,emissiveIntensity:.9}); heart.scale.set(1,.75,.45); heart.position.set(0,1.2,-8.4); world.add(heart); particles.push({mesh:heart,type:"heart",phase:0}); const phone=box(1.15,.12,1.8,0x171728,{emissive:0x331933,emissiveIntensity:.35}); phone.position.set(-2.7,.24,-6.9); world.add(phone); const screen=box(.92,.04,1.45,0xff7ab8,{emissive:0xff4f99,emissiveIntensity:.55}); screen.position.set(-2.7,.34,-6.9); world.add(screen); const cage=cyl(.42,.9,0xc7eaff,14,{opacity:.4,emissive:0x7ec8ff,emissiveIntensity:.4}); cage.position.set(2.6,.65,-6.9); world.add(cage);}
  if(ch.landmark==="aviary"){for(let i=0;i<12;i++){const bar=cyl(.035,4.2,0xbfe9ff,8,{emissive:0x4abfff,emissiveIntensity:.2}); bar.position.set(-4.2+i*.75,2.1,-7); world.add(bar);} const cage=sphere(2.7,0x9ce9ff,{opacity:.16,emissive:0x4abfff,emissiveIntensity:.35}); cage.position.set(0,2,-7); cage.scale.y=.75; world.add(cage);}
  if(ch.landmark==="library"){for(let i=0;i<7;i++){const shelf=box(.45,2.6,4.2,0x5b3c63); shelf.position.set(-9+i*3,1.3,-7.5); world.add(shelf);} for(let i=0;i<16;i++){const page=box(.52,.03,.7,0xeaf3ff,{emissive:0x9fdcff,emissiveIntensity:.22}); page.position.set(-8+Math.random()*16,1.2+Math.random()*2,-8+Math.random()*4); page.rotation.set(Math.random(),Math.random(),Math.random()); world.add(page); particles.push({mesh:page,type:"page",phase:Math.random()*9});}}
  if(ch.landmark==="ramadan"){for(let i=0;i<18;i++){const l=makeLantern(0xffd166); l.position.set(-9+i,0,-8+Math.sin(i)*1.2); world.add(l);} const door=box(2.4,4,.4,0xffd166,{emissive:0xffa000,emissiveIntensity:.45}); door.position.set(0,2,-10); world.add(door);}
  if(ch.landmark==="bridge"){for(let i=-8;i<=8;i++){const tile=box(1.3,.18,.72,ch.color,{emissive:ch.color,emissiveIntensity:.18}); tile.position.set(i*1.2,.12,-7+Math.sin(i)*.25); world.add(tile);} }
  if(ch.landmark==="theater"){const screen=box(9,4,.18,0xd8c7ff,{emissive:0x8d6fff,emissiveIntensity:.35}); screen.position.set(0,2.6,-9); world.add(screen); for(let i=0;i<8;i++){const seat=sphere(.45,0xffffff,{opacity:.72}); seat.scale.set(1.2,.35,1); seat.position.set(-6+i*1.7,.35,-4.4); world.add(seat);}}
  if(ch.landmark==="festival"){for(let i=0;i<7;i++){const tent=cone(1.1,1.4,i%2?0xff74aa:0x66e38a,4,{emissive:i%2?0x661133:0x115533,emissiveIntensity:.15}); tent.position.set(-9+i*3,.7,-7+Math.sin(i)); tent.rotation.y=Math.PI/4; world.add(tent);}}
  if(ch.landmark==="constellation"){for(let i=0;i<8;i++){const planet=sphere(.45+Math.random()*.25,[0x1ed760,0xff7ab8,0x7ec8ff,0xffd166][i%4],{emissive:[0x1ed760,0xff7ab8,0x7ec8ff,0xffd166][i%4],emissiveIntensity:.7}); planet.position.set(-9+i*2.6,1.6+Math.sin(i),-8+Math.cos(i)*2); world.add(planet); particles.push({mesh:planet,type:"planet",phase:i});}}
  if(ch.landmark==="sea"){const water=new THREE.Mesh(new THREE.PlaneGeometry(42,28),material(0x123d68,{emissive:0x0a2750,emissiveIntensity:.35,opacity:.82})); water.rotation.x=-Math.PI/2; water.position.y=.025; world.add(water); particles.push({mesh:water,type:"water",phase:0}); for(let i=0;i<10;i++){const boat=makeLantern(0xa9b4ff); boat.position.set(-10+i*2.2,0,-7+Math.sin(i)*3); world.add(boat);}}
  if(ch.landmark==="garden"){for(let i=0;i<40;i++){const flower=sphere(.12,[0xffb86b,0xff7aa8,0xffd166,0xd7fff4][i%4],{emissive:[0xffb86b,0xff7aa8,0xffd166,0xd7fff4][i%4],emissiveIntensity:.65}); flower.position.set(-13+Math.random()*26,.12,-10+Math.random()*18); world.add(flower); particles.push({mesh:flower,type:"flower",phase:Math.random()*8});}}
  if(ch.landmark==="shrine"){const altar=cyl(2.2,.36,0x2d1d48,32,{emissive:0x190a33,emissiveIntensity:.2}); altar.position.set(0,.18,-5.5); world.add(altar); for(let i=0;i<10;i++){const gem=sphere(.18,i%2?0xff8db3:0xffd166,{emissive:i%2?0xff8db3:0xffd166,emissiveIntensity:.8}); gem.position.set(Math.cos(i)*2.7,.75, -5.5+Math.sin(i)*2.7); world.add(gem); particles.push({mesh:gem,type:"planet",phase:i});}}
}
function addGuide(ch){pika.visible=ch.npc==="Pika"; mufliya.visible=ch.npc==="Mufliya"||ch.npc==="Laiba Echo"; ammara.visible=ch.npc==="Ammara"; const guide=ch.npc==="Pika"?pika:ch.npc==="Ammara"?ammara:mufliya; guide.position.set(ch.npc==="Ammara"?0:-4, ch.npc==="Ammara"?6:.0, ch.npc==="Ammara"?-9:-4.8); addObject(guide,"npc",ch.npc,[ch.npc==="Pika"?"It was never a microwave. It was architecture.":ch.npc==="Ammara"?"I am Ammara, Dragon of Shared Light. Your daily care woke me.":"I know Laiba. If the moon is brighter today, it is probably her fault."]); addLabel(ch.npc,guide.position.x,guide.position.y+(ch.npc==="Ammara"?1.8:2.0),guide.position.z,ch.color);}
function addSparks(ch){const got=sparkList(); for(let i=0;i<5;i++){const id=`${ch.id}:spark:${i}`; if(got.includes(id))continue; const s=sphere(.18,ch.color,{emissive:ch.color,emissiveIntensity:1}); s.position.set(-8+i*4,.42,1.5+Math.sin(i)*4); addObject(s,"spark",`Memory Spark ${i+1}`,[ch.lines[i%ch.lines.length]],id); particles.push({mesh:s,type:"spark",phase:i});}}
function addRelicAndPortal(ch){if(!save.relics.includes(ch.relic)){const r=sphere(.42,ch.color,{emissive:ch.color,emissiveIntensity:.95,metalness:.1,roughness:.25}); r.position.set(0,.78,-2.2); addObject(r,"relic",ch.relic,ch.lines,`${ch.id}:relic`); particles.push({mesh:r,type:"relic",phase:0}); addLabel(ch.relic,0,1.55,-2.2,ch.color);} const p=new THREE.Group(); const ring=new THREE.Mesh(new THREE.TorusGeometry(1.0,.08,16,64),material(ch.color,{emissive:ch.color,emissiveIntensity:.95})); ring.rotation.x=Math.PI/2; const core=sphere(.36,ch.color,{emissive:ch.color,emissiveIntensity:1}); core.position.y=.35; p.add(ring,core); p.position.set(0,.45,-13); addObject(p,"portal","Next Realm",["The gate opens only after this realm's relic is recovered."],`${ch.id}:portal`); particles.push({mesh:p,type:"portal",phase:0}); addLabel("NEXT REALM",0,1.75,-13,ch.color);}
function addObject(mesh,type,label,lines,id=label){mesh.userData={type,label,lines,id}; objects.push(mesh); world.add(mesh); return mesh;}
function addLabel(text,x,y,z,c){const cv=document.createElement("canvas"); cv.width=512; cv.height=128; const ctx=cv.getContext("2d"); ctx.fillStyle="rgba(8,9,20,.78)"; ctx.fillRect(0,0,512,128); ctx.strokeStyle=`#${c.toString(16).padStart(6,"0")}`; ctx.lineWidth=6; ctx.strokeRect(8,8,496,112); ctx.fillStyle="#fff"; ctx.font="bold 36px system-ui"; ctx.textAlign="center"; ctx.fillText(text,256,76); const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true})); sp.position.set(x,y,z); sp.scale.set(3.0,.75,1); world.add(sp); labels.push(sp); return sp;}

function placeCharacters(reset){const playerName=save.player; const partnerName=playerName==="Afshaan"?"Laiba":"Afshaan"; configureCharacter(player,playerName); configureCharacter(partner,partnerName); const pos=!reset&&save.pos&&save.pos.chapter===save.chapter?save.pos:{x:0,z:9}; player.group.position.set(pos.x,0,pos.z); partner.group.position.set(pos.x-1.1,0,pos.z+1.1);}
function configureCharacter(obj,name){obj.name=name; obj.group.visible=true; const src=name==="Afshaan"?createCharacter("Afshaan"):createCharacter("Laiba"); obj.group.clear(); src.group.children.forEach(c=>obj.group.add(c.clone())); obj.armL=obj.group.children.find(c=>c.userData.part==="armL"); obj.armR=obj.group.children.find(c=>c.userData.part==="armR"); obj.legL=obj.group.children.find(c=>c.userData.part==="legL"); obj.legR=obj.group.children.find(c=>c.userData.part==="legR"); obj.phone=obj.group.children.find(c=>c.userData.part==="phone"); obj.walk=0; obj.speed=6.2;}
function nearestObject(max=1.55){let best=null,dist=max; for(const o of objects){const p=new THREE.Vector3(); o.getWorldPosition(p); p.y=0; const d=p.distanceTo(player.group.position); if(d<dist){best=o;dist=d;}} return best;}
function interact(){if(dialogue.length)return nextDialogue(); const o=nearestObject(); if(!o)return toast("Walk closer to a guide, spark, relic, or portal."); const {type,label,lines,id}=o.userData; if(type==="spark"){if(!sparkList().includes(id))sparkList().push(id); removeObject(o); persist(); updateHud(); return openDialogue(label,[...lines,"Memory spark collected."]);} if(type==="relic"){if(sparkList().length<3)return openDialogue(label,[`The ${label} is sleeping. Collect at least 3 memory sparks first.`]); if(!save.relics.includes(active.relic))save.relics.push(active.relic); removeObject(o); persist(); updateHud(); return openDialogue(label,[...lines,`${label} recovered.`]);} if(type==="portal"){if(!save.relics.includes(active.relic))return openDialogue("Sealed Gate",[`Recover ${active.relic} before leaving this realm.`]); if(save.chapter<chapters.length-1){loadChapter(save.chapter+1,true);} else openDialogue("Loading Month Six",[togetherTimer(),"Mashallah. Five months together. To be continued..."]); return;} if(type==="npc")return openDialogue(label,lines);}
function removeObject(o){objects=objects.filter(x=>x!==o); world.remove(o);}
function openDialogue(title,lines){dialogueTitle=title; dialogue=lines.slice(); dialogueEl.classList.remove("hidden"); nextDialogue();}
function nextDialogue(){const line=dialogue.shift(); if(!line){dialogueEl.classList.add("hidden"); return;} dialogueEl.querySelector("h3").textContent=dialogueTitle; dialogueEl.querySelector("p").textContent=line;}
function toast(msg){questEl.textContent=msg; setTimeout(updateHud,1700);}
function updateHud(){placeEl.textContent=`${active.title} · ${active.place}`; questEl.textContent=active.quest; relicsEl.textContent=`${save.relics.length}/${chapters.length} relics · ${fmt(save.playSeconds)}`; sparklineEl.textContent=`${sparkList().length}/5 sparks · ${save.relics.includes(active.relic)?active.relic+" secured":"relic sleeping"}`;}
function showTitle(){state="title"; overlay.className="overlay"; overlay.innerHTML=`<div class="panel"><p class="eyebrow">Immersive 3D Fantasy Romance Adventure</p><h1>Afshaan & Laiba:<br/>Dragonbound</h1><p>Explore The Between as a playable 3D love adventure: Afshaan the Starbound Scribe, Laiba the Moonlit Keeper, Pika the pigeon, Mufliya the Moonroom Oracle, and Ammara the Dragon of Shared Light.</p><div class="buttons"><button data-menu="new">New Adventure</button><button data-menu="resume">Resume</button><button data-menu="choose">Choose Hero</button><button data-menu="settings">Settings</button><button data-menu="story">Story</button></div></div>`;}
function showChoose(){overlay.className="overlay"; overlay.innerHTML=`<div class="panel"><h2>Choose Your Hero</h2><p>Both routes preserve the same canon. Afshaan carries the Messenger Blade and phone-orb. Laiba carries the Moonthread Charm and leaves moonflowers in her aura.</p><div class="buttons"><button data-player="Afshaan">Play as Afshaan</button><button data-player="Laiba">Play as Laiba</button><button data-menu="back">Back</button></div></div>`;}
function showStory(){overlay.className="overlay"; overlay.innerHTML=`<div class="panel"><h2>Story Bible Canon</h2><p>Afshaan and Laiba matched while Afshaan was in Baltimore and Laiba was in Ellicott City. Pika's photo created the first joke: “Is that inside a microwave??” After two months and Ramadan, Afshaan moved to Frisco for his job search, and the nearby beginning became long distance. The daily calls, songs, games, sleep calls, and screen kisses awakened Ammara and formed The Between.</p><div class="buttons"><button data-menu="back">Back</button></div></div>`;}
function showSettings(){overlay.className="overlay"; overlay.innerHTML=`<div class="panel"><h2>Settings</h2><p>Music previews are ${settings.music?"ON":"OFF"}. Camera: ${settings.camera||"follow"}.</p><div class="buttons"><button data-menu="music">Toggle Music</button><button data-menu="wide">Toggle Camera</button><button data-menu="back">Back</button></div></div>`;}
function startGame(fresh=false){if(fresh){const chosen=save.player||"Afshaan"; save=defaultSave(); save.player=chosen; custom=save.custom;} overlay.className="overlay hidden"; state="play"; loadChapter(save.chapter||0,!save.pos||fresh); bootMusic();}
function showJournal(){overlay.className="overlay"; overlay.innerHTML=`<div class="panel"><h2>Love Log</h2><p><b>Realm:</b> ${active.title}</p><p><b>Quest:</b> ${active.quest}</p><p><b>Relics:</b> ${save.relics.join(", ")||"none yet"}</p><p><b>Current Sparks:</b> ${sparkList().length}/5</p><p><b>Play Time:</b> ${fmt(save.playSeconds)}</p><p><b>Together:</b> ${togetherTimer()}</p><div class="buttons"><button data-menu="close">Close</button><button data-menu="reset">Reset Save</button></div></div>`;}
function bootMusic(){if(!settings.music||audio)return; audio=new Audio("https://p.scdn.co/mp3-preview/0d95bb81dbac4d96607c35dc8dae36a85b3e85ed?cid=2feb4729ba5145d7a7fd92f2af83cf0d"); audio.volume=.18; audio.loop=true; audio.play().catch(()=>{audio=null;});}
function stopMusic(){if(audio){audio.pause(); audio=null;}}

function update(dt){if(state!=="play"||dialogue.length)return; const dir=new THREE.Vector3(); if(keys.has("KeyW")||keys.has("ArrowUp")||mobile.up)dir.z-=1; if(keys.has("KeyS")||keys.has("ArrowDown")||mobile.down)dir.z+=1; if(keys.has("KeyA")||keys.has("ArrowLeft")||mobile.left)dir.x-=1; if(keys.has("KeyD")||keys.has("ArrowRight")||mobile.right)dir.x+=1; if(target){const d=target.clone().sub(player.group.position); d.y=0; if(d.length()<.25){target=null; interact();} else dir.copy(d.normalize());} if(dir.lengthSq()>0){dir.normalize(); const old=player.group.position.clone(); player.group.position.addScaledVector(dir,player.speed*dt); player.group.position.x=THREE.MathUtils.clamp(player.group.position.x,-21,21); player.group.position.z=THREE.MathUtils.clamp(player.group.position.z,-15,15); for(const s of solids){if(Math.abs(player.group.position.x-s.x)<s.w/2+.35&&Math.abs(player.group.position.z-s.z)<s.d/2+.35)player.group.position.copy(old);} player.group.lookAt(player.group.position.clone().add(dir)); animateCharacter(player,dt,true); save.pos={x:player.group.position.x,z:player.group.position.z,chapter:save.chapter};} else animateCharacter(player,dt,false); const follow=player.group.position.clone().add(new THREE.Vector3(-1.15,0,1.15)); partner.group.position.lerp(follow,.045); partner.group.lookAt(player.group.position); animateCharacter(partner,dt,partner.group.position.distanceTo(follow)>.08); animateWorld(dt); updatePrompt(); save.playSeconds+=dt; if(performance.now()-lastPersist>3500){lastPersist=performance.now(); persist(); updateHud();}}
function animateCharacter(c,dt,moving){if(moving){c.walk+=dt*10; if(c.legL)c.legL.rotation.x=Math.sin(c.walk)*.55; if(c.legR)c.legR.rotation.x=-Math.sin(c.walk)*.55; if(c.armL)c.armL.rotation.x=-Math.sin(c.walk)*.35; if(c.armR)c.armR.rotation.x=Math.sin(c.walk)*.35;} if(c.phone)c.phone.position.y=.75+Math.sin(performance.now()/300)*.035;}
function animateWorld(dt){const t=performance.now()/1000; for(const p of particles){if(p.type==="star")p.mesh.scale.setScalar(.7+Math.sin(t*2.5+p.phase)*.25); if(p.type==="spark"||p.type==="relic"){p.mesh.rotation.y+=dt*1.8; p.mesh.position.y=(p.type==="relic"?.78:.42)+Math.sin(t*2+p.phase)*.09;} if(p.type==="lantern"){p.mesh.scale.setScalar(1+Math.sin(t*2+p.phase)*.08); if(p.light)p.light.intensity=.8+Math.sin(t*2+p.phase)*.25;} if(p.type==="flower")p.mesh.position.y=.09+Math.sin(t*2+p.phase)*.035; if(p.type==="page"){p.mesh.rotation.y+=dt*.5; p.mesh.position.y+=Math.sin(t+p.phase)*.001;} if(p.type==="planet")p.mesh.rotation.y+=dt*.45; if(p.type==="water")p.mesh.material.opacity=.78+Math.sin(t)*.08; if(p.type==="portal")p.mesh.scale.setScalar(1+Math.sin(t*2)*.06); if(p.type==="heart")p.mesh.scale.setScalar(1+Math.sin(t*3.5)*.12);} ammara.rotation.y+=dt*.4; ammara.position.y=6+Math.sin(t*1.1)*.25; pika.rotation.y+=dt*2; pika.position.y=.6+Math.sin(t*4)*.07;}
function updatePrompt(){const o=nearestObject(); if(!o||dialogue.length){promptEl.classList.add("hidden");return;} promptEl.textContent=`E / Enter: ${o.userData.label}`; promptEl.classList.remove("hidden");}
function render(){const dt=Math.min(clock.getDelta(),.05); update(dt); const p=player.group.position; const wide=settings.camera==="wide"; camera.position.lerp(new THREE.Vector3(p.x,wide?18:12.5,p.z+(wide?18:12)),.06); camera.lookAt(p.x,.65,p.z-2.6); renderer.render(scene,camera); requestAnimationFrame(render);}

addEventListener("resize",()=>{renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();});
addEventListener("keydown",e=>{keys.add(e.code); if(state==="title"&&(e.code==="Enter"||e.code==="Space"))startGame(true); if(state==="play"&&(e.code==="KeyE"||e.code==="Enter"||e.code==="Space"))interact(); if(e.code==="KeyJ")showJournal(); if(e.code==="KeyS"){persist();toast("Saved");} if(e.code==="KeyM"){settings.music=!settings.music; persistSettings(); settings.music?bootMusic():stopMusic(); toast(`Music ${settings.music?"on":"off"}`);} if(e.code==="Escape")showTitle();});
addEventListener("keyup",e=>keys.delete(e.code));
canvas.addEventListener("pointerdown",e=>{if(state!=="play")return; const r=canvas.getBoundingClientRect(); pointer.x=((e.clientX-r.left)/r.width)*2-1; pointer.y=-(((e.clientY-r.top)/r.height)*2-1); raycaster.setFromCamera(pointer,camera); const hits=raycaster.intersectObjects(objects,true); if(hits.length){let root=objects.find(o=>o===hits[0].object||o.children.includes(hits[0].object)||o.children.some(c=>c===hits[0].object)); if(root){const p=new THREE.Vector3(); root.getWorldPosition(p); const away=player.group.position.clone().sub(p); away.y=0; if(away.lengthSq()<.1)away.set(1,0,1); away.normalize().multiplyScalar(.85); target=new THREE.Vector3(p.x+away.x,0,p.z+away.z); return;}} const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0); const point=new THREE.Vector3(); raycaster.ray.intersectPlane(plane,point); target=point;});
dialogueEl.querySelector("button").onclick=nextDialogue;
overlay.addEventListener("click",e=>{const m=e.target.dataset.menu; if(m==="new")return startGame(true); if(m==="resume")return startGame(false); if(m==="choose")return showChoose(); if(m==="settings")return showSettings(); if(m==="story")return showStory(); if(m==="back")return showTitle(); if(m==="close"){overlay.className="overlay hidden";state="play";return;} if(m==="reset"){save=defaultSave();persist();location.reload();} if(m==="music"){settings.music=!settings.music;persistSettings();settings.music?bootMusic():stopMusic();showSettings();} if(m==="wide"){settings.camera=settings.camera==="wide"?"follow":"wide";persistSettings();showSettings();} if(e.target.dataset.player){save.player=e.target.dataset.player;persist();startGame(true);}});
document.querySelectorAll(".mobile button").forEach(b=>{b.onpointerdown=e=>{e.preventDefault(); if(b.dataset.m)mobile[b.dataset.m]=true; if(b.dataset.action==="interact")interact(); if(b.dataset.action==="journal")showJournal();}; b.onpointerup=()=>{if(b.dataset.m)mobile[b.dataset.m]=false;};});
addEventListener("beforeunload",persist);
showTitle(); render();
