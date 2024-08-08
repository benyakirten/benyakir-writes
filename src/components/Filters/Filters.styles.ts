import { SIZE_MD } from "@/styles/variables";
import styled from "styled-components";

export const FilterPill = styled.div`
    display: flex;
    align-items: center;

    border-radius: ${SIZE_MD};

    & > * {
        border-right: 1px solid ${(props) => props.theme.base.border};
        &:last-child {
            border-right: none;
        }
    }
`;

export const FilterNameButton = styled.button`
    `;

export const FilterContentButton = styled.button``;

export const FilterModifierButton = styled.button`
    border-left: 1px solid ${(props) => props.theme.base.border};
`;
