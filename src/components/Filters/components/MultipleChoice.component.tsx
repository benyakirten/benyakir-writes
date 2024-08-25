import * as React from "react";
import Select, { GroupBase } from "react-select";
import styled, { useTheme } from "styled-components";

import { FONT_SIZE_SM, SIZE_SM, TRANSITION_NORMAL } from "@StyleVars";
import { MultipleChoiceInputProps } from "@/types/filters";

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
						height: "8rem",
					}),
					option: (base) => ({
						...base,
						color: theme.base.textColor,
						fontSize: FONT_SIZE_SM,
						textTransform: "capitalize",
					}),
					multiValue: (base) => ({
						...base,
						fontSize: FONT_SIZE_SM,
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
		</MultipleChoiceContainer>
	);
};

export default MultipleChoice;
