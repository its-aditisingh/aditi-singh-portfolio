import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/** Single source for reduced-motion decisions (animation-spec, rule 1). */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
