import * as React from 'react';
import { PortfolioBackground } from './Portfolio.styles';
import Shapes from './Shapes.component';

const RandomizedBackground: React.FC<ChildrenProp> = ({ children }) => {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
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
      <Shapes {...size} />
      {children}
    </PortfolioBackground>
  );
};

export default RandomizedBackground;
