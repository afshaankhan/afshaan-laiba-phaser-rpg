const SAVE_KEY = "dragonbound-rpg-save-v3";
const SETTINGS_KEY = "dragonbound-rpg-settings-v3";
const START_DATE = new Date("2026-01-09T16:00:00-06:00");

const chapters = [
  {id:"hinge", title:"The Hinge Gate", place:"Baltimore / Ellicott City", quest:"Find Pika's photo, collect 3 memory sparks, awaken the Matchstone.", relic:"Matchstone", npc:"Pika", guide:"It was never a microwave. It was architecture.", tiles:"violet", lines:["January 9, 2026. Afshaan is still in Baltimore when the match appears.","Laiba's profile glows. Pika's photo opens a tiny door in the world.","Afshaan replies: Is that inside a microwave??","Laiba answers: it's his cage. The Between wakes up."], palette:0xff7ab8},
  {id:"aviary", title:"Aviary of Pika", place:"The Not-Microwave Palace", quest:"Solve Pika's cage-palace and earn the Pigeon Feather.", relic:"Pigeon Feather", npc:"Pika", guide:"Coo. Finally, someone respects the architecture.", tiles:"water", lines:["The pigeon photo expands into a crystal aviary.","The walls pretend to be a microwave because the world is teasing Afshaan.","Pika leads the way through cage mirrors and moonseed perches.","A feather drops, glowing white and blue."], palette:0x9be7ff},
  {id:"messages", title:"Lantern Library", place:"First Messages", quest:"Collect message pages and light the Song Lantern.", relic:"Song Lantern", npc:"Mufliya", guide:"I know Laiba. If the moon is brighter today, it is probably her fault.", tiles:"forest", lines:["Every early text becomes a floating page.","Mystery of Love becomes a lantern in the center of the room.","Call Me By Your Name becomes a moonlit reel.","The messages do not feel forced. That is their first magic."], palette:0x7ec8ff},
  {id:"ramadan", title:"Ramadan Threshold", place:"Baltimore Harbor", quest:"Light the Ramadan lanterns before the Westward Door opens.", relic:"Westward Lantern", npc:"Mufliya", guide:"Long distance is not a title. It is something you prove daily.", tiles:"gold", lines:["For two months, the story is nearby: Baltimore and Ellicott under one soft moon.","After Ramadan, Afshaan must move to Frisco, Texas for job search.","The Westward Door is not evil. It is life becoming real.","Laiba says: Then come back every day. Afshaan says: I will."], palette:0xffd166},
  {id:"skybridge", title:"Long-Distance Skybridge", place:"Frisco ↔ Ellicott City", quest:"Repair the bridge with FaceTime light.", relic:"FaceTime Mirror", npc:"Ammara", guide:"Repeated care becomes architecture.", tiles:"water", lines:["Frisco becomes the western star. Ellicott City stays the eastern moon.","A bridge appears from call logs, prayers, songs, and daily check-ins.","Every FaceTime call lays another tile under their feet.","Distance stays large, but the road becomes real."], palette:0x76b7ff},
  {id:"theater", title:"Google Meet Moon Theater", place:"The Shared Screen Moon", quest:"Collect film reels and recover the Movie Moon.", relic:"Movie Moon", npc:"Laiba Echo", guide:"Sometimes the movie is not the main thing. Sometimes it is the person reacting to it.", tiles:"violet", lines:["Seats made of clouds gather under a giant Google Meet mirror.","They press play from different rooms and enter the same moment.","Popcorn appears on both sides of the country.","The screen becomes a small date night."], palette:0xecc9ff},
  {id:"festival", title:"Festival of Little Games", place:"Skribbl Market", quest:"Win the Game Dice by playing instead of rushing.", relic:"Game Dice", npc:"Mufliya", guide:"Laiba is competitive. You should prepare emotionally.", tiles:"forest", lines:["Skribbl tents glow beside Name Place Animal Thing stalls.","Laiba plays. Afshaan watches, cheers, and loses with dignity.","The market laughs when someone guesses the impossible from a tiny doodle.","Love is also repetition, teasing, and showing up for small rituals."], palette:0x66e38a},
  {id:"jam", title:"Spotify Jam Constellation", place:"Song Planets", quest:"Tune the shared playlist and form the Screen-Kiss Star.", relic:"Screen-Kiss Star", npc:"Ammara", guide:"Songs are portable places. Listen together, and distance shrinks.", tiles:"water", lines:["The playlist becomes a constellation of glowing song planets.","Mystery of Love keeps returning like a comet.","Soft songs make the Frisco-Ellicott road warmer.","A star forms from screen kisses and shared listening."], palette:0x1ed760},
  {id:"sleepsea", title:"Sleep Call Sea", place:"Two-Moon Shore", quest:"Keep the call lantern alive until dawn.", relic:"Dream Thread", npc:"Pika", guide:"Coo... I will be quiet this once.", tiles:"water", lines:["Phones float like lantern boats on a calm dark sea.","There is no battle here. Only quiet breathing and safe feeling.","The Mists whisper from the waves, but the call lantern stays lit.","Long distance loses another night."], palette:0xa9b4ff},
  {id:"garden", title:"Morning Garden", place:"Daily Bloom Shrine", quest:"Wake the flowers of daily care.", relic:"Daily Bloom", npc:"Laiba Echo", guide:"Good morning becomes magic when it keeps returning.", tiles:"gold", lines:["Sunrise flowers open only when greeted with care.","Good morning. Did you sleep? Eat something. Miss you. Call later. Safe drive. Always here.","Nothing here is dramatic, and that is why it matters.","Grand romance survives through small repeated choices."], palette:0xffb86b},
  {id:"shrine", title:"Five-Month Dragon Shrine", place:"Ammara's Heart Gate", quest:"Place every relic and load Month Six.", relic:"Month Six Door", npc:"Ammara", guide:"Five months is not the end of the road. It is proof the road exists.", tiles:"violet", lines:["The relics rise together inside Ammara's shrine.","Afshaan and Laiba stand on opposite sides of the glowing mirror-screen.","They send screen kisses through the shrine. The crack becomes a doorway.","To be continued... Loading Month Six."], palette:0xffd166}
];

const TILE = 16;
const MAP_W = 72;
const MAP_H = 48;
const WORLD_W = MAP_W * TILE;
const WORLD_H = MAP_H * TILE;
const defaultSave = () => ({chapter:0, player:"Afshaan", relics:[], shards:{}, pos:null, playSeconds:0});
let save = loadSave();
let settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") || {};
settings.music ??= true;
let cursors, wasd, player, partner, npcs, shards, relic, portal, blockers, labels, promptText, currentNear, dialogueQueue=[], dialogueOpen=false, mobileHeld={};
let hud, dialogueEl, menuEl, placeEl, questEl, relicsEl, promptEl;
let lastSaveAt=0, bgm=null;

function loadSave(){try{return {...defaultSave(), ...(JSON.parse(localStorage.getItem(SAVE_KEY))||{})};}catch{return defaultSave();}}
function persist(){localStorage.setItem(SAVE_KEY, JSON.stringify(save));}
function chapter(){return chapters[Math.max(0, Math.min(save.chapter, chapters.length-1))];}
function shardList(){save.shards[chapter().id] ||= []; return save.shards[chapter().id];}
function togetherTimer(){const s=Math.max(0,Math.floor((Date.now()-START_DATE.getTime())/1000));const mo=Math.floor(s/2629746);const d=Math.floor((s-mo*2629746)/86400);const h=Math.floor((s%86400)/3600);const m=Math.floor((s%3600)/60);return `${mo} months · ${d} days · ${h}h ${m}m since together`;}
function fmt(sec){const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=Math.floor(sec%60);return `${h}h ${m}m ${s}s`;}

class BootScene extends Phaser.Scene{
  constructor(){super("boot");}
  preload(){
    this.load.spritesheet("forest","assets/vendor/gentle-forest/full/gentle-forest-v01.png",{frameWidth:16,frameHeight:16});
    this.load.spritesheet("forest2","assets/vendor/gentle-forest/full/gentle-forest-v02.png",{frameWidth:16,frameHeight:16});
    this.load.image("waterfall","assets/vendor/gentle-forest/full/gentle-waterfall-v01.png");
    this.load.image("cats","assets/vendor/retro-cats/retro-cats-free.png");
    this.load.spritesheet("afshaan","assets/vendor/mana-seed-character/afshaan-sheet.png",{frameWidth:64,frameHeight:64});
    this.load.spritesheet("laiba","assets/vendor/mana-seed-character/laiba-sheet.png",{frameWidth:64,frameHeight:64});
  }
  create(){createDom(); this.scene.start("title");}
}

class TitleScene extends Phaser.Scene{
  constructor(){super("title");}
  create(){
    this.add.rectangle(0,0,960,540,0x111827).setOrigin(0);
    for(let i=0;i<90;i++) this.add.circle(Math.random()*960,Math.random()*540,Math.random()*2+1,0xffffff,Math.random()*0.5+0.15);
    this.add.text(480,90,"Afshaan & Laiba",{fontFamily:"Georgia",fontSize:"68px",color:"#ffd6e8",stroke:"#2a102e",strokeThickness:8}).setOrigin(.5);
    this.add.text(480,155,"DRAGONBOUND",{fontFamily:"Georgia",fontSize:"52px",color:"#ffd166",stroke:"#2a102e",strokeThickness:7}).setOrigin(.5);
    this.add.text(480,215,"A fantasy romance RPG built from Baltimore, Pika, Ramadan, Frisco, FaceTime, songs, games, and Ammara.",{fontFamily:"system-ui",fontSize:"17px",color:"#f7ecff",align:"center",wordWrap:{width:760}}).setOrigin(.5);
    const a=this.add.sprite(390,315,"afshaan",32).setScale(1.35); const l=this.add.sprite(570,315,"laiba",32).setScale(1.35);
    this.tweens.add({targets:[a,l],y:"-=8",duration:900,yoyo:true,repeat:-1,ease:"Sine.inOut"});
    button(this,480,410,"New Adventure",()=>{save=defaultSave();persist();this.scene.start("game")});
    button(this,320,470,"Resume",()=>this.scene.start("game"));
    button(this,480,470,"Choose Character",()=>this.scene.start("choose"));
    button(this,660,470,"Settings",()=>showSettings(()=>this.scene.restart()));
    this.input.keyboard.on("keydown-ENTER",()=>{save=defaultSave();persist();this.scene.start("game")});
    this.input.keyboard.on("keydown-SPACE",()=>{save=defaultSave();persist();this.scene.start("game")});
    this.input.keyboard.on("keydown-C",()=>this.scene.start("choose"));
    this.input.keyboard.on("keydown-S",()=>showSettings(()=>this.scene.restart()));
  }
}

class ChooseScene extends Phaser.Scene{
  constructor(){super("choose");}
  create(){
    this.add.rectangle(0,0,960,540,0x15152b).setOrigin(0);
    this.add.text(480,70,"Choose Your Hero",{fontFamily:"Georgia",fontSize:"46px",color:"#ffd6e8"}).setOrigin(.5);
    characterCard(this,300,285,"Afshaan","Baltimore beginning · Frisco Starfield","afshaan",()=>{save.player="Afshaan";persist();this.scene.start("game")});
    characterCard(this,660,285,"Laiba","Ellicott City moonlight · playable hero","laiba",()=>{save.player="Laiba";persist();this.scene.start("game")});
    button(this,480,490,"Back",()=>this.scene.start("title"));
    this.input.keyboard.on("keydown-A",()=>{save.player="Afshaan";persist();this.scene.start("game")});
    this.input.keyboard.on("keydown-L",()=>{save.player="Laiba";persist();this.scene.start("game")});
    this.input.keyboard.on("keydown-ESC",()=>this.scene.start("title"));
  }
}

class GameScene extends Phaser.Scene{
  constructor(){super("game");}
  create(){
    this.input.setDefaultCursor("pointer");
    buildAnimations(this);
    this.chapter=chapter();
    this.physics.world.setBounds(0,0,WORLD_W,WORLD_H);
    createMap(this, this.chapter);
    createCharacters(this);
    createObjects(this);
    this.cameras.main.setBounds(0,0,WORLD_W,WORLD_H).startFollow(player,true,.12,.12).setZoom(2);
    cursors=this.input.keyboard.createCursorKeys();
    wasd=this.input.keyboard.addKeys("W,A,S,D,E,J,S,SPACE,ENTER,ESC,M");
    this.input.keyboard.on("keydown-E",()=>tryInteract(this));
    this.input.keyboard.on("keydown-SPACE",()=>tryInteract(this));
    this.input.keyboard.on("keydown-ENTER",()=>dialogueOpen?nextDialogue():tryInteract(this));
    this.input.keyboard.on("keydown-J",()=>showJournal());
    this.input.keyboard.on("keydown-ESC",()=>this.scene.start("title"));
    this.input.keyboard.on("keydown-S",()=>{persist();toast("Saved")});
    this.input.keyboard.on("keydown-M",()=>toggleMusic());
    this.input.on("pointerdown",p=>{ if(dialogueOpen){nextDialogue(); return;} const wp=this.cameras.main.getWorldPoint(p.x,p.y); this.target=new Phaser.Math.Vector2(wp.x,wp.y); });
    showHud(); updateHud(); bootMusic();
  }
  update(_,dtMs){
    const dt=dtMs/1000; save.playSeconds += dt;
    const speed=150; let vx=0,vy=0;
    if(this.target){const d=Phaser.Math.Distance.Between(player.x,player.y,this.target.x,this.target.y); if(d<8){this.target=null; tryInteract(this);} else {const a=Phaser.Math.Angle.Between(player.x,player.y,this.target.x,this.target.y); vx=Math.cos(a)*speed; vy=Math.sin(a)*speed;}}
    if(cursors.left.isDown||wasd.A.isDown||mobileHeld.left){vx=-speed;this.target=null;} if(cursors.right.isDown||wasd.D.isDown||mobileHeld.right){vx=speed;this.target=null;} if(cursors.up.isDown||wasd.W.isDown||mobileHeld.up){vy=-speed;this.target=null;} if(cursors.down.isDown||wasd.S.isDown||mobileHeld.down){vy=speed;this.target=null;}
    if(vx&&vy){vx*=.707;vy*=.707;} player.setVelocity(vx,vy);
    animatePlayer(player,vx,vy,save.player.toLowerCase());
    followPartner(dt);
    updatePrompt(this);
    if(performance.now()-lastSaveAt>3500){lastSaveAt=performance.now(); save.pos={x:player.x,y:player.y,chapter:save.chapter}; persist(); updateHud();}
  }
}

function createMap(scene,ch){
  const data=[]; const base=ch.tiles==="water"?82:ch.tiles==="gold"?1:0; const path=ch.tiles==="water"?83:2; const flower=39; const edge=16;
  for(let y=0;y<MAP_H;y++){const row=[];for(let x=0;x<MAP_W;x++){let t=base;if(x<2||y<2||x>MAP_W-3||y>MAP_H-3)t=edge; if(Math.abs(x-MAP_W/2)<3||Math.abs(y-MAP_H/2)<2)t=path; if((x*17+y*11)%53===0)t=flower; row.push(t);}data.push(row);} 
  const map=scene.make.tilemap({data,tileWidth:TILE,tileHeight:TILE}); const tiles=map.addTilesetImage("forest"); const layer=map.createLayer(0,tiles,0,0); layer.setScale(1); 
  blockers=scene.physics.add.staticGroup();
  for(let x=0;x<MAP_W;x++){addBlock(scene,x*TILE+8,8,16,16);addBlock(scene,x*TILE+8,(MAP_H-1)*TILE+8,16,16);} for(let y=0;y<MAP_H;y++){addBlock(scene,8,y*TILE+8,16,16);addBlock(scene,(MAP_W-1)*TILE+8,y*TILE+8,16,16);} 
  for(let i=0;i<42;i++){const x=Phaser.Math.Between(5,MAP_W-6),y=Phaser.Math.Between(5,MAP_H-6); if(Math.abs(x-MAP_W/2)<5||Math.abs(y-MAP_H/2)<4)continue; scene.add.image(x*TILE+8,y*TILE+4,"forest",55).setOrigin(.5,1).setDepth(y*TILE+30); addBlock(scene,x*TILE+8,y*TILE+8,18,18);} 
  for(let i=0;i<16;i++){scene.add.image(Phaser.Math.Between(90,WORLD_W-90),Phaser.Math.Between(90,WORLD_H-90),"forest",Phaser.Math.Between(35,40)).setDepth(2).setScale(1.1)}
  if(["aviary","skybridge","sleepsea","jam"].includes(ch.id)){for(let x=8;x<18;x++)for(let y=30;y<39;y++)scene.add.image(x*TILE+8,y*TILE+8,"forest",96).setDepth(1);scene.add.image(13*TILE,30*TILE,"waterfall").setDepth(400).setScale(1.1)}
  labels=scene.add.group(); label(scene,WORLD_W/2,70,ch.title,24); label(scene,WORLD_W/2,104,ch.place,14,"#ffd166");
}
function addBlock(scene,x,y,w,h){const b=scene.add.rectangle(x,y,w,h,0x000000,0);scene.physics.add.existing(b,true);blockers.add(b);return b;}
function label(scene,x,y,text,size=13,color="#fff"){const t=scene.add.text(x,y,text,{fontFamily:"Georgia",fontSize:`${size}px`,color,stroke:"#111827",strokeThickness:4}).setOrigin(.5).setDepth(900);labels.add(t);return t;}

function createCharacters(scene){
  const key=save.player.toLowerCase(); const other=save.player==="Afshaan"?"laiba":"afshaan"; const start=save.pos&&save.pos.chapter===save.chapter?save.pos:{x:WORLD_W/2,y:WORLD_H-120};
  player=scene.physics.add.sprite(start.x,start.y,key,32).setSize(22,26).setOffset(21,34).setDepth(500); player.nameKey=key;
  partner=scene.physics.add.sprite(start.x-38,start.y+28,other,32).setSize(22,26).setOffset(21,34).setDepth(499); partner.nameKey=other;
  scene.physics.add.collider(player,blockers); scene.physics.add.collider(partner,blockers);
}
function createObjects(scene){
  const ch=chapter(); shards=scene.physics.add.group(); const collected=shardList();
  const spots=[[180,190],[310,485],[560,255],[820,420],[930,180]];
  spots.forEach((p,i)=>{const id=`${ch.id}:shard:${i}`; if(collected.includes(id))return; const s=scene.add.circle(p[0],p[1],8,ch.palette,.95).setStrokeStyle(2,0xffffff,.7).setDepth(300); scene.physics.add.existing(s); s.body.setCircle(9); s.kind="shard";s.id=id;s.dialogue=ch.lines[i%ch.lines.length]; shards.add(s); scene.tweens.add({targets:s,y:s.y-8,duration:900,yoyo:true,repeat:-1,ease:"Sine.inOut"});});
  scene.physics.add.overlap(player,shards,(_,s)=>collectShard(scene,s));
  const hasRelic=save.relics.includes(ch.relic); relic=null;
  if(!hasRelic){relic=scene.add.image(WORLD_W/2,WORLD_H/2-70,"forest",Phaser.Math.Between(112,118)).setTint(ch.palette).setScale(1.7).setDepth(400); scene.physics.add.existing(relic); relic.body.setSize(24,24); relic.kind="relic"; relic.label=ch.relic; scene.tweens.add({targets:relic,angle:360,duration:5000,repeat:-1}); label(scene,relic.x,relic.y-34,ch.relic,12,"#ffd6e8");}
  const portalSprite=scene.add.image(WORLD_W/2,84,"forest",143).setScale(2.4).setTint(ch.palette).setDepth(350); scene.physics.add.existing(portalSprite); portalSprite.body.setSize(52,52); portalSprite.kind="portal"; portalSprite.label="Next Realm"; portal=portalSprite; scene.tweens.add({targets:portalSprite,scale:2.8,duration:800,yoyo:true,repeat:-1}); label(scene,portal.x,portal.y-40,"Next Realm",12,"#ffd166");
  const npcX=ch.npc==="Ammara"?WORLD_W/2+120:WORLD_W/2-150; const npcY=ch.npc==="Pika"?WORLD_H/2-125:WORLD_H/2+90;
  npcs=scene.physics.add.staticGroup(); const n=scene.add.sprite(npcX,npcY,ch.npc==="Mufliya"?"laiba":"afshaan",32).setTint(ch.npc==="Pika"?0xffffff:ch.npc==="Ammara"?0xffd166:0xc9a2d6).setScale(ch.npc==="Ammara"?1.4:1).setDepth(450); scene.physics.add.existing(n,true); n.kind="npc";n.label=ch.npc;n.dialogue=ch.guide;npcs.add(n); label(scene,npcX,npcY-44,ch.npc,12,"#fff");
  scene.physics.add.overlap(player,portal,()=>{},null,scene);
}
function collectShard(scene,s){if(!s.active)return; shardList().push(s.id); s.destroy(); persist(); updateHud(); openDialogue("Memory Shard",[s.dialogue,"A memory spark joins your journal."]);}

function tryInteract(scene){
  if(dialogueOpen){nextDialogue();return;} const ch=chapter(); const near=(obj,dist=48)=>obj&&Phaser.Math.Distance.Between(player.x,player.y,obj.x,obj.y)<dist;
  if(near(relic,56)){if(shardList().length<3)return openDialogue(ch.relic,[`The ${ch.relic} is asleep. Collect at least 3 memory sparks first.`]); if(!save.relics.includes(ch.relic))save.relics.push(ch.relic); relic.destroy(); relic=null; persist(); updateHud(); return openDialogue(ch.relic,[...ch.lines,`${ch.relic} recovered.`]);}
  if(near(portal,62)){if(!save.relics.includes(ch.relic))return openDialogue("Sealed Gate",[`Recover ${ch.relic} before leaving this realm.`]); if(save.chapter<chapters.length-1){save.chapter++;save.pos=null;persist();scene.scene.restart();}else openDialogue("Loading Month Six",[togetherTimer(),"Mashallah. Five months together. To be continued..."]);return;}
  let closest=null; npcs.children.iterate(n=>{if(n&&Phaser.Math.Distance.Between(player.x,player.y,n.x,n.y)<58)closest=n}); if(closest)return openDialogue(closest.label,[closest.dialogue]);
  toast("Walk closer to a sparkle, relic, guide, or portal.");
}
function updatePrompt(scene){let msg=""; const ch=chapter(); const near=(obj,dist=55)=>obj&&Phaser.Math.Distance.Between(player.x,player.y,obj.x,obj.y)<dist; if(near(relic))msg=`E: ${ch.relic}`; else if(near(portal))msg="E: Next Realm"; else npcs.children.iterate(n=>{if(!msg&&n&&Phaser.Math.Distance.Between(player.x,player.y,n.x,n.y)<58)msg=`E: ${n.label}`}); promptEl.textContent=msg; promptEl.classList.toggle("hidden",!msg||dialogueOpen);}
function followPartner(dt){const d=Phaser.Math.Distance.Between(partner.x,partner.y,player.x-35,player.y+26); if(d>42){sceneMoveSprite(partner,player.x-35,player.y+26,95,dt);} else partner.setVelocity(0,0);}
function sceneMoveSprite(sprite,x,y,speed,dt){const a=Phaser.Math.Angle.Between(sprite.x,sprite.y,x,y); sprite.setVelocity(Math.cos(a)*speed,Math.sin(a)*speed); animatePlayer(sprite,Math.cos(a),Math.sin(a),sprite.nameKey);}
function animatePlayer(s,vx,vy,key){if(Math.abs(vx)<1&&Math.abs(vy)<1){s.anims.stop();return;} let dir="down"; if(Math.abs(vx)>Math.abs(vy))dir=vx>0?"right":"left"; else dir=vy>0?"down":"up"; s.anims.play(`${key}-${dir}`,true); s.setDepth(s.y);}
function buildAnimations(scene){["afshaan","laiba"].forEach(key=>{const rows={down:4,left:5,right:6,up:7}; Object.entries(rows).forEach(([dir,row])=>{if(scene.anims.exists(`${key}-${dir}`))return; scene.anims.create({key:`${key}-${dir}`,frames:scene.anims.generateFrameNumbers(key,{start:row*8,end:row*8+7}),frameRate:10,repeat:-1});});});}
function button(scene,x,y,text,cb){const t=scene.add.text(x,y,text,{fontFamily:"system-ui",fontSize:"18px",fontStyle:"bold",color:"#fff",backgroundColor:"#59366f",padding:{x:20,y:12}}).setOrigin(.5).setInteractive({useHandCursor:true});t.on("pointerdown",cb);return t;}
function characterCard(scene,x,y,name,sub,key,cb){scene.add.rectangle(x,y,250,300,0x241936,.95).setStrokeStyle(2,0xffd6e8);scene.add.sprite(x,y-36,key,32).setScale(1.75);scene.add.text(x,y+78,name,{fontFamily:"Georgia",fontSize:"30px",color:"#ffd6e8"}).setOrigin(.5);scene.add.text(x,y+114,sub,{fontFamily:"system-ui",fontSize:"13px",color:"#eee",align:"center",wordWrap:{width:210}}).setOrigin(.5);button(scene,x,y+166,`Play as ${name}`,cb);}

function createDom(){
  document.getElementById("game-shell").insertAdjacentHTML("beforeend",`<section class="game-ui"><div class="topbar"><div class="hud-card"><strong id="place"></strong><span id="quest"></span></div><div class="hud-card"><strong id="relics"></strong></div></div><div id="prompt" class="prompt hidden"></div><div id="dialogue" class="dialogue hidden"><h3></h3><p></p><button>Continue</button></div><div id="menu" class="menu hidden"><div class="panel"></div></div><div class="mobile"><div class="pad"><button data-m="up">▲</button><button data-m="left">◀</button><button data-m="down">▼</button><button data-m="right">▶</button></div><div class="act"><button data-action="interact">E</button><button data-action="journal">J</button></div></div></section>`);
  hud=document.querySelector(".topbar"); dialogueEl=document.getElementById("dialogue"); menuEl=document.getElementById("menu"); placeEl=document.getElementById("place"); questEl=document.getElementById("quest"); relicsEl=document.getElementById("relics"); promptEl=document.getElementById("prompt");
  dialogueEl.querySelector("button").addEventListener("click",nextDialogue);
  document.querySelectorAll(".mobile button").forEach(b=>{b.addEventListener("pointerdown",e=>{e.preventDefault(); if(b.dataset.m)mobileHeld[b.dataset.m]=true; if(b.dataset.action==="interact")tryInteract(game.scene.keys.game); if(b.dataset.action==="journal")showJournal();}); b.addEventListener("pointerup",()=>{if(b.dataset.m)mobileHeld[b.dataset.m]=false;});});
}
function showHud(){hud.style.display="flex";} function updateHud(){const ch=chapter(); placeEl.textContent=`${ch.title} · ${ch.place}`; questEl.textContent=ch.quest; relicsEl.textContent=`${save.relics.length}/${chapters.length} relics · ${shardList().length}/5 sparks · ${fmt(save.playSeconds)}`;}
function openDialogue(title,lines){dialogueOpen=true;dialogueQueue=lines.slice();dialogueEl.classList.remove("hidden");dialogueEl.querySelector("h3").textContent=title;nextDialogue();}
function nextDialogue(){if(!dialogueOpen)return;const line=dialogueQueue.shift();if(!line){dialogueOpen=false;dialogueEl.classList.add("hidden");return;}dialogueEl.querySelector("p").textContent=line;}
function showJournal(){const ch=chapter(); menuEl.classList.remove("hidden");menuEl.querySelector(".panel").innerHTML=`<h2>Love Log</h2><p><b>Current Realm:</b> ${ch.title}</p><p><b>Quest:</b> ${ch.quest}</p><p><b>Relics:</b> ${save.relics.join(", ")||"none yet"}</p><p><b>Current sparks:</b> ${shardList().length}/5</p><p><b>Play time:</b> ${fmt(save.playSeconds)}</p><p><b>Final timer:</b> ${togetherTimer()}</p><div class="buttons"><button id="close-menu">Close</button><button id="reset-save">Reset Save</button></div>`;document.getElementById("close-menu").onclick=()=>menuEl.classList.add("hidden");document.getElementById("reset-save").onclick=()=>{save=defaultSave();persist();location.reload();};}
function showSettings(after){menuEl.classList.remove("hidden");menuEl.querySelector(".panel").innerHTML=`<h2>Settings</h2><p>Music previews: ${settings.music?"ON":"OFF"}</p><div class="buttons"><button id="music-toggle">Toggle Music</button><button id="close-menu">Close</button></div>`;document.getElementById("music-toggle").onclick=()=>{settings.music=!settings.music;localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));settings.music?bootMusic():stopMusic();showSettings(after);};document.getElementById("close-menu").onclick=()=>{menuEl.classList.add("hidden");after&&after();};}
function toast(msg){questEl.textContent=msg;setTimeout(updateHud,1600);}
function bootMusic(){if(!settings.music||bgm)return;bgm=new Audio("https://p.scdn.co/mp3-preview/0d95bb81dbac4d96607c35dc8dae36a85b3e85ed?cid=2feb4729ba5145d7a7fd92f2af83cf0d");bgm.volume=.18;bgm.loop=true;bgm.play().catch(()=>{});}function stopMusic(){if(bgm){bgm.pause();bgm=null;}}function toggleMusic(){settings.music=!settings.music;localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));settings.music?bootMusic():stopMusic();toast(`Music ${settings.music?"on":"off"}`);}

const game = new Phaser.Game({type:Phaser.AUTO,parent:"game-shell",width:960,height:540,pixelArt:true,backgroundColor:"#101824",physics:{default:"arcade",arcade:{debug:false,gravity:{y:0}}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[BootScene,TitleScene,ChooseScene,GameScene]});
window.addEventListener("beforeunload",persist);
