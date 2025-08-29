import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

type Props = React.PropsWithChildren;

const RoundedContainer = ({ children }: Props) => {
  return (
    <LinearGradient
      colors={["#08090C", "#403E3C"]}
      start={{ x: 0.2, y: 0.1 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.gradientContainer}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: "relative",
  },
});

export default RoundedContainer;
