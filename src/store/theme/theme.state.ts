export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "day",
	base: {
		textColor: "#000000",
		background: "#FFFFFF",
		border: "#39435b",
		shadowColor: "#9b825d",
		disabled: "#495057",
		focus: "#FF00FF",
		link: "#05491F",
		neutral: "#DCDCDC",
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
		primaryColor: "#FDEDC4",
		gradient: "linear-gradient(to right, #FDEDC4 70%, #FDF3D8)",
		secondaryColor: "#FDF3D8",
		shadowColor: "#000000",
	},
	textInput: {
		textColor: "#000000",
		background: "#FFFFFF",
		border: "#ced4da",
	},
	multipleChoice: {
		background: "#343a40",
		textColor: "#FDF3D8",
	},
	button: {
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
	alertBox: {
		alert: {
			success: "#44764d",
			error: "#993d4d",
		},
		textColor: "#FFFFFF",
	},
	toggle: {
		onColor: "#FBD989",
		onBackground: "#485372",
		offColor: "#993d4d",
		offBackground: "#FDE6B0",
		border: "#000000",
	},
};

export const defaultNightTheme: BaseTheme = {
	id: "1",
	name: "night",
	base: {
		textColor: "#FFFFFF",
		background: "#111B33",
		border: "#343a40",
		shadowColor: "#647DA2",
		disabled: "#e9ecef",
		focus: "#35F58F",
		link: "#FFF",
		neutral: "#FDF3D8",
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
		primaryColor: "#252F47",
		gradient: "linear-gradient(to right, #252F47 70%, #2F3951)",
		secondaryColor: "#2F3951",
		shadowColor: "#212529",
	},
	textInput: {
		textColor: "#FFFFFF",
		background: "#000000",
		border: "#ced4da",
	},
	multipleChoice: {
		background: "#343a40",
		textColor: "#FDF3D8",
	},
	button: {
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
	alertBox: {
		alert: {
			success: "#44764d",
			error: "#993d4d",
		},
		textColor: "#FFFFFF",
	},
	toggle: {
		onColor: "#FBD989",
		onBackground: "#485372",
		offColor: "#993d4d",
		offBackground: "#FDE6B0",
		border: "#D8E2FD",
	},
};

export const initialState: ThemeState = {
	themes: [defaultDayTheme, defaultNightTheme],
	ignoreComputerPreferences: false,
	prefers: "0",
	active: defaultDayTheme,
	error: undefined,
};
