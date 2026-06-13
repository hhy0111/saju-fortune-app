/* eslint-disable no-bitwise */

export function createSeed(parts: Array<string | number | null | undefined>): string {
  return parts.map(part => String(part ?? 'none')).join('|');
}

function hashSeed(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed) || 1;

  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);

    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickSeeded<T>(items: T[], seed: string): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty array');
  }

  const random = createSeededRandom(seed);
  return items[Math.floor(random() * items.length)];
}
