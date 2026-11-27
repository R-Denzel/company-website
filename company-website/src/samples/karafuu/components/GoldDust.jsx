import useAnimationSurface from '../../../hooks/useAnimationSurface';

const createDust = (canvas) => {
  const context = canvas.getContext('2d');
  if (!context) return null;

  let width = 0;
  let height = 0;
  let flecks = [];

  // One soft dot, drawn once and then stamped, which is far cheaper than a blur.
  const sprite = document.createElement('canvas');
  sprite.width = 32;
  sprite.height = 32;
  const brush = sprite.getContext('2d');
  const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16);
  glow.addColorStop(0, 'rgba(255, 232, 180, 1)');
  glow.addColorStop(0.35, 'rgba(232, 190, 110, 0.55)');
  glow.addColorStop(1, 'rgba(232, 190, 110, 0)');
  brush.fillStyle = glow;
  brush.fillRect(0, 0, 32, 32);

  return {
    resize(nextWidth, nextHeight, ratio) {
      width = nextWidth;
      height = nextHeight;
      const count = Math.min(90, Math.round((width * height) / (ratio * ratio * 9000)));
      flecks = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: (3 + Math.random() ** 3 * 22) * ratio,
        speed: 0.008 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
      }));
    },
    frame(time) {
      context.clearRect(0, 0, width, height);
      flecks.forEach((fleck) => {
        const y = (((fleck.y - time * fleck.speed) % 1) + 1) % 1;
        const x = fleck.x + Math.sin(time * 0.3 + fleck.phase) * 0.015;
        context.globalAlpha = 0.25 + 0.55 * Math.abs(Math.sin(time * 0.9 + fleck.phase));
        context.drawImage(sprite, x * width - fleck.size / 2, y * height - fleck.size / 2, fleck.size, fleck.size);
      });
    },
  };
};

/** Slowly rising gold flecks. The parent must be positioned. */
const GoldDust = () => {
  const host = useAnimationSurface(createDust, { scale: 0.6, fps: 30 });
  return <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-screen" />;
};

export default GoldDust;
