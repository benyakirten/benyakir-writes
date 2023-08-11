import * as React from 'react';

import { getFullTechName } from '@/utils/project';
import { ProjectFiltersData } from '@Types/portfolio';
import TextCheckbox from './TextCheckbox.component';

const ProjectFilters: React.FC<ProjectFiltersData> = ({ allTechs, viewedTechs, onToggle }) => {
  return (
    <div style={{ fontSize: '2.4rem', display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
      {allTechs.map((tech) => (
        <TextCheckbox
          key={tech}
          checked={viewedTechs.has(tech)}
          onToggle={() => {
            console.log(`${tech} TOGGLED`);
            onToggle(tech);
          }}
        >
          {getFullTechName(tech)}
        </TextCheckbox>
      ))}
    </div>
  );
};

export default ProjectFilters;
