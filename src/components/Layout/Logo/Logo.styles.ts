import styled from "styled-components";

import { TRANSITION_SLOW } from "@/styles/variables";
import { SVGContainer } from "@Styles/general-components";

export const LogoContainer = styled(SVGContainer)<{
	opening: boolean;
	open: boolean;
}>`
  position: relative;
  margin-top: 1rem;
  left: ${(props) => (props.open ? "0" : "83%")};
  transition: left ${TRANSITION_SLOW} ease;

  animation: ${(props) =>
		props.opening ? "500ms rotate ease forwards" : "none"};
`;
