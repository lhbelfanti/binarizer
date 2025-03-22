import example from 'app/data/tweet_examples.json';

import { FetchTweetsBodyDTO, FetchTweetsResponse } from '@services/api/tweets/types.tweets.server';

export const fetchMoreTweets = async (requestBody: FetchTweetsBodyDTO) => {
  // TODO: implement api call
  /*const endpoint = 'tweets/criteria/v1';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  log.api('fetchTweetsFromCriteria', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const apiResponse: APIResponse = await fetchFromAPI(endpoint, requestOptions);
  if (apiResponse.code >= 400) {
    throw new APIError(apiResponse);
  }

  log.api('fetchTweetsFromCriteria', 'response', { response: apiResponse });

  return apiResponse;
  */

  const response: FetchTweetsResponse = {
    criteria: {
      id: requestBody.criteria_id,
      name: 'Search Criteria Test',
      month: requestBody.month,
      year: requestBody.year,
    },
    tweets: {
      data: [example.tweet1, example.tweet2, example.tweet3, example.tweet4], // TODO: Convert TweetDTO to Tweet
      total: 100,
      analyzed: 93,
    },
  };

  return response;
};
