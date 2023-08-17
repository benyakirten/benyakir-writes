import * as React from 'react'

import { SVGPositionData } from '@/utils/portfolio'
import { PortfolioSVGContainer } from './Portfolio.styles'

const Shapes: React.FC<{ positions: SVGPositionData[] }> = ({ positions }) => {
  if (positions.length === 0) {
    return null
  }
  return (
    <>
      {positions.map(
        ({ Shape, xMovement, yMovement, xPosition, yPosition }) => (
          <PortfolioSVGContainer xPosition={xPosition} yPosition={yPosition}>
            <Shape xMovement={xMovement} yMovement={yMovement} />
          </PortfolioSVGContainer>
        )
      )}
    </>
  )
}

export default Shapes
