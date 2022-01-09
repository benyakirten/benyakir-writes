import styled from 'styled-components'

import { FONT_MD } from '@StyleVars'
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
    
    border: 2px solid ${props => props.theme.searchBox.border};
    background-color: ${props => props.theme.searchBox.background};
    color: ${props => props.theme.searchBox.textColor};

    transition: height 1s ease;
`

export const SingleResult = styled.div`
    cursor: pointer;

    padding: 0.5rem 1rem;
    height: 6.5rem;
    width: 100%;

    font-size: ${FONT_MD};
    color: ${props => props.theme.searchBox.result.textColor};
    border: 1px solid ${props => props.theme.searchBox.result.border};

    opacity: 0.85;

    ${media.noHover} {
        opacity: 1;
    }

    transition: opacity 0.4s ease;

    &:hover {
        opacity: 1;
    }
`