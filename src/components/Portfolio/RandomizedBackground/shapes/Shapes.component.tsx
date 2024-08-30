import * as React from "react";
import { styled } from "styled-components";

import type { SVGPositionData } from "@/utils/portfolio";

const PortfolioSVGContainer = styled.div<{
	$xPosition: number;
	$yPosition: number;
}>`
  position: absolute;
  top: ${(props) => props.$yPosition}px;
  left: ${(props) => props.$xPosition}px;
`;

const Shapes: React.FC<{ positions: SVGPositionData[] }> = ({ positions }) => {
	if (positions.length === 0) {
		return null;
	}
	return (
		<>
			{positions.map(
				({ Shape, xMovement, yMovement, xPosition, yPosition }) => (
					<PortfolioSVGContainer
						key={`${xPosition},${yPosition}`}
						$xPosition={xPosition}
						$yPosition={yPosition}
					>
						<Shape xMovement={xMovement} yMovement={yMovement} />
					</PortfolioSVGContainer>
				),
			)}
		</>
	);
};

export default Shapes;
