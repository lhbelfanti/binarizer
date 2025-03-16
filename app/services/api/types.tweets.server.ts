import { Tweet } from '@components/TweetCard/types';

export type FetchTweetsBodyDTO = {
  criteria_id: number;
  month?: number;
  year?: number;
};

export type FetchTweetsResponseDTO = {
  criteria_id: number;
  month?: number;
  year?: number;
  tweets: Tweet[];
};

export type FetchTweetsResponse = {
  criteria: CriteriaData;
  tweets: TweetsData;
};

export type CriteriaData = {
  id: number;
  name: string;
  month?: number;
  year?: number;
};

export type TweetsData = {
  data: Tweet[];
  total: number;
  analyzed: number;
};
