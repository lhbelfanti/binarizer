import { LinksFunction } from '@remix-run/node';
import { DragEvent } from 'react';

import Button, { links as buttonLinks } from 'app/components/Button';
import { links as XLogoLinks } from 'app/components/TweetCard/XLogo';
import Section from 'app/components/Section';
import TweetCard from 'app/components/TweetCard';
import variables from '~/data/variables.json'
import example from '~/data/tweet_examples.json'

const AppPage = () => {
	const sections = variables.page.app.sections

	const handleOnDrop = (event: DragEvent<HTMLDivElement>, section: string) => {
		event.preventDefault();

		const tweetID = event.dataTransfer.getData("id");

		switch (section) {
			case 'left':
				// call left section handler
				console.log(`Left handler: tweet: ${tweetID}`)
				break;
			case 'middle':
				// call middle section handler
				console.log(`Middle handler: tweet: ${tweetID}`)
				break;
			case 'right':
				// call right section handler
				console.log(`Right handler: tweet: ${tweetID}`)
				break;
		}
	}

	return (
		<div className="flex gap-4 p-1 h-[90vh]">
			<Section
				description={sections.left?.description}
				extra={sections.left?.extra}
				points={sections.left?.points}
				borderColor="#e63b7a"
				onHoverBackgroundColor="#f9d3e0"
				onHoverTextColor="#e63b7a"
				width="w-[300px]"
				height="h-full"
				onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, "left")}
			/>

			<div className="flex flex-col justify-between items-center w-full">
				<Section
					description={ sections.middle?.description }
					extra={ sections.middle?.extra }
					points={ sections.middle?.points }
					borderColor="#a16bce"
					onHoverBackgroundColor="#e6d8f3"
					onHoverTextColor="#a16bce"
					width="w-full"
					height="h-auto"
					onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, "middle")}
				/>

				<div className="flex flex-col items-center justify-center h-[350px] w-[700px]">
					<TweetCard tweet={ example.tweet1 }/>
				</div>
				<Button disabled={false}>
					Get more tweets
				</Button>
			</div>

			<Section
				description={sections.right?.description}
				extra={sections.right?.extra}
				points={sections.right?.points}
				borderColor="#4f7b29"
				onHoverBackgroundColor="#e6ffcc"
				onHoverTextColor="#4f7b29"
				width="w-[300px]"
				height="h-full"
				onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, "right")}
			/>
		</div>
	)
}

export default AppPage;

export const links: LinksFunction = () => {
	return [...buttonLinks(), ...XLogoLinks()];
}