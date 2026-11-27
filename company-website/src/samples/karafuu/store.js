import { useSyncExternalStore } from 'react';

// Bag and wishlist live outside React so they survive page changes, and in
// sessionStorage so they survive a refresh. Nothing leaves the browser.
const KEY = 'karafuu-demo';
const empty = { bag: [], wishlist: [] };

const read = () => {
  try {
    return { ...empty, ...JSON.parse(window.sessionStorage.getItem(KEY)) };
  } catch {
    return empty;
  }
};

let state = read();
const listeners = new Set();

const update = (change) => {
  state = { ...state, ...change };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private browsing can refuse storage; the bag still works until reload.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useShop = () => useSyncExternalStore(subscribe, () => state);

export const setQuantity = (id, quantity) => {
  const others = state.bag.filter((item) => item.id !== id);
  if (quantity <= 0) return update({ bag: others });
  const next = { id, quantity: Math.min(quantity, 9) };
  const exists = state.bag.some((item) => item.id === id);
  return update({ bag: exists ? state.bag.map((item) => (item.id === id ? next : item)) : [...state.bag, next] });
};

export const addToBag = (id) => setQuantity(id, (state.bag.find((item) => item.id === id)?.quantity || 0) + 1);

export const toggleWish = (id) => update({
  wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id],
});
