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
import { initWeather, setWeatherState, updateWeather } from './world/weather.js';

const POLL_INTERVAL_MS = 60_000;

let currentEcosystemId = null;
let currentState = null;
let currentQuoteData = null;
let currentSelectionType = 'environment';
let camera = null;
let renderer = null;

function getVisualState(rawState) {
  return currentSelectionType === 'creature' ? (INVERSION_MAP[rawState] ?? rawState) : rawState;
}

initEntryScreen(onReady);

async function onReady(ecosystemId, quoteData, selectionType) {
  currentEcosystemId = ecosystemId;
  currentState = getMarketState(quoteData.change);
  currentQuoteData = quoteData;
  currentSelectionType = selectionType ?? 'environment';

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
  initWeather(scene);
  const visualState = getVisualState(currentState);
  const initTrigger = applyMarketState(visualState);
  setMarketState(visualState);
  setWeatherState(initTrigger, visualState);
  displayNarrative(ecosystemId, visualState, quoteData, currentSelectionType);

  // Anomaly click detection
  renderer.domElement.addEventListener('click', e => onCanvasClick(e, scene));

  // Render loop
  startRenderLoop(scene, camera, renderer, clock, delta => {
    updateCreature(delta);
    animateAnomaly(delta);
    updateWeather(delta);
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
    const vState = getVisualState(currentState);
    await transitionState(() => {
      const trigger = applyMarketState(vState);
      setWeatherState(trigger, vState);
    });
    setMarketState(vState);
    displayNarrative(currentEcosystemId, vState, quoteData, currentSelectionType);
    console.log(`[LGM] ${prev} → ${currentState} (visual: ${vState})`);
  } else {
    displayNarrative(currentEcosystemId, getVisualState(currentState), quoteData, currentSelectionType);
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
        const currentVisual = getVisualState(currentState);
        const invertedVisual = INVERSION_MAP[currentVisual];
        console.log(`[LGM] inversion triggered: ${currentVisual} → ${invertedVisual}`);
        triggerInversion(
          () => {
            const invTrigger = applyMarketState(invertedVisual);
            setWeatherState(invTrigger, invertedVisual);
            displayInversion(currentEcosystemId);
          },
          () => {
            const vState = getVisualState(currentState);
            const trigger = applyMarketState(vState);
            setWeatherState(trigger, vState);
            displayNarrative(currentEcosystemId, vState, currentQuoteData, currentSelectionType);
            console.log(`[LGM] inversion ended, restored: ${vState}`);
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
