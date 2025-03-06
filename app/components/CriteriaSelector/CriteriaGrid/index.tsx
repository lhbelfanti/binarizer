import { Trans } from 'react-i18next';

import CriteriaCard from '@components/CriteriaSelector/CriteriaGrid/CriteriaCard';
import { Criteria } from '@components/CriteriaSelector/types';

import { CriteriaGridProps } from './types';

const CriteriaGrid = (props: CriteriaGridProps) => {
  const { criteria, selectedYear, selectedMonth } = props;

  return (
    <div>
      <h3 className="text-lg font-thin text-gray-300 opacity-80">
        <Trans i18nKey="selection_search_criteria_title" />
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {criteria.map((criteria: Criteria) => (
          <CriteriaCard
            key={criteria.name}
            criteria={criteria}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default CriteriaGrid;
