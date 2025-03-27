import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import { Earth, CameraManager, Station } from "@/components";

function App() {
  const orbitRef = useRef<THREE.Object3D | null>(null);
  const speed = (2 * Math.PI) / (92 * 60); // ISS completes orbit in 92 min
  const radius = 8 * 1.05; // ISS is ~420 km above Earth (~1.05 Earth radius)
  const inclination = (51.6 * Math.PI) / 180; // Convert degrees to radians

  return (
    <Canvas
      camera={{ position: [5, 5, 5] }}
      scene={{ background: new THREE.Color("black") }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* Ambient Star */}
      <Stars
        radius={300}
        depth={50}
        count={5000}
        factor={5}
        saturation={0}
        fade
      />

      {/* Earth */}
      <Earth />

      {/* Station */}
      <Station
        orbitRef={orbitRef}
        speed={speed}
        radius={radius}
        inclination={inclination}
      />

      {/* Camera */}
      <CameraManager
        orbitRef={orbitRef}
        speed={speed}
        radius={radius}
        inclination={inclination}
      />
    </Canvas>
  );
}

export default App;
