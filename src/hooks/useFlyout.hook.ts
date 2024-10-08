import React from "react";

import { FlyoutHook } from "@/types/hooks";

export const useFlyout: FlyoutHook = (menuRef) => {
	const shouldMenuOpenTop = React.useCallback(() => {
		if (!globalThis.window) {
			return false;
		}

		const windowHeight = window.innerHeight ?? 0;
		const buttonTop = menuRef?.current?.getBoundingClientRect().top || 0;

		return buttonTop > windowHeight / 2;
	}, [menuRef]);

	const [menuOpenTop, setMenuOpenTop] = React.useState(shouldMenuOpenTop());

	React.useEffect(() => {
		const calculateIfMenuShouldOpenTop = () => {
			const shouldOpenTop = shouldMenuOpenTop();
			setMenuOpenTop(shouldOpenTop);
		};

		window?.addEventListener("scroll", calculateIfMenuShouldOpenTop);
		return () => {
			window?.removeEventListener("scroll", calculateIfMenuShouldOpenTop);
		};
	}, [shouldMenuOpenTop]);

	const [lightOpen, setSoftOpen] = React.useState(false);
	const [hardOpen, setHardOpen] = React.useState(false);

	const isOpen = hardOpen || lightOpen;
	return [menuOpenTop, isOpen, setSoftOpen, setHardOpen];
};
