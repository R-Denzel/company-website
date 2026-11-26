// Lets a page with slow setup (the 3D shop) keep the transition curtain down
// until it can draw smoothly.

const pending = new Set();

/** Returns a function that releases the hold. Safe to call more than once. */
export const holdCurtain = () => {
  let release;
  const hold = new Promise((resolve) => {
    release = () => {
      pending.delete(hold);
      resolve();
    };
  });
  pending.add(hold);
  return release;
};

/** Resolves when every hold is released, or after `limit` ms whatever happens. */
export const whenReleased = (limit = 5000) => Promise.race([
  Promise.all(pending),
  new Promise((resolve) => window.setTimeout(resolve, limit)),
]);
