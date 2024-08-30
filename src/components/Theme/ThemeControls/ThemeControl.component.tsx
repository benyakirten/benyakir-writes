import * as React from "react";
import { styled } from "styled-components";

import { FillIn } from "@/components/General";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	resetThemeOptions,
	toggleUseComputerPreferences,
} from "@/store/theme/theme.slice";
import { Subtitle } from "@/styles/general-components";
import ThemeItem from "./ThemeItem.component";
import { SIZE_MD, SIZE_SM, SIZE_XS } from "@/styles/variables";
import { Toggle } from "@/components/Input";

const StyledThemeControls = styled.div`
	display: grid;
	gap: ${SIZE_SM};

	grid-template-rows: auto auto 1fr;

	width: 100%;

	height: 20rem;
	overflow: auto;
`;

const StyledControlContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${SIZE_MD};
	height: fit-content;
`;

const StyledItemContainer = styled.div`
	display: grid;
	gap: ${SIZE_MD};
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	align-content: baseline;
`;

const ResetButton = styled.button`
	padding: ${SIZE_SM} ${SIZE_XS};
	border-radius: ${SIZE_SM};
	border: 1px solid ${({ theme }) => theme.base.border};
`;

const ThemeControls: React.FC<ThemeControlProps> = ({
	selectedTheme,
	setSelectedTheme,
}) => {
	const dispatch = useAppDispatch();
	const themeStore = useAppSelector((root) => root.theme);

	return (
		<StyledThemeControls>
			<Subtitle style={{ marginBottom: 0 }}>Settings</Subtitle>
			<StyledControlContainer>
				<FillIn
					borderRadiusCorners={{
						topLeft: SIZE_SM,
						topRight: SIZE_SM,
						bottomLeft: SIZE_SM,
						bottomRight: SIZE_SM,
					}}
				>
					<ResetButton
						onClick={() => dispatch(resetThemeOptions())}
						type="button"
					>
						Reset Themes
					</ResetButton>
				</FillIn>
				<Toggle
					label={`Use Computer Preferences ${themeStore.ignoreComputerPreferences ? "(Off)" : "(On)"}`}
					name="theme-ignore-computer-preferences"
					onToggle={() => dispatch(toggleUseComputerPreferences())}
					value={!themeStore.ignoreComputerPreferences}
				/>
			</StyledControlContainer>
			<StyledItemContainer>
				{themeStore.themes.map((theme) => (
					<ThemeItem
						id={theme.id}
						name={theme.name}
						key={theme.id}
						onSelect={setSelectedTheme}
						selectedTheme={selectedTheme}
					/>
				))}
			</StyledItemContainer>
		</StyledThemeControls>
	);
};

export default ThemeControls;
