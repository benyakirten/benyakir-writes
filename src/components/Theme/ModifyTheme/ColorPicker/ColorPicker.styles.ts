import styled from "styled-components";

import { FONT_SIZE_MD, SHADOW_MD, SIZE_SM, SIZE_XS } from "@/styles/variables";
import { convertHexToRGBA, setOpacityOnHSL } from "@/utils/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: ${SIZE_SM} ${SIZE_XS};
  border-radius: ${SIZE_XS};
  box-shadow: ${(props) =>
		`0px 1px 1px 1.4px ${setOpacityOnHSL(props.theme.sidebar.shadowColor, 0.4)}`};
`;

export const Label = styled.label`
  font-size: ${FONT_SIZE_MD};
`;

export const ColorInput = styled.input`
`;
