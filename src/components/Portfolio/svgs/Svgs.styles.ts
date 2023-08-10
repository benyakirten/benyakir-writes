import styled from "styled-components";

export const SVGShapeBase = styled.svg.attrs<{ size: number }>(({ size }) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  width: size,
  height: size,
})) <{ size: number }>`
  transition: filter 3s ease, transform 40s ease-in;
  filter: ${props => `blur(${props.size / 15}px)`};
  transform: rotate(0deg);

  &:hover {
    filter: blur(1px);
    transform: rotate(7200deg);
  }
`