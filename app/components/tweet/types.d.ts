export interface TweetProps {
	tweet: Tweet
}

export interface Tweet {
	content: string;
	images?: string[];
	quote?: Quote;
}

export interface Quote {
	content: string;
	images?: string[];
}