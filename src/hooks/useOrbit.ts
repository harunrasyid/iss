import { useRef } from "react";
import * as THREE from "three";
import {
  EARTH_RADIUS,
  ISS_ORBIT_DURATION,
  ISS_ORBIT_HEIGHT,
  ISS_ORBIT_INCLINATION,
} from "@/constants";

export function useOrbit() {
  // Ref for orbiting object
  const orbitRef = useRef<THREE.Object3D | null>(null);

  const speed = (2 * Math.PI) / ISS_ORBIT_DURATION; // ISS orbit duration in radian

  const radius = EARTH_RADIUS * ISS_ORBIT_HEIGHT; // ISS orbit radius

  const inclination = (ISS_ORBIT_INCLINATION * Math.PI) / 180; // ISS orbit inclination

  return {
    orbitRef,
    speed,
    radius,
    inclination,
  };
}
