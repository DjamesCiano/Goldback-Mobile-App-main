import { StyleSheet, View, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import MainHeader from "@/components/headers/MainHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import ArrowBackIcon from "@/components/icons/ArrowBack";
import { useGlobalState } from "@/store/useGlobalState";
import Button from "@/components/Button";
import AirplaneIcon from "@/components/icons/Airplane";
import PhoneIcon from "@/components/icons/Phone";
import MarkerIcon from "@/components/icons/Marker";
import { howToGetThere, openCall } from "@/utils";

export default function NewsDetail() {
  const SoftAsh = useThemeColor({}, "SoftAsh");
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const appSettings = useGlobalState((state) => state.appSettings);

  const selectedMapFindLocation = useGlobalState(
    (state) => state.selectedLocationDetail
  );

  const handlePressDirections = () => {
    if (
      !selectedMapFindLocation?.latitude ||
      !selectedMapFindLocation?.longitude
    ) {
      return;
    }

    howToGetThere(
      selectedMapFindLocation?.latitude,
      selectedMapFindLocation?.longitude
    );
  };

  const handlePressPhone = () => {
    if (!selectedMapFindLocation?.businessPhone) {
      return;
    }
    openCall(selectedMapFindLocation?.businessPhone);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <MainHeader />
        <View style={styles.containerButtonBack}>
          <Link href="/(tabs)/(map)/" asChild>
            <Pressable>
              <ArrowBackIcon />
            </Pressable>
          </Link>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.containerDetails}>
            <View
              style={{ ...styles.containerImage, backgroundColor: SoftAsh }}
            >
              <Image
                source={{
                  uri:
                    selectedMapFindLocation?.businessLogoFileUrl ||
                    appSettings.defaultLogoIconUrl,
                }}
                style={{
                  width: 279,
                  height: 279,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "100%",
                gap: 8,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  gap: 8,
                }}
              >
                <MarkerIcon />
                <ThemedText
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: SoftAsh,
                  }}
                >
                  {selectedMapFindLocation?.businessAddress}
                </ThemedText>
              </View>
              <Pressable
                onPress={handlePressPhone}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  gap: 8,
                }}
              >
                <PhoneIcon />
                <ThemedText
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: SoftAsh,
                  }}
                >
                  {selectedMapFindLocation?.businessPhone}
                </ThemedText>
              </Pressable>
            </View>
			 {/* START TODO: Remove for production */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <ThemedText
                style={{
                  ...styles.title,
                  color: PrimaryYellow,
                  textAlign: "left",
                }}
              >
                {selectedMapFindLocation?.businessCategory}
              </ThemedText>
            </View>
			 {/* END TODO: Remove for production */}
			 <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <ThemedText
                style={{
                  ...styles.title,
                  color: PrimaryYellow,
                  textAlign: "left",
                }}
              >
                {selectedMapFindLocation?.businessName}
              </ThemedText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <ThemedText
                style={{
                  ...styles.description,
                  color: SoftAsh,
                }}
              >
                {selectedMapFindLocation?.businessDescription}
              </ThemedText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                label="GET DIRECTIONS"
                startIcon={<AirplaneIcon />}
                onPress={handlePressDirections}
              />
            </View>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerButtonBack: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  containerDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    textAlign: "right",
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
  },
  containerImage: {
    width: 279,
    height: 279,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
