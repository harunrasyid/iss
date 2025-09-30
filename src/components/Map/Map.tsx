import { useEffect } from "react";
import { ScatterplotLayer, ScenegraphLayer } from "deck.gl";
import { useMap } from "./hooks/useMap";
import { useAnimation } from "@/hooks/useAnimation";
import { useData } from "@/hooks/useData";
import { images } from "@/assets";

const MODEL_URL = "/station-compressed.glb";

export const Map = () => {
  const { mapContainer, mapRef, overlayRef } = useMap();
  const { data } = useData();
  const { interpolatedPos, prevPosRef } = useAnimation(data);

  useEffect(() => {
    if (
      mapContainer.current &&
      mapRef.current &&
      overlayRef.current &&
      interpolatedPos
    ) {
      const vehicleLayer = new ScenegraphLayer({
        id: "iss-scenegraph",
        data: [
          {
            position: interpolatedPos,
          },
        ],
        scenegraph: MODEL_URL,
        getPosition: (d: { position: [number, number] }) => [
          d.position[0],
          d.position[1],
          1000,
        ],
        getOrientation: () => [0, 0, 90],
        getScale: [100, 100, 100],
        sizeScale: 15,
        pickable: true,
      });

      const haloLayer = new ScatterplotLayer({
        id: "iss-halo",
        data: [{ position: interpolatedPos }],
        getPosition: (d) => d.position,
        getRadius: 100,
        radiusUnits: "pixels",
        getFillColor: [255, 255, 0, 80],
        pickable: false,
        parameters: {
          blendFunc: [
            WebGLRenderingContext.SRC_ALPHA,
            WebGLRenderingContext.ONE,
          ],
          depthTest: false,
        },
      });

      overlayRef.current.setProps({
        layers: [haloLayer, vehicleLayer],
      });

      // Only fly to position on initial load or major updates
      if (!prevPosRef.current) {
        mapRef.current.flyTo({
          center: interpolatedPos,
          speed: 0.2,
          curve: 1.2,
          essential: true,
        });
      }
    }
  }, [interpolatedPos, mapContainer, mapRef, overlayRef, prevPosRef]);

  const handleRefocus = () => {
    if (mapRef.current && interpolatedPos) {
      mapRef.current.flyTo({
        center: interpolatedPos,
        zoom: 5,
        speed: 0.8,
        curve: 1.2,
        essential: true,
      });
    }
  };

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <button className={"re-focus-button"} onClick={handleRefocus}>
        <img src={images.icon} className={"re-focus-button-icon"} alt={"iss"} />
      </button>
    </>
  );
};
