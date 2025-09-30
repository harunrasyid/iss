import { useEffect, useRef, useState } from "react";
import { IPosition, PositionResponseType } from "@/types/iss.type";

// Linear interpolation between two values
const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

// Easing function for smoother motion (ease-in-out)
const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function useAnimation(data: PositionResponseType | undefined) {
  const prevPosRef = useRef<IPosition | null>(null);
  const lastPosRef = useRef<IPosition | null>(null);
  const [interpolatedPos, setInterpolatedPos] = useState<
    [number, number] | null
  >(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (data) {
      prevPosRef.current = lastPosRef.current;
      lastPosRef.current = {
        lng: Number(data.iss_position.longitude),
        lat: Number(data.iss_position.latitude),
        timestamp: Date.now(),
      };
    }
  }, [data]);

  // Animation loop for smooth interpolation
  useEffect(() => {
    const animate = () => {
      if (prevPosRef.current && lastPosRef.current) {
        const now = Date.now();
        const elapsed = now - lastPosRef.current.timestamp;
        const duration = 5000; // 5 seconds between updates

        // Calculate progress (0 to 1)
        let progress = Math.min(elapsed / duration, 1);

        // Apply easing for smoother motion
        progress = easeInOutCubic(progress);

        // Interpolate between previous and current position
        const lng = lerp(
          prevPosRef.current.lng,
          lastPosRef.current.lng,
          progress
        );
        const lat = lerp(
          prevPosRef.current.lat,
          lastPosRef.current.lat,
          progress
        );

        setInterpolatedPos([lng, lat]);
      } else if (lastPosRef.current) {
        // If no previous position, just use the current one
        setInterpolatedPos([lastPosRef.current.lng, lastPosRef.current.lat]);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data]);

  return {
    interpolatedPos,
    prevPosRef,
  };
}
