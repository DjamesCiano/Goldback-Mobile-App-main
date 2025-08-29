import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  onPress: () => void;
  label: string;
};

const CalculatorButton: FC<Props> = ({ onPress, label }) => {
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const InputFieldBG = useThemeColor({}, "InputFieldBG");

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: InputFieldBG,
      }}
      onPress={onPress}
    >
      <ThemedText style={{ ...styles.text, color: SecondaryYellow }}>
        {label}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 25,
    letterSpacing: 1,
  },
});

export default CalculatorButton;
