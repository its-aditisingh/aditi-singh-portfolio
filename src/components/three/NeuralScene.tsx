import type { MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { NeuralBrain, type PointerState, type SceneColors } from './NeuralBrain';

export interface NeuralSceneProps {
  nodeCount: number;
  pulseCount: number;
  colors: SceneColors;
  /** false pauses rendering (off-screen or hidden tab). */
  active: boolean;
  pointer: MutableRefObject<PointerState>;
  ripple: MutableRefObject<number>;
  /** Called once the first frame is on screen, to crossfade from the SVG fallback. */
  onReady: () => void;
}

// Lazy-loaded entry: everything three.js / R3F lives behind this module (NFR-P4)
export function NeuralScene({ active, onReady, ...brain }: NeuralSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 45, position: [0, 0, 6], near: 0.1, far: 50 }}
      onCreated={() => requestAnimationFrame(() => onReady())}
      style={{ pointerEvents: 'none' }}
    >
      <NeuralBrain {...brain} />
    </Canvas>
  );
}
