import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { DateDisplayProps } from './types';

const DateDisplay = (props: DateDisplayProps) => {
  const { postedAt } = props;
  const { i18n } = useTranslation();

  const formattedDate = useMemo(() => {
    const currentLanguage = i18n.language;

    const parsedDate = new Date(postedAt);
    return parsedDate.toLocaleString(currentLanguage, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }, [postedAt, i18n.language]);

  return <div className="text-gray-400 text-xs mt-1">{formattedDate}</div>;
};

export default DateDisplay;
