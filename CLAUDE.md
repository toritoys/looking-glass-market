# The Looking Glass Market — CLAUDE.md

## Project Intent
A single-stock financial data visualization rendered as an immersive natural environment. The market is not displayed as a chart — it is experienced as weather. The user chooses a creature or an environment; the world reflects live stock conditions through that creature's sensory reality. Inspired by Lewis Carroll's *Through the Looking-Glass* — the world inverts its logic, abundance signals warning, crisis produces strange clarity. The text on screen is the creature's instinct, not financial commentary.

---

## Stack
- **Three.js + Vite** — 3D environment rendering
- **Finnhub API** — live stock data, called directly from browser
- **GitHub Pages** — static hosting, no backend
- **No AI API** — all narrative text is pre-written strings with live variable injection

---

## File Architecture
```
looking-glass-market/
├── index.html
├── vite.config.js
├── package.json
├── .env                        # VITE_FINNHUB_KEY=your_key_here
├── .gitignore                  # must include .env
├── src/
│   ├── main.js                 # entry point
│   ├── data/
│   │   ├── ecosystems.js       # 1:1 creature/environment map + all narrative strings
│   │   └── marketStates.js     # five-state threshold logic
│   ├── stock/
│   │   └── finnhub.js          # Finnhub fetch + percent change calculation
│   ├── world/
│   │   ├── sceneManager.js     # Three.js scene setup, camera, renderer
│   │   ├── environment.js      # renders environment per ecosystem + market state
│   │   ├── creature.js         # renders creature, idle + state-reactive animations
│   │   ├── weather.js          # particle systems: rain, drought, mist, storm, frost
│   │   └── transitions.js      # state change transitions, Looking Glass inversion
│   ├── ui/
│   │   ├── entryScreen.js      # creature vs environment choice, stock ticker input
│   │   ├── ticker.js           # transparent stock readout, top right corner
│   │   └── narrative.js        # creature text display, string selection + variable injection
│   └── utils/
│       └── helpers.js          # shared utilities
```

---

## Ecosystem Map — 1:1 Creature/Environment

| ID | Environment | Creature | glTF Asset |
|----|-------------|----------|------------|
| `arctic_tundra` | Arctic Tundra | Husky | `Husky.gltf` |
| `boreal_forest` | Boreal Forest | Wolf | `Wolf.gltf` |
| `temperate_woodland` | Temperate Woodland | Stag | `Stag.gltf` |
| `woodland_edge` | Woodland Edge | Fox | `Fox.gltf` |
| `open_grassland` | Open Grassland | Horse | `Horse.gltf` |
| `andean_highland` | Andean Highland | Alpaca | `Alpaca.gltf` |
| `arid_scrubland` | Arid Scrubland | Donkey | `Donkey.gltf` |

Entry logic: if user selects creature → environment is that creature's habitat. If user selects environment → creature is that environment's inhabitant. Always resolves to the same 1:1 pair.

---

## Market States — Five Thresholds

Calculate using **single-day percent change** from Finnhub's `quote` endpoint (`(c - pc) / pc * 100`).

| State ID | Condition | Label |
|----------|-----------|-------|
| `flourishing` | change > +3% | Flourishing |
| `stable` | +1% to +3% | Stable |
| `uneasy` | -1% to +1% | Uneasy |
| `stressed` | -3% to -1% | Stressed |
| `crisis` | change < -3% | Crisis |

Poll Finnhub every **60 seconds**. On state change, trigger transition animation then update narrative string. Do not re-render on every poll if state has not changed.

---

## Narrative String System

All strings live in `src/data/ecosystems.js`. Each ecosystem has 3 strings per market state = 15 strings per creature = 105 strings total across all 7 ecosystems.

**Variable tokens available for injection:**
- `{TICKER}` — stock symbol entered by user e.g. NVDA
- `{CHANGE}` — percent change, signed, one decimal e.g. +4.2% or -2.7%
- `{PRICE}` — current price e.g. 134.22
- `{DAYS}` — a small random integer 2–6, rerolled per string selection, for narrative texture

**String selection:** on each state entry or poll cycle where state is unchanged, rotate through the 3 strings in sequence. Do not randomize — sequential rotation ensures variety without repetition.

### Beaver / Temperate Forest — Full Reference Strings

Use these as the template and voice standard for all other ecosystems.

**FLOURISHING** (abundance as quiet warning — creature senses something is off at peak plenty)
1. `"{TICKER} up {CHANGE} this week. The river is higher than the beaver has ever seen it. It keeps checking the dam walls."`
2. `"Up {CHANGE}. The willow branches are heavy with growth. The beaver takes more than it needs and doesn't know why."`
3. `"{TICKER} up {CHANGE} this month. The stores are full. The water is still rising. The beaver watches the sky."`

**STABLE** (routine, neither generous nor withholding)
1. `"The current is steady. {CHANGE} this week — barely felt. The dam needs minor repairs. Nothing urgent."`
2. `"The river is where it was yesterday. {TICKER} at {PRICE}. The beaver moves through habit, not hunger."`
3. `"{CHANGE} this month. The forest is neither generous nor withholding. The work continues."`

**UNEASY** (small signals, not panic — creature has noticed)
1. `"The water level dropped {CHANGE} since {DAYS} days ago. Small. But the beaver noticed."`
2. `"Something is different about the current. {TICKER} {CHANGE}. The dam feels less certain than it did."`
3. `"The beaver checks the stores more than necessary. {CHANGE}. Not panic. Not yet."`

**STRESSED** (working harder to hold what exists)
1. `"The river is {CHANGE} below where it should be. The mud is wrong. The beaver works twice as hard to hold what's already built."`
2. `"{TICKER} {CHANGE} this week. The dam is showing. The beaver hasn't slept through the night in {DAYS} days."`
3. `"The stores are low. {CHANGE}. The beaver keeps building. There is nothing else to do."`

**CRISIS** (stillness, exposure, the work was real but the conditions left)
1. `"The riverbed is exposed. {TICKER} {CHANGE}. The dam stands over nothing."`
2. `"{CHANGE} this month. The beaver sits at the edge of what used to be water. The work was real. The river left anyway."`
3. `"{TICKER} down {CHANGE}. The willow roots are dry. The beaver hasn't moved since morning."`

### Remaining Ecosystems — Strings to Be Written by Developer
Write all remaining ecosystem strings following the beaver as the exact voice and logic template:
- Flourishing: abundance as warning, creature's instinct is unease at peak plenty
- Stable: routine, present, no strong signal
- Uneasy: small shift noticed, not acted on
- Stressed: working against conditions, holding not building
- Crisis: stillness, exposure, strange clarity

Each string must include at least one variable token. Each string must be written from the creature's sensory perspective — no financial language, no human framing. Numbers enter only through tokens.

---

## Visual Design Per Market State

### Environment Rendering Rules (apply across all ecosystems with habitat-appropriate variation)

| State | Light | Atmosphere | Water/Ground | Creature Behavior |
|-------|-------|------------|--------------|-------------------|
| Flourishing | Warm golden, long shadows | Slight haze, full canopy | High, moving, reflective | Active, unhurried, checking |
| Stable | Neutral midday | Clear, ordinary | Normal level | Present, habitual movement |
| Uneasy | Cooler, flatter | Thin cloud cover, reduced color saturation | Slightly lower/drier | Paused, watchful |
| Stressed | Harsh directional | Heavy cloud, desaturated | Visibly low/cracked | Effortful, repetitive movement |
| Crisis | Bleached or dark extremes | Particulate, obscured | Absent or frozen | Still, at the edge of the habitat |

### Weather Particle Systems (Three.js)
- `flourishing` — light mist particles, slow drift
- `stable` — none, or very subtle ambient dust
- `uneasy` — occasional wind gusts, leaves or debris
- `stressed` — heavy wind, dry particles, no precipitation
- `crisis` — either: heat shimmer + cracked ground OR frozen stillness depending on ecosystem

### The Looking Glass Inversion (single interactive mechanic)
- Trigger: user clicks/taps a visual anomaly present in the scene (a ripple, a shimmer, a reflection)
- Effect: world inverts to opposite state for 30 seconds. Crisis → Flourishing. Flourishing → Crisis. Stable stays but color inverts.
- Creature text during inversion: single dedicated inversion string per ecosystem, no variable injection, written as a moment of pure disorientation
- After 30 seconds: dissolve back to current real market state
- Inversion is available once per 5 minutes — do not make it spammable

---

## UI Specification

### Entry Screen
- Full black canvas
- Two lines of text, centered, large, serif font:
  - *"I know what I am"* — triggers creature selection
  - *"I know where I am"* — triggers environment selection
- Creature selection: illustrated silhouettes of all 7 creatures, hover reveals name
- Environment selection: landscape silhouettes of all 7 environments, hover reveals name
- After selection: stock ticker input field appears — placeholder text *"Enter a stock symbol"*
- On submit: world begins rendering, entry screen fades

### Main Experience
- Full screen Three.js canvas — no UI chrome, no borders
- **Top right corner:** transparent stock ticker readout
  - Format: `NVDA  $134.22  +4.2%`
  - Font: monospace, small, low opacity (0.4–0.5), white
  - Updates every 60 seconds on poll
- **Bottom center:** narrative text
  - Font: serif, medium weight, white, low opacity (0.7)
  - Fades in on state entry, fades out on state change
  - Never more than two lines
- **The anomaly:** a subtle persistent visual element in the scene (ripple, shimmer, floating mote) that triggers the Looking Glass inversion on click. No label, no tooltip. The user either finds it or doesn't.

### Error States
- Invalid ticker entered: narrative text reads *"The creature waits. Nothing moves. Check the symbol and try again."*
- Finnhub API failure: world renders in Uneasy state, ticker reads `— —`, narrative reads *"The signals are gone. The creature reads the silence instead."*

---

## Finnhub Integration

```javascript
// src/stock/finnhub.js
const API_KEY = import.meta.env.VITE_FINNHUB_KEY;

export async function fetchQuote(symbol) {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
  );
  const data = await res.json();
  // data.c = current price, data.pc = previous close
  const change = ((data.c - data.pc) / data.pc) * 100;
  return {
    price: data.c,
    change: change,
    symbol: symbol.toUpperCase()
  };
}

export function getMarketState(change) {
  if (change > 3) return 'flourishing';
  if (change > 1) return 'stable';
  if (change > -1) return 'uneasy';
  if (change > -3) return 'stressed';
  return 'crisis';
}
```

---

## GitHub Pages Deployment

1. In `vite.config.js` set `base: '/your-repo-name/'`
2. Install `gh-pages`: `npm install --save-dev gh-pages`
3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Add `.env` to `.gitignore` — never commit the Finnhub key
5. In GitHub repo Settings → Secrets → add `VITE_FINNHUB_KEY` as a repository secret
6. Run `npm run deploy` to publish

**Note on key exposure:** Finnhub free tier keys have limited scope. For a portfolio project this risk is acceptable. Do not use a paid Finnhub key in a static frontend.

---

## What This Project Demonstrates
- Creative use of real-time financial data beyond conventional visualization
- Three.js environment rendering driven by live data state
- Operator-level thinking: the system has rules, thresholds, and behavioral logic designed before a line was written
- Authored voice: every string is written, not generated — the text is a design decision
- The Looking Glass mechanic as UX philosophy: the interface has an internal logic that inverts conventional expectation
