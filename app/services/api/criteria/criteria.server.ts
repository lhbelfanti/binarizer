import { APIError } from '@services/api/api';
import { serverFetch } from '@services/api/api.server';
import { FetchCriteriaResponse, FetchCriteriaResponseDTO } from '@services/api/criteria/types.criteria';
import { APIResponse } from '@services/api/types.api';
import { recursiveToCamel } from '@services/utils/camelize';
import log from '@services/utils/logger';

export const fetchCriteria = async (authToken: string): Promise<FetchCriteriaResponse> => {
  const endpoint = 'criteria/v1';
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  };
  log.api('fetchCriteria', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const fetchCriteriaAPIResponse: APIResponse<FetchCriteriaResponseDTO> = await serverFetch(endpoint, requestOptions);
  if (fetchCriteriaAPIResponse.code >= 400 || !fetchCriteriaAPIResponse.data) {
    throw new APIError(fetchCriteriaAPIResponse);
  }

  const fetchCriteriaResponse: FetchCriteriaResponse = recursiveToCamel(fetchCriteriaAPIResponse.data);

  log.api('fetchCriteria', 'response', { response: fetchCriteriaResponse });

  return fetchCriteriaResponse;
};
