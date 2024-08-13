import { FONT_LG, TRANSITION_NORMAL } from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";
import styled from "styled-components";

export const StyledActiveIndicator = styled.div<{ linkTop: number }>`
    position: absolute;
    right: 0;
    top: ${({ linkTop }) => linkTop}px;

    height: ${FONT_LG};
    width: 12%;
    transition: top ${TRANSITION_NORMAL} ease-in-out;

    background: ${(props) => createLinearGradient(props.theme.link.dark)};
`;

// TODO: Make this better once we have redone theme colors.
function createLinearGradient(color: string): string {
	const startColor = convertHexToRGBA(color, 0);
	const intermediateColor = convertHexToRGBA(color, 0.3);
	const endColor = convertHexToRGBA(color, 1);

	const gradient = `linear-gradient(to right, ${startColor} 0%, ${intermediateColor} 70%, ${endColor} 100%)`;
	return gradient;
}
