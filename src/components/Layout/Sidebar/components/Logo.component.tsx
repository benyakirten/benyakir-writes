import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import styled from "styled-components";

import { LogoProps, LogoQuery } from "@/types/props/layout";
import { SVGContainer } from "@/styles/general-components";
import { TRANSITION_SLOW } from "@/styles/variables";

const LogoContainer = styled(SVGContainer)<{
	opening: boolean;
	open: boolean;
}>`
  position: relative;
  margin-top: 1rem;
  left: ${(props) => (props.open ? "0" : "83%")};
  transition: left ${TRANSITION_SLOW} ease;

  animation: ${(props) =>
		props.opening ? "500ms rotate ease forwards" : "none"};
`;

const Logo: React.FC<LogoProps> = ({ opening, open }) => {
	const data: LogoQuery = useStaticQuery(graphql`
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
				role="img"
				alt="Benyakir Writes Logo"
				opening={opening}
				open={open}
				aria-label="Logo"
			/>
		</Link>
	);
};

export default Logo;
