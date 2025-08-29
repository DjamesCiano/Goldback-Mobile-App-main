import { FC } from "react";
import { StyleSheet, TextInputProps, View, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  label: string;
  labelIcon?: React.ReactNode;
  inputProps?: TextInputProps;
};

const InputCalculator: FC<Props> = ({ label, inputProps, labelIcon }) => {
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const InputFieldText = useThemeColor({}, "InputFieldText");
  const InputFieldPlaceholder = useThemeColor({}, "InputFieldPlaceholder");

  return (
    <View style={{ ...styles.container, borderBottomColor: SecondaryYellow }}>
      <View style={styles.containerLabel}>
        <ThemedText style={{ ...styles.label, color: SecondaryYellow }}>
          {label}
        </ThemedText>
        {labelIcon && labelIcon}
      </View>
      <View style={{ ...styles.containerInput }}>
        <TextInput
          style={{
            color: InputFieldText,
            fontSize: 20,
            fontWeight: "400",
            padding: 0,
            height: 29,
            flex: 1,
            textAlign: "right",
          }}
          placeholderTextColor={InputFieldPlaceholder}
          keyboardType="numeric"
          {...inputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: "400",
  },
  containerLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 5,
    flex: 1,
  },
  containerInput: {
    height: 29,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 100,
    maxWidth: 195,
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#4E4932",
  },
});

export default InputCalculator;
