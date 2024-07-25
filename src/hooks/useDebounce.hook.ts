import { useCallback, useMemo, useEffect, useState } from "react";

import type { DebounceHook } from "@/types/hooks";
import { SEARCH_TIMEOUT } from "@Constants";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit = SEARCH_TIMEOUT,
) => {
	const [text, _setText] = useState(initialVal);
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const setText = useCallback(
		(value: string) => {
			_setText(value);

			if (timer) {
				clearTimeout(timer);
			}

			const time = value ? timeLimit : 0;
			const timeout = setTimeout(() => callback(value), time);
			setTimer(timeout);
		},
		[callback, timeLimit, timer],
	);

	return [text, setText];
};

export default useDebounce;
