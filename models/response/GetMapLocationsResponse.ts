import { GroupLocation } from "../GroupLocation";
import { MapFindLocation } from "../MapFindLocation";

export type GetMapLocationsResponse = {
    singleLocations: MapFindLocation[];
    groupedLocations: GroupLocation[];
};
