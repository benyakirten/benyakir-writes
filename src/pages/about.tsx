import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import {
    LeadHeading,
    BigParagraph,
    Subtitle,
    Grouping,
} from "@Styles/general-components";

import CustomLink from "@Gen/CustomLink/CustomLink.component";
import SkewRow from "@Gen/SkewRow/SkewRow.component";
import HoverImage from "@Gen/HoverImage/HoverImage.component";

import { ICONS_TO_LINKS, ICONS_TO_COLORS } from "@Constants";

import { SVGImageQuery } from "@Types/query";

const AboutPage: React.FC<SVGImageQuery> = ({ data }) => {
    const images = data.allFile.nodes.map((n) => ({
        ...n,
        url: ICONS_TO_LINKS[n.name as keyof typeof ICONS_TO_LINKS]
            ? ICONS_TO_LINKS[n.name as keyof typeof ICONS_TO_LINKS]
            : "#",
        color: ICONS_TO_COLORS[n.name as keyof typeof ICONS_TO_COLORS]
            ? ICONS_TO_COLORS[n.name as keyof typeof ICONS_TO_COLORS]
            : undefined,
    }));
    return (
        <>
            <Helmet>
                <title>Benyakir Writes - About</title>
                <meta
                    name="description"
                    content="Learn about why this website exists as well as links to my Github, blog and social media."
                />
            </Helmet>
            <Grouping>
                <LeadHeading>About</LeadHeading>
                <BigParagraph>
                    This is a site that has, more or less, the same
                    functionality as my blog I imagine that you're asking why
                    this page exists when a normal version can be found at{" "}
                    <CustomLink outside inline to="https://benyakiredits.com">
                        benyakiredits.com
                    </CustomLink>
                    .
                </BigParagraph>
            </Grouping>
            <Grouping>
                <Subtitle>The Technology</Subtitle>
                <BigParagraph>
                    This website's powered by{" "}
                    <CustomLink outside inline to="https://www.gatsbyjs.com">
                        GatsbyJS
                    </CustomLink>
                    . It may not mean much to you, but there are a few reasons
                    why this is valuable. Gatsby uses React, which is a single
                    page application. Normally, when you visit a website, your
                    computer sends a request to a server that processes the
                    request then sends information back. On my WordPress blog,
                    every time you visit a new page, the server processes the
                    request, generates the page based on the pages and posts
                    then sends back information. React, on the other hand,
                    doesn't do this. Your computer sends only one request. It
                    sends back one package that contains everything. Gatsby is a
                    little addition that has a few extra features to allow
                    search engine optimization and the use of GraphQL.
                </BigParagraph>
            </Grouping>
            <Grouping>
                <Subtitle>Some Examples</Subtitle>
                <BigParagraph>
                    First thing you can notice is that each section zooms out
                    and does something instead of having to load an entirely new
                    page. Also the sidebar stays open no matter what page you
                    visit. This is possible because of React. Or, rather, it's
                    facilitated by React. It wouldn't be easy with just
                    WordPress, and having a second site with its own routing and
                    data management makes it easier. Gatsby makes that a cinch
                    in a bunch of complicated ways I don't want to explain right
                    now.
                </BigParagraph>
            </Grouping>
            <Grouping>
                <Subtitle>My Links</Subtitle>
                <SkewRow>
                    {images.map((i, idx) => (
                        <HoverImage key={i + idx} {...i} />
                    ))}
                </SkewRow>
            </Grouping>
        </>
    );
};

export const query = graphql`
    query MyQuery {
        allFile(
            filter: { relativePath: { regex: "/^social/[a-zA-Z]+.svg$/" } }
        ) {
            nodes {
                publicURL
                name
            }
        }
    }
`;

export default AboutPage;
