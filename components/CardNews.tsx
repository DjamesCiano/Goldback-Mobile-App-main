import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { parse, format } from "date-fns";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  description: string;
  imgUrl: string;
  date: string;
};

const getFormattedDate = (date: string) => {
  const parsedDate = parse(date, "EEE, dd MMM yyyy HH:mm:ss xxxx", new Date());
  return format(parsedDate, "EEE, dd MMM yyyy");
};

const CardNews: FC<Props> = ({ description, imgUrl, date }) => {
  const DarkYellow = useThemeColor({}, "DarkYellow");
  const White = useThemeColor({}, "White");

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <ThemedText
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: DarkYellow,
          }}
        >
          {description}
        </ThemedText>
        <ThemedText
          style={{
            fontWeight: "400",
            fontSize: 14,
            color: White,
            fontFamily: "Arial",
          }}
        >
          {getFormattedDate(date)}
        </ThemedText>
      </View>
      <View style={styles.containerImage}>
        <Image
          source={{ uri: imgUrl }}
          style={{ width: 100, height: 100, borderRadius: 12 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  containerContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  },
  containerImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});

export default CardNews;
