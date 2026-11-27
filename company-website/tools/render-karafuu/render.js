import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { bottles } from './bottles.js';

// Seeded random numbers, so every run produces the same pictures.
const randomFrom = (seed) => {
  let value = seed * 9301 + 49297;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const texture = (width, height, draw) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  return map;
};

/** Flowing coloured silk with gold dust, painted behind the bottle. */
const silkBackdrop = (bottle, seed, strength) => texture(2000, 2000, (context, width, height) => {
  const random = randomFrom(seed);
  context.fillStyle = bottle.ground;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width / 2, height * 0.56, 0, width / 2, height * 0.56, width * 0.42);
  glow.addColorStop(0, `${bottle.silk[0]}88`);
  glow.addColorStop(1, `${bottle.silk[0]}00`);
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = 'lighter';
  [0, 1, 2].forEach((band) => {
    const startY = height * (0.92 - band * 0.2 + random() * 0.08);
    const midY = height * (0.3 + random() * 0.45);
    const endY = height * (0.15 + band * 0.18 + random() * 0.1);
    context.filter = `blur(${band === 1 ? 10 : 4}px)`;
    for (let strand = 0; strand < 70; strand += 1) {
      const spread = (strand - 35) * (3.2 + band);
      context.strokeStyle = bottle.silk[strand % 11 === 0 ? 2 : band === 2 ? 1 : 0];
      context.globalAlpha = (0.025 + random() * 0.05) * strength;
      context.lineWidth = 2 + random() * (strand % 13 === 0 ? 46 : 12);
      context.beginPath();
      context.moveTo(-100, startY + spread);
      context.bezierCurveTo(width * 0.3, midY - spread * 1.8, width * 0.62, height - midY * 0.5 + spread * 1.4, width + 100, endY - spread * 0.5);
      context.stroke();
    }
  });

  context.filter = 'none';
  for (let i = 0; i < 520; i += 1) {
    const big = i % 40 === 0;
    context.globalAlpha = (big ? 0.12 : 0.25 + random() * 0.55) * strength;
    context.fillStyle = i % 3 === 0 ? '#ffe2a8' : bottle.silk[2];
    context.beginPath();
    context.arc(random() * width, random() * height, big ? 8 + random() * 18 : 0.6 + random() * 2.4, 0, Math.PI * 2);
    context.fill();
  }
});

/** Soft pool of light for the clean product shot. */
const studioBackdrop = (bottle) => texture(1400, 1400, (context, width, height) => {
  context.fillStyle = '#050403';
  context.fillRect(0, 0, width, height);
  const glow = context.createRadialGradient(width / 2, height * 0.52, 0, width / 2, height * 0.52, width * 0.33);
  glow.addColorStop(0, `${bottle.silk[0]}66`);
  glow.addColorStop(0.55, `${bottle.silk[1]}33`);
  glow.addColorStop(1, `${bottle.silk[1]}00`);
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
});

const gold = new THREE.MeshPhysicalMaterial({ color: '#e2bd72', metalness: 1, roughness: 0.2, clearcoat: 0.5 });

const jewel = (colour) => new THREE.MeshPhysicalMaterial({
  color: colour, metalness: 0.1, roughness: 0.02, transmission: 0.7, thickness: 0.6, ior: 2.1, flatShading: true,
});

const mesh = (geometry, material, y = 0) => {
  const object = new THREE.Mesh(geometry, material);
  object.position.y = y;
  return object;
};

const lathe = (points, segments, material) => mesh(new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segments), material);

const buildCap = (bottle, top) => {
  const cap = new THREE.Group();
  cap.add(mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.14, 64), gold, 0.07));
  [0, 0.14].forEach((y) => {
    const ring = mesh(new THREE.TorusGeometry(0.255, 0.03, 20, 64), gold, y);
    ring.rotation.x = Math.PI / 2;
    cap.add(ring);
  });

  if (bottle.cap === 'crown') {
    cap.add(lathe([[0, 0.14], [0.3, 0.18], [0.4, 0.34], [0.34, 0.46], [0, 0.46]], 64, gold));
    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2;
      const spike = mesh(new THREE.ConeGeometry(0.075, 0.3, 20), gold, 0.58);
      spike.position.set(Math.cos(angle) * 0.3, 0.58, Math.sin(angle) * 0.3);
      const pearl = mesh(new THREE.SphereGeometry(0.05, 24, 24), jewel('#ffd9a0'));
      pearl.position.set(Math.cos(angle) * 0.3, 0.76, Math.sin(angle) * 0.3);
      cap.add(spike, pearl);
    }
    cap.add(mesh(new THREE.IcosahedronGeometry(0.17, 0), jewel('#ff7a2a'), 0.66));
  } else if (bottle.cap === 'gem') {
    cap.add(mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.12, 8), gold, 0.2));
    const stone = mesh(new THREE.OctahedronGeometry(0.42, 1), jewel('#ff2f6d'), 0.6);
    stone.scale.y = 0.92;
    cap.add(stone);
  } else if (bottle.cap === 'flame') {
    cap.add(lathe([[0, 0.14], [0.22, 0.2], [0.34, 0.42], [0.24, 0.68], [0.08, 0.9], [0, 1.02]], 64, gold));
  } else if (bottle.cap === 'disc') {
    cap.add(mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.24, 8), gold, 0.29));
    cap.add(mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.12, 8), jewel('#7a5cff'), 0.47));
  } else if (bottle.cap === 'block') {
    const block = mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.52, 4), gold, 0.43);
    block.rotation.y = Math.PI / 4;
    cap.add(block);
  } else {
    cap.add(mesh(new THREE.SphereGeometry(0.36, 64, 64), gold, 0.46));
    const band = mesh(new THREE.TorusGeometry(0.365, 0.018, 16, 96), gold, 0.46);
    band.rotation.x = Math.PI / 2;
    cap.add(band);
  }

  cap.position.y = top;
  return cap;
};

const buildBottle = (bottle) => {
  const group = new THREE.Group();
  const outline = new THREE.SplineCurve(bottle.profile.map(([x, y]) => new THREE.Vector2(x, y)));
  const smooth = bottle.sides ? bottle.profile.map(([x, y]) => new THREE.Vector2(x, y)) : outline.getPoints(120);
  const segments = bottle.sides || 128;
  const closed = [new THREE.Vector2(0, 0), ...smooth, new THREE.Vector2(0, smooth.at(-1).y)];

  const glass = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 1.4,
    ior: 1.5,
    attenuationColor: new THREE.Color(bottle.glass),
    attenuationDistance: 1.7,
    // A faint glow of its own colour, as if light were pooling in the perfume.
    emissive: new THREE.Color(bottle.glass),
    emissiveIntensity: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    flatShading: Boolean(bottle.sides),
    specularIntensity: 1,
  });
  const geometry = new THREE.LatheGeometry(closed, segments);
  const body = new THREE.Mesh(geometry, glass);
  if (bottle.sides) body.rotation.y = Math.PI / bottle.sides;
  group.add(body);

  const foot = mesh(new THREE.CylinderGeometry(bottle.profile[0][0] * 1.04, bottle.profile[0][0] * 1.08, 0.09, bottle.sides || 96), gold, 0.045);
  if (bottle.sides) foot.rotation.y = Math.PI / bottle.sides;
  group.add(foot);

  // Gold lettering floating just proud of the glass.
  const radiusAt = (height) => {
    const points = bottle.sides ? bottle.profile.map(([x, y]) => new THREE.Vector2(x, y)) : smooth;
    for (let i = 1; i < points.length; i += 1) {
      if (points[i].y >= height) {
        const mix = (height - points[i - 1].y) / (points[i].y - points[i - 1].y || 1);
        return THREE.MathUtils.lerp(points[i - 1].x, points[i].x, THREE.MathUtils.clamp(mix, 0, 1));
      }
    }
    return points.at(-1).x;
  };
  const radius = Math.max(radiusAt(bottle.label - 0.16), radiusAt(bottle.label), radiusAt(bottle.label + 0.16)) + 0.015;
  const lettering = texture(1024, 320, (context, width) => {
    context.textAlign = 'center';
    context.fillStyle = '#ffe3a6';
    context.font = '500 112px Jost, sans-serif';
    context.letterSpacing = '22px';
    context.fillText('KARAFUU', width / 2, 150);
    context.font = '400 46px Jost, sans-serif';
    context.letterSpacing = '10px';
    context.fillText(bottle.name, width / 2, 240);
  });
  const arc = Math.min(1.5, 1.25 / radius);
  const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, (radius * arc * 320) / 1024, 64, 1, true, -arc / 2, arc),
    new THREE.MeshBasicMaterial({ map: lettering, transparent: true, depthWrite: false, toneMapped: false }),
  );
  plate.position.y = bottle.label;
  group.add(plate);

  const top = bottle.profile.at(-1)[1];
  group.add(buildCap(bottle, top));
  return group;
};

/** Rough dark stone the bottle stands on. */
const buildPlinth = (seed) => {
  const random = randomFrom(seed + 7);
  const geometry = new THREE.CylinderGeometry(1.16, 1.5, 0.72, 34, 6);
  const position = geometry.attributes.position;
  const offsets = new Map();
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    if (Math.hypot(x, z) < 0.2) continue;
    const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    if (!offsets.has(key)) offsets.set(key, [0.9 + random() * 0.22, y < 0.35 ? (random() - 0.5) * 0.1 : 0]);
    const [push, lift] = offsets.get(key);
    position.setXYZ(i, x * push, y + lift, z * push);
  }
  geometry.computeVertexNormals();
  return mesh(geometry, new THREE.MeshStandardMaterial({ color: '#120e0c', roughness: 0.58, metalness: 0.3, flatShading: true }), -0.36);
};

const canvas = document.createElement('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(canvas);

const generator = new THREE.PMREMGenerator(renderer);
const environment = generator.fromScene(new RoomEnvironment(), 0.03).texture;

const shots = {
  card: { size: [1350, 1800], camera: [0, 2.15, 12.2], target: [0, 1.28, 0], plinth: true, backdrop: (b, i) => silkBackdrop(b, i + 1, 1) },
  hero: { size: [1600, 1600], camera: [0, 1.9, 9.4], target: [0, 1.55, 0], plinth: false, backdrop: studioBackdrop },
  detail: { size: [1600, 1600], camera: [2.1, 3.5, 5], target: [0, 2.35, 0], plinth: false, backdrop: (b, i) => silkBackdrop(b, i + 31, 0.7) },
};

window.renderShot = async (index, shotName) => {
  await document.fonts.load('500 100px Jost');
  await document.fonts.load('400 40px Jost');
  const bottle = bottles[index];
  const shot = shots[shotName];
  const [width, height] = shot.size;
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  scene.environment = environment;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 60);
  camera.position.set(...shot.camera);
  camera.lookAt(...shot.target);

  // The painted backdrop is a real surface, so the glass refracts it.
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(17, 17),
    new THREE.MeshBasicMaterial({ map: shot.backdrop(bottle, index), toneMapped: false }),
  );
  const view = new THREE.Vector3(...shot.target).sub(camera.position).normalize();
  wall.position.copy(new THREE.Vector3(...shot.target).addScaledVector(view, 5));
  wall.lookAt(camera.position);
  scene.add(wall, buildBottle(bottle));

  if (shot.plinth) scene.add(buildPlinth(index));
  else {
    const reflection = buildBottle(bottle);
    reflection.scale.y = -1;
    reflection.position.y = -0.02;
    reflection.traverse((node) => {
      if (!node.material) return;
      node.material = node.material.clone();
      node.material.transparent = true;
      node.material.opacity = 0.16;
      node.material.transmission = 0;
      if (node.material.color && !node.material.map) node.material.color.multiplyScalar(0.5);
    });
    if (shotName === 'hero') scene.add(reflection);
  }

  const key = new THREE.DirectionalLight('#fff1da', 2.4);
  key.position.set(-3, 5, 5);
  const left = new THREE.PointLight(bottle.silk[2], 40, 20);
  left.position.set(-3.2, 2.2, -1.4);
  const right = new THREE.PointLight(bottle.silk[0], 55, 20);
  right.position.set(3.2, 1.2, -1);
  const rim = new THREE.DirectionalLight('#ffd9a0', 2.2);
  rim.position.set(4, 3, -3);
  scene.add(key, left, right, rim);

  renderer.render(scene, camera);
  return canvas.toDataURL('image/png');
};

window.rendererReady = true;
