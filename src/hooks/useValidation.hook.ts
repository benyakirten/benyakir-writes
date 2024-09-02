import { useState } from "react";

import type { ValidationHook } from "@/types/hooks";
import { validate } from "@/utils/validation";

const useValidation: ValidationHook = (
	valFns,
	initialValue = "",
	initialValidity = false,
) => {
	const [value, _setValue] = useState(initialValue);
	const [valid, setValidity] = useState(initialValidity);
	const setValue = (newValue: string | number) => {
		const isValidInput = validate(newValue, valFns);
		setValidity(isValidInput);
		_setValue(newValue);
	};
	return [value, setValue, valid];
};

export default useValidation;
