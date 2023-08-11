import * as React from 'react';

import { ProjectBox, ProjectBoxes } from '@/components/Portfolio/Portfolio.styles';
import { Z_ABOVE } from '@/styles/variables';
import { ProjectGridData } from '@Types/portfolio';
import { Transition, TransitionGroup, TransitionStatus } from 'react-transition-group';
import IndividualProject from './IndividualProject.component';

const defaultStyle = {
  position: 'relative' as any,
  opacity: 0,
  transition: 'transform 250ms ease-in-out, opacity 250ms ease-in-out',
  zIndex: Z_ABOVE,
};

const transitionStyles: Partial<Record<TransitionStatus, object>> = {
  entering: { opacity: 0.5, transform: 'scale(0.8)' },
  entered: { opacity: 0.1, transform: 'scale(1)' },
  exiting: { opacity: 0.1, transform: 'scale(1)' },
  exited: { opacity: 0.5, transform: 'scale(0.8)' },
};

const ProjectGrid: React.FC<ProjectGridData> = ({
  projects,
  ghIcon,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  viewedTechs,
}) => {
  const isProjectAllowed = (technologies: string[]) =>
    viewedTechs.size === 0 || technologies.some((tech) => viewedTechs.has(tech));
  return (
    <ProjectBoxes>
      <TransitionGroup style={{ display: 'contents' }}>
        {projects.map((project) => (
          <Transition
            key={project.title}
            nodeRef={project.ref}
            in={isProjectAllowed(project.technologies)}
            timeout={250}
          >
            {(state) => (
              <div
                ref={project.ref}
                style={{ display: 'contents', ...defaultStyle, ...transitionStyles[state] }}
              >
                <ProjectBox
                  onMouseEnter={() => handleMouseEnter(project.title)}
                  onMouseLeave={() => handleMouseLeave()}
                  hovered={hovered === project.title}
                >
                  <IndividualProject project={project} ghIcon={ghIcon} techs={viewedTechs} />
                </ProjectBox>
              </div>
            )}
          </Transition>
        ))}
      </TransitionGroup>
    </ProjectBoxes>
  );
};

export default ProjectGrid;
