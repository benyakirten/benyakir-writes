import * as React from "react";
import Select, { GroupBase } from "react-select";
import styled, { useTheme } from "styled-components";

import { FONT_SIZE_SM, SIZE_SM, TRANSITION_NORMAL } from "@/styles/variables";
import { MultipleChoiceInputProps } from "@/types/filters";
import { PotentialChoice } from "@/types/general";

const MultipleChoiceContainer = styled.label`
	display: grid;
	gap: ${SIZE_SM};
`;

const MultipleChoice: React.FC<MultipleChoiceInputProps> = ({
	choices,
	onSelect,
	label,
}) => {
	const theme = useTheme() as BaseTheme;
	return (
		<MultipleChoiceContainer>
			<span>{label}</span>
			<Select<PotentialChoice, true, GroupBase<PotentialChoice>>
				isMulti
				options={choices}
				menuIsOpen={true}
				onChange={(val) => onSelect(val)}
				styles={{
					menuList: (base) => ({
						...base,
						maxHeight: "8rem",
					}),
					option: (base) => ({
						...base,
						color: theme.base.textColor,
						background: theme.base.background,
						fontSize: FONT_SIZE_SM,
						textTransform: "capitalize",
						transition: `all ${TRANSITION_NORMAL} ease`,
						":hover": {
							backgroundColor: theme.multipleChoice.hoverBackground,
							color: theme.multipleChoice.hoverTextColor,
						},
					}),
					multiValue: (base) => ({
						...base,
						background: theme.multipleChoice.background,
						color: theme.multipleChoice.textColor,
						fontSize: FONT_SIZE_SM,
					}),
					multiValueRemove: (base) => ({
						...base,
						color: theme.multipleChoice.hoverBackground,
						backgroundColor: theme.multipleChoice.hoverTextColor,
						transition: `background-color ${TRANSITION_NORMAL} ease, color ${TRANSITION_NORMAL} ease`,
						":hover": {
							backgroundColor: theme.multipleChoice.hoverBackground,
							color: theme.multipleChoice.hoverTextColor,
						},
					}),
				}}
			/>
		</MultipleChoiceContainer>
	);
};

export default MultipleChoice;
