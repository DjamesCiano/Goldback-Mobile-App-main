import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
  Alert,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import debounce from "lodash.debounce";

import MainHeader from "@/components/headers/MainHeader";
import { ThemedView } from "@/components/ThemedView";
import CrosshairsIcon from "@/components/icons/Crosshairs";
import CrosshairsFillerIcon from "@/components/icons/CrosshairsFiller";
import LocationFilter from "@/components/LocationFilter";
import mapService from "@/services/mapService";
import { MapFindLocation } from "@/models/MapFindLocation";
import { useThemeColor } from "@/hooks/useThemeColor";
import LocationItem from "@/components/LocationItem";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import SearchIcon from "@/components/icons/Search";
import { useGlobalState } from "@/store/useGlobalState";
import { getCurrentLocation, howToGetThere, milesToMeters } from "@/utils";
import ModalDetailLocation from "@/components/ModalDetailLocation";
import { GroupLocation } from "@/models/GroupLocation";
import ImageMarker from "@/components/ImageMarker";
import * as Location from "expo-location";
import { DSMEnvelopeCodeEnum } from "@/models/DSMEnvelop";
import { ThemedText } from "@/components/ThemedText";

const ITEMS = ["Where to Spend", "Where to Exchange", "Both"];

const MapScreen = () => {
  const SoftCharcoal = useThemeColor({}, "SoftCharcoal");
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const InputFieldBG = useThemeColor({}, "InputFieldBG");
  const Snow = useThemeColor({}, "Snow");
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);

  const mapRef = useRef<MapView | null>(null);
  const { findMapLocations } = mapService();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<MapFindLocation[]>([]);
  const [groupedLocations, setGroupedLocations] = useState<GroupLocation[]>([]);
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [isOpenListLocations, setIsOpenListLocations] = useState(false);
  const [selectedMapFindLocation, setSelectedMapFindLocation] =
    useState<MapFindLocation | null>(null);
  const [mapKey, setMapKey] = useState(Math.random().toString());
  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  const [selectedGroupedLocationChildren, setSelectedGroupedLocationChildren] =
    useState<MapFindLocation[]>([]);

  const [region, setRegion] = useState<Region | undefined>();
  const [lastMapRegion, setLastMapRegion] = useState<Region | undefined>();
  const userInteractedRef = useRef(false);
  const lastLoadedRegionRef = useRef<Region | undefined>(undefined);
  const hasFittedRef = useRef(false);
  const ignoreNextRegionChangeRef = useRef(false);

  // Helper to check if region changed significantly (e.g., >0.001 lat/lng)
  function regionChangedSignificantly(a: Region | undefined, b: Region | undefined, threshold = 0.001) {
    if (!a || !b) return true;
    return (
      Math.abs(a.latitude - b.latitude) > threshold ||
      Math.abs(a.longitude - b.longitude) > threshold
    );
  }

  const memoizedLocations = useMemo(() => locations, [locations]);
  const memoizedGroupedLocations = useMemo(
    () => groupedLocations,
    [groupedLocations]
  );

  const [selectedFilterItem, setSelectedFilterItem] = useState<string>(
    ITEMS[0]
  );

  const mapFindLocations = useGlobalState((state) => state.mapFindLocations);
  const appSettings = useGlobalState((state) => state.appSettings);

  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);
  const setMapFindLocations = useGlobalState(
    (state) => state.setMapFindLocations
  );

  const setSelectedLocationDetail = useGlobalState(
    (state) => state.setSelectedLocationDetail
  );

  const setMapGroupedLocations = useGlobalState(
    (state) => state.setMapGroupedLocations
  );

  const mapGroupedLocations = useGlobalState(
    (state) => state.mapGroupedLocations
  );

  const getLocations = async (text: any) => {
    try {
      setGlobalLoader(true);
      const myLocation = await getCurrentLocation();
      const response = await findMapLocations({
        latitude: myLocation?.coords.latitude || 0,
        longitude: myLocation?.coords.longitude || 0,
        radiusInMeters: milesToMeters(appSettings.defaultSearchRadiusMiles),
        zipCodes: text,
      });

      if (response.code === DSMEnvelopeCodeEnum.API_FACADE_04020) {
        Alert.alert(`${response.notes}`);
        return;
      }
      if (response.code !== 0) {
        Alert.alert(
          `There was a problem with the request...: ${response.errorMessage}`
        );
        return;
      }

      if (!response.payload) {
        Alert.alert("No locations were found...");
        return;
      }

      setMapFindLocations([]);
      setMapGroupedLocations([]);
      setMapFindLocations(
        response.payload.singleLocations.filter(
          (location) => location.latitude && location.longitude
        )
      );
      setMapGroupedLocations(response.payload.groupedLocations);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoader(false);
    }
  };

  const handleChangeSearch = (text: string) => {
    setSearch(text);
  };

  const toggleSearch = () => {
    setIsOpenSearch((prev) => !prev);
  };

  const toggleListLocations = () => {
    setSelectedGroupedLocationChildren([]);
    setIsOpenListLocations((prev) => !prev);
  };

  const onMarkerPress = (location: MapFindLocation) => {
    setSelectedMapFindLocation(location);
    setIsOpenSearch(false);
    setIsOpenListLocations(false);
  };

  const onPressGroupMarker = (groupedLocation: GroupLocation) => {
    setSelectedGroupedLocationChildren([]);
    if (selectedFilterItem === "Both") {
      setSelectedGroupedLocationChildren(groupedLocation.documents);
    }

    if (selectedFilterItem === "Where to Spend") {
      setSelectedGroupedLocationChildren(
        groupedLocation.documents.filter((location) =>
          isLocationTypeOf(location, "MERCHANT")
        )
      );
    }

    if (selectedFilterItem === "Where to Exchange") {
      setSelectedGroupedLocationChildren(
        groupedLocation.documents.filter((location) =>
          isLocationTypeOf(location, "DISTRIBUTOR")
        )
      );
    }

    setIsOpenListLocations(true);
  };

  const handleCloseLocationPopup = () => {
    setSelectedMapFindLocation(null);
  };

  const handleChangeTypeFilter = (value: string) => {
    setSelectedFilterItem(value);
  };

  const filterLocations = (value: string) => {
    let locations: MapFindLocation[] = [];
    let groupedLocations: GroupLocation[] = [];

    if (value === "Both") {
      locations = mapFindLocations;
      groupedLocations = mapGroupedLocations;
    }

    if (value === "Where to Spend") {
      locations = mapFindLocations.filter((location) =>
        isLocationTypeOf(location, "MERCHANT")
      );

      groupedLocations = mapGroupedLocations.filter((group) =>
        group.documents.some((location) =>
          isLocationTypeOf(location, "MERCHANT")
        )
      );
    }

    if (value === "Where to Exchange") {
      locations = mapFindLocations.filter((location) =>
        isLocationTypeOf(location, "DISTRIBUTOR")
      );

      groupedLocations = mapGroupedLocations.filter((group) =>
        group.documents.some((location) =>
          isLocationTypeOf(location, "DISTRIBUTOR")
        )
      );
    }

    setGroupedLocations(groupedLocations);
    setLocations(locations);
    setMapKey(Math.random().toString());
  };

  const isLocationTypeOf = (
    location: MapFindLocation,
    locationType: string
  ): boolean =>
    location.businessCategory?.toUpperCase() === locationType ||
    location.businessCategory?.toUpperCase() === "BOTH";

const fitToCoordinates = (
  locations: MapFindLocation[],
  groupedLocations: GroupLocation[]
) => {
  if (!mapRef.current) return;
  // Only use valid coordinates from the same array as the markers
  const validCoords = locations.filter(
    loc =>
      typeof loc.latitude === 'number' &&
      typeof loc.longitude === 'number' &&
      !isNaN(loc.latitude) &&
      !isNaN(loc.longitude)
  ).map(loc => ({ latitude: loc.latitude, longitude: loc.longitude }));
  if (validCoords.length > 0) {
    ignoreNextRegionChangeRef.current = true;
    mapRef.current.fitToCoordinates(
      validCoords,
      {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      }
    );
    return;
  }
  // fallback to grouped locations if no single locations
  const validGroupCoords = groupedLocations.filter(
    loc =>
      typeof loc.latitude === 'number' &&
      typeof loc.longitude === 'number' &&
      !isNaN(loc.latitude) &&
      !isNaN(loc.longitude)
  ).map(loc => ({ latitude: loc.latitude, longitude: loc.longitude }));
  if (validGroupCoords.length > 0) {
    ignoreNextRegionChangeRef.current = true;
    mapRef.current.fitToCoordinates(
      validGroupCoords,
      {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      }
    );
  }
};

  const handleClickDirections = (mapFindLocation: MapFindLocation) => {
    if (!mapFindLocation.latitude || !mapFindLocation.longitude) {
      return;
    }

    howToGetThere(mapFindLocation.latitude, mapFindLocation.longitude);
  };

  const goToDetails = (mapFindLocation: MapFindLocation) => {
    setSelectedMapFindLocation(null);
    setSelectedLocationDetail(mapFindLocation);
    router.push(`/(tabs)/(map)/detail`);
  };

 useEffect(() => {
  if (mapIsLoaded && memoizedLocations.length > 0 && !hasFittedRef.current) {
    fitToCoordinates(memoizedLocations, memoizedGroupedLocations);
    hasFittedRef.current = true;
  }
}, [mapIsLoaded, memoizedLocations, memoizedGroupedLocations]);


  useEffect(() => {
    if (mapIsLoaded && memoizedLocations.length > 0 && mapRef.current) {
      setTimeout(() => {
        fitToCoordinates(memoizedLocations, memoizedGroupedLocations);
      }, 300);
    }
}, [mapIsLoaded, memoizedLocations, memoizedGroupedLocations]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      Alert.alert("GPS is permitted on this application!");
    } else {
      Alert.alert(
        "GPS Location not permitted.  Go to Settings and enable GPS."
      );
    }
    setHasLocationPermission(status === "granted");
  };

  useFocusEffect(
    useCallback(() => {
      if (mapFindLocations.length) {
        setMapKey(Math.random().toString());
        return;
      }

      async function getLocationsData() {
        try {
          setGlobalLoader(true);
          const myLocation = await getCurrentLocation();
          const response = await findMapLocations({
            latitude:
              myLocation?.coords.latitude ||
              appSettings.defaultStartingPoint.coordinates[1],
            longitude:
              myLocation?.coords.longitude ||
              appSettings.defaultStartingPoint.coordinates[0],
            radiusInMeters: milesToMeters(
              appSettings.defaultStartingPoint.radiusMiles
            ),
            zipCodes: "",
          });

          if (!response.payload) {
            return;
          }

          setMapFindLocations(
            response.payload.singleLocations.filter(
              (location) => location.latitude && location.longitude
            )
          );
          setMapGroupedLocations(response.payload.groupedLocations);
        } catch (error) {
          console.log(error);
        } finally {
          setGlobalLoader(false);
        }
      }

      getLocationsData();

      return () => {
        setMapKey(Math.random().toString());
      };
    }, [])
  );

  const centerMapOnMyLocation = async () => {
    const myLocation = await getCurrentLocation();

    if (myLocation && mapRef.current) {
      centerMap(myLocation.coords.latitude, myLocation.coords.longitude);
    }
  };

  const centerMap = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.03,
      });
    }
  };

  useEffect(() => {
    filterLocations(selectedFilterItem);
  }, [mapFindLocations, selectedFilterItem]);

  useEffect(() => {
    setGroupedLocations(mapGroupedLocations);
  }, [mapGroupedLocations]);

  const configInitialRegion = async () => {
    const myLocation = await getCurrentLocation();

    if (myLocation) {
      setRegion({
        latitude: myLocation.coords.latitude,
        longitude: myLocation.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.03,
      });
    } else {
      setRegion({
        latitude: appSettings.defaultStartingPoint.coordinates[1],
        longitude: appSettings.defaultStartingPoint.coordinates[0],
        latitudeDelta: 50,
        longitudeDelta: 50,
      });
    }
  };

  useEffect(() => {
    if (!mapFindLocations.length) {
      configInitialRegion();
    }
  }, [mapFindLocations]);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        edges={["top"]}
      >
        <ThemedView
          style={{
            flex: 1,
          }}
        >
          <MainHeader />
          <ThemedView style={styles.containerHeader}>
            <View
              style={{
                width: "auto",
              }}
            >
              <LocationFilter
                items={ITEMS}
                value={selectedFilterItem}
                onChange={(value) => handleChangeTypeFilter(value)}
              />
            </View>
            {hasLocationPermission ? (
              <Pressable
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
                onPress={centerMapOnMyLocation}
              >
                <CrosshairsIcon />
              </Pressable>
            ) : (
              <Pressable
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
                onPress={requestLocationPermission}
              >
                <CrosshairsFillerIcon />
              </Pressable>
            )}
          </ThemedView>
          <ThemedView style={styles.containerMap}>
            <Pressable
              style={{
                ...styles.commonContainerSearch,
                ...styles.containerSearch,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              onPress={() => setIsOpenSearch(true)}
            >
              {isOpenSearch && (
                <View
                  style={{
                    paddingHorizontal: 20,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      height: "auto",
                    }}
                  >
                    <InputLabel text="Search" />
                    <ThemedText
                      style={{
                        color: SecondaryYellow,
                        fontSize: 12,
                      }}
                    >
                      Radius:{" "}
                      <ThemedText style={{ color: Snow }}>
                        {appSettings.defaultSearchRadiusMiles} mi
                      </ThemedText>
                    </ThemedText>
                  </View>
                  <TextInput
                    containerStyle={{
                      paddingBottom: 0,
                    }}
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "white",
                      flex: 1,
                      height: 48,
                    }}
                    value={search}
                    startAdornment={<SearchIcon />}
                    endAdornment={
                      <Pressable
                        style={{
                          borderRadius: 12,
                          backgroundColor: InputFieldBG,
                          borderWidth: 1,
                          borderColor: SecondaryYellow,
                          height: 34,
                          width: 73,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => getLocations(search)}
                      >
                        <ThemedText
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: SecondaryYellow,
                          }}
                        >
                          Find
                        </ThemedText>
                      </Pressable>
                    }
                    placeholder="enter zip, city, or state"
                    onChangeText={handleChangeSearch}
                  />
                </View>
              )}
              <Pressable
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={toggleSearch}
              >
                <View
                  style={{
                    ...styles.searchIndicator,
                    backgroundColor: SoftCharcoal,
                    marginTop: isOpenSearch ? 24 : 0,
                  }}
                />
              </Pressable>
            </Pressable>
              <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                mapType="standard"
                provider="google"
                initialRegion={!mapIsLoaded ? (lastMapRegion || region) : undefined}
                onMapReady={() => {
                  if (!mapIsLoaded) {
                    setMapIsLoaded(true);
                    console.log("Map ready");
                  }
                  // Commented out to prevent auto-fit after pan/zoom
                  // if (mapFindLocations.length) {
                  //   fitToCoordinates(mapFindLocations, mapGroupedLocations);
                  //   console.log("[Map] Fitted to coordinates");
                  // }
                }}
                onRegionChangeComplete={async (newRegion) => {
                  console.log("[Map] Region changed to:", newRegion);

                  setLastMapRegion(newRegion);

                  // Commented out to prevent auto-fetch on pan/zoom
                  // if (ignoreNextRegionChangeRef.current) {
                  //   console.log("[Map] Ignoring region change");
                  //   ignoreNextRegionChangeRef.current = false;
                  //   return;
                  // }

                  // Commented out to prevent auto-fetch on pan/zoom
                  // if (!userInteractedRef.current) {
                  //   console.log("[Map] First user interaction");
                  //   userInteractedRef.current = true;
                  //   lastLoadedRegionRef.current = newRegion;
                  //   return;
                  // }

                  // Commented out to prevent auto-fetch on pan/zoom
                  // if (!regionChangedSignificantly(newRegion, lastLoadedRegionRef.current)) {
                  //   console.log("[Map] Region change not significant");
                  //   return;
                  // }

                  // lastLoadedRegionRef.current = newRegion;

                  // try {
                  //   setGlobalLoader(true);
                  //   console.log("[Map] Fetching locations...");

                  //   const response = await findMapLocations({
                  //     latitude: newRegion.latitude,
                  //     longitude: newRegion.longitude,
                  //     radiusInMeters: milesToMeters(appSettings.defaultSearchRadiusMiles),
                  //     zipCodes: search,
                  //   });

                  //   if (response.code === DSMEnvelopeCodeEnum.API_FACADE_04020) {
                  //     Alert.alert(`${response.notes}`);
                  //     return;
                  //   }

                  //   if (response.code !== 0) {
                  //     Alert.alert(`There was a problem with the request: ${response.errorMessage}`);
                  //     return;
                  //   }

                  //   if (!response.payload) {
                  //     Alert.alert("No locations were found...");
                  //     return;
                  //   }

                  //   setMapFindLocations(
                  //     response.payload.singleLocations.filter(
                  //       (location) => location.latitude && location.longitude
                  //     )
                  //   );
                  //   setMapGroupedLocations(response.payload.groupedLocations);

                  //   console.log("[Map] Locations updated");
                  // } catch (error) {
                  //   console.log("[Map] Fetch error:", error);
                  // } finally {
                  //   setGlobalLoader(false);
                  // }
                }}
              >
                {memoizedLocations.map((location) => (
                  <ImageMarker
                    key={`${location._id}-${location.latitude}-${location.longitude}`}
                    latitude={location.latitude}
                    longitude={location.longitude}
                    onPress={() => onMarkerPress(location)}
                  />
                ))}

                {memoizedGroupedLocations.map((location, index) => (
                  <ImageMarker
                    key={`${index}-${location.latitude}-${location.longitude}`}
                    latitude={location.latitude}
                    longitude={location.longitude}
                    onPress={() => onPressGroupMarker(location)}
                    type="group"
                  />
                ))}
              </MapView>

            <View
              style={{
                ...styles.commonContainerSearch,
                ...styles.containerList,
                paddingBottom: isOpenListLocations ? 18 : 0,
              }}
              onResponderRelease={() => setIsOpenListLocations(true)}
            >
              <Pressable
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: isOpenListLocations ? 0 : 18,
                  paddingTop: 8,
                }}
                onPress={toggleListLocations}
              >
                <View
                  style={{
                    ...styles.searchIndicator,
                    backgroundColor: SoftCharcoal,
                    marginBottom: isOpenListLocations ? 24 : 0,
                  }}
                />
              </Pressable>
              {isOpenListLocations && (
                <>
                  <FlatList
                    data={
                      selectedGroupedLocationChildren.length
                        ? selectedGroupedLocationChildren
                        : memoizedLocations
                    }
                    keyExtractor={(item, index) =>
                      `${index}-${item.latitude}-${item.longitude}`
                    }
                    style={{
                      flex: 1,
                      width: "100%",
                      maxHeight: 400,
                    }}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <LocationItem
                        data={item}
                        defaultImage={appSettings.defaultLogoIconUrl}
                        onPressSendButton={() => handleClickDirections(item)}
                        onPressText={() => goToDetails(item)}
                      />
                    )}
                  />
                </>
              )}
            </View>
          </ThemedView>
        </ThemedView>
        {selectedMapFindLocation && (
          <ModalDetailLocation
            mapFindLocation={selectedMapFindLocation}
            defaultImage={appSettings.defaultLogoIconUrl}
            onClose={handleCloseLocationPopup}
            onClickDirections={handleClickDirections}
            onClickText={goToDetails}
          />
        )}
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerMap: {
    position: "relative",
    flex: 1,
  },
  commonContainerSearch: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090C",
  },
  containerSearch: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 18,
    paddingBottom: 8,
  },
  containerList: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 18,
  },
  searchIndicator: {
    width: 48,
    height: 4,
    borderRadius: 100,
  },
});

export default MapScreen;
