import { media } from '@/styles/queries'
import styled from 'styled-components'

export const StyledBox = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  height: 100%;

  border-radius: 2px;

  ${media.phone} {
    padding: 0;
  }
`
