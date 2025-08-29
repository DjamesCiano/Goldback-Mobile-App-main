import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import RenderHTML from "react-native-render-html";

import MainHeader from "@/components/headers/MainHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import ArrowBackIcon from "@/components/icons/ArrowBack";
import { useGlobalState } from "@/store/useGlobalState";

export default function NewsDetail() {
  const SoftAsh = useThemeColor({}, "SoftAsh");
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");

  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = Dimensions.get("window");

  const selectedNew = useGlobalState((state) =>
    state.news.find((n) => n.id === id)
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={['top']}
    >
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <MainHeader />
        <View style={styles.containerButtonBack}>
          <Link href="/(tabs)/(news)/" asChild>
            <Pressable>
              <ArrowBackIcon />
            </Pressable>
          </Link>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.containerDetails}>
            <ThemedText
              style={{
                ...styles.title,
                color: PrimaryYellow,
              }}
            >
              {selectedNew?.title}
            </ThemedText>
            {/*             <View style={styles.containerImage}>
              <Image
                source={{ uri: selectedNew?.imgUrl }}
                style={{ width: "100%", height: 200, borderRadius: 20 }}
              />
            </View> */}
            <View
              style={{
                flex: 1,
              }}
            >
              <RenderHTML
                contentWidth={width - 40}
                tagsStyles={
                  {
                    p: { color: SoftAsh },
                    h1: { color: SoftAsh },
                    h2: { color: SoftAsh },
                    h3: { color: SoftAsh },
                    h4: { color: SoftAsh },
                    h5: { color: SoftAsh },
                    h6: { color: SoftAsh },
                    strong: { color: SoftAsh },
                    em: { color: SoftAsh },
                    span: { color: SoftAsh },
                    li: { color: SoftAsh },
                    a: { color: SoftAsh },
                  } as any
                }
                source={{ html: selectedNew?.description || "" }}
              />
            </View>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerButtonBack: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  containerDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 21.52,
  },
  containerImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
