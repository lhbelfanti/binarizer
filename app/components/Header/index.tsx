import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import AnalysisOverview from "~/components/AnalysisOverview";

const Header = () => {
	const location = useLocation();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const userLoggedIn = location.pathname !== '/login';
		setIsLoggedIn(userLoggedIn);
	}, [location]);

	const handleLogout = () => {
		setIsLoggedIn(false); // This should be replaced with actual logout logic
	};

	return (
		<header className="flex items-center justify-between pt-2 pb-2 pr-3 pl-3 border-b-2 border-b-gray-700">
			<div className="flex items-center gap-4">
				<div className="h-[30px] w-[30px]">
					<img
						src="/binarizer-logo.png"
						alt="Binarizer"
						className="w-full"
					/>
				</div>
				<h1 className="text-xl font-bold text-white">
					Binarizer
				</h1>
			</div>

			<div className="hidden md:flex items-center">
				<AnalysisOverview
					currentCriteria="Criteria Name"
					totalCriteria={10}
					criteriaAnalyzed={5}
					totalTweets={200}
					tweetsAnalyzed={100}
				/>
			</div>

			<nav className="flex items-center gap-4">
				{!isLoggedIn && (
					<Link to="/login" className="flex items-center text-blue-400 hover:underline mr-4">
						<FaSignInAlt className="h-6 w-6 mr-1"/>
						Login
					</Link>
				)}
				{isLoggedIn && (
					<>
						<button onClick={ handleLogout } className="flex items-center text-red-400 hover:underline mr-4">
							<FaSignOutAlt className="h-6 w-6 mr-1"/>
							Logout
						</button>
					</>
				) }
				<Link to="/" className="flex items-center text-blue-400 hover:underline">
					<FaHome className="h-6 w-6 mr-1"/>
					Home
				</Link>
			</nav>
		</header>
	);
};

export default Header;