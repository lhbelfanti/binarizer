import { DragEvent, ReactNode } from 'react';

interface DroppableElementProps {
	onDropHandler: (e: DragEvent<HTMLDivElement>) => void;
	onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
	onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
	children?: ReactNode;
}