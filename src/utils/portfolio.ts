import { Polygon, Segment1, Segment2, Wheel } from "@/components/Portfolio/svgs"
import { SVGData } from "@/types/portfolio"

enum SVGShapeType {
  WHEEL,
  POLYGON,
  SEGMENT1,
  SEGMENT2,
  NONE
}

export interface SVGPositionData {
  Shape: React.FC<SVGData>
  xPosition: number
  yPosition: number
  xMovement: number
  yMovement: number
}

export const getRandomShape = () => {
  const shapeNum = Math.floor(Math.random() * 4)
  switch (shapeNum) {
    case 0:
      return SVGShapeType.WHEEL
    case 1:
      return SVGShapeType.POLYGON
    case 2:
      return SVGShapeType.SEGMENT1
    case 3:
      return SVGShapeType.SEGMENT2
    default:
      return SVGShapeType.WHEEL
  }
}

const SHAPES_PER_LINE_RATIO = 0.2
export const getShapesForLine = (size: number) => {
  const numShapes = Math.min(Math.floor(Math.random() * size), SHAPES_PER_LINE_RATIO * size)
  const positions: SVGShapeType[] = Array.from({ length: size }, () => SVGShapeType.NONE)
  for (let i = 0; i < numShapes; i++) {
    let randomIdx = -1
    while (positions[randomIdx] !== SVGShapeType.NONE) {
      randomIdx = Math.floor(Math.random() * size)
    }
    const randomShape = getRandomShape()
    positions[randomIdx] = randomShape
  }
  return positions
}

export const createSquareDataFrom2DArray = (shapeArrays: SVGShapeType[][]) => {
  const data: SVGPositionData[] = []
  for (let verticalIndex = 0; verticalIndex < shapeArrays.length; verticalIndex++) {
    let horizontalArray = shapeArrays[verticalIndex]
    for (let horizontalIndex = 0; horizontalIndex < horizontalArray.length; horizontalIndex++) {
      let item = horizontalArray[horizontalIndex]

      let Shape: React.FC<SVGData>
      switch (item) {
        case SVGShapeType.POLYGON:
          Shape = Polygon;
          break
        case SVGShapeType.SEGMENT1:
          Shape = Segment1;
          break
        case SVGShapeType.SEGMENT2:
          Shape = Segment2;
          break
        case SVGShapeType.WHEEL:
          Shape = Wheel
          break
        default:
          continue
      }

      const xPosition = 100 * horizontalIndex + 50
      const yPosition = 100 * verticalIndex + 50
      const xMovement = Math.floor(Math.random() * 10) - 5
      const yMovement = Math.floor(Math.random() * 10) - 5

      const datum = {
        xPosition,
        yPosition,
        xMovement,
        yMovement,
        Shape
      }

      data.push(datum)
    }
  }

  return data
}

export const createDimensionalRepresentation = (width: number, height: number) => {
  const widthSquares = Math.floor(width / 100)
  const heightSquares = Math.floor(height / 100)

  const arr = Array.from({ length: heightSquares }, () => getShapesForLine(widthSquares))
  return createSquareDataFrom2DArray(arr)
}
