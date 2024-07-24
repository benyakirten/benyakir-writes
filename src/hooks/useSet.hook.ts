import * as React from "react";

import type { SetHook } from "@/types/hooks";

const useSet: SetHook = <T = string>(allItems: T[] = []) => {
	const [set, _setSet] = React.useState(new Set(allItems));
	const setSet = (...items: T[]) =>
		_setSet((itemSet) => {
			for (const item of items) {
				if (itemSet.has(item)) {
					itemSet.delete(item);
				} else {
					itemSet.add(item);
				}
			}

			return new Set(itemSet);
		});

	return [set, setSet];
};

export default useSet;
