import * as React from 'react';

import { ProjectGridDatum } from '@/types/portfolio';
import { getPrettyDate } from '@/utils/dates';
import { getFullTechName } from '@/utils/project';
import { CustomLink } from '../General';
import {
  GitHubIcon,
  ProjectContents,
  ProjectDescription,
  ProjectTechs,
  ProjectTitle,
  TechBadge,
  TechBadges,
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
        {project.repoLink && (
          <CustomLink outside to={project.repoLink}>
            <GitHubIcon ghIcon={ghIcon} />
          </CustomLink>
        )}
        {project.hostedOn && project.mainLink && (
          <CustomLink outside to={project.mainLink}>
            {project.hostedOn}
          </CustomLink>
        )}
        <ProjectDescription>{project.description}</ProjectDescription>
      </div>
      <ProjectTechs>
        First Created: {getPrettyDate(project.firstReleased)}
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
