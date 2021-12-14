import styled from 'styled-components'

import {
    FAUSTINA,
    SHADOW_MD,
    FONT_XXL,
    FONT_XL,
    FONT_SM,
    Z_ABOVE
} from '@StyleVars'
import { media } from '@Styles/queries'
import { convertHexToRGBA } from '@Utils/colors'

export const StyledSidebar = styled.nav<{ open?: boolean }>`
    position: relative;

    align-self: stretch;
    z-index: ${Z_ABOVE};

    min-height: 100vh;
    width: ${props => props.open ? '25rem' : '5rem'};
    padding: ${props => props.open ? '2rem 1rem 2rem 4rem' : '2rem 1rem'};
    
    font-family: ${FAUSTINA};
    font-size: ${FONT_XXL};

    background-image: ${props => `linear-gradient(
        to right,
        ${props.theme.sidebar.primaryColor} ${props.theme.sidebar.primaryColorEnd}%,
        ${props.theme.sidebar.secondaryColor}
    )`};
    border-right: 2px solid ${props => props.theme.base.border};
    box-shadow: ${props => `${SHADOW_MD} ${convertHexToRGBA(props.theme.sidebar.shadowColor, 0.4)}`};

    transition: all 1s;

    ${media.phone} {
        min-height: ${props => props.open ? '100vh' : '5rem'};
        border-bottom: ${props => props.open ? 'none' : `2px solid ${props.theme.base.border}`};
        border-top: ${props => props.open ? 'none' : `2px solid ${props.theme.base.border}`};

        min-height: ${props => props.open ? '100vh' : '5rem'};
        padding: 1rem 2rem;

        position: ${props => props.open ? 'relative' : 'fixed'};
        bottom: ${props => props.open ? 'auto' : '5rem'}
    }
`

export const SidebarContents = styled.div<{ open: boolean }>`
    position: fixed;
    top: 1rem;
    left: 2.5rem;

    width: ${props => props.open ? 'auto' : '2rem'};
    max-width: 17%;

    ${media.tablet} {
        max-width: 20%;
    }
    
    ${media.phone} {
        top: ${props => props.open ? '1rem' : 'auto'};
        left: ${props => props.open ? '2.5rem' : 'auto'};
    }

    display: flex;
    flex-direction: column;
    align-items: start;

    transition: all 1s;
`

export const ArrowButton = styled.button<{ open: boolean }>`
    cursor: pointer;

    position: relative;
    left: -1.5rem;
    
    background: none;
    border: none;

    align-self: start;

    font-size: ${FONT_XL};

    ${media.phone} {
        font-size: ${FONT_XXL};
    }

    color: ${props => props.theme.base.textColor};
    
    transition: all 1s ease;
    transform: rotate(${props => props.open ? '0' : '180'}deg) translateX(${props => props.open ? '0' : '0'});
`

export const VisibleGroup = styled.div<{ open: boolean }>`
    transition: all 1s;
    transform: translateX(${props => props.open ? '0' : '-20rem'});
    opacity: ${props => props.open ? '1' : '0'};
`

export const NavGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-bottom: 4rem;
`

export const SubLinks = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;

    margin-left: 1rem;
    
    transform-origin: top;
    transition: all 1s ease;
    height: ${props => props.open ? '5rem' : '0'};
    opacity: ${props => props.open ? '1' : '0'};
`

export const LegalBox = styled.div`
    cursor: default;
    
    display: flex;
    flex-direction: column;

    height: 4rem;
    margin: 2rem 0;

    transition: opacity 0.5s ease;
`

export const LegalItem = styled.span`
    font-size: ${FONT_SM};
    color: ${props => props.theme.base.textColor};
`