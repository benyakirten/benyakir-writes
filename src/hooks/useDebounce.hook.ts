import { useCallback, useMemo, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit = SEARCH_TIMEOUT,
) => {
	const [text, setText] = useState(initialVal);
	const cb = useCallback(callback, []);

	useEffect(() => {
		const time = text ? timeLimit : 0;
		const timeout = setTimeout(() => cb(text), time);

		return () => clearTimeout(timeout);
	}, [text, timeLimit, cb]);

	return [text, setText];
};

export default useDebounce;
