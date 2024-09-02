import React from "react";
import { styled } from "styled-components";

import IconedText from "@/components/Cards/IconedText.component";
import { Time } from "@/components/General";
import RefreshIcon from "@/components/Icons/Refresh.component";
import { FetchState } from "@/hooks";
import { SIZE_XS } from "@/styles/variables";
import { LatestUpdateState } from "@/types/hooks";
import Loading from "../Loading/Loading.component";

const TextContainer = styled.span`
	display: flex;
	align-items: center;
	gap: ${SIZE_XS};
`;

const LatestUpdate: React.FC<{ state: LatestUpdateState }> = ({ state }) => {
	const determineComponentByState = React.useCallback(
		(state: LatestUpdateState) => {
			if (state === FetchState.NONE) {
				return null;
			}
			switch (state) {
				case FetchState.ERROR:
					return "Unknown";
				case FetchState.LOADING:
					return <Loading size="1.2rem" />;
				default:
					return <Time date={state} />;
			}
		},
		[],
	);

	const renderable = determineComponentByState(state);

	return (
		renderable && (
			<IconedText
				span={1}
				icon={<RefreshIcon />}
				text={<TextContainer>Latest Update: {renderable}</TextContainer>}
			/>
		)
	);
};

export default LatestUpdate;
