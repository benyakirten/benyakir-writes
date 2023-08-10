import { generatePolygonPoints } from '@/utils/svgs';
import * as React from 'react';
import { SVGShapeBase } from './Svgs.styles';

const Polygon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const points = React.useMemo(() => generatePolygonPoints(), []);
  return (
    <SVGShapeBase size={size}>
      <polygon points={points} fill="none" stroke="#333" stroke-width="2" />
    </SVGShapeBase>
  );
};

export default Polygon;
