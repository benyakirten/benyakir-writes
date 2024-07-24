import { useState } from "react";

import type { ToggleHook } from "@/types/hooks";

const useToggle: ToggleHook = (initialVal = false) => {
	const [val, _toggleVal] = useState(initialVal);
	const toggleVal = () => {
		_toggleVal((current) => !current);
	};
	return [val, toggleVal];
};

export default useToggle;
