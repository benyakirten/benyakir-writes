import * as React from "react";
import { styled } from "styled-components";

import { FillIn, IconButton } from "@/components/General";
import { CheckIcon, ClipboardIcon } from "@/components/Icons";
import { Text, Toggle } from "@/components/Input";
import { useDebounce } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	importTheme,
	resetThemeOptions,
	toggleUseComputerPreferences,
} from "@/store/theme/theme.slice";
import { Subtitle } from "@/styles/general-components";
import { media } from "@/styles/queries";
import { SIZE_MD, SIZE_SM, SIZE_XS } from "@/styles/variables";
import ThemeItem from "./ThemeItem.component";

const StyledThemeControls = styled.div`
	display: grid;
	gap: ${SIZE_SM};

	grid-template-rows: repeat(3, auto) 1fr;

	width: 100%;

	height: 28rem;
	overflow: auto;

	${media.phone} {
		gap: ${SIZE_MD};
	}
`;

const StyledControlContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${SIZE_MD};
	height: fit-content;

	${media.phone} {
		flex-direction: column;
		align-items: baseline;
	}
`;

const StyledItemContainer = styled.div`
	display: grid;
	gap: ${SIZE_MD};
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	align-content: baseline;

	${media.phone} {
		grid-template-columns: 1fr;
		gap: ${SIZE_XS};
	}
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
	const [importedTheme, setImportedTheme] = useDebounce((val) =>
		dispatch(importTheme(val)),
	);
	const [copied, setCopied] = React.useState(false);

	const copyThemeToClipboard = async () => {
		const activeTheme = themeStore.active;
		const serialized = JSON.stringify(activeTheme);
		const encoded = btoa(serialized);

		await navigator.clipboard.writeText(encoded);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const exportIcon = copied ? <CheckIcon /> : <ClipboardIcon />;
	const exportText = copied ? "Copied to clipboard!" : "Export Theme";

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
						Reset All Settings
					</ResetButton>
				</FillIn>
				<Toggle
					label={`Use Computer Preferences ${themeStore.ignoreComputerPreferences ? "(Off)" : "(On)"}`}
					name="theme-ignore-computer-preferences"
					onToggle={() => dispatch(toggleUseComputerPreferences())}
					value={!themeStore.ignoreComputerPreferences}
				/>
			</StyledControlContainer>
			<StyledControlContainer>
				<Text
					label="Import Theme"
					name="import-theme"
					value={importedTheme}
					onChange={setImportedTheme}
				/>
				<IconButton
					width="12rem"
					onClick={copyThemeToClipboard}
					icon={exportIcon}
					disabled={copied}
				>
					{exportText}
				</IconButton>
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
