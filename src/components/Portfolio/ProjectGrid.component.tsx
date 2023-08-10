import * as React from 'react';

import { CustomLink } from '@/components/General';
import {
  ProjectBox,
  ProjectContents,
  ProjectDescription,
  ProjectTechs,
  ProjectTitle,
  TechBadges,
  TechBadge,
  ProjectBoxes,
} from '@/components/Portfolio/Portfolio.styles';
import { getFullTechName } from '@/utils/project';
import { ProjectGridData } from '@/types/portfolio';
import IndividualProject from './IndividualProject.component';

const ProjectGrid: React.FC<ProjectGridData> = ({
  projects,
  ghIcon,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
}) => {
  const [techs] = React.useState<Set<string>>(new Set(['ws']));
  return (
    <ProjectBoxes>
      {projects.map((project) => (
        <ProjectBox
          key={project.title}
          onMouseEnter={() => handleMouseEnter(project.title)}
          onMouseLeave={() => handleMouseLeave()}
          hovered={hovered === project.title}
        >
          <IndividualProject project={project} ghIcon={ghIcon} techs={techs} />
        </ProjectBox>
      ))}
    </ProjectBoxes>
  );
};

export default ProjectGrid;
