import * as React from "react";

import { StyledBox } from "./IconGrid.styles";
import { Icon } from "@Gen";

const IconGrid: React.FC<IconGridProps> = ({ icons, height = "3rem" }) => {
  return (
    <StyledBox>
      {icons.map((i) => (
        <Icon key={i.name} height={height} icon={i} />
      ))}
    </StyledBox>
  );
};

export default IconGrid;
