import { FC, ReactElement, useState } from "react";
import { StyleSheet, View, Pressable, Modal, FlatList } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import CheckIcon from "../icons/Check";

import ArrowDownIcon from "../icons/ArrowDown";

import GoldMoneyIcon from "@/components/icons/GoldMoney";
import CanadaFlag from "@/components/icons/CanadaFlag";
import USAFlag from "@/components/icons/USAFlag";
import JapanFlag from "@/components/icons/JapanFlag";
import EuropeFlag from "@/components/icons/EuropeFlag";
import GBPFlag from "@/components/icons/GBPFlag";
import ChinaFlag from "@/components/icons/ChinaFlag";
import MexicoFlag from "@/components/icons/MexicoFlag";
import AEDFlag from "@/components/icons/AEDFlag";
import AUDFlag from "@/components/icons/AUDFlag";
import { Quotes } from "@/models/Quotes";

type Item = {
  id: keyof Quotes;
  code: string;
  name: string;
  flag: ReactElement;
};

type Props = {
  selectedSource: keyof Quotes;
  setSelectedSource: (source: keyof Quotes) => void;
};

const currencies: Item[] = [
  {
    id: "USDUSD",
    code: "USD",
    name: "United States Dollar",
    flag: <USAFlag />,
  },
//   {
//     id: "USDGB",
//     code: "Goldback",
//     name: "Goldback",
//     flag: <GoldMoneyIcon color="#EFD569" />,
//   },
  {
    id: "USDAUD",
    code: "AUD",
    name: "Australian Dollar",
    flag: <AUDFlag />,
  },
  {
    id: "USDCAD",
    code: "CAN",
    name: "Canadian Dollar",
    flag: <CanadaFlag />,
  },
  {
    id: "USDGBP",
    code: "GBP",
    name: "British Pound",
    flag: <GBPFlag />,
  },
  {
	id: "USDEUR",
	code: "EUR",
	name: "Euro",
	flag: <EuropeFlag />
  },
  {
    id: "USDMXN",
    code: "MXN",
    name: "Mexican Peso",
    flag: <MexicoFlag />,
  },
  {
    id: "USDJPY",
    code: "JPY",
    name: "Japanese Yen",
    flag: <JapanFlag />,
  },
  {
    id: "USDCNY",
    code: "CNY",
    name: "Chinese Yuan",
    flag: <ChinaFlag />,
  },
  {
    id: "USDAED",
    code: "AED",
    name: "UAE Dirham",
    flag: <AEDFlag />,
  }
];

const CurrencySelector: FC<Props> = ({ selectedSource, setSelectedSource }) => {
  const DarkYellow = useThemeColor({}, "DarkYellow");
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const ModernAsh = useThemeColor({}, "ModernAsh");
  const SoftCharcoal = useThemeColor({}, "SoftCharcoal");
  const ModalBackground = useThemeColor({}, "ModalBackground");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies.find((currency) => currency.id === selectedSource)!
  );

  const handlePress = () => {
    setModalVisible(!modalVisible);
  };

  const handleCurrencySelect = (currency: Item) => {
    setSelectedCurrency(currency);
    setSelectedSource(currency.id);
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable
        style={{
          ...styles.container,
          borderColor: DarkYellow,
        }}
        onPress={handlePress}
      >
        <View style={styles.containerImg}>
          <ThemedText>{selectedCurrency.flag}</ThemedText>
        </View>
        <ThemedText
          style={{
            color: DarkYellow,
            fontWeight: "400",
            fontSize: 20,
            lineHeight: 20.72,
			paddingLeft: 4,
			marginTop: 4
          }}
        >
          {selectedCurrency.code}
        </ThemedText>
        <ArrowDownIcon color={PrimaryYellow} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={{ ...styles.modalContent, backgroundColor: ModalBackground }}
          >
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={{ ...styles.currencyItem, borderColor: SoftCharcoal }}
                  onPress={() => handleCurrencySelect(item)}
                >
                  <ThemedText style={styles.flag}>{item.flag}</ThemedText>
                  <ThemedText
                    style={{ ...styles.currencyCode, color: ModernAsh }}
                  >
                    {item.code}
                  </ThemedText>
                  {item.code === selectedCurrency.code && (
                    <CheckIcon color={PrimaryYellow} />
                  )}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 100,
    borderWidth: 1,
  },
  containerImg: {
    width: 22,
    height: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 15,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 48,
  },
  currencyCode: {
    fontSize: 17,
    marginLeft: 10,
    lineHeight: 20.72,
    flex: 1,
  },
  flag: {
    width: 22,
    height: 18,
  },
});

export default CurrencySelector;
