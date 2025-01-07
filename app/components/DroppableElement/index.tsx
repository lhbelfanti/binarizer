import { DragEvent, useState } from 'react';

import { DroppableElementProps } from './types';

const DroppableElement = (props: DroppableElementProps) => {
	const { onDropHandler, onDragOver, onDragLeave, children } = props;

	const [isDragging, setIsDragging] = useState(false);

	const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(true);
		onDragOver?.(event);
	}

	const handleOnDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);
		onDragLeave?.(event);
	}

	const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
		setIsDragging(false);
		onDropHandler(event);
		onDragLeave?.(event);
	}

	const dynamicDivStyles = {
		transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
		transform: isDragging ? 'scale(0.98)' : 'scale(1)',
		boxShadow: isDragging ? '0 10px 20px rgba(0, 0, 0, 0.25)' : '0 2px 5px rgba(0, 0, 0, 0.1)'
	};

	return (
		<div
			style={ dynamicDivStyles }
			onDragOver={ handleOnDragOver }
			onDragLeave={ handleOnDragLeave }
			onDrop={ handleOnDrop }
		>
			{ children }
		</div>
	)
}

export default DroppableElement;