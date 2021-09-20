import * as React from "react";
import { navigate } from "gatsby";

import {
    Card,
    CardLinkBox,
    CardSection,
    DisappearOnPhone,
    Row,
    SubHeading,
    WpContentDescription,
} from "@Styles/general-components";

import Button from "@Gen/Button/Button.component";
import IconGrid from "@Gen/IconGrid/IconGrid.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { firstWords } from "@Utils/strings";

import { ProjectCardProps } from "@Types/props";

const ProjectCard: React.FC<ProjectCardProps> = ({ project, icons }) => {
    return (
        <Card>
            <Row style={{ alignItems: "stretch" }}>
                <CardSection>
                    <SubHeading noUnderline>
                        <CustomLink to={`/project/${project.slug}`}>
                            {project.title}
                        </CustomLink>
                    </SubHeading>
                    <WpContentDescription
                        dangerouslySetInnerHTML={{
                            __html: firstWords(project.content, 200),
                        }}
                    />
                    <DisappearOnPhone>
                        <CardLinkBox>
                            <Button
                                onClick={() =>
                                    navigate(`/project/${project.slug}`)
                                }
                            >
                                More Information
                            </Button>
                            {project.hostedOn && project.mainLink && (
                                <Button
                                    onClick={() => navigate(project.mainLink!)}
                                >
                                    On {project.hostedOn}
                                </Button>
                            )}
                            {project.repoLink && (
                                <Button
                                    onClick={() => navigate(project.repoLink!)}
                                >
                                    On GitHub
                                </Button>
                            )}
                        </CardLinkBox>
                    </DisappearOnPhone>
                </CardSection>
                <DisappearOnPhone>
                    <CardSection>
                        <SubHeading>Technologies Used</SubHeading>
                        <IconGrid icons={icons} />
                    </CardSection>
                </DisappearOnPhone>
            </Row>
        </Card>
    );
};

export default ProjectCard;
