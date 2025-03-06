import React from 'react';

export interface FilterButtonProps {
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
