'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Lights from './Lights';
import FloatingNode from './FloatingNode';

export default function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      className="w-full h-full"
    >
      {/* Fog for depth */}
      <fog attach="fog" args={['#0b0f1c', 5, 25]} />

      {/* Starry background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Lights */}
      <Lights />

      {/* Floating 3D nodes */}
      <FloatingNode name="Music" position={[-3, 2, 0]} color="#3b82f6" geometry="sphere" />
      <FloatingNode name="Projects" position={[3, 1, -2]} color="#f59e0b" geometry="box" />
      <FloatingNode name="Travel" position={[0, -2, -1]} color="#a855f7" geometry="torusKnot" />
      <FloatingNode name="About" position={[-2, -1, 2]} color="#06b6d4" geometry="icosahedron" />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
      </EffectComposer>

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
