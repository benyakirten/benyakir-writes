import styled from "styled-components";
import { ABS_BLACK, FAUSTINA, FONT_MD, FONT_SM, FONT_XL, FONT_XS, PRIMARY_700, SECONDARY_900, SHADOW_SM, Z_ABOVE, Z_BASE, Z_HIGH, Z_RAISED, Z_UNDER } from "@Styles/variables";

export const ProjectBoxes = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
    padding: 2rem 4rem;
`

// TODO: Figure out better timing function
export const ProjectBox = styled.article<{ hovered?: boolean }>`
    position: relative;
    z-index: ${props => props.hovered ? Z_HIGH : Z_ABOVE};
    border-radius: 4px;
    font-size: ${FONT_SM};
    box-shadow: 0.5px 0.5px 1px 0.5px;
    background: ${props => {
        const opacity = props.hovered ? "" : "90"
        return `linear-gradient(to bottom right, #FEFDF3${opacity}, #FEF8E3${opacity}, #FEF4E1${opacity})`
    }};
    transition: transform 250ms ease-in;
    transform-origin: top;

    &:hover {
        transform: scale(1.02);
    }
`

export const ProjectContents = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 1rem;
`

export const ProjectTitle = styled.h3`
    font-size: ${FONT_XL};
    letter-spacing: 2px;
    text-decoration: underline;
    font-family: ${FAUSTINA};
    grid-column: 1 / -1;
    display: inline;
`

export const ProjectDescription = styled.p`
    grid-column: 1 / -1;
    font-size: ${FONT_MD};
`

export const ProjectTechs = styled.div`
    grid-column: 1 / 2;
`

export const ProjectLinks = styled.div`
    grid-column: 2 / -1;
`

export const GitHubIcon = styled.img.attrs<{ ghIcon: string }>(({ ghIcon }) => ({
    alt: "GitHub Link",
    src: ghIcon,
    height: "18px",
    width: "18px",
})) <{ ghIcon: string }>`
    display: inline;
    margin-left: 0.5rem;
`

export const TechBadges = styled.div`
    display: flex;
    gap: 0.5rem;
`

export const TechBadge = styled.span<{ selected: boolean }>`
    background-color: ${props => props.selected ? props.theme.button.default.textColor : props.theme.button.default.background};
    color: ${props => props.selected ? props.theme.button.default.background : props.theme.button.default.textColor};

    transition: background-color 500ms ease, color 250ms ease;
    font-size: ${FONT_XS};
    text-decoration: ${props => props.selected ? "underline" : "none"};
    border-radius: 1rem;
    border: 1px solid ${props => props.theme.button.border};
    box-shadow: ${SHADOW_SM};
    padding: 0.5rem 1rem;
`

export const PortfolioBackdrop = styled.div`
    position: absolute;
    top: -8rem;
    left: -8rem;
    
    height: 200vh;
    width: 200vw;
    
    z-index: ${Z_RAISED};
    background-color: ${ABS_BLACK};
`