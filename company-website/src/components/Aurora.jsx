import useAnimationSurface from '../hooks/useAnimationSurface';
import getAuroraEngine from '../lib/auroraEngine';

// Colours as 0–1 RGB. `strength` caps how far each glow moves away from the base,
// which keeps text on top readable.
const palettes = {
  light: {
    base: [1, 1, 1],
    glows: [[0.74, 0.67, 1], [1, 0.72, 0.64], [0.7, 0.8, 1]],
    strength: 0.65,
    fallback: 'bg-gradient-to-br from-paper via-paper to-violet-soft/40',
  },
  dark: {
    base: [0.078, 0.059, 0.18],
    // Coral is dimmed here so secondary text keeps its contrast where glows peak.
    glows: [[0.39, 0.25, 0.96], [0.78, 0.32, 0.34], [0.62, 0.2, 0.76]],
    strength: 0.54,
    fallback: 'bg-ink',
  },
};

const masks = { full: 0, bottom: 1, corner: 2 };

const createAurora = (canvas, palette, mask) => {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context || !getAuroraEngine()) return null;

  const target = { x: 0.5, y: 0.5 };
  const pointer = { x: 0.5, y: 0.5 };
  let width = 1;
  let height = 1;

  return {
    resize(nextWidth, nextHeight) {
      width = nextWidth;
      height = nextHeight;
    },
    frame(time) {
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;
      getAuroraEngine()?.draw(context, { width, height, palette, mask, time, pointer });
    },
    pointer(x, y) {
      target.x = Math.min(Math.max(x, 0), 1);
      target.y = Math.min(Math.max(y, 0), 1);
    },
  };
};

/**
 * Slow liquid gradient behind a section. The parent needs `relative isolate`.
 * `expand` lets it widen to full bleed as the section scrolls into view.
 */
const Aurora = ({ tone = 'light', mask = 'full', paused = false, expand = false }) => {
  const palette = palettes[tone];
  // Soft gradients survive heavy upscaling, so render small and cheap.
  const host = useAnimationSurface((canvas) => createAurora(canvas, palette, masks[mask]), { scale: 0.2, fps: 30, paused });

  return (
    <div
      ref={host}
      aria-hidden="true"
      data-expand={expand ? '' : undefined}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${expand ? 'rounded-3xl' : ''} ${palette.fallback}`}
    />
  );
};

export default Aurora;
