import { VERDICTS } from '@services/api/tweets/constants';

export type TweetDTO = {
  id: string;
  author: string;
  avatar: string;
  posted_at: string;
  is_a_reply: boolean;
  text_content: string;
  images?: string[];
  quote?: QuoteDTO;
};

export type QuoteDTO = {
  author: string;
  avatar: string;
  posted_at: string;
  is_a_reply: boolean;
  text_content: string;
  images?: string[];
};

export type Tweet = {
  id: string;
  author: string;
  avatar: string;
  postedAt: string;
  isAReply: boolean;
  content: string;
  images?: string[];
  quote?: Quote;
};

export type Quote = {
  author: string;
  avatar: string;
  postedAt: string;
  isAReply: boolean;
  content: string;
  images?: string[];
};

export type FetchTweetsResponseDTO = TweetDTO[];

export type FetchTweetsResponse = Tweet[];

export type CriteriaData = {
  id: number;
  name: string;
  year?: number;
  month?: number;
};

export type TweetsData = {
  data: Tweet[];
  total: number;
  analyzed: number;
};

export type FetchTweetsExtendedResponse = {
  criteria: CriteriaData;
  tweets: TweetsData;
};

export type TweetVerdict = (typeof VERDICTS)[keyof typeof VERDICTS];

export type CategorizeTweetBody = {
  categorization: TweetVerdict;
};
