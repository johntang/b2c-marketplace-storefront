import { TopicProps } from "@/types/topic";
import { sdk } from "../config";

export const getTopics = async () => {
  console.log;
  return sdk.client
    .fetch<{ topics: TopicProps[] }>(`/store/topic`, {
      query: {
        fields: "+id,+name,+image",
      },
      //   next: { revalidate: 300 },
      cache: "no-cache",
    })
    .then(({ topics }) => {
      return topics;
    })
    .catch(() => null);
};
