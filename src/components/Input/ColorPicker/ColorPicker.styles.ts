import styled from "styled-components";

import { FONT_SIZE_MD, SHADOW_MD } from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: ${FONT_SIZE_MD};
`;

export const ColorInput = styled.input`
  box-shadow: ${(props) =>
		`${SHADOW_MD} ${convertHexToRGBA(props.theme.sidebar.shadowColor, 0.4)}`};
`;
