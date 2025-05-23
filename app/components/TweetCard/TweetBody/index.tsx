import Carousel from '@components/Carousel';
import TextHighlighter from '@components/TweetCard/TweetBody/TextHighlighter';

import { TweetBodyProps } from './types';

const TweetBody = (props: TweetBodyProps) => {
  const { content, images } = props;

  return (
    <div className="mb-3">
      <TextHighlighter text={content} />

      <div className="m-8" />

      {images && images.length > 0 && <Carousel images={images}></Carousel>}
    </div>
  );
};

export default TweetBody;
