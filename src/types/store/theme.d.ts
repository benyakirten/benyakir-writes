type ThemeState = {
	themes: BaseTheme[];
	ignoreComputerPreferences: boolean;
	prefers: string;
	active: BaseTheme;
	error?: string;
};

type BasicThemeSection = {
	background: string;
	textColor: string;
};

type ThemeBase = BasicThemeSection & {
	border: string;
	shadowColor: string;
	disabled: string;
	focus: string;
	link: string;
	neutral: string;
};

type ThemeSidebar = {
	primaryColor: string;
	gradient: string;
	secondaryColor: string;
	shadowColor: string;
};

type ThemeTextInput = BasicThemeSection & {
	border: string;
};

type ThemeMultipleChoice = BasicThemeSection & {};

type ButtonTheme = {
	border: string;
	default: BasicThemeSection;
	disabled: BasicThemeSection;
	hover: BasicThemeSection;
};

type ThemeAlertBox = {
	textColor: string;
	alert: {
		success: string;
		error: string;
	};
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
	iconHoverColor: string;
	activeThemeColor: string;
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
	button: ButtonTheme;
	alertBox: ThemeAlertBox;
	toggle: ThemeToggle;
	theme: ThemeThemePage;
};

type RecursiveControlGroup = {
	[key: string]: string | RecursiveControlGroup;
};

type ThemeAccessors = string[];
type ThemeGroup = ThemeAccessors[];
type ThemeGroups = ThemeGroup[];
