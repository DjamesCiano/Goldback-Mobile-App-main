import useAxios from "@/hooks/useAxios";
import { New } from "@/models/New";

const newsService = () => {
  const axiosInstance = useAxios();

  const getNews = async (): Promise<New[]> => {
    const response = await axiosInstance.get<{
      rss: {
        channel: any[];
      };
    }>("/GBCalculatorNewsFeed");

    console.log('getNews', response.data);
    let ndx = -1;
    let itemId = "";

    if (response.data.rss.channel.length > 0) {
        const items: New[] = response.data.rss.channel[0].item
        .filter((item: any) => {
          try {
            ndx++;
            // Attempt to access properties to ensure item is valid
            itemId = item.guid[0]._;
            item.title[0];
            item["content:encoded"] ? item["content:encoded"][0] : item.description[0];
            item.link[0];
            item.pubDate[0];
            item["media:content"][0].$.url;
            return true;
          } catch (error) {
            console.log(`|| ** ${ndx} itemId: ${itemId}`);
            // console.error("Skipping item due to error:", error);
            return false;
          }
        })
        .map((item: any) => {
          var itemPayload: any = {
            id: item.guid[0]._,
            title: item.title[0],
            description: item["content:encoded"]
              ? item["content:encoded"][0]
              : item.description[0],
            link: item.link[0],
            pubDate: item.pubDate[0],
            imgUrl: item["media:content"][0].$.url,
          };
      
          return itemPayload;
        });

      return items;
    }

    return [];
  };

  return {
    getNews,
  };
};

export default newsService;
