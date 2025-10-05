'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, useCursor } from '@react-three/drei';
import { Mesh } from 'three';
import { useAppStore } from '@/store/useAppStore';

interface FloatingNodeProps {
  name: string;
  position: [number, number, number];
  color: string;
  geometry: 'sphere' | 'box' | 'torusKnot' | 'icosahedron';
}

export default function FloatingNode({ name, position, color, geometry }: FloatingNodeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setActiveNode = useAppStore((state) => state.setActiveNode);

  useCursor(hovered);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const handleClick = () => {
    setActiveNode(name);
  };

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      {renderGeometry()}
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        distort={0.3}
        speed={2}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}
