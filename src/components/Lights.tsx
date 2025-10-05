'use client';

export default function Lights() {
  return (
    <>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />

      {/* Main directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Point lights for atmospheric glow */}
      <pointLight position={[-10, -10, -5]} color="#4f46e5" intensity={2} />
      <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1.5} />
      <pointLight position={[0, -5, 5]} color="#a855f7" intensity={1} />
    </>
  );
}
