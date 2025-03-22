import { DragEvent, ReactNode } from 'react';

export interface SectionsProps {
  handleOnDrop: (event: DragEvent<HTMLDivElement>, section: string) => void;
  children: ReactNode;
}
