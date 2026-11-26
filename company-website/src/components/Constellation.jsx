import useAnimationSurface from '../hooks/useAnimationSurface';

const LINK_DISTANCE = 150;
const COLOURS = ['200, 186, 255', '255, 122, 92', '100, 64, 245'];

const createNetwork = (canvas) => {
  const context = canvas.getContext('2d');
  if (!context) return null;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let nodes = [];
  let previousTime = null;
  const pointer = { x: -1, y: -1 };

  return {
    resize(nextWidth, nextHeight, nextRatio) {
      width = nextWidth / nextRatio;
      height = nextHeight / nextRatio;
      ratio = nextRatio;
      const count = Math.min(80, Math.round((width * height) / 16000));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18,
        radius: 1.2 + Math.random() * 2,
        colour: COLOURS[index % COLOURS.length],
      }));
    },
    frame(time) {
      const step = previousTime === null ? 0 : Math.min(time - previousTime, 0.1);
      previousTime = time;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x = (node.x + node.vx * step + width) % width;
        node.y = (node.y + node.vy * step + height) % height;
      });

      const cursor = pointer.x >= 0 && pointer.x <= 1 && pointer.y >= 0 && pointer.y <= 1
        ? { x: pointer.x * width, y: pointer.y * height }
        : null;

      nodes.forEach((node, index) => {
        const others = cursor ? [...nodes.slice(index + 1), cursor] : nodes.slice(index + 1);
        others.forEach((other) => {
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > LINK_DISTANCE) return;
          context.strokeStyle = `rgba(${node.colour}, ${(1 - distance / LINK_DISTANCE) * 0.3})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        });

        context.fillStyle = `rgba(${node.colour}, 0.7)`;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      });
    },
    pointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
  };
};

/** Drifting network of connected points, for collaboration themes on dark ground. */
const Constellation = () => {
  // Half resolution: this covers tall sections, and fine lines hide the difference.
  const host = useAnimationSurface(createNetwork, { scale: 0.5, fps: 30 });
  return <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />;
};

export default Constellation;
