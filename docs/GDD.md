# Game Design Document — v0.2

## 1. Product statement
NOXY: Победи Лень is a browser-first stylized 3D runner for Noxygen. The same web build is intended to be embedded into Telegram later as a Mini App.

It combines an endless runner with meta-progression, cosmetics, missions and humorous reversal moments where the player stops escaping and starts hunting Laziness.

The game must feel like a real game first and a branded product second.

## 2. Audience
Primary launch audience:
- existing Noxygen audience;
- clients already familiar with the brand.

Secondary audience:
- users reached through shared links/results and later Telegram distribution.

The product should remain understandable to a user who knows nothing about Noxygen.

## 3. Platform and UX
- Browser-first web game.
- Telegram Mini App integration later, using the same hosted build.
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
6. Improve progression / hub / cosmetics / perks.
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

Mistakes reduce pursuit distance. Positive mechanics may restore distance. Shield may absorb a mistake.

### 6.3 Near Miss / Combo
Passing dangerously close to an obstacle can award a Near Miss / PERFECT event.

Combos increase rewards/score, e.g. x2 -> x3 -> x4 -> x5. Exact tuning is deferred.

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

Trigger example: "ЛЕНЬ ОБНАРУЖЕНА".

Goals:
- Laziness is in front of the player;
- player must close the distance;
- special obstacle patterns may appear;
- power-ups may be used;
- successful chase gives elevated rewards;
- finish may include a comedic victory animation such as kicking the sofa away.

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
Common currency from runs, pickups, combo, missions and events. Potential sinks: standard cosmetics, common unlocks, hub progression and selected perk unlocks.

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
Initial local-first retention systems:
- daily missions;
- weekly missions;
- daily rewards;
- achievements;
- local records;
- shareable result cards/links where useful.

Trusted global/friend leaderboards are deferred until an online service exists.

No artificial playtime restriction.

## 14. Social / Telegram
Telegram is a future distribution and platform-integration layer, not a dependency for the core game.

Later concepts:
- bot menu launch;
- Telegram fullscreen/safe-area behavior;
- haptics;
- shareable challenge flow;
- user context;
- global/friend leaderboards only if backend services are introduced.

The browser game must remain playable without Telegram.

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

Future business options remain open:
- cosmetics;
- premium seasons;
- Telegram Stars;
- paid branded content/seasons;
- white-label licensing;
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

Any real-world reward mechanic requires separate legal/product review and likely trusted server-side state.

## 18. Language
First release language: Russian.

All user-facing text should use localization keys rather than hard-coded scene/gameplay strings where avoidable.

## 19. Connectivity and saves
Initial product is local-first and must be playable without account registration.

- Internet is needed only to load the hosted web build; the first architecture does not require a live backend session.
- Progress is stored locally, primarily through IndexedDB behind a SaveProvider abstraction.
- Reload/restart should preserve normal progress.
- Cross-device sync is not promised in v1.
- Clearing site data or switching browsers/devices may lose local progress; this limitation is acceptable for the initial product.
- A later ServerSaveProvider may add cloud sync without rewriting gameplay systems.

## 20. Competitive integrity / anti-cheat
There is no meaningful anti-cheat promise in the local-first phase.

Browser state is user-controlled. That is acceptable while rewards are purely in-game and leaderboards/real-value rewards are absent.

If trusted competition, real-world rewards or payments are introduced, server-side identity/state/result validation becomes a separate approved phase.

## 21. Deferred decisions
Not fixed yet:
- final engine;
- final art direction inside "stylized 3D";
- exact Noxygen product-to-power-up mapping;
- exact economy numbers;
- number of launch biomes;
- final hub upgrade tree;
- final monetization model;
- real-world rewards;
- online services/backend technology.

These must not block the browser game foundation.
