import {
	BOTH_SM,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	Z_RAISED,
} from "@/styles/variables";
import styled from "styled-components";

export const FilterPill = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid ${(props) => props.theme.base.border};

    border-radius: ${SIZE_MD};

    & > * {
        border-right: 1px solid ${(props) => props.theme.base.border};
        padding: ${BOTH_SM};
        padding: ${SIZE_XS};
        &:last-child {
            border-right: none;
        }
    }
`;

export const FilterPillButton = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid ${(props) => props.theme.base.border};

    border-radius: ${SIZE_MD};

    & > * {
        border-right: 1px solid ${(props) => props.theme.base.border};
        padding: ${SIZE_XS};
        &:last-child {
            border-right: none;
        }
    }

    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
`;

export const IconContainer = styled.div`
    display: grid;
    place-items: center;
    height: 1.5rem;
    width: 1.5rem;
`;

export const FilterMenu = styled.ul<{ pointUpwards: boolean }>`
	display: none;
	z-index: ${Z_RAISED};

	position: absolute;
	left: 0;
	${(props) => (props.pointUpwards ? "bottom: calc(100% + 2px);" : "top: calc(100% + 2px);")}

	min-width: calc(90% - ${SIZE_SM});
	height: max-content;

	background-color: ${(props) => props.theme.base.background};
	padding: ${SIZE_SM};

	border: 1px solid ${(props) => props.theme.base.textColor};

	&[aria-expanded='true'] {
		display: flex;
		flex-direction: column;
		gap: ${SIZE_SM};
	}
`;

export const FilterButton = styled.button`
    flex-grow: 1;
    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
`;
