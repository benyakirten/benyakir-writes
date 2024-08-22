import React from "react";

import { FetchState } from "@/hooks";
import { LatestUpdateState } from "@/types/hooks";
import { getPrettyDate } from "@/utils/dates";
import Loading from "../Loading/Loading.component";
import IconedText from "@/components/Cards/IconedText.component";
import RefreshIcon from "@/components/Icons/Refresh.component";

const LatestUpdate: React.FC<{ state: LatestUpdateState }> = ({ state }) => {
	const determineComponentByState = React.useCallback(
		(state: LatestUpdateState) => {
			if (state === FetchState.NONE) {
				return null;
			}
			switch (state) {
				case FetchState.ERROR:
					return "Unable to retrieve date";
				case FetchState.LOADING:
					return <Loading />;
				default:
					return `Latest Update: ${getPrettyDate(state)}`;
			}
		},
		[],
	);
	return (
		<IconedText
			icon={<RefreshIcon />}
			text={determineComponentByState(state)}
		/>
	);
};

export default LatestUpdate;
