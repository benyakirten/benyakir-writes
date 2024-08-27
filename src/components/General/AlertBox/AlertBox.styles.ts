import styled, { keyframes } from "styled-components";

import { FONT_SIZE_MD } from "@/styles/variables";

const rollOut = keyframes`
    from {
        opacity: 0.2;
        transform: scaleY(0.6);
    }
    to {
        opactiy: 1;
        transform: scaleY(1);
    }
`;

export const StyledAlertBox = styled.div<{ success: boolean }>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem 3rem;

  background-color: ${(props) =>
		props.success
			? props.theme.alertBox.alert.success
			: props.theme.alertBox.alert.error};
  color: ${(props) => props.theme.alertBox.textColor};
  font-size: ${FONT_SIZE_MD};
  border: 2px solid ${(props) => props.theme.base.border};

  transform-origin: top;

  animation: ${rollOut} 1s ease forwards;
`;
