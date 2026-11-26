import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Procedural, unbranded devices, so the demo ships no model files or third-party artwork.

export const LID_OPEN = -0.26;
export const LID_CLOSED = Math.PI / 2 - 0.02;

const roundedShape = (width, height, radius) => {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
};

/** Rounded slab centred on the origin, facing +z. */
const slab = (width, height, radius, depth, bevel, material) => {
  const geometry = new THREE.ExtrudeGeometry(roundedShape(width, height, radius), {
    depth,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 20,
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(geometry, material);
};

/** Flat rounded panel with 0–1 texture coordinates. */
const panel = (width, height, radius, material) => {
  const geometry = new THREE.ShapeGeometry(roundedShape(width, height, radius), 20);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i += 1) {
    uv.setXY(i, position.getX(i) / width + 0.5, position.getY(i) / height + 0.5);
  }
  return new THREE.Mesh(geometry, material);
};

const canvasTexture = (width, height, draw) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};

const box = (context, x, y, width, height, radius, fill) => {
  context.fillStyle = fill;
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
};

const wallpaper = (context, width, height, [dark, mid, light]) => {
  const base = context.createLinearGradient(0, 0, width * 0.4, height);
  base.addColorStop(0, dark);
  base.addColorStop(0.62, mid);
  base.addColorStop(1, light);
  context.fillStyle = base;
  context.fillRect(0, 0, width, height);

  [[0.85, 0.3, 0.55, light], [0.1, 0.72, 0.6, mid], [0.7, 0.95, 0.45, dark]].forEach(([x, y, r, colour]) => {
    const radius = r * Math.max(width, height) * 0.75;
    const glow = context.createRadialGradient(x * width, y * height, 0, x * width, y * height, radius);
    glow.addColorStop(0, `${colour}cc`);
    glow.addColorStop(1, `${colour}00`);
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  });
};

const phoneScreen = (product) => canvasTexture(560, 1180, (context, width, height) => {
  wallpaper(context, width, height, product.screen);
  box(context, width / 2 - 78, 26, 156, 44, 22, '#05040a');

  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.font = '500 34px "Hanken Grotesk", sans-serif';
  context.fillText('Friday, 27 November', width / 2, 180);
  context.font = '600 168px "Hanken Grotesk", sans-serif';
  context.fillText('10:24', width / 2, 340);

  box(context, 34, 640, width - 68, 150, 36, 'rgba(255,255,255,0.18)');
  context.textAlign = 'left';
  context.font = '600 34px "Hanken Grotesk", sans-serif';
  context.fillText(product.name, 70, 700);
  context.font = '400 28px "Hanken Grotesk", sans-serif';
  context.fillText('Battery 86% · 5G', 70, 746);

  [0, 1].forEach((column) => {
    box(context, 34 + column * 254, 812, 238, 130, 32, 'rgba(255,255,255,0.14)');
    box(context, 64 + column * 254, 844, 54, 54, 18, column ? '#ffc3b3' : '#c8baff');
    box(context, 64 + column * 254, 912, 130, 10, 5, 'rgba(255,255,255,0.7)');
  });

  box(context, 34, height - 180, width - 68, 138, 46, 'rgba(255,255,255,0.2)');
  ['#ffffff', '#c8baff', '#ffc3b3', '#6440f5'].forEach((colour, index) => {
    box(context, 66 + index * 116, height - 156, 90, 90, 28, colour);
  });
});

const laptopScreen = (product) => canvasTexture(1280, 820, (context, width, height) => {
  wallpaper(context, width, height, product.screen);
  box(context, 150, 90, 980, 590, 26, 'rgba(255,255,255,0.94)');
  box(context, 150, 90, 230, 590, 26, '#efebff');
  ['#ff7a5c', '#ffc46b', '#6ed39a'].forEach((colour, i) => box(context, 178 + i * 30, 116, 16, 16, 8, colour));
  [0, 1, 2, 3, 4].forEach((i) => box(context, 182, 180 + i * 62, i === 0 ? 166 : 130, 22, 11, i === 0 ? '#6440f5' : '#c9c1ee'));

  context.fillStyle = '#140f2e';
  context.font = '600 40px "Hanken Grotesk", sans-serif';
  context.fillText(`${product.name} dashboard`, 420, 160);
  [0, 1, 2].forEach((i) => {
    box(context, 420 + i * 232, 195, 210, 120, 20, ['#f1edff', '#ffeee9', '#eaf2ff'][i]);
    box(context, 442 + i * 232, 222, 90, 14, 7, '#8d86ad');
    box(context, 442 + i * 232, 258, 140, 30, 10, '#140f2e');
  });
  [120, 190, 150, 240, 205, 280, 230, 300, 260, 215, 285].forEach((bar, i) => {
    box(context, 426 + i * 62, 640 - bar, 38, bar, 10, i % 3 === 2 ? '#ff7a5c' : '#8b6cff');
  });
  box(context, 410, height - 90, 460, 66, 24, 'rgba(255,255,255,0.35)');
  [0, 1, 2, 3, 4, 5].forEach((i) => box(context, 432 + i * 72, height - 78, 44, 44, 14, ['#fff', '#c8baff', '#ffc3b3'][i % 3]));
});

const metal = (colour, roughness = 0.3) => new THREE.MeshPhysicalMaterial({
  color: colour, metalness: 0.65, roughness, clearcoat: 0.8, clearcoatRoughness: 0.25,
});

const glass = () => new THREE.MeshPhysicalMaterial({ color: '#07060d', metalness: 0.2, roughness: 0.12, clearcoat: 1 });

const display = (map) => new THREE.MeshBasicMaterial({ map, toneMapped: false });

const buildPhone = (product) => {
  const phone = new THREE.Group();
  const frame = metal(product.body);
  phone.add(slab(1.56, 3.28, 0.27, 0.1, 0.045, frame));

  const bezel = panel(1.58, 3.3, 0.27, glass());
  bezel.position.z = 0.097;
  const screen = panel(1.5, 3.22, 0.23, display(phoneScreen(product)));
  screen.position.z = 0.099;
  phone.add(bezel, screen);

  const cameraPlate = slab(0.76, product.cameras === 3 ? 1.08 : 0.78, 0.2, 0.03, 0.02, metal(product.body, 0.18));
  cameraPlate.position.set(0.31, product.cameras === 3 ? 0.9 : 1.05, -0.12);
  phone.add(cameraPlate);

  const lensSpots = product.cameras === 3 ? [[0.31, 1.22], [0.31, 0.9], [0.31, 0.58]] : [[0.46, 1.19], [0.16, 0.91]];
  lensSpots.forEach(([x, y]) => {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.07, 40), metal('#d9d6e8', 0.15));
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.082, 40), glass());
    [ring, lens].forEach((part) => {
      part.rotation.x = Math.PI / 2;
      part.position.set(x, y, -0.17);
      phone.add(part);
    });
  });

  [[0.82, 0.62, 0.5], [-0.82, 0.8, 0.3], [-0.82, 0.38, 0.3]].forEach(([x, y, length]) => {
    const button = new THREE.Mesh(new THREE.BoxGeometry(0.04, length, 0.07), frame);
    button.position.set(x, y, 0);
    phone.add(button);
  });

  return { object: phone, lid: null };
};

const buildLaptop = (product) => {
  const laptop = new THREE.Group();
  const shell = metal(product.body, 0.38);

  const base = slab(4.1, 2.75, 0.16, 0.09, 0.025, shell);
  base.rotation.x = -Math.PI / 2;
  laptop.add(base);

  const deckHeight = 0.072;
  const well = panel(3.66, 1.42, 0.08, new THREE.MeshStandardMaterial({ color: '#15122a', roughness: 0.7 }));
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, deckHeight, -0.4);
  laptop.add(well);

  const keyMaterial = new THREE.MeshStandardMaterial({ color: '#2a2547', roughness: 0.55 });
  const columns = 14;
  const rows = 4;
  const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.215, 0.035, 0.22), keyMaterial, columns * rows);
  const matrix = new THREE.Matrix4();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      matrix.setPosition(-1.658 + column * 0.255, deckHeight + 0.016, -0.94 + row * 0.27);
      keys.setMatrixAt(row * columns + column, matrix);
    }
  }
  const spaceBar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.035, 0.2), keyMaterial);
  spaceBar.position.set(0, deckHeight + 0.016, 0.15);
  laptop.add(keys, spaceBar);

  const trackpad = panel(1.35, 0.74, 0.08, metal(product.body, 0.2));
  trackpad.rotation.x = -Math.PI / 2;
  trackpad.position.set(0, deckHeight + 0.002, 0.82);
  laptop.add(trackpad);

  const lid = new THREE.Group();
  lid.position.set(0, 0.1, -1.36);
  const cover = slab(4.1, 2.68, 0.16, 0.04, 0.02, shell);
  cover.position.y = 1.34;
  const bezel = panel(4, 2.58, 0.12, glass());
  bezel.position.set(0, 1.34, 0.042);
  const screen = panel(3.86, 2.42, 0.05, display(laptopScreen(product)));
  screen.position.set(0, 1.34, 0.044);
  const emblem = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 16, 48), metal('#ffffff', 0.15));
  emblem.position.set(0, 1.34, -0.045);
  lid.add(cover, bezel, screen, emblem);
  lid.rotation.x = LID_OPEN;
  laptop.add(lid);

  return { object: laptop, lid };
};

export const buildDevice = (product) => (product.kind === 'phone' ? buildPhone(product) : buildLaptop(product));

export const softShadow = () => {
  const map = canvasTexture(256, 256, (context) => {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(25,15,60,0.45)');
    gradient.addColorStop(0.55, 'rgba(25,15,60,0.18)');
    gradient.addColorStop(1, 'rgba(25,15,60,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  });
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
};

/** Renderer with studio reflections and key lighting already set up. */
export const createStudio = (canvas) => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const generator = new THREE.PMREMGenerator(renderer);
  const environment = generator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 0.75;
  generator.dispose();

  const key = new THREE.DirectionalLight('#ffffff', 1.6);
  key.position.set(3, 5, 6);
  const rim = new THREE.DirectionalLight('#b69cff', 2.2);
  rim.position.set(-6, 2, -3);
  const fill = new THREE.DirectionalLight('#ffad8f', 1.1);
  fill.position.set(6, -1, -2);
  scene.add(key, rim, fill);

  const dispose = () => {
    scene.traverse((node) => {
      node.geometry?.dispose();
      [node.material].flat().filter(Boolean).forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
    });
    environment.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { renderer, scene, dispose };
};
