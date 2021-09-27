import * as React from "react";
import { StyledArrow } from "./DownArrow.styles";

import { OpenProps } from "@Types/props";

const DownArrow: React.FC<OpenProps> = ({
    open = false,
    tabIndex = -1,
    onClick = undefined,
    cyId
}) => {
    return (
        <StyledArrow
            role="button"
            open={open}
            tabIndex={tabIndex}
            onClick={onClick}
            data-cy={cyId ? cyId : "submenu-open"}
        >
            &#8609;
        </StyledArrow>
    );
};

export default DownArrow;
