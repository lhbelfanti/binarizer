import { useState } from 'react';

import DroppableElement from '@components/DroppableElement';

import { SectionProps } from './types';

const Section = (props: SectionProps) => {
  const {
    description,
    extra,
    points,
    borderColor,
    onHoverBackgroundColor,
    onHoverTextColor,
    width,
    height,
    onDropHandler,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const dynamicDivStyles = {
    borderColor: borderColor,
    backgroundColor: isDragging ? onHoverBackgroundColor : 'transparent',
  };
  const dynamicTextStyles = {
    color: isDragging ? onHoverTextColor : '#f3f4f6',
    transition: 'color 0.3s ease',
  };

  const textStyle = ' font-medium transition-opacity duration-300 ease-in-out hidden-hover';
  const containerStyle =
    'flex flex-col justify-center items-start p-3 border-2 m-1 border-dashed rounded-lg transition-colors duration-300';

  return (
    <DroppableElement
      onDropHandler={onDropHandler}
      onDragOver={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}>
      <div className={`${containerStyle} ${width} ${height}`} style={dynamicDivStyles}>
        {description && (
          <p className={`${textStyle} text-xl font-bold`} style={{ color: onHoverTextColor }}>
            {description}
          </p>
        )}
        {extra && (
          <>
            <div className="mb-4" />
            <p className={`${textStyle} text-md text-gray-100`} style={dynamicTextStyles}>
              {extra}
            </p>
          </>
        )}
        {points && (
          <>
            <div className="mb-2" />
            <ul className={`${textStyle} list-disc pl-4`} style={dynamicTextStyles}>
              {points.map((bulletPoint: string) => (
                <li key={bulletPoint} className="mb-1 transition-transform duration-300 hover:translate-x-1">
                  {bulletPoint}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </DroppableElement>
  );
};

export default Section;
