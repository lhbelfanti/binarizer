import { Criteria } from '@components/CriteriaSelector/types';

import { FetchCriteriaResponse, SearchCriteria } from '@services/api/criteria/types.criteria';

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

/*
export interface CriteriaSelectorProps {
  criteria: Criteria[];
}

export interface Criteria {
  name: string;
  id: number;
  years: CriteriaByYear[];
}

export interface CriteriaByYear {
  year: number;
  months: CriteriaByMonth[];
}

export interface CriteriaByMonth {
  month: number;
  analyzedTweets: number;
  totalTweets: number;
}
 */
