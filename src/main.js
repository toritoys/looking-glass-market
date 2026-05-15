import * as THREE from 'three';
import { init as initEntryScreen } from './ui/entryScreen.js';
import { init as initTicker, update as updateTicker } from './ui/ticker.js';
import { init as initNarrative, displayNarrative, displayInversion } from './ui/narrative.js';
import { fetchQuote, getMarketState } from './stock/finnhub.js';
import { initScene, startRenderLoop } from './world/sceneManager.js';
import { initEnvironment, applyMarketState, getAnomaly, animateAnomaly } from './world/environment.js';
import { loadCreature, updateCreature, setMarketState, moveCreatureTo } from './world/creature.js';
import { transitionState, triggerInversion, isInversionLocked, isInversionActive } from './world/transitions.js';
import { INVERSION_MAP } from './data/marketStates.js';

const POLL_INTERVAL_MS = 60_000;

let currentEcosystemId = null;
let currentState = null;
let currentQuoteData = null;
let camera = null;
let renderer = null;

initEntryScreen(onReady);

async function onReady(ecosystemId, quoteData) {
  currentEcosystemId = ecosystemId;
  currentState = getMarketState(quoteData.change);
  currentQuoteData = quoteData;

  // Canvas container sits behind all UI
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '1',
  });
  document.body.appendChild(container);

  const { scene, camera: cam, renderer: ren, clock } = initScene(container);
  camera = cam;
  renderer = ren;

  // UI layer
  initTicker(quoteData.symbol, quoteData.price, quoteData.change);
  initNarrative();

  // World layer
  initEnvironment(scene, ecosystemId);
  loadCreature(scene, ecosystemId);
  applyMarketState(currentState);
  setMarketState(currentState);
  displayNarrative(ecosystemId, currentState, quoteData);

  // Anomaly click detection
  renderer.domElement.addEventListener('click', e => onCanvasClick(e, scene));

  // Render loop
  startRenderLoop(scene, camera, renderer, clock, delta => {
    updateCreature(delta);
    animateAnomaly(delta);
  });

  // Polling
  setInterval(() => poll(quoteData.symbol), POLL_INTERVAL_MS);
}

async function poll(symbol) {
  let quoteData;
  try {
    quoteData = await fetchQuote(symbol);
  } catch {
    return;
  }

  currentQuoteData = quoteData;
  updateTicker(quoteData.symbol, quoteData.price, quoteData.change);

  if (isInversionActive()) return; // don't interrupt active inversion

  const newState = getMarketState(quoteData.change);

  if (newState !== currentState) {
    const prev = currentState;
    currentState = newState;
    await transitionState(() => applyMarketState(currentState));
    setMarketState(currentState);
    displayNarrative(currentEcosystemId, currentState, quoteData);
    console.log(`[LGM] ${prev} → ${currentState}`);
  } else {
    displayNarrative(currentEcosystemId, currentState, quoteData);
  }
}

function onCanvasClick(e, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(mouse, camera);

  // Anomaly click — triggers inversion (only when not locked)
  if (!isInversionLocked()) {
    const anomaly = getAnomaly();
    if (anomaly) {
      const hits = raycaster.intersectObject(anomaly, true);
      if (hits.length > 0) {
        const invertedState = INVERSION_MAP[currentState];
        console.log(`[LGM] inversion triggered: ${currentState} → ${invertedState}`);
        triggerInversion(
          () => {
            applyMarketState(invertedState);
            displayInversion(currentEcosystemId);
          },
          () => {
            applyMarketState(currentState);
            displayNarrative(currentEcosystemId, currentState, currentQuoteData);
            console.log(`[LGM] inversion ended, restored: ${currentState}`);
          }
        );
        return;
      }
    }
  }

  // Ground click — move creature to that position
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const groundTarget = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(groundPlane, groundTarget)) {
    moveCreatureTo(groundTarget.x, groundTarget.z);
  }
}
