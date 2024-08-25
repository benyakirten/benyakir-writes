import React from "react";

import { formatDateToTimeDatetime, getPrettyDate } from "@/utils/dates";

const Time: React.FC<{
	date: Date;
	formatter?: (formattedDate: string) => string;
}> = ({ date, formatter = (date) => date }) => {
	const prettyDate = getPrettyDate(date);
	const time = formatDateToTimeDatetime(date);

	return <time dateTime={time}>{formatter(prettyDate)}</time>;
};

export default Time;
