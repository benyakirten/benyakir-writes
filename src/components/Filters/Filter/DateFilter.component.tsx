import React from "react";

import { useFlyout } from "@/hooks/useFlyout.hook";
import { getPrettyDate } from "@/utils/dates";
import { DatePicker } from "@/components/Input";
import { FilterMenu } from "../components/Filters.styles";
import { FilterText, FilterButton, FilterPill } from "../components";
import { useCloseFlyouts } from "./useListenForEscape.hook";

const DateFilter: React.FC<DateFilterProps> = ({
	onModify,
	onRemove,
	start,
	end,
	label,
}) => {
	const menuRef = React.useRef<HTMLDivElement>(null);
	const [startOpenTop, startOpen, setStartSoftOpen, setStartHardOpen] =
		useFlyout(menuRef);

	const [endOpenTop, endOpen, setEndSoftOpen, setEndHardOpen] =
		useFlyout(menuRef);

	function modifyDate(time: "start" | "end", value: Date) {
		if (time === "start") {
			setStartSoftOpen(false);
			setStartHardOpen(false);
		} else {
			setEndSoftOpen(false);
			setEndHardOpen(false);
		}

		onModify(time, value);
	}

	function closeAllMenus() {
		setStartSoftOpen(false);
		setStartHardOpen(false);
		setEndSoftOpen(false);
		setEndHardOpen(false);
	}

	useCloseFlyouts(closeAllMenus);

	return (
		<FilterPill ref={menuRef} onEscape={closeAllMenus} onRemove={onRemove}>
			<FilterText>{label}</FilterText>
			<FilterMenu
				pointUpwards={startOpenTop}
				aria-expanded={startOpen}
				onMouseEnter={() => setStartSoftOpen(true)}
				onMouseLeave={() => setStartSoftOpen(false)}
			>
				<li>
					<DatePicker
						label={`${label} Since`}
						name="date-start"
						value={start}
						onChange={(val) => modifyDate("start", val)}
					/>
				</li>
			</FilterMenu>
			<FilterButton
				filledIn={startOpen}
				onMouseEnter={() => setStartSoftOpen(true)}
				onMouseLeave={() => setStartSoftOpen(false)}
				onClick={() => setStartHardOpen((val) => !val)}
			>
				After {getPrettyDate(start)}
			</FilterButton>
			<FilterMenu
				pointUpwards={endOpenTop}
				aria-expanded={endOpen}
				onMouseEnter={() => setEndSoftOpen(true)}
				onMouseLeave={() => setEndSoftOpen(false)}
			>
				<li>
					<DatePicker
						label={`${label} Until`}
						name="date-end"
						value={end}
						onChange={(val) => modifyDate("end", val)}
					/>
				</li>
			</FilterMenu>
			<FilterButton
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
				filledIn={endOpen}
				onMouseEnter={() => setEndSoftOpen(true)}
				onMouseLeave={() => setEndSoftOpen(false)}
				onClick={() => setEndHardOpen((val) => !val)}
			>
				Before {getPrettyDate(end)}
			</FilterButton>
		</FilterPill>
	);
};

export default DateFilter;
