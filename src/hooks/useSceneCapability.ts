import { useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

let webglSupport: boolean | undefined;

/**
 * Creating a throwaway WebGL context is expensive (it spins up the GPU process), so this is
 * NOT called during render — HeroCanvas calls it only when it's about to mount the scene.
 */
export function supportsWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement('canvas');
    webglSupport = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function onSlowOrMeteredConnection() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(
    connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType ?? ''),
  );
}

export type SceneTier = { nodes: number; pulses: number };

/**
 * Whether the WebGL hero may run, and how heavy it should be (docs/04-design/3d-scene.md):
 * off for reduced motion, Save-Data or 2G; lighter on phones and low-core devices.
 * WebGL support itself is checked later, at mount time (see supportsWebGL).
 */
export function useSceneCapability(): SceneTier | null {
  const reduce = useReducedMotion();
  const [tier] = useState<SceneTier | null>(() => {
    if (onSlowOrMeteredConnection()) return null;
    const small = window.matchMedia('(max-width: 767px)').matches;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;
    return { nodes: small ? 700 : 1400, pulses: lowEnd ? 0 : small ? 12 : 24 };
  });
  return reduce ? null : tier;
}
