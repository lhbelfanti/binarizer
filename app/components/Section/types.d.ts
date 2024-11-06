import { DragEvent } from 'react';

export interface SectionProps {
	description: string | null;
	extra: string | null;
	points: string[] | null;
	borderColor: string;
	onHoverBackgroundColor: string;
	onHoverTextColor: string;
	width: string;
	height: string;
	onDropHandler: (e: DragEvent<HTMLDivElement>) => void;
}