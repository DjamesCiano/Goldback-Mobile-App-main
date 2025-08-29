import React, { useState } from "react";
import { Keyboard, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import MainHeader from "@/components/headers/MainHeader";
import { useGlobalState } from "@/store/useGlobalState";
import Calculator from "@/components/Calculator";
import { useTransactionsState } from "@/store/useTransactionsState";
import { useRouter } from "expo-router";

export default function TransactionDetails() {
  const router = useRouter();

  const selectedTransaction = useTransactionsState(
    (state) => state.selectedTransaction
  );

  const setSelectedSourceToEdit = useGlobalState(
    (state) => state.setSelectedSourceToEdit
  );

  const selectedSourceToEdit = useGlobalState(
    (state) => state.selectedSourceToEdit
  );

  const [showInfo, setShowInfo] = useState(false);

  const handlePressInfo = () => {
    setShowInfo(true);
  };

  const handleCreatedTransaction = () => {
    router.replace(`/(tabs)/(transactions)/`);
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
          edges={['top']}
        >
          <ThemedView style={styles.titleContainer}>
            <MainHeader
              title="Edit"
              showInfo
              onPressInfo={handlePressInfo}
              customRate={selectedTransaction?.payload.rate}
              showRate
            />
            {selectedTransaction && (
              <Calculator
                rate={selectedTransaction?.payload.rate}
                showInfo={showInfo}
                source={selectedSourceToEdit}
                onClickCloseInfo={() => setShowInfo(false)}
                transaction={selectedTransaction}
                onCreatedTransaction={handleCreatedTransaction}
                onClickClear={handleCreatedTransaction}
                setSelectedSource={setSelectedSourceToEdit}
              />
            )}
          </ThemedView>
        </SafeAreaView>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
});
