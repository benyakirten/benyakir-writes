import * as React from 'react';
import TextCheckbox from './TextCheckbox.component';

const ProjectFilters: React.FC<{ allTechs: Set<string>; viewedTechs: Set<string> }> = ({
  allTechs,
  viewedTechs,
}) => {
  return (
    <div>
      <TextCheckbox>Hello</TextCheckbox>
    </div>
  );
};

export default ProjectFilters;
