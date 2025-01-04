import { useMemo } from "react";

import { DateDisplayProps } from "~/components/TweetCard/DateDisplay/types";

const DateDisplay = (props: DateDisplayProps) => {
    const { postedAt } = props;

    const formattedDate = useMemo(() => {
        const parsedDate = new Date(postedAt);
        return parsedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    }, [postedAt]);

    return (
        <div className="text-gray-400 text-xs mt-1">
            {formattedDate}
        </div>
    );
};

export default DateDisplay;