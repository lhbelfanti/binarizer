import { Trans } from 'react-i18next';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import { Link, useLocation, useSubmit } from '@remix-run/react';

import variables from 'app/data/variables.json';

import ProgressBar from '@components/ProgressBar';

import { useCriteriaContext } from '../../context/CriteriaContext';

const Header = (props: HeaderProps) => {
  const { isLoggedIn } = props;
  const { header } = variables;

  const submit = useSubmit();
  const location = useLocation();
  const { totalTweets, analyzedTweets } = useCriteriaContext();

  const showLogInButton: boolean = location.pathname !== '/login';
  const showAnalysisOverview: boolean = location.pathname !== '/selection';

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

      {isLoggedIn && showAnalysisOverview && (
        <div className="flex items-center justify-center gap-8 w-[905px]">
          <div className="flex flex-col items-center gap-2 text-white text-sm pl-10 pr-10 border-dashed">
            <span className="font-semibold">{'Cocaine Search Criteria A'}</span>
            <ProgressBar total={totalTweets} currentValue={analyzedTweets} />
          </div>
        </div>
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
