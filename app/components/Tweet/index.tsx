import Carousel from 'app/components/Carousel';
import TextHighlighter from '~/components/TextHighlighter';
import { TweetProps } from '~/components/Tweet/types';
import XLogo from '~/components/XLogo/';

const Tweet = (props: TweetProps) => {
	const { tweet } = props;

	return (
		<div className="bg-white rounded-2xl shadow-md p-5 pb-3 w-[360px] mx-auto">
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
				<TextHighlighter text={ tweet.content }/>

				<div className="m-8"/>

				{ tweet.images && tweet.images.length > 0 && (
					<Carousel images={ tweet.images }></Carousel>
				) }
			</div>
		</div>
	);
};

export default Tweet;
