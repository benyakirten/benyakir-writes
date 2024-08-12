import * as React from "react";
import Select, { GroupBase } from "react-select";

import { FONT_MD, FONT_SM, SIZE_XS, TRANSITION_NORMAL } from "@StyleVars";
import { useTheme } from "styled-components";

const MultipleChoice: React.FC<MultipleChoiceInputProps> = ({
	choices,
	onSelect,
}) => {
	const theme = useTheme() as BaseTheme;
	return (
		<Select<PotentialChoice, true, GroupBase<PotentialChoice>>
			isMulti
			options={choices}
			menuIsOpen={true}
			onChange={(val) => onSelect(val)}
			styles={{
				menuList: (base) => ({
					...base,
					height: "8rem",
				}),
				option: (base) => ({
					...base,
					color: theme.base.textColor,
					fontSize: FONT_SM,
					textTransform: "capitalize",
				}),
				multiValue: (base) => ({
					...base,
					fontSize: FONT_SM,
				}),
				multiValueRemove: (base) => ({
					...base,
					transition: `background-color ${TRANSITION_NORMAL} ease, color ${TRANSITION_NORMAL} ease`,
					":hover": {
						backgroundColor: theme.base.border,
						color: theme.multipleChoice.textColor,
					},
				}),
			}}
		/>
	);
};

export default MultipleChoice;
