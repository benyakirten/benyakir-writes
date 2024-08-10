import { BOTH_SM, SIZE_MD, SIZE_XS } from "@/styles/variables";
import styled from "styled-components";

export const FilterPill = styled.div`
    display: flex;
    align-items: center;

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

export const FilterButton = styled.button`
    padding: ${BOTH_SM};
`;

export const FilterContentButton = styled.button`
    padding: ${BOTH_SM};
`;

export const FilterModifierButton = styled.button`
    padding: ${BOTH_SM};
`;
