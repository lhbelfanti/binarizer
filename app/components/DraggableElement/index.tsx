import { DragEvent } from 'react';

import { DraggableElementProps } from './types';

const DraggableElement = (props: DraggableElementProps) => {
  const { id, children } = props;

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', id);
  };

  return (
    <div id={id} className="cursor-pointer" draggable={true} onDragStart={handleDragStart}>
      {children}
    </div>
  );
};

export default DraggableElement;
