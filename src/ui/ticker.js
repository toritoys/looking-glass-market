let tickerEl;

export function init(symbol, price, change) {
  tickerEl = document.createElement('div');

  Object.assign(tickerEl.style, {
    position: 'fixed',
    top: '20px',
    right: '24px',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    color: '#fff',
    opacity: '0.4',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: '50',
  });

  document.body.appendChild(tickerEl);
  update(symbol, price, change);
}

export function update(symbol, price, change) {
  if (!tickerEl) return;

  const sign = change >= 0 ? '+' : '';
  const priceStr = `$${price.toFixed(2)}`;
  const changeStr = `${sign}${change.toFixed(1)}%`;

  tickerEl.textContent = `${symbol}  ${priceStr}  ${changeStr}`;
}
