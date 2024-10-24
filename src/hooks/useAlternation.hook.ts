import { useState } from "react";

import type { AlternationHook } from "@/types/hooks";
import {
	getQueryParams,
	removeQueryParam,
	setOneQueryParam,
} from "@/utils/queries";

const useAlternation: AlternationHook = (id: string) => {
	const [dropdownOpen, setAlternationOpen] = useState<string | null>(
		getQueryParams().get(id) || null,
	);
	const setAlternation = (val: string | null) =>
		setAlternationOpen((current) => {
			let value: string | null;
			if (val === null || current === val) {
				removeQueryParam(id);
				value = null;
			} else {
				setOneQueryParam(id, val);
				value = val;
			}
			return value;
		});
	return [dropdownOpen, setAlternation];
};

export default useAlternation;
