import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  MathUtils,
  NormalBlending,
  ShaderMaterial,
  Vector3,
  type Group,
} from 'three';
import { buildBrainNetwork } from './network';
import { pointFragmentShader, pointVertexShader } from './shaders';

export interface PointerState {
  /** Normalised device coords over the scene container (−1…1). */
  x: number;
  y: number;
  inside: boolean;
}

export interface SceneColors {
  node: [number, number, number];
  glow: [number, number, number];
  pulse: [number, number, number];
  dark: boolean;
}

interface NeuralBrainProps {
  nodeCount: number;
  pulseCount: number;
  colors: SceneColors;
  pointer: MutableRefObject<PointerState>;
  /** Incremented on every click; a change fires a ripple. */
  ripple: MutableRefObject<number>;
}

const SPIN_SPEED = 0.08; // rad/s
const MAX_TILT = 0.25; // rad
const TILT_EASE = 0.06;

function pointMaterial(size: number) {
  return new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: 1 },
      uPointer: { value: new Vector3(99, 99, 99) },
      uPointerStrength: { value: 0 },
      uRippleTime: { value: -100 },
      uColor: { value: new Color() },
      uGlowColor: { value: new Color() },
      uOpacity: { value: 1 },
    },
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    transparent: true,
    depthWrite: false,
  });
}

export function NeuralBrain({ nodeCount, pulseCount, colors, pointer, ripple }: NeuralBrainProps) {
  const tiltRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const network = useMemo(() => buildBrainNetwork(nodeCount), [nodeCount]);

  const nodeGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(network.positions, 3));
    geometry.setAttribute('aSeed', new BufferAttribute(network.seeds, 1));
    geometry.setAttribute('aBright', new BufferAttribute(network.bright, 1));
    return geometry;
  }, [network]);

  const lineGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(network.positions, 3));
    geometry.setIndex(new BufferAttribute(network.edges, 1));
    return geometry;
  }, [network]);

  // Pulses: small bright points that travel edge to edge across the network
  const pulses = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(pulseCount * 3), 3));
    geometry.setAttribute('aSeed', new BufferAttribute(new Float32Array(pulseCount).fill(0.25), 1));
    geometry.setAttribute('aBright', new BufferAttribute(new Float32Array(pulseCount).fill(1), 1));
    const state = Array.from({ length: pulseCount }, (_, i) => {
      const from = (i * 97) % network.count;
      const to = network.adjacency[from]?.[0] ?? from;
      return { from, to, t: (i / pulseCount) % 1, speed: 0.6 + ((i * 37) % 10) / 12 };
    });
    return { geometry, state };
  }, [network, pulseCount]);

  const nodeMaterial = useMemo(() => pointMaterial(7), []);
  const pulseMaterial = useMemo(() => pointMaterial(11), []);
  const lineMaterial = useMemo(
    () => new LineBasicMaterial({ transparent: true, depthWrite: false }),
    [],
  );

  // Theme: colours, blending (additive glows on dark, normal on light) and line opacity
  useEffect(() => {
    const blending = colors.dark ? AdditiveBlending : NormalBlending;
    for (const material of [nodeMaterial, pulseMaterial]) {
      material.uniforms.uColor!.value.setRGB(...colors.node);
      material.uniforms.uGlowColor!.value.setRGB(...colors.glow);
      material.blending = blending;
      material.needsUpdate = true;
    }
    pulseMaterial.uniforms.uColor!.value.setRGB(...colors.pulse);
    lineMaterial.color.setRGB(...colors.node);
    lineMaterial.opacity = colors.dark ? 0.22 : 0.18;
    lineMaterial.blending = blending;
    lineMaterial.needsUpdate = true;
  }, [colors, nodeMaterial, pulseMaterial, lineMaterial]);

  useEffect(
    () => () => {
      for (const disposable of [nodeGeometry, lineGeometry, pulses.geometry, nodeMaterial, pulseMaterial, lineMaterial]) {
        disposable.dispose();
      }
    },
    [nodeGeometry, lineGeometry, pulses.geometry, nodeMaterial, pulseMaterial, lineMaterial],
  );

  const scratch = useMemo(
    () => ({ ray: new Vector3(), world: new Vector3(), lastRipple: ripple.current }),
    [ripple],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const { camera } = state;
    const p = pointer.current;

    // Pointer → point on the z = 0 plane in world space
    scratch.ray.set(p.x, p.y, 0.5).unproject(camera).sub(camera.position).normalize();
    scratch.world.copy(camera.position).addScaledVector(scratch.ray, -camera.position.z / scratch.ray.z);

    if (ripple.current !== scratch.lastRipple) {
      scratch.lastRipple = ripple.current;
      nodeMaterial.uniforms.uRippleTime!.value = time;
      pulseMaterial.uniforms.uRippleTime!.value = time;
    }

    for (const material of [nodeMaterial, pulseMaterial]) {
      const u = material.uniforms;
      u.uTime!.value = time;
      u.uPixelRatio!.value = state.gl.getPixelRatio();
      u.uPointer!.value.copy(scratch.world);
      u.uPointerStrength!.value = MathUtils.lerp(u.uPointerStrength!.value, p.inside ? 1 : 0, 0.08);
    }

    const spin = spinRef.current;
    const tilt = tiltRef.current;
    if (spin && tilt) {
      spin.rotation.y += delta * SPIN_SPEED;
      spin.scale.setScalar(1 + Math.sin(time) * 0.015);
      const targetX = p.inside ? -p.y * MAX_TILT : 0;
      const targetY = p.inside ? p.x * MAX_TILT : 0;
      tilt.rotation.x = MathUtils.lerp(tilt.rotation.x, targetX, TILT_EASE);
      tilt.rotation.y = MathUtils.lerp(tilt.rotation.y, targetY, TILT_EASE);
    }

    // Advance pulses; at the end of an edge, continue onto a random neighbouring edge
    if (pulseCount > 0) {
      const positions = pulses.geometry.attributes.position as BufferAttribute;
      const pos = network.positions;
      pulses.state.forEach((pulse, i) => {
        pulse.t += delta * pulse.speed;
        if (pulse.t >= 1) {
          const options = network.adjacency[pulse.to] ?? [];
          const next = options[Math.floor(Math.random() * options.length)] ?? pulse.from;
          pulse.from = pulse.to;
          pulse.to = next;
          pulse.t = 0;
        }
        const a = pulse.from * 3;
        const b = pulse.to * 3;
        positions.setXYZ(
          i,
          pos[a]! + (pos[b]! - pos[a]!) * pulse.t,
          pos[a + 1]! + (pos[b + 1]! - pos[a + 1]!) * pulse.t,
          pos[a + 2]! + (pos[b + 2]! - pos[a + 2]!) * pulse.t,
        );
      });
      positions.needsUpdate = true;
    }
  });

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <lineSegments geometry={lineGeometry} material={lineMaterial} />
        <points geometry={nodeGeometry} material={nodeMaterial} />
        {pulseCount > 0 && <points geometry={pulses.geometry} material={pulseMaterial} />}
      </group>
    </group>
  );
}
