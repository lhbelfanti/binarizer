import { TextHighlighterProps } from '~/components/TextHighlighter/types';

const TextHighlighter = (props: TextHighlighterProps) => {
	const { text } = props;

	const parseText = (text: string) => {
		const regex = /(\bhttps?:\/\/\S+\b|#\w+|@\w+)/g;

		return text.split(regex).map((part, index) => {
			if (part.match(/^https?:\/\//)) {
				return (
					<a key={index} href={part} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
						{part}
					</a>
				);
			} else if (part.startsWith('#')) {
				return (<span key={index} className="text-blue-500"> {part} </span>);
			} else if (part.startsWith('@')) {
				return (<span key={index} className="text-blue-500"> {part} </span>);
			} else {
				return <span className="text-black"> {part} </span>;
			}
		});
	};

	return (
		<div className="text-xl">
			{parseText(text)}
		</div>
	)
};

export default TextHighlighter;