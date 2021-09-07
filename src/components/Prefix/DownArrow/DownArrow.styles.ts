import styled from 'styled-components';
import { FONT_XL } from '@StyleVars';

export const StyledArrow = styled.span<{ open: boolean }>`
    position: absolute;
    left: -1.5rem;
    top: 0.4rem;
    
    outline: none;

    font-size: ${FONT_XL};

    transition: all 1s ease;
    transform: rotate(${props => props.open ? '180' : '0' }deg);
`