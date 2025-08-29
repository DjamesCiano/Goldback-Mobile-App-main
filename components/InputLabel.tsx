import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

type Props = {
  text: string;
};

const InputLabel = ({ text }: Props) => {
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");

  return (
    <ThemedText
      style={{
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 19.5,
        color: SecondaryYellow,
      }}
    >
      {text}
    </ThemedText>
  );
};

export default InputLabel;
