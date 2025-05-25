import { DragEvent, useEffect, useState } from 'react';

import { Trans } from 'react-i18next';

import { LinksFunction, LoaderFunction, LoaderFunctionArgs, data, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Button from '@components/Button';
import NoMoreTweets from '@components/NoMoreTweets';
import Sections from '@components/Sections';
import TweetCard from '@components/TweetCard';
import { links as XLogoLinks } from '@components/TweetCard/TweetHeader/XLogo';

import { getDataFromSession, isAuthenticated } from '@services/api/auth/session.server';
import { SessionData } from '@services/api/auth/types.auth.server';
import { VERDICTS } from '@services/api/tweets/constants';
import { categorizeTweet, fetchMoreTweets } from '@services/api/tweets/tweets.client';
import { FetchTweetsResponse, Tweet, TweetVerdict } from '@services/api/tweets/types';
import log from '@services/utils/logger';

import { useCriteriaContext } from '../context/CriteriaContext';

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const authenticated: boolean = await isAuthenticated(request, 'app._index.tsx');
  if (!authenticated) {
    log.redirection('/app', '/login');
    return redirect('/login');
  }

  const sessionData: SessionData | null = await getDataFromSession(request);
  const authToken: string = sessionData?.token ?? '';

  return data({ authToken });
};

const AppPage = () => {
  const { criteriaID, month, year, totalTweets, analyzedTweets, increaseAnalyzedTweets, tweets, setTweets } =
    useCriteriaContext();
  const { authToken } = useLoaderData<typeof loader>();

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

  const handleOnDrop = async (event: DragEvent<HTMLDivElement>, section: string) => {
    event.preventDefault();

    const tweetID = event.dataTransfer.getData('id');

    switch (section) {
      case 'left':
        await categorizeCurrentTweet(tweetID, VERDICTS.NEGATIVE);
        break;
      case 'middle':
        await categorizeCurrentTweet(tweetID, VERDICTS.INDETERMINATE);
        break;
      case 'right':
        await categorizeCurrentTweet(tweetID, VERDICTS.POSITIVE);
        break;
    }

    increaseAnalyzedTweets();
    setCurrentTweetIndex((prevState: number) => prevState + 1);
  };

  const categorizeCurrentTweet = async (tweetID: string, verdict: TweetVerdict) => {
    try {
      await categorizeTweet(tweetID, verdict, authToken);
    } catch (error) {
      log.info('categorizeTweet', 'Error categorizing tweet');
    }
  };

  const retrieveMoreTweets = async () => {
    setIsLoading(true);

    try {
      const fetchMoreTweetsResponse: FetchTweetsResponse = await fetchMoreTweets(criteriaID, year, month, authToken);
      setTweets(fetchMoreTweetsResponse);
      setCurrentTweetIndex(0);
    } catch (error) {
      log.info('fetchMoreTweets', 'Error getting more tweets');
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
