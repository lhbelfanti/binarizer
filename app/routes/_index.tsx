import { Trans } from "react-i18next";

import Button from "@components/Button";

const MainPage = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center">
				<header className="flex items-center gap-9 mb-16">
					<div className="h-[150px] w-[150px]">
						<img
							src="/binarizer-logo.png"
							alt="Binarizer"
							className="w-full block"
						/>
					</div>
					<h1 className="leading-tight text-7xl font-bold text-transparent bg-clip-text bg-title-gradient">
						<Trans i18nKey="landing_title" components={{ 1: <br /> }}/>
					</h1>
				</header>

				<div className="mt-8"/>

				<Button to="/login" disabled={false}>
					<Trans i18nKey="landing_enter_button" />
				</Button>
			</div>
		</div>
	);
}

export default MainPage;