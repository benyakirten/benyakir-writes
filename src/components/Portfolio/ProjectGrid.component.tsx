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

// Chat application frontend using Nuxt. It will use web sockets and the{' '}
// <CustomLink
//   to="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
//   outside
// >
//   WebCrypto API
// </CustomLink>{' '}
// to facilitate e2e encryption.
const ProjectGrid: React.FC<ProjectGridData> = ({ projects, ghIcon }) => {
  const [techs] = React.useState<Set<string>>(new Set(['ws']));
  function handleProjectMouseEnter(title: string) {
    // TODO
  }
  function handleProjectMouseLeave() {
    // TODO
  }
  return (
    <ProjectBoxes>
      {projects.map((project) => (
        <ProjectBox
          onMouseEnter={() => handleProjectMouseEnter(project.title)}
          onMouseLeave={() => handleProjectMouseLeave()}
          hovered
        >
          <ProjectContents>
            <div>
              <ProjectTitle>{project.title}</ProjectTitle>
              <CustomLink outside to="https://www.google.com">
                <img
                  style={{ display: 'inline', marginLeft: '0.5rem' }}
                  alt="GitHub"
                  src={ghIcon}
                  height="18px"
                  width="18px"
                />
              </CustomLink>
            </div>
            <ProjectDescription>{project.description}</ProjectDescription>
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
        </ProjectBox>
      ))}
    </ProjectBoxes>
  );
};

export default ProjectGrid;
