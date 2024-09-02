export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "Day",
	base: {
		textColor: "hsl(213 58% 8%)",
		background: "hsl(213 60% 97%)",
		border: "hsl(213 53% 28%)",
		link: "hsl(213 87% 30%)",
		disabled: "hsl(213 2% 70%)",
		pageGradient:
			"linear-gradient(to right, hsl(213 23% 97%), hsl(213 33% 95%) 80%, hsl(213 16% 92%))",
	},
	portfolio: {
		textColor: "hsl(213 50% 90%)",
		selectedTextColor: "hsl(213 40% 20%)",
		tabBackground: "hsl(213 35% 25%)",
		selectedTabBackground: "hsl(213 40% 92%)",
	},
	card: {
		arrowColor: "hsl(213 20% 92%)",
		boxShadow: "hsl(213 70% 15%)",
	},
	header: {
		startColor: "hsl(213 48% 10%)",
		endColor: "hsl(33 61% 56%)",
	},
	pill: {
		textColor: "hsl(213 40% 8%)",
		background: "hsl(213 10% 86%)",
	},
	sidebar: {
		link: "hsl(213 90% 25%)",
		gradient:
			"linear-gradient(to right, hsl(213 14% 95%), hsl(213 25% 95%) 90%, hsl(213 45% 90%))",
		shadowColor: "hsl(213 10% 10%)",
	},
	multipleChoice: {
		background: "hsl(213 60% 92%)",
		textColor: "hsl(213 58% 8%)",
		hoverBackground: "hsl(213 87% 15%)",
		hoverTextColor: "hsl(213 90% 92%)",
		controlBackground: "hsl(213 60% 99%)",
		menuBackground: "hsl(213 60% 99%)",
	},
	fillIn: {
		border: "hsl(213 87% 15%)",
		default: {
			background: "hsl(213 17% 98%)",
			textColor: "hsl(213 23% 29%)",
		},
		disabled: {
			background: "hsl(213 20% 33%)",
			textColor: "hsl(213 90% 92%)",
		},
		hover: {
			background: "hsl(213 87% 20%)",
			textColor: "hsl(213 90% 92%)",
		},
	},
	toggle: {
		onColor: "hsl(213 93% 76%)",
		onBackground: "hsl(213 26% 36%)",
		offColor: "hsl(33 43% 42%)",
		offBackground: "hsl(33 95% 84%)",
		border: "hsl(213 1% 1%)",
	},
	theme: {
		iconColor: "hsl(213 40% 91%)",
		iconHoverColor: "hsl(33 60% 60%)",
		selectedThemeColor: "hsl(213 90% 40%)",
	},
};

export const defaultNightTheme: BaseTheme = {
	id: "1",
	name: "Night",
	base: {
		textColor: "hsl(222 30% 94%)",
		background: "hsl(222 50% 13%)",
		border: "hsl(222 40% 80%)",
		link: "hsl(222 70% 94%)",
		pageGradient:
			"linear-gradient(to bottom right, hsl(222 50% 13%), hsl(222 80% 16%), hsl(222 50% 13%))",
		disabled: "hsl(222 4% 70%)",
	},
	portfolio: {
		textColor: "hsl(222 25% 15%)",
		selectedTextColor: "hsl(222 30% 94%)",
		tabBackground: "hsl(222 30% 92%)",
		selectedTabBackground: "hsl(222 80% 15%)",
	},
	card: {
		arrowColor: "hsl(222 60% 25%)",
		boxShadow: "hsl(222 35% 94%)",
	},
	header: {
		startColor: "hsl(222 30% 92%)",
		endColor: "hsl(42 70% 44%)",
	},
	pill: {
		textColor: "hsl(222 60% 5%)",
		background: "hsl(222 25% 85%)",
	},
	sidebar: {
		link: "hsl(222 70% 90%)",
		gradient:
			"linear-gradient(to bottom right, hsl(222 90% 10%), hsl(222 80% 15%), hsl(222 80% 25%), hsl(222 40% 15%), hsl(222 67% 27%))",
		shadowColor: "hsl(222 10% 80%)",
	},
	multipleChoice: {
		background: "hsl(222 10% 23%)",
		textColor: "hsl(222 90% 92%)",
		hoverBackground: "hsl(222 10% 23%)",
		hoverTextColor: "hsl(222 90% 92%)",
		controlBackground: "hsl(213 60% 20%)",
		menuBackground: "hsl(213 60% 20%)",
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
