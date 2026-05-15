import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ANIMAL_ASSETS = {
  arctic_tundra:      'animals/Husky.gltf',
  boreal_forest:      'animals/Wolf.gltf',
  temperate_woodland: 'animals/Stag.gltf',
  woodland_edge:      'animals/Fox.gltf',
  open_grassland:     'animals/Horse.gltf',
  andean_highland:    'animals/Alpaca.gltf',
  arid_scrubland:     'animals/Donkey.gltf',
};

const CLIP_MAP = {
  IDLE:    ['Idle', 'Idle_2'],
  WALKING: ['Walk'],
  GRAZING: ['Eating', 'Idle_Headlow', 'Idle_2_HeadLow'],
};

const loader = new GLTFLoader();

// Core refs
let _scene = null;
let mixer = null;
let currentAction = null;
let currentModel = null;
let storedAnimations = [];

// State machine
let creatureState = 'WALKING';
let stateTimer = 0;
let waypoints = [];
let currentWaypointIndex = 0;
let userTarget = null; // { x, z } set by click-to-move, overrides waypoint until reached

// Market-state modifiers (defaults = stable)
let walkSpeed = 1.5;
let walkProb  = 0.70;
let grazeProb = 0.20;
// idleProb = 1 - walkProb - grazeProb (implicit)
let crisisMode = false;

function generateWaypoints() {
  waypoints = [];
  for (let i = 0; i < 5; i++) {
    const angle = i * 2.399963; // golden angle
    const r = 2 + i * 0.6;     // 2.0, 2.6, 3.2, 3.8, 4.4
    waypoints.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
  }
}

function pickRandomAvailable(names) {
  const available = names.filter(n => storedAnimations.find(a => a.name === n));
  if (available.length === 0) return 'Idle';
  return available[Math.floor(Math.random() * available.length)];
}

function pickFirstAvailable(names) {
  for (const n of names) {
    if (storedAnimations.find(a => a.name === n)) return n;
  }
  return 'Idle';
}

function enterState(state) {
  creatureState = state;

  if (state === 'IDLE') {
    const clips = crisisMode ? ['Idle'] : CLIP_MAP.IDLE;
    setAnimation(pickRandomAvailable(clips));
    stateTimer = 4 + Math.random() * 6; // 4–10s, rerolled each entry
  } else if (state === 'WALKING') {
    setAnimation(pickFirstAvailable(CLIP_MAP.WALKING));
  } else if (state === 'GRAZING') {
    setAnimation(pickRandomAvailable(CLIP_MAP.GRAZING));
    stateTimer = 3 + Math.random() * 4; // 3–7s
  }
}

function decideNextState() {
  const r = Math.random();
  if (r < walkProb) {
    enterState('WALKING');
  } else if (r < walkProb + grazeProb) {
    enterState('GRAZING');
  } else {
    enterState('IDLE');
  }
}

export function loadCreature(scene, ecosystemId) {
  _scene = scene;

  const assetPath = ANIMAL_ASSETS[ecosystemId];
  if (!assetPath) {
    console.error(`[creature] No asset defined for ecosystem: ${ecosystemId}`);
    return;
  }

  if (currentModel) {
    _scene.remove(currentModel);
    currentModel = null;
    mixer = null;
    currentAction = null;
    storedAnimations = [];
  }

  generateWaypoints();
  currentWaypointIndex = 0;

  loader.load(
    assetPath,
    (gltf) => {
      const model = gltf.scene;
      storedAnimations = gltf.animations ?? [];

      // Scale to fit scene — target 2 units tall
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim;
      model.scale.setScalar(scale);

      // Sit on ground plane, centered horizontally
      const center = box.getCenter(new THREE.Vector3());
      model.position.x = -center.x * scale;
      model.position.y = -box.min.y * scale;
      model.position.z = -center.z * scale;

      _scene.add(model);
      currentModel = model;

      if (storedAnimations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        currentAction = null;
      }

      enterState('WALKING');
    },
    undefined,
    (err) => {
      console.error(`[creature] Failed to load ${assetPath}:`, err);
    }
  );
}

export function setAnimation(clipName) {
  if (!mixer || storedAnimations.length === 0) return;

  const clip = THREE.AnimationClip.findByName(storedAnimations, clipName);
  if (!clip) {
    console.warn(`[creature] Animation clip not found: ${clipName}`);
    return;
  }

  if (currentAction) currentAction.fadeOut(0.3);
  currentAction = mixer.clipAction(clip);
  currentAction.reset().fadeIn(0.3).play();
}

export function moveCreatureTo(x, z) {
  userTarget = { x, z };
  enterState('WALKING');
}

export function setMarketState(state) {
  switch (state) {
    case 'flourishing':
      walkSpeed = 2.2; walkProb = 0.85; grazeProb = 0.10; crisisMode = false; break;
    case 'stable':
      walkSpeed = 1.5; walkProb = 0.70; grazeProb = 0.20; crisisMode = false; break;
    case 'uneasy':
      walkSpeed = 1.0; walkProb = 0.45; grazeProb = 0.35; crisisMode = false; break;
    case 'stressed':
      walkSpeed = 0.7; walkProb = 0.40; grazeProb = 0.20; crisisMode = false; break;
    case 'crisis':
      walkSpeed = 0.4; walkProb = 0.30; grazeProb = 0.10; crisisMode = true;  break;
  }
}

export function updateCreature(delta) {
  if (mixer) mixer.update(delta);
  if (!currentModel || waypoints.length === 0) return;

  if (creatureState === 'WALKING') {
    const target = userTarget ?? waypoints[currentWaypointIndex];
    const dx = target.x - currentModel.position.x;
    const dz = target.z - currentModel.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist <= 0.2) {
      if (userTarget) {
        userTarget = null;
        enterState('IDLE');
        stateTimer = 5; // wait up to 5s for another click before resuming patrol
      } else {
        currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.length;
        decideNextState();
      }
    } else {
      // Move toward waypoint
      const step = Math.min(walkSpeed * delta, dist);
      const nx = dx / dist;
      const nz = dz / dist;
      currentModel.position.x += nx * step;
      currentModel.position.z += nz * step;

      // Rotate to face direction of travel (assumes model forward = +Z)
      const targetQuat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(nx, 0, nz)
      );
      currentModel.quaternion.rotateTowards(targetQuat, 3.0 * delta);
    }
  } else {
    // IDLE or GRAZING — run down the timer
    stateTimer -= delta;
    if (stateTimer <= 0) {
      if (creatureState === 'GRAZING') {
        enterState('IDLE'); // graze always returns to idle before next decision
      } else {
        decideNextState(); // idle timeout re-enters the decision loop
      }
    }
  }
}
