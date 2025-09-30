import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";

export function useMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/satellite/style.json?key=ylI2IqPKBbIrZUyE0I4r",
      center: [0, 0],
      zoom: 6,
      maplibreLogo: false,
      attributionControl: false,
    });

    map.on("style.load", () => {
      map.setProjection({ type: "globe" });
    });

    const overlay = new MapboxOverlay({ layers: [] });
    overlayRef.current = overlay;
    map.addControl(overlay);

    mapRef.current = map;

    return () => {
      overlay.finalize();
      map.remove();
    };
  }, []);

  return { mapContainer, overlayRef, mapRef };
}
