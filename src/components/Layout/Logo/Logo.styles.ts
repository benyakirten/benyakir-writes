import styled from "styled-components"

import { SVGContainer } from "@Styles/general-components"
import { media } from "@Styles/queries"

export const LogoContainer = styled(SVGContainer)<{ opening: boolean, open: boolean }>`
  ${media.phone} {
    transition: opacity 0.4s ease;
    display: ${props => props.open ? 'block' : 'none'};
    opacity: ${props => props.open ? '1' : '0'};
  }

  animation: ${props => props.opening ? 'rotate 1s ease forwards' : 'none'};
`