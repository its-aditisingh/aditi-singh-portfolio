# 3D Scene — "Neural Brain"

## Concept
A slowly rotating **cloud of glowing nodes shaped like a brain**, connected by thin lines like a neural network. Small light **pulses travel along the connections** like EEG signals. It ties together her AI/ML focus, deep learning interest, and the EEG-based Mind Scan Analyzer project.

**With the photo:** the network sits *behind* Aditi's arch-framed portrait like a halo — the camera is offset so the brain's centre is slightly above and behind the photo's head area, and a few nodes/pulses pass in front of the frame edges (rendered in a second, small overlay canvas layer is **not** needed — use CSS `z-index`: canvas behind, photo above, with 3–4 decorative SVG nodes on top of the frame edge for the "in front" effect).

The scene reacts to the visitor:
- **Pointer move** → scene tilts toward the pointer (max ±0.25 rad), nodes near the pointer brighten and push outward slightly.
- **Click / tap** → a ripple pulse fires from the centre through the network.
- **Scroll** past the hero → scene scales down and fades (and stops rendering once off-screen).

## Build (React Three Fiber)
| Part | Implementation |
|---|---|
| Canvas | `<Canvas dpr={[1, 1.75]} frameloop="demand"|"always" gl={{ antialias: true, alpha: true }} camera={{ fov: 45, position: [0, 0, 6] }}>` — transparent bg so page tokens show through. |
| Node positions | ~1,400 points sampled on two offset ellipsoids (left/right hemispheres) with noise; generated once in `useMemo`. |
| Nodes | `THREE.Points` with custom `PointsMaterial` (size attenuation, additive blending), colour = accent, ~20% white highlight nodes. |
| Connections | For each node, link to 2 nearest neighbours within radius (computed once) → `LineSegments`, opacity 0.12. |
| Pulses | 24 small sprites interpolated along random connection paths in `useFrame`; colour accent → white. |
| Motion | Idle rotation `y += 0.08 rad/s`; pointer tilt lerped (0.06); breathing scale `1 + sin(t)*0.015`. |
| Light theme | Accent nodes on light bg, line opacity 0.18, no bloom. |
| Dark theme | Brighter nodes + optional `@react-three/postprocessing` Bloom **only if** bundle stays within budget (S priority). |

## Gating & performance (`HeroCanvas.tsx`)
```text
render 3D only if:
  !prefersReducedMotion
  && WebGL2 (or WebGL1) available
  && !(saveData || effectiveType in ['slow-2g','2g'])
otherwise → <HeroFallback/> (static SVG of the same node network)

load:
  const NeuralBrain = lazy(() => import('./NeuralBrain'))
  mount after requestIdleCallback (timeout 1500ms) → fade in 600ms

runtime:
  pause useFrame when IntersectionObserver says off-screen or document.hidden
  mobile (< 768px): 700 nodes, no pulses on low-end (hardwareConcurrency ≤ 4)
```

## Accessibility
- Canvas wrapper `aria-hidden="true"`; no information exists only in the scene.
- No flashing (> 3 flashes/s forbidden). Pulse brightness change is gradual.

## Other 3D touches (CSS, no WebGL)
- Card tilt + glare (projects, certificates).
- Certificate image does a **3D flip-in** (rotateY 90° → 0) when the detail opens.
- Shuffle deck uses perspective for depth.

## Stretch (v2, not in v1 scope)
- About page: skills as a 3D orbit/sphere of tags (drei `<Text>`), drag to rotate.
