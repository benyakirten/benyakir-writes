import styled from "styled-components";

import { SHADOW_MD_BALANCED, TRANSITION_NORMAL } from "@StyleVars";
import { convertHexToRGBA } from "@Utils/colors";

export const FilterContainer = styled.aside`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  padding: 1rem 1rem 1rem 2rem;

  background: ${(props) => props.theme.filter.background};
  color: ${(props) => props.theme.filter.textColor};

  box-shadow: ${(props) =>
		`${SHADOW_MD_BALANCED} ${convertHexToRGBA(
			props.theme.base.shadowColor,
			0.4,
		)}`};

  transition: all ${TRANSITION_NORMAL} ease;

  input[type='text'] {
    margin-bottom: 1.5rem;
    width: 50%;
  }
`;
