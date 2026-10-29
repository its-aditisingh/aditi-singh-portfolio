import { cn } from '@/lib/cn';
import { mulberry32 } from '@/lib/random';

// Static SVG of the "neural brain" node network (docs/04-design/3d-scene.md).
// Shown first, and kept whenever the WebGL scene can't or shouldn't run (HeroCanvas).

const SIZE = 400;
const NODE_COUNT = 46;
const NEIGHBOURS = 2;

function buildNetwork() {
  const random = mulberry32(20260729);
  const nodes: { x: number; y: number; r: number; bright: boolean }[] = [];

  // Two overlapping ellipses ≈ left/right hemispheres
  while (nodes.length < NODE_COUNT) {
    const left = nodes.length % 2 === 0;
    const cx = left ? 165 : 235;
    const x = cx + (random() * 2 - 1) * 120;
    const y = 200 + (random() * 2 - 1) * 150;
    const inside = ((x - cx) / 120) ** 2 + ((y - 200) / 150) ** 2 <= 1;
    if (inside) nodes.push({ x, y, r: 2 + random() * 2.5, bright: random() > 0.8 });
  }

  const edges = new Set<string>();
  nodes.forEach((node, i) => {
    nodes
      .map((other, j) => ({ j, d: Math.hypot(other.x - node.x, other.y - node.y) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS)
      .forEach(({ j }) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`));
  });

  return {
    nodes,
    edges: [...edges].map((key) => key.split('-').map(Number) as [number, number]),
  };
}

const { nodes, edges } = buildNetwork();

export function HeroFallback({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cn('text-accent', className)}
      fill="none"
    >
      <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={1}>
        {edges.map(([a, b]) => {
          const from = nodes[a];
          const to = nodes[b];
          if (!from || !to) return null;
          return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
        })}
      </g>
      <g fill="currentColor">
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fillOpacity={node.bright ? 0.95 : 0.55}
          />
        ))}
      </g>
    </svg>
  );
}
