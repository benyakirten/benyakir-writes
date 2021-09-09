import styled from 'styled-components'
import {
    PRIMARY_200,
    PRIMARY_100,
    SECONDARY_900,
    FAUSTINA,
    FONT_XXL,
    FONT_XL,
    SHADOW_MD,
    FONT_XXS
} from '@StyleVars'
import { media } from '@Styles/queries'

export const StyledSidebar = styled.nav<{ open?: boolean }>`
    position: relative;
    align-self: stretch;

    transition: all 1s;

    min-height: 100vh;
    width: ${props => props.open ? '30rem' : '5rem'};

    ${media.phone} {
        width: ${props => props.open ? '45rem' : '5rem'};
    }

    padding: ${props => props.open ? '2rem 1rem 2rem 4rem' : '2rem 1rem'};

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
    align-items: center;
`

export const ArrowButton = styled.button<{ open: boolean }>`
    cursor: pointer;

    position: relative;
    left: ${props => props.open ? '-3rem' : '0'};
    
    background: none;
    border: none;

    align-self: start;

    font-size: ${FONT_XL};
    
    transition: all 1s ease;
    transform: rotate(${props => props.open ? '0' : '180'}deg);
`

export const VisibleGroup = styled.div<{ open: boolean }>`
    transition: all 1s;
    transform: translateX(${props => props.open ? '0' : '-100%'});
    opacity: ${props => props.open ? '1': '0'};
`

export const NavGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;

    margin-bottom: 4rem;
`

export const SubLinks = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;

    margin-left: 1rem;
    
    transform-origin: top;
    transition: all 1s ease;
    height: ${props => props.open ? '5rem' : '0'};
    opacity: ${props => props.open ? '1': '0'};
`

export const LegalBox = styled.aside<{ open: boolean }>`
    margin: 2rem 0;

    color: ${SECONDARY_900};
    font-size: ${FONT_XXS};

    transition: opacity 0.5s ease;
    opacity: ${props => props.open ? '1' : '0'};
`