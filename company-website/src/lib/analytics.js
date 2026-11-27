import { track } from '@vercel/analytics';

/** Records a named event. Never pass names, contact details or message text. */
export const logEvent = (name, details = {}) => {
  try {
    track(name, details);
  } catch {
    // Analytics must never break a page.
  }
};
