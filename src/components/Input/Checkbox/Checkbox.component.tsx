import * as React from 'react'

import { CheckboxGroup } from './Checkbox.style'

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  onToggle,
  value,
  tabIndex = 0,
}) => {
  return (
    <CheckboxGroup>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={value}
        aria-labelledby={`label-${name}`}
        onChange={() => onToggle(!value)}
      />
      <label
        onClick={() => onToggle(!value)}
        data-navtoggle="no-toggle"
        tabIndex={tabIndex}
      >
        <span data-navtoggle="no-toggle">&#9758;</span>
      </label>
      <span onClick={() => onToggle(!value)} id={`label-${name}`}>
        {label}
      </span>
    </CheckboxGroup>
  )
}

export default Checkbox
