import { useSyncExternalStore } from 'react';
import { DEFAULT_MARKET, markets } from '../content/markets';
import { logEvent } from './analytics';

// The visitor's market and business size. Only these two choices are stored, in
// the browser; the market is remembered, the size lasts for the visit.
const read = (storage, key) => {
  try {
    return window[storage].getItem(key);
  } catch {
    return null;
  }
};

const write = (storage, key, value) => {
  try {
    window[storage].setItem(key, value);
  } catch {
    // Storage can be refused; the choice still applies until reload.
  }
};

const savedMarket = read('localStorage', 'ft-market');
let state = {
  market: markets[savedMarket] ? savedMarket : DEFAULT_MARKET,
  segment: read('sessionStorage', 'ft-segment') || '',
};
const listeners = new Set();

const update = (change) => {
  state = { ...state, ...change };
  listeners.forEach((listener) => listener());
};

export const setMarket = (market) => {
  if (!markets[market] || market === state.market) return;
  write('localStorage', 'ft-market', market);
  update({ market });
  logEvent('market_selected', { market });
};

export const setSegment = (segment) => {
  if (segment === state.segment) return;
  write('sessionStorage', 'ft-segment', segment);
  update({ segment });
  if (segment) logEvent('segment_selected', { segment });
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const usePreferences = () => useSyncExternalStore(subscribe, () => state);
export const useMarket = () => markets[usePreferences().market];
