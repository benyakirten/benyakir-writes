import React from "react";
import styled from "styled-components";

import { media } from "@/styles/queries";
import {
	MODAL_BACKGROUND_COLOR,
	MODAL_TEXT_COLOR,
	SIZE_MD,
	Z_SEARCH,
} from "@/styles/variables";

const StyledModal = styled.dialog<{ $baseWidth?: string }>`
  position: fixed;
  top: 20%;
  left: 50%;
  z-index: ${Z_SEARCH};

  border-radius: ${SIZE_MD};
  
  background-color: ${MODAL_BACKGROUND_COLOR};
  color: ${MODAL_TEXT_COLOR};
  
  transform: translateX(-50%);
  
  &::backdrop {
    height: 200vh;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
  }
    
  width: ${(props) => props.$baseWidth ?? "50%"};
  ${media.desktop} {
    width: 70%;
  }

  ${media.tablet} {
    width: 80%;
  }

  ${media.phone} {
    width: 90%;
  }
`;

const Modal = React.forwardRef<
	HTMLDialogElement,
	{ onClose: () => void; width?: string } & ChildrenProp
>(({ onClose, children, width }, ref) => {
	const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<StyledModal $baseWidth={width} ref={ref} onClick={handleClick}>
			{children}
		</StyledModal>
	);
});

export default Modal;
