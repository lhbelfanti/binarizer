import { LinksFunction } from '@remix-run/node';

import Button from 'app/components/button';
import { links as buttonLinks } from '~/components/button';

const MainPage = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center">
				<header className="flex items-center gap-9 mb-16">
					<div className="h-[150px] w-[150px]">
						<img
							src="/binarizer-logo-dark.png"
							alt="Binarizer"
							className="w-full block"
						/>
					</div>
					<h1 className="leading-tight text-7xl font-bold text-transparent bg-clip-text bg-title-gradient shadow-lg">
						Binarizer: A binary <br/> dataset creator
					</h1>
				</header>

				<div className="mt-8"/>

				<Button to="/login" disabled={false}>
					Go to login
				</Button>
			</div>
		</div>
	);
}

export default MainPage;

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}