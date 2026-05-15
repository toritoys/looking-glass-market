import { init as initEntryScreen } from './ui/entryScreen.js';
import { init as initTicker, update as updateTicker } from './ui/ticker.js';
import { init as initNarrative, display as displayNarrative } from './ui/narrative.js';
import { fetchQuote, getMarketState } from './stock/finnhub.js';

const POLL_INTERVAL_MS = 60_000;

let currentEcosystemId = null;
let currentState = null;
let stringIndex = 0;
let pollTimer = null;

initEntryScreen(onReady);

async function onReady(ecosystemId, quoteData) {
  currentEcosystemId = ecosystemId;

  initNarrative();
  initTicker(quoteData.symbol, quoteData.price, quoteData.change);

  currentState = getMarketState(quoteData.change);
  stringIndex = 0;

  displayNarrative(currentEcosystemId, currentState, quoteData, stringIndex);
  console.log(`[LGM] ecosystem: ${currentEcosystemId} | state: ${currentState}`);

  pollTimer = setInterval(() => poll(quoteData.symbol), POLL_INTERVAL_MS);
}

async function poll(symbol) {
  let quoteData;

  try {
    quoteData = await fetchQuote(symbol);
  } catch {
    return;
  }

  updateTicker(quoteData.symbol, quoteData.price, quoteData.change);

  const newState = getMarketState(quoteData.change);

  if (newState !== currentState) {
    currentState = newState;
    stringIndex = 0;
    console.log(`[LGM] state change → ${currentState}`);
  } else {
    stringIndex = (stringIndex + 1) % 3;
  }

  displayNarrative(currentEcosystemId, currentState, quoteData, stringIndex);
}
