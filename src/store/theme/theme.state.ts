export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "day",
	base: {
		textColor: "#000000",
		background: "#FFFFFF",
		border: "#39435b",
		shadowColor: "#9b825d",
		disabled: "#495057",
		highlighted: "#FF00FF",
		pillText: "#6F6F77",
		pillBackground: "#F4F4F5",
		link: "#05491F",
		neutral: "#DCDCDC",
	},
	sidebar: {
		primaryColor: "#FDEDC4",
		useGradient: true,
		primaryColorEnd: 70,
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
		highlighted: "#35F58F",
		pillText: "#FFF",
		pillBackground: "#000",
		link: "#FFF",
		neutral: "#FDF3D8",
	},
	sidebar: {
		primaryColor: "#252F47",
		useGradient: true,
		primaryColorEnd: 80,
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
