enum SVGShapeType {
  WHEEL,
  POLYGON,
  SEGMENT1,
  SEGMENT2,
  NONE
}
export const createDimensionalRepresentation = (width: number, height: number) => {
  const widthSquares = Math.floor(width / 100)
  const heightSquares = Math.floor(height / 100)

  return Array.from({ length: heightSquares - 1 }, () => getShapesForLine(widthSquares))
}

const SHAPES_PER_LINE_RATIO = 0.2
export const getShapesForLine = (size: number) => {
  const numShapes = Math.min(Math.floor(Math.random() * size), SHAPES_PER_LINE_RATIO * size)
  const positions: SVGShapeType[] = Array.from({ length: size }, () => SVGShapeType.NONE)
  for (let i = 0; i < numShapes; i++) {
    let randomIdx = -1
    while (positions[randomIdx] === SVGShapeType.NONE) {
      randomIdx = Math.floor(Math.random() * size)
    }
    // Get random shape
  }
}