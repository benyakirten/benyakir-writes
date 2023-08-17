import styled from 'styled-components'

import { media } from '@Styles/queries'
import { SHADOW_LG } from '@StyleVars'
import { convertHexToRGBA } from '@Utils/colors'

export const Skewed = styled.section<{ width?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 2rem;
  padding: 2rem 3rem;

  box-shadow: ${(props) =>
    `${SHADOW_LG} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};
  border: 2px solid ${(props) => props.theme.base.border};
  background-color: ${(props) => props.theme.skewRow.background};

  transform: skew(-25deg);

  ${media.phone} {
    transform: skew(0deg);
    min-width: 20rem;
    margin: 0;
  }
`

export const AntiSkewed = styled.div`
  display: flex;
  justify-content: space-around;

  ${media.phone} {
    flex-direction: column;
  }

  width: 100%;

  transform: skew(25deg);

  ${media.phone} {
    transform: skew(0deg);
  }

  ${media.reducedMotion} {
    transform: skew(0deg);
  }
`
