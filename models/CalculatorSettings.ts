export type CalculatorSettings = {
  percentageChangeRate: number;
  defaultSearchRadiusMiles: number;
  defaultStartingPoint: {
    radiusMiles: number;
    type: string;
    coordinates: [number, number];
  };
  minimunZoomValue: number;
  defaultLogoIconUrl: string;
};
