export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "Day",
	base: {
		textColor: "hsl(213 58% 8%)",
		background: "hsl(213 60% 97%)",
		border: "hsl(213 53% 28%)",
		link: "hsl(213 87% 15%)",
		pageGradient:
			"linear-gradient(to bottom right, hsl(213 23% 97%), hsl(213 33% 95%) 80%, hsl(213 16% 92%))",
	},
	portfolio: {
		textColor: "hsl(213 50% 90%)",
		selectedTextColor: "hsl(213 40% 20%)",
		tabBackground: "hsl(213 35% 25%)",
		selectedTabBackground: "hsl(213 1% 99%)",
	},
	card: {
		arrowColor: "hsl(213 25% 92%)",
		boxShadow: "hsl(213 50% 15%)",
	},
	header: {
		startColor: "hsl(213 48% 10%)",
		endColor: "hsl(33 61% 56%)",
	},
	pill: {
		textColor: "hsl(213 40% 10%)",
		background: "hsl(213 6% 86%)",
	},
	sidebar: {
		gradient:
			"linear-gradient(to right, hsl(213 14% 95%), hsl(213 25% 95%) 90%, hsl(213 45% 95%))",
		shadowColor: "hsl(213 10% 10%)",
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
	portfolio: {
		textColor: "TODO",
		selectedTextColor: "TODO",
		tabBackground: "TODO",
		selectedTabBackground: "TODO",
	},
	card: {
		arrowColor: "TODO",
		boxShadow: "TODO",
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
