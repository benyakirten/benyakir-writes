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
	link: string;
	pageGradient: string;
	disabled: string;
};

type ThemeSidebar = {
	gradient: string;
	shadowColor: string;
	link: string;
};

type ThemeMultipleChoice = {
	background: string;
	textColor: string;
	hoverBackground: string;
	hoverTextColor: string;
	controlBackground: string;
	menuBackground: string;
};

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

type ThemeCard = {
	arrowColor: string;
	boxShadow: string;
};

type ThemePortfolio = {
	textColor: string;
	selectedTextColor: string;
	tabBackground: string;
	selectedTabBackground: string;
};

type BaseTheme = {
	id: string;
	name: string;
	base: ThemeBase;
	pill: BasicThemeSection;
	header: ThemeHeader;
	sidebar: ThemeSidebar;
	multipleChoice: ThemeMultipleChoice;
	fillIn: ThemeFillIn;
	portfolio: ThemePortfolio;
	toggle: ThemeToggle;
	theme: ThemeThemePage;
	card: ThemeCard;
};

type RecursiveControlGroup = {
	[key: string]: string | RecursiveControlGroup;
};
