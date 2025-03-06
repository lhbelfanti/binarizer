export interface CriteriaSelectorProps {
  criteria: Criteria[];
}

export interface Criteria {
  name: string;
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

export interface Filters {
  years: number[];
  months: number[];
}

export interface SelectedFilters {
  year: number;
  month: number;
}
