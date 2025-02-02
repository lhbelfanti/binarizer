import { Link } from '@remix-run/react';

import type { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const { to, type, disabled, children } = props;
  const buttonGradient: string = `
		bg-[linear-gradient(to_right,#3b82f6,#8b5cf6)] 
		bg-[100%_100%] 
		transition-[background-position] 
		duration-[0.3s,transform] 
		delay-[0.3s] 
		hover:bg-[100%_50%] 
		hover:scale-105 
		active:scale-95;
	`;
  const buttonClass: string = `
		mt-4 
		w-96 
		p-2 
		${buttonGradient}
		text-white 
		text-xl 
		rounded-md 
		hover:button-animate 
		focus:outline-none 
		focus:ring-2 
		focus:ring-blue-400 
		bg-blue-600 
		hover:bg-blue-700
	`;

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
