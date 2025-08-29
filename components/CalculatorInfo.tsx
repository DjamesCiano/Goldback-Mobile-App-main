import { FC } from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";

import { ThemedText } from "./ThemedText";
import InfoIcon from "@/components/icons/Info";
import CloseIcon from "@/components/icons/Close";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  onClose: () => void;
};

const text = `
Steps:

1. Select the currency being used from the drop down menu.
2. Enter the amount due.
3. The number of Goldbacks due will be shown for the current exchange rate.
4. Enter the number of Goldbacks the customer paid.
5. The customer’s "Change" or additional amount "Due" is then calculated and shown.

-Press the "SAVE" button to save the transaction.

-To clear the screen press the "CLEAR" button.

-To adjust the exchange rate click the gear icon next to rate (The rate can only be adjusted 10% above or below the current exchange rate).

-You can adjust the Payment in Goldbacks to get a new "Change" / "Due".

-If the "Change" / "Due" is greater than one Goldback, then an additional line is added below showing "or" and another way to pay or receive this amount.`;

const CalculatorInfo: FC<Props> = ({ onClose }) => {
  const White = useThemeColor({}, "White");

  return (
<View style={styles.container}>
  <View style={styles.containerIcons}>
    <InfoIcon />
    <Pressable onPress={onClose}>
      <CloseIcon />
    </Pressable>
  </View>
  <View style={[styles.containerContent, { flex: 1 }]}>
    <ThemedText
      style={{
        fontWeight: "500",
        color: White,
        fontSize: 32,
      }}
    >
      Using Calculator
    </ThemedText>
    <ScrollView
      style={{
        ...styles.textContainer,
        paddingBottom: 10,
      }}
    >
      <ThemedText
        style={{
          ...styles.text,
          color: White,
        }}
      >
        {text}
      </ThemedText>
    </ScrollView>
  </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 19,
    left: 16,
    right: 16,
    backgroundColor: "#333333",
    paddingTop: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: "100%",
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerContent: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 6,
    display: "flex",
    flexDirection: "column",
  },
  textContainer: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CalculatorInfo;
