import { Trans } from 'react-i18next';

import Button from '@components/Button';
import { CriteriaByMonth, CriteriaByYear } from '@components/CriteriaSelector/types';
import ProgressBar from '@components/ProgressBar';

import { CriteriaCardProps, CriteriaStats } from './types';

const CriteriaCard = (props: CriteriaCardProps) => {
  const { criteria, selectedYear, selectedMonth } = props;

  const onCriteriaSelected = (): void => {};

  const calculateStats = (): CriteriaStats => {
    let totalTweets: number = 0;
    let analyzedTweets: number = 0;

    criteria.years.map((yearData: CriteriaByYear) => {
      if (selectedYear === 0 || yearData.year === selectedYear) {
        yearData.months.map((monthData: CriteriaByMonth) => {
          if (selectedMonth === 0 || monthData.month === selectedMonth) {
            totalTweets += monthData.totalTweets;
            analyzedTweets += monthData.analyzedTweets;
          }
        });
      }
    });

    return {
      totalTweets,
      analyzedTweets,
    };
  };

  const stats: CriteriaStats = calculateStats();

  return (
    <div className="border border-[#3b82f6] flex flex-col items-center rounded-lg p-4 space-y-2">
      <h4 className="font-semibold">{criteria.name}</h4>
      <ProgressBar total={stats.totalTweets} currentValue={stats.analyzedTweets} style={{ width: 'w-40' }} />
      <Button type="button" style={{ width: 'w-40', padding: 'p-1', textSize: 'text-m' }}>
        <Trans i18nKey="selection_criteria_card_select_button" />
      </Button>
    </div>
  );
};

export default CriteriaCard;
