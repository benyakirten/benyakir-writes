import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import { LogoContainer } from "./Logo.styles";

import { LogoProps } from "@Types/props";

const Logo: React.FC<LogoProps> = ({ opening }) => {
    const data = useStaticQuery(graphql`
        query {
            file(name: { eq: "Logo" }) {
                publicURL
            }
        }
    `);
    return (
        <Link to="/">
            <LogoContainer
                src={data?.file?.publicURL}
                alt="Benyakir Writes Logo"
                opening={opening}
            />
        </Link>
    );
};

export default Logo;
