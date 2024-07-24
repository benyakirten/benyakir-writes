export const PAGE_TRANSITION_DURATION = 200;

export function getPageTransitionStyles(
	timeout: number,
): PageTransitionProperties {
	return {
		entering: {
			position: "absolute",
			opacity: "0",
			tranform: "translateY(-2rem)",
		},
		entered: {
			transition: `all ${timeout}ms ease-in-out`,
			opacity: "1",
			transform: "translateY(0)",
		},
		exiting: {
			transition: `all ${timeout}ms ease-in-out`,
			opacity: "0",
			transform: "translateY(2rem)",
		},
		exited: null,
		unmounted: null,
	};
}
