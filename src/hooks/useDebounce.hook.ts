import { useCallback, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit: number = SEARCH_TIMEOUT,
) => {
	const memoizedCallback = useCallback(
		(text: string) => callback(text),
		[callback],
	);
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	const [text, setText] = useState(initialVal);

	useEffect(() => {
		if (!text) {
			memoizedCallback("");
		}
		if (timer) {
			clearTimeout(timer);
			setTimer(undefined);
		}
		const timeout = setTimeout(() => memoizedCallback(text), timeLimit);
		setTimer(timeout);
	}, [text, memoizedCallback, timeLimit, timer]);

	return [text, setText];
};

export default useDebounce;
