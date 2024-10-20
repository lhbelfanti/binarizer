import React from 'react';
import { TweetProps } from '~/components/tweet/types';

const Tweet = (props: TweetProps) => {
	const { tweet } = props;

	return (
		<div className="border-4 border-white rounded-lg p-3 bg-[#1a8bc9] shadow-lg">
			<div className="text-white text-l">
				{tweet.content}
			</div>

			{tweet.images && tweet.images.length > 0 && (
				<div className="flex gap-1 mt-1">
					{tweet.images.map((image, index) => (
						<img key={index} src={image} alt={`Tweet Image ${index + 1}`}
							 className="rounded-lg max-w-[120px] max-h-[120px] object-cover"/>
					))}
				</div>
			)}

			{tweet.quote && (
				<div className="mt-6 p-4 border-l-8 border-[#c0deed] bg-gray-800 rounded-lg">
					<p className="text-sm text-white mb-2">In response to:</p>
					<Tweet tweet={tweet.quote} />
				</div>
			)}
		</div>
	);
};

export default Tweet;
