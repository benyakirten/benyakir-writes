import React from "react";

import { DatePicker } from "@/components/Input";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { DateFilterProps } from "@/types/filters";
import { getShortDate } from "@/utils/dates";
import { FilterButton, FilterPill, FilterText } from "../components";
import { FilterMenu } from "../components/Filters.styles";
import { registerCleanupFn } from "../useFilter.hook";
import { SIZE_MD } from "@/styles/variables";

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

	const closeAllMenus = React.useCallback(() => {
		setStartSoftOpen(false);
		setStartHardOpen(false);
		setEndSoftOpen(false);
		setEndHardOpen(false);
	}, [setStartSoftOpen, setStartHardOpen, setEndSoftOpen, setEndHardOpen]);

	React.useEffect(() => {
		const cleanup = registerCleanupFn(label, closeAllMenus);
		return cleanup;
	}, [label, closeAllMenus]);

	return (
		<FilterPill ref={menuRef} onRemove={onRemove}>
			<FilterText>{label}</FilterText>
			<FilterMenu
				$pointUpwards={startOpenTop}
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
				After {getShortDate(start)}
			</FilterButton>
			<FilterMenu
				$pointUpwards={endOpenTop}
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
				borderRadiusCorners={{ topRight: SIZE_MD, bottomRight: SIZE_MD }}
				filledIn={endOpen}
				onMouseEnter={() => setEndSoftOpen(true)}
				onMouseLeave={() => setEndSoftOpen(false)}
				onClick={() => setEndHardOpen((val) => !val)}
			>
				Before {getShortDate(end)}
			</FilterButton>
		</FilterPill>
	);
};

export default DateFilter;
