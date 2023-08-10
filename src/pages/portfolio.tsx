import { graphql } from 'gatsby';
import * as React from 'react';

import { GHIconQuery } from '@Types/query';
import { ProjectGridDatum } from '@Types/portfolio';
import {
  ProjectFilters,
  RandomizedBackground,
  Backdrop,
  ProjectGrid,
} from '@/components/Portfolio';

const Portfolio: React.FC<GHIconQuery> = ({ data }) => {
  const ghIcon = React.useMemo(() => data.file.publicUrl, [data]);
  const [hovered, setHovered] = React.useState<string | null>(null);
  // TODO: Relocate this to a etter place
  // When they have projects on the wp server then we can use that
  // Filter by date?
  const projects = React.useMemo<ProjectGridDatum[]>(
    () => [
      {
        title: 'Mantissa',
        description:
          'Chat application frontend using Nuxt. It will use web sockets and the WebCrypto API to allow e2e encryption',
        technologies: ['vue', 'ws'],
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
      <Backdrop />
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
