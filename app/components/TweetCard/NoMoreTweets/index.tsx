import {Trans} from "react-i18next";
import {FaRegArrowAltCircleDown} from "react-icons/fa";


const NoMoreTweets = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card-wrapper h-[250px] w-[500px]">
        <div className="card-content flex flex-col items-center justify-center gap-5 text-center">
          <div className="text-2xl">
            <Trans i18nKey="app_tweet_card_no_more_tweets" />
          </div>
          <div className="text-5xl">
            <FaRegArrowAltCircleDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMoreTweets;
