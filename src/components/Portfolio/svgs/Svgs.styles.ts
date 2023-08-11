import { rotate } from "@/styles/animations";
import styled from "styled-components";

export const SVGShapeBase = styled.svg.attrs<{ size: number }>(({ size }) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  width: size,
  height: size,
})) <{ size: number }>`
  transition: filter 3s ease, scale 5s ease;
  filter: ${props => `blur(${props.size / 15}px)`};
  animation: ${rotate} 30s infinite linear;

  &:hover {
    filter: blur(1px);
    scale: 1.1;
  }
`
