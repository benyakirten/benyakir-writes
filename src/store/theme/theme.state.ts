export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "Day",
	base: {
		textColor: "hsl(143 58% 8%)",
		background: "hsl(143 1% 99%)",
		border: "hsl(143 53% 28%)",
		link: "hsl(143 87% 15%)",
		pageGradient:
			"linear-gradient(to bottom right, hsl(143 13% 99%), hsl(143 33% 98%), hsl(143 16% 99%))",
	},
	header: {
		startColor: "hsl(143 48% 10%)",
		endColor: "hsl(323 61% 56%)",
	},
	pill: {
		textColor: "hsl(143 40% 10%)",
		background: "hsl(143 6% 86%)",
	},
	sidebar: {
		gradient:
			"linear-gradient(to right, hsl(143 4% 99%), hsl(143 15% 95%) 80%, hsl(143 45% 94%))",
		shadowColor: "hsl(143 10% 10%)",
	},
	textInput: {
		textColor: "#000000",
		background: "#FFFFFF",
		border: "#ced4da",
		disabled: "#495057",
	},
	multipleChoice: {
		background: "#343a40",
		textColor: "#FDF3D8",
	},
	fillIn: {
		border: "#05491F",
		default: {
			background: "#f8f9fa",
			textColor: "#39435b",
		},
		disabled: {
			background: "#343a40",
			textColor: "#D8E3FD",
		},
		hover: {
			background: "#05491F",
			textColor: "#D8E3FD",
		},
	},
	toggle: {
		onColor: "#FBD989",
		onBackground: "#485372",
		offColor: "#993d4d",
		offBackground: "#FDE6B0",
		border: "#000000",
	},
	theme: {
		iconColor: "#FFFFFF",
		iconHoverColor: "#0000FF",
		selectedThemeColor: "#FF0000",
	},
};

export const defaultNightTheme: BaseTheme = {
	id: "1",
	name: "Night",
	base: {
		textColor: "#FFFFFF",
		background: "#111B33",
		border: "#343a40",
		link: "#FFF",
		pageGradient: "TODO",
	},
	header: {
		startColor: "#FFF",
		endColor: "#35F58F",
	},
	pill: {
		textColor: "#FFF",
		background: "#000",
	},
	sidebar: {
		gradient: "linear-gradient(to right, #252F47 70%, #2F3951)",
		shadowColor: "#212529",
	},
	textInput: {
		textColor: "#FFFFFF",
		background: "#000000",
		disabled: "#e9ecef",
		border: "#ced4da",
	},
	multipleChoice: {
		background: "#343a40",
		textColor: "#FDF3D8",
	},
	fillIn: {
		border: "#e9ecef",
		default: {
			background: "#111B33",
			textColor: "#f8f9fa",
		},
		disabled: {
			background: "#495057",
			textColor: "#D8E3FD",
		},
		hover: {
			background: "#D8E3FD",
			textColor: "#05491F",
		},
	},
	toggle: {
		onColor: "#FBD989",
		onBackground: "#485372",
		offColor: "#993d4d",
		offBackground: "#FDE6B0",
		border: "#D8E2FD",
	},
	theme: {
		iconColor: "#000000",
		iconHoverColor: "#FF00FF",
		selectedThemeColor: "#00FFFF",
	},
};

export const initialState: ThemeState = {
	themes: [defaultDayTheme, defaultNightTheme],
	ignoreComputerPreferences: false,
	active: defaultDayTheme,
	latestId: 1,
};
