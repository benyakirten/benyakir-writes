import { graphql } from 'gatsby'
import * as React from 'react'

import { CustomLink } from '@/components/General'
import {
  ProjectFilters,
  ProjectGrid,
  RandomizedBackground,
} from '@/components/Portfolio'
import {
  PortfolioDescription,
  PortfolioHeader,
} from '@/components/Portfolio/Portfolio.styles'
import { useSet } from '@/hooks'
import { getFirstParagraphOfContent } from '@/utils/project'
import { ProjectsQuery } from '@Types/query'

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - Portfolio</title>
    <meta
      name="description"
      content="My developer portfolio, including only my best and most up-to-date projects."
    />
  </>
)

const Portfolio: React.FC<ProjectsQuery> = ({ data }) => {
  const projects = React.useMemo(() => {
    const mappedProjects = data.allWpProject.nodes.map((node) => ({
      title: node.title,
      description: getFirstParagraphOfContent(node.content),
      ...node.project,
      firstReleased: new Date(node.project.firstReleased),
      technologies: node.project.technologies.split(', '),
    }))
    // .filter(
    //   (node) =>
    //     node.title === 'Benyakir Writes' ||
    //     node.firstReleased.valueOf() > new Date('2023-01-01').valueOf()
    // )
    return mappedProjects
  }, [data])

  const [_, startTransition] = React.useTransition()
  const allTechs = React.useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies))],
    [projects]
  )
  const [tentativeTechs, toggleTentativeTech] = useSet()
  const [filteredTechs, toggleTech] = useSet()
  const [viewedTechs, setViewedTechs] = React.useState<Set<string>>(new Set())
  React.useEffect(() => {
    const techs = new Set([...filteredTechs, ...tentativeTechs])
    setViewedTechs(techs)
  }, [tentativeTechs, filteredTechs])

  const [hovered, setHovered] = React.useState<string | null>(null)

  const [highlightedProjectTitles, setHighlightedProjectTitles] =
    React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    const highlightedTitles = new Set<string>()
    if (hovered) {
      highlightedTitles.add(hovered)
    } else if (viewedTechs.size > 0) {
      for (const project of projects) {
        if (project.technologies.some((tech) => viewedTechs.has(tech))) {
          highlightedTitles.add(project.title)
        }
      }
    }

    startTransition(() => {
      setHighlightedProjectTitles(highlightedTitles)
    })
  }, [hovered, viewedTechs, projects])
  return (
    <>
      <PortfolioHeader>
        <PortfolioDescription>
          My name is <strong>Benyakir Horowitz</strong>. Once upon a time, I
          studied linguistics and Italian. Then I began learning programming in
          2020 during the pandemic. I am now a{' '}
          <strong>frontend developer</strong> with experience in{' '}
          <strong>every step of the process</strong>, from design to
          implementation, from rapid iteration to long-term maintenance, from{' '}
          <strong>concept to creation</strong>. This page only contains my
          latest projects I want to showcase. The list is short since I haven't
          had much opportunity to work on them in awhile, which I hope to
          change. If you're looking for all my personal projects, it has been
          moved to{' '}
          <CustomLink to="/author/all-projects">All Projects</CustomLink>.
        </PortfolioDescription>
        <ProjectFilters
          allTechs={allTechs}
          viewedTechs={viewedTechs}
          onToggle={toggleTech}
          onToggleTentativeTech={toggleTentativeTech}
        />
      </PortfolioHeader>
      <RandomizedBackground>
        <ProjectGrid
          projects={projects}
          highlightedProjectTitles={highlightedProjectTitles}
          handleMouseEnter={(title) => setHovered(title)}
          handleMouseLeave={() => setHovered(null)}
          viewedTechs={viewedTechs}
        />
      </RandomizedBackground>
    </>
  )
}

export const query = graphql`
  query MyQuery {
    allWpProject {
      nodes {
        project {
          technologies
          mainLink
          repoLink
          hostedOn
          firstReleased
          latestUpdate
        }
        title
        content
        slug
      }
    }
  }
`

export default Portfolio
