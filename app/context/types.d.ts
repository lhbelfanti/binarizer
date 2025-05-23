import { ReactNode } from 'react';

import { CriteriaData, Tweet, TweetsData } from '@services/api/tweets/types';

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
