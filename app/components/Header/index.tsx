import { Trans } from 'react-i18next';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import { Link, useLocation, useSubmit } from '@remix-run/react';

import variables from 'app/data/variables.json';

import AnalysisOverview from '@components/AnalysisOverview';

const Header = (props: HeaderProps) => {
  const { isLoggedIn } = props;
  const { header } = variables;

  const submit = useSubmit();
  const location = useLocation();

  const showLogInButton = location.pathname !== '/login';

  const handleLogout = () => {
    submit(null, { method: 'post', action: '/logout' });
  };

  return (
    <header className="flex items-center justify-between pt-2 pb-2 pr-3 pl-3 border-b-2 border-b-gray-700">
      <Link to="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px]">
            <img src="/binarizer-logo.png" alt="Binarizer" className="w-full" />
          </div>
          <div className="flex items-center gap-4 w-[150px]">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white">Binarizer</h1>
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
        {!isLoggedIn && showLogInButton && (
          <Link to="/login" className="flex items-center text-blue-400 hover:underline mr-4">
            <FaSignInAlt className="h-6 w-6 mr-1" />
            <Trans i18nKey="top_bar_login_button" />
          </Link>
        )}
        {isLoggedIn && (
          <>
            <button onClick={handleLogout} className="flex items-center text-red-400 hover:underline mr-4">
              <FaSignOutAlt className="h-6 w-6 mr-1" />
              <Trans i18nKey="top_bar_logout_button" />
            </button>
          </>
        )}
        <Link to="/" className="flex items-center text-blue-400 hover:underline">
          <FaHome className="h-6 w-6 mr-1" />
          <Trans i18nKey="top_bar_home_button" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
