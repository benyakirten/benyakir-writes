import styled, { css } from "styled-components";
import { FAUSTINA, FONT_LG, FONT_MD, FONT_SM, FONT_XL, SHADOW_SM, Z_ABOVE } from "@Styles/variables";

export const ProjectBoxes = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
    padding: 2rem 4rem;
`

// TODO: Figure out better timing function
export const ProjectBox = styled.article<{ hovered?: boolean }>`
    position: relative;
    z-index: ${Z_ABOVE};
    border-radius: 4px;
    font-size: ${FONT_SM};
    box-shadow: ${props => props.hovered ? "1px 1px 2px 1px" : "0.5px 0.5px 1px 0.5px"};
    background: ${props => `linear-gradient(to ${props.hovered ? "bottom right" : "top right"}, #FEFDF390, #FEF8E380, #FEF4E170)`};
    transition: all 800ms ease, outline 100ms;
`

export const ProjectContents = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
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

export const TechBadges = styled.div`
    display: flex;
    gap: 0.5rem;
`

export const TechBadge = styled.span<{ selected: boolean }>`
    background-color: ${props => props.selected ? props.theme.button.default.textColor : props.theme.button.default.background};
    color: ${props => props.selected ? props.theme.button.default.background : props.theme.button.default.textColor};
    transition: background-color 500ms ease, color 500ms ease;
    font-size: ${FONT_SM};
    text-decoration: ${props => props.selected ? "underline" : "none"};
    border-radius: 1rem;
    border: 1px solid ${props => props.theme.button.border};
    box-shadow: ${SHADOW_SM};
    padding: 0.5rem 1rem;
`

export const ProjectIconContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    width: max-content;
    justify-content: start;
`

export const ProjectLinkStyler = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: max-content;
    font-size: ${FONT_LG},
`

export const ProjectFilterIcon = styled.div``