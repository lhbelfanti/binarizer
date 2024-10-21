import { TweetProps } from '~/components/Tweet/types';

const Tweet2 = (props: TweetProps) => {
	const { tweet } = props;

	return (
		<div className="border-4 border-white rounded-lg p-3 bg-[#1a8bc9] shadow-lg">
			<div className="text-white text-l mb-1">
				{tweet.content}
			</div>

			{tweet.images && tweet.images.length > 0 && (
				<div className="flex gap-1">
					{tweet.images.map((image, index) => (
						<img key={index} src={image} alt={`Tweet Image ${index + 1}`}
							 className="rounded-lg max-w-[120px] max-h-[120px] object-cover"/>
					))}
				</div>
			)}

			{tweet.quote && (
				<div className="mt-2 p-3 border-l-8 border-[#c0deed] bg-gray-800 rounded-lg">
					<p className="text-sm text-white mb-1">In response to:</p>
					<Tweet2 tweet={tweet.quote} />
				</div>
			)}
		</div>
	);
};

export default Tweet2;
