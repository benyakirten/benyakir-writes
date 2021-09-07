import * as React from "react";
import { Helmet } from "react-helmet";

import CustomLink from "@Gen/CustomLink/CustomLink.component";
import { BigParagraph, LeadHeading } from "@Styles/general-components";

// markup
const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>Benyakir Writes - 404</title>
                <meta
                    name="description"
                    content="This page wasn't found. Please navigate to another page."
                />
            </Helmet>
            <LeadHeading>Page Not Found</LeadHeading>
            <BigParagraph>
                Unfortunately, the page you were looking for doesn't exist. I suggest you find a link that better suits you from the left hand side.
                Or you can just visit the <CustomLink to="/">home page by clicking here</CustomLink>.
            </BigParagraph>
        </>
    );
};

export default NotFoundPage;
