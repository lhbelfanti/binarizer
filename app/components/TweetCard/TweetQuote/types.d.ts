export interface TweetQuoteProps {
	quote: Quote;
}

export interface Quote {
	isAReply: boolean;
	content: string;
	images?: string[];
}