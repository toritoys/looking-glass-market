import * as THREE from 'three';

const BIRD_COUNTS = { flourishing: 14, stable: 7, uneasy: 3, stressed: 0, crisis: 0 };

let _scene = null;
let activeMesh = null;   // currently visible Points mesh
let birdMesh = null;     // InstancedMesh for birds
let birdData = [];       // per-bird orbit params
const _mat4 = new THREE.Matrix4();
const _dummy = new THREE.Object3D();

// ─── Particle helpers ────────────────────────────────────────────────────────

function makeParticleSystem(count, color, size, opacity) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  points.visible = false;
  return points;
}

function scatter(geo, count, rangeX, rangeY, rangeZ, offsetY = 0) {
  const pos = geo.attributes.position.array;
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * rangeX;
    pos[i * 3 + 1] = Math.random() * rangeY + offsetY;
    pos[i * 3 + 2] = (Math.random() - 0.5) * rangeZ;
  }
  geo.attributes.position.needsUpdate = true;
}

// ─── Particle systems ────────────────────────────────────────────────────────

const SYSTEMS = {};

function buildSystems() {
  // rain
  SYSTEMS.rain = makeParticleSystem(1500, 0xd0e8ff, 0.06, 0.45);
  scatter(SYSTEMS.rain.geometry, 1500, 40, 20, 40, 0);
  SYSTEMS.rain.userData = { type: 'rain', speedY: 12, driftX: 0.5 };

  // rain_heavy
  SYSTEMS.rain_heavy = makeParticleSystem(3000, 0xc0d8f8, 0.055, 0.6);
  scatter(SYSTEMS.rain_heavy.geometry, 3000, 50, 25, 50, 0);
  SYSTEMS.rain_heavy.userData = { type: 'rain', speedY: 20, driftX: 1.2 };

  // mist
  SYSTEMS.mist = makeParticleSystem(800, 0xffffff, 0.12, 0.15);
  scatter(SYSTEMS.mist.geometry, 800, 50, 6, 50, 0.5);
  SYSTEMS.mist.userData = { type: 'mist', driftX: 0.4, driftZ: 0.3 };

  // snow
  SYSTEMS.snow = makeParticleSystem(1200, 0xeef4ff, 0.09, 0.55);
  scatter(SYSTEMS.snow.geometry, 1200, 40, 20, 40, 0);
  SYSTEMS.snow.userData = { type: 'snow', speedY: 2.5, driftX: 0.4 };

  // dust
  SYSTEMS.dust = makeParticleSystem(600, 0xb89060, 0.10, 0.3);
  scatter(SYSTEMS.dust.geometry, 600, 50, 4, 50, 0.3);
  SYSTEMS.dust.userData = { type: 'dust', driftX: 2.5, driftZ: 0.8 };

  // leaves
  SYSTEMS.leaves = makeParticleSystem(150, 0x7a9050, 0.14, 0.5);
  scatter(SYSTEMS.leaves.geometry, 150, 30, 12, 30, 1);
  SYSTEMS.leaves.userData = { type: 'leaves', speedY: 0.8, driftX: 0.6, driftZ: 0.5 };

  // frost — stationary shimmer, very faint
  SYSTEMS.frost = makeParticleSystem(400, 0xaaccee, 0.08, 0.2);
  scatter(SYSTEMS.frost.geometry, 400, 30, 0.5, 30, 0.05);
  SYSTEMS.frost.userData = { type: 'frost' };
}

// ─── Bird system ─────────────────────────────────────────────────────────────

function buildBirds(scene) {
  const MAX_BIRDS = 14;

  // Flat diamond silhouette (two triangles)
  const geo = new THREE.BufferGeometry();
  const verts = new Float32Array([
     0,      0.07, 0,   // top
    -0.12,   0,    0,   // left
     0.12,   0,    0,   // right
     0,     -0.05, 0,   // bottom
  ]);
  const idx = new Uint16Array([0, 1, 3,  0, 2, 3]);
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));

  const mat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    side: THREE.DoubleSide,
  });

  birdMesh = new THREE.InstancedMesh(geo, mat, MAX_BIRDS);
  birdMesh.count = 0;
  birdMesh.frustumCulled = false;
  scene.add(birdMesh);

  // Seed per-bird orbit params deterministically
  birdData = [];
  for (let i = 0; i < MAX_BIRDS; i++) {
    const t = i / MAX_BIRDS;
    birdData.push({
      radius:    8 + t * 8,                     // 8–16
      height:    7 + (i % 5) * 1.2,             // 7–12.8
      angle:     (i * 2.399963) % (Math.PI * 2),// golden angle spread
      speed:     0.15 + (i % 7) * 0.035,        // 0.15–0.36
      bobPhase:  i * 0.73,
      bobAmp:    0.3 + (i % 3) * 0.15,
      tiltAngle: (i % 2 === 0 ? 1 : -1) * 0.18,
    });
  }
}

function updateBirds(delta) {
  if (!birdMesh || birdMesh.count === 0) return;
  for (let i = 0; i < birdMesh.count; i++) {
    const b = birdData[i];
    b.angle += b.speed * delta;
    b.bobPhase += delta * 1.2;

    const x = Math.cos(b.angle) * b.radius;
    const z = Math.sin(b.angle) * b.radius;
    const y = b.height + Math.sin(b.bobPhase) * b.bobAmp;

    _dummy.position.set(x, y, z);
    // face direction of travel, tilt slightly
    _dummy.rotation.y = -b.angle + Math.PI * 0.5;
    _dummy.rotation.z = b.tiltAngle;
    _dummy.updateMatrix();
    birdMesh.setMatrixAt(i, _dummy.matrix);
  }
  birdMesh.instanceMatrix.needsUpdate = true;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function initWeather(scene) {
  _scene = scene;
  buildSystems();
  for (const sys of Object.values(SYSTEMS)) scene.add(sys);
  buildBirds(scene);
}

export function setWeatherState(triggerMode, visualState) {
  // Swap particle system
  if (activeMesh) activeMesh.visible = false;
  activeMesh = SYSTEMS[triggerMode] ?? null;
  if (activeMesh) activeMesh.visible = true;

  // Set bird count
  if (birdMesh) {
    birdMesh.count = BIRD_COUNTS[visualState] ?? 0;
  }
}

export function updateWeather(delta) {
  updateBirds(delta);
  if (!activeMesh) return;

  const { type, speedY, driftX, driftZ } = activeMesh.userData;
  const pos = activeMesh.geometry.attributes.position;
  const arr = pos.array;
  const count = arr.length / 3;

  if (type === 'rain') {
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += (Math.random() - 0.5) * 0.01 * driftX;
      arr[i * 3 + 1] -= speedY * delta;
      if (arr[i * 3 + 1] < -1) arr[i * 3 + 1] += 26; // wrap back to top
    }
    pos.needsUpdate = true;
  } else if (type === 'snow') {
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += (Math.random() - 0.5) * driftX * delta;
      arr[i * 3 + 1] -= speedY * delta;
      if (arr[i * 3 + 1] < -1) arr[i * 3 + 1] += 22;
    }
    pos.needsUpdate = true;
  } else if (type === 'mist') {
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += (Math.random() - 0.5) * driftX * delta;
      arr[i * 3 + 2] += (Math.random() - 0.5) * driftZ * delta;
      // wrap X/Z
      if (arr[i * 3]     >  25) arr[i * 3]     -= 50;
      if (arr[i * 3]     < -25) arr[i * 3]     += 50;
      if (arr[i * 3 + 2] >  25) arr[i * 3 + 2] -= 50;
      if (arr[i * 3 + 2] < -25) arr[i * 3 + 2] += 50;
    }
    pos.needsUpdate = true;
  } else if (type === 'dust') {
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += driftX * delta;
      arr[i * 3 + 2] += (Math.random() - 0.5) * driftZ * delta;
      if (arr[i * 3] > 25) arr[i * 3] -= 50;
    }
    pos.needsUpdate = true;
  } else if (type === 'leaves') {
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += (Math.random() - 0.5) * driftX * delta;
      arr[i * 3 + 1] -= speedY * delta;
      arr[i * 3 + 2] += (Math.random() - 0.5) * driftZ * delta;
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] += 14;
    }
    pos.needsUpdate = true;
  }
  // frost: stationary, no per-frame update needed
}
