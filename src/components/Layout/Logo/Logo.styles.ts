import styled from 'styled-components'

import { TRANSITION_SLOW } from '@/styles/variables'
import { SVGContainer } from '@Styles/general-components'

export const LogoContainer = styled(SVGContainer)<{
  opening: boolean
  open: boolean
}>`
  position: relative;
  left: 1rem;
  translate: ${(props) => (props.open ? '0' : '19.5')}rem 0;
  transition: translate ${TRANSITION_SLOW} ease;

  animation: ${(props) =>
    props.opening ? '500ms rotate ease forwards' : 'none'};
`
