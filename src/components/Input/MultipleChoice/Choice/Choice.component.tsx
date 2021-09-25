import * as React from "react";

import { ChoiceProps } from "@Types/props";
import { ChoiceContainer } from "./Choice.styles";

const Choice: React.FC<ChoiceProps> = ({ label, onSelect, value, tabIndex = 0 }) => {
    return (
        <ChoiceContainer
            role="checkbox"
            aria-checked={value}
            onClick={() => tabIndex >= 0 && onSelect(label)}
            checked={value}
            tabIndex={tabIndex}
            hidden={tabIndex < 0}
            aria-labelledby={`${label}-label`}
        >
            <span style={{ height: tabIndex < 0 ? 0 : 'auto' }} id={`${label}-label`}>{label}</span>
        </ChoiceContainer>
    );
};

export default Choice;
