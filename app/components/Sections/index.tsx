import { DragEvent } from 'react';

import variables from 'app/data/variables.json';

import Section from '@components/Sections/Section';
import { SectionsProps } from '@components/Sections/types';

const Sections = (props: SectionsProps) => {
  const { handleOnDrop, children } = props;
  const sections = variables.page.app.sections;

  return (
    <div className="flex gap-4 p-1 h-[90vh]">
      <Section
        description={sections.left?.description}
        extra={sections.left?.extra}
        points={sections.left?.points}
        borderColor="#e63b7a"
        onHoverBackgroundColor="#f9d3e0"
        onHoverTextColor="#e63b7a"
        width="w-[300px]"
        height="h-full"
        onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'left')}
      />

      <div className="flex flex-col justify-between items-center w-full">
        <Section
          description={sections.middle?.description}
          extra={sections.middle?.extra}
          points={sections.middle?.points}
          borderColor="#a16bce"
          onHoverBackgroundColor="#e6d8f3"
          onHoverTextColor="#a16bce"
          width="w-full"
          height="h-auto"
          onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'middle')}
        />

        {children}
      </div>

      <Section
        description={sections.right?.description}
        extra={sections.right?.extra}
        points={sections.right?.points}
        borderColor="#4f7b29"
        onHoverBackgroundColor="#e6ffcc"
        onHoverTextColor="#4f7b29"
        width="w-[300px]"
        height="h-full"
        onDropHandler={(event: DragEvent<HTMLDivElement>) => handleOnDrop(event, 'right')}
      />
    </div>
  );
};

export default Sections;
