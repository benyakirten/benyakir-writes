import * as React from 'react';

import { Polygon, Segment1, Segment2, Wheel } from './svgs';

const Shapes: React.FC<{ width: number; height: number }> = () => {
  return (
    <>
      <div style={{ position: 'absolute', top: '200px', right: '200px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '300px', left: '20px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '100px', left: '300px' }}>
        <Polygon />
      </div>
      <div style={{ position: 'absolute', top: '200px', left: '300px' }}>
        <Segment1 />
      </div>
      <div style={{ position: 'absolute', top: '400px', left: '300px' }}>
        <Segment2 />
      </div>
    </>
  );
};

export default Shapes;
