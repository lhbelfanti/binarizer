import React from 'react';

export interface ButtonProps {
	to?: string;
	type?: 'button' | 'submit';
	disabled?: boolean;
	children: React.ReactNode;
}