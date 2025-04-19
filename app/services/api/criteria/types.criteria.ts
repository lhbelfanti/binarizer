import { CamelizeKeys } from '@services/utils/camelize';

export type MonthData = {
  month: number;
  analyzed_tweets: number;
  total_tweets: number;
};

export type YearData = {
  year: number;
  months: MonthData[];
};

export type SearchCriteria = {
  id: number;
  name: string;
  years: YearData[];
};

export type FetchCriteriaResponseDTO = SearchCriteria[];

export type FetchCriteriaResponse = CamelizeKeys<FetchCriteriaResponseDTO>;
