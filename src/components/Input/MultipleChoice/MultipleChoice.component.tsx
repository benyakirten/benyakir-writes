import * as React from "react";

import { Row } from "@Styles/general-components";

import Choice from "./Choice/Choice.component";

import { MultipleChoiceProps } from "@Types/props";

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
    choices,
    onSelect,
}) => {
    function toggle(val: string) {
        onSelect(
            choices.map((c) =>
                c.value === val ? { ...c, selected: !c.selected } : c
            )
        );
    }
    return (
        <Row>
            {choices.map((c) => (
                <Choice
                    key={c.value}
                    value={c.selected}
                    label={c.value}
                    onSelect={toggle}
                />
            ))}
        </Row>
    );
};

export default MultipleChoice;
