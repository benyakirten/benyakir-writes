import * as React from "react";

import type { MultiSelectHook } from "@/types/hooks";

const useMultiSelect: MultiSelectHook = (defaultValue?: string[]) => {
	const [set, setSet] = React.useState(new Set<string>(defaultValue));

	const filterItems = <T>(
		choices: Set<string>,
		items: T[],
		getter: (item: T) => string[] | null,
	) => {
		setSet(choices);

		if (choices.size === 0) {
			return items;
		}

		return items.filter((item) => {
			const value = getter(item);
			if (!value) {
				return false;
			}

			const valueSet = new Set(value);
			for (const choice of choices) {
				if (!valueSet.has(choice)) {
					return false;
				}
			}

			return true;
		});
	};

	return [set, filterItems];
};

export default useMultiSelect;
