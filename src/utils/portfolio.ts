export const createDimensionalRepresentation = (width: number, height: number) => {
  const widthSquares = Math.floor(width / 100)
  const heightSquares = Math.floor(height / 100)

  return Array.from({ length: widthSquares }, () => Array.from({ length: heightSquares - 1 }, () => false))
}

const SHAPE_DENSITY = 0.3
// export const 