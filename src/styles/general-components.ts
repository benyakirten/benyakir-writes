import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image'

import { fadeIn, slideInLeft, slideInRight } from './animations';
import { media } from './queries';
import { BLACK, FAUSTINA, FONT_LG, FONT_MD, FONT_XL, FONT_XXL, FONT_XXXL, SECONDARY_800, SHADOW_MD_BALANCED } from './variables';
import { convertHexToRGBA } from '@Utils/colors';

export const FadeIn = styled.div<{ duration?: string, delay?: string }>`
    opacity: 0;
    animation: ${fadeIn} ${props => props.duration ? props.duration : '1600ms'} ${props => props.delay ? props.delay : '0ms'} ease forwards;
`

export const SlideInLeft = styled.div<{ duration?: string, delay?: string }>`
    opacity: 0;
    transform: translateX(-40vw);
    animation: ${slideInLeft} ${props => props.duration ? props.duration : '4s'} ${props => props.delay ? props.delay : '0ms'} ease forwards;
`

export const SlideInRight = styled.div<{ duration?: string, delay?: string }>`
    opacity: 0;
    transform: translateX(40vw);
    animation: ${slideInRight} ${props => props.duration ? props.duration : '4s'} ${props => props.delay ? props.delay : '0ms'} ease forwards;
`

export const Grouping = styled.section<{ marginVertical?: string }>`
    position: relative;
    margin-top: ${props => props.marginVertical ? props.marginVertical : '0'};
    margin-bottom: ${props => props.marginVertical ? props.marginVertical : '4rem'};
`

export const GroupingBox = styled.section`
    position: relative;

    padding: 1rem;
    margin-bottom: 4rem;
    
    box-shadow: ${props => `${SHADOW_MD_BALANCED} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};
`

export const LeadHeading = styled.h1`
    position: relative;

    padding-bottom: 1rem;
    margin-bottom: 1rem;

    font-family: ${FAUSTINA};
    font-size: ${FONT_XXXL};

    ${media.phone} {
        font-size: ${FONT_XXL};
    }
    letter-spacing: 2px;
    
    &::after {
        content: '';
        position: absolute;
        
        bottom: 0;
        left: 0;

        width: 100%;
        height: 2px;

        background-color: ${props => props.theme.base.textColor};

        transform-origin: left;
        transform: scaleX(1) translateY(0);
        transition: transform 0.5s ease;

        ${media.reducedMotion} {
            transform: scaleX(0.9) translateY(-2rem);
        }
    }

    &:hover {
        &::after {
            transform: scaleX(0.9) translateY(-2rem);
        }
    }
`

export const Subtitle = styled.h2<{ noUnderline?: boolean }>`
    font-family: ${FAUSTINA};
    font-size: ${FONT_XXL};

    ${media.phone} {
        ${FONT_XL};
    }
    text-decoration: ${props => props.noUnderline ? 'none' : 'underline'};

    margin-bottom: 1rem;

    ${media.tablet} {
        margin-bottom 0.5rem;
        font-size: ${FONT_XL};
    }
`

export const SubHeading = styled.h3<{ noUnderline?: boolean }>`
    font-family: ${FAUSTINA};
    font-size: ${FONT_XL};
    text-decoration: ${props => props.noUnderline ? 'none' : 'underline'};

    margin-bottom: 0.5rem;

    ${media.tablet} {
        font-size: ${FONT_LG};
    }
`

export const MinorHeading = styled.h4`
    font-family: ${FAUSTINA};
    font-size: ${FONT_LG};

    margin-bottom: 0.5rem;

    ${media.tablet} {
        margin-bottom 0.5rem;
        font-size: ${FONT_MD};
    }
`

export const BigParagraph = styled.p<{ marginRight?: string, marginVertical?: string }>`
    font-size: ${FONT_XL};
    margin-top: ${props => props.marginVertical ? props.marginVertical : '0'};
    margin-bottom: ${props => props.marginVertical ? props.marginVertical : '0'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0'};
`

export const Paragraph = styled.p`
    font-size: ${FONT_MD};
    margin: 1rem 0;
`

export const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    font-size: ${FONT_MD};
`

// There's no reason to include a third google font
// and cause browsers to download another ~10kb of data
// Especially since the monospace font will only be used here
export const Card = styled.article`
    position: relative;

    height: 24rem;
    box-shadow: ${SHADOW_MD_BALANCED};

    font-family: monospace;

    overflow: auto;

    padding: 2rem;
    
    &:not(:last-child) {
        margin-bottom: 2rem;
    }
`

export const CardSection = styled.div`
    flex: 1;
    &:not(:last-child) {
        margin-right: 2rem;
    }
`

export const CardDoubleSection = styled.div`
    flex: 2;
    &:not(:last-child) {
        margin-right: 2rem;
    }
`

export const VerticalSeparator = styled.div`
    padding-top: 10rem;
`

export const Grid = styled.div`
    display: grid;
    grid-gap: 2rem 2rem;
`

export const Row = styled.div`
    position: relative;
    
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

export const RowUntilPhone = styled.div`
    display: flex;
    align-items: center;

    ${media.phone} {
        flex-direction: column;
        align-items: start;
    }
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

export const NoLineBreak = styled.span`
    white-space: nowrap;
`

export const CardLinkBox = styled.div`
    margin-top: 1rem;

    display: flex;

    align-items: center;

`

export const HoverableContainer = styled.div<{ height?: number, width?: number }>`
    height: ${props => props.height ? `${props.height}px` : '200px'};
    width: ${props => props.height ? `${props.width}px` : '134px'};

    border: 2px solid ${BLACK};

    overflow: hidden;
`

export const HoverableGatsbyImage = styled(GatsbyImage)`
    transition: transform 6s;
    &:hover {
        transform: scale(1.3);
    }
`

export const List = styled.ul`
    font-size: ${FONT_MD};
    list-style: none;
`

export const LItem = styled.li`
    margin: 1rem 0;
`

export const WpContentDescription = styled.div<{ fontSize?: string }>`
    font-size: ${props => props.fontSize ? props.fontSize : FONT_LG};
    ${media.desktop} {
        font-size: ${FONT_MD};
    }

    a:link,
    a:visited {
        position: relative;

        color: ${SECONDARY_800};

        overflow: hidden;
        white-space: nowrap;

        &::after {
            content: '';
            
            position: absolute;
            left: 0;
            bottom: 0;
            
            height: 2px;
            width: 100%;
            
            background-color: ${SECONDARY_800};

            transition: transform 0.5s ease;
            transform-origin: left;
            transform: scaleX(0);
        }

        &:hover {
            &::after {
                transform: scaleX(1);

                ${media.reducedMotion} {
                    transform: scaleX(0);
                }
            }
        }
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;

    transition: all 1s ease;
`

export const ControlGroup = styled.div`
    margin: 1rem 0;
`

export const DisappearOnTablet = styled.div`
    ${media.desktop} {
        display: none;
    }
`

export const DisappearOnPhone= styled.div`
    ${media.phone} {
        display: none;
    }
`

export const WpContent = styled.div<{ fontSize?: string }>`
    font-size: ${props => props.fontSize ? props.fontSize : FONT_LG};

    ${media.phone} {
        font-size: ${props => props.fontSize ? props.fontSize : FONT_MD};
    }

    a:link,
    a:visited {
        position: relative;

        color: ${props => props.theme.base.textColor};

        overflow: hidden;
        white-space: nowrap;

        &::after {
            content: '';
            
            position: absolute;
            left: 0;
            bottom: 0;
            
            height: 2px;
            width: 100%;
            
            background-color: ${props => props.theme.base.textColor};

            transition: transform 0.5s ease;
            transform-origin: left;
            transform: scaleX(0);
        }

        &:hover {
            &::after {
                transform: scaleX(1);

                ${media.reducedMotion} {
                    transform: scaleX(0);
                }
            }
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: ${FAUSTINA};
        margin: 2rem 0;
    }

    ol,
    li {
        margin-left: 1rem;
    }

    p {
        margin: 1rem 0;
    }
`

export const WpContentInline = styled.span<{ fontSize?: string }>`
    font-size: ${props => props.fontSize ? props.fontSize : FONT_LG};

    a:link,
    a:visited {
        position: relative;

        color: ${props => props.theme.base.textColor};

        overflow: hidden;
        white-space: nowrap;

        &::after {
            content: '';
            
            position: absolute;
            left: 0;
            bottom: 0;
            
            height: 2px;
            width: 100%;
            
            background-color: ${props => props.theme.base.textColor};

            transition: transform 0.5s ease;
            transform-origin: left;
            transform: scaleX(0);
        }

        &:hover {
            &::after {
                transform: scaleX(1);

                ${media.reducedMotion} {
                    transform: scaleX(0);
                }
            }
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: ${FAUSTINA};
        margin: 2rem 0;
    }

    ol,
    li {
        margin-left: 1rem;
    }

    p {
        margin: 1rem 0;
    }
`