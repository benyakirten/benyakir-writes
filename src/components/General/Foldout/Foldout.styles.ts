import styled from "styled-components";

import { TRANSITION_NORMAL } from "@/styles/variables";
import { multiplyCSSNumber } from "@/utils/strings";
import { media } from "@/styles/queries";

export const FoldoutContainer = styled.div`
  position: relative;
`;

export const TopbarContainer = styled.div`
  cursor: pointer;
  max-width: max-content;
`;

export const FoldoutBody = styled.div<{
	open: boolean;
	height: string;
	heightMultiplierOnPhone?: number;
	heightMultiplierOnTablet?: number;
	heightMultiplierOnLarger?: number;
}>`
  display: flex;
  flex-direction: column;

  cursor: default;

  height: ${(props) => (props.open ? props.height : "0")};

  transform-origin: top;
  transform: scaleY(${(props) => (props.open ? "1" : "0.8")});
  transition: all ${TRANSITION_NORMAL} ease;

  opacity: ${(props) => (props.open ? "1" : "0")};

  ${media.custom(1160)} {
    height: ${(props) =>
			props.open
				? multiplyCSSNumber(
						props.height,
						props.heightMultiplierOnLarger ? props.heightMultiplierOnLarger : 1,
					)
				: "0"};
  }

  ${media.desktop} {
    height: ${(props) =>
			props.open
				? multiplyCSSNumber(
						props.height,
						props.heightMultiplierOnTablet ? props.heightMultiplierOnTablet : 1,
					)
				: "0"};
  }
  ${media.phone} {
    height: ${(props) =>
			props.open
				? multiplyCSSNumber(
						props.height,
						props.heightMultiplierOnPhone ? props.heightMultiplierOnPhone : 1.2,
					)
				: "0"};
  }

  ${media.reducedMotion} {
    transition: all 1ms ease !important;
  }
`;
