import { Trans } from 'react-i18next';

import FilterButton from '@components/CriteriaSelector/FilterButton';
import { MonthsFilterProps } from '@components/CriteriaSelector/MonthsFilter/types';

const MonthsFilter = (props: MonthsFilterProps) => {
  const { availableMonths, selectedMonth, onMonthSelected } = props;

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <h3 className="text-lg font-thin text-gray-300 opacity-80">
        <Trans i18nKey="selection_months_title" />
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {months.map((month: number) => (
          <FilterButton
            key={month}
            disabled={!availableMonths.find((availableMonth: number): boolean => availableMonth === month)}
            selected={selectedMonth === month}
            onClick={() => (selectedMonth !== month ? onMonthSelected(month) : undefined)}>
            <Trans i18nKey={`selection_month_${month}`} />
          </FilterButton>
        ))}
        <FilterButton
          key={'all_months'}
          disabled={false}
          selected={selectedMonth === 0}
          onClick={() => (selectedMonth !== 0 ? onMonthSelected(0) : undefined)}>
          <Trans i18nKey="selection_all" />
        </FilterButton>
      </div>
    </div>
  );
};

export default MonthsFilter;
