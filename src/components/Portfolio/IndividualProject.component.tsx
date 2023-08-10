import * as React from 'react';

import { ProjectGridDatum } from '@/types/portfolio';
import { getFullTechName } from '@/utils/project';
import { CustomLink } from '../General';
import {
  ProjectContents,
  ProjectTitle,
  ProjectDescription,
  ProjectTechs,
  TechBadges,
  TechBadge,
  GitHubIcon,
} from './Portfolio.styles';

const IndividualProject: React.FC<{
  project: ProjectGridDatum;
  ghIcon: string;
  techs: Set<string>;
}> = ({ project, ghIcon, techs }) => {
  return (
    <ProjectContents>
      <div>
        <ProjectTitle>{project.title}</ProjectTitle>
        <CustomLink outside to="https://www.google.com">
          <GitHubIcon ghIcon={ghIcon} />
        </CustomLink>
        <ProjectDescription>{project.description}</ProjectDescription>
      </div>
      <ProjectTechs>
        <TechBadges>
          {project.technologies.map((tech) => (
            <TechBadge selected={techs.has(tech)} key={tech}>
              {getFullTechName(tech)}
            </TechBadge>
          ))}
        </TechBadges>
      </ProjectTechs>
    </ProjectContents>
  );
};

export default IndividualProject;
