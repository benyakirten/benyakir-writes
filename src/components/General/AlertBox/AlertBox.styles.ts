import styled from "styled-components";

import { rollOut } from "@Styles/animations";
import { SUCCESS, ERROR, ABS_WHITE, FONT_MD, ABS_BLACK } from "@StyleVars";

export const StyledAlertBox = styled.div<{ success: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 3rem;
    
    background-color: ${props => props.success ? SUCCESS : ERROR};
    color: ${ABS_WHITE};
    font-size: ${FONT_MD};
    border: 2px solid ${ABS_BLACK};

    transform-origin: top;

    animation: ${rollOut} 1s ease forwards;
`