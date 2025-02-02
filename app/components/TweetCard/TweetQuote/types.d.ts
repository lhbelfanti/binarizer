export interface TweetQuoteProps {
  quote: Quote;
}

export interface Quote {
  author: string;
  avatar: string;
  postedAt: string;
  isAReply: boolean;
  content: string;
  images?: string[];
}
