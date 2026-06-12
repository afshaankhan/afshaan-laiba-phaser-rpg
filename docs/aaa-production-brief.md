# Dragonbound AAA Production Brief

This brief defines the target for the version the user is asking for: not a browser prototype, but a premium third-person 3D adventure with graphics closer to modern cinematic games.

## Honest Scope

The current GitHub Pages build is a playable web prototype. It can prove story flow, controls, quest progression, chapter order, and interaction logic.

The requested visual target requires a real 3D production pipeline:

- Unreal Engine 5 or Unity HDRP
- Sculpted/high-quality character models
- Rigging and animation
- PBR materials
- Environment art
- Cinematic lighting
- Camera direction
- Optimization and packaging

The browser prototype should be treated as a playable design prototype, not the final visual form.

## Visual Target

Reference file:

- `concept-art/dragonbound-aaa-visual-target.png`

Target feel:

- Cinematic fantasy romance adventure
- Realistic/stylized-real characters, not low-poly
- Rich cloth, metal, feathers, glass, moonlight, volumetric mist
- Emotionally warm, magical, visually lush
- Third-person exploration with authored scenes

## Character Targets

### Afshaan Khan

Role: Starbound Scribe.

Model requirements:

- Young South Asian male hero
- Warm blue and silver layered clothing
- Crescent/star pin
- Messenger Blade used as a magical tool, not a combat weapon
- Glowing phone-orb in hand or at belt
- Grounded, sincere movement
- Idle animation: checks phone-orb, small anxious/hopeful shifts

### Laiba

Role: Moonlit Keeper.

Model requirements:

- Young South Asian female hero with fair skin and long flowing hair
- Rose, teal, and moon-white clothing
- Moonthread Charm
- Moonflower particles around her feet and hands
- Calm, graceful movement
- Idle animation: hair motion, soft glance, subtle screen glow
- Must be fully playable, not a rescued/princess character

### Pika

Role: actual pigeon companion.

Model requirements:

- White-grey pigeon with iridescent neck feathers
- Expressive proud posture
- Perches on crystal cage architecture
- Short hop, wing flap, head-bob, annoyed coo animations
- Recurring joke: the cage is not a microwave

### Mufliya

Role: Moonroom Oracle, Laiba's best friend.

Model requirements:

- Lavender, silver, and midnight-blue clothing
- Moon-journal prop
- Warm but perceptive expression
- Animation style: protective, observant, teasing but loyal

### Ammara

Role: Dragon of Shared Light.

Model requirements:

- Huge luminous dragon
- Glass-gold scales
- Translucent wings with phone-call waveform patterns
- Soft golden eyes
- Trails glowing chat bubbles, feathers, and audio-light particles
- Movement is slow, protective, and ancient, not aggressive

## Engine Recommendation

Use Unreal Engine 5 for the final version.

Reason:

- Best path for cinematic lighting, volumetric fog, Nanite/Lumen, post-processing, camera feel, and premium visual presentation.
- Easier to reach the target of "Assassin's Creed / Stray-like" visual ambition than with a static web game.

Use the current web game only as a playable previsualization.

## First Real Vertical Slice

Build one polished chapter before trying the full story:

### Chapter: The Hinge Gate

Playable goal:

1. Choose Afshaan or Laiba.
2. Walk through the magical Hinge Gate.
3. Find Pika's photo shrine.
4. Trigger the line: "Is that inside a microwave??"
5. Meet Pika as an animated pigeon.
6. Recover the Matchstone.
7. See Ammara's silhouette wake in the sky.

Required assets:

- Afshaan character model
- Laiba character model
- Pika pigeon model
- Ammara dragon silhouette or full model
- Hinge Gate environment
- Pigeon cage shrine
- Matchstone relic
- UI prompt/dialogue system
- Third-person controller
- Save checkpoint

## Production Phases

1. Concept lock
2. Character model sheets
3. Environment blockout
4. Third-person controller
5. Interaction/dialogue system
6. Chapter 1 vertical slice
7. Character animation pass
8. Lighting/material pass
9. Audio/music pass
10. Expansion to later realms

## Non-Negotiables From Story Bible

- The first two months are the nearby Baltimore/Ellicott chapter.
- Long distance begins only after Ramadan, when Afshaan moves to Frisco for job search.
- Pika must be an actual pigeon.
- Pika's cage joke is sacred lore.
- Laiba must be playable and powerful.
- Mufliya must represent Laiba's life and emotional support outside Afshaan.
- Ammara is a memory dragon, not a combat dragon.
- The ending must say "Loading Month Six..."
- The final timer counts from January 9, 2026 at 4:00 PM.
