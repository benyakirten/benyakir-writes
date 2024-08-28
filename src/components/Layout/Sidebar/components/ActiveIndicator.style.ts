import { FONT_SIZE_LG, TRANSITION_NORMAL } from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";
import styled from "styled-components";

export const StyledActiveIndicator = styled.div<{ linkTop: number }>`
    position: absolute;
    left: -14%;
    top: ${({ linkTop }) => linkTop + 4}px;

    height: ${FONT_SIZE_LG};
    width: 13%;
    transition: top ${TRANSITION_NORMAL} ease-in-out;

    background: ${(props) => props.theme.base.link};
`;

// TODO: Make this better once we have redone theme colors.
function createLinearGradient(color: string): string {
	const startColor = convertHexToRGBA(color, 0);
	const intermediateColor = convertHexToRGBA(color, 0.3);
	const endColor = convertHexToRGBA(color, 1);

	const gradient = `linear-gradient(to right, ${startColor} 0%, ${intermediateColor} 70%, ${endColor} 100%)`;
	return gradient;
}
