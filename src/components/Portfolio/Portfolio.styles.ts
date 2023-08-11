import { convertHexToRGBA } from "@/utils/colors";
import { FAUSTINA, FONT_LG, FONT_MD, FONT_SM, FONT_XL, SHADOW_SM, Z_ABOVE, Z_HIGH } from "@Styles/variables";
import styled, { css } from "styled-components";

export const ProjectBoxes = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
`

// TODO: Figure out better timing function
export const ProjectBox = styled.article<{ hovered?: boolean }>`
    position: relative;
    z-index: ${props => props.hovered ? Z_HIGH : Z_ABOVE};
    border-radius: 4px;
    font-size: ${FONT_SM};
    box-shadow: 0.5px 0.5px 1px 0.5px;
    background-color: ${props => `${props.theme.base.background}${props.hovered ? '' : '90'}`};
    transition: transform 250ms ease-in, background-color 250ms ease-in;

    &:hover {
        transform: scale(1.04);
    }
`

export const ProjectContents = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 30rem;
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

    border: 1px solid ${props => props.theme.button.border};
    box-shadow: ${props => `${SHADOW_SM} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};

    font-size: ${FONT_SM};
    text-decoration: ${props => props.selected ? "underline" : "none"};
    text-decoration-thickness: 1px;

    border-radius: 1rem;
    padding: 0.5rem 1rem;
`

export const TechnologyLabel = styled.label<{ checked: boolean }>`
    position: relative;
    cursor: pointer;
    z-index: ${Z_ABOVE};
    font-size: ${FONT_LG};
    height: min-content;

    &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 2px;

        background-color: ${props => props.theme.base.textColor};

        transition: color 400ms ease, transform 400ms ease-in-out;
        transform-origin: ${() => Math.random() > 0.5 ? 'left' : 'right'};
        transform: scaleX(${props => props.checked ? '1' : '0'});
    }
`
export const TechnologyCheckox = styled.input.attrs<{ checked: boolean }>(checked => ({
    type: "checkbox",
    checked,
})) <{ checked: boolean }>`
    display: none;
`

export const PortfolioBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: -4rem;
    left: -4rem;
    min-width: 200vw;
    min-height: 200vh;
    background: ${props => css`linear-gradient(to bottom right, ${props.theme.base.background} 20%, ${props.theme.portfolio.gradient.color1} 20%, ${props.theme.portfolio.gradient.color2} 75%, ${props.theme.portfolio.gradient.color3})`};
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.5rem;

    max-width: 40%;
    
    background-color: ${props => props.theme.base.background};
`

export const PortfolioHeader = styled.div`
    display: flex;
    gap: 8rem;
    justify-content: space-between;
    
    padding-bottom: 2rem;
    margin: 2rem 0;
`

export const PortfolioDescription = styled.p`
    text-align: left;
    width: 40%;
    letter-spacing: 0.2px;
    line-height: 1.8rem;
    font-size: ${FONT_MD};
    z-index: 1;
`