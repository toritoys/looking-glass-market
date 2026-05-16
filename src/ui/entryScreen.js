import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ECOSYSTEMS } from '../data/ecosystems.js';
import { fetchQuote } from '../stock/finnhub.js';

const PREVIEW_ASSETS = {
  arctic_tundra:      'Husky',
  boreal_forest:      'Wolf',
  temperate_woodland: 'Stag',
  woodland_edge:      'Fox',
  open_grassland:     'Horse',
  andean_highland:    'Alpaca',
  arid_scrubland:     'Donkey',
};

const ECOSYSTEM_LIST = Object.values(ECOSYSTEMS);

let overlay;
let onReadyCallback;
let previewHandles = []; // dispose handles for the 7 creature preview renderers

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

// ─── Preview renderers ───────────────────────────────────────────────────────

function stopAllPreviews() {
  for (const h of previewHandles) h.dispose();
  previewHandles = [];
}

function createCreaturePreview(ecosystemId) {
  let aborted = false; // guard against late GLB callbacks after disposal

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 160 / 200, 0.1, 100);
  camera.position.set(0, 1.5, 4);
  camera.lookAt(0, 1, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(160, 200);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(2, 4, 2);
  scene.add(dirLight);

  let model        = null;
  let mixer        = null;
  let idleAction   = null;
  let idle2Action  = null;
  let currentAction = null;
  let rotating     = true;
  let rafId        = null;
  let lastTime     = 0;

  const gltfLoader = new GLTFLoader();
  const assetName  = PREVIEW_ASSETS[ecosystemId];

  gltfLoader.load(
    `animals/${assetName}.gltf`,
    (gltf) => {
      if (aborted) return;

      model = gltf.scene;
      const animations = gltf.animations ?? [];

      // Scale to 2 units tall, center horizontally, sit on y=0
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const scale = 2.0 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);

      const center = box.getCenter(new THREE.Vector3());
      model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

      scene.add(model);

      if (animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);

        const idleClip = THREE.AnimationClip.findByName(animations, 'Idle') ?? animations[0];
        idleAction = mixer.clipAction(idleClip);
        idleAction.play();
        currentAction = idleAction;

        const idle2Clip = THREE.AnimationClip.findByName(animations, 'Idle_2');
        if (idle2Clip) idle2Action = mixer.clipAction(idle2Clip);
      }
    },
    undefined,
    (err) => console.error(`[preview] Failed to load ${assetName}:`, err)
  );

  function tick(time) {
    rafId = requestAnimationFrame(tick);
    const delta = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    if (mixer) mixer.update(delta);
    if (model && rotating) model.rotation.y += 0.3 * delta;
    renderer.render(scene, camera);
  }
  rafId = requestAnimationFrame(tick);

  const canvas = renderer.domElement;
  canvas.style.display = 'block';

  canvas.addEventListener('mouseenter', () => {
    rotating = false;
    if (mixer && idle2Action && currentAction !== idle2Action) {
      currentAction?.fadeOut(0.3);
      currentAction = idle2Action;
      idle2Action.reset().fadeIn(0.3).play();
    }
  });

  canvas.addEventListener('mouseleave', () => {
    rotating = true;
    if (mixer && idleAction && currentAction !== idleAction) {
      currentAction?.fadeOut(0.3);
      currentAction = idleAction;
      idleAction.reset().fadeIn(0.3).play();
    }
  });

  function dispose() {
    aborted = true;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    renderer.dispose();
    scene.traverse(child => {
      if (!child.isMesh) return;
      child.geometry?.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(m => m?.dispose());
    });
  }

  return { canvas, dispose };
}

// ─── Screens ─────────────────────────────────────────────────────────────────

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
  previewHandles = [];

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

    const preview = createCreaturePreview(ecosystem.id);
    previewHandles.push(preview);

    const name = el('div', {
      color: '#fff',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginTop: '10px',
      textAlign: 'center',
      maxWidth: '100px',
    }, ecosystem.creature);

    card.appendChild(preview.canvas);
    card.appendChild(name);
    addHover(card, 1.0);

    card.addEventListener('click', () => {
      stopAllPreviews();
      selectEcosystem(ecosystem.id, 'creature');
    });
    grid.appendChild(card);
  });

  const back = backLink(() => {
    stopAllPreviews();
    renderChoiceScreen();
  });
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
    card.addEventListener('click', () => selectEcosystem(ecosystem.id, 'environment'));
    grid.appendChild(card);
  });

  const back = backLink(() => renderChoiceScreen());
  overlay.appendChild(grid);
  overlay.appendChild(back);
}

function selectEcosystem(ecosystemId, selectionType) {
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

      fadeOut(() => onReadyCallback(ecosystemId, quoteData, selectionType));
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

// ─── Utilities ───────────────────────────────────────────────────────────────

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
