import styled from 'styled-components';

import { media } from '@Styles/queries';
import { BLACK, SHADOW_LG } from '@StyleVars';

export const Skewed = styled.section<{ width?: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 2rem;
    padding: 2rem 3rem;

    box-shadow: ${SHADOW_LG};
    border: 1px solid ${BLACK};
    
    transition: transform 15s ease;
    transform: skew(-25deg);

    ${media.phone} {
        transform: skew(0deg);
    }
    
    &:hover {
        transform: skew(25deg);

        ${media.phone} {
            transform: skew(0deg);
        }

        ${media.reducedMotion} {
            transform: skew(0deg);
        }
        div {
            transform: skew(-25deg);

            ${media.phone} {
                transform: skew(0deg);
            }

            ${media.reducedMotion} {
                transform: skew(0deg);
            }
        }
    }
`

export const AntiSkewed = styled.div`
    display: flex;
    justify-content: space-around;

    ${media.phone} {
        flex-direction: column;
    }

    width: 100%;

    transform: skew(25deg);
    transition: transform 15s ease;

    ${media.phone} {
        transform: skew(0deg);
    }

    ${media.reducedMotion} {
        transform: skew(0deg);
    }
`