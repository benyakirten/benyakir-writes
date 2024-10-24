import { useMemo, useState } from "react";

import { BooleanLookup } from "@/types/general";
import type { MultipleHook } from "@/types/hooks";

const useMultiple: MultipleHook = (allOptions, currentlyOpen) => {
	const open: BooleanLookup = useMemo(() => {
		const isCurrentlyOpen = currentlyOpen ?? allOptions;
		return allOptions.reduce<Record<string, boolean>>((acc, next) => {
			acc[next] = isCurrentlyOpen.includes(next);
			return acc;
		}, {});
	}, [allOptions, currentlyOpen]);

	const [openOptions, _setOpenOptions] = useState(open);

	const setOpenOptions = (...options: string[]) => {
		_setOpenOptions((current) => {
			const state = { ...current };
			for (const option of options) {
				if (option in state) {
					state[option] = !state[option];
				}
			}

			return state;
		});
	};

	return [openOptions, setOpenOptions];
};

export default useMultiple;
