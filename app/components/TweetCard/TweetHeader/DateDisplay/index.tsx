import { useMemo } from 'react';

import dayjs from 'dayjs';

import { DateDisplayProps } from './types';

const DateDisplay = (props: DateDisplayProps) => {
  const { postedAt } = props;

  const formattedDate = useMemo(() => {
    const parsedDate = dayjs(postedAt);
    return parsedDate.format('MMM DD, YYYY, hh:mm:ss A');
  }, [postedAt]);

  return <div className="text-gray-400 text-xs mt-1">{formattedDate}</div>;
};

export default DateDisplay;
