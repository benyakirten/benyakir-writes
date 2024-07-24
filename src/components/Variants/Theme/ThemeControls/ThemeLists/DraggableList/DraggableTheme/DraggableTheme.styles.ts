import styled from "styled-components";

import { media } from "@Styles/queries";

export const ThemeName = styled.span`
  max-width: 55%;
  ${media.tablet} {
    max-width: 50%;
  }
  ${media.phone} {
    max-width: 40%;
  }

  overflow-x: auto;
`;
