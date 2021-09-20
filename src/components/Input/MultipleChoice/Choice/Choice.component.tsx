import * as React from "react";

import { ChoiceProps } from "@Types/props";
import { ChoiceContainer } from "./Choice.styles";

const Choice: React.FC<ChoiceProps> = ({ label, onSelect, value }) => {
    return (
        <ChoiceContainer
            role="checkbox"
            aria-checked={value}
            onClick={() => onSelect(label)}
            checked={value}
            tabIndex={0}
            aria-labelledby={`${label}-label`}
        >
            <span id={`${label}-label`}>{label}</span>
        </ChoiceContainer>
    );
};

export default Choice;
