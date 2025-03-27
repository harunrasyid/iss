import { useRef } from "react";
import { Mesh } from "three";
import { Sphere, useTexture } from "@react-three/drei";
import { images } from "@/assets";
import { useFrame } from "@react-three/fiber";

export const Earth = () => {
  const texture = useTexture(images.earthTexture);
  const earthRef = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      const earthRotationSpeed = (2 * Math.PI) / (23.93 * 3600); // ~7.29e-5 rad/s
      earthRef.current.rotation.y =
        -clock.getElapsedTime() * earthRotationSpeed; // Negative for west-to-east rotation
    }
  });

  return (
    <Sphere ref={earthRef} args={[8, 80, 80]} position={[0, 0, 0]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};
