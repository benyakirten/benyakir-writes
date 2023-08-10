import { graphql } from 'gatsby';
import * as React from 'react';

import { GHIconQuery } from '@Types/query';
import { ProjectGridDatum } from '@Types/portfolio';
import {
  ProjectFilters,
  RandomizedBackground,
  ProjectGrid,
  Backdrop,
} from '@/components/Portfolio';

const Portfolio: React.FC<GHIconQuery> = ({ data }) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const ghIcon = React.useMemo(() => data.file.publicURL, [data]);
  const [hovered, setHovered] = React.useState<string | null>(null);
  // TODO: Relocate this to a etter place
  // When they have projects on the wp server then we can use that
  // Filter by date?
  const projects = React.useMemo<ProjectGridDatum[]>(
    () => [
      {
        title: 'Benyakir Writes',
        description: "My blog. You're using it right now",
        technologies: ['react'],
      },
      {
        title: 'Mantissa',
        description:
          'Chat application frontend using Nuxt. It will use web sockets and the WebCrypto API to allow e2e encryption',
        technologies: ['vue', 'ws'],
      },
    ],
    [],
  );
  return (
    <>
      <RandomizedBackground />
      <ProjectFilters />
      <Backdrop visible={hovered !== null} />
      <ProjectGrid
        projects={projects}
        ghIcon={ghIcon}
        hovered={hovered}
        handleMouseEnter={(title) => setHovered(title)}
        handleMouseLeave={() => setHovered(null)}
      />
    </>
  );
};

export const query = graphql`
  query MyQuery {
    file(name: { eq: "Github" }) {
      publicURL
    }
  }
`;

export default Portfolio;
