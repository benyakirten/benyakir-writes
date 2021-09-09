import * as React from "react";
import { Helmet } from "react-helmet";

import {
    LeadHeading,
    BigParagraph,
    Subtitle,
    Grouping,
} from "@Styles/general-components";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

const IndexPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Benyakir Writes - Home</title>
                <meta
                    name="description"
                    content="Benyakir Writes is a portal to my latest work. Learn about the latest books, projects and short stories I've written.
                    Or check out my blog posts, reviews of books or podcast episodes."
                />
            </Helmet>
            <Grouping>
                <LeadHeading>Welcome to Benyakir Writes</LeadHeading>
                <BigParagraph>
                    A portal into my mind: as an author, I write about the
                    oncoming future and the way our world leads into it. As a
                    programmer, I participate in it and embrace the wonders that
                    our modernity can provide.
                </BigParagraph>
            </Grouping>
            <Grouping>
                <Subtitle>
                    To get started, click on the bar to the left.
                </Subtitle>
                <BigParagraph>
                    Inside you'll find the nav menu. From there you can read
                    articles from my blog, about me as an author or as a
                    programmer and web designer. Also you can unfold each
                    subsection and directly access what you want to see.
                </BigParagraph>
            </Grouping>
            <Grouping>
                <Subtitle>Need to contact me?</Subtitle>
                <BigParagraph>
                    If you want to learn about what I can offer you, you can visit the <CustomLink to="/contact">contact page</CustomLink>.
                    Or you can send me an email at <CustomLink outside to="mailto:ben@benyakiredits.com">ben@benyakiredits.com</CustomLink>.
                </BigParagraph>
            </Grouping>
        </>
    );
};

export default IndexPage;
