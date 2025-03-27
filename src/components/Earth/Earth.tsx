import { useRef } from "react";
import { Mesh } from "three";
import { Sphere, useTexture } from "@react-three/drei";
import { images } from "@/assets";
import { EARTH_RADIUS } from "@/constants";
import { useEarthRotation } from "@/hooks";

export const Earth = () => {
  const texture = useTexture(images.earthTexture);
  const earthRef = useRef<Mesh | null>(null);

  useEarthRotation(earthRef);

  return (
    <Sphere ref={earthRef} args={[EARTH_RADIUS, 30, 30]} position={[0, 0, 0]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};
