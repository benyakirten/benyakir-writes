import { useState } from "react";

import type { AlternationHook } from "@/types/hooks";

const useAlternation: AlternationHook = () => {
	const [dropdownOpen, setAlternationOpen] = useState("");
	const setAlternation = (val: string) =>
		setAlternationOpen((current) => (current === val ? "" : val));
	return [dropdownOpen, setAlternation];
};

export default useAlternation;
