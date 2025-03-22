import { ReactNode } from 'react';

import { Tweet } from '@components/TweetCard/types';

import { CriteriaData, TweetsData } from '@services/api/tweets/types.tweets.server';

export interface CriteriaContextData {
  criteriaID: number;
  criteriaName: string;
  month: number;
  year: number;
  totalTweets: number;
  analyzedTweets: number;
  increaseAnalyzedTweets: () => void;
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
}

export interface CriteriaProviderProps {
  children: ReactNode;
  criteriaData: CriteriaData;
  tweetsData: TweetsData;
}
