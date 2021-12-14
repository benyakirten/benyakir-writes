import styled from 'styled-components'

import { SIZE_MD } from '@StyleVars'
import { media } from '@/styles/queries'

// https://stackoverflow.com/questions/24933430/img-src-svg-changing-the-styles-with-css

export const LogoContainer = styled.div<{ opening: boolean, open: boolean, src: string, alt: string }>`
    position: relative;
    left: -1.8rem;

    background-color: ${props => props.theme.base.textColor};
    mask: url(${props => props.src}) no-repeat center;
    
    height: ${SIZE_MD};
    width: ${SIZE_MD};

    ${media.phone} {
        transition: opacity 0.4s ease;
        display: ${props => props.open ? 'block' : 'none'};
        opacity: ${props => props.open ? '1' : '0'};
    }

    animation: ${props => props.opening ? 'rotate 1s ease forwards' : 'none'};
`