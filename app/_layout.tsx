import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useGlobalState } from "@/store/useGlobalState";
import { getDeviceId } from "@/utils";
import ratesService from "@/services/ratesService";
import GlobalLoader from "@/components/GlobalLoader";
import { ImageBackground, Text, StyleSheet } from "react-native";
import settingsService from "@/services/settingsService";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const setDeviceId = useGlobalState((state) => state.setDeviceId);
  const setQuotes = useGlobalState((state) => state.setQuotes);
  const setQuotesStatic = useGlobalState((state) => state.setQuotesStatic);
  const setSource = useGlobalState((state) => state.setSource);
  const showGlobalLoader = useGlobalState((state) => state.showGlobalLoader);
  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);
  const setAppSettings = useGlobalState((state) => state.setAppSettings);

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [loaded] = useFonts({
    "mrt-regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "mrt-bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "mrt-semibold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    "mrt-extrabold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "mrt-medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
    "mrt-light": require("@/assets/fonts/Montserrat-Light.ttf"),
    "mrt-thin": require("@/assets/fonts/Montserrat-Thin.ttf"),
  });

  const { getRates } = ratesService();
  const { getSettings } = settingsService();

  const getDeviceUniqueId = async () => {
    const deviceId = await getDeviceId();
    setDeviceId(deviceId);
  };

  const getRatesData = async () => {
    try {
      setGlobalLoader(true);
      const response = await getRates();
      setQuotes(response.quotes);
	  setQuotesStatic(response.quotes);
      setSource(response.source);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoader(false);
    }
  };

  const getConfig = async () => {
    try {
      setGlobalLoader(true);
      const response = await getSettings();
      setAppSettings(response);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoader(false);
    }
  };

  useEffect(() => {
    getDeviceUniqueId();
    getRatesData();
    getConfig();

    const timeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const styles = StyleSheet.create({
	text: {
	  fontSize: 11,
	  color: 'white',
	  marginBottom: 15
	},
  });
  
  if (isSplashVisible) {
    return (
	  <ImageBackground
		source={require("@/assets/images/splash-860x1800.png")}
		style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
		resizeMode="cover"
	  >
     	<Text style={styles.text}>Version 1.1.44</Text>
 	  </ImageBackground>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {showGlobalLoader && <GlobalLoader />}
    </ThemeProvider>
  );
}
