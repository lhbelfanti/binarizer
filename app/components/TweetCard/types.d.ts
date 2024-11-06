import { Quote } from '~/components/TweetCard/TweetQuote/types';

export interface TweetProps {
	tweet: Tweet
}

export interface Tweet {
	id: string;
	isAReply: boolean;
	content: string;
	images?: string[];
	quote?: Quote;
}