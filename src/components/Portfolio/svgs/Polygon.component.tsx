import * as React from 'react';

import { useAppSelector } from '@Store/hooks';
import { SVGSize } from '@Types/portfolio';
import { generatePolygonPoints } from '@Utils/svgs';
import SVGShape from './SVGShape.component';

const Polygon: React.FC<SVGSize> = ({ size }) => {
  const points = React.useMemo(() => generatePolygonPoints(), []);
  const themeStore = useAppSelector((root) => root.theme);
  return (
    <SVGShape size={size}>
      <polygon
        points={points}
        fill="none"
        stroke={themeStore.active.base.textColor}
        strokeWidth="2"
      />
    </SVGShape>
  );
};

export default Polygon;
