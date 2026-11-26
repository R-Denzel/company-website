export const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/**
 * Resolves once the page has painted a few frames in a row without stalling, so
 * an animation started afterwards does not stutter. Gives up after `limit` ms.
 */
export const whenSmooth = async (limit = 600) => {
  const start = performance.now();
  let last = await nextFrame();
  let steady = 0;

  while (steady < 3 && performance.now() - start < limit) {
    const now = await nextFrame();
    steady = now - last < 34 ? steady + 1 : 0;
    last = now;
  }
};
