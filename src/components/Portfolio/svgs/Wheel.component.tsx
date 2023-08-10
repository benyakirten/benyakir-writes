import { useToggle } from '@/hooks';
import * as React from 'react';
import { SVGShapeBase } from './Svgs.styles';

const Wheel: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <SVGShapeBase size={size}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="2" />

      <line x1="50" y1="10" x2="50" y2="90" stroke="#555" strokeWidth="2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#555" strokeWidth="2" />

      <line x1="27" y1="27" x2="73" y2="73" stroke="#555" strokeWidth="2" />
      <line x1="27" y1="73" x2="73" y2="27" stroke="#555" strokeWidth="2" />
    </SVGShapeBase>
  );
};
export default Wheel;
