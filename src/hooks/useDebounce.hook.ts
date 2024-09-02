import { useCallback, useState } from "react";

import { SEARCH_TIMEOUT } from "@/data/constants";
import type { DebounceHook } from "@/types/hooks";

const useDebounce: DebounceHook = (
	callback: (t: string) => void,
	initialVal = "",
	timeLimit = SEARCH_TIMEOUT,
) => {
	const [text, _setText] = useState(initialVal);
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const setText = (value: string) => {
		_setText(value);

		if (timer) {
			clearTimeout(timer);
		}

		const time = value ? timeLimit : 0;
		const timeout = setTimeout(() => callback(value), time);
		setTimer(timeout);
	};
	return [text, setText];
};

export default useDebounce;
