import * as React from 'react'

import { BigParagraph, Grouping, Page } from '@Styles/general-components'

import { CustomLink } from '@Gen'
import { LeadPage, Paginate } from '@Layout'
import { ProjectFilter } from '@Posts'
import { ProjectCard } from '@Variants'

import { usePagination } from '@Hooks'

import projectsMisc from '@WPData/Projects/misc.json'
import projectsJson from '@WPData/Projects/projects.json'

import { FlattenedProjectCard } from '@Types/posts'

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - All Projects</title>
    <meta
      name="description"
      content="A view of all of my completed projects with various details. They can be sorted by a variety of means,
                    including dynamically-generated criteria such as web hosts and what technologies are used to power them."
    />
  </>
)

const ProjectsPage: React.FC = () => {
  const allHosts = React.useMemo<string[]>(
    () => projectsMisc.hosts,
    [projectsMisc]
  )
  const allTechs = React.useMemo<string[]>(
    () => projectsMisc.longTechs,
    [projectsMisc]
  )

  // JSON stringify makes a date into a string - so we need to convert it back
  const preparedProjects = React.useMemo<FlattenedProjectCard[]>(
    () =>
      projectsJson.map((p: FlattenedProjectCard) => ({
        ...p,
        firstReleased: {
          ...p.firstReleased,
          date: new Date(p.firstReleased.date),
        },
      })),
    [projectsJson]
  )

  const projectPagination =
    usePagination<FlattenedProjectCard>(preparedProjects)

  return (
    <Page>
      <LeadPage
        title="Projects"
        filter={
          <ProjectFilter
            allProjects={preparedProjects}
            allHosts={allHosts}
            allTechs={allTechs}
            onFilter={projectPagination.setCurrentItems}
          />
        }
      >
        <BigParagraph marginVertical="2rem">
          This is a page that lists all of my projects on my GitHub page. This
          includes all of my work, old and new. Please don't use this page to
          see my latest and more interesting work and only use this page as an
          easily indexable page. For my latest work, visit my{' '}
          <CustomLink to="/portfolio">portfolio</CustomLink>.
        </BigParagraph>
        <Grouping>
          <Paginate {...projectPagination} El={ProjectCard} />
        </Grouping>
      </LeadPage>
    </Page>
  )
}

export default ProjectsPage
