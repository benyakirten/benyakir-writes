type ThemeState = {
	themes: BaseTheme[];
	ignoreComputerPreferences: boolean;
	active: BaseTheme;
	latestId: number;
};

type BasicThemeSection = {
	background: string;
	textColor: string;
};

type ThemeBase = BasicThemeSection & {
	border: string;
	focus: string;
	link: string;
};

type ThemeSidebar = {
	gradient: string;
	shadowColor: string;
};

type ThemeTextInput = BasicThemeSection & {
	border: string;
	disabled: string;
};

type ThemeMultipleChoice = BasicThemeSection & {};

type ThemeFillIn = {
	border: string;
	default: BasicThemeSection;
	disabled: BasicThemeSection;
	hover: BasicThemeSection;
};

type ThemeToggle = {
	onColor: string;
	onBackground: string;
	offColor: string;
	offBackground: string;
	border: string;
};

type ThemeHeader = {
	startColor: string;
	endColor: string;
};

type ThemeThemePage = {
	iconColor: string;
	iconHoverColor: string;
	selectedThemeColor: string;
};

type BaseTheme = {
	id: string;
	name: string;
	base: ThemeBase;
	pill: BasicThemeSection;
	header: ThemeHeader;
	sidebar: ThemeSidebar;
	textInput: ThemeTextInput;
	multipleChoice: ThemeMultipleChoice;
	fillIn: ThemeFillIn;
	toggle: ThemeToggle;
	theme: ThemeThemePage;
};

type RecursiveControlGroup = {
	[key: string]: string | RecursiveControlGroup;
};
