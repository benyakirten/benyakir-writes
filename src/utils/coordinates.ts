export function getFourCorners(rect: DOMRect): Corners {
  return [
    {
      x: rect.left,
      y: rect.top
    },
    {
      x: rect.right,
      y: rect.top
    },
    {
      x: rect.right,
      y: rect.bottom
    },
    {
      x: rect.left,
      y: rect.bottom
    },
  ]
}

export function getNearestCornerIdx(mousePos: Coord, corners: Corners) {
  const distances = corners.map(c => Math.sqrt((mousePos.x - c.x) ** 2 + (mousePos.y - c.y) ** 2))
  const idx = distances.indexOf(Math.min(...distances))
  return idx;
}