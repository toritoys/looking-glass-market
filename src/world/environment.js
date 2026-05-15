import * as THREE from 'three';

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
    // Split lighting handled via second fill light in initEnvironment
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

// Particle mode returned to caller for weather.js — indexed by [biome][state]
const PARTICLE_TRIGGERS = {
  arctic_tundra:      { stressed: 'snow', crisis: 'snow' },
  boreal_forest:      { stressed: 'snow', crisis: 'ice' },
  temperate_woodland: { uneasy:  'leaves' },
  woodland_edge:      { uneasy:  'leaves', stressed: 'leaves' },
  open_grassland:     { stressed: 'dust',  crisis: 'dust' },
  andean_highland:    { stressed: 'frost', crisis: 'snow' },
  arid_scrubland:     { stressed: 'dust',  crisis: 'dust' },
};

let _scene = null;
let ambientLight = null;
let sunLight = null;
let fillLight = null;
let groundMesh = null;
let currentBiome = null;

export function initEnvironment(scene, ecosystemId) {
  _scene = scene;
  currentBiome = ecosystemId;
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
}

export function applyMarketState(state) {
  if (!ambientLight || !sunLight) return 'none';

  const mod = STATE_LIGHT[state] ?? STATE_LIGHT.stable;
  const cfg = BIOME[currentBiome];

  ambientLight.intensity = cfg.ambient.intensity * mod.ambientMult;
  sunLight.intensity = cfg.sun.intensity * mod.sunMult;
  if (mod.sunColor) sunLight.color.setHex(mod.sunColor);
  else sunLight.color.setHex(cfg.sun.color);

  if (_scene?.fog) {
    _scene.fog.density = cfg.fogDensity * mod.fogMult;
  }

  return PARTICLE_TRIGGERS[currentBiome]?.[state] ?? 'none';
}
