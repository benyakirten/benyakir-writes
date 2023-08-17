import styled from 'styled-components'

import { media } from '@Styles/queries'
import { FONT_LG, TRANSITION_SLOW, Z_BASE, Z_UNDER } from '@StyleVars'

export const ChoiceContainer = styled.div<{
  checked: boolean
  hidden: boolean
}>`
  position: relative;
  z-index: ${(props) => (props.hidden ? Z_UNDER : Z_BASE)};

  cursor: ${(props) => (props.hidden ? 'default' : 'pointer')};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${(props) => (props.hidden ? 0 : '1rem')};
  margin: 1rem;
  margin-left: 0;

  height: ${(props) => (props.hidden ? 0 : 'auto')};
  width: 24%;

  ${media.desktop} {
    width: 45%;
  }

  ${media.phone} {
    width: 75%;
  }

  border-radius: 2px;

  background-color: ${(props) =>
    props.checked
      ? props.theme.multipleChoice.textColor
      : props.theme.multipleChoice.background};
  color: ${(props) =>
    props.checked
      ? props.theme.multipleChoice.background
      : props.theme.multipleChoice.textColor};

  font-size: ${FONT_LG};

  transition: all ${TRANSITION_SLOW};
`
