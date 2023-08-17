import styled, { css, keyframes } from 'styled-components'

import { media } from '@/styles/queries'
import { convertHexToRGBA } from '@/utils/colors'
import {
  FAUSTINA,
  FONT_LG,
  FONT_MD,
  FONT_SM,
  SHADOW_SM,
  TRANSITION_FAST,
  TRANSITION_NORMAL,
  TRANSITION_SLOW,
  Z_ABOVE,
  Z_HIGH
} from '@Styles/variables'

export const ProjectBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30%, 1fr));
  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
  gap: 4rem;
`

export const ProjectBox = styled.article<{ highlighted?: boolean }>`
  position: relative;
  z-index: ${(props) => (props.highlighted ? Z_HIGH : Z_ABOVE)};
  border-radius: 4px;
  font-size: ${FONT_SM};
  box-shadow: 2px 1px 8px 2px ${(props) => props.theme.base.shadowColor}60;
  padding: 1rem;
  
  background-color: ${(props) =>
    `${props.theme.base.background}${props.highlighted ? '99' : ''}`};
  scale: ${props => props.highlighted ? '1.04' : '1'};
  transition: scale ${TRANSITION_FAST} ease-in, background-color ${TRANSITION_FAST} ease-in;
`

// TODO: update this to use grid instead of
// a bunch of flex boxes
export const ProjectContents = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30rem;
  height: 100%;
  gap: 1rem;
`

export const ProjectTitle = styled.h3`
  font-size: ${FONT_LG};
  text-decoration: underline;
  font-family: ${FAUSTINA};
  display: inline;
`

export const ProjectDescription = styled.p`
  text-overflow: ellipsis;
  font-size: ${FONT_MD};

  a,
  a:visited {
    color: ${(props) => props.theme.base.textColor};
    text-decoration: underline;
  }
`

export const ProjectCardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const TitleDateContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const ProjectCardBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.5rem;
`

export const ProjectDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const GitHubIcon = styled.img.attrs<{ ghIcon: string }>(
  ({ ghIcon }) => ({
    alt: 'GitHub Link',
    src: ghIcon,
    height: '18px',
    width: '18px',
  })
) <{ ghIcon: string }>`
  display: inline;
  margin-left: 0.5rem;
`

export const TechBadges = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const TechBadge = styled.span<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected
      ? props.theme.button.default.textColor
      : props.theme.button.default.background};
  color: ${(props) =>
    props.selected
      ? props.theme.button.default.background
      : props.theme.button.default.textColor};
  transition: background-color ${TRANSITION_NORMAL} ease,
    color ${TRANSITION_NORMAL} ease;

  border: 1px solid ${(props) => props.theme.button.border};
  box-shadow: ${(props) =>
    `${SHADOW_SM} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};

  border-radius: 1rem;
  padding: 0.5rem 1rem;
`

export const TechnologyLabel = styled.label<{ checked: boolean }>`
  position: relative;
  cursor: pointer;
  z-index: ${Z_ABOVE};
  font-size: ${FONT_MD};
  height: min-content;
`
export const TechnologyCheckox = styled.input.attrs<{ checked: boolean }>(
  (checked) => ({
    type: 'checkbox',
    checked,
  })
) <{ checked: boolean }>`
  display: none;
`

export const PortfolioBackground = styled.div`
  position: relative;
  padding: 2rem 4rem;
  min-height: 100vh;
  ${media.tablet} {
    padding: 1rem 2rem;
  }
  background: ${(props) =>
    css`linear-gradient(to bottom, ${props.theme.base.background} 5%, ${props.theme.portfolio.gradient.color1}, ${props.theme.portfolio.gradient.color2} 75%, ${props.theme.portfolio.gradient.color3})`};
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: min-content;

  max-width: 30%;

  ${media.phone} {
    max-width: 100%;
  }
`

export const PortfolioHeader = styled.div`
  display: flex;
  flex-direction: row;

  ${media.phone} {
    flex-direction: column;
  }
  gap: 8rem;
  justify-content: space-between;

  margin: 2rem 0;

  padding: 2rem 4rem;
  ${media.tablet} {
    padding: 1rem 2rem;
  }
`

export const PortfolioDescription = styled.p`
  text-align: left;
  width: 40%;
  ${media.phone} {
    width: 100%;
  }
  line-height: 1.8rem;
  font-size: ${FONT_MD};
  z-index: 1;
`

export const PortfolioSVGContainer = styled.div<{
  xPosition: number
  yPosition: number
}>`
  position: absolute;
  top: ${(props) => props.yPosition}px;
  left: ${(props) => props.xPosition}px;
`

export const ProjectLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: contents;
`

const backdropFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
`

export const Backdrop = styled.div`
  position: absolute;
  z-index: ${Z_ABOVE};
  top: 0;
  left: 0;
  height: 1000vh;
  width: 1000vh;
  background-color: ${props => props.theme.base.background};
  animation: ${backdropFadeIn} ${TRANSITION_SLOW} ease-in forwards;
`
