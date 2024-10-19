import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import type { ButtonProps } from './types';
import styles from './styles.css?url';

const Button = (props: ButtonProps) => {
	const {to, type, disabled, children} = props;
	const buttonClass = "mt-4 w-96 p-2 button-gradient text-white text-xl rounded-md hover:button-animate focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-600 hover:bg-blue-700";

	if (to) {
		return (
			<Link to={to}>
				<button className={buttonClass} disabled={disabled}>
					{children}
				</button>
			</Link>
		);
	}

	return (
		<button type={type} className={buttonClass} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
}