import styled from 'styled-components'

import { SIZE_MD } from '@StyleVars'

export const LogoContainer = styled.img<{ opening: boolean }>`
    position: relative;
    left: -1.5rem;
    
    height: ${SIZE_MD};
    width: ${SIZE_MD};

    animation: ${props => props.opening ? 'rotate 1s ease forwards' : 'none'}
`