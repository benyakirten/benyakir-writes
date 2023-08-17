import * as React from 'react'

import { useAppSelector } from '@Store/hooks'
import { SVGData } from '@Types/portfolio'
import { generatePolygonPoints } from '@Utils/svgs'
import SVGShape from './SVGShape.component'

const Polygon: React.FC<SVGData> = ({ xMovement, yMovement }) => {
  const [points] = React.useState(generatePolygonPoints())
  const themeStore = useAppSelector((root) => root.theme)
  return (
    <SVGShape xMovement={xMovement} yMovement={yMovement}>
      <polygon
        points={points}
        fill="none"
        stroke={themeStore.active.base.textColor}
        strokeWidth="2"
      />
    </SVGShape>
  )
}

export default Polygon
