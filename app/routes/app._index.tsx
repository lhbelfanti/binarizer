import {DragEvent, useEffect, useState} from 'react';

import { Trans } from 'react-i18next';

import { LinksFunction, LoaderFunction, LoaderFunctionArgs, redirect } from '@remix-run/node';

import variables from 'app/data/variables.json';

import Button from '@components/Button';
import Section from '@components/Section';
import TweetCard from '@components/TweetCard';
import { links as XLogoLinks } from '@components/TweetCard/TweetHeader/XLogo';

import { isAuthenticated } from '@services/api/session.server';
import log from '@services/utils/logger';

import { useCriteriaContext } from '../context/CriteriaContext';
import {Tweet} from "@components/TweetCard/types";
import NoMoreTweets from "@components/NoMoreTweets";

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
  const sections = variables.page.app.sections;
  const { tweets, analyzedTweets, totalTweets, increaseAnalyzedTweets } = useCriteriaContext();

  const [currentTweetIndex, setCurrentTweetIndex] = useState<number>(0);
  const [currentTweet, setCurrentTweet] = useState<Tweet | null>(tweets[0] || null);

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

  useEffect(() => {
    setCurrentTweet(tweets[currentTweetIndex] || null);
  }, [currentTweetIndex, tweets]);

  return (
    <div className="flex gap-4 p-1 h-[90vh]">
      <Section
        description={sections.left?.description}
        extra={sections.left?.extra}
        points={sections.left?.points}
        borderColor="#e63b7a"
        onHoverBackgroundColor="#f9d3e0"
        onHoverTextColor="#e63b7a"
        width="w-[300px]"
        height="h-full"
        onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'left')}
      />

      <div className="flex flex-col justify-between items-center w-full">
        <Section
          description={sections.middle?.description}
          extra={sections.middle?.extra}
          points={sections.middle?.points}
          borderColor="#a16bce"
          onHoverBackgroundColor="#e6d8f3"
          onHoverTextColor="#a16bce"
          width="w-full"
          height="h-auto"
          onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'middle')}
        />

        <div className="flex flex-col items-center justify-center h-[350px] w-[700px]">
          { currentTweet ?
            <TweetCard tweet={currentTweet} /> :
            <NoMoreTweets isCriteriaCompleted={totalTweets === analyzedTweets}/>
          }
        </div>
        <Button disabled={false} to={totalTweets === analyzedTweets ? '/selection' : undefined}>
          <Trans i18nKey="app_get_more_tweets_button" />
        </Button>
      </div>

      <Section
        description={sections.right?.description}
        extra={sections.right?.extra}
        points={sections.right?.points}
        borderColor="#4f7b29"
        onHoverBackgroundColor="#e6ffcc"
        onHoverTextColor="#4f7b29"
        width="w-[300px]"
        height="h-full"
        onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'right')}
      />
    </div>
  );
};

export default AppPage;

export const links: LinksFunction = () => {
  return [...XLogoLinks()];
};
