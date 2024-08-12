import * as React from "react";
import Select from "react-select";

import { FONT_MD } from "@StyleVars";

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
	choices,
	onSelect,
	tabIndex = 0,
}) => {
	return (
		<Select
			isMulti
			options={choices}
			menuIsOpen={true}
			tabIndex={tabIndex}
			onChange={(val) => onSelect(val as PotentialChoice[])}
			styles={{
				menuList: (base) => ({
					...base,
					height: "14rem",
				}),
				option: (base) => ({
					...base,
					color: "#000",
					fontSize: FONT_MD,
					textTransform: "capitalize",
				}),
				multiValue: (base) => ({
					...base,
					padding: "0.4rem",
					backgroundColor: "#ccc",
					display: "flex",
					alignItems: "center",
					fontSize: FONT_MD,
				}),
				multiValueRemove: (base) => ({
					...base,
					padding: "0.2rem",
					transition: "background-color 200ms ease",
					":hover": {
						backgroundColor: "#444",
					},
				}),
			}}
		/>
	);
};

export default MultipleChoice;
