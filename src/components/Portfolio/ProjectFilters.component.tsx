import * as React from 'react';

import { getFullTechName } from '@/utils/project';
import { ProjectFiltersData } from '@Types/portfolio';
import { FilterContainer } from './Portfolio.styles';
import TextCheckbox from './TextCheckbox.component';

const ProjectFilters: React.FC<ProjectFiltersData> = ({ allTechs, viewedTechs, onToggle }) => {
  return (
    <FilterContainer>
      {allTechs.map((tech) => (
        <TextCheckbox key={tech} checked={viewedTechs.has(tech)} onToggle={() => onToggle(tech)}>
          {getFullTechName(tech)}
        </TextCheckbox>
      ))}
    </FilterContainer>
  );
};

export default ProjectFilters;
