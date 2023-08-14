import { graphql } from 'gatsby';
import * as React from 'react';

import { CustomLink } from '@/components/General';
import { ProjectFilters, ProjectGrid, RandomizedBackground } from '@/components/Portfolio';
import { PortfolioDescription, PortfolioHeader } from '@/components/Portfolio/Portfolio.styles';
import { useSet } from '@/hooks';
import { getFirstParagraphOfContent } from '@/utils/project';
import { PortfolioQuery } from '@Types/query';

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - Portfolio</title>
    <meta
      name="description"
      content="My developer portfolio, including only my best and most up-to-date projects."
    />
  </>
);

const Portfolio: React.FC<PortfolioQuery> = ({ data }) => {
  const ghIcon = data.file.publicURL;

  // Refactor this to a util
  const projects = React.useMemo(() => {
    const mappedProjects = data.allWpProject.nodes
      .map((node) => ({
        title: node.title,
        description: getFirstParagraphOfContent(node.content),
        ...node.project,
        firstReleased: new Date(node.project.firstReleased),
        technologies: node.project.technologies.split(', '),
      }))
      .filter(
        (node) =>
          node.title === 'Benyakir Writes' ||
          node.firstReleased.valueOf() > new Date('2023-01-01').valueOf(),
      );
    return mappedProjects;
  }, [data]);

  const allTechs = React.useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies))],
    [projects],
  );

  const [viewedTechs, toggleTech] = useSet(allTechs);
  const [hovered, setHovered] = React.useState<string | null>(null);

  const [_, startTransition] = React.useTransition();
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  React.useEffect(() => {
    const _filteredProjects =
      viewedTechs.size === 0
        ? projects
        : projects.filter((project) => project.technologies.some((tech) => viewedTechs.has(tech)));
    startTransition(() => {
      setFilteredProjects(_filteredProjects);
    });
  }, [viewedTechs, projects]);

  return (
    <>
      <PortfolioHeader>
        <PortfolioDescription>
          My name is <strong>Benyakir Horowitz</strong>. Once upon a time, I studied linguistics and
          Italian. Then I began learning programming in 2020 during the pandemic. I am now a{' '}
          <strong>frontend developer</strong> with experience in{' '}
          <strong>every step of the process</strong>, from design to implementation, from rapid
          iteration to long-term maintenance, from <strong>concept to creation</strong>. This page
          only contains my latest projects I want to showcase. The list is short since I haven't had
          much opportunity to work on them in awhile, which I hope to change. If you're looking for
          all my personal projects, it has been moved to{' '}
          <CustomLink to="/author/all-projects">All Projects</CustomLink>.
        </PortfolioDescription>
        <ProjectFilters allTechs={allTechs} viewedTechs={viewedTechs} onToggle={toggleTech} />
      </PortfolioHeader>
      <RandomizedBackground>
        <ProjectGrid
          projects={filteredProjects}
          ghIcon={ghIcon}
          hovered={hovered}
          handleMouseEnter={(title) => setHovered(title)}
          handleMouseLeave={() => setHovered(null)}
          viewedTechs={viewedTechs}
        />
      </RandomizedBackground>
    </>
  );
};

export const query = graphql`
  query MyQuery {
    file(name: { eq: "Github" }) {
      publicURL
    }
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
`;

export default Portfolio;
