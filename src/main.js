import { initScene } from './world/sceneManager.js';
import { showEntryScreen } from './ui/entryScreen.js';
import { fetchQuote, getMarketState } from './stock/finnhub.js';
import { updateTicker } from './ui/ticker.js';
import { updateNarrative } from './ui/narrative.js';

// Entry point — wired up during world implementation phase
