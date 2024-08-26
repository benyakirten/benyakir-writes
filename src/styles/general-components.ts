import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

import { convertHexToRGBA } from "@Utils/colors";
import { fadeIn, slideInLeft, slideInRight } from "./animations";
import { media } from "./queries";
import {
	BLACK,
	SERIF_FONT,
	FONT_SIZE_LG,
	FONT_SIZE_MD,
	FONT_SIZE_XL,
	SECONDARY_800,
	SHADOW_MD_BALANCED,
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
} from "./variables";
import { multiplyCSSNumber } from "@/utils/strings";

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

export const GroupingBox = styled.section`
  position: relative;
  padding: 1rem;
  box-shadow: ${(props) =>
		`${SHADOW_MD_BALANCED} ${convertHexToRGBA(
			props.theme.base.shadowColor,
			0.4,
		)}`};
`;

// TODO: Make the colors look good
export const LeadHeading = styled.h1`
  position: relative;

  padding-bottom: 1rem;
  margin-bottom: 1rem;

  ${FONT_XXXL};

  background-image: linear-gradient(45deg, ${(props) => props.theme.base.textColor} 50%, ${(props) => props.theme.base.highlighted});
  background-position: left;
  background-size: 300%;
  background-clip: text;
  color: transparent;
  transition: background-position ${multiplyCSSNumber(TRANSITION_EXTRA_SLOW, 1.5)} ease;

  &:hover {
    background-position: right;
  }

  ${media.phone} {
    ${FONT_XXL};
  }
`;

export const Subtitle = styled.h2<{ noUnderline?: boolean }>`
    font-family: ${SERIF_FONT};
    ${FONT_XXL};

    ${media.phone} {
        ${FONT_XL};;
    }
    text-decoration: ${(props) => (props.noUnderline ? "none" : "underline")};

    margin-bottom: 1rem;

    ${media.tablet} {
        margin-bottom 0.5rem;
        ${FONT_XL};
    }
`;

export const SubHeading = styled.h3<{ noUnderline?: boolean }>`
  font-family: ${SERIF_FONT};
  font-size: ${FONT_SIZE_XL};
  text-decoration: ${(props) => (props.noUnderline ? "none" : "underline")};

  margin-bottom: 0.5rem;

  ${media.tablet} {
    font-size: ${FONT_SIZE_LG};
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

// There's no reason to include a third google font
// and cause browsers to download another ~10kb of data
// Especially since the monospace font will only be used here
export const Card = styled.article`
  position: relative;

  height: 24rem;
  box-shadow: ${SHADOW_MD_BALANCED};

  font-family: monospace;

  overflow: auto;

  padding: 2rem;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
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
  font-size: ${(props) => (props.fontSize ? props.fontSize : FONT_SIZE_LG)};
  ${media.desktop} {
    font-size: ${FONT_SIZE_MD};
  }
  text-overflow: ellipsis;

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
  margin: 1rem 0;
  gap: 1rem;
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

export const WpContent = styled.div<{ fontSize?: string }>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : FONT_SIZE_LG)};

  ${media.phone} {
    font-size: ${(props) => (props.fontSize ? props.fontSize : FONT_SIZE_MD)};
  }

  a:link,
  a:visited {
    position: relative;

    color: ${(props) => props.theme.base.textColor};

    overflow: hidden;
    white-space: nowrap;

    &::after {
      content: '';

      position: absolute;
      left: 0;
      bottom: 0;

      height: 2px;
      width: 100%;

      background-color: ${(props) => props.theme.base.textColor};

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${SERIF_FONT};
    margin: 2rem 0;
  }

  ol,
  li {
    margin-left: 1rem;
  }

  p {
    margin: 1rem 0;
  }
`;

export const WpContentInline = styled.span<{ fontSize?: string }>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : FONT_SIZE_LG)};

  a:link,
  a:visited {
    position: relative;

    color: ${(props) => props.theme.base.textColor};

    overflow: hidden;
    white-space: nowrap;

    &::after {
      content: '';

      position: absolute;
      left: 0;
      bottom: 0;

      height: 2px;
      width: 100%;

      background-color: ${(props) => props.theme.base.textColor};

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${SERIF_FONT};
    margin: 2rem 0;
  }

  ol,
  li {
    margin-left: 1rem;
  }

  p {
    margin: 0.25rem 0;
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
