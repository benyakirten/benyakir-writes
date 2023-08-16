import { FONT_LG, TRANSITION_SLOW } from '@StyleVars';
import styled from 'styled-components';

export const StyledArrow = styled.span<{ open: boolean }>`
    position: absolute;
    left: -1.5rem;
    
    outline: none;

    font-size: ${FONT_LG};

    transition: all ${TRANSITION_SLOW} ease;
    transform: rotate(${props => props.open ? '180' : '0'}deg);
`