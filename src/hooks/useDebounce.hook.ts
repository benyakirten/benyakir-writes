import { useCallback, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit = SEARCH_TIMEOUT,
) => {
	const [text, setText] = useState(initialVal);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO: Figure out why adding callback to the dependency array causes an infinite loop
	useEffect(() => {
		const time = text ? timeLimit : 0;
		const timeout = setTimeout(() => callback(text), time);

		return () => clearTimeout(timeout);
	}, [text, timeLimit]);

	return [text, setText];
};

export default useDebounce;
