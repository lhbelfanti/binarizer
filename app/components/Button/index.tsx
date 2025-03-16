import { Link } from '@remix-run/react';

import type { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const { to, type, style, disabled, children } = props;

  const buttonClass: string = `
    mt-4 
    ${style?.width ? style.width : 'w-96'}
    ${style?.padding ? style?.padding : 'p-2'} 
    text-white 
    ${style?.textSize ? style?.textSize : 'text-xl'} 
    rounded-md 
    bg-blue-purple-gradient 
    bg-[100%_100%]
    transition-[background-position] 
    duration-[0.3s,transform] 
    delay-[0.3s] 
    hover:bg-[100%_50%] 
    hover:scale-105 
    hover:button-animate
    hover:bg-blue-700
    active:scale-95;
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400
    disabled:bg-none
    disabled:bg-gray-400
    disabled:hover:scale-100
    disabled:hover:bg-[100%_100%]
    disabled:opacity-75
    disabled:cursor-not-allowed
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
    <button type={type} className={buttonClass} disabled={disabled} onClick={props?.onClick}>
      {children}
    </button>
  );
};

export default Button;
