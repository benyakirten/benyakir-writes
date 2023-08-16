import * as React from 'react';

import LatestUpdate from '@/components/Portfolio/LatestUpdate.component';
import { useFetchRepoUpdatedDate } from '@/hooks';
import { ProjectGridDatum } from '@/types/portfolio';
import { getPrettyDate } from '@/utils/dates';
import { getFullTechName } from '@/utils/project';
import LinkOrNot from './LinkOrNot.component';
import {
  ProjectCardBottom,
  ProjectCardTop,
  ProjectContents,
  ProjectDates,
  ProjectDescription,
  ProjectTitle,
  TechBadge,
  TechBadges,
  TitleContainer,
} from './Portfolio.styles';

const IndividualProject: React.FC<{
  project: ProjectGridDatum;
  techs: Set<string>;
}> = ({ project, techs }) => {
  const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
  return (
    <ProjectContents>
      <LinkOrNot link={project.repoLink ?? project.mainLink}>
        <ProjectCardTop>
          <TitleContainer>
            <ProjectTitle>{project.title}</ProjectTitle>
          </TitleContainer>
          {/* Since we're using content directly from WP, we have to set the HTML and trust that the WP server hasn't been hacked */}
          <ProjectDescription dangerouslySetInnerHTML={{ __html: project.description }} />
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
      </LinkOrNot>
    </ProjectContents>
  );
};

export default IndividualProject;
