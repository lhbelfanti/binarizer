import TextHighlighter from "~/components/TweetCard/TextHighlighter";
import Carousel from "~/components/Carousel";

import { TweetBodyProps } from "~/components/TweetCard/TweetBody/types";

const TweetBody = (props: TweetBodyProps) => {
    const { content, images } = props;

    return (
        <div className="mb-3">
            <TextHighlighter text={content}/>

            <div className="m-8"/>

            {images && images.length > 0 && (
                <Carousel images={images}></Carousel>
            )}
        </div>
    );
};

export default TweetBody;