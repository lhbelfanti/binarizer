import DraggableElement from '~/components/DraggableElement';
import TweetQuote from '~/components/TweetCard/TweetQuote';

import { TweetProps } from '~/components/TweetCard/types';
import TweetHeader from "~/components/TweetCard/TweetHeader";
import TweetBody from "~/components/TweetCard/TweetBody";

const TweetCard = (props: TweetProps) => {
	const { tweet } = props;
	const { id, author, avatar, postedAt, isAReply, content, images, quote } = tweet;

	return (
		<DraggableElement id={id}>
			<div className="flex gap-2">
				<div className="bg-white rounded-2xl shadow-md p-5 pb-3 w-[360px] mx-auto">
					{ isAReply && (
						<div className="rounded-tl-2xl rounded-br-2xl w-[240px] h-[21px] relative -left-[20px] -top-[20px] pl-3 pt-0.5 bg-blue-400 text-xs">
							This tweet is a reply to another tweet
						</div>
					)}

					<TweetHeader user="User" author={author} avatar={avatar} postedAt={postedAt} />

					<div className="m-8"/>

					<TweetBody content={content} images={images} />
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
		</DraggableElement>
	);
};

export default TweetCard;
