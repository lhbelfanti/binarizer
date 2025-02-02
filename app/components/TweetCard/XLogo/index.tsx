import { LinksFunction } from '@remix-run/node';

import styles from './styles.css?url';

const XLogo = () => {
  return (
    <div className="x-logo-container">
      <div className="x-logo-border1"></div>
      <div className="x-logo-border2"></div>
      <div className="x-logo-border3"></div>
    </div>
  );
};

export default XLogo;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
