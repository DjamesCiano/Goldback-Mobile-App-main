import { StyleSheet, View, Pressable, Modal, FlatList } from "react-native";
import { FC, useState } from "react";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

import ArrowDownIcon from "./icons/ArrowDown";
import CheckIcon from "./icons/Check";

type Props = {
  items: string[];
  value: string;
  onChange: (value: string) => void;
};

const LocationFilter: FC<Props> = ({ items, value, onChange }) => {
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const ModalBackground = useThemeColor({}, "ModalBackground");
  const ModernAsh = useThemeColor({}, "ModernAsh");
  const SoftCharcoal = useThemeColor({}, "SoftCharcoal");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleItemSelect = (item: string) => {
    onChange(item);
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        style={{
          ...styles.container,
          borderColor: PrimaryYellow,
        }}
        onPress={handlePress}
      >
        <ThemedText
          style={{
            ...styles.label,
            color: PrimaryYellow,
          }}
        >
          {value}
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
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={{ ...styles.currencyItem, borderColor: SoftCharcoal }}
                  onPress={() => handleItemSelect(item)}
                >
                  <ThemedText
                    style={{ ...styles.currencyCode, color: ModernAsh }}
                  >
                    {item}
                  </ThemedText>
                  {item === value && <CheckIcon color={PrimaryYellow} />}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
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
});

export default LocationFilter;
