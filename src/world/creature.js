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

const loader = new GLTFLoader();

let _scene = null;
let mixer = null;
let currentAction = null;
let currentModel = null;
let storedAnimations = [];

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

  loader.load(
    assetPath,
    (gltf) => {
      const model = gltf.scene;
      storedAnimations = gltf.animations ?? [];

      // Center and scale to fit scene — target 2 units tall
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim;

      model.scale.setScalar(scale);

      // Sit on ground plane (y=0), centered horizontally
      const center = box.getCenter(new THREE.Vector3());
      model.position.x = -center.x * scale;
      model.position.y = -box.min.y * scale;
      model.position.z = -center.z * scale;

      _scene.add(model);
      currentModel = model;

      if (storedAnimations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        currentAction = mixer.clipAction(storedAnimations[0]);
        currentAction.play();
      }
    },
    undefined,
    (err) => {
      console.error(`[creature] Failed to load ${assetPath}:`, err);
      // No placeholder geometry fallback per spec
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

export function updateCreature(delta) {
  if (mixer) mixer.update(delta);
}
