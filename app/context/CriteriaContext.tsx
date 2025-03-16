import { createContext, useContext, useState } from 'react';

import { Tweet } from '@components/TweetCard/types';

import { CriteriaContextData, CriteriaProviderProps } from './types';

const CriteriaContext = createContext<CriteriaContextData>({
  criteriaID: -1,
  criteriaName: '',
  month: -1,
  year: -1,
  totalTweets: -1,
  analyzedTweets: -1,
  increaseAnalyzedTweets: () => {},
  tweets: [],
  setTweets: () => {},
});

export const useCriteriaContext = (): CriteriaContextData => useContext(CriteriaContext);

const CriteriaProvider = (props: CriteriaProviderProps) => {
  const { children, criteriaData, tweetsData } = props;

  const [criteriaID] = useState<number>(criteriaData.id || -1);
  const [criteriaName] = useState<string>(criteriaData.name || '');
  const [month] = useState<number>(criteriaData.month || -1);
  const [year] = useState<number>(criteriaData.year || -1);
  const [totalTweets] = useState<number>(tweetsData.total || 0);
  const [analyzedTweets, setAnalyzedTweets] = useState<number>(tweetsData.analyzed || 0);
  const [tweets, setTweets] = useState<Tweet[]>(tweetsData.data || []);

  const increaseAnalyzedTweets = () => {
    setAnalyzedTweets((prev) => prev + 1);
  };

  const contextValue: CriteriaContextData = {
    criteriaID,
    criteriaName,
    month,
    year,
    totalTweets,
    analyzedTweets,
    increaseAnalyzedTweets,
    tweets,
    setTweets,
  };

  return <CriteriaContext.Provider value={contextValue}>{children}</CriteriaContext.Provider>;
};

export default CriteriaProvider;
