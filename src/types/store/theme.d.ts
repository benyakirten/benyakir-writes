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
	highlighted: string;
	pillBackground: string;
	pillText: string;
	link: string;
	neutral: string;
};

type ThemeSidebar = {
	primaryColor: string;
	useGradient: boolean;
	primaryColorEnd: number;
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

type BaseTheme = {
	id: string;
	name: string;
	base: ThemeBase;
	sidebar: ThemeSidebar;
	textInput: ThemeTextInput;
	multipleChoice: ThemeMultipleChoice;
	button: ButtonTheme;
	alertBox: ThemeAlertBox;
	toggle: ThemeToggle;
} & Record<string, string>;

type FullTheme = BaseTheme & {
	fontExtraSmall: CSSMeasure;
	fontSmall: CSSMeasure;
	fontMedium: CSSMeasure;
	fontLarge: CSSMeasure;
	fontExtraLarge: CSSMeasure;
	fontTitle: CSSMeasure;
	fontBanner: CSSMeasure;
};

type RecursiveControlGroup = {
	[key: string]: string | RecursiveControlGroup;
};

type ThemeAccessors = string[];
type ThemeGroup = ThemeAccessors[];
type ThemeGroups = ThemeGroup[];
