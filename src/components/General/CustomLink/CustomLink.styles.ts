import styled from 'styled-components';
import { Link } from 'gatsby';

import {
    FONT_MD,
    FONT_LG,
} from '@StyleVars';
import { media } from '@Styles/queries';


export const StyledLink = styled(Link) <{
    active: boolean,
    dark: boolean,
    small: boolean,
    inline: boolean,
    wholeLine: boolean,
    limitUnderbar: boolean,
    underbarSize?: string,
    inheritColor?: boolean
}>`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;

    text-decoration: none;
    display: ${props => props.wholeLine ? 'block' : 'inline'};
    
    color: ${props => props.inheritColor ? 'inherit' : props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};
    font-size: ${props => props.small ? FONT_LG : 'inherit'};

    transition: color 400ms ease;

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: ${props => props.limitUnderbar ? '90%' : '100%'};
        ${props => props.underbarSize && `width ${props.underbarSize};`}
        height: 2px;

        background-color: ${props => props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;

        transition: color 400ms ease, transform 400ms ease-in-out;
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
    inline: boolean,
    limitUnderbar: boolean,
    underbarSize?: string,
    inheritColor?: boolean,
    wholeLine?: boolean
}>`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: ${props => props.wholeLine ? 'block' : 'inline'};

    transition: color 400ms ease;
    color: ${props => props.inheritColor ? 'inherit' : props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;
    
    text-decoration: none;
    font-size: ${props => props.small ? FONT_MD : 'inherit'};

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: ${props => props.limitUnderbar ? '80%' : '100%'};
        ${props => props.underbarSize && `width: ${props.underbarSize};`}
        height: 2px;

        background-color: ${props => props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;

        transition: color 400ms ease, transform 400ms ease-in-out;
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