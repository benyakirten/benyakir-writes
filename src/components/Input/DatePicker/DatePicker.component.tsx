import * as React from "react";

import {
	convertDatePickerValueToDate,
	convertDateToDatePickerValue,
} from "@/utils/dates";
import { DateContainer, DateInput } from "./DatePicker.styles";

const DatePicker: React.FC<DateProps> = ({
	name,
	label,
	onChange,
	value,
	tabIndex = 0,
}) => {
	const convertedDate = convertDateToDatePickerValue(value);
	const handleChange = (e: React.BaseSyntheticEvent) => {
		e.stopPropagation();
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
