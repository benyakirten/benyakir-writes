import {
  createDimensionalRepresentation,
  SVGPositionData,
} from '@/utils/portfolio'
import * as React from 'react'
import { PortfolioBackground } from './Portfolio.styles'
import Shapes from './Shapes.component'

const RandomizedBackground: React.FC<ChildrenProp> = ({ children }) => {
  const [_, startTransition] = React.useTransition()
  const [positions, setPositions] = React.useState<SVGPositionData[]>()
  React.useEffect(() => {
    const fn = () => {
      const main = document.querySelector('main')
      if (!main) {
        return
      }

      const { width, height } = main.getBoundingClientRect()
      const newPositions = createDimensionalRepresentation(width, height)
      startTransition(() => {
        setPositions(newPositions)
      })
    }

    fn()
  }, [])

  return (
    <PortfolioBackground>
      <Shapes positions={positions ?? []} />
      {children}
    </PortfolioBackground>
  )
}

export default RandomizedBackground
