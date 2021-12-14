export const keepWithinRange = (n: number, min = 0, max = 255) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}