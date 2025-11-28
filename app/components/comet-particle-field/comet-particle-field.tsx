import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 1000;
const CLUSTER_COUNT = 2000;
const DEPTH = 5000;
const CAMERA_FOV = 120;
const CAMERA_Z_START_POSITION = -10000;

const COMET_SIZE = 40;
const PARTICLE_SIZE = 6;
const CLUSTER_PARTICLE_SIZE = 7;

const FADE_SPEED_MIN = 0.5;
const FADE_SPEED_MAX = 1.0;

const DRIFT_MAX = 0.02;
const VELOCITY_MAX = 0.25;

const CLUSTER_OFFSET_MIN = 5000;
const CLUSTER_OFFSET_VARIATION = 50;

const CLUSTER_SPEED_MIN = 0.0005;
const CLUSTER_SPEED_VARIATION = 0.0005;

const COLOR_HEX = "#e6116c";
const BACKGROUND_COLOR = 0x050303;

interface ParticleData {
  basePos: THREE.Vector3;
  driftX: number;
  driftY: number;
  driftZ: number;
  fadeOffset: number;
  fadeSpeed: number;
  isComet: boolean;
  velocity: THREE.Vector3;
}

interface ClusterData {
  offset: THREE.Vector3;
  parent: THREE.Points;
  angle: number;
  speed: number;
}

export function randomSpherePoint(radius: number): THREE.Vector3 {
  radius *= 3;
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2 * Math.PI;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.random();
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
}

export function createPointMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(COLOR_HEX) } },
    vertexShader: `
      attribute float size;
      attribute float opacity;
      varying float vOpacity;
      void main() {
        vOpacity = opacity;
        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vOpacity;
      uniform vec3 uColor;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float d = length(coord);
        float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
}

export function createCometMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(COLOR_HEX) } },
    vertexShader: `
      attribute float size;
      attribute float opacity;
      varying float vOpacity;
      void main() {
        vOpacity = opacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vOpacity;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float d = length(coord);
        float core = smoothstep(0.1, 0.0, d);
        float glow = smoothstep(0.35, 0.1, d);
        float alpha = (core + glow * 0.1) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
}

export function createParticle(
  pos: THREE.Vector3,
  isLarge: boolean,
  pointMat: THREE.ShaderMaterial,
  cometMat: THREE.ShaderMaterial
): THREE.Points {
  const size = isLarge ? COMET_SIZE : PARTICLE_SIZE;
  const fadeSpeed =
    FADE_SPEED_MIN + Math.random() * (FADE_SPEED_MAX - FADE_SPEED_MIN);
  const material = isLarge ? cometMat.clone() : pointMat.clone();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([pos.x, pos.y, pos.z]), 3)
  );
  geometry.setAttribute(
    "size",
    new THREE.BufferAttribute(new Float32Array([size]), 1)
  );
  geometry.setAttribute(
    "opacity",
    new THREE.BufferAttribute(new Float32Array([Math.random()]), 1)
  );

  const particle = new THREE.Points(geometry, material);
  particle.userData = {
    basePos: pos.clone(),
    driftX: (Math.random() - 0.5) * DRIFT_MAX,
    driftY: (Math.random() - 0.5) * DRIFT_MAX,
    driftZ: (Math.random() - 0.5) * DRIFT_MAX,
    fadeOffset: Math.random() * 1000,
    fadeSpeed,
    isComet: isLarge,
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * VELOCITY_MAX,
      (Math.random() - 0.5) * VELOCITY_MAX,
      (Math.random() - 0.5) * VELOCITY_MAX
    ),
  } as ParticleData;

  return particle;
}

export function createCluster(
  parent: THREE.Points,
  pointMat: THREE.ShaderMaterial
): THREE.Points[] {
  const cluster: THREE.Points[] = [];
  for (let j = 0; j < 3; j++) {
    const offset = randomSpherePoint(
      CLUSTER_OFFSET_MIN + Math.random() * CLUSTER_OFFSET_VARIATION
    );

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          parent.position.x + offset.x,
          parent.position.y + offset.y,
          parent.position.z + offset.z,
        ]),
        3
      )
    );
    geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(new Float32Array([CLUSTER_PARTICLE_SIZE]), 1)
    );
    geometry.setAttribute(
      "opacity",
      new THREE.BufferAttribute(new Float32Array([0.8]), 1)
    );

    const clusterParticle = new THREE.Points(geometry, pointMat.clone());
    clusterParticle.userData = {
      offset,
      parent,
      angle: Math.random() * Math.PI * 2,
      speed: CLUSTER_SPEED_MIN + Math.random() * CLUSTER_SPEED_VARIATION,
    } as ClusterData;

    cluster.push(clusterParticle);
  }
  return cluster;
}

const CometParticleField = ({
  style,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      0.01,
      DEPTH
    );
    cameraRef.current = camera;
    camera.position.z = CAMERA_Z_START_POSITION;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    const particles: THREE.Points[] = [];
    const clusters: THREE.Points[][] = [];
    const mouse = { x: 0, y: 0 };

    const pointMat = createPointMaterial();
    const cometMat = createCometMaterial();

    for (let i = 0; i < COUNT; i++) {
      const pos = randomSpherePoint(DEPTH);
      const isLarge = Math.random() < 0.1;
      const particle = createParticle(pos, isLarge, pointMat, cometMat);
      particles.push(particle);
      scene.add(particle);
    }

    for (let i = 0; i < CLUSTER_COUNT; i++) {
      const parent = particles[Math.floor(Math.random() * COUNT)];
      const cluster = createCluster(parent, pointMat);
      cluster.forEach((c) => scene.add(c));
      clusters.push(cluster);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      if (!cameraRef.current) return;
      const yOffset = -window.scrollY;
      const z = -DEPTH - (yOffset ? yOffset * 2.5 : 0);
      const elementTop =
        mountRef.current?.parentElement?.parentElement?.getBoundingClientRect()
          .top! + window.scrollY;
      console.log(elementTop);
      console.log("z", z);
      if (z < 1000) {
        cameraRef.current.position.z = 1000;
        return;
      }
      console.log("changing?");
      cameraRef.current.position.z = z ?? CAMERA_Z_START_POSITION;
    };
    window.addEventListener("scroll", onScroll);

    const animate = () => {
      // requestAnimationFrame(animate);
      const tSec = performance.now() * 0.001;

      particles.forEach((p) => {
        const pos = p.geometry.attributes.position.array as Float32Array;
        const data = p.userData as ParticleData;

        // if (data.isComet) {
        //   pos[0] += data.velocity.x;
        //   pos[1] += data.velocity.y;
        //   pos[2] += data.velocity.z;
        // } else {
        //   data.driftX += (Math.random() - 0.5) * DRIFT_VARIATION;
        //   data.driftY += (Math.random() - 0.5) * DRIFT_VARIATION;
        //   data.driftZ += (Math.random() - 0.5) * DRIFT_VARIATION;
        //   data.driftX = THREE.MathUtils.clamp(
        //     data.driftX,
        //     -DRIFT_MAX,
        //     DRIFT_MAX
        //   );
        //   data.driftY = THREE.MathUtils.clamp(
        //     data.driftY,
        //     -DRIFT_MAX,
        //     DRIFT_MAX
        //   );
        //   data.driftZ = THREE.MathUtils.clamp(
        //     data.driftZ,
        //     -DRIFT_MAX,
        //     DRIFT_MAX
        //   );
        //   pos[0] += data.driftX;
        //   pos[1] += data.driftY;
        //   pos[2] += data.driftZ;
        // }

        // if (
        //   pos[2] < camera.position.z - 2500 ||
        //   pos[2] > camera.position.z + 2500 ||
        //   Math.abs(pos[0] - camera.position.x) > BOUNDS ||
        //   Math.abs(pos[1] - camera.position.y) > BOUNDS
        // ) {
        //   const newPos = randomSpherePoint(DEPTH);
        //   pos[0] = newPos.x;
        //   pos[1] = newPos.y;
        //   pos[2] = newPos.z;
        //   data.driftX = (Math.random() - 0.5) * DRIFT_MAX;
        //   data.driftY = (Math.random() - 0.5) * DRIFT_MAX;
        //   data.driftZ = (Math.random() - 0.5) * DRIFT_MAX;
        //   p.geometry.attributes.opacity.array[0] = 0.0;
        // }

        const opacity =
          (Math.sin((tSec + data.fadeOffset) * data.fadeSpeed) + 1) / 2;
        p.geometry.attributes.opacity.array[0] = THREE.MathUtils.clamp(
          0.3 + opacity * 0.9,
          0,
          1
        );
        p.geometry.attributes.opacity.needsUpdate = true;

        const particlePos = new THREE.Vector3(pos[0], pos[1], pos[2]);
        const distance = particlePos.distanceTo(camera.position);
        const distanceFactor =
          1 - THREE.MathUtils.clamp(distance / DEPTH, 0, 1);
        const baseSize = data.isComet ? COMET_SIZE : PARTICLE_SIZE;
        p.geometry.attributes.size.array[0] =
          baseSize * (1.5 + distanceFactor * 3.5);
        p.geometry.attributes.size.needsUpdate = true;
        p.geometry.attributes.position.needsUpdate = true;
      });

      clusters.forEach((cluster) => {
        cluster.forEach((c) => {
          const data = c.userData as ClusterData;
          data.angle += data.speed;
          const px = (
            data.parent.geometry.attributes.position.array as Float32Array
          )[0];
          const py = (
            data.parent.geometry.attributes.position.array as Float32Array
          )[1];
          const pz = (
            data.parent.geometry.attributes.position.array as Float32Array
          )[2];
          const x =
            px +
            Math.cos(data.angle) * data.offset.x -
            Math.sin(data.angle) * data.offset.y;
          const y =
            py +
            Math.sin(data.angle) * data.offset.x +
            Math.cos(data.angle) * data.offset.y;
          const z = pz + data.offset.z;
          const pos = c.geometry.attributes.position.array as Float32Array;
          pos[0] = x;
          pos[1] = y;
          pos[2] = z;
          c.geometry.attributes.position.needsUpdate = true;
        });
      });

      const lerpFactor = 0.05;
      const targetRotationX = mouse.y * 0.25;
      const targetRotationY = mouse.x * 0.25;
      scene.rotation.x += (targetRotationX - scene.rotation.x) * lerpFactor;
      scene.rotation.y += (targetRotationY - scene.rotation.y) * lerpFactor;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      renderer.setClearColor(BACKGROUND_COLOR, 1);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100vw", height: "100vh", ...style }} />
  );
};

export default CometParticleField;
