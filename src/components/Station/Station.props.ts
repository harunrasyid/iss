import { RefObject } from "react";
import * as THREE from "three";

export interface IStationProps {
  orbitRef: RefObject<THREE.Object3D | null>;
  speed: number;
  radius: number;
  inclination: number;
}
