import { RefObject } from "react";

export interface ICameraProps {
  orbitRef: RefObject<any | null>;
  speed: number;
  radius: number;
  inclination: number;
}
