import { Trans } from "react-i18next";

import TweetHeader from "@components/TweetCard/TweetHeader";
import TweetBody from "@components/TweetCard/TweetBody";

import { TweetQuoteProps } from './types';

const TweetQuote = (props: TweetQuoteProps) => {
	const { quote } = props;
	const { author, avatar, postedAt, isAReply, content, images } = quote;

	return (
		<div className="bg-white rounded-2xl shadow-md p-2 w-[360px] mx-auto">
			{ isAReply && (
				<div className="rounded-tl-2xl rounded-br-2xl h-[21px] relative -left-[8px] -top-[8px] pl-3 pt-0.5 bg-[#c5c5c5] text-xs">
					<Trans i18nKey="app_tweet_card_quote_is_a_reply" />
				</div>
			)}
			<div className="p-3 pb-1 border-2 border-[#c5c5c5] rounded-2xl">
				<div
					className="rounded-tl-2xl rounded-br-2xl w-[105px] h-[21px] relative -left-[14px] -top-[14px] pl-3 pt-0.5 bg-[#c5c5c5] text-xs">
					<Trans i18nKey="app_tweet_card_quoted_tweet" />
				</div>

				<TweetHeader user="Quoted User" author={author} avatar={avatar} postedAt={postedAt} />

				<div className="m-8"/>

				<TweetBody content={content} images={images} />
			</div>
		</div>
	);
};

export default TweetQuote;