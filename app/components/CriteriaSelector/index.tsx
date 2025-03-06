import { useState } from 'react';

import CriteriaGrid from '@components/CriteriaSelector/CriteriaGrid';
import MonthsFilter from '@components/CriteriaSelector/MonthsFilter';
import YearsFilter from '@components/CriteriaSelector/YearsFilter';

import { useFilters } from './hooks';
import { CriteriaSelectorProps } from './types';

const CriteriaSelector = (props: CriteriaSelectorProps) => {
  const { criteria } = props;
  const { available, selected, filteredCriteria, selectYear, selectMonth, getAvailableMonths } = useFilters(criteria);

  const [availableMonths, setAvailableMonths] = useState<number[]>(available.months);

  const onYearSelected = (year: number) => {
    selectYear(year);
    setAvailableMonths(getAvailableMonths(year));
  };

  return (
    <div className="space-y-8">
      <YearsFilter availableYears={available.years} selectedYear={selected.year} onYearSelected={onYearSelected} />

      <MonthsFilter
        availableMonths={availableMonths}
        selectedMonth={selected.month}
        onMonthSelected={(month: number) => {
          selectMonth(month);
        }}
      />

      <CriteriaGrid criteria={filteredCriteria} selectedYear={selected.year} selectedMonth={selected.month} />
    </div>
  );
};

export default CriteriaSelector;
