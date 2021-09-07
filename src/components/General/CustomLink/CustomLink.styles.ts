import styled from 'styled-components';
import { Link } from 'gatsby';

import {
    BLACK,
    WHITE,
    FONT_MD,
    SECONDARY_600,
} from '@StyleVars';
import { media } from '@Styles/queries';


export const StyledLink = styled(Link)<{
    active: boolean,
    dark: boolean,
    small: boolean,
    inline: boolean
}>`
    position: relative;
    overflow: hidden;

    transition: color 1s ease;
    color: ${props => props.inline ? SECONDARY_600 : props.dark ? BLACK : WHITE};

    text-decoration: none;
    font-size: ${props => props.small ? FONT_MD : 'inherit'};

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 2px;

        background-color: ${props => props.inline ? SECONDARY_600: props.dark ? BLACK : WHITE};

        transition: color 1s ease;
        transition: transform 0.35s ease-in-out;
        transform-origin: left;
        transform: scaleX(${props => props.active ? '1' : '0'});
    }

    &:hover{
        &::after {
            transform: scaleX(1);

            ${media.phone} {
                transform: scaleX(0.6);
            }

            ${media.reducedMotion} {
                transform: scaleX(0);
            }
        }
    }
`

export const OutsideLink = styled.a<{
    active: boolean,
    dark: boolean,
    small: boolean,
    inline: boolean
}>`
    position: relative;
    overflow: hidden;

    transition: color 1s ease;
    color: ${props => props.inline ? SECONDARY_600: props.dark ? BLACK : WHITE};
    
    text-decoration: none;
    font-size: ${props => props.small ? FONT_MD : 'inherit'};

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 2px;

        background-color: ${props => props.inline ? SECONDARY_600: props.dark ? BLACK : WHITE};

        transition: color 1s ease;
        transition: transform 0.35s ease-in-out;
        transform-origin: left;
        transform: scaleX(${props => props.active ? '1' : '0'});
    }

    &:hover{
        &::after {
            transform: scaleX(1);

            ${media.phone} {
                transform: scaleX(0.8);
            }

            ${media.reducedMotion} {
                transform: scaleX(0);
            }
        }
    }
`