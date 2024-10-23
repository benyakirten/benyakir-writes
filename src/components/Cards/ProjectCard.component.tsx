import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { styled } from "styled-components";

import { useFetchRepoUpdatedDate } from "@/hooks";
import { SIZE_XS } from "@/styles/variables";
import { ProjectImage } from "@/types/portfolio";
import type { FlattenedProjectCard } from "@/types/posts";
import {
  LatestUpdate,
  ProjectHost,
  ProjectTech,
  TechContainer,
} from "../General";
import { CardTitle, FullContainer, TagContainer } from "./Card.styles";
import CardExterior from "./CardExterior.component";
import { PublishedDate } from "./IconedText.component";

const ExtraMarginedContainer = styled.div`
  margin: ${SIZE_XS} 0;
  grid-column: span 2;
`;

const ProjectTitle = styled(CardTitle)`
  grid-column: span 1;
`;

const ProjectCardInterior: React.FC<{
  project: FlattenedProjectCard;
  image?: ProjectImage;
}> = ({ project, image }) => {
  const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
  return (
    <>
      <ProjectTitle>{project.title}</ProjectTitle>
      {project.hostedOn && (
        <TagContainer>
          <ProjectHost host={project.hostedOn} />
        </TagContainer>
      )}
      <FullContainer dangerouslySetInnerHTML={{ __html: project.content }} />
      <TechContainer>
        {project.icons.map((i) => (
          <ProjectTech
            shouldInvertInDark={i.name === "Rust" || i.name === "WebSockets"}
            key={i.name}
            tech={i.name}
            publicURL={i.publicURL}
          />
        ))}
      </TechContainer>
      {image && (
        <ExtraMarginedContainer>
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={image.name}
          />
        </ExtraMarginedContainer>
      )}
      <PublishedDate span={1} date={project.firstReleased.date} />
      <LatestUpdate state={latestUpdateState} />
    </>
  );
};

const ProjectCard: React.FC<
  FlattenedProjectCard & {
    image?: ProjectImage;
  }
> = ({ image, ...props }) => {
  return (
    <CardExterior
      rows="auto 1fr auto auto"
      slug={`/project/${props.slug}`}
      columns="1fr 1fr"
    >
      <ProjectCardInterior project={props} image={image} />
    </CardExterior>
  );
};

export default ProjectCard;
