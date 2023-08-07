import styled from 'styled-components';
import { FONT_LG } from '@StyleVars';

export const StyledArrow = styled.span<{ open: boolean }>`
    position: absolute;
    left: -1.5rem;
    
    outline: none;

    font-size: ${FONT_LG};

    transition: all 1s ease;
    transform: rotate(${props => props.open ? '180' : '0'}deg);
`