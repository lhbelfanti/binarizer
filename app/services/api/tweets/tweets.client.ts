import { APIError } from '@services/api/api';
import { clientFetch } from '@services/api/api.client';
import { TWEETS_QUANTITY } from '@services/api/tweets/constants';
import {
  CategorizeTweetBody,
  FetchTweetsResponse,
  FetchTweetsResponseDTO,
  TweetVerdict,
} from '@services/api/tweets/types';
import { convertToCamel } from '@services/api/tweets/utils';
import { APIResponse } from '@services/api/types.api';
import log from '@services/utils/logger';

export const fetchMoreTweets = async (
  criteriaID: number,
  year: number,
  month: number,
  authToken: string
): Promise<FetchTweetsResponse> => {
  const endpoint = `criteria/${criteriaID}/tweets/v1?year=${year}&month=${month}&limit=${TWEETS_QUANTITY}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  };
  log.api('fetchMoreTweets', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const fetchTweetsAPIResponse: APIResponse<FetchTweetsResponseDTO> = await clientFetch(endpoint, requestOptions);
  if (fetchTweetsAPIResponse.code >= 400 || !fetchTweetsAPIResponse.data) {
    throw new APIError(fetchTweetsAPIResponse);
  }

  const fetchTweetsResponse: FetchTweetsResponse = convertToCamel(fetchTweetsAPIResponse.data!);

  log.api('fetchMoreTweets', 'response', { response: fetchTweetsResponse });

  return fetchTweetsResponse;
};

export const categorizeTweet = async (
  tweetID: string,
  verdict: TweetVerdict,
  authToken: string
): Promise<APIResponse> => {
  const endpoint = `tweets/${tweetID}/categorize/v1`;
  const body: CategorizeTweetBody = {
    categorization: verdict,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
    body: JSON.stringify(body),
  };
  log.api('categorizeTweet', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const categorizeTweetAPIResponse: APIResponse = await clientFetch(endpoint, requestOptions);
  if (categorizeTweetAPIResponse.code >= 400 || !categorizeTweetAPIResponse.data) {
    throw new APIError(categorizeTweetAPIResponse);
  }
  log.api('categorizeTweet', 'response', { response: categorizeTweetAPIResponse });

  return categorizeTweetAPIResponse;
};
