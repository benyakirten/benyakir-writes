import * as React from 'react'

import { ButtonExterior } from './Button.styles';

import { getFourCorners, getNearestCornerIdx } from '@Utils/coordinates';

import {
    CORNER_INDEX_TO_POSITIONING,
    TRANSFORM_ORIGIN_FOR_CORNER_INDEX,
    TRIANGLES_FOR_CORNER_INDEX
} from '@Constants';

import { ButtonProps } from '@Types/props';

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const [cornerIdx, setCornerIdx] = React.useState<number>(0)
    function handleMouseover(e: any) {
        const mouseLoc: Coord = { x: e.clientX, y: e.clientY }
        const corners: Corners = getFourCorners(e.target.getBoundingClientRect())
        const _cornerIdx = getNearestCornerIdx(mouseLoc, corners);
        setCornerIdx(_cornerIdx)
    }
    return (
        <ButtonExterior onMouseEnter={handleMouseover} onClick={onClick}>
            <div
                style={{
                    ...CORNER_INDEX_TO_POSITIONING[cornerIdx],
                    transformOrigin: TRANSFORM_ORIGIN_FOR_CORNER_INDEX[cornerIdx],
                    clipPath: TRIANGLES_FOR_CORNER_INDEX[cornerIdx]
                }}
            />
            <span>{children}</span>
        </ButtonExterior>
    )
}

export default Button;