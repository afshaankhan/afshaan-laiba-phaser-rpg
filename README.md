# Afshaan & Laiba: Dragonbound

A browser-based 3D fantasy romance adventure built from Afshaan and Laiba's relationship lore.

This version is a Three.js cinematic web prototype: no tilemap prototype, no 2D platformer. It combines a playable third-person 3D world with generated high-fidelity concept/key art, chapter-specific environments, collectible memory sparks, relic progression, NPC dialogue, partner following, click-to-walk, mobile controls, autosave, music preview ambience, and the Month Six ending timer.

The visual direction is now closer to the requested Assassin's Creed / Stray-style target through cinematic key art, character portrait art, and painted realm backdrops. It is still a browser prototype, not an Unreal/Unity AAA production build with rigged hero models.

## Play

- GitHub Pages: https://afshaankhan.github.io/afshaan-laiba-phaser-rpg/
- Original Zo route: https://epicgem.zo.space/5months

## Core Lore

- Afshaan and Laiba matched on Hinge on January 9, 2026 at 4:00 PM.
- Afshaan was in Baltimore when they matched; Laiba was in Ellicott City.
- The story started with Laiba's pigeon Pika and the line: "Is that inside a microwave??"
- It was not a microwave. It was Pika's cage.
- After two months and after Ramadan, Afshaan moved to Frisco, Texas for job search.
- Since then, the story becomes long-distance: FaceTime, Google Meet movies, games, Spotify Jam, sleep calls, and screen kisses.
- Ammara is the Dragon of Shared Light, awakened by calls, songs, prayers, jokes, and screen kisses.
- Mufliya is Laiba's best friend and appears as the Moonroom Oracle.
- Laiba is fully playable as the Moonlit Keeper, not a side character.

The full story bible is in `docs/dragonbound-story-script.md`.

## Characters

- **Afshaan Khan**: Starbound Scribe with warm blue/silver clothing, star pin, Messenger Blade, and glowing phone-orb.
- **Laiba**: Moonlit Keeper with rose, teal, and moon-white clothing, fair skin, long hair, Moonthread Charm, moonflower aura, and soft light particles.
- **Pika**: Actual 3D pigeon companion, proud guardian of the not-microwave cage.
- **Mufliya**: Lavender/silver Moonroom Oracle who protects Laiba's side of the story.
- **Ammara**: Luminous 3D dragon with glass-gold scales, translucent waveform wings, soft glowing eyes, and a hovering presence over The Between.

## Controls

- Start: Enter / Space or click "New Adventure"
- Choose hero: "Choose Hero" from title
- Move: Arrow keys / WASD
- Click/tap the ground: walk toward a point
- Interact / continue: E, Enter, or Space
- Love Log / journal: J
- Save: S
- Music toggle: M
- Return to title: Esc
- Mobile: on-screen D-pad and action buttons

## Game Features

- Three.js 3D rendering with shadows, fog, tone mapping, and procedural fantasy environments
- Cinematic title art, character portrait sheet, and realm backdrop art wired directly into the game UI/runtime
- Third-person follow camera with normal/wide camera modes
- Designed character models for Afshaan, Laiba, Pika, Mufliya, and Ammara
- Play as Afshaan or Laiba
- Partner character follows the player through every chapter
- 11 Dragonbound realms from the story bible
- Chapter-specific landmarks: Hinge Gate, crystal aviary, message library, Ramadan lantern road, skybridge, moon theater, game festival, song planets, sleep sea, morning garden, and five-month shrine
- Collect five memory sparks in each realm
- Relics wake after collecting at least three sparks
- Portals unlock after the realm relic is recovered
- NPC dialogue with Pika, Mufliya, Ammara, and Laiba Echo
- Autosave and resume with localStorage
- Final ending screen displays "Loading Month Six..." and a live timer since January 9, 2026 at 4:00 PM

## Current Realms

1. The Hinge Gate
2. Aviary of Pika
3. Lantern Library of First Messages
4. Ramadan Threshold
5. Long-Distance Skybridge
6. Google Meet Moon Theater
7. Festival of Little Games
8. Spotify Jam Constellation
9. Sleep Call Sea
10. Morning Garden
11. Five-Month Dragon Shrine

## Project Notes

The game is static and runs on GitHub Pages without a build step. It imports Three.js from a pinned ESM CDN and keeps all game logic in `src/main.js`.

This is intentionally browser-friendly cinematic/procedural 3D rather than a heavyweight Unreal/Unity project, so it can run immediately from a shareable website.

## Cinematic Art Assets

- `concept-art/dragonbound-cinematic-key-art.png` — current title/menu visual target.
- `concept-art/dragonbound-character-portraits.png` — dialogue and character-select portrait sheet.
- `concept-art/dragonbound-between-realm-backdrop.png` — in-world panoramic backdrop layer.
- `concept-art/dragonbound-aaa-visual-target.png` — earlier target concept retained for reference.
