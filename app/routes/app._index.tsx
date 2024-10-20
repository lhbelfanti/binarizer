import { LinksFunction } from '@remix-run/node';
import React from 'react';
import Button, { links as buttonLinks } from '~/components/button';

import Section from '~/components/section';
import Tweet from '~/components/tweet';
import variables from '~/data/variables.json'
import example from '~/data/tweet_examples.json'

const AppPage = () => {
	const sections = variables.page.app.sections

	return (
		<div className="flex gap-4 p-1 h-[90vh]">
			<Section
				description={sections.left.description}
				extra={sections.left.extra}
				points={sections.left.points}
				borderColor="#e63b7a"
				onHoverBackgroundColor="#f9d3e0"
				onHoverTextColor="#e63b7a"
				width="w-[300px]"
				height="h-full"
			/>

			<div className="flex flex-col justify-between items-center w-full">
				<Section
					description={ sections.middle.description }
					extra={ sections.middle.extra }
					points={ sections.middle.points }
					borderColor="#a16bce"
					onHoverBackgroundColor="#e6d8f3"
					onHoverTextColor="#a16bce"
					width="w-full"
					height="h-[200px]"
				/>

				<div className="flex flex-col items-center justify-center h-[350px] w-[700px]">
					<Tweet tweet={ example.tweet1 }/>
				</div>
				<Button disabled={false}>
					Obtener más tweets
				</Button>
			</div>

			<Section
				description={sections.right.description}
				extra={sections.right.extra}
				points={sections.right.points}
				borderColor="#4f7b29"
				onHoverBackgroundColor="#e6ffcc"
				onHoverTextColor="#4f7b29"
				width="w-[300px]"
				height="h-full"
			/>
		</div>
	)
}

export default AppPage;

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}