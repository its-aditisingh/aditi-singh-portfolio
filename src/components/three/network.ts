import { mulberry32 } from '@/lib/random';

// Geometry for the "neural brain" (docs/04-design/3d-scene.md). Pure data — no three.js —
// so it is cheap to test and only the typed arrays travel into the WebGL scene.

export interface BrainNetwork {
  count: number;
  /** xyz per node */
  positions: Float32Array;
  /** 0–1 per node, drives twinkle phase */
  seeds: Float32Array;
  /** 1 for the ~20% highlight nodes, else 0 */
  bright: Float32Array;
  /** node index pairs, two per edge */
  edges: Uint32Array;
  /** neighbours of each node (for pulses walking the network) */
  adjacency: number[][];
}

const HEMISPHERE = { offsetX: 0.55, rx: 1.3, ry: 1.45, rz: 1.15 };
const NEIGHBOURS = 2;
const MAX_LINK = 0.75;

/** Gaussian-ish sample via the sum of uniforms, then normalised → uniform direction on a sphere. */
function direction(random: () => number) {
  const g = () => random() + random() + random() - 1.5;
  let x = g();
  let y = g();
  let z = g();
  const length = Math.hypot(x, y, z) || 1;
  x /= length;
  y /= length;
  z /= length;
  return [x, y, z] as const;
}

export function buildBrainNetwork(count: number, seed = 20260729): BrainNetwork {
  const random = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const bright = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Alternate hemispheres; most points sit near the surface so the shape reads as a shell
    const side = i % 2 === 0 ? -1 : 1;
    const [dx, dy, dz] = direction(random);
    const radius = 0.82 + random() * 0.18;
    positions[i * 3] = side * HEMISPHERE.offsetX + dx * HEMISPHERE.rx * radius;
    positions[i * 3 + 1] = dy * HEMISPHERE.ry * radius;
    positions[i * 3 + 2] = dz * HEMISPHERE.rz * radius;
    seeds[i] = random();
    bright[i] = random() > 0.8 ? 1 : 0;
  }

  // Link each node to its nearest neighbours within MAX_LINK (computed once; O(n²) is fine at ≤1.4k)
  const maxSq = MAX_LINK * MAX_LINK;
  const pairs = new Set<number>();
  for (let i = 0; i < count; i++) {
    const best: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const ddx = positions[j * 3]! - positions[i * 3]!;
      const ddy = positions[j * 3 + 1]! - positions[i * 3 + 1]!;
      const ddz = positions[j * 3 + 2]! - positions[i * 3 + 2]!;
      const d = ddx * ddx + ddy * ddy + ddz * ddz;
      if (d > maxSq) continue;
      if (best.length < NEIGHBOURS) best.push({ j, d });
      else {
        const worst = best[0]!.d > best[1]!.d ? 0 : 1;
        if (d < best[worst]!.d) best[worst] = { j, d };
      }
    }
    for (const { j } of best) pairs.add(i < j ? i * count + j : j * count + i);
  }

  const edges = new Uint32Array(pairs.size * 2);
  const adjacency: number[][] = Array.from({ length: count }, () => []);
  let k = 0;
  for (const key of pairs) {
    const a = Math.floor(key / count);
    const b = key % count;
    edges[k++] = a;
    edges[k++] = b;
    adjacency[a]!.push(b);
    adjacency[b]!.push(a);
  }

  return { count, positions, seeds, bright, edges, adjacency };
}
