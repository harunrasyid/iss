import { useState } from "react";

export function useCameraControl() {
  const [isUserControlled, setUserControlled] = useState<boolean>(false);

  return {
    isUserControlled,
    setUserControlled,
  };
}
