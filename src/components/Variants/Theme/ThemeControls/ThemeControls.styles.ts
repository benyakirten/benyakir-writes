import { media } from "@/styles/queries";
import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  gap: 10%;
`;

export const CardHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 40%;
  ${media.noHover} {
    width: 90%;
  }
`;
