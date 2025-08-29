import { FC, useState, useMemo } from "react";
import { ScrollView, View } from "react-native";

import { useGlobalState } from "@/store/useGlobalState";
import RoundedContainer from "./RoundedContainer";
import CurrencySelector from "./CurrencySelector";
import InputCalculator from "./InputCalculator";
import { ThemedText } from "./ThemedText";
import GoldMoneyIcon from "@/components/icons/GoldMoney";
import CalculatorChangeSection from "./CalculatorChangeSection";
import { getCurrentLocation } from "@/utils";
import CalculatorInfo from "./CalculatorInfo";
import { useThemeColor } from "@/hooks/useThemeColor";
import SaveTransactionModal from "./SaveTransactionModal";
import transactionsService from "@/services/transactionsService";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { CreateTransactionRequest } from "@/models/requests/CreateTransactionRequest";
import { Transaction, TransactionClass } from "@/models/Transaction";
import { Quotes } from "@/models/Quotes";

type Props = {
  rate: number;
  transaction?: Transaction;
  showInfo: boolean;
  source: keyof Quotes;
  onClickCloseInfo: () => void;
  onCreatedTransaction?: () => void;
  onClickClear?: () => void;
  setSelectedSource: (source: keyof Quotes) => void;
};

const Calculator: FC<Props> = ({
  rate,
  showInfo,
  transaction,
  source,
  setSelectedSource,
  onClickCloseInfo,
  onCreatedTransaction,
  onClickClear,
}) => {
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const deviceId = useGlobalState((state) => state.deviceId);

  const { createTransaction, updateTransaction } = transactionsService();

  const {
    value: price,
    onChange: setPrice,
    toNumber,
  } = useCurrencyInput(transaction?.payload.price.toString() || "");

  const [paymentInGoldBack, setPaymentInGoldBack] = useState(
    transaction?.payload.payment.toString() || ""
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transactionInfo = useMemo(
    () =>
      new TransactionClass(
        rate,
        source,
        "GB",
        toNumber(price),
        Number(paymentInGoldBack)
      ),
    [rate, source, price, paymentInGoldBack]
  );

  const handleChangePrice = (text: string) => {
    setPrice(text);
    if (!text) {
      setPaymentInGoldBack("");
    }
  };

  const handleChangePayment = (text: string) => {
    let formattedText = text.replace(/[^0-9.]/g, "");

    let parts = formattedText.split(".");
    if (parts.length > 2) {
      formattedText = parts[0] + "." + parts[1];
      parts = formattedText.split(".");
    }

    const isDeleting = text.length < paymentInGoldBack.length;

    if (parts.length === 2) {
      const [integerPart, decimalPart] = parts;

      if (isDeleting && decimalPart === "") {
        formattedText = integerPart;
      } else if (!isDeleting && decimalPart === "") {
        formattedText = `${integerPart || "0"}.5`;
      } else {
        let corrected = decimalPart
          .padEnd(2, "0")
          .substring(0, 2)
          .replace(/^./, "5")
          .replace(/.$/, "0");

        if (decimalPart.length === 1) {
          corrected = corrected.substring(0, 1);
        }

        formattedText = `${integerPart}.${corrected}`;
      }
    }

    if (text === "") formattedText = "";
    setPaymentInGoldBack(formattedText);
  };

  const clearState = () => {
    setPrice("");
    setPaymentInGoldBack("");
    onClickClear?.();
  };

  const onSaveTransaction = async (description: string) => {
    try {
      const isEdit = !!transaction;

      setIsLoading(true);

      const currentDate = new Date().toISOString();

      const trimmedSource = source.slice(3);

      const location = await getCurrentLocation();

      const body: CreateTransactionRequest = {
        payloadVersion: isEdit ? transaction.payloadVersion : "1.0",
        deviceId: isEdit ? transaction.deviceId : deviceId,
        transactionDate: isEdit ? transaction.transactionDate : currentDate,
        lastUpdateDate: currentDate,
        description: description,
        payload: {
          rate: rate,
          sourceCurrency: trimmedSource,
          targetCurrency: isEdit ? transaction.payload.targetCurrency : "GB",
          price: transactionInfo.price,
          due: transactionInfo.due.value,
          payment: Number(paymentInGoldBack),
          change: transactionInfo.change.value,
        },
        coord: {
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
        },
      };

      if (!location) {
        delete body.coord;
      }

      if (isEdit) {
        await updateTransaction({
          id: transaction.id,
          ...body,
        });
      } else {
        await createTransaction(body);
      }

      clearState();
      setIsOpenModal(false);

      onCreatedTransaction?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RoundedContainer>
        <ScrollView
          style={{
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 5,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <CurrencySelector
                selectedSource={source}
                setSelectedSource={setSelectedSource}
              />
            </View>
            <InputCalculator
              label="Price"
              inputProps={{
                placeholder: "Enter amount...",
                keyboardType: "numeric",
                value: price,
                onChangeText: handleChangePrice,
              }}
            />
            {price && toNumber(price) > 0 && (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: 47,
                    height: 30,
                    paddingRight: 14,
                    marginBottom: 5,
                  }}
                >
                  <ThemedText
                    style={{
                      color: SecondaryYellow,
                      fontWeight: "400",
                      fontSize: 20,
                    }}
                  >
                    Due
                  </ThemedText>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <GoldMoneyIcon color={SecondaryYellow} />
                    <ThemedText
                      style={{
                        color: SecondaryYellow,
                        fontWeight: "400",
                        fontSize: 20,
                      }}
                    >
                      {transactionInfo.due.value}
                    </ThemedText>
                  </View>
                </View>
                <InputCalculator
                  label="Payment in"
                  labelIcon={<GoldMoneyIcon color={SecondaryYellow} />}
                  inputProps={{
                    placeholder: "Enter amount...",
                    value: paymentInGoldBack,
                    keyboardType: "numeric",
                    onChangeText: handleChangePayment,
                  }}
                />
                {paymentInGoldBack && Number(paymentInGoldBack) > 0 && (
                  <>
                    <CalculatorChangeSection
                      rawChange={transactionInfo.change.value}
                      change={transactionInfo.change.positiveFormattedValue}
                      changeGoldBack={
                        transactionInfo.orObject.orValueGB.formattedValue
                      }
                      restValue={
                        transactionInfo.orObject.orValueRemainder
                          .positiveFormattedValue
                      }
                      isEdit={!!transaction}
                      onPressClear={clearState}
                      onPressSave={() => setIsOpenModal(true)}
                      source={source.slice(3)}
                    />
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
        {showInfo && <CalculatorInfo onClose={onClickCloseInfo} />}
        {isOpenModal && (
          <SaveTransactionModal
            isLoading={isLoading}
            onClose={() => setIsOpenModal(false)}
            onSave={onSaveTransaction}
            descriptionValue={transaction?.description || ""}
          />
        )}
      </RoundedContainer>
    </>
  );
};

export default Calculator;
