import { FC } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { MapFindLocation } from "@/models/MapFindLocation";
import SentIcon from "@/components/icons/Sent";
import { ThemedText } from "./ThemedText";

type Props = {
  data: MapFindLocation;
  defaultImage: string;
  onPressSendButton: () => void;
  onPressText: () => void;
};

const LocationItem: FC<Props> = ({
  data,
  defaultImage,
  onPressSendButton,
  onPressText,
}) => {
  const SoftCharcoal = useThemeColor({}, "SoftCharcoal");
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          source={{ uri: data.businessLogoFileUrl || defaultImage }}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
        />
      </View>
      <View
        style={{ ...styles.containerDetails, borderBottomColor: SoftCharcoal }}
      >
        <View style={styles.details}>
          <Pressable onPress={onPressText}>
            <ThemedText
              style={{
                fontSize: 15,
                fontWeight: "500",
              }}
              numberOfLines={1}
            >
              {data.businessName}
            </ThemedText>
          </Pressable>
          <Pressable onPress={onPressText}>
            <ThemedText
              style={{
                fontSize: 10,
                fontWeight: "400",
              }}
              numberOfLines={2}
            >
              {data.businessAddress}
            </ThemedText>
          </Pressable>
        </View>
        <Pressable
          style={{ ...styles.sendButton, backgroundColor: PrimaryYellow }}
          onPress={onPressSendButton}
        >
          <SentIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    flex: 1,
    paddingHorizontal: 20,
  },
  containerImg: {
    width: 64,
    height: 64,
    backgroundColor: "#C4C4C4",
    borderRadius: 12,
  },
  containerDetails: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  details: {
    flex: 1,
  },
});

export default LocationItem;
