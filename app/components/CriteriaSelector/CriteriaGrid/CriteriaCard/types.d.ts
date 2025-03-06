import { Criteria } from '@components/CriteriaSelector/types';

export interface CriteriaCardProps {
  criteria: Criteria;
  selectedYear: number;
  selectedMonth: number;
}

export interface CriteriaStats {
  totalTweets: number;
  analyzedTweets: number;
}
