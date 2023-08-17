import styled from 'styled-components'

import { FONT_MD } from '@StyleVars'
import { fadeIn } from '@/styles/animations'

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FONT_MD};
`

export const ThemeAppearance = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-in forwards;
`
