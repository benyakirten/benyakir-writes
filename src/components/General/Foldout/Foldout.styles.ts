import styled from 'styled-components';

import { media } from '@Styles/queries';
import { multiplyCSSNumber } from '@/utils/strings';

export const FoldoutContainer = styled.div`
    position: relative;
`

export const TopbarContainer = styled.div`
    cursor: pointer;
    max-width: max-content;
`

export const FoldoutBody = styled.div<{
    open: boolean,
    height: string,
    heightMultiplierOnPhone?: number,
    heightMultiplierOnTablet?: number,
    heightMultiplierOnLarger?: number
}>`
    display: flex;
    flex-direction: column;

    cursor: default;
    
    height: ${props => props.open ? props.height : '0'};

    transform-origin: top;
    transform: scaleY(${props => props.open ? '1' : '0.8'});
    transition: all 400ms ease;
    
    opacity: ${props => props.open ? '1' : '0'};

    ${media.custom(1160)} {
        height: ${props => props.open ? multiplyCSSNumber(props.height, props.heightMultiplierOnLarger ? props.heightMultiplierOnLarger : 1) : '0'};
    }

    ${media.desktop} {
        height: ${props => props.open ? multiplyCSSNumber(props.height, props.heightMultiplierOnTablet ? props.heightMultiplierOnTablet : 1) : '0'};
    }
    ${media.phone} {
        height: ${props => props.open ? multiplyCSSNumber(props.height, props.heightMultiplierOnPhone ? props.heightMultiplierOnPhone : 1.2) : '0'};
    }

    ${media.reducedMotion} {
        transition: all 0.01s ease !important;
    }
`