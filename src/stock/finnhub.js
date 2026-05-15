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
