import { useThemeColor } from "@/hooks/useThemeColor";
import {
  TextInput as Input,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

export type InputProps = TextInputProps & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const TextInput = ({
  startAdornment,
  containerStyle,
  endAdornment,
  ...rest
}: InputProps) => {
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const Snow = useThemeColor({}, "Snow");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingBottom: 4,
        borderBottomColor: SecondaryYellow,
        borderBottomWidth: 1,
        ...(containerStyle as ViewStyle),
      }}
    >
      {startAdornment && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {startAdornment}
        </View>
      )}
      <Input
        style={{
          color: Snow,
          fontSize: 24,
          fontWeight: "400",
          width: "100%",
        }}
        placeholderTextColor={Snow}
        {...rest}
      />
      {endAdornment && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {endAdornment}
        </View>
      )}
    </View>
  );
};

export default TextInput;
