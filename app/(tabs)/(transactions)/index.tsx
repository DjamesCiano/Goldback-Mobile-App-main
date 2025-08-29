import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";

import MainHeader from "@/components/headers/MainHeader";
import { ThemedView } from "@/components/ThemedView";
import TransactionListItem from "@/components/TransactionListItem";
import transactionsService from "@/services/transactionsService";
import { Transaction } from "@/models/Transaction";
import { useGlobalState } from "@/store/useGlobalState";
import ModalDeleteTransaction from "@/components/ModalDeleteTransaction";
import { useTransactionsState } from "@/store/useTransactionsState";
import { Quotes } from "@/models/Quotes";
import { ThemedText } from "@/components/ThemedText";

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getTransactions } = transactionsService();
  const deviceId = useGlobalState((state) => state.deviceId);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isLoading = useGlobalState((state) => state.showGlobalLoader);

  const router = useRouter();

  const setSelectedTransaction = useTransactionsState(
    (state) => state.setSelectedTransaction
  );
  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);
  const setSelectedSourceToEdit = useGlobalState(
    (state) => state.setSelectedSourceToEdit
  );

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const handleDeleteTransaction = async (transaction: Transaction) => {
    toggleMenu(transaction!.id as string);
    setSelectedTransactionId(transaction!.id as string);
    setIsOpenDeleteModal(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setSelectedSourceToEdit(
      ("USD" + transaction.payload.sourceCurrency) as keyof Quotes
    );
    toggleMenu(transaction.id as string);
    router.push(`/(tabs)/(transactions)/${transaction.id}`);
  };

  const toggleMenu = (id: string) => {
    setActiveMenu((prevId) => (prevId === id ? null : id));
  };

  const handlePressOutside = () => {
    setActiveMenu(null);
  };

  const getTransactionsData = async () => {
    try {
      setGlobalLoader(true);
      const response = await getTransactions(deviceId);
      setTransactions(response);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoader(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function getTransactionsData() {
        try {
          setGlobalLoader(true);
          const response = await getTransactions(deviceId);
          setTransactions(response);
        } catch (error) {
          console.log(error);
        } finally {
          setGlobalLoader(false);
        }
      }

      getTransactionsData();
    }, [])
  );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        edges={["top"]}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <ThemedView
            style={{
              flex: 1,
            }}
          >
            <MainHeader title="Transactions" />
            {transactions.length === 0 && !isLoading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                  }}
                >
                  No transactions
                </ThemedText>
              </View>
            )}
            {transactions.length > 0 && (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id as string}
                style={styles.containerList}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                renderItem={({ item }) => (
                  <TransactionListItem
                    data={item}
                    showMenu={item.id === activeMenu}
                    onPressDelete={() => handleDeleteTransaction(item)}
                    onPressEdit={() => handleEditTransaction(item)}
                    onCardPress={() => toggleMenu(item!.id as string)}
                  />
                )}
              />
            )}
          </ThemedView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      {isOpenDeleteModal && selectedTransactionId && (
        <ModalDeleteTransaction
          transactionId={selectedTransactionId}
          onClose={(deleted) => {
            setSelectedTransactionId(null);
            setIsOpenDeleteModal(false);

            if (deleted) {
              getTransactionsData();
            }
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default TransactionScreen;
