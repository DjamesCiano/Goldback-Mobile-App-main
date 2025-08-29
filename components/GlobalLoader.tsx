import { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const GlobalLoader: FC = () => {
  const DarkYellow = useThemeColor({}, "DarkYellow");

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={DarkYellow} />
      <ThemedText style={styles.loadingText}>Loading...</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 16,
  },
});

export default GlobalLoader;
