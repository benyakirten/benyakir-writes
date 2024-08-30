import styled from "styled-components";

import { fadeIn, slideInLeft, slideInRight } from "./animations";
import { media } from "./queries";
import {
	FONT_SIZE_MD,
	SIZE_MD,
	TRANSITION_EXTRA_SLOW,
	TRANSITION_NORMAL,
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

import { hoverUnderline, textClipWithHoverTransition } from "./style-mixins";

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

  ${(props) => textClipWithHoverTransition(props.theme.header.startColor, props.theme.header.endColor)}

  ${media.phone} {
    ${FONT_XXL};
  }
`;

export const Subtitle = styled.h2`
  position: relative;

  margin-bottom: ${SIZE_MD};

  ${FONT_XL};

  ${(props) => textClipWithHoverTransition(props.theme.header.startColor, props.theme.header.endColor)}

  ${media.phone} {
    ${FONT_LG};
  }
`;

export const BigParagraph = styled.p`
  ${FONT_XL};
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

      background-color: ${(props) => props.theme.base.background};

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

export const Card = styled.div`
  border-radius: ${SIZE_XS};
  border: 1px solid ${(props) => props.theme.base.border};

  padding: ${SIZE_SM};
  background-color: ${(props) => props.theme.base.background};
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
    ${(props) => hoverUnderline(props.theme.base.link)}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${SANS_SERIF_FONT};
    padding: ${SIZE_MD} 0;
    ${(props) => textClipWithHoverTransition(props.theme.header.startColor, props.theme.header.endColor)}
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

  code {
    font-family: monospace;
    font-size: ${FONT_SIZE_MD};
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
  color: ${(props) => props.theme.base.textColor};
  background-color: ${(props) => props.theme.pill.background};

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
