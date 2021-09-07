import styled from 'styled-components'

import { media } from '@Styles/queries'
import { FONT_LG, GRAY_600, PRIMARY_200 } from '@StyleVars'

export const ChoiceContainer = styled.div<{ checked: boolean }>`
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;
    margin: 1rem;
    margin-left: 0;
    
    width: 24%;

    ${media.desktop} {
        width: 45%;
    }

    ${media.phone} {
        width: 75%;
    }

    border-radius: 2px;

    background-color: ${props => props.checked ? PRIMARY_200: GRAY_600 };
    color: ${props => props.checked ?  GRAY_600 : PRIMARY_200};

    font-size: ${FONT_LG};

    transition: all 0.8s;
`