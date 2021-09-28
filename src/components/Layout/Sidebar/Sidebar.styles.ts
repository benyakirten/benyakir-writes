import styled from 'styled-components'

import {
    PRIMARY_200,
    PRIMARY_100,
    SECONDARY_900,
    ABS_BLACK,
    FAUSTINA,
    SHADOW_MD,
    FONT_XXL,
    FONT_XL,
    FONT_SM
} from '@StyleVars'
import { media } from '@Styles/queries'

export const StyledSidebar = styled.nav<{ open?: boolean }>`
    position: relative;
    align-self: stretch;

    min-height: 100vh;
    width: ${props => props.open ? '40rem' : '5rem'};
    
    transition: all 1s;

    padding: ${props => props.open ? '2rem 1rem 2rem 4rem' : '2rem 1rem'};

    ${media.phone} {
        width: ${props => props.open ? '45rem' : '5rem'};
        padding: 1rem 2rem;
    }

    font-family: ${FAUSTINA};
    font-size: ${FONT_XXL};

    background-image: linear-gradient(
        to right,
        ${PRIMARY_100},
        ${PRIMARY_200},
        ${PRIMARY_100}
    );
    border-right: 2px solid ${SECONDARY_900};
    box-shadow: ${SHADOW_MD};
`

export const SidebarContents = styled.div`
    position: fixed;

    display: flex;
    flex-direction: column;
    align-items: start;
`

export const ArrowButton = styled.button<{ open: boolean }>`
    cursor: pointer;

    position: relative;
    left: ${props => props.open ? '-3rem' : '0'};

    ${media.tablet} {
        left: ${props => props.open ? '-1rem' : '-1.5rem'};
    }
    
    background: none;
    border: none;

    align-self: start;

    font-size: ${FONT_XL};
    color: ${ABS_BLACK};
    
    transition: all 1s ease;
    transform: rotate(${props => props.open ? '0' : '180'}deg);
`

export const VisibleGroup = styled.div<{ open: boolean }>`
    transition: all 1s;
    transform: translateX(${props => props.open ? '0' : '-120%'});
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
    display: flex;
    flex-direction: column;
    cursor: default;

    margin: 2rem 0;

    transition: opacity 0.5s ease;
`

export const LegalItem = styled.span`
    font-size: ${FONT_SM};
    color: ${ABS_BLACK};
`