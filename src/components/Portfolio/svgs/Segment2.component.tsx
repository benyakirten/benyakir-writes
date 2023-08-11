import * as React from 'react';

import { useAppSelector } from '@Store/hooks';
import { SVGSize } from '@Types/portfolio';
import { SVGShapeBase } from './Svgs.styles';

const Segment2: React.FC<SVGSize> = ({ size = 40 }) => {
  const themeStore = useAppSelector((root) => root.theme);
  return (
    <SVGShapeBase size={size}>
      <path
        d="M10 50 C30 10, 70 90, 90 50"
        fill="none"
        stroke={themeStore.active.base.textColor}
        strokeWidth="2"
      />
    </SVGShapeBase>
  );
};

export default Segment2;
