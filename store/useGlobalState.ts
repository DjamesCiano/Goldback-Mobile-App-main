import { create } from "zustand";

import { INITIAL_SOURCE } from "@/constants/Global";
import { Quotes } from "@/models/Quotes";
import { New } from "@/models/New";
import { MapFindLocation } from "@/models/MapFindLocation";
import { GroupLocation } from "@/models/GroupLocation";
import { CalculatorSettings } from "@/models/CalculatorSettings";

type State = {
  deviceId: string;
  quotes: Quotes;
  quotesStatic: Quotes;
  source: string;
  selectedSource: keyof Quotes;
  selectedSourceToEdit: keyof Quotes;
  news: New[];
  showGlobalLoader: boolean;
  mapFindLocations: MapFindLocation[];
  mapGroupedLocations: GroupLocation[];
  selectedLocationDetail: MapFindLocation | null;
  appSettings: CalculatorSettings;
  selectedRate: () => number;
  selectedRateStatic: () => number;
  selectedRateToEdit: () => number;
  setDeviceId: (deviceId: string) => void;
  setQuotes: (quotes: Quotes) => void;
  setQuotesStatic: (quotes: Quotes) => void;
  setSource: (source: string) => void;
  setSelectedSource: (selectedSource: keyof Quotes) => void;
  setNews: (news: New[]) => void;
  setGlobalLoader: (show: boolean) => void;
  setMapFindLocations: (mapFindLocations: MapFindLocation[]) => void;
  setMapGroupedLocations: (mapGroupedLocations: GroupLocation[]) => void;
  setSelectedLocationDetail: (selectedLocationDetail: MapFindLocation) => void;
  setSelectedSourceToEdit: (selectedSourceToEdit: keyof Quotes) => void;
  setAppSettings: (appSettings: CalculatorSettings) => void;
};

export const useGlobalState = create<State>((set, get) => ({
  deviceId: "",
  quotes: {
    USDCAD: 0,
    USDCNY: 0,
    USDEUR: 0,
    USDGBP: 0,
    USDJPY: 0,
    USDMXN: 0,
    USDUSD: 0,
    USDGB: 0,
    USDAED: 0,
  },
  quotesStatic: {
    USDCAD: 0,
    USDCNY: 0,
    USDEUR: 0,
    USDGBP: 0,
    USDJPY: 0,
    USDMXN: 0,
    USDUSD: 0,
    USDGB: 0,
    USDAED: 0,
  },
  source: "",
  changedRate: null,
  selectedSource: INITIAL_SOURCE,
  selectedSourceToEdit: INITIAL_SOURCE,
  news: [],
  showGlobalLoader: false,
  mapFindLocations: [],
  mapGroupedLocations: [],
  selectedLocationDetail: null,
  appSettings: {
    percentageChangeRate: 0,
    defaultSearchRadiusMiles: 100,
    defaultStartingPoint: {
      radiusMiles: 0,
      type: "",
      coordinates: [0, 0],
    },
    minimunZoomValue: 0,
    defaultLogoIconUrl: "",
  },
  selectedRate: () => {
    const quotes = get().quotes;
    return quotes[get().selectedSource];
  },
  selectedRateStatic: () =>{
    const quotes = get().quotesStatic;
    return quotes[get().selectedSource];
  },
  selectedRateToEdit: () => {
    const quotes = get().quotes;
    return quotes[get().selectedSourceToEdit];
  },
  setDeviceId: (deviceId: string) => set({ deviceId }),
  setQuotes: (quotes: Quotes) => set({ quotes }),
  setQuotesStatic: (quotesStatic: Quotes) => set({ quotesStatic }),
  setSource: (source: string) => set({ source }),
  setSelectedSource: (selectedSource: keyof Quotes) => set({ selectedSource }),
  setNews: (news: New[]) => set({ news }),
  setGlobalLoader: (show: boolean) => set({ showGlobalLoader: show }),
  setMapFindLocations: (mapFindLocations: MapFindLocation[]) =>
    set({ mapFindLocations }),
  setMapGroupedLocations: (mapGroupedLocations: GroupLocation[]) =>
    set({ mapGroupedLocations }),
  setSelectedLocationDetail: (selectedLocationDetail: MapFindLocation) =>
    set({ selectedLocationDetail }),
  setSelectedSourceToEdit: (selectedSourceToEdit: keyof Quotes) =>
    set({ selectedSourceToEdit }),
  setAppSettings: (appSettings: CalculatorSettings) => set({ appSettings }),
}));
