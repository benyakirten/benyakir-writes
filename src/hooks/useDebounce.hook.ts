import { useCallback, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit = SEARCH_TIMEOUT,
) => {
	const memoizedCallback = useCallback(
		(text: string) => callback(text),
		[callback],
	);
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	const [text, setText] = useState(initialVal);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const clearTimer = () => timer && clearTimeout(timer);
		if (!text) {
			memoizedCallback("");
			return clearTimer();
		}

		if (timer) {
			clearTimer();
		}

		const timeout = setTimeout(() => memoizedCallback(text), timeLimit);
		setTimer(timeout);

		return clearTimer;
	}, [text]);

	return [text, setText];
};

export default useDebounce;
