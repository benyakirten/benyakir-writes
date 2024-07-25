import { useCallback, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit: number = SEARCH_TIMEOUT,
) => {
	const [value, setValue] = useState(initialVal);
	const cb = useCallback((t: string) => callback(t), [callback]);
	useEffect(() => {
		if (!value) {
			return;
		}

		const timeout = setTimeout(() => {
			cb(value);
		}, timeLimit);

		return () => {
			clearTimeout(timeout);
		};
	}, [cb, timeLimit, value]);

	return [value, setValue];
};

export default useDebounce;
