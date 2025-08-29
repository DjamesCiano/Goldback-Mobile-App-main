import { FC } from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = PressableProps & {
  label: string;
  startIcon?: JSX.Element;
};

const Button: FC<Props> = ({ label, startIcon, ...others }) => {
  const MainBGColor = useThemeColor({}, "MainBGColor");
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const Snow = useThemeColor({}, "Snow");

  return (
    <Pressable
      style={{
        ...styles.container,
        borderColor: SecondaryYellow,
        backgroundColor: MainBGColor,
      }}
      {...others}
    >
      {startIcon && (
        <View style={{ width: 20.5, height: 20.5 }}>{startIcon}</View>
      )}
      <ThemedText
        style={{
          fontWeight: "500",
          fontSize: 15,
          color: Snow,
        }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 11,
    gap: 10,
  },
});

export default Button;
