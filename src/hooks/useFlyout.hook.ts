import React from "react";

import { FlyoutHook } from "@/types/hooks";

export const useFlyout: FlyoutHook = (initialState = false) => {
	const [lightOpen, setLightOpen] = React.useState(false);
	const [hardOpen, setHardOpen] = React.useState(initialState);

	const isOpen = hardOpen || lightOpen;
	console.log("REP");
	console.log(hardOpen);
	console.log(lightOpen);
	console.log(isOpen);
	return [isOpen, setLightOpen, setHardOpen];
};
