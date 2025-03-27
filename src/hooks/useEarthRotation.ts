import { RefObject } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export function useEarthRotation(ref: RefObject<Mesh | null>) {
  useFrame(({ clock }) => {
    if (ref.current) {
      const earthRotationSpeed = (2 * Math.PI) / (23.93 * 3600); // ~7.29e-5 rad/s
      ref.current.rotation.y = -clock.getElapsedTime() * earthRotationSpeed; // Negative for west-to-east rotation
    }
  });

  return { ref };
}
