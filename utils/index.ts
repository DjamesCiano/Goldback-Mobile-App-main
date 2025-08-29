import { Linking, PixelRatio, Platform } from "react-native";
import * as Application from "expo-application";
import * as Location from "expo-location";

export const getDeviceId = async (): Promise<string> => {
  let deviceId = "";

  if (Platform.OS === "android") {
    deviceId = await Application.getAndroidId();
  }

  if (Platform.OS === "ios") {
    deviceId = (await Application.getIosIdForVendorAsync()) || "";
  }

  return deviceId || "";
};

export const roundToTwoDecimals = (num: number): number => {
  if (isNaN(num)) {
    return 0;
  }
  return Number(num.toFixed(2));
};

export const withTwoDecimals = (num: number | string) => {
  if (isNaN(Number(num))) {
    return "0.00";
  }

  return parseFloat(Number(num).toString()).toFixed(2);
};

const fontScale = PixelRatio.getFontScale();

export const getFontSize = (size: number): number => {
  return size / fontScale;
};

export const getCurrentLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }

      return await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    } catch (error) {
      console.error("Errorss", error);
      return null;
    }
  };

export const howToGetThere = (latitude: number, longitude: number) => {
  const latLng = `${latitude},${longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latLng}`;
  const appleMapsUrl = `http://maps.apple.com/?daddr=${latLng}`;

  const url = Platform.OS === "ios" ? appleMapsUrl : googleMapsUrl;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    })
    .catch((err) => console.error("Error", err));
};

export const openCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    })
    .catch((err) => console.error("Error", err));
};

export const milesToMeters = (miles: number): number => {
  return miles * 1609.34;
};

export const toPositive = (num: number | string) => Math.abs(Number(num));
