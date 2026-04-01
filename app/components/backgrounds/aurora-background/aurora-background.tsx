import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

const DEFAULT_GLOW = "#e0234e";
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const parseColor = (hex: string): number[] => {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
};

const parseColorStops = (stops: string[]): number[][] =>
  stops.map((hex) => {
    const c = new Color(hex);
    return [c.r, c.g, c.b];
  });

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStopsA[3];
uniform vec3 uColorStopsB[3];
uniform float uPaletteMix;
uniform vec2 uResolution;
uniform float uBlend;
uniform vec2 uMouse;
uniform vec3 uGlowColor;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  vec3 c0 = mix(uColorStopsA[0], uColorStopsB[0], uPaletteMix);
  vec3 c1 = mix(uColorStopsA[1], uColorStopsB[1], uPaletteMix);
  vec3 c2 = mix(uColorStopsA[2], uColorStopsB[2], uPaletteMix);

  ColorStop colors[3];
  colors[0] = ColorStop(c0, 0.0);
  colors[1] = ColorStop(c1, 0.5);
  colors[2] = ColorStop(c2, 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 3.5 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;

  // Cursor effect (glow) — works even if auroraAlpha is zero
  vec2 mouseUV = uMouse / uResolution;
  float dist = distance(uv, mouseUV);
  float cursorEffect = smoothstep(0.6, 0.0, dist);

  vec3 finalColor = mix(auroraColor, uGlowColor, cursorEffect * 0.3); 
  float finalAlpha = max(auroraAlpha, cursorEffect * 0.5);

  fragColor = vec4(finalColor, finalAlpha);
}
`;

interface AuroraProps {
  transitionColorStops?: {
    desktop: string[];
    mobile: string[];
  };
  glowColor?: string;
  amplitude?: number;
  blend?: number;
  speed?: number;
  time?: number;
  onReady?: () => void;
}

export default function Aurora(props: AuroraProps) {
  const { amplitude = 1.0, blend = 0.5 } = props;

  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const defaultA =
    typeof window !== "undefined" && window.innerWidth > 1024
      ? ["#780f20", "#050303", "#5a0b18"]
      : ["#780f20", "#510712", "#5a0b18"];

  const defaultB = props.transitionColorStops
    ? typeof window !== "undefined" && window.innerWidth > 1024
      ? props.transitionColorStops.desktop
      : props.transitionColorStops.mobile
    : defaultA;

  const parsedARef = useRef<number[][]>(parseColorStops(defaultA));
  const parsedBRef = useRef<number[][]>(parseColorStops(defaultB!));
  const glowARef = useRef<number[]>(parseColor(DEFAULT_GLOW));
  const glowBRef = useRef<number[]>(
    parseColor(props.glowColor ?? DEFAULT_GLOW),
  );

  const paletteMix = useRef(0);
  const paletteStart = useRef<number | null>(null);

  useEffect(() => {
    parsedARef.current = parseColorStops(defaultA);
    parsedBRef.current = parseColorStops(defaultB!);
  }, [defaultA, defaultB]);

  useEffect(() => {
    glowBRef.current = parseColor(props.glowColor ?? DEFAULT_GLOW);
  }, [props.glowColor]);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" },
    );

    observer.observe(ctn);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn || !isVisible) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program: Program | undefined;

    function resize() {
      if (!ctn) return;
      const width = Math.max(ctn.offsetWidth, 800);
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);

      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }

    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStopsA: { value: parsedARef.current },
        uColorStopsB: { value: parsedBRef.current },
        uPaletteMix: { value: 0 },
        uGlowColor: { value: glowARef.current },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uMouse: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = rect.height - (e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let raf = 0;

    const update = (t: number) => {
      raf = requestAnimationFrame(update);

      if (paletteStart.current === null) paletteStart.current = t;

      const duration = 3000;
      paletteMix.current = Math.min((t - paletteStart.current) / duration, 1);

      const { time = t * 0.01, speed = 1.0 } = propsRef.current;

      if (!program) return;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;

      const mix = paletteMix.current;

      const glow = [
        glowARef.current[0] * (1 - mix) + glowBRef.current[0] * mix,
        glowARef.current[1] * (1 - mix) + glowBRef.current[1] * mix,
        glowARef.current[2] * (1 - mix) + glowBRef.current[2] * mix,
      ];

      program.uniforms.uGlowColor.value = glow;
      program.uniforms.uPaletteMix.value = paletteMix.current;

      program.uniforms.uColorStopsA.value = parsedARef.current;
      program.uniforms.uColorStopsB.value = parsedBRef.current;

      program.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];

      renderer.render({ scene: mesh });
    };

    raf = requestAnimationFrame(update);

    resize();
    props.onReady?.();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [isVisible]);

  return <div ref={ctnDom} className="w-full h-full absolute" />;
}
