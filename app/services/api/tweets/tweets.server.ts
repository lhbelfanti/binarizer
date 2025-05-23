import { APIError } from '@services/api/api';
import { serverFetch } from '@services/api/api.server';
import { TWEETS_QUANTITY } from '@services/api/tweets/constants';
import { FetchTweetsResponse, FetchTweetsResponseDTO } from '@services/api/tweets/types';
import { convertToCamel } from '@services/api/tweets/utils';
import { APIResponse } from '@services/api/types.api';
import log from '@services/utils/logger';

export const fetchTweets = async (
  criteriaID: string,
  year: string,
  month: string,
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
  log.api('fetchTweets', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const fetchTweetsAPIResponse: APIResponse<FetchTweetsResponseDTO> = await serverFetch(endpoint, requestOptions);
  if (fetchTweetsAPIResponse.code >= 400 || !fetchTweetsAPIResponse.data) {
    throw new APIError(fetchTweetsAPIResponse);
  }

  const fetchTweetsResponse: FetchTweetsResponse = convertToCamel(fetchTweetsAPIResponse.data!);

  log.api('fetchTweets', 'response', { response: fetchTweetsResponse });

  return fetchTweetsResponse;
};
