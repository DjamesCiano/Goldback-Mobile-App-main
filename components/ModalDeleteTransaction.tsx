import { FC } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Button from "./Button";
import { useGlobalState } from "@/store/useGlobalState";
import GlobalLoader from "./GlobalLoader";
import transactionsService from "@/services/transactionsService";

type Props = {
  transactionId: string;
  onClose: (deleted: boolean) => void;
};

const ModalDeleteTransaction: FC<Props> = ({ transactionId, onClose }) => {
  const ModalBackground = useThemeColor({}, "ModalBackground");
  const White = useThemeColor({}, "White");

  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);
  const showGlobalLoader = useGlobalState((state) => state.showGlobalLoader);

  const { deleteTransaction } = transactionsService();

  const handleClose = () => {
    onClose(false);
  };

  const onPressConfirm = async () => {
    try {
      setGlobalLoader(true);
      await deleteTransaction(transactionId);
      onClose(true);
    } catch (error) {
      console.error("Error deleting transaction", error);
    } finally {
      setGlobalLoader(false);
    }
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.modalBackground} onPress={handleClose}>
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
            Confirm Delete
          </ThemedText>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Button label="Cancel" onPress={handleClose} />
            <Button label="Confirm" onPress={onPressConfirm} />
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

export default ModalDeleteTransaction;
