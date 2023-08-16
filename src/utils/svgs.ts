const generatePolygonPoint = (
  xLimit: number = 100,
  yLimit: number = 100
): [number, number] => {
  const xPos = Math.floor(Math.random() * xLimit)
  const yPos = Math.floor(Math.random() * yLimit)
  return [xPos, yPos]
}

export const generatePolygonPoints = (
  xLimit: number = 100,
  yLimit: number = 100,
  minPoints: number = 6,
  maxPoints = 12
) => {
  // Generate random number between min and max
  const numPoints =
    Math.floor(Math.random() * (maxPoints - minPoints)) + minPoints
  let points: string[] = []
  for (let i = 0; i < numPoints; i++) {
    let point = generatePolygonPoint(xLimit, yLimit)
    points.push(`${point[0]},${point[1]}`)
  }

  return points.join(' ')
}
