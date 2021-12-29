import * as React from "react";

import { TextInputContainer } from "./Text.styles";

const Text: React.FC<TextProps> = ({
  label,
  name,
  onChange,
  value,
  width,
  tabIndex = 0,
  autofocus = false,
  cyId,
}) => {
  return (
    <TextInputContainer>
      <input
        value={value}
        type="text"
        placeholder=" "
        name={name}
        id={name}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width,
        }}
        tabIndex={tabIndex}
        autoFocus={tabIndex === 0 ? autofocus : false}
        data-cy={cyId ? cyId : "text-input"}
      />
      <label htmlFor={name}>{label}</label>
    </TextInputContainer>
  );
};

export default Text;
