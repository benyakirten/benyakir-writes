import { useCallback } from "react";

export const useCloseFlyouts = (fn: () => void) => {
	const keydownListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				fn();
			}
		},
		[fn],
	);

	const clickListener = useCallback(
		(e: MouseEvent) => {
			if (!(e.target instanceof HTMLElement)) {
				return;
			}

			const filterBar = document.querySelector("[data-filter]");
			if (!filterBar?.contains(e.target)) {
				fn();
			}
		},
		[fn],
	);

	window.addEventListener("keydown", keydownListener);
	window.addEventListener("click", clickListener);
	return () => {
		window.removeEventListener("keydown", keydownListener);
		window.removeEventListener("click", clickListener);
	};
};
