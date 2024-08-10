import * as React from "react";

import { DateContainer, DateInput } from "./DatePicker.styles";
import { convertDatePickerValueToDate } from "@/utils/dates";

const DatePicker: React.FC<DateProps> = ({
	name,
	label,
	onChange,
	value,
	tabIndex = 0,
}) => {
	// I have no idea why getMonth() outputs months as 0-11 when date pickers use 1-12.
	const month = (value.getMonth() + 1).toString();
	const date = value.getDate().toString();
	const convertedDate = `${value.getFullYear()}-${month.padStart(
		2,
		"0",
	)}-${date.padStart(2, "0")}`;
	const handleChange = (e: React.BaseSyntheticEvent) => {
		const date = convertDatePickerValueToDate(e.target.value);
		onChange(date);
	};
	return (
		<DateContainer>
			<label htmlFor={name}>{label}</label>
			<DateInput
				tabIndex={tabIndex}
				type="date"
				onChange={handleChange}
				name={name}
				id={name}
				value={convertedDate}
			/>
		</DateContainer>
	);
};

export default DatePicker;
