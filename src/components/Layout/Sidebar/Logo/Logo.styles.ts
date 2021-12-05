import styled from 'styled-components'

import { SIZE_MD } from '@StyleVars'
import { media } from '@/styles/queries'

export const LogoContainer = styled.img<{ opening: boolean, open: boolean }>`
    position: relative;
    left: -1.5rem;
    
    height: ${SIZE_MD};
    width: ${SIZE_MD};

    ${media.phone} {
        transition: opacity 0.4s ease;
        display: ${props => props.open ? 'block' : 'none'};
        opacity: ${props => props.open ? '1' : '0'};
    }

    animation: ${props => props.opening ? 'rotate 1s ease forwards' : 'none'};
`