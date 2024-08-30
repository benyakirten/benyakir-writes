type ThemeListProps = {
	onSelect: (val: string) => void;
	selectedTheme: string;
};

type ThemeItemProps = {
	name: string;
	id: string;
	onSelect: (val: string) => void;
	selectedTheme: string;
};

type ThemeButtonProps = {
	icon: React.ReactNode;
	text: string;
	disabled?: boolean;
	iconColor?: string;
	onClick: () => void;
};

type ModifyThemeProps = {
	selectedTheme: string;
};

type SettingsGroupProps = {
	name: string;
	id: string;
};

type SettingsItemProps = {
	accessors: string[];
	control: RecursiveControlGroup;
	id: string;
};

type ThemeControlProps = ModifyThemeProps & {
	selectedTheme: string;
	setSelectedTheme: (theme: string) => void;
};
