'use client';

import dynamic from 'next/dynamic';
import OverlayPanel from '@/components/OverlayPanel';

// Dynamically import SceneCanvas to avoid SSR issues with Three.js
const SceneCanvas = dynamic(() => import('@/components/SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0b0f1c] to-[#161b2e]">
      <div className="text-white text-xl animate-pulse">Loading Blakeverse...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-gradient-to-br from-[#0b0f1c] to-[#161b2e]">
      {/* 3D Scene */}
      <SceneCanvas />

      {/* Overlay Panel */}
      <OverlayPanel />

      {/* UI Overlay - Instructions */}
      <div className="absolute top-8 left-8 z-10 text-white pointer-events-none">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Blakeverse v1
        </h1>
        <p className="text-gray-400 text-sm">Click the glowing shapes to explore</p>
      </div>
    </main>
  );
}
