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
      content="M developer portfolio, including only my best and most up-to-date projects."
    />
  </>
);

const Portfolio: React.FC<PortfolioQuery> = ({ data }) => {
  const ghIcon = data.file.publicURL;

  // Refactor this to a util
  const projects = React.useMemo(() => {
    const mappedProjects = data.allWpProject.nodes.map((node) => ({
      title: node.title,
      description: getFirstParagraphOfContent(node.content),
      ...node.project,
      firstReleased: new Date(node.project.firstReleased),
      technologies: node.project.technologies.split(', '),
    }));
    // .filter(
    //   (node) =>
    //     node.title === 'Benyakir Writes' ||
    //     node.firstReleased.valueOf() > new Date('2023-01-01').valueOf(),
    // );
    return mappedProjects;
  }, [data]);

  const allTechs = React.useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies))],
    [],
  );

  const [viewedTechs, toggleTech] = useSet(allTechs);
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <>
      <PortfolioHeader>
        <PortfolioDescription>
          Once upon a time, I studied languages and linguistics. Then I began learning programming
          on my own. I am now a <strong>frontend developer</strong> with experience in{' '}
          <strong>every step of the process</strong>, from design to implementation, from rapid
          iteration to long-term maintenance, from <strong>concept to creation</strong>. If you're
          looking for all my personal projects, it has been removed to{' '}
          <CustomLink to="/author/all-projects">All Projects</CustomLink>.
        </PortfolioDescription>
        <ProjectFilters allTechs={allTechs} viewedTechs={viewedTechs} onToggle={toggleTech} />
      </PortfolioHeader>
      <RandomizedBackground>
        <ProjectGrid
          projects={projects}
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
