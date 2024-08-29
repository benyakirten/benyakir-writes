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
