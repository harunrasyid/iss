export interface IPositionResponse {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  timestamp: 1759113638;
}

export interface IPosition {
  lng: number;
  lat: number;
  timestamp: number;
}
