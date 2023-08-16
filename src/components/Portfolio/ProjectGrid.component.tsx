import * as React from 'react'

import {
  ProjectBox,
  ProjectBoxes,
} from '@/components/Portfolio/Portfolio.styles'
import { ProjectGridData } from '@Types/portfolio'
import IndividualProject from './IndividualProject.component'

const ProjectGrid: React.FC<ProjectGridData> = ({
  projects,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  viewedTechs,
}) => {
  return (
    <ProjectBoxes>
      {projects.map((project) => (
        <ProjectBox
          key={project.title}
          onMouseEnter={() => handleMouseEnter(project.title)}
          onMouseLeave={() => handleMouseLeave()}
          hovered={hovered === project.title}
        >
          <IndividualProject project={project} techs={viewedTechs} />
        </ProjectBox>
      ))}
    </ProjectBoxes>
  )
}

export default ProjectGrid
