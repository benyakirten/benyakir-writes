import { graphql } from "gatsby";
import * as React from "react";
import styled from "styled-components";

import {
	Box,
	NormalPageContents,
	Page,
	TemplateContent,
	TemplateHeaderContainer,
	TemplateHeaderTitle,
	WpContent,
} from "@/styles/general-components";

import IconedText, {
	PublishedDate,
} from "@/components/Cards/IconedText.component";
import {
	LatestUpdate,
	ProjectHost,
	ProjectTech,
	TechContainer,
} from "@/components/General";
import { HeadBase } from "@/components/SEO";
import { useFetchRepoUpdatedDate } from "@/hooks";
import { SIZE_SM } from "@/styles/variables";
import { FileNode } from "@/types/general";
import type { WpProject } from "@/types/query";
import { getPrettyDate } from "@/utils/dates";
import { formatWpText } from "@/utils/posts";
import { formatProject, getFullTechName } from "@/utils/project";
import { truncate } from "@/utils/strings";

export const Head: React.FC<WpProject> = ({ data }) => {
	const project = formatProject(data.wpProject);
	const description = `${project.title}, created on ${getPrettyDate(
		project.firstReleased.date,
	)}, using ${project.longTechnologies.join(", ")}. ${truncate(
		formatWpText(project.content),
		150,
	)}`;

	return <HeadBase title={project.title} description={description} />;
};

const ProjectHeader: React.FC<{
	title: string;
	icons: FileNode[];
	repoLink?: string;
	firstReleasedDate: Date;
	hostedOn?: string;
	mainLink?: string;
	githubIcon: string;
}> = ({
	title,
	icons,
	repoLink,
	firstReleasedDate,
	hostedOn,
	mainLink,
	githubIcon,
}) => {
	const latestUpdateState = useFetchRepoUpdatedDate(repoLink);
	return (
		<TemplateHeaderContainer>
			<TechContainer style={{ rowGap: SIZE_SM }}>
				{hostedOn && (
					<ProjectHostedOn mainLink={mainLink} hostedOn={hostedOn} />
				)}
				{icons.map((i) => (
					<ProjectTech key={i.name} tech={i.name} publicURL={i.publicURL} />
				))}
			</TechContainer>
			<TemplateHeaderTitle>{title}</TemplateHeaderTitle>
			<Box>
				<PublishedDate date={firstReleasedDate} />
				<LatestUpdate state={latestUpdateState} />
				<RepoLink repoLink={repoLink} icon={githubIcon} />
			</Box>
		</TemplateHeaderContainer>
	);
};

const StyledHostedOnLink = styled.a`
  display: block;
  margin-bottom: ${SIZE_SM};
`;

const ProjectHostedOn: React.FC<{ hostedOn: string; mainLink?: string }> = ({
	hostedOn,
	mainLink,
}) => {
	return (
		<StyledHostedOnLink href={mainLink ?? "#"}>
			<ProjectHost host={hostedOn} />
		</StyledHostedOnLink>
	);
};

const Project: React.FC<WpProject> = ({ data }) => {
	const project = formatProject(data.wpProject);
	const icons: FileNode[] = data.allFile.nodes
		.filter((f) => project.shortTechnologies.includes(f.name))
		.map((f) => ({ ...f, name: getFullTechName(f.name) }));

	return (
		<Page>
			<NormalPageContents>
				<ProjectHeader
					icons={icons}
					title={project.title}
					repoLink={project.repoLink}
					firstReleasedDate={project.firstReleased.date}
					hostedOn={project.hostedOn}
					mainLink={project.mainLink}
					githubIcon={data.file.publicURL}
				/>
				<TemplateContent>
					<WpContent dangerouslySetInnerHTML={{ __html: project.content }} />
				</TemplateContent>
			</NormalPageContents>
		</Page>
	);
};

export const query = graphql`
  query ($id: String) {
    wpProject(id: { eq: $id }) {
      project {
        firstReleased
        hostedOn
        latestUpdate
        mainLink
        repoLink
        technologies
      }
      content
      title
    }
    allFile {
      nodes {
        publicURL
        name
      }
    }
    file(name: { eq: "Github" }) {
      publicURL
    }
  }
`;

const StyledRepoLink = styled.a``;

const RepoLink: React.FC<{ repoLink?: string; icon: string }> = ({
	repoLink,
	icon,
}) => {
	if (!repoLink) return null;
	return (
		<a href={repoLink} target="_blank" rel="noreferrer">
			<IconedText
				icon={<img src={icon} alt="Repository Link" />}
				text="View Repository"
			/>
		</a>
	);
};

export default Project;
