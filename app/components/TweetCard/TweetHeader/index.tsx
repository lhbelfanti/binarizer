import XLogo from "~/components/TweetCard/XLogo";

import { TweetHeaderProps } from "~/components/TweetCard/TweetHeader/types";
import DateDisplay from "~/components/TweetCard/DateDisplay";

const TweetHeader = (props: TweetHeaderProps) => {
    const { user, author, avatar, postedAt} = props;

    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
                <img
                    src={avatar}
                    alt={author}
                    className="rounded-full w-12 h-12"
                />
                <div className="ml-3">
                    <span className="text-black font-bold block">{user}</span>
                    <span className="text-gray-500 text-sm">{author}</span>
                    <DateDisplay postedAt={postedAt} />
                </div>
            </div>
            <XLogo/>
        </div>
    );
};

export default TweetHeader;