import { useFlyout } from "@/hooks/useFlyout.hook";
import React from "react";
import {
	FilterButton,
	FilterMenu,
	FilterPill,
	SimpleFilterButton,
} from "./components/Filters.styles";
import { CloseIcon } from "../Icons";
import { getPrettyDate } from "@/utils/dates";
import FilterText from "./components/FilterText.component";
import IconContainer from "./components/IconContainer.component";
import { DatePicker } from "../Input";

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

	function modifyDate(time: "before" | "after", value: Date) {
		if (time === "before") {
			setBeforeSoftOpen(false);
			setBeforeHardOpen(false);
		} else {
			setAfterSoftOpen(false);
			setAfterHardOpen(false);
		}

		onModify(time, value);
	}
	return (
		<FilterPill>
			<FilterButton type="button" onClick={onRemove}>
				<IconContainer>
					<CloseIcon />
				</IconContainer>
			</FilterButton>
			<FilterText>{label}</FilterText>
			<FilterMenu pointUpwards={beforeOpenTop} aria-expanded={beforeOpen}>
				<li>
					<DatePicker
						label={`${label} Before`}
						name="date-before"
						value={before}
						onChange={(val) => modifyDate("before", val)}
					/>
				</li>
			</FilterMenu>
			<FilterButton
				type="button"
				onMouseEnter={() => setBeforeSoftOpen(true)}
				onMouseLeave={() => setBeforeSoftOpen(false)}
				onClick={() => setBeforeHardOpen((val) => !val)}
			>
				<SimpleFilterButton>Before {getPrettyDate(before)}</SimpleFilterButton>
			</FilterButton>
			<FilterMenu pointUpwards={afterOpenTop} aria-expanded={afterOpen}>
				<li>
					<DatePicker
						label={`${label} After`}
						name="date-after"
						value={after}
						onChange={(val) => modifyDate("after", val)}
					/>
				</li>
			</FilterMenu>
			<FilterButton
				type="button"
				onMouseEnter={() => setAfterSoftOpen(true)}
				onMouseLeave={() => setAfterSoftOpen(false)}
				onClick={() => setAfterHardOpen((val) => !val)}
			>
				<SimpleFilterButton>After {getPrettyDate(after)}</SimpleFilterButton>
			</FilterButton>
		</FilterPill>
	);
};

export default DateFilter;
