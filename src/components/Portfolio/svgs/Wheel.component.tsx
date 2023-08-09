import { useToggle } from '@/hooks';
import * as React from 'react';

const Wheel: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const [hovered, toggleHovered] = useToggle();

  return (
    <svg
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        transition: 'filter 3s ease, transform 40s ease-in',
        filter: `blur(${hovered ? 1 : size / 15}px)`,
        transform: `rotate(${hovered ? '7200' : '0'}deg)`,
      }}
    >
      <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="2" />

      <line x1="50" y1="10" x2="50" y2="90" stroke="#555" strokeWidth="2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#555" strokeWidth="2" />

      <line x1="27" y1="27" x2="73" y2="73" stroke="#555" strokeWidth="2" />
      <line x1="27" y1="73" x2="73" y2="27" stroke="#555" strokeWidth="2" />
    </svg>
  );
};
export default Wheel;
