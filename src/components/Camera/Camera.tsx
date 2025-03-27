import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WebGLRenderer, Camera, Vector3 } from "three";
import { ICameraProps } from "./Camera.props";

export const CameraManager = ({
  orbitRef,
  speed,
  radius,
  inclination,
  isUserControlled,
  setUserControlled,
}: ICameraProps) => {
  const { camera, gl } = useThree<{
    camera: Camera;
    gl: WebGLRenderer;
  }>();

  const handleControlStart = () => setUserControlled(true);

  useFrame(({ clock }) => {
    if (!orbitRef.current || isUserControlled) return;

    const t = clock.getElapsedTime() * speed;
    const distanceFromStation = 0.5; // Fixed distance behind the station

    // Compute station position
    const stationX = Math.cos(t) * radius;
    const stationY = Math.sin(t) * Math.sin(inclination) * radius;
    const stationZ = Math.sin(t) * Math.cos(inclination) * radius;

    // Direction vector from Earth to station
    const stationPos = new Vector3(stationX, stationY, stationZ);
    const direction = stationPos.clone().normalize(); // Normalize to unit vector

    // Compute camera position (maintaining fixed distance behind station)
    const cameraPos = stationPos
      .clone()
      .addScaledVector(direction, distanceFromStation);
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

    // Make camera always look at the station
    camera.lookAt(stationX, stationY, stationZ);
  });

  return (
    <OrbitControls
      // @ts-expect-error: todo
      args={[camera, gl.domElement]}
      onStart={handleControlStart}
    />
  );
};
