export const MARKET_STATES = {
  flourishing: {
    id: 'flourishing',
    label: 'Flourishing',
    condition: 'change > +3%',
  },
  stable: {
    id: 'stable',
    label: 'Stable',
    condition: '+1% to +3%',
  },
  uneasy: {
    id: 'uneasy',
    label: 'Uneasy',
    condition: '-1% to +1%',
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    condition: '-3% to -1%',
  },
  crisis: {
    id: 'crisis',
    label: 'Crisis',
    condition: 'change < -3%',
  },
};

// Threshold logic lives in src/stock/finnhub.js → getMarketState(change)
// flourishing: change > 3
// stable:      change > 1
// uneasy:      change > -1
// stressed:    change > -3
// crisis:      change <= -3
export const STATE_IDS = ['flourishing', 'stable', 'uneasy', 'stressed', 'crisis'];

export const INVERSION_MAP = {
  crisis: 'flourishing',
  stressed: 'stable',
  uneasy: 'uneasy',
  stable: 'stressed',
  flourishing: 'crisis',
};
