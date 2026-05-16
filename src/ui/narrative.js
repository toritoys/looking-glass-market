import { ECOSYSTEMS } from '../data/ecosystems.js';
import { randomDays } from '../utils/helpers.js';

let narrativeEl;
const rotationIndex = {}; // key: `${ecosystemId}:${state}` → next index (0–2)

export function init() {
  narrativeEl = document.createElement('div');

  Object.assign(narrativeEl.style, {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: '500',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#fff',
    opacity: '0',
    textAlign: 'center',
    maxWidth: '560px',
    pointerEvents: 'none',
    zIndex: '50',
    transition: 'opacity 0.5s ease',
    whiteSpace: 'normal',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });

  document.body.appendChild(narrativeEl);
}

export function displayNarrative(ecosystemId, state, quoteData, selectionType) {
  const ecosystem = ECOSYSTEMS[ecosystemId];
  if (!ecosystem) return;
  const set = ecosystem.strings[selectionType ?? 'environment'];
  const strings = set?.[state];
  if (!strings) return;

  const key = `${ecosystemId}:${selectionType}:${state}`;
  const idx = rotationIndex[key] ?? 0;
  rotationIndex[key] = (idx + 1) % 3;

  const text = inject(strings[idx], quoteData);
  crossfade(text);
}

export function displayInversion(ecosystemId) {
  const ecosystem = ECOSYSTEMS[ecosystemId];
  if (!ecosystem) return;
  crossfade(ecosystem.strings.inversion);
}

function inject(raw, quoteData) {
  const sign = quoteData.change >= 0 ? '+' : '';
  return raw
    .replace(/\{TICKER\}/g, quoteData.symbol)
    .replace(/\{CHANGE\}/g, `${sign}${quoteData.change.toFixed(1)}%`)
    .replace(/\{PRICE\}/g, quoteData.price.toFixed(2))
    .replace(/\{DAYS\}/g, randomDays());
}

function crossfade(text) {
  if (!narrativeEl) return;
  narrativeEl.style.opacity = '0';
  setTimeout(() => {
    narrativeEl.textContent = text;
    narrativeEl.style.opacity = '0.7';
  }, 500);
}
