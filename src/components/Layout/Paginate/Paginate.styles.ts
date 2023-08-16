import styled from 'styled-components'

import { FONT_XL, SHADOW_SM } from '@StyleVars'
import { convertHexToRGBA } from '@Utils/colors'
import { Column } from '@Styles/general-components'

export const NoResults = styled.div`
  padding: 2rem 1rem;

  font-size: ${FONT_XL};

  border: 2px solid ${(props) => props.theme.base.border};
  border-shadow: ${(props) =>
    `${SHADOW_SM} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};
`

export const PaginateColumn = styled(Column)`
  width: 90%;
`
