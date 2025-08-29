import React, { FC, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import SettingsIcon from "@/components/icons/Settings";
import MainLogo from "@/assets/images/MainLogo";
import ModalRate from "../ModalRate";
import { useGlobalState } from "@/store/useGlobalState";
import { getFontSize, roundToTwoDecimals, withTwoDecimals } from "@/utils";
import InfoIcon from "@/components/icons/Info";

type Props = {
  title?: string;
  showRate?: boolean;
  showInfo?: boolean;
  customRate?: number;
  onPressInfo?: () => void;
};

const MainHeader: FC<Props> = ({
  title,
  showRate = false,
  showInfo,
  customRate,
  onPressInfo,
}) => {
  const HeadlineText = useThemeColor({}, "HeadlineText");
  const rate = useGlobalState((state) => state.selectedRate());
  const rateStatic = useGlobalState((state) => state.selectedRateStatic());
  const isRateDifferent = rate !== rateStatic;
  const RateValueColor = useThemeColor({}, isRateDifferent ? "PrimaryRed" : "DarkYellow");

  const [modalVisible, setModalVisible] = useState(false);

  const handleClickSetRate = () => {
    setModalVisible(!modalVisible);
  };

  const handlePressInfo = () => {
    onPressInfo?.();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.containerImage}>
            <MainLogo style={styles.logo} />
          </View>
          {showRate && (
            <Pressable
              style={styles.containerRate}
              onPress={handleClickSetRate}
            >
              <ThemedText
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: RateValueColor,
                }}
              >
                Rate: ${withTwoDecimals(roundToTwoDecimals(customRate || rate))}
              </ThemedText>
              <SettingsIcon color={RateValueColor} />
            </Pressable>
          )}
        </View>
        {title && (
          <View style={styles.containerTitle}>
            <ThemedText style={{ ...styles.title, color: HeadlineText }}>
              {title}
            </ThemedText>
            {showInfo && (
              <Pressable
                style={{
                  position: "absolute",
                  right: 44,
                }}
                onPress={handlePressInfo}
              >
                <InfoIcon />
              </Pressable>
            )}
          </View>
        )}
      </View>
      {modalVisible && (
        <ModalRate isOpen={modalVisible} onClose={handleClickSetRate} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  containerHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  containerImage: {
    flex: 1,
  },
  logo: {},
  containerRate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 18.7,
    flex: 1,
    gap: 5,
  },
  containerTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: getFontSize(35),
    lineHeight: 40,
  }
});

export default MainHeader;
