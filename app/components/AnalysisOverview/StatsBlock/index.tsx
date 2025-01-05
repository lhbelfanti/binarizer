import { SlArrowRightCircle } from "react-icons/sl";

import { StatsBlockProps } from "~/components/AnalysisOverview/StatsBlock/types";

const StatsBlock = (props: StatsBlockProps) => {
    const { topic, total, analyzed } = props;

    const result: number = total - analyzed;

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-center text-xs font-semibold">
                <span>{topic} </span>
                <span>Overview</span>
            </div>
            <SlArrowRightCircle className="text-gray-400"/>
            <div className="flex flex-col items-end text-white text-[10px] max-h-[90px] overflow-hidden space-y-0.5">

                <div className="flex items-end gap-1">
                    <span className="flex-shrink-0 text-[10px]">Total:</span>
                    <span className="text-[10px]">{total}</span>
                </div>
                <div className="flex items-end gap-1">
                    <span className="flex-shrink-0 text-[10px]">-</span>
                    <span className="flex-shrink-0 text-[10px]">Analyzed:</span>
                    <span className="text-[10px]">{analyzed}</span>
                </div>
                <div className="flex items-end w-full border-b border-white my-0.5"></div>
                <div className="flex items-end gap-1">
                    <span className="flex-shrink-0 text-[10px]">Pending:</span>
                    <span className="text-[10px]">{result}</span>
                </div>
            </div>
        </div>
    );
};

export default StatsBlock;