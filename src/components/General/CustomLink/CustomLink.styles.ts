import { Link } from 'gatsby';
import styled from 'styled-components';

import { media } from '@Styles/queries';
import {
  FONT_LG, FONT_MD, TRANSITION_NORMAL
} from '@StyleVars';


export const StyledLink = styled(Link) <{
  active: boolean,
  dark: boolean,
  small: boolean,
  inline: boolean,
  wholeline: boolean,
  limitunderbar: boolean,
  underbarsize?: string,
  inheritColor?: boolean
}>`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;

    text-decoration: none;
    display: ${props => props.wholeline ? 'block' : 'inline'};
    
    color: ${props => props.inheritColor ? 'inherit' : props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};
    font-size: ${props => props.small ? FONT_LG : 'inherit'};

    transition: color ${TRANSITION_NORMAL} ease;

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: ${props => props.limitunderbar ? '90%' : '100%'};
        ${props => props.underbarsize && `width ${props.underbarsize};`}
        height: 2px;

        background-color: ${props => props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;

        transition: color ${TRANSITION_NORMAL} ease, transform ${TRANSITION_NORMAL} ease-in-out;
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
  limitunderbar: boolean,
  underbarsize?: string,
  inheritColor?: boolean,
  wholeline?: boolean
}>`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: ${props => props.wholeline ? 'block' : 'inline'};

    transition: color ${TRANSITION_NORMAL} ease;
    color: ${props => props.inheritColor ? 'inherit' : props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;
    
    text-decoration: none;
    font-size: ${props => props.small ? FONT_MD : 'inherit'};

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: ${props => props.limitunderbar ? '80%' : '100%'};
        ${props => props.underbarsize && `width: ${props.underbarsize};`}
        height: 2px;

        background-color: ${props => props.inline ? props.theme.link.inline : props.dark ? props.theme.link.dark : props.theme.link.normal};;

        transition: color ${TRANSITION_NORMAL} ease, transform ${TRANSITION_NORMAL} ease-in-out;
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