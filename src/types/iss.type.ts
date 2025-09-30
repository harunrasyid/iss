import { z } from "zod";

export const PositionResponseSchema = z.object({
  iss_position: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  timestamp: z.number(),
});

export type PositionResponseType = z.infer<typeof PositionResponseSchema>;

export interface IPosition {
  lng: number;
  lat: number;
  timestamp: number;
}
