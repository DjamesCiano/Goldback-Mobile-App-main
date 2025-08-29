import useAxios from "@/hooks/useAxios";
import { CalculatorSettings } from "@/models/CalculatorSettings";
import { IDSMEnvelop } from "@/models/DSMEnvelop";
import { GetCalculatorSettingsResponse } from "@/models/response/GetCalculatorSettingsResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "payloadData";

const settingsService = () => {
  const axiosInstance = useAxios();

  const getSettings = async (): Promise<CalculatorSettings> => {
    try {
      const response = await axiosInstance.get<IDSMEnvelop<CalculatorSettings>>(
        "/CalculatorSettings"
      );

      if (response.data.code !== 0) {
        const payloadData = await AsyncStorage.getItem(STORAGE_KEY);

        if (payloadData) {
          let result = JSON.parse(payloadData) as CalculatorSettings;
          return result;
        }

        throw new Error(response.data.errorMessage);
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(response.data.payload)
      );

      return response.data.payload as CalculatorSettings;
    } catch (error) {
      const payloadData = await AsyncStorage.getItem(STORAGE_KEY);

      if (payloadData) {
        return JSON.parse(payloadData) as CalculatorSettings;
      }
``
      throw error;
    }
  };

  return {
    getSettings,
  };
};

export default settingsService;
