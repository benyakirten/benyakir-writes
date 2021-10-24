import * as React from "react"
import { navigate } from "gatsby"

import {
    Card,
    CardLinkBox,
    CardSection,
    DisappearOnPhone,
    Row,
    SubHeading,
    WpContentDescription,
} from "@Styles/general-components"

import Button from "@Gen/Button/Button.component"
import IconGrid from "@Gen/IconGrid/IconGrid.component"
import CustomLink from "@Gen/CustomLink/CustomLink.component"

import { ProjectCardProps } from "@Types/props"

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
    return (
        <Card>
            <Row style={{ alignItems: "stretch" }}>
                <CardSection>
                    <SubHeading noUnderline>
                        <CustomLink to={`/project/${item.slug}`}>
                            {item.title}
                        </CustomLink>
                    </SubHeading>
                    <WpContentDescription
                        fontSize="1.4rem"
                        dangerouslySetInnerHTML={{
                            __html: item.content,
                        }}
                    />
                    <DisappearOnPhone>
                        <CardLinkBox>
                            <Button
                                onClick={() => navigate(`/project/${item.slug}`)}
                            >
                                More Information
                            </Button>
                            {item.hostedOn && item.mainLink && (
                                <Button onClick={() => navigate(item.mainLink!)}>
                                    On {item.hostedOn}
                                </Button>
                            )}
                            {item.repoLink && (
                                <Button onClick={() => navigate(item.repoLink!)}>
                                    On GitHub
                                </Button>
                            )}
                        </CardLinkBox>
                    </DisappearOnPhone>
                </CardSection>
                <CardSection>
                    <SubHeading>Technologies Used</SubHeading>
                    <IconGrid icons={item.icons} />
                </CardSection>
            </Row>
        </Card>
    )
}

export default ProjectCard
