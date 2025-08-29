import axios from "axios";
import { API_URL, OCM_SUBSCRIPTION_KEY } from "@/constants/Global";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  }); 

  //console.log('axiosInstance useAxios', axiosInstance.getUri());

  axiosInstance.interceptors.request.use((config) => {
    config.headers["Ocp-Apim-Subscription-Key"] = OCM_SUBSCRIPTION_KEY;
    return config;
  });

  return axiosInstance;
};

export default useAxios;
