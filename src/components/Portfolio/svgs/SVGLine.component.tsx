import * as React from 'react';

import { SVGSize } from '@/types/portfolio';
import { SVGShapeBase } from './Svgs.styles';

const SVGShape: React.FC<SVGSize> = ({ size = 80, children }) => (
  <SVGShapeBase
    size={size}
    xMovement={Math.random() * 10 - 5}
    yMovement={Math.random() * 10 - 5}
    rotation={(Math.floor(Math.random() * 3) + 3) * -60}
  >
    {children}
  </SVGShapeBase>
);

export default SVGShape;
