import { MapFindLocation } from "./MapFindLocation";

export type GroupLocation = {
  longitude: number;
  latitude: number;
  count: number;
  documents: Array<MapFindLocation>;
};
