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
};

type ThemeSearchBox = BasicThemeSection & {
	border: string;
	background: string;
	textColor: string;
	result: {
		textColor: string;
		border: string;
	};
};

type ThemeSidebar = {
	primaryColor: string;
	useGradient: boolean;
	primaryColorEnd: number;
	secondaryColor: string;
	shadowColor: string;
};

type ThemePaginate = {
	textColor: string;
	arrowColor: string;
	pageNumberColor: string;
};

type ThemeTextInput = BasicThemeSection & {
	border: string;
};

type ThemeFilter = BasicThemeSection & {};

type ThemeCheckbox = {
	border: string;
	fingerColor: string;
	backgroundColor: string;
};

type ThemeMultipleChoice = BasicThemeSection & {};

type ThemeLink = {
	normal: string;
	inline: string;
	dark: string;
};

type ThemeIcon = {
	default: BasicThemeSection;
	hover: BasicThemeSection;
};

type ThemeHoverImage = {
	textColor: string;
	hoveredTextColor: string;
};

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

type ThemeSkewRow = {
	background: string;
};

type ThemePortfolio = {
	gradient: {
		color1: string;
		color2: string;
		color3: string;
	};
};

type BaseTheme = {
	id: string;
	name: string;
	base: ThemeBase;
	searchBox: ThemeSearchBox;
	sidebar: ThemeSidebar;
	paginate: ThemePaginate;
	textInput: ThemeTextInput;
	filter: ThemeFilter;
	checkbox: ThemeCheckbox;
	multipleChoice: ThemeMultipleChoice;
	link: ThemeLink;
	icon: ThemeIcon;
	skewRow: ThemeSkewRow;
	hoverImage: ThemeHoverImage;
	button: ButtonTheme;
	alertBox: ThemeAlertBox;
	toggle: ThemeToggle;
	portfolio: ThemePortfolio;
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
