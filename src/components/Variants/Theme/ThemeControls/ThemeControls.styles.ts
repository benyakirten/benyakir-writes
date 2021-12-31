import { media } from "@/styles/queries"
import styled from "styled-components"

export const CardContainer = styled.div`
  display: flex;
  gap: 10%;
`

export const CardHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
`

export const ThemeName = styled.span`
  max-width: 55%;
  ${media.tablet} {
    max-width: 50%;
  }
  ${media.phone} {
    max-width: 40%;
  }

  overflow-x: auto;
`