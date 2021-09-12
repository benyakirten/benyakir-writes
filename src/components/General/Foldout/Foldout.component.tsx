import * as React from "react";

import { FoldoutContainer, FoldoutBody } from "./Foldout.styles";

import DownArrow from "@Pre/DownArrow/DownArrow.component";

import { FoldoutProps } from "@Types/props";

const Foldout: React.FC<FoldoutProps> = ({
    open = false,
    height = "4rem",
    topbar,
    onClick,
    children,
    heightMultiplierOnPhone,
    heightMultiplierOnTablet,
    heightMultiplierOnLarger
}) => {
    function handleContainerClick(e: React.BaseSyntheticEvent) {
        if (
            e.target.id === "no-toggle" ||
            (e.target.parentElement && e.target.parentElement.id === "no-toggle") ||
            (e.target.parentElement.parentElement && e.target.parentElement.parentElement.id === "no-toggle") ||
            (e.target.parentElement.parentElement.parentElement && e.target.parentElement.parentElement.parentElement.id === 'no-toggle')
        ) {
            return;
        }
        onClick && onClick();
    }
    return (
        <FoldoutContainer open={open} onClick={(e) => handleContainerClick(e)}>
            <DownArrow open={open} tabIndex={open ? 0 : -1} onClick={onClick} />
            {topbar}
            <FoldoutBody
                id="no-toggle"
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
    );
};

export default Foldout;
