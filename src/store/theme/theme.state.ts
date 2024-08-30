export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "Day",
	base: {
		textColor: "#000000",
		background: "hsl(0 0% 100%)",
		border: "#39435b",
		focus: "hsl(300 100% 50%)",
		link: "#05491F",
	},
	header: {
		startColor: "#000000",
		endColor: "#FF00FF",
	},
	pill: {
		textColor: "#6F6F77",
		background: "#F4F4F5",
	},
	sidebar: {
		gradient: "linear-gradient(to right, #FDEDC4 70%, #FDF3D8)",
		shadowColor: "#000000",
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

		focus: "#35F58F",
		link: "#FFF",
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
