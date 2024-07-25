import { useCallback, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit: number = SEARCH_TIMEOUT,
) => {
	const [value, setValue] = useState(initialVal);
	useEffect(() => {
		const timeout = setTimeout(() => {
			callback(value);
		}, timeLimit);

		return () => {
			clearTimeout(timeout);
		};
	}, [callback, timeLimit, value]);

	return [value, setValue];
};

export default useDebounce;
