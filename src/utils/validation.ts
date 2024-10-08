import type {
	ValidateNumberFunction,
	ValidateStringFunction,
	ValidationFunction,
} from "@/types/hooks";

export const validateRange: ValidateNumberFunction<{
	min: number;
	max: number;
	step: number;
}> =
	({ min, max, step }) =>
	(val: number) =>
		val >= min && val <= max && val % step === 0;

export const validateByRegex: ValidateStringFunction<RegExp> =
	(regex: RegExp) => (input: string) =>
		regex.test(input);

export const validateLength: ValidateStringFunction<{
	min?: number;
	max?: number;
	exact?: number | number[];
}> = ({ min = -1, max = -1, exact = -1 }) => {
	return (val: string) => {
		if (min > -1 && val.length < min) {
			return false;
		}

		if (max > -1 && val.length > max) {
			return false;
		}

		if (typeof exact === "number") {
			if (exact > -1 && exact !== val.length) {
				return false;
			}

			return true;
		}

		for (const num of exact) {
			if (num > -1 && num === val.length) {
				return true;
			}
		}
		return false;
	};
};

export function validate(
	newVal: string | number,
	valFns: ValidationFunction[],
) {
	for (const fn of valFns) {
		if (!fn(newVal)) {
			return false;
		}
	}
	return true;
}

export function validateThemeShape<T extends object = RecursiveControlGroup>(
	first: T,
	second: T,
): boolean {
	for (const key in first) {
		if (typeof first[key] === "object") {
			if (!validateThemeShape(first[key] as T, second[key] as T)) {
				return false;
			}
		} else if (typeof first[key] !== typeof second[key]) {
			return false;
		}
	}

	return true;
}
