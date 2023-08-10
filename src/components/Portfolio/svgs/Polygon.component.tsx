import * as React from 'react';

import { SVGSize } from '@Types/portfolio';
import { generatePolygonPoints } from '@Utils/svgs';
import { useAppSelector } from '@Store/hooks';
import { SVGShapeBase } from './Svgs.styles';

const Polygon: React.FC<SVGSize> = ({ size = 40 }) => {
  const points = React.useMemo(() => generatePolygonPoints(), []);
  const themeStore = useAppSelector((root) => root.theme);
  return (
    <SVGShapeBase size={size}>
      <polygon
        points={points}
        fill="none"
        stroke={themeStore.active.base.textColor}
        strokeWidth="2"
      />
    </SVGShapeBase>
  );
};

export default Polygon;
