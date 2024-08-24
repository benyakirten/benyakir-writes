import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";

import { ImageQuery } from "@/types/general";
import {
	FONT_LG,
	FONT_SM,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	Z_ABOVE,
} from "@/styles/variables";
import { GatsbyImage } from "gatsby-plugin-image";

const StyledProfile = styled.div`
	display: flex;
	gap: ${SIZE_SM};

	margin: ${SIZE_MD} ${SIZE_SM};
`;

const StyledNameContainer = styled.p`
	display: grid;
	gap: ${SIZE_XS};
`;

const StyledName = styled.span`
	font-weight: bold;
	font-size: ${FONT_LG};
`;

const StyledTitle = styled.span`
	font-size: ${FONT_SM};
`;

const Profile: React.FC = () => {
	const profilePicture = useStaticQuery<ImageQuery>(graphql`
		query ProfilePictureQuery {
			file (name: { eq: "profile_picture"}) {
				childrenImageSharp {
					gatsbyImageData(width: 80)
				}
			}
		}
	`).file?.childrenImageSharp[0].gatsbyImageData;

	return (
		<StyledProfile>
			{profilePicture && (
				<GatsbyImage alt="Ben Horowitz" image={profilePicture} />
			)}
			<StyledNameContainer>
				<StyledName>Ben Horowitz</StyledName>
				<StyledTitle>Full Stack Developer</StyledTitle>
			</StyledNameContainer>
		</StyledProfile>
	);
};

const StyledAboutMe = styled.div`
	position: relative;
	z-index: ${Z_ABOVE};

	display: grid;
	gap: ${SIZE_SM};

	padding: ${SIZE_SM};

	background-color: ${({ theme }) => theme.base.background};
	border: 1px solid ${(props) => props.theme.base.border};
	border-radius: ${SIZE_SM};
`;
const StyledLink = styled(Link)``;
const AboutMe: React.FC = () => {
	return (
		<StyledAboutMe>
			<Profile />
		</StyledAboutMe>
	);
};

export default AboutMe;
