import { ECOSYSTEMS } from '../data/ecosystems.js';
import { fetchQuote } from '../stock/finnhub.js';

const CREATURE_SHAPES = {
  arctic_tundra:      { rx: 34, ry: 26 },  // Husky — wide, sturdy
  boreal_forest:      { rx: 26, ry: 32 },  // Wolf — lean, tall
  temperate_woodland: { rx: 22, ry: 36 },  // Stag — tall, narrow
  woodland_edge:      { rx: 24, ry: 20 },  // Fox — small, agile
  open_grassland:     { rx: 36, ry: 36 },  // Horse — wide, tall
  andean_highland:    { rx: 26, ry: 34 },  // Alpaca — fluffy, upright
  arid_scrubland:     { rx: 30, ry: 28 },  // Donkey — sturdy, medium
};

const ECOSYSTEM_LIST = Object.values(ECOSYSTEMS);

let overlay;
let onReadyCallback;

export function init(onReady) {
  onReadyCallback = onReady;
  overlay = document.createElement('div');
  overlay.id = 'entry-screen';

  applyStyles(overlay, {
    position: 'fixed',
    inset: '0',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    transition: 'opacity 1.2s ease',
    fontFamily: 'Georgia, "Times New Roman", serif',
  });

  renderChoiceScreen();
  document.body.appendChild(overlay);
}

function renderChoiceScreen() {
  overlay.innerHTML = '';

  const title = el('div', {
    marginBottom: '60px',
    textAlign: 'center',
  });

  const line1 = el('div', {
    color: '#fff',
    fontSize: '2rem',
    letterSpacing: '0.05em',
    marginBottom: '24px',
    cursor: 'pointer',
    opacity: '0.9',
    transition: 'opacity 0.2s',
  }, 'I know what I am');

  const line2 = el('div', {
    color: '#fff',
    fontSize: '2rem',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    opacity: '0.9',
    transition: 'opacity 0.2s',
  }, 'I know where I am');

  addHover(line1);
  addHover(line2);

  line1.addEventListener('click', () => renderCreatureGrid());
  line2.addEventListener('click', () => renderEnvironmentGrid());

  title.appendChild(line1);
  title.appendChild(line2);
  overlay.appendChild(title);
}

function renderCreatureGrid() {
  overlay.innerHTML = '';

  const grid = el('div', {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    maxWidth: '900px',
    padding: '20px',
  });

  ECOSYSTEM_LIST.forEach(ecosystem => {
    const card = el('div', {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      opacity: '0.75',
      transition: 'opacity 0.2s',
    });

    const { rx, ry } = CREATURE_SHAPES[ecosystem.id];
    const svgW = (rx + 10) * 2;
    const svgH = (ry + 10) * 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgW);
    svg.setAttribute('height', svgH);
    svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`);

    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('cx', svgW / 2);
    ellipse.setAttribute('cy', svgH / 2);
    ellipse.setAttribute('rx', rx);
    ellipse.setAttribute('ry', ry);
    ellipse.setAttribute('fill', '#fff');
    ellipse.setAttribute('opacity', '0.85');
    svg.appendChild(ellipse);

    const name = el('div', {
      color: '#fff',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginTop: '10px',
      textAlign: 'center',
      maxWidth: '100px',
    }, ecosystem.creature);

    card.appendChild(svg);
    card.appendChild(name);
    addHover(card, 1.0);

    card.addEventListener('click', () => selectEcosystem(ecosystem.id));
    grid.appendChild(card);
  });

  const back = backLink(() => renderChoiceScreen());
  overlay.appendChild(grid);
  overlay.appendChild(back);
}

function renderEnvironmentGrid() {
  overlay.innerHTML = '';

  const grid = el('div', {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '860px',
    padding: '20px',
  });

  ECOSYSTEM_LIST.forEach(ecosystem => {
    const card = el('div', {
      color: '#fff',
      fontSize: '0.95rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      border: '1px solid rgba(255,255,255,0.3)',
      padding: '18px 28px',
      cursor: 'pointer',
      opacity: '0.75',
      transition: 'opacity 0.2s',
      textAlign: 'center',
      minWidth: '180px',
    }, ecosystem.environment);

    addHover(card, 1.0);
    card.addEventListener('click', () => selectEcosystem(ecosystem.id));
    grid.appendChild(card);
  });

  const back = backLink(() => renderChoiceScreen());
  overlay.appendChild(grid);
  overlay.appendChild(back);
}

function selectEcosystem(ecosystemId) {
  overlay.innerHTML = '';

  const ecosystem = ECOSYSTEMS[ecosystemId];

  const label = el('div', {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '32px',
  }, `${ecosystem.creature}  ·  ${ecosystem.environment}`);

  const input = document.createElement('input');
  applyStyles(input, {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.4)',
    color: '#fff',
    fontSize: '1.4rem',
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: '0.12em',
    textAlign: 'center',
    outline: 'none',
    width: '280px',
    padding: '8px 0',
    caretColor: '#fff',
  });
  input.type = 'text';
  input.placeholder = 'Enter a stock symbol';
  input.spellcheck = false;
  input.autocomplete = 'off';

  const errorText = el('div', {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.8rem',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontStyle: 'italic',
    marginTop: '20px',
    height: '1.2em',
    textAlign: 'center',
    maxWidth: '340px',
  }, '');

  const submit = el('div', {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginTop: '28px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  }, 'Enter');
  addHover(submit, 0.9);

  async function attempt() {
    const symbol = input.value.trim().toUpperCase();
    if (!symbol) return;

    errorText.textContent = '';
    submit.style.opacity = '0.3';
    submit.style.pointerEvents = 'none';
    input.disabled = true;

    try {
      const quoteData = await fetchQuote(symbol);

      if (!quoteData.price || quoteData.price === 0) {
        throw new Error('invalid');
      }

      fadeOut(() => onReadyCallback(ecosystemId, quoteData));
    } catch {
      errorText.textContent =
        'The creature waits. Nothing moves. Check the symbol and try again.';
      submit.style.opacity = '0.5';
      submit.style.pointerEvents = 'auto';
      input.disabled = false;
      input.focus();
    }
  }

  submit.addEventListener('click', attempt);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });

  const back = backLink(() => renderChoiceScreen());

  overlay.appendChild(label);
  overlay.appendChild(input);
  overlay.appendChild(errorText);
  overlay.appendChild(submit);
  overlay.appendChild(back);

  input.focus();
}

function fadeOut(cb) {
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  setTimeout(() => {
    overlay.remove();
    if (cb) cb();
  }, 1200);
}

function backLink(cb) {
  const link = el('div', {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '48px',
    transition: 'opacity 0.2s',
  }, '← back');
  addHover(link, 0.6);
  link.addEventListener('click', cb);
  return link;
}

function el(tag, styles, text) {
  const node = document.createElement(tag);
  if (styles) applyStyles(node, styles);
  if (text !== undefined) node.textContent = text;
  return node;
}

function applyStyles(node, styles) {
  Object.assign(node.style, styles);
}

function addHover(node, hoverOpacity = 1.0) {
  node.addEventListener('mouseenter', () => { node.style.opacity = String(hoverOpacity); });
  node.addEventListener('mouseleave', () => { node.style.opacity = node._baseOpacity || '0.75'; });
  node._baseOpacity = node.style.opacity || '0.75';
}
