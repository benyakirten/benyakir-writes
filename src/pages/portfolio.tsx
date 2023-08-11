import { graphql } from 'gatsby';
import * as React from 'react';

import {
  Backdrop,
  ProjectFilters,
  ProjectGrid,
  RandomizedBackground,
} from '@/components/Portfolio';
import { useSet } from '@/hooks';
import { ProjectGridDatum } from '@Types/portfolio';
import { GHIconQuery } from '@Types/query';

const Portfolio: React.FC<GHIconQuery> = ({ data }) => {
  const ghIcon = React.useMemo(() => data.file.publicURL, [data]);
  const allTechs = React.useMemo(() => ['vue', 'ws', 'react'], []);
  const [viewedTechs, toggleTech] = useSet(allTechs);
  const [hovered, setHovered] = React.useState<string | null>(null);
  React.useEffect(() => console.log(viewedTechs), [viewedTechs]);
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

      {
        title: 'Benyakir Writes2',
        description: "My blog. You're using it right now",
        technologies: ['react'],
      },
      {
        title: 'Mantissa2',
        description:
          'Chat application frontend using Nuxt. It will use web sockets and the WebCrypto API to allow e2e encryption',
        technologies: ['vue', 'ws'],
      },
      {
        title: 'Benyakir Writes3',
        description: "My blog. You're using it right now",
        technologies: ['react'],
      },
      {
        title: 'Mantissa3',
        description:
          'Chat application frontend using Nuxt. It will use web sockets and the WebCrypto API to allow e2e encryption',
        technologies: ['vue', 'ws'],
      },

      {
        title: 'Benyakir Writes4',
        description: "My blog. You're using it right now",
        technologies: ['react'],
      },
      {
        title: 'Mantissa4',
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
      <Backdrop visible={hovered !== null} />
      <ProjectFilters allTechs={allTechs} viewedTechs={viewedTechs} onToggle={toggleTech} />
      <ProjectGrid
        projects={projects}
        ghIcon={ghIcon}
        hovered={hovered}
        handleMouseEnter={(title) => setHovered(title)}
        handleMouseLeave={() => setHovered(null)}
        viewedTechs={viewedTechs}
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
