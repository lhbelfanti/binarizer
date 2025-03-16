import {Trans} from "react-i18next";
import {FaRegArrowAltCircleDown} from "react-icons/fa";
import {NoMoreTweetsProps} from "./types";

const NoMoreTweets = (props: NoMoreTweetsProps) => {
  const { isCriteriaCompleted } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card-wrapper h-[250px] w-[500px]">
        <div className="card-content flex flex-col items-center justify-center gap-5 text-center">
          <div className="text-2xl">
            <Trans
              i18nKey={
                isCriteriaCompleted
                  ? "app_tweet_card_no_more_tweets"
                  : "app_tweet_card_no_more_tweets_retrieve_more"
              }
              components={[
                <span key="selection-page" className="leading-tight font-bold text-transparent bg-clip-text bg-blue-purple-gradient" />,
              ]}
            />
          </div>
          <div className="text-5xl animate-point font-bold text-[#8A5CF6] hover:text-[#3B83F6]">
            <FaRegArrowAltCircleDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMoreTweets;
