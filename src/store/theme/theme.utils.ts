import {
	STORED_IGNORE_COMPUTER_PREFERENCE,
	STORED_LAST_USED_THEME_ID,
	STORED_THEMES,
} from "@/data/constants";

export const defaultDayTheme: BaseTheme = {
	id: "0",
	name: "Day",
	base: {
		textColor: "#000000",
		background: "hsl(0 0% 100%)",
		border: "#39435b",
		shadowColor: "#9b825d",
		disabled: "#495057",
		focus: "hsl(300, 100%, 50%)",
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
		activeThemeColor: "#00FF00",
	},
};

export const defaultNightTheme: BaseTheme = {
	id: "1",
	name: "Night",
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
		activeThemeColor: "#FF0000",
	},
};

export function getDefaultThemeState(): ThemeState {
	let state: ThemeState;

	const ignoreComputerPreferences =
		localStorage.getItem(STORED_IGNORE_COMPUTER_PREFERENCE) === "true";
	const lastUsedThemeId = localStorage.getItem(STORED_LAST_USED_THEME_ID);
	const latestId =
		!lastUsedThemeId || Number.isNaN(+lastUsedThemeId) ? 1 : +lastUsedThemeId;
	try {
		const storedThemes = localStorage.getItem(STORED_THEMES);
		const themes: BaseTheme[] = storedThemes
			? JSON.parse(storedThemes)
			: [defaultDayTheme, defaultNightTheme];

		const storedActiveTheme = localStorage.getItem(STORED_LAST_USED_THEME_ID);
		const active =
			(storedActiveTheme && themes.find((t) => t.id === storedActiveTheme)) ||
			defaultDayTheme;

		state = { themes, active, ignoreComputerPreferences, latestId };
	} catch {
		state = {
			themes: [defaultDayTheme, defaultNightTheme],
			active: defaultDayTheme,
			ignoreComputerPreferences,
			latestId,
		};
	}

	if (!state.ignoreComputerPreferences) {
		state.active = determineComputerPreferredTheme(state);
	}
	return state;
}

export function determineComputerPreferredTheme(state: ThemeState) {
	const darkThemeTime = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	// TODO: Remove debug and reset this to "1" : "0"
	const themePreference = darkThemeTime ? "0" : "0";
	if (state.active.id !== themePreference) {
		return (
			state.themes.find((theme) => theme.id === themePreference) ?? state.active
		);
	}
	return state.active;
}
