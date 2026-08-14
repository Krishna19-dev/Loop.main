"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingRingData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  args: [number, number, number, number]; // radius, tube, radialSegments, tubularSegments
  color: string;
  speed: number;
  floatOffset: number;
}

// Single Floating Torus Ring Mesh
function FloatingRing({ data }: { data: FloatingRingData }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * data.speed + data.floatOffset;
    
    // Slow staggered rotation
    meshRef.current.rotation.x += data.speed * 0.005;
    meshRef.current.rotation.y += data.speed * 0.008;
    meshRef.current.rotation.z += data.speed * 0.003;

    // Gentle floating bobbing motion
    meshRef.current.position.y = data.position[1] + Math.sin(t) * 0.4;
    meshRef.current.position.x = data.position[0] + Math.cos(t * 0.8) * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      rotation={data.rotation}
      scale={data.scale}
    >
      <torusGeometry args={data.args} />
      <meshStandardMaterial
        color={data.color}
        roughness={0.25}
        metalness={0.6}
        emissive={data.color}
        emissiveIntensity={0.35}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

// Scene containing multiple floating rings & atmospheric fog
function FloatingRingsScene() {
  const rings = useMemo<FloatingRingData[]>(() => {
    return [
      {
        position: [-5.5, 2.5, -4],
        rotation: [0.5, 0.8, 0.2],
        scale: 1.4,
        args: [1.8, 0.08, 16, 32],
        color: "#E8C98F",
        speed: 0.6,
        floatOffset: 0,
      },
      {
        position: [6, -1.8, -3],
        rotation: [1.2, 0.3, 0.9],
        scale: 1.6,
        args: [2.0, 0.09, 16, 32],
        color: "#D4B478",
        speed: 0.5,
        floatOffset: 1.5,
      },
      {
        position: [-3, -2.5, -6],
        rotation: [0.2, 1.1, 0.5],
        scale: 1.1,
        args: [1.5, 0.07, 16, 32],
        color: "#2A5147",
        speed: 0.8,
        floatOffset: 3.0,
      },
      {
        position: [4.5, 3.2, -7],
        rotation: [0.8, 0.5, 1.4],
        scale: 1.3,
        args: [1.6, 0.08, 16, 32],
        color: "#E8C98F",
        speed: 0.7,
        floatOffset: 2.2,
      },
      {
        position: [-1, 3.8, -8],
        rotation: [1.5, 0.2, 0.7],
        scale: 1.8,
        args: [2.2, 0.1, 16, 32],
        color: "#2A5147",
        speed: 0.4,
        floatOffset: 4.1,
      },
      {
        position: [1.8, -3.5, -5],
        rotation: [0.6, 1.4, 0.3],
        scale: 1.0,
        args: [1.3, 0.06, 16, 32],
        color: "#D4B478",
        speed: 0.9,
        floatOffset: 0.8,
      },
      {
        position: [-6.8, -1.2, -9],
        rotation: [0.9, 0.4, 1.1],
        scale: 2.0,
        args: [2.5, 0.11, 16, 32],
        color: "#E8C98F",
        speed: 0.45,
        floatOffset: 5.0,
      },
      {
        position: [7.2, 1.5, -10],
        rotation: [0.3, 0.9, 0.6],
        scale: 2.2,
        args: [2.8, 0.12, 16, 32],
        color: "#2A5147",
        speed: 0.35,
        floatOffset: 2.8,
      },
    ];
  }, []);

  return (
    <>
      {/* Atmospheric Fog */}
      <fog attach="fog" args={["#0F3028", 5, 20]} />

      {/* Ambient & Directional Lights */}
      <ambientLight intensity={0.8} color="#1D463A" />
      <directionalLight position={[6, 8, 5]} intensity={2.0} color="#E8C98F" />
      <pointLight position={[-6, -6, -4]} intensity={1.2} color="#F9F6EF" />

      {/* Render Floating Rings */}
      {rings.map((ring, idx) => (
        <FloatingRing key={idx} data={ring} />
      ))}
    </>
  );
}

// Fallback gradient overlay for static loading or mobile viewports
export function HeroBackgroundFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E8C98F]/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#1D463A]/60 blur-3xl" />
    </div>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle Dark Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F3028]/60 via-[#0F3028]/80 to-[#0F3028] z-10 pointer-events-none" />

      {/* Mobile static fallback / Desktop 3D Canvas */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Suspense fallback={<HeroBackgroundFallback />}>
          <Canvas
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <FloatingRingsScene />
          </Canvas>
        </Suspense>
      </div>

      {/* Mobile Gradient Fallback */}
      <div className="block md:hidden absolute inset-0 z-0">
        <HeroBackgroundFallback />
      </div>
    </div>
  );
}
