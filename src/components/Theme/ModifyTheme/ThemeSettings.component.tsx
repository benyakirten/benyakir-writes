import React from "react";
import styled from "styled-components";

import { Subtitle } from "@/styles/general-components";
import { SIZE_MD, SIZE_SM } from "@/styles/variables";
import { Text } from "@/components/Input";
import { useAppDispatch } from "@/store/hooks";
import { changeThemeName } from "@/store/theme/theme.slice";
import SettingsGroup from "./SettingsGroup.component";

const StyledThemeSettings = styled.div`
    display: grid;
    gap: ${SIZE_MD};
`;

const ThemeTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${SIZE_SM};
`;

const ThemeSettings: React.FC<{ theme: BaseTheme }> = ({ theme }) => {
	const dispatch = useAppDispatch();
	const groups = Object.keys(theme).reduce<React.ReactNode[]>((acc, next) => {
		if (next === "id" || next === "name") {
			return acc;
		}

		const item = (
			<SettingsGroup key={next} name={next as keyof BaseTheme} id={theme.id} />
		);
		acc.push(item);

		return acc;
	}, []);

	return (
		<StyledThemeSettings>
			<ThemeTitleContainer>
				<Subtitle>Edit</Subtitle>
				<Text
					name="change-theme-name"
					value={theme.name}
					onChange={(e) =>
						dispatch(changeThemeName({ id: theme.id, newVal: e }))
					}
					label="Theme Name"
				/>
			</ThemeTitleContainer>
			{groups}
		</StyledThemeSettings>
	);
};

export default ThemeSettings;
