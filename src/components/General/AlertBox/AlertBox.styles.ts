import styled from "styled-components"

import { rollOut } from "@Styles/animations"
import { FONT_MD } from "@StyleVars"

export const StyledAlertBox = styled.div<{ success: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 3rem;
    
    background-color: ${props => props.success ? props.theme.alertBox.alert.success : props.theme.alertBox.alert.error};
    color: ${props => props.theme.alertBox.textColor};
    font-size: ${FONT_MD};
    border: 2px solid ${props => props.theme.base.border};

    transform-origin: top;

    animation: ${rollOut} 1s ease forwards;
`