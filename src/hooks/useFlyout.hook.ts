import React from "react";

import { FlyoutHook } from "@/types/hooks";

export const useFlyout: FlyoutHook = (menuRef, initialState = false) => {
	const shouldMenuOpenTop = React.useCallback(() => {
		const windowHeight = window.innerHeight;
		const buttonTop = menuRef.current?.getBoundingClientRect().top || 0;

		return buttonTop > windowHeight / 2;
	}, [menuRef]);
	const [menuOpenTop, setMenuOpenTop] = React.useState(shouldMenuOpenTop());

	React.useEffect(() => {
		const calculateIfMenuShouldOpenTop = () => {
			const shouldOpenTop = shouldMenuOpenTop();
			setMenuOpenTop(shouldOpenTop);
		};

		window.addEventListener("scroll", calculateIfMenuShouldOpenTop);
		return () => {
			window.removeEventListener("scroll", calculateIfMenuShouldOpenTop);
		};
	}, [shouldMenuOpenTop]);

	const [lightOpen, setLightOpen] = React.useState(false);
	const [hardOpen, setHardOpen] = React.useState(initialState);

	const isOpen = hardOpen || lightOpen;
	return [menuOpenTop, isOpen, setLightOpen, setHardOpen];
};
