import * as React from 'react';
import { PortfolioBackground } from './Portfolio.styles';
import { Polygon, Wheel } from './svgs';

const RandomizedBackground: React.FC = () => {
  return (
    <PortfolioBackground>
      <div style={{ position: 'absolute', top: '100px', right: '200px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '50px', left: '20px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: '0px', left: '50px' }}>
        <Polygon />
      </div>
    </PortfolioBackground>
  );
};

export default RandomizedBackground;
