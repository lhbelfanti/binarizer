import StatsBlock from "app/components/AnalysisOverview/StatsBlock";

import { AnalysisOverviewProps } from "~/components/AnalysisOverview/types";

const AnalysisOverview = (props: AnalysisOverviewProps) => {
    const { currentCriteria, totalCriteria, criteriaAnalyzed, totalTweets, tweetsAnalyzed } = props;

    return (
        <div className="flex items-center justify-center gap-8 w-[905px]">
            <StatsBlock topic={"Criteria"} total={totalCriteria} analyzed={criteriaAnalyzed}/>

            <div className="flex flex-col items-center text-white text-sm border-l border-r border-gray-400 pl-10 pr-10 border-dashed">
                <span>Current Criteria: </span>
                <span className="font-semibold">&quot;{currentCriteria}&quot;</span>
            </div>

            <StatsBlock topic={"Tweets"} total={totalTweets} analyzed={tweetsAnalyzed}/>
        </div>
    );
};


export default AnalysisOverview;