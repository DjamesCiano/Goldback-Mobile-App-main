import useAxios from "@/hooks/useAxios";
import { SetRateRequest } from "@/models/requests/SetRateRequest";
import { GetRatesResponse } from "@/models/response/GetRatesResponse";
import { SetRateResponse } from "@/models/response/SetRateResponse";

const ratesService = () => {
  const axiosInstance = useAxios();

  const getRates = async (): Promise<GetRatesResponse> => {
    const response = await axiosInstance.get<GetRatesResponse>("/CurrencyRates");
    return response.data;
  };

  const setRates = async (body: SetRateRequest): Promise<SetRateResponse> => {
    const response = await axiosInstance.post<SetRateResponse>(
      "/ChangeRates",
      body
    );
    return response.data;
  };

  return {
    getRates,
    setRates,
  };
};

export default ratesService;
