import * as React from 'react';

import { SVGSize } from '@Types/portfolio';
import { useAppSelector } from '@Store/hooks';
import { SVGShapeBase } from './Svgs.styles';

const Segment1: React.FC<SVGSize> = ({ size }) => {
  const themeStore = useAppSelector((root) => root.theme);
  return (
    <SVGShapeBase size={size}>
      <path
        d="M20,50 C40,10 60,90 80,50 S120,10 140,50 C160,90 180,10 200,50"
        fill="none"
        stroke={themeStore.active.base.textColor}
        strokeWidth="2"
      />
    </SVGShapeBase>
  );
};

export default Segment1;
