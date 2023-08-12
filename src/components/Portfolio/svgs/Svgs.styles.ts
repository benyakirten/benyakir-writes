import styled, { css, keyframes } from "styled-components";

const createSvgAniation = (xMovement: number = 5, yMovement: number = 2) => keyframes`
  from {
    rotate: 0deg;
    translate: 0rem 0rem;
  }
  to {
    rotate: -360deg;
    translate: ${xMovement}rem ${yMovement}rem;
  }
`


export const SVGShapeBase = styled.svg.attrs<{ size: number, xMovement?: number, yMovement?: number }>(({ size }) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  width: size,
  height: size,
})) <{ size: number, xMovement?: number, yMovement?: number }>`
  transition: filter 3s ease, scale 5s ease;
  filter: ${props => `blur(${props.size / 15}px)`};
  animation: ${props => css`${createSvgAniation(props.xMovement, props.yMovement)} 30s infinite alternate linear`};

  &:hover {
    filter: blur(1px);
    scale: 1.1;
  }
`
