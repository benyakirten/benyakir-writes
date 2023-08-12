import * as React from 'react';
import { PortfolioBackground } from './Portfolio.styles';
import { Polygon, Wheel } from './svgs';

const RandomizedBackground: React.FC = () => {
  const [size, setSize] = React.useState<{ width: number; height: number }>();
  React.useEffect(() => {
    const fn = () => {
      const main = document.querySelector('main');
      if (!main) {
        return;
      }

      const { width, height } = main.getBoundingClientRect();
      // console.log(`size set to ${width}, ${height}`);
      setSize({ width, height });
    };

    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <PortfolioBackground>
      <div style={{ position: 'absolute', top: 'calc(100px + 20%)', right: '200px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: 'calc(50px + 20%)', left: '20px' }}>
        <Wheel />
      </div>
      <div style={{ position: 'absolute', top: 'calc(0px + 20%)', left: '50px' }}>
        <Polygon />
      </div>
    </PortfolioBackground>
  );
};

export default RandomizedBackground;
