import { FC, useState } from "react";
import { Modal, Pressable, StyleSheet, View, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Button from "./Button";
import { useGlobalState } from "@/store/useGlobalState";
import {
  getCurrentLocation,
  roundToTwoDecimals,
  withTwoDecimals,
} from "@/utils";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { SetRateRequest } from "@/models/requests/SetRateRequest";
import ratesService from "@/services/ratesService";
import GlobalLoader from "./GlobalLoader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalRate: FC<Props> = ({ isOpen, onClose }) => {
  const ModalBackground = useThemeColor({}, "ModalBackground");
  const RoyalBlack = useThemeColor({}, "RoyalBlack");
  const ModernAsh = useThemeColor({}, "ModernAsh");
  const LightBlack = useThemeColor({}, "LightBlack");
  const DarkYellow = useThemeColor({}, "DarkYellow");

  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);
  const setQuotes = useGlobalState((state) => state.setQuotes);
  const setSource = useGlobalState((state) => state.setSource);
  const showGlobalLoader = useGlobalState((state) => state.showGlobalLoader);
  const selectedRate = useGlobalState((state) => state.selectedRate());
  const selectedRateStatic = useGlobalState((state) => state.selectedRateStatic());
  const deviceId = useGlobalState((state) => state.deviceId);
  const selectedSource = useGlobalState((state) => state.selectedSource);
  const appSettings = useGlobalState((state) => state.appSettings);

  const { value: rate, onChange: setRate } = useCurrencyInput();
  const [errorRate, setErrorRate] = useState("");

  const { setRates } = ratesService();

  const handleChangeRate = (text: string) => {
    setRate(text);
  };

  const onPressConfirm = async () => {
    try {
      setGlobalLoader(true);
      const newRate = parseFloat(rate);

      if (isNaN(newRate)) {
        setErrorRate("Please enter a valid number");
        return;
      }

      const maxChangeRate =
        selectedRateStatic * (1 + appSettings.percentageChangeRate / 100);
      const minChangeRate =
        selectedRateStatic * (1 - appSettings.percentageChangeRate / 100);

      if (newRate > maxChangeRate || newRate < minChangeRate) {
        setErrorRate(
          `Rate should be within ${appSettings.percentageChangeRate}% of today's price of ${withTwoDecimals(roundToTwoDecimals(selectedRateStatic))}.`
        );
        return;
      }

      setErrorRate("");

      const transactionDate = new Date().toISOString();

      const currentLocation = await getCurrentLocation();

      const body: SetRateRequest = {
        deviceId: deviceId,
        timestamp: transactionDate,
        previousRate: selectedRate,
        currentRate: newRate,
        source: selectedSource,
        geoLocation: {
          latitude: currentLocation?.coords.latitude || 0,
          longitude: currentLocation?.coords.longitude || 0,
        },
      };

      if (!currentLocation) {
        delete body.geoLocation;
      }

      const response = await setRates(body);
      setQuotes(response.Quotes);
      setSource(response.Source);
      onClose();
    } catch (error) {
      console.error("Error setting rate", error);
    } finally {
      setGlobalLoader(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable
          style={{ ...styles.modalContent, backgroundColor: ModalBackground }}
        >
          <ThemedText
            style={{
              color: DarkYellow,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "right",
            }}
          >
            Today’s Rate: ${withTwoDecimals(roundToTwoDecimals(selectedRateStatic))}
          </ThemedText>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: RoyalBlack,
              color: ModernAsh,
            }}
            placeholderTextColor={LightBlack}
            placeholder="Enter custom rate"
            keyboardType="numeric"
            value={rate}
            onChangeText={handleChangeRate}
          />
          <View>
            {errorRate ? (
              <ThemedText style={{ color: "red" }}>{errorRate}</ThemedText>
            ) : null}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Button label="Cancel" onPress={onClose} />
            <Button label="Save" onPress={onPressConfirm} />
          </View>
        </Pressable>
      </Pressable>
      {showGlobalLoader && <GlobalLoader />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    width: "80%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    boxShadow: "2px 2px 2px 1px rgba(167, 150, 80, 0.75)",
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontWeight: "400",
    fontSize: 17,
  },
});

export default ModalRate;
