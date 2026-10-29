// Node / pulse point shaders for the neural brain (docs/04-design/3d-scene.md).
// Per-node work (pointer glow, push, click ripple, twinkle) runs on the GPU.

export const pointVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uRippleTime;

  attribute float aSeed;
  attribute float aBright;

  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);

    // Nodes near the pointer brighten and drift slightly away from it
    float d = distance(world.xyz, uPointer);
    float near = (1.0 - smoothstep(0.0, 1.4, d)) * uPointerStrength;
    world.xyz += normalize(world.xyz - uPointer + 1e-4) * near * 0.18;

    // Click ripple: a shell expanding from the centre that fades out
    float age = uTime - uRippleTime;
    float shell = (1.0 - smoothstep(0.0, 0.35, abs(length(world.xyz) - age * 3.2)))
                * (1.0 - smoothstep(0.0, 1.6, age));

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 6.2831);
    vGlow = clamp(near + shell, 0.0, 1.0);
    vAlpha = mix(0.55, 1.0, aBright) * twinkle;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 + aBright * 0.8 + vGlow * 1.4) * uPixelRatio * (6.0 / -mv.z);
  }
`;

export const pointFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  uniform float uOpacity;

  varying float vAlpha;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = 1.0 - smoothstep(0.15, 0.5, d);
    vec3 color = mix(uColor, uGlowColor, vGlow * 0.6);
    gl_FragColor = vec4(color, soft * vAlpha * uOpacity);
  }
`;
