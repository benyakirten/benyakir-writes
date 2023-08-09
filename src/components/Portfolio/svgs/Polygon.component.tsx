import * as React from 'react';

const Polygon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
      <polygon points="50,10 80,30 70,70 30,80 10,40" fill="none" stroke="#333" stroke-width="2" />

      <polygon points="20,70 40,50 50,80" fill="none" stroke="#555" stroke-width="2" />
    </svg>
  );
};
