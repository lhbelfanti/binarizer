import { Tweet, TweetDTO } from '@services/api/tweets/types';

export const convertToCamel = (tweetsDTO: TweetDTO[]): Tweet[] => {
  return tweetsDTO.map(
    (tweetDTO: TweetDTO): Tweet => ({
      id: tweetDTO.id,
      author: tweetDTO.author,
      avatar: tweetDTO.avatar,
      postedAt: tweetDTO.posted_at,
      isAReply: tweetDTO.is_a_reply,
      content: tweetDTO.text_content,
      images: tweetDTO.images ? tweetDTO.images : undefined,
      quote: !tweetDTO.quote
        ? undefined
        : {
            author: tweetDTO.quote.author,
            avatar: tweetDTO.quote.avatar,
            postedAt: tweetDTO.quote.posted_at,
            isAReply: tweetDTO.quote.is_a_reply,
            content: tweetDTO.quote.text_content,
            images: tweetDTO.quote.images ? tweetDTO.quote.images : undefined,
          },
    })
  );
};
