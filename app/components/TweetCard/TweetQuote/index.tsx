import React from 'react';
import Carousel from '~/components/Carousel';
import TextHighlighter from '~/components/TextHighlighter';
import { TweetQuoteProps } from '~/components/TweetCard/TweetQuote/types';
import XLogo from '~/components/XLogo';

const TweetQuote = (props: TweetQuoteProps) => {
	const { quote } = props;
	const { isAReply, content, images } = quote;

	return (
		<div className="bg-white rounded-2xl shadow-md p-2 w-[360px] mx-auto">
			{ isAReply && (
				<div className="rounded-tl-2xl rounded-br-2xl w-[245px] h-[21px] relative -left-[8px] -top-[8px] pl-3 pt-0.5 bg-[#c5c5c5] text-xs">
					This quoted tweet is a reply to another tweet
				</div>
			)}
			<div className="p-3 pb-1 border-2 border-[#c5c5c5] rounded-2xl">
				<div
					className="rounded-tl-2xl rounded-br-2xl w-[105px] h-[21px] relative -left-[14px] -top-[14px] pl-3 pt-0.5 bg-[#c5c5c5] text-xs">
					Quoted tweet
				</div>
				<div className="flex justify-between items-center mb-3">
					<div className="flex items-center">
						<img
							src="https://via.placeholder.com/48"
							alt="Profile"
							className="rounded-full w-12 h-12"
						/>
						<div className="ml-3">
							<span className="text-black font-bold block">Quoted Anonymous User</span>
							<span className="text-gray-500 text-sm">@quoted_anonymous_user</span>
						</div>
					</div>
					<XLogo/>
				</div>

				<div className="m-8"/>

				<div className="mb-3">
					<TextHighlighter text={ content }/>

					<div className="m-8"/>

					{ images && images.length > 0 && (
						<Carousel images={ images }></Carousel>
					) }
				</div>
			</div>
		</div>
	)
}

export default TweetQuote;