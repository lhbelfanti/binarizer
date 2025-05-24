import { Criteria } from '@components/CriteriaSelector/types';

import { FetchCriteriaResponse, SearchCriteria } from '@services/api/criteria/types';

export const createCriteria = (fetchCriteriaResponse: FetchCriteriaResponse): Criteria[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return fetchCriteriaResponse.map((currentCriteria: SearchCriteria) => {
    const years = currentCriteria.years.map((yearData) => ({
      year: yearData.year,
      months: yearData.months.map((monthData) => ({
        month: monthData.month,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        analyzedTweets: monthData.analyzedTweets,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        totalTweets: monthData.totalTweets,
      })),
    }));

    return {
      name: currentCriteria.name,
      id: currentCriteria.id,
      years,
    };
  });
};
