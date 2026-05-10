# Homepage Photo Pick Map — Huw Day-1 Shoot

**Reviewed:** 2026-05-05
**Source raws:** `~/Kevin's Claude Environment/Huw 1.5.K.D GENETICS/PHOTOS/`
**Source video:** `~/Kevin's Claude Environment/Huw 1.5.K.D GENETICS/VIDEO/` (92 MP4 clips, 61 GB — not yet reviewed)
**JPEG previews:** `~/Kevin's Claude Environment/Huw 1.5.K.D GENETICS/jpg-previews/` — 242 viewable JPGs
**Contact sheets:** `~/Kevin's Claude Environment/Huw 1.5.K.D GENETICS/contact-sheets/sheet-01.jpg` … `sheet-07.jpg`

**Person IDs (confirmed by Kevin):**
- **Papa KD** = grey buzz cut, white KD tee, older
- **Kevin** = darker hair, white KD tee, younger
- **Daniel** = Western, blonde buzz cut, white KD tee

> Filenames in this doc reference the `.jpg` preview. The matching raw is the same stem with `.CR2`/`.CR3`/`.DNG` extension in `PHOTOS/`. To use in the site you'll need to export full-quality JPG/WebP from the raw — the `/tmp/...` and `jpg-previews/` files are 1200px review crops, not production-ready.

---

# Section-by-section pick map

Walking the homepage in render order. Each block names the exact photo to drop into each empty `ShotPlaceholder`.

---

## 1. HERO (line 138 in `page.tsx`)
**Currently:** expects `/hero-loop.mp4` + `/hero-loop-poster.jpg`
**Status:** video to be cut in CapCut from drone clips (deferred). Poster stills available now.

**Hero poster candidates** (drop in `/public/hero-loop-poster.jpg`):
- **Primary:** `5D4_2990` — Papa at the shrine, joint to mouth, Buddha behind. Cinematic.
- **Alt 1:** `5D4_2992`, `5D4_2993`, `5D4_2995` — same sequence, different beats
- **Wide alt:** `DRONE (1)` or `DRONE (4)` — full property + bay context

---

## 2. NUMBERS (line 199)
No image — animated counters only.

---

## 3. PAPA KD section (line 228) — `#papa`
**Empty placeholder:** `Papa KD — hero portrait, golden hour, on the farm` (4:5 aspect).

**Primary:** `5D4_2284` — Papa under cannabis leaves, contemplative. Closest to "hero portrait, on the farm" brief, classic 4:5.
**Alt 1:** `5D4_2280` — same sequence, slight smile, also strong
**Alt 2:** `5D4_2285` — warmest expression of the three
**Cinematic alt** (if you want shrine context, not just face): `5D4_2998`

---

## 4. WHY WE CAME BACK / TERRACE (line 288)
**Empty placeholder:** `The terrace — original photo ~2015 if Kevin can locate it, otherwise reshoot Friday` (4:5).

**You said you have the original 2015 terrace photo.** Drop it in `/public/terrace-2015.jpg` and I'll wire it.

If you don't end up locating it, **fallback from this shoot:** none of the 242 photos are clearly a "terrace circa 2015" reshoot. We'd have to either reshoot a moody terrace-and-bay frame later, or substitute a Tanote Bay drone landscape (`DRONE (2)` or `DRONE (3)` — the property nestled in jungle with the bay below).

---

## 5. NEXT GENERATION — Kevin + Daniel (line 336) — `#next-generation`
**Currently using:** `/founder-kevin-v3.png` + `/founder-daniel.png` (probably outdated — pre-shoot stand-ins)

**Update both with shoot picks.** Square crop (the section uses `aspect-square`).

**Kevin solo:**
- **Primary:** `5D4_2306` — examining plant in profile, hands-on energy
- **Alt:** `5D4_2329` (direct smile to camera), `5D4_2309` (with plant), `5D4_2325` (close to plant)

**Daniel solo:**
- **Primary:** `5D4_2415` — Daniel in greenhouse with plant, classic environmental portrait
- **Alt:** `5D4_2419`, `5D4_2426`, `5D4_2433` — same series, different angles
- **Warm alt** (if you want him laughing/relaxed): `5D4_2467` or `5D4_2470`

**Pair / handoff frame** (if you want to add a third image showing them together — currently the section is two solo cards; could become a 3-up):
- `5D4_2487`, `5D4_2493`, `5D4_2496`, `5D4_2498` — group/team frames where Kevin + Daniel are visible together. **Open your eye on these — pair selection is yours.**

---

## 6. TEAM CAROUSEL — NEW SECTION (you asked for this)
**Doesn't exist on the page yet.** I'd recommend slotting it between Next Generation (§5) and Philosophy (§6), as a horizontal scroll/carousel. Section name: "The Team" or "The People".

**Group team shots (carousel hero / opener):**
- **Primary:** `5D4_2487` or `5D4_2493` — full team standing together in greenhouse, white KD tees
- **Alt:** `5D4_2496`, `5D4_2498`, `5D4_2507`, `5D4_2516` — variations of the group

**Individual environmental portraits of staff** (the carousel slides):
- Daniel: `5D4_2415` (or whatever you didn't pick for §5)
- Kevin: `5D4_2306` (or whatever you didn't pick for §5)
- Thai woman (curly/braided hair, KD tee): `5D4_2519`, `5D4_2521` — solo portraits
- Older Asian gentleman (grey hair, doorway light): `5D4_2887`, `5D4_2894` — moody/distinguished
- Staff member 1 (younger, dark hair, greenhouse): `5D4_2899`, `5D4_2902`, `5D4_2906`, `5D4_2913`
- Staff member 2 (different younger man, greenhouse): `5D4_2922`, `5D4_2925`, `5D4_2930`
- Staff member 3 (third individual portrait series): `5D4_2939`, `5D4_2945`, `5D4_2948`

**I can't reliably name each staff member from photos — once you confirm names + roles, I'll bake them into a `team` data array similar to `nextGeneration`.**

**Lifestyle / together at the table:** `5D4_2964`, `5D4_2969`, `5D4_2971` — group seated with hash on tray. Real "we work together" energy. Could close the carousel.

---

## 7. PHILOSOPHY — How We Grow (line 384) — `#philosophy`
**Empty placeholder:** `Hands in living soil — macro` (4:3).

**Primary:** `5D4_2645` — soil macro detail. Closest to the "hands in living soil" brief that we have.
**Alt 1:** `5D4_2647`, `5D4_2649` — different soil texture macros
**Alt 2 (if you want to show working hands, not pure soil):** `5D4_2581` — a person in KD tee tending plants

**You asked for "different pictures" plural — the section currently has just one slot.** If you want a 2-3 image grid here showing the philosophy pillars (living soil + sun-grown + small batch), expand the layout to:

| Pillar | Photo |
|---|---|
| Living soil | `5D4_2645` (soil macro) |
| Sun-grown | `5D4_2588` or `5D4_2592` (greenhouse rows in light) |
| Small batch | `5D4_2581` (hands working plant) or `5D4_2627` (shop bar / counter, where small batch lives) |

Tell me to expand the layout and I'll do it.

---

## 8. BIOBIZZ partnership block (line 433, inside §7)
**3 empty squares:** `Sep 2025 archive — BioBizz visit #1, #2, #3` (aspect-square, dark mode).

**Currently expecting from the September 2025 Hue archive at** `~/Desktop/Kevin/KDG/Bilder/Fotos/Huw:Biobizz/` — Luis, Ivan, El Santo, Basque hat with Papa shots.

**You said you'll add more BioBizz pictures to the folder.** When they land, drop them in `Huw 1.5.K.D GENETICS/PHOTOS/` (or any subfolder you like) and I'll regenerate previews + identify the 3 strongest for these slots.

**From this Day-1 shoot:** no BioBizz visit shots — they're just from the September 2025 trip. The strongest BioBizz-adjacent asset we DO have from Day-1 is `5D4_2565` and `5D4_2567` (the BioBizz fertilizer shelves), which could go elsewhere on the page as proof-of-partnership texture.

---

## 9. THE FARM (line 506) — `#the-farm`

### 9a. Hero drone establishing (line 524)
**Empty placeholder:** `Drone cinematic: Tanote Bay → mountain → jungle → zoom into farm. Shoot Friday sunrise` (16:9).

**Primary still:** `DRONE (1)` — full property + bay context
**Alt:** `DRONE (2)`, `DRONE (4)` — variations

(The actual cinematic video for this slot is the hero loop you'll cut in CapCut.)

### 9b. Six-up grid (line 530)
Six labeled placeholders. My picks:

| Slot label | Photo |
|---|---|
| Nursery — young plants | `5D4_2561` (seedlings on tray) |
| Veg stage under shade | `5D4_2545` (boardwalk with seedlings) |
| Flowering terrace | `5D4_2588` or `5D4_2592` (greenhouse rows of flowering plants) |
| Chill area — where the tour ends | `5D4_2598` (mural shop interior) or `5D4_2627` (bar / counter) |
| Tanote Bay view | `DRONE (2)` or `DRONE (3)` (aerial showing bay) |
| Shop exterior | `5D4_2635` or `5D4_2636` (white-wall building) |

---

## 10. FARM TOUR (line 567) — `#tour`

### 10a. Tour loop video (line 594)
**Empty placeholder:** `Drone: Farm Tour Loop video — one clean 45–60 sec cinematic take` (16:9, dark).

Same as hero: cut in CapCut from the drone clips. Poster still: `DRONE (4)` or `DRONE (6)` — property in jungle context.

### 10b. (No other image slots in this section — it's text + booking form)

**For ambient texture** if you decide to add a few photos to the tour section:
- Farm tour signage: `R7__1584`, `R7__1589` (KD Farm Loop sign)
- Tour walking: `R7__1596`, `R7__1601`, `R7__1609` (trail with ocean view)
- Working the land (watering, ocean behind): `R7__1618`, `R7__1631`, `R7__1634`
- Animals (closed-loop story): `R7__1491`, `R7__1493`, `R7__1499` (chicken coop)

---

## 11. PRODUCTS (line 666) — `#products`
**5 empty placeholders:** `Flower / Hash / Rosin / Oils / Edibles — hero on wooden slab` (square).

The full strain catalog is in the shoot — labeled jar + isolated bud cutouts.

| Slot | Photo |
|---|---|
| Flower | `5D4_2705` (any of the bud cutouts — pick a strain) |
| Hash | `5D4_2803` or `5D4_2811` (hash discs in packaging) |
| Rosin | `5D4_2814` (single hash brick top-down — closest we have to rosin/concentrate) |
| Oils | `5D4_2780` (Mr. KD's Cannabis Oil bottles) |
| Edibles | **NOT in this shoot** — flag for next shoot |

> Note: shoot didn't deliver an "edibles" hero specifically. Use a strong bud or hash shot as placeholder until edibles gets photographed. Or remove the Edibles tile from `productCategories` array if you'd rather not feature it on the homepage yet.

---

## 12. APPAREL (line 709) — `#apparel`
**4 empty placeholders:** `Model in KD tee — garden / chill area / hammock / walking into shop` (3:4).

**The shoot didn't deliver dedicated apparel lifestyle shots** — but the team and Daniel/Kevin shots throughout the shoot are all in KD tees, so we use those:

| Slot label | Photo |
|---|---|
| Model in KD tee — garden | `5D4_2306` (Kevin examining plant) |
| Model in KD tee — chill area | `5D4_2493` or `5D4_2496` (group team in greenhouse) |
| Model on hammock, apparel | `R7__1473` (Kevin walking with tray of greens) — closest we have to "lifestyle/movement in apparel" |
| Walking into the shop, apparel | `5D4_2604` or `5D4_2619` (Kevin/Daniel with golden retriever on lawn — warm lifestyle) |

**Plus the flat-lays for product detail somewhere lower in the section:**
- `T-SHIRT 1 (1)`, `T-SHIRT 1 (2)` (front + back)
- `T-SHIRT 2 (1)`, `T-SHIRT 2 (2)`
- `T-SHIRT 3 (1)`, `T-SHIRT 3 (2)`
- `T-SHIRT 4 (1)`, `T-SHIRT 4 (2)`

---

## 13. VISIT — Shop section (line 749) — `#visit`
3 empty placeholders.

| Slot label | Photo |
|---|---|
| Shop interior — bamboo counter, bud jars, arched niches | `5D4_2598` (mural + bar interior — strongest brand asset) |
| Chill area — wide | `5D4_2595` (round window doorway) or `5D4_2627` (counter wide) |
| Bud jars on counter — hero | `5D4_2701`-style strain jar or `5D4_2710` (KD Cherry jar shot) |

---

## 14. SLOWDOWN HOMESTAY link (line 837)
**Empty placeholder:** `Slowdown Homestay — exterior, jungle, golden hour` (4:3).

**Not in this shoot** (it was the KD farm focus). Two options:
1. Use an existing Slowdown photo from `~/Kevin's Claude Environment/projects/slow-down-homestay/` (the Slowdown site already has hero shots — easiest)
2. Or use a drone aerial that shows both buildings: `DRONE (6)` or `DRONE (7)` — property aerials

---

## 15. MEDIA (line 877) — `#media`
No image slots — text-only press cards.

---

## 16. CONTACT (line 918) — `#contact`
No image slots — newsletter form only.

---

# Outstanding TODOs (you'll need these to complete)

1. **Terrace photo** — drop your 2015 original at `/public/terrace-2015.jpg`
2. **BioBizz visit photos** — drop them in the `Huw 1.5.K.D GENETICS/PHOTOS/` folder, tell me, I'll re-pick the 3 best
3. **Team identification** — confirm names + roles for the staff in §6 so I can build the data array
4. **Trio handoff frame** (Papa + Kevin + Daniel together) — I didn't see one in the 242 photos. If important, log as Day-2 pickup
5. **Edibles hero shot** — not delivered, decide whether to defer or remove from §11
6. **Slowdown exterior at golden hour** — not in this shoot, pull from existing Slowdown assets or schedule
7. **Video review** — once you greenlight, I'll process the 92 MP4 clips and surface the 5–10 strongest for the hero loop + tour loop CapCut work
