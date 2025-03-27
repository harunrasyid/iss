import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import { Earth, CameraManager, Station } from "@/components";
import { useCameraControl, useOrbit } from "@/hooks";
import { STARS } from "@/constants";
import { images } from "@/assets";

function App() {
  // Handle orbit movement
  const orbitData = useOrbit();

  // Handle camera control
  const cameraControl = useCameraControl();

  return (
    <div>
      <button
        className={"re-focus-button"}
        onClick={() => cameraControl.setUserControlled(false)}
      >
        <img src={images.icon} className={"re-focus-button-icon"} alt={"iss"} />
      </button>
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
        <Stars {...STARS} />

        {/* Earth */}
        <Earth />

        {/* Station */}
        <Station {...orbitData} />

        {/* Camera */}
        <CameraManager {...orbitData} {...cameraControl} />
      </Canvas>
    </div>
  );
}

export default App;
