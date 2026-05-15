import { ECOSYSTEMS } from '../data/ecosystems.js';
import { randomDays } from '../utils/helpers.js';

let narrativeEl;

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
    transition: 'opacity 1s ease',
    whiteSpace: 'normal',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });

  document.body.appendChild(narrativeEl);
}

export function display(ecosystemId, state, quoteData, index) {
  const ecosystem = ECOSYSTEMS[ecosystemId];
  if (!ecosystem) return;

  const strings = ecosystem.strings[state];
  if (!strings) return;

  const raw = strings[index % 3];
  const text = inject(raw, quoteData);

  fadeIn(text);
}

export function displayInversion(ecosystemId) {
  const ecosystem = ECOSYSTEMS[ecosystemId];
  if (!ecosystem) return;

  fadeIn(ecosystem.strings.inversion);
}

function inject(raw, quoteData) {
  const sign = quoteData.change >= 0 ? '+' : '';
  return raw
    .replace(/\{TICKER\}/g, quoteData.symbol)
    .replace(/\{CHANGE\}/g, `${sign}${quoteData.change.toFixed(1)}%`)
    .replace(/\{PRICE\}/g, quoteData.price.toFixed(2))
    .replace(/\{DAYS\}/g, randomDays());
}

function fadeIn(text) {
  if (!narrativeEl) return;

  narrativeEl.style.opacity = '0';

  setTimeout(() => {
    narrativeEl.textContent = text;
    narrativeEl.style.opacity = '0.7';
  }, 300);
}
