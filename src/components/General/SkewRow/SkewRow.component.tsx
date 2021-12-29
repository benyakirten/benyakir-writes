import * as React from "react";
import { AntiSkewed, Skewed } from "./SkewRow.styles";

const SkewRow: React.FC = ({ children }) => {
  return (
    <Skewed>
      <AntiSkewed>{children}</AntiSkewed>
    </Skewed>
  );
};

export default SkewRow;
