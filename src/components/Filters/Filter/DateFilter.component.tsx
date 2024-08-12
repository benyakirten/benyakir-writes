import React from "react";

import { useFlyout } from "@/hooks/useFlyout.hook";
import { getPrettyDate } from "@/utils/dates";
import { DatePicker } from "@/components/Input";
import { FilterMenu } from "../components/Filters.styles";
import { FilterText, FilterButton, FilterPill } from "../components";

const DateFilter: React.FC<DateFilterProps> = ({
	onModify,
	onRemove,
	before,
	after,
	label,
}) => {
	const menuRef = React.useRef<HTMLDivElement>(null);
	const [beforeOpenTop, beforeOpen, setBeforeSoftOpen, setBeforeHardOpen] =
		useFlyout(menuRef);

	const [afterOpenTop, afterOpen, setAfterSoftOpen, setAfterHardOpen] =
		useFlyout(menuRef);

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
		<FilterPill ref={menuRef} onRemove={onRemove}>
			<FilterText>{label}</FilterText>
			<FilterMenu
				pointUpwards={beforeOpenTop}
				aria-expanded={beforeOpen}
				onMouseEnter={() => setBeforeSoftOpen(true)}
				onMouseLeave={() => setBeforeSoftOpen(false)}
			>
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
				filledIn={beforeOpen}
				onMouseEnter={() => setBeforeSoftOpen(true)}
				onMouseLeave={() => setBeforeSoftOpen(false)}
				onClick={() => setBeforeHardOpen((val) => !val)}
			>
				Before {getPrettyDate(before)}
			</FilterButton>
			<FilterMenu
				pointUpwards={afterOpenTop}
				aria-expanded={afterOpen}
				onMouseEnter={() => setAfterSoftOpen(true)}
				onMouseLeave={() => setAfterSoftOpen(false)}
			>
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
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
				filledIn={afterOpen}
				onMouseEnter={() => setAfterSoftOpen(true)}
				onMouseLeave={() => setAfterSoftOpen(false)}
				onClick={() => setAfterHardOpen((val) => !val)}
			>
				After {getPrettyDate(after)}
			</FilterButton>
		</FilterPill>
	);
};

export default DateFilter;
