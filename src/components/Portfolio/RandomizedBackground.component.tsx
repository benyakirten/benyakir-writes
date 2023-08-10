import * as React from 'react';
import { Wheel, Polygon } from './svgs';

const RandomizedBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', top: '100px', right: '200px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '50px', left: '20px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '0px', left: '50px' }}>
        <Polygon />
      </div>
    </div>
  );
};

export default RandomizedBackground;
