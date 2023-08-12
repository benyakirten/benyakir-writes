import * as React from 'react';

import LatestUpdate from '@/components/Portfolio/LatestUpdate.component';
import { useFetchRepoUpdatedDate } from '@/hooks';
import { ProjectGridDatum } from '@/types/portfolio';
import { getPrettyDate } from '@/utils/dates';
import { getFullTechName } from '@/utils/project';
import { CustomLink } from '../General';
import {
  GitHubIcon,
  ProjectCardBottom,
  ProjectCardTop,
  ProjectContents,
  ProjectDates,
  ProjectDescription,
  ProjectTitle,
  TechBadge,
  TechBadges,
  TitleContainer,
  TitleDateContainer,
} from './Portfolio.styles';

const IndividualProject: React.FC<{
  project: ProjectGridDatum;
  ghIcon: string;
  techs: Set<string>;
}> = ({ project, ghIcon, techs }) => {
  const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
  return (
    <ProjectContents>
      <ProjectCardTop>
        <TitleContainer>
          <ProjectTitle>{project.title}</ProjectTitle>
          <TitleDateContainer>
            {project.repoLink && (
              <CustomLink underbarsize="0px" outside to={project.repoLink}>
                <GitHubIcon ghIcon={ghIcon} />
              </CustomLink>
            )}
            {project.hostedOn && project.mainLink && (
              <CustomLink outside to={project.mainLink}>
                {project.hostedOn}
              </CustomLink>
            )}
          </TitleDateContainer>
        </TitleContainer>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectCardTop>
      <ProjectCardBottom>
        <ProjectDates>
          <div>First Created: {getPrettyDate(project.firstReleased)}</div>
          <LatestUpdate state={latestUpdateState} />
        </ProjectDates>
        <TechBadges>
          {project.technologies.map((tech) => (
            <TechBadge selected={techs.has(tech)} key={tech}>
              {getFullTechName(tech)}
            </TechBadge>
          ))}
        </TechBadges>
      </ProjectCardBottom>
    </ProjectContents>
  );
};

export default IndividualProject;
