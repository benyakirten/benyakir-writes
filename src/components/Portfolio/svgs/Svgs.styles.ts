import styled, { css, keyframes } from 'styled-components'

const createShapeAnimation = (
  xMovement: number = 5,
  yMovement: number = 2,
  initialRotation: number = 0
) => keyframes`
  from {
    rotate: ${initialRotation}deg;
    translate: 0rem 0rem;
  }
  to {
    rotate: -360deg;
    translate: ${xMovement}rem ${yMovement}rem;
  }
`

export const SVGShapeBase = styled.svg.attrs<{
  size: number
  xMovement?: number
  yMovement?: number
}>(({ size }) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 100 100',
  width: size,
  height: size,
}))<{
  size: number
  xMovement?: number
  yMovement?: number
  rotation?: number
}>`
  transition: filter 3s ease, scale 5s ease;
  filter: ${(props) => `blur(${props.size / 15}px)`};
  animation: ${(props) =>
    css`
      ${createShapeAnimation(
        props.xMovement,
        props.yMovement,
        props.rotation ?? 0
      )} 30s infinite alternate linear
    `};

  &:hover {
    filter: blur(1px);
    scale: 1.1;

    @media (prefers-reduced-motion: reduce) {
      transition: filter 3s ease !important;
      scale: 1;
    }
  }
`
