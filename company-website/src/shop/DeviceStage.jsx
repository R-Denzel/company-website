import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildDevice, createStudio, LID_CLOSED, LID_OPEN, softShadow } from './models';
import { holdCurtain } from '../lib/curtainHold';
import { nextFrame } from '../lib/frames';
import { MOTION_OK } from '../lib/gsap';

const FLOOR = -1.95;

/** One slide's furniture: plinth, shadow, device and a few floating shapes. */
const buildSet = (product) => {
  const isPhone = product.kind === 'phone';
  const set = new THREE.Group();

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(isPhone ? 1.35 : 2.55, isPhone ? 1.38 : 2.6, 0.26, 72),
    new THREE.MeshStandardMaterial({ color: product.backdrop[0], roughness: 0.55 }),
  );
  plinth.position.y = FLOOR;

  const shadow = softShadow();
  shadow.scale.set(isPhone ? 2.2 : 4.8, isPhone ? 1.4 : 3.2, 1);
  shadow.position.y = FLOOR + 0.135;

  const ground = softShadow();
  ground.scale.set(isPhone ? 4.6 : 7.6, 3, 1);
  ground.position.y = FLOOR - 0.13;

  const { object, lid } = buildDevice(product);
  const device = new THREE.Group();
  device.add(object);
  // Phones hover above the plinth; laptops rest on it.
  device.position.y = isPhone ? 0.12 : FLOOR + 0.22;

  const gloss = (colour) => new THREE.MeshPhysicalMaterial({ color: colour, roughness: 0.22, metalness: 0.15, clearcoat: 1 });
  const reach = isPhone ? 1.8 : 2.8;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.17, 32, 72), gloss(product.accent));
  ring.position.set(-reach, 0.9, -1.2);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.24, 48, 48), gloss('#ffffff'));
  ball.position.set(reach * 0.92, -1.2, 0.5);
  const pill = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.5, 12, 32), gloss(product.screen[2]));
  pill.position.set(reach, 1.15, -0.8);
  pill.rotation.z = 0.7;

  set.add(plinth, shadow, ground, device, ring, ball, pill);
  return { set, device, lid, isPhone, floaters: [ring, ball, pill], baseY: device.position.y };
};

/**
 * 3D track behind the slides. `position` is a ref holding the fractional slide
 * index: 0 is the introduction, 1 the first product.
 */
const DeviceStage = ({ products, position, onUnavailable }) => {
  const host = useRef(null);

  useEffect(() => {
    const element = host.current;
    const canvas = document.createElement('canvas');
    canvas.className = 'block h-full w-full';
    element.appendChild(canvas);

    let studio;
    try {
      studio = createStudio(canvas);
    } catch {
      canvas.remove();
      onUnavailable();
      return undefined;
    }

    const { renderer, scene, dispose } = studio;
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    const sets = products.map(buildSet);
    sets.forEach(({ set }) => scene.add(set));

    const motion = window.matchMedia(MOTION_OK);
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let current = position.current;
    let spacing = 10;
    let scale = 1;
    let lift = 0;
    let shift = 0;
    let captionsLeft = false;
    let frameId = 0;
    // Beyond 1.5 the extra sharpness is hard to see but costs many more pixels.
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = element;
      if (!width || !height) return;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const visibleWidth = 2 * 10 * Math.tan(THREE.MathUtils.degToRad(15)) * camera.aspect;
      spacing = Math.max(visibleWidth * 0.95, 6);
      // Narrow screens shrink the set and raise it clear of the caption. Small
      // landscape screens also push it to the side the caption does not use.
      const isTall = camera.aspect < 0.9;
      const isCompact = !isTall && (width < 1024 || height < 620);
      scale = Math.min(1, Math.max(visibleWidth / (isTall ? 6.4 : 8.4), 0.42)) * (isCompact ? 0.78 : 1);
      lift = isTall ? 0.35 : isCompact ? 0.4 : 0;
      shift = isCompact ? visibleWidth * 0.17 : 0;
      captionsLeft = width < 1024;
    };

    let previous = performance.now();
    let isReady = false;
    let isVisible = false;
    // Average frame time, used to lower the resolution on slower graphics.
    let frameCost = 1 / 60;
    let sampled = 0;

    const render = (now) => {
      frameId = requestAnimationFrame(render);
      const seconds = now / 1000;
      const animate = motion.matches;
      // Easing based on elapsed time, so slow devices settle as quickly as fast ones.
      const elapsed = Math.min(Math.max(now - previous, 0) / 1000, 0.5);
      previous = now;

      frameCost += (Math.min(elapsed, 0.1) - frameCost) * 0.05;
      sampled += 1;
      if (sampled > 90 && frameCost > 1 / 45 && pixelRatio > 0.75) {
        pixelRatio = Math.max(pixelRatio - 0.25, 0.75);
        sampled = 0;
        resize();
      }

      current += (position.current - current) * (animate ? 1 - Math.exp(-elapsed * 7) : 1);
      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;

      camera.position.set(animate ? eased.x * 0.5 : 0, 1.15 - (animate ? eased.y * 0.3 : 0), 10);
      camera.lookAt(0, -0.2, 0);

      sets.forEach(({ set, device, lid, isPhone, floaters, baseY }, index) => {
        const offset = index + 1 - current;
        set.visible = Math.abs(offset) < 1.2;
        if (!set.visible) return;

        const distance = Math.min(Math.abs(offset), 1);
        // Wide screens caption phones on the right and laptops on the left;
        // below 1024px every caption is on the left.
        const side = isPhone && !captionsLeft ? -1 : 1;
        set.position.set(offset * spacing + side * shift, lift, -distance * 1.5);
        set.scale.setScalar(scale);

        const sway = animate ? Math.sin(seconds * 0.55 + index) : 0;
        device.rotation.y = (isPhone ? -0.38 : -0.42) + offset * (isPhone ? 3.4 : 1.5) + sway * 0.16;
        device.position.y = baseY + (isPhone && animate ? Math.sin(seconds * 1.1 + index) * 0.07 : 0);
        if (lid) lid.rotation.x = THREE.MathUtils.lerp(LID_OPEN, LID_CLOSED, THREE.MathUtils.smoothstep(distance, 0.05, 0.75));

        floaters.forEach((shape, i) => {
          if (shape.userData.homeY === undefined) shape.userData.homeY = shape.position.y;
          shape.position.y = shape.userData.homeY + (animate ? Math.sin(seconds * (0.7 + i * 0.23) + index) * 0.16 : 0) + offset * (i + 1) * 0.5;
          if (animate) shape.rotation.x = seconds * 0.15 * (i + 1);
        });
      });

      renderer.render(scene, camera);
    };

    const handlePointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const sync = () => {
      cancelAnimationFrame(frameId);
      if (!isReady || !isVisible) return;
      previous = performance.now();
      frameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      sync();
    });

    // Prepare every shader and texture before the first frame, without blocking
    // the page, so no slide stutters the first time it appears.
    let isDisposed = false;
    const prepare = async () => {
      await renderer.compileAsync(scene, camera);
      const textures = [];
      scene.traverse((node) => {
        [node.material].flat().forEach((material) => material?.map && textures.push(material.map));
      });
      for (const texture of textures) {
        if (isDisposed) return;
        renderer.initTexture(texture);
        await nextFrame();
      }
      if (isDisposed) return;
      // Draw every device once, in view: some graphics drivers only finish a
      // shader the first time it is actually used.
      sets.forEach(({ set }) => set.scale.setScalar(0.3));
      camera.position.set(0, 1.15, 10);
      camera.lookAt(0, -0.2, 0);
      renderer.render(scene, camera);
      await nextFrame();
      if (isDisposed) return;
      isReady = true;
      sync();
      await nextFrame();
      await nextFrame();
      release();
    };

    const release = holdCurtain();
    resize();
    prepare().catch(release);
    resizeObserver.observe(element);
    visibilityObserver.observe(element);
    window.addEventListener('pointermove', handlePointer, { passive: true });

    return () => {
      isDisposed = true;
      release();
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', handlePointer);
      dispose();
      canvas.remove();
    };
  }, [products, position, onUnavailable]);

  return <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};

export default DeviceStage;
