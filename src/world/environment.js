import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// Base biome config: ground color, fog color, fog density,
// ambient light color, directional light color and position.
const BIOME = {
  arctic_tundra: {
    ground:      0xe8eef2,
    fog:         0xb8d0d8,
    fogDensity:  0.04,
    ambient:     { color: 0xb8cce0, intensity: 0.6 },
    sun:         { color: 0xdde8f0, intensity: 1.4, pos: [8, 10, -4] },
  },
  boreal_forest: {
    ground:      0x2d3d2a,
    fog:         0x3a4a35,
    fogDensity:  0.06,
    ambient:     { color: 0x3a4a30, intensity: 0.5 },
    sun:         { color: 0xc8d8c0, intensity: 1.1, pos: [4, 8, 6] },
  },
  temperate_woodland: {
    ground:      0x5a6a35,
    fog:         0x8a9a50,
    fogDensity:  0.03,
    ambient:     { color: 0x90a060, intensity: 0.7 },
    sun:         { color: 0xf5d888, intensity: 1.2, pos: [6, 9, 3] },
  },
  woodland_edge: {
    ground:      0x6a6835,
    fog:         0x9a8a50,
    fogDensity:  0.035,
    ambient:     { color: 0x887850, intensity: 0.65 },
    sun:         { color: 0xf0c870, intensity: 1.2, pos: [7, 8, 2] },
    splitLight:  true,
  },
  open_grassland: {
    ground:      0x8a8a40,
    fog:         0xc8c878,
    fogDensity:  0.012,
    ambient:     { color: 0xc8c080, intensity: 0.8 },
    sun:         { color: 0xfff0c0, intensity: 1.5, pos: [3, 12, 2] },
  },
  andean_highland: {
    ground:      0x6a5a4a,
    fog:         0xa0a8b0,
    fogDensity:  0.025,
    ambient:     { color: 0x889098, intensity: 0.5 },
    sun:         { color: 0xd8e0e8, intensity: 1.3, pos: [5, 11, -3] },
  },
  arid_scrubland: {
    ground:      0xc8a858,
    fog:         0xd4b870,
    fogDensity:  0.018,
    ambient:     { color: 0xb09050, intensity: 0.7 },
    sun:         { color: 0xfff8e0, intensity: 1.6, pos: [1, 14, 1] },
  },
};

// Per-state light modifiers applied on top of biome base
const STATE_LIGHT = {
  flourishing: { ambientMult: 1.1, sunMult: 1.2, sunColor: 0xf5c855, fogMult: 0.9 },
  stable:      { ambientMult: 1.0, sunMult: 1.0, sunColor: null,     fogMult: 1.0 },
  uneasy:      { ambientMult: 0.8, sunMult: 0.85, sunColor: 0xd0d8e0, fogMult: 1.2 },
  stressed:    { ambientMult: 0.7, sunMult: 1.1,  sunColor: 0xe8e8e0, fogMult: 1.4 },
  crisis:      { ambientMult: 0.5, sunMult: 1.4,  sunColor: 0xffffff, fogMult: 1.8 },
};

// Particle mode returned to caller for weather.js — indexed by [biome][visualState]
const PARTICLE_TRIGGERS = {
  arctic_tundra:      { uneasy: 'mist',   stressed: 'snow',  crisis: 'snow'       },
  boreal_forest:      { uneasy: 'mist',   stressed: 'rain',  crisis: 'rain_heavy' },
  temperate_woodland: { uneasy: 'leaves', stressed: 'rain',  crisis: 'rain_heavy' },
  woodland_edge:      { uneasy: 'leaves', stressed: 'rain',  crisis: 'rain_heavy' },
  open_grassland:     { uneasy: 'mist',   stressed: 'dust',  crisis: 'dust'       },
  andean_highland:    { uneasy: 'mist',   stressed: 'frost', crisis: 'snow'       },
  arid_scrubland:     {                   stressed: 'dust',  crisis: 'dust'       },
};

// Additive FBX objects spawned per market state on top of the base layer.
// Placement uses seededPos with baseOffset=300 to avoid colliding with base layer indices.
const STATE_LAYER_ASSETS = {
  arctic_tundra: {
    flourishing: [
      { file: 'Pine_1.fbx',           count: 2, radius: 10, spread: 3 },
      { file: 'Grass_Wispy_Tall.fbx', count: 3, radius: 5,  spread: 4 },
    ],
    stressed: [
      { file: 'DeadTree_1.fbx', count: 1, radius: 9, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_1.fbx',    count: 3, radius: 8,  spread: 4 },
      { file: 'Rock_Medium_2.fbx', count: 2, radius: 12, spread: 3 },
    ],
  },
  boreal_forest: {
    flourishing: [
      { file: 'Pine_1.fbx', count: 3, radius: 11, spread: 4 },
      { file: 'Pine_3.fbx', count: 2, radius: 14, spread: 3 },
    ],
    stressed: [
      { file: 'DeadTree_1.fbx', count: 1, radius: 9, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_1.fbx',    count: 3, radius: 8,  spread: 4 },
      { file: 'DeadTree_USN_1.fbx', count: 2, radius: 12, spread: 3 },
    ],
  },
  temperate_woodland: {
    flourishing: [
      { file: 'MapleTree_1.fbx',     count: 2, radius: 12, spread: 3 },
      { file: 'Flower_1.fbx',        count: 5, radius: 4,  spread: 5 },
      { file: 'Mushroom_Common.fbx', count: 3, radius: 3,  spread: 4 },
    ],
    stressed: [
      { file: 'DeadTree_1.fbx', count: 1, radius: 10, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_1.fbx',     count: 3, radius: 8,  spread: 4 },
      { file: 'DeadTree_USN_1.fbx', count: 2, radius: 12, spread: 3 },
    ],
  },
  woodland_edge: {
    flourishing: [
      { file: 'CommonTree_1.fbx', count: 2, radius: 12, spread: 3 },
      { file: 'Flower_1.fbx',     count: 4, radius: 4,  spread: 5 },
    ],
    stressed: [
      { file: 'TwistedTree_1.fbx', count: 1, radius: 11, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_1.fbx',    count: 2, radius: 9,  spread: 3 },
      { file: 'TwistedTree_1.fbx', count: 2, radius: 12, spread: 3 },
    ],
  },
  open_grassland: {
    flourishing: [
      { file: 'Flower_1.fbx',          count: 6, radius: 4, spread: 6 },
      { file: 'Grass_Common_Tall.fbx', count: 4, radius: 5, spread: 5 },
    ],
    stressed: [
      { file: 'Rock_Medium_1.fbx', count: 2, radius: 12, spread: 3 },
    ],
    crisis: [
      { file: 'Rock_Medium_2.fbx', count: 3, radius: 10, spread: 4 },
    ],
  },
  andean_highland: {
    flourishing: [
      { file: 'Pine_1.fbx',           count: 2, radius: 13, spread: 2 },
      { file: 'Grass_Wispy_Tall.fbx', count: 3, radius: 5,  spread: 4 },
    ],
    stressed: [
      { file: 'DeadTree_USN_1.fbx', count: 1, radius: 11, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_USN_1.fbx', count: 3, radius: 9,  spread: 4 },
      { file: 'Rock_Medium_2.fbx',  count: 2, radius: 13, spread: 3 },
    ],
  },
  arid_scrubland: {
    flourishing: [
      { file: 'Grass_Wispy_Tall.fbx', count: 3, radius: 5, spread: 4 },
    ],
    stressed: [
      { file: 'TwistedTree_1.fbx', count: 1, radius: 11, spread: 2 },
    ],
    crisis: [
      { file: 'DeadTree_1.fbx',    count: 3, radius: 8,  spread: 4 },
      { file: 'TwistedTree_1.fbx', count: 2, radius: 12, spread: 3 },
    ],
  },
};

// Anomaly: subtle clickable element, biome-appropriate.
// Flat scale = shimmer/ripple on ground. Unit scale = floating mote.
const ANOMALY_CONFIG = {
  arctic_tundra:      { color: 0x90d8f8, pos: [2.5,  0.04, 0.5],  scale: [1.6, 0.04, 1.1] },
  boreal_forest:      { color: 0xe09040, pos: [-1.5, 1.8,  0.5],  scale: [0.14, 0.14, 0.14] },
  temperate_woodland: { color: 0xa0c840, pos: [1.5,  1.2, -0.5],  scale: [0.13, 0.13, 0.13] },
  woodland_edge:      { color: 0xd0a858, pos: [0.5,  0.6, -1.5],  scale: [0.13, 0.13, 0.13] },
  open_grassland:     { color: 0xe8d060, pos: [-2.0, 0.06, 1.0],  scale: [1.2,  0.04, 0.9] },
  andean_highland:    { color: 0xa8d8f0, pos: [1.5,  0.18, -1.0], scale: [0.16, 0.16, 0.16] },
  arid_scrubland:     { color: 0xe88840, pos: [2.0,  0.08, 0.5],  scale: [1.3,  0.04, 1.0] },
};

// Biome tint multiplied onto FBX material colors after load
const BIOME_TINTS = {
  arctic_tundra:      0xd8e8f0,
  boreal_forest:      0x607855,
  temperate_woodland: 0x90a870,
  woodland_edge:      0xb0a060,
  open_grassland:     0xc8bc60,
  andean_highland:    0x9098a0,
  arid_scrubland:     0xc09848,
};

// FBX asset lists per biome — radius = base distance from origin, spread = radius variance
const BIOME_ASSETS = {
  arctic_tundra: [
    { file: 'Pine_1.fbx',           count: 3, radius: 6,   spread: 4 },
    { file: 'Pine_2.fbx',           count: 2, radius: 9,   spread: 3 },
    { file: 'Rock_Medium_1.fbx',    count: 6, radius: 4,   spread: 5 },
    { file: 'Rock_Medium_2.fbx',    count: 4, radius: 7,   spread: 4 },
    { file: 'DeadTree_1.fbx',       count: 2, radius: 11,  spread: 3 },
    { file: 'Grass_Wispy_Tall.fbx', count: 8, radius: 3.5, spread: 6 },
  ],
  boreal_forest: [
    { file: 'Pine_1.fbx',        count: 8, radius: 5,  spread: 5 },
    { file: 'Pine_2.fbx',        count: 6, radius: 8,  spread: 4 },
    { file: 'Pine_3.fbx',        count: 5, radius: 12, spread: 4 },
    { file: 'DeadTree_1.fbx',    count: 3, radius: 7,  spread: 3 },
    { file: 'Rock_Medium_1.fbx', count: 4, radius: 4,  spread: 4 },
    { file: 'Rock_Medium_2.fbx', count: 3, radius: 6,  spread: 3 },
  ],
  temperate_woodland: [
    { file: 'CommonTree_1.fbx',      count: 5,  radius: 6,   spread: 4 },
    { file: 'CommonTree_2.fbx',      count: 4,  radius: 9,   spread: 4 },
    { file: 'BirchTree_1.fbx',       count: 4,  radius: 7,   spread: 4 },
    { file: 'BirchTree_2.fbx',       count: 3,  radius: 11,  spread: 3 },
    { file: 'MapleTree_1.fbx',       count: 3,  radius: 8,   spread: 3 },
    { file: 'Bush_Common.fbx',       count: 6,  radius: 4,   spread: 5 },
    { file: 'Mushroom_Common.fbx',   count: 5,  radius: 3.5, spread: 5 },
    { file: 'Flower_1.fbx',          count: 8,  radius: 4,   spread: 6 },
    { file: 'Grass_Common_Tall.fbx', count: 10, radius: 3.5, spread: 7 },
  ],
  woodland_edge: [
    { file: 'CommonTree_1.fbx',      count: 3, radius: 8,   spread: 3 },
    { file: 'BirchTree_1.fbx',       count: 3, radius: 10,  spread: 3 },
    { file: 'Bush_Common.fbx',       count: 5, radius: 4,   spread: 5 },
    { file: 'Grass_Common_Tall.fbx', count: 8, radius: 3.5, spread: 6 },
    { file: 'Grass_Wispy_Tall.fbx',  count: 6, radius: 5,   spread: 5 },
    { file: 'Flower_1.fbx',          count: 6, radius: 4,   spread: 5 },
  ],
  open_grassland: [
    { file: 'Grass_Common_Tall.fbx', count: 12, radius: 4,   spread: 8 },
    { file: 'Grass_Wispy_Tall.fbx',  count: 10, radius: 5,   spread: 7 },
    { file: 'Flower_1.fbx',          count: 8,  radius: 3.5, spread: 6 },
    { file: 'Rock_Medium_1.fbx',     count: 3,  radius: 10,  spread: 3 },
    { file: 'CommonTree_1.fbx',      count: 2,  radius: 14,  spread: 2 },
  ],
  andean_highland: [
    { file: 'Rock_Medium_1.fbx',    count: 8, radius: 4,   spread: 5 },
    { file: 'Rock_Medium_2.fbx',    count: 7, radius: 7,   spread: 5 },
    { file: 'Grass_Wispy_Tall.fbx', count: 6, radius: 4,   spread: 5 },
    { file: 'Pine_1.fbx',           count: 2, radius: 12,  spread: 2 },
    { file: 'DeadTree_USN_1.fbx',   count: 3, radius: 9,   spread: 3 },
  ],
  arid_scrubland: [
    { file: 'Rock_Medium_1.fbx',    count: 7, radius: 4,   spread: 5 },
    { file: 'Rock_Medium_2.fbx',    count: 5, radius: 7,   spread: 4 },
    { file: 'DeadTree_1.fbx',       count: 3, radius: 8,   spread: 3 },
    { file: 'TwistedTree_1.fbx',    count: 3, radius: 10,  spread: 3 },
    { file: 'Grass_Wispy_Tall.fbx', count: 8, radius: 3.5, spread: 6 },
    { file: 'DeadTree_USN_1.fbx',   count: 2, radius: 13,  spread: 2 },
  ],
};

let _scene = null;
let ambientLight = null;
let sunLight = null;
let fillLight = null;
let groundMesh = null;
let currentBiome = null;
let anomalyMesh = null;
let anomalyTime = 0;
let sunRaySprite = null;
let sunRayTargetOpacity = 0;
let dynamicObjects = [];

const envMaterials = []; // { material, h, s, l } — base tinted HSL for sat animation
let satFrom = 1.0;
let satTo = 1.0;
let colorProgress = 1.0;
let _currentSat = 1.0;

// Golden-angle deterministic placement — no Math.random()
function seededPos(i, radius, spread) {
  const angle = i * 2.399963; // golden angle in radians
  const r = radius + (i % spread) * 1.2;
  return [Math.cos(angle) * r, 0, Math.sin(angle) * r];
}

function loadEnvironmentAssets(scene, ecosystemId) {
  const assets = BIOME_ASSETS[ecosystemId];
  if (!assets) return;

  const tintColor = new THREE.Color(BIOME_TINTS[ecosystemId] ?? 0xffffff);
  const loader = new FBXLoader();
  let placementIndex = 0;

  for (const { file, count, radius, spread } of assets) {
    for (let i = 0; i < count; i++) {
      const pi = placementIndex++;
      loader.load(
        `nature/${file}`,
        object => {
          object.animations = [];
          object.scale.setScalar(0.01);

          const [x, , z] = seededPos(pi, radius, spread);
          object.position.set(x, 0, z);
          object.rotation.y = pi * 1.618;

          object.traverse(child => {
            if (!child.isMesh) return;
            child.castShadow = true;
            child.receiveShadow = true;

            const mats = Array.isArray(child.material) ? child.material : [child.material];
            const cloned = mats.map(m => {
              if (!m) return m;
              const c = m.clone();
              c.color.multiply(tintColor);
              const hsl = {};
              c.color.getHSL(hsl);
              // store base (post-tint) HSL for saturation animation
              envMaterials.push({ material: c, h: hsl.h, s: hsl.s, l: hsl.l });
              // apply current sat immediately so newly loaded assets match the scene
              c.color.setHSL(hsl.h, Math.max(0, hsl.s * _currentSat), hsl.l);
              return c;
            });
            child.material = Array.isArray(child.material) ? cloned : cloned[0];
          });

          scene.add(object);
        },
        undefined,
        err => console.error(`[environment] FBX load failed: ${file}`, err)
      );
    }
  }
}

function removeDynamicObjects() {
  for (const obj of dynamicObjects) _scene.remove(obj);
  dynamicObjects = [];
}

function addStateLayer(state) {
  const layers = STATE_LAYER_ASSETS[currentBiome]?.[state];
  if (!layers) return;
  const tintColor = new THREE.Color(BIOME_TINTS[currentBiome] ?? 0xffffff);
  const loader = new FBXLoader();
  let idx = 300;
  for (const { file, count, radius, spread } of layers) {
    for (let i = 0; i < count; i++) {
      const pi = idx++;
      loader.load(
        `nature/${file}`,
        object => {
          object.animations = [];
          object.scale.setScalar(0.01);
          const [x, , z] = seededPos(pi, radius, spread);
          object.position.set(x, 0, z);
          object.rotation.y = pi * 1.618;
          object.traverse(child => {
            if (!child.isMesh) return;
            child.castShadow = true;
            child.receiveShadow = true;
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            const cloned = mats.map(m => {
              if (!m) return m;
              const c = m.clone();
              c.color.multiply(tintColor);
              const hsl = {};
              c.color.getHSL(hsl);
              envMaterials.push({ material: c, h: hsl.h, s: hsl.s, l: hsl.l });
              c.color.setHSL(hsl.h, Math.max(0, hsl.s * _currentSat), hsl.l);
              return c;
            });
            child.material = Array.isArray(child.material) ? cloned : cloned[0];
          });
          _scene.add(object);
          dynamicObjects.push(object);
        },
        undefined,
        err => console.error(`[environment] state-layer FBX load failed: ${file}`, err)
      );
    }
  }
}

function updateSunRay(state) {
  sunRayTargetOpacity = state === 'flourishing' ? 0.35 : state === 'stable' ? 0.07 : 0;
}

function buildSunRayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0,    'rgba(255,240,180,0.9)');
  g.addColorStop(0.35, 'rgba(255,220,120,0.4)');
  g.addColorStop(1,    'rgba(255,200,80,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

export function initEnvironment(scene, ecosystemId) {
  _scene = scene;
  currentBiome = ecosystemId;
  anomalyMesh = null;
  anomalyTime = 0;
  sunRaySprite = null;
  sunRayTargetOpacity = 0;
  dynamicObjects = [];

  // Reset FBX color transition state for new session
  envMaterials.length = 0;
  satFrom = 1.0;
  satTo = 1.0;
  colorProgress = 1.0;
  _currentSat = 1.0;

  const cfg = BIOME[ecosystemId];
  if (!cfg) {
    console.error(`[environment] No config for ecosystem: ${ecosystemId}`);
    return;
  }

  // Ground plane — 80×80 units
  const groundGeo = new THREE.PlaneGeometry(80, 80);
  const groundMat = new THREE.MeshLambertMaterial({ color: cfg.ground });
  groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Fog
  scene.fog = new THREE.FogExp2(cfg.fog, cfg.fogDensity);
  scene.background = new THREE.Color(cfg.fog);

  // Ambient light
  ambientLight = new THREE.AmbientLight(cfg.ambient.color, cfg.ambient.intensity);
  scene.add(ambientLight);

  // Directional sun light
  const [sx, sy, sz] = cfg.sun.pos;
  sunLight = new THREE.DirectionalLight(cfg.sun.color, cfg.sun.intensity);
  sunLight.position.set(sx, sy, sz);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 80;
  sunLight.shadow.camera.left = -20;
  sunLight.shadow.camera.right = 20;
  sunLight.shadow.camera.top = 20;
  sunLight.shadow.camera.bottom = -20;
  scene.add(sunLight);

  // Woodland edge: darker fill from the wood side
  if (cfg.splitLight) {
    fillLight = new THREE.DirectionalLight(0x3a3020, 0.4);
    fillLight.position.set(-8, 4, -2);
    scene.add(fillLight);
  }

  // Anomaly — subtle, persistent, no label
  const anomalyCfg = ANOMALY_CONFIG[ecosystemId];
  if (anomalyCfg) {
    const geo = new THREE.SphereGeometry(1, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: anomalyCfg.color,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    anomalyMesh = new THREE.Mesh(geo, mat);
    anomalyMesh.scale.set(...anomalyCfg.scale);
    anomalyMesh.position.set(...anomalyCfg.pos);
    scene.add(anomalyMesh);
  }

  // Sun ray sprite — fades in at flourishing, invisible by default
  // sx/sy/sz already in scope from the sun light setup above
  sunRaySprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: buildSunRayTexture(),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  }));
  sunRaySprite.position.set(sx * 3, sy * 2.5, sz * 3);
  sunRaySprite.scale.set(22, 22, 1);
  scene.add(sunRaySprite);

  // FBX environment geometry — async, populates envMaterials as files resolve
  loadEnvironmentAssets(scene, ecosystemId);
}

export function getAnomaly() {
  return anomalyMesh;
}

export function animateAnomaly(delta) {
  if (anomalyMesh) {
    anomalyTime += delta;
    anomalyMesh.material.opacity = 0.12 + Math.sin(anomalyTime * 0.65) * 0.10;
    anomalyMesh.rotation.y += delta * 0.18;
  }

  // Sun ray opacity lerp
  if (sunRaySprite) {
    sunRaySprite.material.opacity +=
      (sunRayTargetOpacity - sunRaySprite.material.opacity) * Math.min(1, delta * 0.6);
  }

  // Saturation color transition tick
  if (colorProgress < 1) {
    colorProgress = Math.min(1, colorProgress + delta);
    _currentSat = satFrom + (satTo - satFrom) * colorProgress;
    for (const { material, h, s, l } of envMaterials) {
      material.color.setHSL(h, Math.max(0, s * _currentSat), l);
    }
  }
}

export function applyMarketState(state) {
  if (!ambientLight || !sunLight) return 'none';

  removeDynamicObjects();
  addStateLayer(state);
  updateSunRay(state);

  const mod = STATE_LIGHT[state] ?? STATE_LIGHT.stable;
  const cfg = BIOME[currentBiome];

  ambientLight.intensity = cfg.ambient.intensity * mod.ambientMult;
  sunLight.intensity = cfg.sun.intensity * mod.sunMult;
  if (mod.sunColor) sunLight.color.setHex(mod.sunColor);
  else sunLight.color.setHex(cfg.sun.color);

  if (_scene?.fog) {
    _scene.fog.density = cfg.fogDensity * mod.fogMult;
  }

  // Begin saturation transition for FBX environment materials
  satFrom = _currentSat;
  satTo = state === 'flourishing' ? 1.2 : state === 'crisis' ? 0.4 : 1.0;
  colorProgress = 0;

  return PARTICLE_TRIGGERS[currentBiome]?.[state] ?? 'none';
}
