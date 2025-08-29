export type FindLocationsRequest = {
  latitude: number;
  longitude: number;
  radiusInMeters: number;
  zipCodes?: string;
};
