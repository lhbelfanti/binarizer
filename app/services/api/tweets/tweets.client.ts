import example from 'app/data/tweet_examples.json';

import { FetchMoreTweetsBodyDTO, FetchMoreTweetsResponse } from '@services/api/tweets/types.tweets';

export const fetchMoreTweets = async (requestBody: FetchMoreTweetsBodyDTO) => {
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

  // Simulate API call with 200ms of response time
  await new Promise((r) => setTimeout(r, 2000));

  const response: FetchMoreTweetsResponse = {
    tweets: [example.tweet1, example.tweet2, example.tweet3, example.tweet4], // TODO: Convert TweetDTO to Tweet
  };

  console.log('Response', response);

  return response;
};
