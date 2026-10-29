import { useRef } from 'react';
import { render } from '@testing-library/react';
import { buildBrainNetwork } from './network';
import { HeroCanvas } from './HeroCanvas';

describe('buildBrainNetwork', () => {
  const network = buildBrainNetwork(400);

  it('is deterministic for a seed', () => {
    const again = buildBrainNetwork(400);
    expect(again.positions).toEqual(network.positions);
    expect(again.edges).toEqual(network.edges);
  });

  it('creates the requested nodes inside the brain bounds', () => {
    expect(network.positions).toHaveLength(400 * 3);
    for (let i = 0; i < network.positions.length; i += 3) {
      expect(Math.abs(network.positions[i]!)).toBeLessThan(2); // x: 0.55 + 1.3
      expect(Math.abs(network.positions[i + 1]!)).toBeLessThan(1.5);
      expect(Math.abs(network.positions[i + 2]!)).toBeLessThan(1.2);
    }
  });

  it('links nodes only to valid, nearby, distinct neighbours', () => {
    expect(network.edges.length).toBeGreaterThan(400); // ~2 links per node, deduped
    for (let k = 0; k < network.edges.length; k += 2) {
      const a = network.edges[k]!;
      const b = network.edges[k + 1]!;
      expect(a).not.toBe(b);
      expect(a).toBeLessThan(400);
      const d = Math.hypot(
        network.positions[a * 3]! - network.positions[b * 3]!,
        network.positions[a * 3 + 1]! - network.positions[b * 3 + 1]!,
        network.positions[a * 3 + 2]! - network.positions[b * 3 + 2]!,
      );
      expect(d).toBeLessThanOrEqual(0.75 + 1e-6);
    }
  });

  it('builds a symmetric adjacency list for pulses to walk', () => {
    network.adjacency.forEach((neighbours, a) => {
      for (const b of neighbours) expect(network.adjacency[b]).toContain(a);
    });
  });
});

function Harness() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      <HeroCanvas interactionRef={ref} />
    </div>
  );
}

describe('HeroCanvas gating', () => {
  it('shows only the static SVG when WebGL is unavailable (jsdom) and never loads three.js', async () => {
    const { container } = render(<Harness />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
    // give an idle callback / timeout the chance to fire — it must not mount the scene
    await new Promise((resolve) => setTimeout(resolve, 700));
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(<Harness />);
    expect(container.querySelector('[aria-hidden]')).toContainElement(container.querySelector('svg'));
  });
});
