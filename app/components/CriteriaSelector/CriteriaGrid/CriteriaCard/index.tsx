import { Trans } from 'react-i18next';

import { Form } from '@remix-run/react';

import Button from '@components/Button';
import { CriteriaByMonth, CriteriaByYear } from '@components/CriteriaSelector/types';
import ProgressBar from '@components/ProgressBar';

import { CriteriaCardProps, CriteriaStats } from './types';

const CriteriaCard = (props: CriteriaCardProps) => {
  const { criteria, selectedYear, selectedMonth } = props;

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
  const isCompleted: boolean = stats.totalTweets == stats.analyzedTweets;

  if (stats.totalTweets === 0) {
    // if it is loading do not render to avoid unnecessary flickering
    return null;
  }

  if (isCompleted) {
    return (
      <div className="border border-[#3b82f6] flex flex-col items-center rounded-lg p-4 space-y-2 bg-blue-purple-gradient">
        <h4 className="font-semibold">{criteria.name}</h4>
        <div className="h-full flex flex-col justify-center">
          <p className="text-lg font-medium text-white cursor-default">100%</p>
        </div>
      </div>
    );
  }

  return (
    <Form method="post" action="/selection?index" className="w-full">
      <input type="hidden" name="criteria" value={criteria.id} />
      <input type="hidden" name="year" value={selectedYear} />
      <input type="hidden" name="month" value={selectedMonth} />

      <div className="border border-[#3b82f6] flex flex-col items-center rounded-lg p-4 space-y-2">
        <h4 className="font-semibold">{criteria.name}</h4>
        <ProgressBar total={stats.totalTweets} currentValue={stats.analyzedTweets} style={{ width: 'w-40' }} />
        <Button type="submit" style={{ width: 'w-40', padding: 'p-1', textSize: 'text-m' }}>
          <Trans i18nKey="selection_criteria_card_select_button" />
        </Button>
      </div>
    </Form>
  );
};

export default CriteriaCard;
