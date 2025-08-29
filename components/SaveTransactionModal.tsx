import { FC, useState } from "react";
import { Modal, Pressable, StyleSheet, View, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import Button from "./Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import GlobalLoader from "./GlobalLoader";

type Props = {
  isLoading: boolean;
  descriptionValue?: string;
  onClose: () => void;
  onSave: (description: string) => void;
};

const SaveTransactionModal: FC<Props> = ({
  onClose,
  onSave,
  isLoading,
  descriptionValue = "",
}) => {
  const White = useThemeColor({}, "White");
  const ModalBackground = useThemeColor({}, "ModalBackground");
  const RoyalBlack = useThemeColor({}, "RoyalBlack");
  const ModernAsh = useThemeColor({}, "ModernAsh");
  const LightBlack = useThemeColor({}, "LightBlack");
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");

  const [description, setDescription] = useState(descriptionValue);

  const handleSave = () => {
    if (!description) {
      return;
    }

    onSave(description);
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackground}>
        <Pressable
          style={{ ...styles.modalContent, backgroundColor: ModalBackground }}
        >
          <ThemedText
            style={{
              color: White,
              fontSize: 22,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Save Transaction
          </ThemedText>
          <View style={styles.containerInput}>
            <ThemedText
              style={{
                color: SecondaryYellow,
                fontSize: 12,
                fontWeight: "700",
                paddingLeft: 16,
              }}
            >
              NAME
            </ThemedText>
            <TextInput
              style={{
                ...styles.input,
                backgroundColor: RoyalBlack,
                color: ModernAsh,
              }}
              placeholderTextColor={LightBlack}
              placeholder="50 characters limit"
              value={description}
              onChange={(e) => setDescription(e.nativeEvent.text)}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <Button label="Cancel" disabled={isLoading} onPress={onClose} />
            <Button
              label={isLoading ? "Saving..." : "Save"}
              disabled={!description || isLoading}
              onPress={handleSave}
            />
          </View>
        </Pressable>
      </Pressable>
      {isLoading && <GlobalLoader />}
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
    boxShadow: "2px 2px 2px 1px rgba(167, 150, 80, 0.75)",
  },
  containerInput: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 8,
    paddingBottom: 14,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontWeight: "400",
    fontSize: 17,
    lineHeight: 20.72,
  },
});

export default SaveTransactionModal;
