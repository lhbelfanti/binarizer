import DateDisplay from '@components/TweetCard/TweetHeader/DateDisplay';
import XLogo from '@components/TweetCard/TweetHeader/XLogo';

import { TweetHeaderProps } from './types';

const TweetHeader = (props: TweetHeaderProps) => {
  const { user, statusID, author, avatar, postedAt } = props;

  const tweetLink = `https://x.com/${author.slice(1)}/status/${statusID}`;

  return (
    <div className="flex justify-between items-center mb-3">
      <a href={`${tweetLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center" draggable={false}>
        <img src={avatar} alt={author} className="rounded-full w-12 h-12" draggable={false} />
        <div className="ml-3">
          <span className="text-black font-bold block">{user}</span>
          <span className="text-gray-500 text-sm">{author}</span>
          <DateDisplay postedAt={postedAt} />
        </div>
      </a>
      <XLogo />
    </div>
  );
};

export default TweetHeader;
