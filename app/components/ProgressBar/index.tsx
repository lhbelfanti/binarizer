import { useEffect, useState } from 'react';

import { ProgressBarProps } from '@components/ProgressBar/types';

const ProgressBar = (props: ProgressBarProps) => {
  const { total, currentValue, style } = props;

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress: number = (currentValue * 100) / total;
      setAnimatedProgress(Number(progress.toFixed(2)));
    }, 100);
    return () => clearTimeout(timer);
  }, [currentValue, total]);

  const progressBarStyle: string = `
    h-full 
    bg-[linear-gradient(to_right,#3b82f6,#8b5cf6)] 
    bg-[length:200%_100%] 
    transition-all 
    duration-500 
    ease-in-out 
    hover:bg-[100%_50%]
  `;

  return (
    <div
      className={`
        relative 
        ${style?.width ? style.width : 'w-96'}
        ${style?.height ? style.height : 'h-4'} 
        ${style?.borderRadius ? style.borderRadius : 'rounded-md'} 
        border 
        border-[#3b82f6]
        overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {!isHovered && (
        <>
          <div className={progressBarStyle} style={{ width: `${animatedProgress}%` }} />
          <div
            className={`absolute inset-0 flex items-center justify-center text-sm font-medium text-white cursor-default`}>
            {`${animatedProgress}%`}
          </div>
        </>
      )}
      {isHovered && (
        <>
          <div className={progressBarStyle} style={{ width: `${animatedProgress}%` }} />
          <div
            className={`absolute inset-0 flex items-center justify-center text-sm font-medium text-white cursor-default`}>
            {`${currentValue}/${total}`}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressBar;
