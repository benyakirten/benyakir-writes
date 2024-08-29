type ThemeControlProps = ModifyThemeProps & {
	selectedTheme: string;
	setSelectedTheme: (theme: string) => void;
};

type ThemeIconsQuery = {
	allFile: {
		nodes: FileNode[];
	};
};

type DraggableThemeProps = {
	nodes: FileNode[];
	themeName: string;
	themeId: string;
};

type DestinationThemeListProps = {
	setSelectedTheme: (val: string) => void;
	selectedTheme: string;
};

type SettingsGroupProps = {
	title: string;
	preface: string;
	controls: ThemeGroup;
	open: boolean;
	theme: BaseTheme;
	onOpen: () => void;
};
