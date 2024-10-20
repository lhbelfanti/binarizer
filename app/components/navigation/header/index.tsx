import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

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
		<header className="flex items-center justify-between p-3 border-b-2 border-b-gray-700">
			<div className="flex items-center gap-4">
				<div className="h-[30px] w-[30px]">
					<img
						src="/binarizer-logo-dark.png"
						alt="Binarizer"
						className="w-full"
					/>
				</div>
				<h1 className="text-xl font-bold text-white">
					Binarizer
				</h1>
			</div>
			<nav className="flex items-center gap-4">
				{ !isLoggedIn && (
					<Link to="/login" className="flex items-center text-blue-400 hover:underline mr-4">
						<FaSignInAlt className="h-6 w-6 mr-1"/>
						Login
					</Link>
				) }
				{ isLoggedIn && (
					<>
						<button
							onClick={ handleLogout }
							className="flex items-center text-red-400 hover:underline mr-4"
						>
							<FaSignOutAlt className="h-6 w-6 mr-1"/> {/* Logout icon */ }
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