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

// Single Floating Torus Ring Mesh with smooth physics-like float & rotation
function FloatingRing({ data }: { data: FloatingRingData }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * data.speed + data.floatOffset;
    
    // Slow staggered rotation
    meshRef.current.rotation.x += data.speed * 0.004;
    meshRef.current.rotation.y += data.speed * 0.006;
    meshRef.current.rotation.z += data.speed * 0.002;

    // Gentle floating bobbing motion
    meshRef.current.position.y = data.position[1] + Math.sin(t) * 0.35;
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
        metalness={0.65}
        emissive={data.color}
        emissiveIntensity={0.35}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// 3D Scene containing floating metallic rings & atmospheric fog (Ultra Lightweight & Optimized)
function FloatingRingsScene() {
  const rings = useMemo<FloatingRingData[]>(() => {
    return [
      {
        position: [-4.5, 2.0, -4],
        rotation: [0.5, 0.8, 0.2],
        scale: 0.7,
        args: [1.2, 0.04, 12, 24],
        color: "#E8C98F",
        speed: 0.4,
        floatOffset: 0,
      },
      {
        position: [4.8, -1.2, -3],
        rotation: [1.2, 0.3, 0.9],
        scale: 0.8,
        args: [1.4, 0.05, 12, 24],
        color: "#D4B478",
        speed: 0.35,
        floatOffset: 1.5,
      },
      {
        position: [-2.5, -2.0, -5],
        rotation: [0.2, 1.1, 0.5],
        scale: 0.6,
        args: [1.0, 0.04, 12, 24],
        color: "#2A5147",
        speed: 0.5,
        floatOffset: 3.0,
      },
      {
        position: [3.5, 2.5, -6],
        rotation: [0.8, 0.5, 1.4],
        scale: 0.65,
        args: [1.1, 0.04, 12, 24],
        color: "#E8C98F",
        speed: 0.45,
        floatOffset: 2.2,
      },
    ];
  }, []);

  return (
    <>
      {/* Atmospheric Fog for 3D depth */}
      <fog attach="fog" args={["#0F3028", 4, 20]} />

      {/* Ambient & Directional Lights */}
      <ambientLight intensity={0.9} color="#1D463A" />
      <directionalLight position={[5, 6, 4]} intensity={1.8} color="#E8C98F" />

      {/* Render Lightweight Floating Rings */}
      {rings.map((ring, idx) => (
        <FloatingRing key={idx} data={ring} />
      ))}
    </>
  );
}

// Animated Continuous Moving Grid & Laser Line Background Component
function AnimatedMovingGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      {/* Continuous Moving Grid Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E8C98F15_1px,transparent_1px),linear-gradient(to_bottom,#E8C98F15_1px,transparent_1px)] bg-[size:4rem_4rem] transform-gpu translate-z-0 animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, #000 70%, transparent 100%)",
        }}
      />

      {/* Continuously Sweeping Horizontal Laser Beam Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C98F]/60 to-transparent animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite] transform-gpu translate-z-0" />
      <div 
        className="absolute w-full h-32 bg-gradient-to-b from-[#E8C98F]/10 via-[#E8C98F]/5 to-transparent blur-md pointer-events-none transform-gpu translate-z-0"
        style={{
          animation: "moveLine 12s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes moveLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(600px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Fallback gradient overlay & glowing spheres
export function HeroBackgroundFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Hardware-accelerated GPU glowing ambient spheres */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-[#E8C98F]/10 blur-2xl transform-gpu translate-z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1D463A]/70 blur-2xl transform-gpu translate-z-0" />
      <div className="absolute top-[40%] right-[25%] w-72 h-72 rounded-full bg-[#2A5147]/40 blur-2xl transform-gpu translate-z-0" />
    </div>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay for optimal contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F3028]/40 via-[#0F3028]/70 to-[#0F3028] z-10 pointer-events-none" />

      {/* Layer 1: Continuous Moving Cyber Grid & Laser Scan Lines */}
      <AnimatedMovingGrid />

      {/* Layer 2: Ultra-smooth Lightweight Three.js 3D WebGL Floating Objects */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<HeroBackgroundFallback />}>
          <Canvas
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
            dpr={1}
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ background: "transparent", width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <FloatingRingsScene />
          </Canvas>
        </Suspense>
      </div>



      {/* Layer 3: Ambient Lighting Spheres Fallback */}
      <HeroBackgroundFallback />
    </div>
  );
}
