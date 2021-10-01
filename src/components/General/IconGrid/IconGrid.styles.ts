import { media } from '@/styles/queries'
import styled from 'styled-components'

export const StyledBox = styled.div`
    position: relative;

    display: flex;
    flex-wrap: wrap;

    padding: 0.5rem;
    height: 100%;
    
    border-radius: 2px;

    ${media.phone} {
        padding: 0;
    }
`