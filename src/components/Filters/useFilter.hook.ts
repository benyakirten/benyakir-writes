import { useCallback, useEffect } from "react";

import { inputIsFocused } from "@/utils/dom";

const closeFns: Map<string, () => void> = new Map();
export function registerCleanupFn(key: string, fn: () => void) {
	console.log("CLEANING UP", key);
	closeFns.set(key, fn);
	return () => {
		closeFns.delete(key);
	};
}

const closeAll = () => {
	for (const fn of closeFns.values()) {
		fn();
	}
};

export const useFilter = (
	filterBarRef: React.RefObject<HTMLElement>,
	newFilterRef: React.RefObject<HTMLButtonElement>,
	pageRef: React.RefObject<HTMLInputElement>,
) => {
	const keydownListener = useCallback(
		(event: KeyboardEvent) => {
			console.log(event.key);
			if (event.key === "Escape") {
				closeAll();
				return;
			}

			if (inputIsFocused()) {
				return;
			}

			switch (event.key) {
				case "f":
					newFilterRef.current?.focus();
					break;
				case "p":
					pageRef.current?.focus();
					break;
			}
		},
		[newFilterRef, pageRef],
	);

	const clickListener = useCallback(
		(e: MouseEvent) => {
			if (!(e.target instanceof HTMLElement)) {
				return;
			}

			if (!filterBarRef.current?.contains(e.target)) {
				closeAll();
			}
		},
		[filterBarRef],
	);

	useEffect(() => {
		window.addEventListener("keydown", keydownListener);
		window.addEventListener("click", clickListener);

		return () => {
			window.removeEventListener("keydown", keydownListener);
			window.removeEventListener("click", clickListener);
		};
	});
};
