import { graphql } from "gatsby";
import * as React from "react";

import {
	Box,
	NormalPageContents,
	Page,
	TemplateContent,
	TemplateHeaderContainer,
	TemplateHeaderTitle,
	WpContent,
} from "@/styles/general-components";

import { PublishedDate } from "@/components/Cards/IconedText.component";
import {
	LatestUpdate,
	ProjectHost,
	ProjectTech,
	TechContainer,
} from "@/components/General";
import { HeadBase } from "@/components/SEO";
import { useFetchRepoUpdatedDate } from "@/hooks";
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
}> = ({ title, icons, repoLink, firstReleasedDate, hostedOn, mainLink }) => {
	const latestUpdateState = useFetchRepoUpdatedDate(repoLink);
	return (
		<TemplateHeaderContainer>
			<TechContainer>
				{hostedOn && (
					<a href={mainLink ?? "#"}>
						<ProjectHost host={hostedOn} />
					</a>
				)}
				{icons.map((i) => (
					<ProjectTech key={i.name} tech={i.name} publicURL={i.publicURL} />
				))}
			</TechContainer>
			<TemplateHeaderTitle>{title}</TemplateHeaderTitle>
			<Box>
				<PublishedDate date={firstReleasedDate} />
				<LatestUpdate state={latestUpdateState} />
			</Box>
		</TemplateHeaderContainer>
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
  }
`;

export default Project;
