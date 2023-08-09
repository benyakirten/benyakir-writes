import { graphql } from 'gatsby';
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
import { Wheel } from '@/components/Portfolio/svgs';
import { WpProject } from '@/types/query';
import { getFullTechName } from '@/utils/project';

const Portfolio: React.FC<Omit<WpProject, 'wpProject'>> = ({ data }) => {
  const iconNodes = React.useMemo(() => data.allFile.nodes, [data]);
  const tempIcons = React.useMemo(
    () => iconNodes.filter((icon) => icon.name === 'vue' || icon.name === 'ws'),
    [iconNodes],
  );
  const ghIcon = React.useMemo(
    () => iconNodes.find((icon) => icon.name === 'Github'),
    [iconNodes],
  ) as FileNode;
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [techs] = React.useState<Set<string>>(new Set(['ws']));
  return (
    <>
      <Wheel size={40} />
      <ProjectBoxes>
        <ProjectBox
          hovered={hovered === '1'}
          onMouseEnter={() => setHovered('1')}
          onMouseLeave={() => setHovered(null)}
        >
          <ProjectContents>
            <div>
              <ProjectTitle>Mantissa</ProjectTitle>
              <CustomLink outside to="https://www.google.com">
                <img
                  style={{ display: 'inline', marginLeft: '0.5rem' }}
                  alt="GitHub"
                  src={ghIcon.publicURL}
                  height="18px"
                  width="18px"
                />
              </CustomLink>
            </div>
            <ProjectDescription>
              Chat application frontend using Nuxt. It will use web sockets and the{' '}
              <CustomLink
                to="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
                outside
              >
                WebCrypto API
              </CustomLink>{' '}
              to facilitate e2e encryption.
            </ProjectDescription>
            <ProjectTechs>
              <TechBadges>
                {tempIcons.map((icon) => (
                  <TechBadge selected={techs.has(icon.name)} key={icon.name}>
                    {getFullTechName(icon.name)}
                  </TechBadge>
                ))}
              </TechBadges>
            </ProjectTechs>
          </ProjectContents>
        </ProjectBox>
        <ProjectBox
          hovered={hovered === '2'}
          onMouseEnter={() => setHovered('2')}
          onMouseLeave={() => setHovered(null)}
        >
          <ProjectContents>
            <div>
              <ProjectTitle>Mantissa</ProjectTitle>
              <CustomLink outside to="https://www.google.com">
                <img
                  style={{ display: 'inline', marginLeft: '0.5rem' }}
                  alt="GitHub"
                  src={ghIcon.publicURL}
                  height="18px"
                  width="18px"
                />
              </CustomLink>
            </div>
            <ProjectDescription>
              Chat application frontend using Nuxt. It will use web sockets and the{' '}
              <CustomLink
                to="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
                outside
              >
                WebCrypto API
              </CustomLink>{' '}
              to facilitate e2e encryption.
            </ProjectDescription>
            <ProjectTechs>
              <TechBadges>
                {tempIcons.map((icon) => (
                  <TechBadge selected={techs.has(icon.name)} key={icon.name}>
                    {getFullTechName(icon.name)}
                  </TechBadge>
                ))}
              </TechBadges>
            </ProjectTechs>
          </ProjectContents>
        </ProjectBox>
      </ProjectBoxes>
    </>
  );
};

export const query = graphql`
  query MyQuery {
    allFile(filter: { relativePath: { regex: "/^[tech]|[social]/[a-zA-Z]+.svg$/" } }) {
      nodes {
        publicURL
        name
      }
    }
  }
`;

export default Portfolio;
