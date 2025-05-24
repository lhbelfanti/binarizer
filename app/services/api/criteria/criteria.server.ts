import { APIError } from '@services/api/api';
import { serverFetch } from '@services/api/api.server';
import {
  FetchCriteriaInfoResponse,
  FetchCriteriaInfoResponseDTO,
  FetchCriteriaResponse,
  FetchCriteriaResponseDTO,
} from '@services/api/criteria/types';
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

export const fetchCriteriaInfo = async (
  criteriaID: string,
  year: string,
  month: string,
  authToken: string
): Promise<FetchCriteriaInfoResponse> => {
  const endpoint = `criteria/${criteriaID}/summarize/v1?year=${year}&month=${month}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  };

  log.api('fetchCriteriaInfo', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const fetchCriteriaInfoAPIResponse: APIResponse<FetchCriteriaInfoResponseDTO> = await serverFetch(
    endpoint,
    requestOptions
  );
  if (fetchCriteriaInfoAPIResponse.code >= 400 || !fetchCriteriaInfoAPIResponse.data) {
    throw new APIError(fetchCriteriaInfoAPIResponse);
  }

  const fetchCriteriaInfoResponse: FetchCriteriaInfoResponse = recursiveToCamel(fetchCriteriaInfoAPIResponse.data);

  log.api('fetchCriteriaInfo', 'response', { response: fetchCriteriaInfoResponse });

  return fetchCriteriaInfoResponse;
};
