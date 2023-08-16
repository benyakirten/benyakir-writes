import styled from 'styled-components'

import { FONT_MD, SHADOW_MD } from '@StyleVars'
import { convertHexToRGBA } from '@Utils/colors'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Label = styled.label`
  font-size: ${FONT_MD};
`

export const ColorInput = styled.input`
  box-shadow: ${(props) =>
    `${SHADOW_MD} ${convertHexToRGBA(props.theme.sidebar.shadowColor, 0.4)}`};
`
