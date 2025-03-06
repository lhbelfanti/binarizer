import { Trans } from 'react-i18next';

import FilterButton from '@components/CriteriaSelector/FilterButton';
import { YearsFilterProps } from '@components/CriteriaSelector/YearsFilter/types';

const YearsFilter = (props: YearsFilterProps) => {
  const { availableYears, selectedYear, onYearSelected } = props;

  const years = Array.from(
    { length: availableYears[availableYears.length - 1] - availableYears[0] + 1 },
    (_, index) => availableYears[0] + index
  );

  return (
    <div>
      <h3 className="text-lg font-thin text-gray-300 opacity-80">
        <Trans i18nKey="selection_years_title" />
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {years.map((year) => (
          <FilterButton
            key={year}
            disabled={!availableYears.find((availableYear: number): boolean => availableYear === year)}
            selected={selectedYear === year}
            onClick={() => (selectedYear !== year ? onYearSelected(year) : undefined)}>
            {year}
          </FilterButton>
        ))}
        <FilterButton
          key={'all_years'}
          disabled={false}
          selected={selectedYear === 0}
          onClick={() => (selectedYear !== 0 ? onYearSelected(0) : undefined)}>
          <Trans i18nKey="selection_all" />
        </FilterButton>
      </div>
    </div>
  );
};

export default YearsFilter;
