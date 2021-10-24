import * as React from "react"

import { FoldoutContainer, FoldoutBody } from "./Foldout.styles"

import DownArrow from "@Pre/DownArrow/DownArrow.component"

import { FoldoutProps } from "@Types/props"

const Foldout: React.FC<FoldoutProps> = ({
    open = false,
    height = "4rem",
    topbar,
    onClick,
    children,
    heightMultiplierOnPhone,
    heightMultiplierOnTablet,
    heightMultiplierOnLarger,
    cyId
}) => {
    const handleContainerClick = React.useCallback((e: React.BaseSyntheticEvent) => _handleContainerClick(e), [onClick])
    function _handleContainerClick(e: React.BaseSyntheticEvent) {
        if (
            e.target.getAttribute("data-navtoggle") === "no-toggle" ||
            (e.target.parentElement && e.target.parentElement.getAttribute("data-navtoggle") === "no-toggle") ||
            (e.target.parentElement.parentElement && e.target.parentElement.parentElement.getAttribute("data-navtoggle") === "no-toggle") ||
            (e.target.parentElement.parentElement.parentElement && e.target.parentElement.parentElement.parentElement.getAttribute("data-navtoggle") === 'no-toggle')
        ) {
            return
        }
        onClick && onClick()
    }
    return (
        <FoldoutContainer open={open} onClick={(e) => handleContainerClick(e)}>
            <DownArrow open={open} tabIndex={open ? 0 : -1} onClick={onClick} cyId={cyId ? cyId : "foldout-bar"} />
            {topbar}
            <FoldoutBody
                data-navtoggle="no-toggle"
                heightMultiplierOnPhone={heightMultiplierOnPhone}
                heightMultiplierOnTablet={heightMultiplierOnTablet}
                heightMultiplierOnLarger={heightMultiplierOnLarger}
                height={height}
                open={open}
                aria-hidden={!open}
            >
                {children}
            </FoldoutBody>
        </FoldoutContainer>
    )
}

export default Foldout
