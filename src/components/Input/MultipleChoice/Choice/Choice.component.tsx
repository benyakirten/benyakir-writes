import * as React from "react";

import { ChoiceProps } from "@Types/props";
import { ChoiceContainer } from "./Choice.styles";

import { titleToKebab } from "@Utils/strings";

const Choice: React.FC<ChoiceProps> = ({ label, onSelect, value, tabIndex = 0 }) => {
    const _onSelect = React.useCallback(() => onSelect(label), [onSelect, label]);
    return (
        <ChoiceContainer
            role="checkbox"
            aria-checked={value}
            onClick={() => tabIndex >= 0 && _onSelect()}
            checked={value}
            tabIndex={tabIndex}
            hidden={tabIndex < 0}
            aria-labelledby={`${label}-label`}
            data-cy={`select-${titleToKebab(label)}`}
        >
            <span style={{ height: tabIndex < 0 ? 0 : 'auto' }} id={`${label}-label`}>{label}</span>
        </ChoiceContainer>
    );
};

export default Choice;
