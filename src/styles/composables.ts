import { media } from "./queries";
import { TRANSITION_EXTRA_SLOW, TRANSITION_SLOW } from "./variables";

export function textClipWithHoverTransition(
	startColor: string,
	endColor: string,
) {
	return `
        background-image: linear-gradient(45deg, ${startColor} 45%, ${endColor});
        background-position: left;
        background-size: 300%;
        background-clip: text;
        color: transparent;
        transition: background-position ${TRANSITION_EXTRA_SLOW} ease;

        &:hover {
            background-position: right;
        }
    `;
}

export function hoverUnderline(color: string) {
	return `
        color: ${color};

        width: min-content;

        background-color: transparent;
        background-image: linear-gradient(${color}, ${color});
        background-repeat: no-repeat;
        background-size: 0px 2px;
        background-position: 0 100%;
        text-decoration: none;

        transition: background-size ${TRANSITION_SLOW} ease;

        &:hover, &:focus-within {
            background-size: 100% 2px;
        }

        &:focus-within {
            outline: 1px solid ${color};
        }

        ${media.noHover} {
            background-size: 100% 2px;
        }
    `;
}
