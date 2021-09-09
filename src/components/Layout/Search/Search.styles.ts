import styled from 'styled-components'

import { ABS_BLACK, ABS_WHITE, BLACK, FONT_MD, WHITE } from '@StyleVars'
import { media } from '@Styles/queries'

export const ResultsContainer = styled.div<{ resultLength?: number }>`
    cursor: default;
    overflow: auto;
    margin-top: 1rem;
    margin-left: -1px;

    display: flex;
    flex-direction: column;
    align-items: center;

    height: ${props => props.resultLength && props.resultLength > 1 ? '13rem' : '6.5rem'};

    width: 60%;
    
    border: 2px solid ${BLACK};
    background-color: ${ABS_BLACK};
    color: ${WHITE};

    transition: height 1s ease;
`

export const SingleResult = styled.div`
    font-size: ${FONT_MD};

    padding: 0.5rem 1rem;
    height: 6.5rem;
    width: 100%;

    border: 1px solid ${ABS_WHITE};
    cursor: pointer;

    opacity: 0.8;

    ${media.noHover} {
        opacity: 1;
    }

    transition: opacity 1s ease;

    &:hover {
        opacity: 1;
    }
`