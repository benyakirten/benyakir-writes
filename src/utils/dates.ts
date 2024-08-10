export function getTimeFromDateString(date: string): DateInformation {
	const month = +date.substring(0, 2);
	const year = +date.substring(6);
	if (Number.isNaN(month) || month > 12 || Number.isNaN(year)) {
		throw new Error(`Unable to parse date from string ${date}`);
	}
	return {
		year,
		month,
		...getMonth(month),
		date: new Date(date),
	};
}

export function getBlogPostDateInformation(date: string): DateInformation {
	const year = +date.substring(0, 4);
	const month = +date.substring(5, 7);
	if (Number.isNaN(year) || Number.isNaN(month) || month > 12) {
		throw new Error("Unable to parse date");
	}
	return {
		year,
		month,
		...getMonth(month),
		date: new Date(date),
	};
}

export const getPrettyDate = (date: Date) =>
	date.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

export function getMonth(month: number): FullMonth {
	switch (month) {
		case 1:
			return {
				full: "January",
				short: "JAN",
			};
		case 2:
			return {
				full: "February",
				short: "FEB",
			};
		case 3:
			return {
				full: "March",
				short: "MAR",
			};
		case 4:
			return {
				full: "April",
				short: "APR",
			};
		case 5:
			return {
				full: "May",
				short: "MAY",
			};
		case 6:
			return {
				full: "June",
				short: "JUN",
			};
		case 7:
			return {
				full: "July",
				short: "JUL",
			};
		case 8:
			return {
				full: "August",
				short: "AUG",
			};
		case 9:
			return {
				full: "September",
				short: "SEP",
			};
		case 10:
			return {
				full: "October",
				short: "OCT",
			};
		case 11:
			return {
				full: "November",
				short: "NOV",
			};
		case 12:
			return {
				full: "December",
				short: "DEC",
			};
		default:
			return {
				full: "January",
				short: "JAN",
			};
	}
}

export function convertDatePickerValueToDate(value: string): Date {
	const month = value.slice(5, 7);
	const day = value.slice(8, 10);
	const year = value.slice(0, 4);

	if (Number.isNaN(+month) || Number.isNaN(+day) || Number.isNaN(+year)) {
		return new Date("invalid");
	}

	return new Date(`${month}/${day}/${year}`);
}

export function convertDateToDatePickerValue(value: Date): string {
	const validatedValue =
		Number.isNaN(value.getMinutes()) ||
		Number.isNaN(value.getDate()) ||
		Number.isNaN(value.getFullYear())
			? new Date(0)
			: value;

	// getMonth returns a 0-indexed month, so we need to add 1 to it.
	const month = (validatedValue.getMonth() + 1).toString();
	const date = validatedValue.getDate().toString();
	const convertedDate = `${validatedValue.getFullYear()}-${month.padStart(
		2,
		"0",
	)}-${date.padStart(2, "0")}`;

	return convertedDate;
}
