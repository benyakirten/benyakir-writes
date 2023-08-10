import * as React from 'react';
import { TechnologyCheckox, TechnologyLabel } from './Portfolio.styles';

const TextCheckbox: React.FC<{ checked: boolean; onToggle: () => void }> = ({
  children,
  checked,
  onToggle,
}) => {
  return (
    <TechnologyLabel checked={checked}>
      {children}
      <TechnologyCheckox type="checkbox" checked={checked} onChange={onToggle} />
    </TechnologyLabel>
  );
};

export default TextCheckbox;
