import { useReducer } from "react";

import type { LookupHook } from "@/types/hooks";

const useLookup: LookupHook = (items: BooleanLookup) => {
	function reducer(
		action: { type: LookupActionType; payload: string },
		state: BooleanLookup = items,
	) {
		switch (action.type) {
			case "ACTIVATE":
				return {
					...state,
					[action.payload]: true,
				};
			case "DEACTIVATE":
				return {
					...state,
					[action.payload]: false,
				};
			case "TOGGLE":
				return {
					...state,
					[action.payload]: !state[action.payload],
				};
			default:
				return state;
		}
	}

	// @ts-ignore - TODO: Fix this
	const [state, dispatch] = useReducer(reducer, items);
	return [state, dispatch];
};

export default useLookup;
