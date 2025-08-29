export type CreateTransactionRequest = {
  payloadVersion: string;
  deviceId: string;
  transactionDate: string;
  lastUpdateDate: string;
  description: string;
  payload: {
    rate: number;
    sourceCurrency: string;
    targetCurrency: string;
    price: number;
    due: number;
    payment: number;
    change: number;
  };
  coord?: {
    latitude: number;
    longitude: number;
  };
};
