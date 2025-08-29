import useAxios from "@/hooks/useAxios";
import { IDSMEnvelop } from "@/models/DSMEnvelop";
import { FindLocationsRequest } from "@/models/requests/FindLocationsRequest";
import { GetMapLocationsResponse } from "@/models/response/GetMapLocationsResponse";

const mapService = () => {
  const axiosInstance = useAxios();

  //console.log('starts axios', JSON.stringify(axiosInstance));
  const findMapLocations = async (
    body: FindLocationsRequest
  ): Promise<IDSMEnvelop<GetMapLocationsResponse>> => {
    const response = await axiosInstance.post<IDSMEnvelop<GetMapLocationsResponse>>(
      `/GeocodeFunctionV3`,
      body
    );
    return response.data;
  };

  return {
    findMapLocations,
  };
};

export default mapService;
