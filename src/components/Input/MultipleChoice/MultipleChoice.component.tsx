import * as React from "react";

import { Row } from "@Styles/general-components";

import Choice from "./Choice/Choice.component";

import { Z_BASE, Z_UNDER } from "@StyleVars";

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  onSelect,
  tabIndex = 0,
}) => {
  function toggle(val: string) {
    onSelect(
      choices.map((c) =>
        c.value === val ? { ...c, selected: !c.selected } : c
      )
    );
  }
  return (
    <Row
      style={{
        zIndex: tabIndex < 0 ? Z_UNDER : Z_BASE,
        height: tabIndex < 0 ? 0 : "auto",
      }}
      data-cy="multiple-choice"
    >
      {choices.map((c) => (
        <Choice
          key={c.value}
          tabIndex={tabIndex}
          value={c.selected}
          label={c.value}
          onSelect={toggle}
        />
      ))}
    </Row>
  );
};

export default MultipleChoice;
