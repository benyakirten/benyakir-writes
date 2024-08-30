import * as React from "react";
import { styled } from "styled-components";

import {
	type SVGPositionData,
	createDimensionalRepresentation,
} from "@/utils/portfolio";
import { Shapes } from "./shapes";

const PortfolioBackground = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${(props) => props.theme.base.background};
`;

const RandomizedBackground: React.FC<ChildrenProp> = ({ children }) => {
	const [_, startTransition] = React.useTransition();
	const [positions, setPositions] = React.useState<SVGPositionData[]>();

	React.useEffect(() => {
		const fn = () => {
			const main = document.querySelector("main");
			if (!main) {
				return;
			}

			const { width, height } = main.getBoundingClientRect();
			const newPositions = createDimensionalRepresentation(width, height);
			startTransition(() => {
				setPositions(newPositions);
			});
		};

		fn();
	}, []);

	return (
		<PortfolioBackground>
			<Shapes positions={positions ?? []} />
			{children}
		</PortfolioBackground>
	);
};

export default RandomizedBackground;
