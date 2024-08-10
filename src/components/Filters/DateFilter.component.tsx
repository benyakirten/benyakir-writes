import { useFlyout } from "@/hooks/useFlyout.hook";
import React from "react";

const DateFilter: React.FC<DateFilterProps> = ({ onModify, before, after }) => {
	const beforeRef = React.useRef<HTMLButtonElement>(null);
	const [beforeOpenTop, beforeOpen, setBeforeLightOpen, setBeforeHardOpen] =
		useFlyout(beforeRef);

	const afterRef = React.useRef<HTMLButtonElement>(null);
	const [afterOpenTop, afterOpen, setAfterLightOpen, setAfterHardOpen] =
		useFlyout(afterRef);

	return null;
};

export default DateFilter;
