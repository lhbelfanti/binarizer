import { InputHTMLAttributes, FC } from "react";

import { LoginProps } from './types';

const Login: FC<LoginProps> = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input {...otherProps} />
			{
				label &&
				<div className="form-input-label">
					{label}
				</div>
			}
		</div>
	);
}

export default Login;