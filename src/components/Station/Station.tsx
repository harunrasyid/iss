import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF, Line } from "@react-three/drei";
import { Vector3, Matrix4, Quaternion } from "three";
import { useFrame } from "@react-three/fiber";
import { IStationProps } from "./Station.props.ts";

export const Station = ({
  orbitRef,
  speed,
  radius,
  inclination,
}: IStationProps) => {
  const { scene } = useGLTF("/station.glb");

  const orbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 360;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(t);
      const y = radius * Math.sin(t) * Math.sin(inclination);
      const z = radius * Math.sin(t) * Math.cos(inclination);
      points.push(new THREE.Vector3(x, y, z));
    }

    return points;
  }, [radius, inclination]);

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      const t = clock.getElapsedTime() * speed;

      // Current orbital position
      const x = radius * Math.cos(t);
      const y = radius * Math.sin(t) * Math.sin(inclination);
      const z = radius * Math.sin(t) * Math.cos(inclination);

      // Future position to calculate velocity
      const deltaT = 0.01;
      const nextX = radius * Math.cos(t + deltaT);
      const nextY = radius * Math.sin(t + deltaT) * Math.sin(inclination);
      const nextZ = radius * Math.sin(t + deltaT) * Math.cos(inclination);

      // Compute direction vectors
      const position = new Vector3(x, y, z);
      const nextPosition = new Vector3(nextX, nextY, nextZ);
      const velocity = nextPosition.clone().sub(position).normalize(); // Travel direction
      const down = position.clone().negate().normalize(); // Earth-facing direction
      const right = down.clone().cross(velocity).normalize(); // Perpendicular right vector
      const correctedUp = velocity.clone().cross(right).normalize(); // Ensure perpendicular vectors

      // Create rotation quaternion (avoids scale issues)
      const quaternion = new Quaternion();
      quaternion.setFromRotationMatrix(
        new Matrix4().makeBasis(right, correctedUp, velocity)
      );

      // Apply transformations
      orbitRef.current.position.set(x, y, z);
      orbitRef.current.quaternion.copy(quaternion); // Apply rotation without messing up scale
    }
  });

  return (
    <>
      <group ref={orbitRef} scale={[0.001, 0.001, 0.001]}>
        <primitive object={scene} />
      </group>

      {/* Orbit path */}
      <Line points={orbitPoints} color="yellow" lineWidth={1} dashed={false} />
    </>
  );
};
