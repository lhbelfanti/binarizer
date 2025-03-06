import { FilterButtonProps } from './types';

const FilterButton = (props: FilterButtonProps) => {
  const { selected, disabled, onClick, children } = props;

  const linearGradient: string = `linear-gradient(to_right,#3b82f6,#8b5cf6)`;

  const filterButtonClass: string = `
    px-4
    py-2    
    text-white 
    rounded-md 
    border
    border-[#3b82f6]
    bg-[100%_100%]
    
    transition-[background-position] 
    duration-[0.3s,transform] 
    delay-[0.3s] 
    
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400 
    
    hover:bg-[${linearGradient}]
    hover:button-animate 
    hover:bg-[100%_50%] 
    hover:scale-105 
    
    active:scale-95;
    active:bg-[#3b82f6]
    
    disabled:bg-none
    disabled:bg-gray-400
    disabled:border-none
    disabled:hover:scale-100
    disabled:hover:bg-[100%_100%]
    disabled:opacity-75
    disabled:cursor-not-allowed
  `;

  const selectedClass: string = `
    bg-[${linearGradient}]
    
    hover:scale-100
    hover:cursor-default
  `;

  return (
    <button
      type={'button'}
      className={filterButtonClass + (selected ? selectedClass : '')}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default FilterButton;
