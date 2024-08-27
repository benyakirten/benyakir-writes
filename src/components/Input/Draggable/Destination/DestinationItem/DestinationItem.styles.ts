import styled from "styled-components";

import {
	FONT_SIZE_MD,
	SANS_SERIF_FONT,
	TRANSITION_NORMAL,
} from "@/styles/variables";

export const ItemContainer = styled.li`
  position: relative;

  display: flex;
  flex-direction: column;

  border: 2px solid ${(props) => props.theme.base.border};
`;

export const ItemTitle = styled.span<{ draggedOver: boolean }>`
  position: absolute;
  top: -1rem;
  left: 1rem;
  z-index: 1;

  padding: 0 0.5rem;

  background-color: ${(props) =>
		props.draggedOver
			? props.theme.base.textColor
			: props.theme.base.background};
  color: ${(props) =>
		props.draggedOver
			? props.theme.base.background
			: props.theme.base.textColor};

  font-family: ${SANS_SERIF_FONT};
  font-size: ${FONT_SIZE_MD};

  transition: all ${TRANSITION_NORMAL} ease;
`;

export const ItemContent = styled.p<{ draggedOver: boolean }>`
  overflow: auto;
  padding: 2rem 1rem;

  font-size: ${FONT_SIZE_MD};

  background-color: ${(props) =>
		props.draggedOver
			? props.theme.base.textColor
			: props.theme.base.background};
  color: ${(props) =>
		props.draggedOver
			? props.theme.base.background
			: props.theme.base.textColor};

  transition: all ${TRANSITION_NORMAL} ease;
`;
