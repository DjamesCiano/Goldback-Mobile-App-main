import { StyleSheet, View } from "react-native";
import InputLabel from "./InputLabel";
import TextInput, { type InputProps } from "./TextInput";

type Props = {
  label: string;
  inputProps?: InputProps;
};

const TextField = ({ label, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <InputLabel text={label} />
      <TextInput {...props.inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

export default TextField;
