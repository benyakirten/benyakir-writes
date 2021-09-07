import * as React from "react";
import { graphql, navigate } from "gatsby";
import { Helmet } from "react-helmet";

import {
    Column,
    Grouping,
    LeadHeading,
    List,
    LItem,
    Paragraph,
    Row,
    SubHeading,
    WpContent,
} from "@Styles/general-components";

import Button from "@Gen/Button/Button.component";
import Loading from "@Gen/Loading/Loading.component";
import IconGrid from "@Gen/IconGrid/IconGrid.component";

import { getFullTechName, formatProject } from "@Utils/project";
import { firstWords } from "@Utils/strings";
import { formatWpText } from "@Utils/posts";
import { getPrettyDate } from "@Utils/dates";

import { WpProject } from "@Types/query";

const Project: React.FC<WpProject> = ({ data }) => {
    const project = formatProject(data.wpProject);
    const icons: FileNode[] = data.allFile.nodes
        .filter((f) => project.shortTechnologies.includes(f.name))
        .map((f) => ({ ...f, name: getFullTechName(f.name) }));

    const [latestUpdate, setLatestUpdate] = React.useState<Date>();
    const [err, setErr] = React.useState<string>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function fetchLatestUpdate(repo: string) {
            setLoading(true);
            try {
                const res = await fetch(repo);
                if (!res.ok) {
                    return setErr("Unable to fetch data");
                }
                const data = await res.json();
                setLatestUpdate(new Date(data.pushed_at));
            } catch (e) {
                setErr("Unable to fetch data");
            } finally {
                setTimeout(() => setLoading(false), 5000);
            }
        }
        if (project.repoLink) {
            fetchLatestUpdate(
                project.repoLink.replace("github.com/", "api.github.com/repos/")
            );
        }
    }, []);
    return (
        <>
            <Helmet>
                <title>{project.title}</title>
                <meta
                    name="description"
                    content={`${project.title}, created on ${getPrettyDate(project.firstReleased.date)}, using ${project.longTechnologies.join(', ')}. ${firstWords(formatWpText(project.content!), 150)}`}
                />
            </Helmet>
            <Grouping>
                <LeadHeading>{project.title}</LeadHeading>
            </Grouping>
            <Grouping>
                <SubHeading>General Info</SubHeading>
                {((project.hostedOn && project.mainLink) ||
                    project.repoLink) && (
                    <Row style={{ marginBottom: '2rem' }}>
                        {project.hostedOn && project.mainLink && (
                            <Button onClick={() => navigate(project.mainLink!)}>
                                On {project.hostedOn}
                            </Button>
                        )}
                        {project.repoLink && (
                            <Button onClick={() => navigate(project.repoLink!)}>
                                On GitHub
                            </Button>
                        )}
                    </Row>
                )}
                <WpContent
                    dangerouslySetInnerHTML={{ __html: project.content! }}
                />
            </Grouping>
            <Grouping>
                <SubHeading>Releases</SubHeading>
                <List>
                    <LItem>
                        First Released: {getPrettyDate(project.firstReleased.date)}
                    </LItem>
                    <LItem>
                        Latest update:&nbsp;
                        {!!project.latestUpdate && getPrettyDate(project.latestUpdate.date)}
                        {!project.latestUpdate && loading && (
                            <Loading size="1.4rem" />
                        )}
                        {!project.latestUpdate &&
                            !loading &&
                            latestUpdate &&
                            getPrettyDate(latestUpdate)}
                        {!project.latestUpdate && !loading && err}
                    </LItem>
                </List>
            </Grouping>
            <Grouping>
                <SubHeading>Technologies Used</SubHeading>
                <IconGrid height="10rem" icons={icons} />
            </Grouping>
        </>
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
