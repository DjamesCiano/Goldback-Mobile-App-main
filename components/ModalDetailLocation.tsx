import { FC } from "react";
import { StyleSheet, View, Modal, Pressable, Image } from "react-native";

import { MapFindLocation } from "@/models/MapFindLocation";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import CloseIcon from "@/components/icons/Close";
import Button from "./Button";
import AirplaneIcon from "@/components/icons/Airplane";

type Props = {
  mapFindLocation: MapFindLocation;
  defaultImage: string;
  onClose: () => void;
  onClickDirections: (mapFindLocation: MapFindLocation) => void;
  onClickText: (mapFindLocation: MapFindLocation) => void;
};

const ModalDetailLocation: FC<Props> = ({
  mapFindLocation,
  defaultImage,
  onClose,
  onClickDirections,
  onClickText,
}) => {
  const SoftCharcoal = useThemeColor({}, "SoftCharcoal");
  const White = useThemeColor({}, "White");
  const MainBGColor = useThemeColor({}, "MainBGColor");

  const handlePressDirections = () => {
    onClickDirections(mapFindLocation);
  };

  const handlePressText = () => {
    onClickText(mapFindLocation);
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: MainBGColor,
          }}
        >
          <View style={styles.containerHeader}>
            <View
              style={{
                width: 30,
                height: 30,
              }}
            ></View>
            <View
              style={{
                width: 100,
                height: 100,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                backgroundColor: SoftCharcoal,
              }}
            >
              <Image
                source={{
                  uri: mapFindLocation.businessLogoFileUrl || defaultImage,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                }}
              />
            </View>
            <Pressable onPress={onClose}>
              <CloseIcon />
            </Pressable>
          </View>
          <Pressable onPress={handlePressText}>
            <ThemedText
              style={{
                color: White,
                fontSize: 27,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {mapFindLocation.businessName}
            </ThemedText>
          </Pressable>
          <Pressable onPress={handlePressText}>
            <ThemedText
              style={{
                color: White,
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
              }}
              numberOfLines={2}
            >
              {mapFindLocation.businessDescription}
            </ThemedText>
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: 27,
              paddingHorizontal: 20,
            }}
          >
            <Button
              label="GET DIRECTIONS"
              startIcon={<AirplaneIcon />}
              onPress={handlePressDirections}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 27,
    width: "80%",
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default ModalDetailLocation;
