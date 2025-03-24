import { DragEvent, useEffect, useState } from 'react';

import { Trans } from 'react-i18next';

import { LinksFunction, LoaderFunction, LoaderFunctionArgs, redirect } from '@remix-run/node';

import Button from '@components/Button';
import NoMoreTweets from '@components/NoMoreTweets';
import Sections from '@components/Sections';
import TweetCard from '@components/TweetCard';
import { links as XLogoLinks } from '@components/TweetCard/TweetHeader/XLogo';
import { Tweet } from '@components/TweetCard/types';

import { isAuthenticated } from '@services/api/auth/session.server';
import { fetchMoreTweets } from '@services/api/tweets/tweets.client';
import { FetchMoreTweetsBodyDTO, FetchMoreTweetsResponse } from '@services/api/tweets/types.tweets';
import log from '@services/utils/logger';

import { useCriteriaContext } from '../context/CriteriaContext';

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const authenticated: boolean = await isAuthenticated(request, 'app._index.tsx');
  if (!authenticated) {
    log.redirection('/app', '/login');
    return redirect('/login');
  }

  return null;
};

const AppPage = () => {
  const { criteriaID, month, year, totalTweets, analyzedTweets, increaseAnalyzedTweets, tweets, setTweets } =
    useCriteriaContext();

  const [currentTweetIndex, setCurrentTweetIndex] = useState<number>(0);
  const [currentTweet, setCurrentTweet] = useState<Tweet | null>(tweets[0] || null);
  const [isCriteriaCompleted, setIsCriteriaCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTweet(tweets[currentTweetIndex] || null);
  }, [currentTweetIndex, tweets]);

  useEffect(() => {
    setIsCriteriaCompleted(totalTweets === analyzedTweets);
  }, [totalTweets, analyzedTweets]);

  const handleOnDrop = (event: DragEvent<HTMLDivElement>, section: string) => {
    event.preventDefault();

    const tweetID = event.dataTransfer.getData('id');

    switch (section) {
      case 'left':
        // call left section handler
        console.log(`Left handler: tweet: ${tweetID}`);
        break;
      case 'middle':
        // call middle section handler
        console.log(`Middle handler: tweet: ${tweetID}`);
        break;
      case 'right':
        // call right section handler
        console.log(`Right handler: tweet: ${tweetID}`);
        break;
    }

    increaseAnalyzedTweets();
    setCurrentTweetIndex((prevState: number) => prevState + 1);
  };

  const retrieveMoreTweets = async () => {
    setIsLoading(true);

    const fetchMoreTweetsBodyDTO: FetchMoreTweetsBodyDTO = {
      criteria_id: Number(criteriaID),
      month: Number(month),
      year: Number(year),
    };

    try {
      const fetchMoreTweetsResponse: FetchMoreTweetsResponse = await fetchMoreTweets(fetchMoreTweetsBodyDTO);
      setTweets(fetchMoreTweetsResponse.tweets);
      setCurrentTweetIndex(0);
    } catch (error) {
      log.info('FetchMoreTweetsResponse', 'Error getting more tweets');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText: string = isLoading
    ? 'app_get_more_tweets_button_loading'
    : isCriteriaCompleted
      ? 'app_get_more_tweets_button_go_back'
      : 'app_get_more_tweets_button';

  return (
    <Sections handleOnDrop={handleOnDrop}>
      <div className="flex flex-col items-center justify-center h-[350px] w-[700px]">
        {currentTweet ? (
          <TweetCard tweet={currentTweet} />
        ) : (
          <NoMoreTweets isCriteriaCompleted={totalTweets === analyzedTweets} />
        )}
      </div>
      <Button
        disabled={isLoading || (!!currentTweet && !isCriteriaCompleted)}
        to={isCriteriaCompleted ? '/selection' : undefined}
        onClick={!isCriteriaCompleted ? retrieveMoreTweets : undefined}>
        <Trans i18nKey={buttonText} />
      </Button>
    </Sections>
  );
};

export default AppPage;

export const links: LinksFunction = () => {
  return [...XLogoLinks()];
};
