import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import MainHeader from "@/components/headers/MainHeader";
import { useGlobalState } from "@/store/useGlobalState";
import Calculator from "@/components/Calculator";

export default function HomeScreen() {
  const rate = useGlobalState((state) => state.selectedRate());
  const [showInfo, setShowInfo] = useState(false);

  const selectedSource = useGlobalState((state) => state.selectedSource);
  const setSelectedSource = useGlobalState((state) => state.setSelectedSource);

  const handlePressInfo = () => {
    setShowInfo(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
      edges={['top']}
    >
      <ThemedView style={styles.titleContainer}>
        <MainHeader
          title="Calculator"
          showInfo
          onPressInfo={handlePressInfo}
          showRate
        />
        <Calculator
          rate={rate}
          showInfo={showInfo}
          source={selectedSource}
          setSelectedSource={setSelectedSource}
          onClickCloseInfo={() => setShowInfo(false)}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
});
