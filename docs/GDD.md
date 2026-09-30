# Game Design Document — v0.1

## 1. Product statement
NOXY: Победи Лень is a Telegram Mini App game for Noxygen. It combines a stylized 3D endless runner with meta-progression, cosmetics, missions, social competition and humorous reversal moments where the player stops escaping and starts hunting Laziness.

The game must feel like a real game first and a branded product second.

## 2. Audience
Primary launch audience:
- existing Noxygen Telegram audience;
- clients already familiar with the brand.

Secondary audience:
- users reached through shares, challenges and social competition.

The product should remain understandable to a user who knows nothing about Noxygen.

## 3. Platform and UX
- Telegram Mini App.
- Launched from the existing Noxygen bot.
- Portrait 9:16.
- Mobile-first.
- RU first.
- Swipe input:
  - left/right: lane change;
  - up: jump;
  - down: slide.
- No energy/stamina limits.
- No ads.
- No mandatory payment.
- Typical target session: 2–5 minutes.

## 4. Core fantasy
The player tries to outrun personified Laziness.

Laziness is a visible pursuer, not only a UI meter. Mistakes let it approach. Repeated mistakes end the run.

Special mechanics reverse the fantasy:
- Rage;
- Boss Run;
- selected events.

During reversal, Laziness panics and runs from the player.

Tone may be deliberately absurd:
- losing a slipper while escaping;
- dragging a sofa;
- throwing pillows;
- player kicking the sofa after a boss victory;
- humorous defeat screens such as "Ну всё. С понедельника."

## 5. Core loop
1. Start a run.
2. Avoid obstacles and collect resources.
3. Use power-ups and maintain combo.
4. Finish or fail the run.
5. Receive rewards.
6. Improve account progression / hub / cosmetics / perks.
7. Complete missions and achievements.
8. Start the next run.

## 6. Run gameplay
### 6.1 Base runner
The first production mode is Endless.

Expected capabilities:
- 3 readable movement lanes or an equivalent lane-based navigation model;
- lane changes;
- jump;
- slide;
- obstacle collisions;
- speed escalation;
- procedural/endless track construction;
- fair obstacle generation;
- restart with minimal friction.

Future modes must remain possible without rewriting the core runner:
- Sprint / Race;
- Time Attack;
- Challenge Run;
- Boss Hunt.

### 6.2 Failure model
No traditional HP bar.

Conceptual states:
1. Laziness far away.
2. Laziness close.
3. Laziness almost catches the player.
4. Caught / run ends.

Mistakes reduce pursuit distance.
Positive mechanics may restore distance.
Shield may absorb a mistake.

### 6.3 Near Miss / Combo
Passing dangerously close to an obstacle can award a Near Miss / PERFECT event.

Combos increase rewards/score:
- x2;
- x3;
- x4;
- x5;
- future tuning allowed.

This mechanic should create a risk/reward skill layer beyond simple lane switching.

## 7. Power-ups
Initial mechanical set:
- Turbo — temporary high-speed invulnerability/destruction state.
- Shield — absorbs one mistake.
- Magnet — attracts nearby NX.
- Super Jump — increased jump height/range.
- Focus — temporary world slowdown.
- Rage — reverses pursuit; Laziness runs from the player.

Power-up mechanics are fixed before final Noxygen product mapping.

Important: in-game effects must not be presented as factual medical claims about real products.

## 8. Random events
Candidate events:
- NOXY Rush;
- Golden Street;
- Lazy Attack;
- Night Run;
- Drone Drop;
- Boss Run.

Events should interrupt monotony without destroying readability.

## 9. Boss Run
A signature reversal sequence.

Trigger example:
"ЛЕНЬ ОБНАРУЖЕНА"

Boss sequence goals:
- Laziness is in front of the player;
- player must close the distance;
- special obstacle patterns may appear;
- power-ups may be used;
- successful chase gives elevated rewards;
- finish may include comedic victory animation such as kicking the sofa away.

Boss Run is not required for the first technical spike but is a planned signature feature.

## 10. Character and customization
Male and female playable characters are required from the first playable release.

Initial editor scope:
- sex;
- several face presets;
- hairstyles;
- hair colors;
- skin tones;
- basic clothing.

Avoid a complex face sculpting system.

Long-term cosmetic categories:
- tops;
- bottoms;
- footwear;
- hats;
- glasses;
- watches/accessories;
- trails;
- boards/rideables if added;
- profile decoration;
- special effects.

Cosmetics must not provide pay-to-win advantages.

## 11. Meta progression
### 11.1 Hub
The player owns a visual home/base scene.

Progression concept:
- sofa + TV;
- room;
- home workout;
- gym;
- advanced gym;
- NOXY Lab / premium advanced space.

The hub provides visible long-term progress.

### 11.2 Perks
Prefer behavior-changing perks over flat stat percentages.

Examples:
- Second Chance;
- Collector;
- Parkour;
- Adrenaline;
- Combo Master;
- Extended Shield.

Players should eventually choose a limited subset before a run.

## 12. Economy
Two currencies from the beginning.

### 12.1 NX
Common currency.

Potential sources:
- run distance;
- pickups;
- combo;
- missions;
- random events.

Potential sinks:
- standard cosmetics;
- common unlocks;
- hub progression;
- selected perk unlocks.

### 12.2 Rare currency
Working name: NOXY Crystal.

Potential sources:
- achievements;
- bosses;
- weekly missions;
- milestones;
- special events.

The rare currency is not monetized in v1.

## 13. Retention
Planned systems:
- daily missions;
- weekly missions;
- daily rewards;
- achievements;
- weekly leaderboard;
- friend leaderboard/challenges;
- limited future events.

No artificial playtime restriction.

## 14. Social
Telegram is part of the product loop.

Planned concepts:
- global leaderboard;
- weekly leaderboard;
- friend leaderboard where technically practical;
- shareable challenge result;
- "побить результат" deep-link flow.

Exact implementation will be designed after the Telegram spike.

## 15. Brand integration
Noxygen presence should be noticeable but not turn the world into a branded theme park.

Brand may appear through:
- UI styling;
- selected environment props;
- product-inspired power-up visuals;
- cosmetics;
- hub objects;
- events;
- loading/transition art.

The game should remain fun if all logos are mentally removed.

## 16. Monetization
v1:
- no paid currency;
- no rewarded ads;
- no banner ads;
- no stamina sales.

Future business options are deliberately left open:
- cosmetics;
- premium seasons;
- Telegram Stars;
- paid branded content/seasons;
- white-label licensing to other brands;
- sponsorship;
- physical purchase -> cosmetic code.

No future monetization design may compromise basic run fairness.

## 17. Rewards
v1 rewards are in-game only.

Possible later additions:
- promo codes;
- merchandise;
- gifts;
- event prizes.

Any real-world reward mechanic requires separate legal/product review.

## 18. Language
First release language: Russian.

All user-facing text must use localization keys rather than being hard-coded into scenes/gameplay code where avoidable.

English and other locales are backlog items.

## 19. Connectivity
- Online account/sync is required.
- Temporary connection loss during a run must not immediately invalidate the run.
- Important progress is synchronized server-side.
- Local storage may hold settings/cache/non-authoritative state.

## 20. Anti-cheat philosophy
The server will not simulate every run.

The client executes gameplay and submits a run summary.

Server checks should reject obviously impossible results and protect valuable account state.

Example run result fields:
- run_id;
- mode;
- distance;
- duration;
- score;
- NX earned;
- rare currency earned;
- power-ups;
- event summary;
- client version.

Anti-cheat sophistication may grow with actual abuse risk.

## 21. Deferred decisions
Not fixed yet:
- final engine;
- final art direction inside "stylized 3D";
- exact Noxygen product-to-power-up mapping;
- exact economy numbers;
- number of launch biomes;
- final hub upgrade tree;
- final monetization model;
- real-world rewards.

These must not block the technical foundation.
