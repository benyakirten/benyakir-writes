import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

import { fadeIn, slideInLeft, slideInRight } from "./animations";
import { media } from "./queries";
import {
	BLACK,
	SERIF_FONT,
	FONT_SIZE_LG,
	FONT_SIZE_MD,
	FONT_SIZE_XL,
	SECONDARY_800,
	SIZE_MD,
	TRANSITION_EXTRA_SLOW,
	TRANSITION_NORMAL,
	TRANSITION_SLOW,
	SANS_SERIF_FONT,
	SIZE_SM,
	SIZE_XS,
	SIZE_LG,
	FONT_SIZE_XXS,
	FONT_XXXL,
	FONT_XXL,
	FONT_XL,
	FONT_MD,
	FONT_LG,
} from "./variables";

export const FadeIn = styled.div<{ duration?: string; delay?: string }>`
  opacity: 0;
  animation: ${fadeIn}
    ${(props) => (props.duration ? props.duration : TRANSITION_NORMAL)}
    ${(props) => (props.delay ? props.delay : "0ms")} ease forwards;
`;

export const SlideInLeft = styled.div<{ duration?: string; delay?: string }>`
  opacity: 0;
  transform: translateX(-40vw);
  animation: ${slideInLeft}
    ${(props) => (props.duration ? props.duration : TRANSITION_EXTRA_SLOW)}
    ${(props) => (props.delay ? props.delay : "0ms")} ease forwards;
`;

export const SlideInRight = styled.div<{ duration?: string; delay?: string }>`
  opacity: 0;
  transform: translateX(40vw);
  animation: ${slideInRight}
    ${(props) => (props.duration ? props.duration : TRANSITION_EXTRA_SLOW)}
    ${(props) => (props.delay ? props.delay : "0ms")} ease forwards;
`;

export const Grouping = styled.section<{ marginVertical?: string }>`
  position: relative;
  margin-top: ${(props) => (props.marginVertical ? props.marginVertical : "0")};
  margin-bottom: ${(props) =>
		props.marginVertical ? props.marginVertical : "4rem"};
`;

// TODO: Make the colors look good
export const LeadHeading = styled.h1`
  position: relative;

  margin-bottom: ${SIZE_MD};

  ${FONT_XXXL};

  background-image: linear-gradient(45deg, ${(props) => props.theme.base.textColor} 30%, ${(props) => props.theme.base.highlighted});
  background-position: left;
  background-size: 300%;
  background-clip: text;
  color: transparent;
  transition: background-position ${TRANSITION_EXTRA_SLOW} ease;

  &:hover {
    background-position: right;
  }

  ${media.phone} {
    ${FONT_XXL};
  }
`;

export const Subtitle = styled.h2`
  position: relative;

  margin-bottom: ${SIZE_MD};

  ${FONT_XL};

  background-image: linear-gradient(45deg, ${(props) => props.theme.base.textColor} 50%, ${(props) => props.theme.base.highlighted});
  background-position: left;
  background-size: 300%;
  background-clip: text;
  color: transparent;
  transition: background-position ${TRANSITION_EXTRA_SLOW} ease;

  &:hover {
    background-position: right;
  }

  ${media.phone} {
    ${FONT_LG};
  }
`;

export const MinorHeading = styled.h4`
    font-family: ${SERIF_FONT};
    font-size: ${FONT_SIZE_LG};

    ${media.tablet} {
        margin-bottom 0.5rem;
        font-size: ${FONT_SIZE_MD};
    }
`;

export const BigParagraph = styled.p<{
	marginRight?: string;
	marginVertical?: string;
}>`
  font-size: ${FONT_SIZE_XL};
  margin-top: ${(props) => (props.marginVertical ? props.marginVertical : "0")};
  margin-bottom: ${(props) =>
		props.marginVertical ? props.marginVertical : "0"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0")};
`;

export const Paragraph = styled.p`
  font-size: ${FONT_SIZE_MD};
  margin: 0;
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: ${FONT_SIZE_MD};
`;

export const Card = styled.div`
	border-radius: ${SIZE_XS};
	border: 1px solid ${(props) => props.theme.base.border};
	
	padding: ${SIZE_SM};
	background-color: ${(props) => props.theme.base.background};
`;

export const CardSection = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

export const CardDoubleSection = styled.div`
  flex: 2;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

export const VerticalSeparator = styled.div`
  padding-top: 10rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 2rem 2rem;
`;

export const Row = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const RowUntilPhone = styled.div`
  display: flex;
  align-items: center;

  ${media.phone} {
    flex-direction: column;
    align-items: start;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const NoLineBreak = styled.span`
  white-space: nowrap;
`;

export const CardLinkBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1rem;
  gap: 1rem;
`;

export const HoverableContainer = styled.div<{
	height?: number;
	width?: number;
}>`
  height: ${(props) => (props.height ? `${props.height}px` : "200px")};
  width: ${(props) => (props.height ? `${props.width}px` : "134px")};

  border: 2px solid ${BLACK};

  overflow: hidden;
`;

export const HoverableGatsbyImage = styled(GatsbyImage)`
  transition: transform calc(2 * ${TRANSITION_EXTRA_SLOW});
  &:hover {
    transform: scale(1.2);
  }
`;

export const List = styled.ul`
  font-size: ${FONT_SIZE_MD};
`;

export const LItem = styled.li`
  margin: 1rem 0;
`;

export const WpContentDescription = styled.div<{ fontSize?: string }>`
  ${FONT_MD};

  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  a:link,
  a:visited {
    position: relative;

    color: ${SECONDARY_800};

    overflow: hidden;
    white-space: nowrap;

    &::after {
      content: '';

      position: absolute;
      left: 0;
      bottom: 0;

      height: 2px;
      width: 100%;

      background-color: ${SECONDARY_800};

      transition: transform ${TRANSITION_NORMAL} ease;
      transform-origin: left;
      transform: scaleX(0);
    }

    &:hover {
      &::after {
        transform: scaleX(1);

        ${media.reducedMotion} {
          transform: scaleX(0);
        }
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;

  transition: all ${TRANSITION_SLOW} ease;
`;

export const ControlGroup = styled.div`
  margin: 1rem 0;
`;

export const DisappearOnTablet = styled.div`
  ${media.desktop} {
    display: none;
  }
`;

export const DisappearOnPhone = styled.div`
  ${media.phone} {
    display: none;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  gap: ${SIZE_MD};
`;

export const FlatBox = styled(Box)`
  margin: 0;
`;

// https://stackoverflow.com/questions/24933430/img-src-svg-changing-the-styles-with-css
export const SVGContainer = styled.div<{
	src: string;
	alt: string;
	size?: string;
}>`
  position: relative;

  background-color: ${(props) => props.theme.base.textColor};
  mask: url(${(props) => props.src}) no-repeat center;

  height: ${(props) => props.size ?? SIZE_MD};
  width: ${(props) => props.size ?? SIZE_MD};
`;

export const WpContent = styled.div`
  ${FONT_LG};

  ${media.phone} {
    ${FONT_MD};
  }

  a:link,
  a:visited {
    width: min-content;

    background-color: transparent;
    background-image: linear-gradient(${(props) => props.theme.link.dark}, ${(props) => props.theme.link.dark});
    background-repeat: no-repeat;
    background-size: 0px 2px;
    background-position: 0 100%;
    text-decoration: none;

    transition: background-size ${TRANSITION_SLOW} ease;

    &:hover, &:focus-within {
      background-size: 100% 2px;
    }

    &:focus-within {
      outline: 1px solid ${(props) => props.theme.link.dark};
    }

    ${media.noHover} {
      background-size: 100% 2px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${SANS_SERIF_FONT};
    margin: ${SIZE_MD} 0;
  }


  ul,
  ol,
  li {
    margin-left: ${SIZE_SM};
  }

  ul:has(li > a), ol:has(li > a) {
    list-style-type: disc;
  }

  p {
    margin: ${SIZE_MD} 0;
  }
`;

export const Page = styled.div`
  overflow-y: auto;
  height: 100vh;
`;

export const PageContents = styled.div`
  padding: 2rem 4rem;
  ${media.tablet} {
    padding: 1rem 4rem;
  }
`;

export const PillContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

  white-space: nowrap;
	
  height: min-content;
  width: min-content;

	font-family: ${SANS_SERIF_FONT};
  font-size: ${FONT_SIZE_XXS};
  text-transform: capitalize;
  
  border-radius: ${SIZE_LG};
  color: ${(props) => props.theme.base.pillText};
  background-color: ${(props) => props.theme.base.pillBackground};

	padding: ${SIZE_XS} ${SIZE_SM};

  ${media.phone} {
    padding: ${SIZE_XS};
  }
`;

export const PaginatedPageContents = styled.div`
  padding: 2rem 18rem 4rem 1rem;
  ${media.phone} {
    padding: 2rem 0.5rem 4rem 0.5rem;
  }
`;

export const NormalPageContents = styled.div`
  padding: 2rem 1rem;
  ${media.phone} {
    padding: 2rem 0.5rem;
  }
`;

export const TemplateHeaderTitle = styled(LeadHeading)`
  margin-bottom: 0;
`;

export const TemplateContent = styled.div`
  margin: ${SIZE_MD} 0;
`;

export const TemplateHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIZE_XS};
  margin-bottom: ${SIZE_SM};
`;
