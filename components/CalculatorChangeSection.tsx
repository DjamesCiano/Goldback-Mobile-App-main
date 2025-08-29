import { FC } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import GoldMoneyIcon from "@/components/icons/GoldMoney";
import CalculatorButton from "./CalculatorButton";
import { toPositive } from "@/utils";

type Props = {
  rawChange: number;
  change: number | string;
  changeGoldBack: number | string;
  source: string;
  restValue: number | string;
  isEdit?: boolean;
  onPressClear: () => void;
  onPressSave: () => void;
};

const CalculatorChangeSection: FC<Props> = ({
  rawChange,
  change,
  changeGoldBack,
  restValue,
  source,
  isEdit = false,
  onPressClear,
  onPressSave,
}) => {
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const PrimaryGreen = useThemeColor({}, "PrimaryGreen");
  const InputFieldPlaceholderColor = useThemeColor({}, "InputFieldPlaceholder");
  const InputFieldText = useThemeColor({}, "InputFieldText");
  const PrimaryRed = useThemeColor({}, "PrimaryRed");

  const isNegative = Number(rawChange) < 0;

  const numberColor = isNegative ? PrimaryRed : PrimaryGreen;

  return (
    <View
      style={{
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingBottom: 5,
          paddingRight: 14,
          borderBottomWidth: 1,
          borderColor: PrimaryYellow,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              ...styles.textUsd,
              color: PrimaryYellow,
            }}
          >
            {isNegative ? "Due" : "Change"}
          </ThemedText>
        </View>
        <View
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              ...styles.containerUsd,
              borderColor: PrimaryYellow,
            }}
          >
            <ThemedText
              style={{
                ...styles.textUsd,
                color: PrimaryYellow,
              }}
            >
              {source}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              ...styles.textUsd,
              color: PrimaryYellow,
            }}
          >
            =
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textUsd,
              color: numberColor,
            }}
          >
            {change}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 14,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <ThemedText
            style={{
              ...styles.textUsd,
              color: InputFieldText,
            }}
          >
            or
          </ThemedText>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <GoldMoneyIcon color={InputFieldPlaceholderColor} />
            <ThemedText
              style={{
                ...styles.textUsd,
                color: numberColor,
              }}
            >
              {toPositive(changeGoldBack)}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              ...styles.textUsd,
              color: InputFieldText,
              paddingLeft: 8,
            }}
          >
            +
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textUsd,
              color: numberColor,
            }}
          >
            {restValue}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          marginTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <CalculatorButton
          onPress={onPressClear}
          label={isEdit ? "CANCEL" : "CLEAR"}
        />
        <CalculatorButton onPress={onPressSave} label="SAVE" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textUsd: {
    fontWeight: "400",
    fontSize: 20,
  },
  containerUsd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    height: 28,
    paddingHorizontal: 8,
    width: 100,
  },
});

export default CalculatorChangeSection;
