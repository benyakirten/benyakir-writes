import * as React from "react";

import {
  ToggleGroup,
  ToggleInput,
  ToggleLabel,
  ToggleOutput
} from "./Toggle.styles";

const Toggle: React.FC<ToggleProps> = ({
  onToggle,
  value,
  label,
  name,
  dataCy,
  tabIndex
}) => {
  return (
    <ToggleGroup>
      <ToggleInput
        tabIndex={tabIndex}
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={onToggle}
        aria-pressed={value}
      />
      <ToggleLabel htmlFor={name} label={label} data-cy={dataCy ?? 'toggle'} />
      <ToggleOutput onClick={onToggle}>{label}</ToggleOutput>
    </ToggleGroup>
  );
};

export default Toggle;
