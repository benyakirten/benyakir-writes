type ThemeListProps = {
	onSelect: (val: string) => void;
	selectedTheme: string;
};

type ThemeItemProps = {
	name: string;
	id: string;
	onSelect: (val: string) => void;
	selectedTheme: string | null;
};

type ThemeButtonProps = {
	icon: React.ReactNode;
	text: string;
	disabled?: boolean;
	iconColor?: string;
	onClick: () => void;
};

type ModifyThemeProps = {
	selectedTheme: string | null;
};

type SettingsGroupProps = {
	name: keyof BaseTheme;
	id: string;
};

type SettingsItemProps = {
	accessors: string[];
	theme: BaseTheme;
	id: string;
};

type ThemeControlProps = ModifyThemeProps & {
	selectedTheme: string | null;
	setSelectedTheme: (theme: string) => void;
};
