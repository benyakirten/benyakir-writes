import { useFlyout } from "@/hooks/useFlyout.hook";
import React from "react";
import { FilterPill } from "./components/Filters.styles";
import { CloseIcon } from "../Icons";
import { getPrettyDate } from "@/utils/dates";
import FilterText from "./components/FilterText.component";
import IconContainer from "./components/IconContainer.component";

const DateFilter: React.FC<DateFilterProps> = ({
	onModify,
	onRemove,
	before,
	after,
	label,
}) => {
	const beforeRef = React.useRef<HTMLButtonElement>(null);
	const [beforeOpenTop, beforeOpen, setBeforeSoftOpen, setBeforeHardOpen] =
		useFlyout(beforeRef);

	const afterRef = React.useRef<HTMLButtonElement>(null);
	const [afterOpenTop, afterOpen, setAfterSoftOpen, setAfterHardOpen] =
		useFlyout(afterRef);

	return (
		<FilterPill>
			<button type="button" onClick={onRemove}>
				<IconContainer>
					<CloseIcon />
				</IconContainer>
			</button>
			<FilterText>{label}</FilterText>
			<button
				type="button"
				onMouseEnter={() => setBeforeSoftOpen(true)}
				onMouseLeave={() => setBeforeSoftOpen(false)}
				onClick={() => setAfterHardOpen((val) => !val)}
			>
				<FilterText>Before {getPrettyDate(before)}</FilterText>
			</button>
			<button
				type="button"
				onMouseEnter={() => setAfterSoftOpen(true)}
				onMouseLeave={() => setAfterSoftOpen(false)}
				onClick={() => setAfterHardOpen((val) => !val)}
			>
				<FilterText>After {getPrettyDate(after)}</FilterText>
			</button>
		</FilterPill>
	);
};

export default DateFilter;
