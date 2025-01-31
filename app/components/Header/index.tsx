import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Trans } from "react-i18next";

import AnalysisOverview from "~/components/AnalysisOverview";

import variables from '~/data/variables.json'

const Header = () => {
	const { header } = variables;

	const location = useLocation();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const userLoggedIn: boolean = location.pathname !== '/login';
		setIsLoggedIn(userLoggedIn);
	}, [location]);

	const handleLogout = () => {
		setIsLoggedIn(false); // This should be replaced with actual logout logic
	};

	return (
		<header className="flex items-center justify-between pt-2 pb-2 pr-3 pl-3 border-b-2 border-b-gray-700">
			<Link to="/" className="flex items-center">
				<div className="flex items-center gap-2">
					<div className="h-[30px] w-[30px]">
						<img
							src="/binarizer-logo.png"
							alt="Binarizer"
							className="w-full"
						/>
					</div>
					<div className="flex items-center gap-4 w-[150px]">
						<div className="flex flex-col">
							<h1 className="text-xl font-bold text-white">
								Binarizer
							</h1>
							<span className="flex-shrink-0 text-[10px]">{header.description}</span>
						</div>
					</div>
				</div>
			</Link>

			{isLoggedIn && (
				<AnalysisOverview
					currentCriteria="Criteria Name"
					totalCriteria={10}
					criteriaAnalyzed={5}
					totalTweets={200}
					tweetsAnalyzed={100}
				/>
			)}
			<nav className="flex items-center gap-4">
				{!isLoggedIn && (
					<Link to="/login" className="flex items-center text-blue-400 hover:underline mr-4">
						<FaSignInAlt className="h-6 w-6 mr-1"/>
						<Trans i18nKey="top_bar_login_button" />
					</Link>
				)}
				{isLoggedIn && (
					<>
						<button onClick={handleLogout} className="flex items-center text-red-400 hover:underline mr-4">
							<FaSignOutAlt className="h-6 w-6 mr-1"/>
							<Trans i18nKey="top_bar_logout_button" />
						</button>
					</>
				)}
				<Link to="/" className="flex items-center text-blue-400 hover:underline">
					<FaHome className="h-6 w-6 mr-1"/>
					<Trans i18nKey="top_bar_home_button" />
				</Link>
			</nav>
		</header>
	);
};

export default Header;