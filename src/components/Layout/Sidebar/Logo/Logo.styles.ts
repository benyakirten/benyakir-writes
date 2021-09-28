import styled from 'styled-components'

import { SIZE_MD } from '@StyleVars'
import { media } from '@/styles/queries'

export const LogoContainer = styled.img<{ opening: boolean }>`
    position: relative;
    
    height: ${SIZE_MD};
    width: ${SIZE_MD};

    ${media.tablet} {
        left: -1.5rem;
    }

    animation: ${props => props.opening ? 'rotate 1s ease forwards' : 'none'}
`