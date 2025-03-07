import React from 'react';

export interface ButtonProps {
  to?: string;
  type?: 'button' | 'submit';
  style?: ButtonStyle;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export interface ButtonStyle {
  width?: string;
  padding?: string;
  textSize?: string;
}
