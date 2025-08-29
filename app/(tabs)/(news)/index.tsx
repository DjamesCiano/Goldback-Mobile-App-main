import { useEffect } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import MainHeader from "@/components/headers/MainHeader";
import { ThemedView } from "@/components/ThemedView";
import CardNews from "@/components/CardNews";
import newsService from "@/services/newsService";
import { useGlobalState } from "@/store/useGlobalState";

const NewsScreen = () => {
  const { getNews } = newsService();
  const news = useGlobalState((state) => state.news);
  const setNews = useGlobalState((state) => state.setNews);

  const setGlobalLoader = useGlobalState((state) => state.setGlobalLoader);

  const getNewsData = async () => {
    try {
      setGlobalLoader(true);
      if (news.length > 0) return;
      const response = await getNews();
      setNews(response);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoader(false);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

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
        <MainHeader title="Latest News" />
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          style={styles.containerList}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#BBBBBB40",
                marginBottom: 16,
              }}
            />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#BBBBBB40",
                marginBottom: 16,
              }}
            />
          )}
          renderItem={({ item }) => {
            return (
              <Link href={`/(tabs)/(news)/${item.id}`} asChild>
                <Pressable>
                  <CardNews
                    description={item.title}
                    imgUrl={item.imgUrl}
                    date={item.pubDate}
                  />
                </Pressable>
              </Link>
            );
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default NewsScreen;
