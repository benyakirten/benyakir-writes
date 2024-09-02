import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import IconedText from "@/components/Cards/IconedText.component";
import { MailIcon, ResumeIcon } from "@/components/Icons";
import { useAppSelector } from "@/store/hooks";
import { media } from "@/styles/queries";
import {
	FONT_SIZE_LG,
	FONT_SIZE_SM,
	FONT_SIZE_XS,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
	Z_ABOVE,
} from "@/styles/variables";
import { ImageQuery } from "@/types/general";
import { convertHexToHSL, isBgDark, parseHSLString } from "@/utils/colors";
import { downloadFile } from "@/utils/dom";
import { GatsbyImage } from "gatsby-plugin-image";

const StyledProfile = styled.div`
	display: flex;
	gap: ${SIZE_SM};

	margin: ${SIZE_SM} 0;
`;

const StyledNameContainer = styled.p`
	display: grid;
	gap: ${SIZE_XS};
`;

const StyledName = styled.span`
	font-weight: bold;
	font-size: ${FONT_SIZE_LG};
`;

const StyledTitle = styled.span`
	font-size: ${FONT_SIZE_SM};
`;

const StyledImage = styled.div`
	display: block;
	${media.phone} {
		display: none;
	}
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
				<StyledImage>
					<GatsbyImage alt="Ben Horowitz" image={profilePicture} />
				</StyledImage>
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

const StyledBio = styled.p``;

const StyledLinks = styled.div`
	display: grid;
	gap: ${SIZE_XS};
`;

const StyledLinkImage = styled.img`
	width: 1.5rem;
	height: 1.5rem;
`;

const StyledLinkText = styled.p`
	font-size: ${FONT_SIZE_XS};

	opacity: 0.6;
	color: ${(props) => props.theme.base.textColor};
	transition: opacity ${TRANSITION_NORMAL} ease;
`;

const PortfolioAnchor = styled.a`
	width: max-content;
	grid-column: span 1;

	&:hover p, &:focus p {
		opacity: 1;
	}
`;

const PortfolioLink: React.FC<{
	to: string;
	text: React.ReactNode;
	icon: React.ReactNode;
}> = ({ to, text, icon }) => {
	return (
		<PortfolioAnchor href={to}>
			<IconedText icon={icon} text={<StyledLinkText>{text}</StyledLinkText>} />
		</PortfolioAnchor>
	);
};

const GitHubIcon = styled(StyledLinkImage)<{ $isDark: boolean }>`
	filter: invert(${(props) => (props.$isDark ? 1 : 0)});
	background: none;
`;

const StyledResumeButton = styled.button`
	width: fit-content;
	grid-column: span 1;
	&:hover p, &:focus p {
		opacity: 1;
	}
`;

const ResumeButton: React.FC<{ resume: string }> = ({ resume }) => (
	<StyledResumeButton
		type="button"
		onClick={() => downloadFile(resume, "Resume - Ben Horowitz.pdf")}
	>
		<IconedText
			icon={<ResumeIcon />}
			text={<StyledLinkText>Resume</StyledLinkText>}
		/>
	</StyledResumeButton>
);

const AboutMe: React.FC<{
	ghIcon?: string;
	liIcon?: string;
	resume?: string;
}> = ({ ghIcon, liIcon, resume }) => {
	const theme = useAppSelector((root) => root.theme.active);
	const isDark = isBgDark(theme.id, theme.name, theme.base.background);

	return (
		<StyledAboutMe>
			<Profile />
			<StyledBio>
				I am a passionate full-stack web developer with four years of experience
				building every part of web applications. I am eternally curious, a quick
				learner, self-motivated and a team player. I use every frontend
				technology, including React, Vue, Angular, Svelte and vanilla
				JavaScript. I also work with databases, Python, Node, Go, Rust and
				Elixir.
			</StyledBio>
			<StyledBio>
				I studied at the University of Colorado Boulder for my undergraduate,
				where I studied Classics, Linguistics and Italian (graduated{" "}
				<em>Summa cum Laude</em>). I have been a member of Phi Beta Kappa since
				2010. I studied for my Masters in Italian Language at Middlebury College
				and lived in Italy for two years (2014-2016).
			</StyledBio>
			<StyledBio>
				I speak Italian fluently, studied Latin and Greek and used to converse
				in French (though it has been more than a decade since I last used it).
				I worked as a writer and editor prior to becoming a developer. Much of
				the same passion drives me in both fields: the desire to create, the
				intense curiosity of how all things work, the need for both long-term
				planning and quick thinking, and the ability to work independently, be a
				team player and become a leader as the situation demands.
			</StyledBio>
			<StyledLinks>
				<PortfolioLink
					to="mailto:ben@benyakiredits.com"
					text="Email"
					icon={<MailIcon />}
				/>
				{resume && <ResumeButton resume={resume} />}
				{ghIcon && (
					<PortfolioLink
						to="https://github.com/benyakirten"
						text="GitHub"
						icon={<GitHubIcon $isDark={isDark} src={ghIcon} alt="GitHub" />}
					/>
				)}
				{liIcon && (
					<PortfolioLink
						to="https://www.linkedin.com/in/ben-horowitz-93609b8a/"
						text="LinkedIn"
						icon={<StyledLinkImage src={liIcon} alt="LinkedIn" />}
					/>
				)}
			</StyledLinks>
		</StyledAboutMe>
	);
};

export default AboutMe;
