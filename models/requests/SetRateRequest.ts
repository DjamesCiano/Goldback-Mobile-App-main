import { Quotes } from "../Quotes";

export type SetRateRequest = {
  deviceId: string;
  timestamp: string;
  previousRate: number;
  currentRate: number;
  source: keyof Quotes;
  geoLocation?: {
    latitude: number;
    longitude: number;
  };
};
