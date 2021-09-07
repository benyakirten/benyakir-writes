import styled from 'styled-components';

import { BLACK, FONT_LG } from '@StyleVars';
import { media } from '@Styles/queries';
import { multiplyCSSNumber } from '@Utils/strings';

export const StyledFigure = styled.figure<{ color?: string, size?: string, square?: boolean }>`
    position: relative;
    border-radius: ${props => props.square ? 'none' : '50%'};

    ${media.phone} {
        display: flex;
        align-items: center;
    }

    img {
        border-radius: ${props => props.square ? 'none' : '50%'};
        height: ${props => props.size ? props.size : '10rem'};
        width: ${props => props.size ? props.size : '10rem'};
        transition: all 0.5s;

        ${media.phone} {
            margin-right: 2rem;
        }
    }

    figcaption {
        text-align: center;
        font-size: ${FONT_LG};
        transition: all 0.5s ease;
        color: ${BLACK};
    }

    &:hover {
        img {
            filter: blur(.3rem) brightness(80%) contrast(70%);

            ${media.reducedMotion} {
                filter: none;
            }
        }
        figcaption {
            color: ${props => props.color ? props.color : '#000'};
            transform: translateY(${props => props.size ? multiplyCSSNumber(props.size, -0.58) : '-5.8rem'});

            ${media.phone} {
                transform: translateX(-${props => props.size ? multiplyCSSNumber(props.size, 0.95) : '9.5rem'});
            }

            ${media.reducedMotion} {
                transform: none;
                color: ${BLACK};
            }
        }
    }
`