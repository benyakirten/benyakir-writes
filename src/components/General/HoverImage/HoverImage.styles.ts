import styled from 'styled-components'

import { media } from '@Styles/queries'
import { FONT_LG, TRANSITION_NORMAL } from '@StyleVars'
import { multiplyCSSNumber } from '@Utils/strings'

export const StyledFigure = styled.figure<{
  color?: string
  size?: string
  square?: boolean
  marginRightOnPhone?: string
}>`
  position: relative;
  border-radius: ${(props) => (props.square ? 'none' : '50%')};

  ${media.phone} {
    display: flex;
    align-items: center;
  }

  img {
    border-radius: ${(props) => (props.square ? 'none' : '50%')};
    height: ${(props) => (props.size ? props.size : '10rem')};
    width: ${(props) => (props.size ? props.size : '10rem')};
    transition: all ${TRANSITION_NORMAL} ease;

    ${media.phone} {
      margin-right: ${(props) =>
        props.marginRightOnPhone ? props.marginRightOnPhone : '2rem'};
      min-height: ${(props) => (props.size ? props.size : '10rem')};
      min-width: ${(props) => (props.size ? props.size : '10rem')};
    }
  }

  figcaption {
    text-align: center;
    font-size: ${FONT_LG};
    transition: all ${TRANSITION_NORMAL} ease;
    color: ${(props) => props.theme.hoverImage.textColor};
  }

  &:hover {
    img {
      filter: blur(0.3rem) brightness(80%) contrast(70%);

      ${media.reducedMotion} {
        filter: none;
      }
    }
    figcaption {
      color: ${(props) =>
        props.color ? props.color : props.theme.hoverImage.hoveredTextColor};
      transform: translateY(
        ${(props) =>
          props.size ? multiplyCSSNumber(props.size, -0.58) : '-5.8rem'}
      );

      ${media.phone} {
        transform: translateX(
          -${(props) => (props.size ? multiplyCSSNumber(props.size, 0.95) : '9.5rem')}
        );
      }

      ${media.reducedMotion} {
        transform: none;
        color: ${(props) => props.theme.hoverImage.textColor};
      }
    }
  }
`
