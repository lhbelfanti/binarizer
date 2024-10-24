import Carousel from 'app/components/Carousel';
import React from 'react';
import TextHighlighter from '~/components/TextHighlighter';
import TweetQuote from '~/components/TweetCard/TweetQuote';
import { TweetProps } from '~/components/TweetCard/types';
import XLogo from '~/components/XLogo/';

const TweetCard = (props: TweetProps) => {
	const { tweet } = props;
	const { isAReply, content, images, quote } = tweet;

	return (
		<div className="flex gap-2">
			<div className="bg-white rounded-2xl shadow-md p-5 pb-3 w-[360px] mx-auto">
				{ isAReply && (
					<div className="rounded-tl-2xl rounded-br-2xl w-[240px] h-[21px] relative -left-[20px] -top-[20px] pl-3 pt-0.5 bg-blue-400 text-xs">
						This tweet is a reply to another tweet
					</div>
				)}

				<div className="flex justify-between items-center mb-3">
					<div className="flex items-center">
						<img
							src="https://via.placeholder.com/48"
							alt="Profile"
							className="rounded-full w-12 h-12"
						/>
						<div className="ml-3">
							<span className="text-black font-bold block">Anonymous User</span>
							<span className="text-gray-500 text-sm">@anonymous_user</span>
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
			{ !!quote && (
				<div className="flex items-center gap-2">
					<div className="bg-blue-400 text-white p-0.5 rounded-full h-[21px] w-[100px] text-center text-xs">
						Quotes &gt;
					</div>
					<TweetQuote quote={ quote }/>
				</div>
			) }
		</div>
	);
};

export default TweetCard;
